import { useState, } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';

const BarChartHorizontalLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, } = HandleData();

    const drawBarChart = (data, refEl, tooltipRefEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();  
        
        let barHeight,
            chartHeight,
            gapBetween = 10;

        if (deviceType === 'Mobile') {
            barHeight = 30;
        } else if (data.length > 10) {
            barHeight = 50;
        } else {
            barHeight = 60;
        }
        
        chartHeight = (barHeight * data.length) + (gapBetween * data.length);

        let getAvgVal = data.reduce(function(a, b) {
            return parseInt(a) + parseInt(b.value)}, 0 ) / data.length;

        const margin = {left: deviceType !== 'Mobile' ? 200 : 100, right: 30, top: 40, bottom: 40},
              width = refEl.current.clientWidth - margin.left - margin.right,              
              height = chartHeight - margin.top - margin.bottom,              
              highestValue = parseInt(data[0].value) + 5; 

        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
            
        let xAxis = d3.scaleLinear()
                .domain([0, highestValue]) 
                .range([ 0, width]);            
                
        let yAxis = d3.scaleBand()
                        .range([ 0, height ])
                        .domain(data.map(function(d) { return d.label; }))
                        .padding(.1);

        const yAxisLine = d3.axisLeft(yAxis).tickSize(0).tickFormat('');                                                                   
        
        const bars = svg.selectAll('.bar-rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('class', (d, i) => {
                            return `bar-rect bar-rect-${d.label}`;
                             
                        })
                        .attr('x', xAxis(0) )
                        .attr('y', function(d) { return yAxis(d.label); })                        
                        .attr('width', d => { return 0; })
                        .attr('height', yAxis.bandwidth() - gapBetween )
                        .attr('fill', d => {
                            let color;
                            d.value > getAvgVal ? color = '#35F97E' : color = '#695cff';  
                            return color;                          
                        })
                        

        bars.transition()
            .duration(500)                        
            .attr('width', d => { 
                return xAxis(Math.round(d.value)); 
            })
            .delay( (d, i) => {
                return i * 100
            })  

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
                            return -10;
                        })
                        .attr('y', (d,i) => {
                            return yAxis(d.label) + (yAxis.bandwidth() / 2);
                        })
                        .attr('text-anchor', 'end')
                        .attr('font-size', '14px')
                        .attr('font-weight', '600')
                        .text(d => {
                            if (deviceType === 'Mobile' && d.label.length > 9) {
                                return `${d.label.substr(0, 9)}..`;
                            } else {
                                return d.label;
                            }
                        });
        
        const values = svg.selectAll('.bar-value')
                        .data(data)
                        .enter()
                        .append('text')
                        .attr('fill', () => {
                            return '#fff';
                        })
                        .attr('class', (d, i) => {
                            return 'bar-value';
                        })
                        .attr('x', (d, i) => {
                            return xAxis(Math.round(d.value)) + 10;
                        })
                        .attr('y', (d,i) => {
                            return yAxis(d.label) + (yAxis.bandwidth() / 2);
                        })
                        .attr('text-anchor', 'start')
                        .attr('font-size', '14px')
                        .attr('font-weight', '600')
                        .text(d => {
                            return `${Math.round(d.value)}%`;
                        });                         
            
        svg.append('g')
            .attr('class', 'y-axis-line')
            .call(yAxisLine)

        function mouseOverBar(event) {
            const targetData = event.target.__data__;

            if (deviceType === 'Mobile') {
                setTooltipDesc({label: targetData.label});

                d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);
            }
            
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

            values.transition() 
                .duration(200)
                .attr('opacity', d => {
                    if (d.label !== targetData.label) {
                        return 0.5; 
                    } else {
                        return 1;
                    }
                });    
        }   
        
        function mouseOutBar() {
            if (deviceType === 'Mobile') {
                d3Tooltip.style('visibility', 'hidden')
                        .style('top', `0`)
                        .style('left', `0`);
            }
           
            setTooltipDesc({});  

            bars.transition()
                .attr('opacity', 1);

            labels.transition()
                .attr('opacity', 1);

            values.transition()
                .attr('opacity', 1);
        }
    }  

    const handleResize = (refEl, data) => {
        let barHeight,
            chartHeight,
            gapBetween = 10;

        if (deviceType === 'Mobile') {
            barHeight = 30;
        } else if (data.length > 10) {
            barHeight = 40;
        } else {
            barHeight = 60;
        }
        
        chartHeight = (barHeight * data.length) + (gapBetween * data.length);

        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar-rect'),
            labels = d3Ref.selectAll('.bar-label'),
            values = d3Ref.selectAll('.bar-value'),
            yLine = d3Ref.select('.y-axis-line');

        const margin = {left: deviceType !== 'Mobile' ? 200 : 100, right: 30, top: 40, bottom: 40},
              newWidth = refEl.current.clientWidth - margin.left - margin.right,              
              newHeight = chartHeight - margin.top - margin.bottom,
              highestValue = parseInt(data[0].value) + 10; 
            
        svg.attr('width', newWidth + margin.left + margin.right)
            .attr('height', newHeight + margin.top + margin.bottom)
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

        let newXAxis = d3.scaleLinear()
            .domain([0, highestValue]) 
            .range([ 0, newWidth]);            
            
        let newYAxis = d3.scaleBand()
                    .range([ 0, newHeight ])
                    .domain(data.map(function(d) { return d.label; }))
                    .padding(.1);

        const newYAxisLine = d3.axisLeft(newYAxis).tickSize(0).tickFormat('');         

        bars.attr('x', newXAxis(0) )
            .attr('y', function(d) { return newYAxis(d.label); })                        
            .attr('width', d => { return newXAxis(d.value); })
            .attr('height', newYAxis.bandwidth() - gapBetween );

        labels.attr('x', (d, i) => {
                    return -10;
                })
                .attr('y', (d,i) => {
                    return newYAxis(d.label) + (newYAxis.bandwidth() / 2);
                })
        
        values.attr('x', (d, i) => {
                return newXAxis(d.value) + 10;
            })
            .attr('y', (d,i) => {
                return newYAxis(d.label) + (newYAxis.bandwidth() / 2);
            })

        yLine.call(newYAxisLine);

    }
        
    return { 
                drawBarChart, 
                tooltipDesc,
                handleResize,
            };
}

export default BarChartHorizontalLogic;