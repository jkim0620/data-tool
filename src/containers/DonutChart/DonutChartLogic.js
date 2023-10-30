import { useState, useContext, useEffect } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';
import ToolContext from '../../hooks/ToolContext';

const DonutChartLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, textWrap } = HandleData();
    const { selectedDonutFilter, selectedDonutFilter2 } = useContext(ToolContext);    

    const updateDonutChart = (data, refEl) => {
        //Remove labels
        d3.select(refEl.current).selectAll('.hidden-donut-arcs').remove();
        d3.select(refEl.current).selectAll('.arc-label').remove();
        d3.select(refEl.current).selectAll('.polyline-label').remove();
        d3.select(refEl.current).selectAll('.polyline').remove();

        const containerWidth = refEl.current.clientWidth;

        const marginValue = containerWidth > 400 ? 60 : 40,
             labelDyPosition = containerWidth > 400 ? -13 : -5;

        const margin = {left: marginValue, right: marginValue, top: marginValue, bottom: marginValue},
              width = refEl.current.clientHeight - margin.left - margin.right,              
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              thickness = refEl.current.clientWidth - margin.left - margin.right > 500 ? 120 : 80; 
        
        const radius = Math.min(width, height) / 1.8 - margin.left;

        let arcPaths = d3.select(refEl.current).selectAll('.donut-path'),
            svg = d3.select(refEl.current).select('.svg g');
    
        const updatePie = d3.pie()
                        .startAngle(-90 * Math.PI/180)
                        .endAngle(-90 * Math.PI/180 + 2*Math.PI)
                        .value(d => d[`${selectedDonutFilter2}_value`])
                        .padAngle(.01)
                        .sort(null);

        const updateArc = d3.arc()    
                    .innerRadius(radius - thickness)
                    .outerRadius(radius);

        // Another arc that won't be drawn. Just for labels positioning
        const updateOuterArc = d3.arc()
                            .innerRadius(radius * 0.9)
                            .outerRadius(radius * 0.9)
        
        // update and transition arcs            
        arcPaths.data(updatePie(data))
                .transition().delay(function(d, i) { return i * 30; }).duration(500)
                .attr('d',d => updateArc(d))
                .each((d, i) => {
                    var firstArcSection = /(^.+?)L/;
                    
                    var newArc = firstArcSection.exec( updateArc(d) )[1];
                    newArc = newArc.replace(/,/g , " ");
                    
                    // re-append hidden arcs for the labels
                    svg.append('path')
                        .attr('class', 'hidden-donut-arcs')
                        .attr('id', `donutPath${i + 1}`)
                        .attr('d', newArc)
                        .style('fill', 'none');
                });
                                

       // re-append labels
       svg.selectAll('.arc-label')
            .data(data)
            .enter()
            .append("text")
            .attr('class', 'arc-label')
            .attr('dy', labelDyPosition) 
            .append("textPath")
            .attr("xlink:href", (d, i) => `#donutPath${i + 1}`)
            .style("text-anchor","middle")
            .attr("startOffset", "50%")
            .attr('fill', '#fff')
            .style('font-size', '0.8rem')
            .text(d => {
                if (width > 550) {
                    return d[`${selectedDonutFilter2}_value`] <= 4 ?  null : d[`${selectedDonutFilter}`];
                } else {
                    return d[`${selectedDonutFilter2}_value`] <= 6 ?  null : d[`${selectedDonutFilter}`];
                } 
            });
            
        // re-append polyline
        svg.selectAll('allPolylines')
            .data(updatePie(data))
            .enter()
            .append('polyline')
            .attr('class', 'polyline')
            .attr('stroke', d => {
                if (width > 550) {
                    return d.data[`${selectedDonutFilter2}_value`] <= 4 ? '#fff' : 'transparent';
                } else {
                    return d.data[`${selectedDonutFilter2}_value`] <= 6 ? '#fff' : 'transparent';
                }  
            })
            .style('fill', 'none')
            .attr('stroke-width', 1)
            .attr('points', function(d) {
                var posA = updateArc.centroid(d) // line insertion in the slice
                var posB = updateOuterArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = updateOuterArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            }); 

        // re-append polyline labels
        svg.selectAll('.polyline-label')
                .data(updatePie(data))
                .enter()
                .append('text')
                .attr('fill', '#fff')                        
                .attr('font-size', '0.8rem')
                .attr('class', 'polyline-label')
                //Move the labels below the arcs for slices with an end angle > than 90 degrees
                .attr('dy', function(d,i) {
                    if (width > 550) {
                        return d[`${selectedDonutFilter2}_value`] <= 4 ? 6 : (d.startAngle > 90 * Math.PI/180 ? 3 : -11);
                    } else {
                        return d[`${selectedDonutFilter2}_value`] <= 6 ? 6 : (d.startAngle > 90 * Math.PI/180 ? 5 : -11);
                    } 
                })
                .attr('transform', function(d) {
                    let pos = updateOuterArc.centroid(d);
                    let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    
                    if (width > 550) {
                        return d.data[`${selectedDonutFilter2}_value`] <= 4 && 'translate(' + pos + ')';
                    } else {
                        return d.data[`${selectedDonutFilter2}_value`] <= 6 && 'translate(' + pos + ')';
                    }
                })
                .style('text-anchor', function(d) {
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
                .text(d => {
                    if (width > 550) {
                        return d.data[`${selectedDonutFilter2}_value`] <= 4 ? d.data[`${selectedDonutFilter}`] : null;
                    } else {
                        return d.data[`${selectedDonutFilter2}_value`] <= 6 ? d.data[`${selectedDonutFilter}`] : null;
                    }  
                })   
    }

    const drawDonutChart = (data, refEl, tooltipRefEl, isDataChange) => {
        let whichFilter = isDataChange ? 'all' : selectedDonutFilter2;

        d3.select(refEl.current).selectAll('.svg').remove();  

        const containerWidth = refEl.current.clientWidth;
        
        const marginValue = containerWidth > 400 ? 60 : 40,
             labelFontSize =  containerWidth > 400 ? '0.8rem' : '0.7rem',
             labelDyPosition = containerWidth > 400 ? -13 : -5;

        const margin = {left: marginValue, right: marginValue, top: marginValue, bottom: marginValue},
        width = refEl.current.clientWidth - margin.left - margin.right,
        height = refEl.current.clientWidth - margin.top - margin.bottom,
        thickness = containerWidth > 500 ? 120 : 70; 
        console.log(containerWidth, width)
                          
        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top ) + ')')
            
        const radius = Math.min(width, height) / 1.8 - margin.left;

        const color = d3.scaleOrdinal()
                        .domain(data)
                        .range(['#695cff', '#ff9b00', '#00d885', '#e7045e', '#00aef4', '#271da1', '#b5730d', '#0e8758', '#a80f4c', '#0f688c'])

        const pie = d3.pie()
                        .startAngle(-90 * Math.PI/180)
                        .endAngle(-90 * Math.PI/180 + 2*Math.PI)
                        .value(d => d[`${whichFilter}_value`])
                        .padAngle(.01)
                        .sort(null);

        const arc = d3.arc()
                    .innerRadius(radius - thickness)
                    .outerRadius(radius);

        // Another arc that won't be drawn. Just for labels positioning
        const outerArc = d3.arc()
                        .innerRadius(radius * 0.9)
                        .outerRadius(radius * 0.9)

        svg.selectAll('.donut-path')
                        .data(pie(data))
                        .enter()
                        .append('path')
                        .attr('class', 'donut-path')
                        .attr('fill', (d, i) => color(d.data[`${selectedDonutFilter}`]) )
                        .attr('stroke', '#000')
                        .attr('stroke-width', '3px')
                        .transition().delay(function(d, i) { return i * 30; }).duration(500)
                        .attrTween('d', d => arcTween(d))                        
                        .each((d, i) => {
                            
                            //A regular expression that captures all in between the start of a string
                            //(denoted by ^) and the first capital letter L
                            var firstArcSection = /(^.+?)L/;
                            
                            //The [1] gives back the expression between the () (thus not the L as well)
                            //which is exactly the arc statement
                            var newArc = firstArcSection.exec( arc(d) )[1];
                            //Replace all the comma's so that IE can handle it -_-
                            //The g after the / is a modifier that "find all matches rather than
                            //stopping after the first match"
                            newArc = newArc.replace(/,/g , " ");

                            //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
                            //flip the end and start position
                            // if (d.endAngle > 90 * Math.PI/180) { 
                            // if (d.startAngle > 90 * Math.PI/180) { 
                            //     //Everything between the capital M and first capital A
                            //     var startLoc = /M(.*?)A/;
                            //     //Everything between the capital A and 0 0 1
                            //     var middleLoc = /A(.*?)0 0 1/;
                            //     //Everything between the 0 0 1 and the end of the string (denoted by $)
                            //     var endLoc = /0 0 1 (.*?)$/;
                            //     //Flip the direction of the arc by switching the start and end point
                            //     //and using a 0 (instead of 1) sweep flag
                            //     var newStart = endLoc.exec( newArc )[1];
                            //     var newEnd = startLoc.exec( newArc )[1];
                            //     var middleSec = middleLoc.exec( newArc )[1];

                            //     //Build up the new arc notation, set the sweep-flag to 0
                            //     newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
                            // }
                            
                            //Create a new invisible arc that the text can flow along
                            svg.append('path')
                                .attr('class', 'hidden-donut-arcs')
                                .attr('id', `donutPath${i + 1}`)
                                .attr('d', newArc)
                                .style('fill', 'none');
                        });                                
        
        function arcTween(dataEl) {
            var i = d3.interpolate(dataEl.startAngle+0.1, dataEl.endAngle);
            return function(t) {
                dataEl.endAngle = i(t);
                return arc(dataEl);
            }
        }

        //Create an SVG text element and append a textPath element
        const arcLabel = svg.selectAll('.arc-label')
                            .data(data)
                            .enter()
                            .append("text")
                            .attr('class', 'arc-label')
                            .attr('dy', labelDyPosition) 
                            .append("textPath") //append a textPath to the text element
                            .attr("xlink:href", (d, i) => `#donutPath${i + 1}`) //place the ID of the path here
                            .style("text-anchor","middle") //place the text halfway on the arc
                            .attr("startOffset", "50%")
                            .attr('fill', '#fff')
                            .style('font-size', labelFontSize)
                            .text(d => {
                                if (width > 550) {
                                    return d[`${selectedDonutFilter2}_value`] <= 4 ?  null : d[`${selectedDonutFilter}`];
                                } else {
                                    return d[`${selectedDonutFilter2}_value`] <= 6 ?  null : d[`${selectedDonutFilter}`];
                                }  
                            });


        // If the arc is too small to append the label, add a polyline
        const polyline = svg.selectAll('allPolylines')
                        .data(pie(data))
                        .enter()
                        .append('polyline')
                        .attr('class', 'polyline')
                        .attr('stroke', d => {
                            if (width > 550) {
                                return d.data[`${selectedDonutFilter2}_value`] <= 4 ? '#fff' : 'transparent';
                            } else {
                                return d.data[`${selectedDonutFilter2}_value`] <= 6 ? '#fff' : 'transparent';
                            }                            
                        })
                        .style('fill', 'none')
                        .attr('stroke-width', 1)
                        .attr('points', function(d) {
                            var posA = arc.centroid(d) // line insertion in the slice
                            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                            var posC = outerArc.centroid(d); // Label position = almost the same as posB
                            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                            return [posA, posB, posC]
                        }); 

         //Append the label names on the polyline
         const polylineLabel = svg.selectAll('.polyline-label')
                                .data(pie(data))
                                .enter()
                                .append('text')
                                .attr('fill', '#fff')                        
                                .attr('font-size', labelFontSize)
                                .attr('class', 'polyline-label')
                                //Move the labels below the arcs for slices with an end angle > than 90 degrees
                                .attr('dy', function(d,i) {
                                    if (width > 550) {
                                        return d[`${selectedDonutFilter2}_value`] <= 4 ? 6 : (d.startAngle > 90 * Math.PI/180 ? 3 : -11);
                                    } else {
                                        return d[`${selectedDonutFilter2}_value`] <= 6 ? 6 : (d.startAngle > 90 * Math.PI/180 ? 5 : -11);
                                    }
                                })
                                .attr('transform', function(d) {
                                    let pos = outerArc.centroid(d);
                                    let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);

                                    if (width > 550) {
                                        return d.data[`${selectedDonutFilter2}_value`] <= 4 && 'translate(' + pos + ')';
                                    } else {
                                        return d.data[`${selectedDonutFilter2}_value`] <= 6 && 'translate(' + pos + ')';
                                    }
                                })
                                .style('text-anchor', function(d) {
                                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                                    return (midangle < Math.PI ? 'start' : 'end')
                                })
                                .text(d => {
                                    if (width > 550) {
                                        return d.data[`${selectedDonutFilter2}_value`] <= 4 ? `${d.data[`${selectedDonutFilter}`]}` : null;
                                    } else {
                                        return d.data[`${selectedDonutFilter2}_value`] <= 6 ? `${d.data[`${selectedDonutFilter}`]}` : null;
                                    }        
                                })                

        const path = d3.select(refEl.current).selectAll('.donut-path');
        setTimeout(() => {
            path.on('mouseover' , e => {                             
                mouseOverBar(e);                                                    
            })
            .on('mouseout', mouseOutBar); 
        }, 700)      

        function mouseOverBar(event) {
            const targetData = event.target.__data__;

            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);
            
            setTooltipDesc({label: targetData.data[`${selectedDonutFilter}`], value: targetData.data[`${selectedDonutFilter2}_value`]})

            path.transition()
                .duration(200)
                .attr('opacity', d => {
                    return d.data[`${selectedDonutFilter}`] === targetData.data[`${selectedDonutFilter}`] ? 1 : 0.5;
                });              
        }   
        
        function mouseOutBar() {
            d3Tooltip.style('visibility', 'hidden')
                    .style('top', `0`)
                    .style('left', `0`);
           
            setTooltipDesc({}); 
            
            path.transition()
            .duration(200)
            .attr('opacity', 1);
        }
    }  

    const handleResize = (refEl, data) => {
        let paths = d3.select(refEl.current).selectAll('.donut-path'),
            polylines = d3.select(refEl.current).selectAll('.polyline'),
            polylineLabels = d3.select(refEl.current).selectAll('.polyline-label');
        
        const containerWidth = refEl.current.clientWidth;

        const marginValue = containerWidth > 400 ? 60 : 40;

        const margin = {left: marginValue, right: marginValue, top: marginValue, bottom: marginValue},
        newWidth = refEl.current.clientWidth - margin.left - margin.right,              
        newHeight = refEl.current.clientWidth - margin.top - margin.bottom,
        thickness = newWidth > 500 ? 120 : 80;
        
        const newD3Ref = d3.select(refEl.current),
            newSvg = newD3Ref.select('.svg');

        const newRadius = Math.min(newWidth, newHeight) / 1.8 - margin.left,
            newArc = d3.arc()
                        .innerRadius(newRadius - thickness)
                        .outerRadius(newRadius),
            newOuterArc = d3.arc()
                            .innerRadius(newRadius * 0.9)
                            .outerRadius(newRadius * 0.9);

        newSvg.attr('width', newWidth + margin.left + margin.right)
            .attr('height', newHeight + margin.top + margin.bottom)  
            
        newSvg.select('g')  
            .attr('transform','translate(' + (newWidth / 2 + margin.left) + ',' + (newHeight / 2 + margin.top ) + ')')  

        paths.attr('d', newArc)
            .each((d, i) => {
                var firstArcSection = /(^.+?)L/;
                
                var diffArc = firstArcSection.exec( newArc(d) )[1];
                diffArc = diffArc.replace(/,/g , " ");

                newSvg.select(`#donutPath${i + 1}`)
                    .attr('d', diffArc)
            });

        polylines.attr('points', function(d) {
                    var posA = newArc.centroid(d) // line insertion in the slice
                    var posB = newOuterArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                    var posC = newOuterArc.centroid(d); // Label position = almost the same as posB
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                    posC[0] = newRadius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                    return [posA, posB, posC]
                });

        polylineLabels.attr('transform', function(d) {
                            let pos = newOuterArc.centroid(d);
                            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                            pos[0] = newRadius * 0.99 * (midangle < Math.PI ? 1 : -1);
                            
                            if (newWidth > 550) {
                                return d.data[`${selectedDonutFilter2}_value`] <= 4 && 'translate(' + pos + ')';
                            } else {

                                return d.data[`${selectedDonutFilter2}_value`] <= 6 && 'translate(' + pos + ')';
                            }
                         })     
    }
        
    return { 
                drawDonutChart, 
                updateDonutChart,
                tooltipDesc,
                handleResize,
            };
}

export default DonutChartLogic;