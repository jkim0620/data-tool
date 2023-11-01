import { useState, useContext } from 'react';
import * as d3 from 'd3';
import HandleData from '../../hooks/HandleData';
import ToolContext from '../../hooks/ToolContext';

const StackedBarChartHorizontalLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, textWrap } = HandleData();
    const { selectedStackedFilter } = useContext(ToolContext);
    
    const drawBarChart = (data, refEl, tooltipRefEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();  
        
        let barHeight,
            chartHeight,
            gapBetween = 10,
            xaxisFontSize,
            xaxisMarginTop,
            yaxisFontSize,
            yaxisMarginLeft;

        if (deviceType === 'Mobile') {
            barHeight = 50;
            xaxisFontSize = '0.7rem';
            xaxisMarginTop = 20;
            yaxisFontSize = '0.7rem';
            yaxisMarginLeft = 10;            
        } else if (data.length > 10) {
            barHeight = 50;
            xaxisFontSize = '0.8rem';
            xaxisMarginTop = 25;
            yaxisFontSize = '0.8rem';
            yaxisMarginLeft = 10;
        } else {
            barHeight = 60;
            xaxisFontSize = '0.8rem';
            xaxisMarginTop = 25;
            yaxisFontSize = '0.8rem';
            yaxisMarginLeft = 10;
        }
        
        chartHeight = (barHeight * data.length) + (gapBetween * data.length);

        const margin = {left: deviceType !== 'Mobile' ? 120 : 80, right: deviceType !== 'Mobile' ? 30 : 10, top: 40, bottom: 40},
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
        console.log(keys)
        
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
            .attr('class', 'xaxis-tick xaxis-tick-25')
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(25))
            .attr("y1", 0)
            .attr("x2", xAxis(25))
            .attr("y2", height);             

        svg.append('line') 
            .attr('class', 'xaxis-tick xaxis-tick-50') 
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(50))
            .attr("y1", 0)
            .attr("x2", xAxis(50))
            .attr("y2", height); 
                        
        svg.append('line')  
            .attr('class', 'xaxis-tick xaxis-tick-75')
            .attr('stroke', '#444')
            .attr('stroke-width', 2)
            .attr("x1", xAxis(75))
            .attr("y1", 0)
            .attr("x2", xAxis(75))
            .attr("y2", height);         

        svg.append('text')
            .attr('class', 'xaxis-label-25')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(25))
            .attr('y', height + xaxisMarginTop) 
            .attr('text-anchor', 'middle')     
            .style('font-size', xaxisFontSize)
            .text('25%')
        
        svg.append('text')
            .attr('class', 'xaxis-label-50')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(50))
            .attr('y', height + xaxisMarginTop) 
            .attr('text-anchor', 'middle')     
            .style('font-size', xaxisFontSize)
            .text('50%')
            
        svg.append('text')
            .attr('class', 'xaxis-label-75')
            .attr('fill', '#d4d4d4')  
            .attr('x', xAxis(75))
            .attr('y', height + xaxisMarginTop) 
            .attr('text-anchor', 'middle')     
            .style('font-size', xaxisFontSize)
            .text('75%')

        svg.append('text')
            .attr('class', 'xaxis-label-100')
            .attr('fill', '#d4d4d4')  
            .attr('x', () => {
                return deviceType === 'Mobile' ? xAxis(98) : xAxis(100)
            })
            .attr('y', height + xaxisMarginTop) 
            .attr('text-anchor', 'middle')     
            .style('font-size', xaxisFontSize)
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
                        .attr('class', 'bar-rect')
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
            .attr("y", -13)
            .style('font-size', yaxisFontSize)
            .style("text-anchor", "end")
            .call(textWrap, margin.left - yaxisMarginLeft); 
            
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
                    if (d.group === targetData.group) {
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
        let newBarHeight,
            newChartHeight,
            newGapBetween = 10;

        if (deviceType === 'Mobile') {
            newBarHeight = 30;
        } else if (data.length > 10) {
            newBarHeight = 40;
        } else {
            newBarHeight = 60;
        }
        
        newChartHeight = (newBarHeight * data.length) + (newGapBetween * data.length);

        const newD3Ref = d3.select(refEl.current),
            newSvg = newD3Ref.select('.svg'),
            newBars = newD3Ref.selectAll('.bar-rect');

        const newMargin = {left: deviceType !== 'Mobile' ? 120 : 80, right: deviceType !== 'Mobile' ? 30 : 10, top: 40, bottom: 40},
              newWidth = refEl.current.clientWidth - newMargin.left - newMargin.right,              
              newHeight = newChartHeight - newMargin.top - newMargin.bottom;                    
            
        newSvg.attr('width', newWidth + newMargin.left + newMargin.right)
            .attr('height', newHeight + newMargin.top + newMargin.bottom)

        let newXAxis = d3.scaleLinear()
            .domain([0, 100]) 
            .range([ 0, newWidth]);               
                
        let newYAxis = d3.scaleBand()
                    .range([ 0, newHeight ])
                    .domain(data.map(function(d) { return d.group; }))
                    .padding(.1);            

        if (selectedStackedFilter === 'full') {
            newBars.attr('x', d => newXAxis(d[0]) )
                .attr('y', d => newYAxis(d.data.group))                          
                .attr('width', d =>  newXAxis(d[1]) - newXAxis(d[0]) )
                .attr('height', newYAxis.bandwidth() - newGapBetween );                    
        } else {
            newBars.attr('x', newXAxis(0) )
                .attr('y', d => newYAxis(d['group']))                        
                .attr('width', d =>  newXAxis(d[`${selectedStackedFilter}`]))
                .attr('height', newYAxis.bandwidth() - newGapBetween );
        }               

        newD3Ref.select('.xaxis-tick-25')
                .attr("x1", newXAxis(25))
                .attr("y1", 0)
                .attr("x2", newXAxis(25))
                .attr("y2", newHeight); 

        newD3Ref.select('.xaxis-tick-50')
                .attr("x1", newXAxis(50))
                .attr("y1", 0)
                .attr("x2", newXAxis(50))
                .attr("y2", newHeight); 

        newD3Ref.select('.xaxis-tick-75')
                .attr("x1", newXAxis(75))
                .attr("y1", 0)
                .attr("x2", newXAxis(75))
                .attr("y2", newHeight); 

        newD3Ref.select('.xaxis-tick-100')
                .attr("x1", newXAxis(100))
                .attr("y1", 0)
                .attr("x2", newXAxis(100))
                .attr("y2", newHeight);  

        newD3Ref.select('.xaxis-label-25')
                .attr('x', newXAxis(25))
                .attr('y', newHeight + 25) 

        newD3Ref.select('.xaxis-label-50')
                .attr('x', newXAxis(50))
                .attr('y', newHeight + 25) 
        
        newD3Ref.select('.xaxis-label-75')
                .attr('x', newXAxis(75))
                .attr('y', newHeight + 25) 

        newD3Ref.select('.xaxis-label-100')
                .attr('x', newXAxis(100))
                .attr('y', newHeight + 25) 
    }
        
    return { 
                drawBarChart, 
                tooltipDesc,
                handleResize,
            };
}

export default StackedBarChartHorizontalLogic;