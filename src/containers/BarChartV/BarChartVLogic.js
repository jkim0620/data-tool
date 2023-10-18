import { useState, } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';

const BarChartVerticalLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, } = HandleData();

    const drawBarChart = (data, refEl, tooltipRefEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();  
        
        let barHeight,
            chartHeight,
            gapBetween = 20;

        const margin = {left: 30, right: 30, top: 40, bottom: 100},
              width = refEl.current.clientWidth - margin.left - margin.right,              
              height = 700 - margin.top - margin.bottom,              
              highestValue = parseInt(data[0].value) + 5; 

        //const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);

        let getAvgVal = data.reduce(function(a, b) {
            return a + parseInt(b.value)}, 0 ) / data.length;
            
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
            
        let xAxis = d3.scaleBand()
                        .range([ 0, width ])
                        .domain(data.map(function(d) { return d.label; }))
                        .padding(.1);           
                
        let yAxis = d3.scaleLinear()
                        .domain([0, 60])
                        .range([ height, 0 ]);

        const xAxisLine = d3.axisBottom(xAxis).tickSize(0);
        
        // var line = d3.line()
        //             .x(function(d, i) {
        //                 //console.log('x value', xAxis(d3.timeParse("%Y-%m-%d")(d.date)))
        //                 return xAxis(d.date)); 
        //             }) 
        //             .y(function(d) { 
        //                 //console.log('y value', yAxis(d.value))
        //                 return yAxis(d.value); 
        //             }) 

        
        
        const bars = svg.selectAll('.bar-rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('class', (d, i) => {
                            return `bar-rect bar-rect-${d.label}`;
                             
                        })
                        .attr('x', function(d) { return xAxis(d.label); } )
                        .attr('y', function(d) { 
                            return yAxis(0); 
                        })                        
                        .attr('width', xAxis.bandwidth() - gapBetween)
                        .attr('height', function(d) { return height - yAxis(0); } )
                        .attr('fill', d => {
                            let color;
                            d.value > getAvgVal ? color = '#35F97E' : color = '#695cff';                           
                            return color;
                        })
                        

        bars.transition()
            .duration(500)                        
            .attr('height', d => { 
                return height - yAxis(Math.round(d.value)); 
            })
            .attr('y', function(d) { 
                return yAxis(Math.round(d.value)); 
            }) 
            .delay( (d, i) => {
                return i * 100
            })
            
        // let avgLine = svg
        //                     .append('line')
        //                     .attr('class', 'avg-line')
        //                     .attr('x1', xAxis(getAvgVal))
        //                     .attr('x2', xAxis(getAvgVal))
        //                     .attr('y1', 0)
        //                     .attr('y2', height)
        //                     .style("fill", "none")
        //                     .style("stroke", "#fff")
        //                     .style("stroke-width", "2");    

        setTimeout(() => {
            bars.on('mouseover' , e => {                                        
                mouseOverBar(e);                                                    
            })
            .on('mouseout', mouseOutBar); 
        }, data.length * 100 + 500)    
                        
        const labels = svg.selectAll('.bar-label')
                        .data(data)
                        .enter()
                        .append('text')
                        .attr('fill', () => {
                            return '#fff';
                        })
                        .attr('class', (d, i) => {
                            return 'bar-label';
                        })
                        .attr('x', (d, i) => {
                            return xAxis(d.label) + 20;
                        })
                        .attr('y', (d,i) => {
                            return yAxis(Math.round(d.value)) - 10; 
                        })
                        .attr('font-size', '14px')
                        .attr('font-weight', '600')
                        .text(d => {
                            if (deviceType === 'Mobile' && d.label.length > 9) {
                                return `${d.value.substr(0, 9)}..`;
                            } else {
                                return `${Math.round(d.value)}%`;
                            }
                        })
                        .attr('text-anchor', 'center');
        
        // const values = svg.selectAll('.bar-value')
        //                 .data(data)
        //                 .enter()
        //                 .append('text')
        //                 .attr('fill', () => {
        //                     return '#fff';
        //                 })
        //                 .attr('class', (d, i) => {
        //                     return 'bar-value';
        //                 })
        //                 .attr('x', (d, i) => {
        //                     return xAxis(d.value) + 10;
        //                 })
        //                 .attr('y', (d,i) => {
        //                     return yAxis(d.label) + (yAxis.bandwidth() / 2);
        //                 })
        //                 .attr('text-anchor', 'start')
        //                 .attr('font-size', '14px')
        //                 .attr('font-weight', '600')
        //                 .text(d => {
        //                     return `${d.value}%`;
        //                 });                         
            
        svg.append('g')
            .attr('class', 'x-axis-line')
            .attr("transform", "translate(0," + height + ")")            
            .call(xAxisLine)
            .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-45)")
            .attr('fill', '#eee')
            .attr('font-size', '12px')
            .attr('font-weight', '400')
            .style("text-anchor", "end");

        svg.select('.x-axis-line path')
            .attr('stroke', '#fff')
            .attr('stroke-width', '1px');    

        let avgLine = svg.append('line')                        
                        .attr('class', 'x-avg-line')
                        .attr('x1', xAxis(data[6].label) - 15)
                        .attr('x2', xAxis(data[6].label) - 15)
                        .attr('y1', 50)
                        .attr('y2', height) 
                        .style("fill", "none")
                        .style("stroke", "#d4d4d4")
                        .style("stroke-dasharray", ("5, 7")) 
                        .style("stroke-width", "2"); 
                        
        svg.append('text')
            .attr("text-anchor", "middle")
            .attr("y", 15)
            .attr("x", xAxis(data[6].label) - 15)
            .attr('fill', '#fff') 
            .text('Average') 
            
        svg.append('text')
            .attr("text-anchor", "middle")
            .attr("y", 35)
            .attr("x", xAxis(data[6].label) - 15)
            .attr('fill', '#fff') 
            .text('14%') 

                        
        // avgLine.transition()
        //     .delay(2000)             
        //     .duration(500)                        
            
            
            
        function mouseOverBar(event) {
            const targetData = event.target.__data__;

            // if (deviceType === 'Mobile') {
            //     setTooltipDesc({label: targetData.label});

            //     d3Tooltip.style('visibility', 'visible')
            //         .style('top', `${event.clientY + 20}px`)
            //         .style('left', `${event.clientX - 50}px`);
            // }
            
            bars.transition()
                .duration(200)
                .attr('opacity', d => {
                    if (d.label !== targetData.label) {
                        return 0.3; 
                    } else {
                        return 1;
                    }
                });

            labels.transition() 
                .duration(200)
                .attr('opacity', d => {
                    if (d.label !== targetData.label) {
                        return 0.5; 
                    } else {
                        return 1;
                    }
                });

            // values.transition() 
            //     .duration(200)
            //     .attr('opacity', d => {
            //         if (d.label !== targetData.label) {
            //             return 0.5; 
            //         } else {
            //             return 1;
            //         }
            //     });    
        }   
        
        function mouseOutBar() {
            // if (deviceType === 'Mobile') {
            //     d3Tooltip.style('visibility', 'hidden')
            //             .style('top', `0`)
            //             .style('left', `0`);
            // }
           
            setTooltipDesc({});  

            bars.transition()
                .attr('opacity', 1);

            labels.transition()
                .attr('opacity', 1);

            // values.transition()
            //     .attr('opacity', 1);
        }
    }  

    // const handleResize = (refEl, data) => {
    //     let barHeight,
    //         chartHeight,
    //         gapBetween = 10;

    //     if (deviceType === 'Mobile') {
    //         barHeight = 30;
    //     } else if (data.length > 10) {
    //         barHeight = 40;
    //     } else {
    //         barHeight = 60;
    //     }
        
    //     chartHeight = (barHeight * data.length) + (gapBetween * data.length);

    //     const d3Ref = d3.select(refEl.current),
    //         svg = d3Ref.select('.svg'),
    //         bars = d3Ref.selectAll('.bar-rect'),
    //         labels = d3Ref.selectAll('.bar-label'),
    //         values = d3Ref.selectAll('.bar-value'),
    //         yLine = d3Ref.select('.y-axis-line');

    //     const margin = {left: deviceType !== 'Mobile' ? 200 : 100, right: 30, top: 40, bottom: 40},
    //           newWidth = refEl.current.clientWidth - margin.left - margin.right,              
    //           newHeight = chartHeight - margin.top - margin.bottom,
    //           highestValue = parseInt(data[0].value) + 10; 
            
    //     svg.attr('width', newWidth + margin.left + margin.right)
    //         .attr('height', newHeight + margin.top + margin.bottom)
    //         .append('g')
    //         .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    //     let newXAxis = d3.scaleLinear()
    //         .domain([0, highestValue]) 
    //         .range([ 0, newWidth]);            
            
    //     let newYAxis = d3.scaleBand()
    //                 .range([ 0, newHeight ])
    //                 .domain(data.map(function(d) { return d.label; }))
    //                 .padding(.1);

    //     const newYAxisLine = d3.axisLeft(newYAxis).tickSize(0).tickFormat('');         

    //     bars.attr('x', newXAxis(0) )
    //         .attr('y', function(d) { return newYAxis(d.label); })                        
    //         .attr('width', d => { return newXAxis(d.value); })
    //         .attr('height', newYAxis.bandwidth() - gapBetween );

    //     labels.attr('x', (d, i) => {
    //                 return -10;
    //             })
    //             .attr('y', (d,i) => {
    //                 return newYAxis(d.label) + (newYAxis.bandwidth() / 2);
    //             })
        
    //     values.attr('x', (d, i) => {
    //             return newXAxis(d.value) + 10;
    //         })
    //         .attr('y', (d,i) => {
    //             return newYAxis(d.label) + (newYAxis.bandwidth() / 2);
    //         })

    //     yLine.call(newYAxisLine);

    //}
        
    return { 
                drawBarChart, 
                // tooltipDesc,
                // handleResize,
            };
}

export default BarChartVerticalLogic;