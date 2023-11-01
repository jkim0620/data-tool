import { useState, useContext, useEffect } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';
import ToolContext from '../../hooks/ToolContext';

const DotPlotChartLogic = () => {  
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

    const drawDotPlot = (data, refEl, tooltipRefEl, isDataChange) => {
        d3.select(refEl.current).selectAll('.svg').remove();  

        const rowHeight = 80;

        const margin = {left: 150, right: 30, top: 10, bottom: 10},
        width = refEl.current.clientWidth - margin.left - margin.right,
        height = (rowHeight * data.length) - margin.top - margin.bottom;
                          
        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')        

        const colors = [{color: 'magenta', hex: '#e7045e'}, {color: 'yolk', hex: '#ff9b00'}, {color: 'white', hex: '#fff'}, {color: 'sky', hex: '#00aef4'},  {color: 'emerald', hex: '#00d885'}]

        // Add X axis
        const xAxis = d3.scaleLinear()
                        .domain([0, 100])
                        .range([ 0, width]);
                        svg.append('g')
                        .attr('transform', 'translate(0,' + 30 + ')')
                        .call(d3.axisTop(xAxis))
                        .selectAll('text')
                        .attr('fill', '#fff')
                        .attr('y', 0)
                        .attr('x', 0)
                        .attr('font-size', '0.8rem')
                        .style('text-anchor', d => { 
                            if (d === 0) {
                                return 'start';
                            } else if (d === 50) {
                                return 'middle';
                            } else if (d === 100) {
                                return 'end';
                            } else {
                                return null;
                            }                        
                        })
                        .text(d => {                         
                            if (d === 0) {
                                return 'Piloting';
                            } else if (d === 50) {
                                return 'Scaling';
                            } else if (d === 100) {
                                return 'Fully Deployed';
                            } else {
                                return null;
                            }
                         })

        // Y axis
        const yAxis = d3.scaleBand()
                        .range([ 0, height ])
                        .domain(data.map(function(d) { return d.group; }))
                        .padding(1);
                        svg.append('g')
                        .call(d3.axisLeft(yAxis))
                        .selectAll('text')
                        .attr('fill', '#fff')
                        .attr('y', -1)
                        .attr('x', -15)
                        .attr('font-size', '0.8rem')
                        .style('text-anchor', 'end')
                        .call(textWrap, margin.left - 15); 

        // Lines
        const dotPlotLines = svg.selectAll('.dot-plot-line')
                                .data(data)
                                .enter()
                                .append('line')
                                .attr('x1', function(d) { return xAxis(0); })
                                .attr('x2', function(d) { return xAxis(100); })
                                .attr('y1', function(d) { return yAxis(d.group); })
                                .attr('y2', function(d) { return yAxis(d.group); })
                                .attr('class', 'dot-plot-line')
                                .attr('stroke', 'grey')
                                .attr('stroke-width', '1px');
        
        // Append tick line for 0%
        svg.selectAll('.tick-line-0')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'tick-line-0')
            .attr('x1', xAxis(0))
            .attr('x2', d =>  xAxis(0) )
            .attr('y1', d => yAxis(d.group) - 10 )
            .attr('y2', d =>  yAxis(d.group) + 10 )
            .style('stroke', '#888');

        // Append tick line for 50%
        svg.selectAll('.tick-line-50')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'tick-line-50')
            .attr('x1', xAxis(50))
            .attr('x2', d =>  xAxis(50) )
            .attr('y1', d => yAxis(d.group) - 10 )
            .attr('y2', d =>  yAxis(d.group) + 10 )
            .style('stroke', '#888');
        
        // Append tick line for 100%
        svg.selectAll('.tick-line-100')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'tick-line-100')
            .attr('x1', xAxis(100))
            .attr('x2', d =>  xAxis(100) )
            .attr('y1', d => yAxis(d.group) - 10 )
            .attr('y2', d =>  yAxis(d.group) + 10 )
            .style('stroke', '#888');    
        
        // append the dots for each category by looping through the colors array
        colors.forEach(el => {
            svg.selectAll(`.dot_${el.color}`)
                .data(data)
                .enter()
                .append('circle')
                .attr('class', `dot dot_${el.color}`)
                .attr('cy', function(d) { return yAxis(d.group); })
                .transition()
                .duration(700)    
                .delay( (d, i) => {
                    return i * 100
                })                     
                .attr('cx', function(d) { return xAxis(d[`value_${el.color}`] - 10); })
                .attr('r', 7)
                .style('fill', el.hex);                         
        });  

          

        let dots = d3.select(refEl.current).selectAll('.dot');
        setTimeout(() => {
            svg.selectAll(`.dot_emph`)
                .data(data)
                .enter()
                .append('circle')
                .attr('class', `dot_emph`)
                .attr('cy', function(d) { return yAxis(d.group); })              
                .attr('cx', function(d) { return xAxis(d[`value_emerald`] - 10); })
                .style('fill', 'none')
                .transition()
                .duration(400)
                .attr('stroke', d => {
                    console.log(d.value_emerald > 85)
                    return parseInt(d.value_emerald) > 85 ? '#00d885' : 'transparent';
                })   
                .attr('r', 12)
                .attr('stroke-width', '2px')

                dots.on('mouseover', mouseOverDot)
            .on('mouseout', mouseOutDot)
        }, 1500)        

        function mouseOverDot(event) {
            const targetData = event.target.__data__;

            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);
            
            dots.transition().duration(200)
                .attr('opacity', 0.5);   

            d3.select(this).transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('r', 8);              
        }   
        
        function mouseOutDot() {
            d3Tooltip.style('visibility', 'hidden')
                    .style('top', `0`)
                    .style('left', `0`);
           
            setTooltipDesc({}); 
            
            dots.transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('r', 7);   
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
                drawDotPlot, 
                updateDonutChart,
                tooltipDesc,
                handleResize,
            };
}

export default DotPlotChartLogic;