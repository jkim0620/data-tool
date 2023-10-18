import { useState, useContext } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';
import ToolContext from '../../hooks/ToolContext';

const StackedBarChartHorizontalLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, } = HandleData();
    const { selectedStackedFilter } = useContext(ToolContext);
    
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

        const margin = {left: deviceType !== 'Mobile' ? 250 : 100, right: 30, top: 40, bottom: 40},
              width = refEl.current.clientWidth - margin.left - margin.right,              
              height = chartHeight - margin.top - margin.bottom;              

        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
            
        let keys = data.columns.slice(1);  
        
        let stackedData = d3.stack()
                            .keys(keys)
                            (data);

        stackedData.map((d,i) => {
                        d.map(d => {
                            d.key = keys[i]
                            return d
                        })
                            return d
                        });
        
        let xAxis = d3.scaleLinear()
                .domain([0, 100]) 
                .range([ 0, width]);            
                
        let yAxis = d3.scaleBand()
                        .range([ 0, height ])
                        .domain(data.map(function(d) { return d.group; }))
                        .padding(.1);                                                
        
        // Draw x axis line and text                        
        svg.append('line')  
            .attr('class', 'xaxis-tick')
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(25))
            .attr("y1", 0)
            .attr("x2", xAxis(25))
            .attr("y2", height);             

        svg.append('line') 
            .attr('class', 'xaxis-tick') 
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(50))
            .attr("y1", 0)
            .attr("x2", xAxis(50))
            .attr("y2", height); 
                        
        svg.append('line')  
            .attr('class', 'xaxis-tick')
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(75))
            .attr("y1", 0)
            .attr("x2", xAxis(75))
            .attr("y2", height);         

        svg.append('text')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(25))
            .attr('y', height + 25) 
            .attr('text-anchor', 'middle')     
            .style('font-size', '0.9rem')
            .text('25%')
        
        svg.append('text')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(50))
            .attr('y', height + 25) 
            .attr('text-anchor', 'middle')     
            .style('font-size', '0.9rem')
            .text('50%')
            
        svg.append('text')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(75))
            .attr('y', height + 25) 
            .attr('text-anchor', 'middle')     
            .style('font-size', '0.9rem')
            .text('75%')

        svg.append('text')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(100))
            .attr('y', height + 25) 
            .attr('text-anchor', 'middle')     
            .style('font-size', '0.9rem')
            .text('100%')
        
        const color = d3.scaleOrdinal()
                        .domain(keys)
                        .range(['#444','#e7045e','#ff9b00', '#00d885', '#00aef4'])
        
        let bars; 
        // 2 ways to render bars depending on the filter selection
        if (selectedStackedFilter === 'full') {
            bars = svg.append('g')
                        .selectAll('g')
                        .data(stackedData)
                        .enter()
                        .append('g')
                        .attr('fill', d => color(d.key))
                        .selectAll('rect')
                        .data(d => d)
                        .enter()
                        .append('rect')
                        .attr('x', d => xAxis(d[0]))
                        .attr('y', d => yAxis(d.data.group))                        
                        .attr('width', 0 )
                        .attr('height', yAxis.bandwidth() - gapBetween )  
                        .attr('stroke', '#000')
                        .attr('stroke-width', 3)                      
        } else {
            bars = svg.selectAll('.bar-rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar-rect')
                        .attr('x', xAxis(0) )
                        .attr('y', d => yAxis(d[`group`]))                        
                        .attr('width',  0)
                        .attr('height', yAxis.bandwidth() - gapBetween )
                        .attr('fill', d => color(selectedStackedFilter))
        }               
        
        // add animation to the bars
        bars.transition()
            .duration(500)                        
            .attr('width', d => { 
                if (selectedStackedFilter === 'full') {
                    return xAxis(d[1]) - xAxis(d[0]); 
                } else {
                    return xAxis(d[`${selectedStackedFilter}`]);
                }
            })
            .delay( (d, i) => {
                return i * 100
            })  

        setTimeout(() => {
            bars.on('mouseover' , e => {  
                console.log('MOUSE OVER')                                      
                mouseOverBar(e);                                                    
            })
            .on('mouseout', mouseOutBar); 
        }, data.length * 100 + 500)    

        // Draw y axis line and append labels
        const yAxisLine = d3.axisLeft(yAxis).tickSize(0).tickPadding(8);    

        svg.append('g')
            .attr('class', 'y-axis-line')
            .attr('fill', '#fff')
            .call(yAxisLine)
            .selectAll("text")
            .attr('fill', '#fff')
            .attr("y", -3)
            .style('font-size', '0.8rem')
            .style("text-anchor", "end"); 
            
        svg.append('line')  
            .attr('class', 'xaxis-tick-100')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(100))
            .attr("y1", 0)
            .attr("x2", xAxis(100))
            .attr("y2", height); 

        function mouseOverBar(event) {
            const targetData = event.target.__data__;

            const keyName = {
                not_investing : "Not Investing",
                investing : "Investing, but not Piloting",
                piloting : "Piloting",
                pilot_to_scaling : "Moving from Piloting to Scaling",
                fully_deployed: "Fully Deployed"
            }

            selectedStackedFilter === 'full' ? setTooltipDesc({label: keyName[`${targetData.key}`], value: targetData.data[`${targetData.key}`]}) : setTooltipDesc({label: keyName[`${selectedStackedFilter}`], value: targetData[`${selectedStackedFilter}`]}); 

            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);

            d3.selectAll('.xaxis-tick')
                .style('opacity', 0.3);
            
            if (selectedStackedFilter === 'full') {
                bars.transition()
                .duration(200)
                .attr('opacity', d => {
                    if (d.key === targetData.key && d.data["group"] === targetData.data["group"]) {
                        return 1; 
                    } else {
                        return 0.5;
                    }
                });
            } else {
                bars.transition()
                .duration(200)
                .attr('opacity', d => {
                    if (d.key === targetData.key && d.data["group"] === targetData.data["group"]) {
                        return 1; 
                    } else {
                        return 0.5;
                    }
                });
            }  
              
        }   
        
        function mouseOutBar() {
            d3Tooltip.style('visibility', 'hidden')
                    .style('top', `0`)
                    .style('left', `0`);
           
            setTooltipDesc({});  

            d3.selectAll('.xaxis-tick')
                .style('opacity', 1);

            bars.transition()
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

export default StackedBarChartHorizontalLogic;