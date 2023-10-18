import { useState, useContext, useEffect } from 'react';
import * as d3 from 'd3';
// import { nest } from 'd3-collection';
import HandleData from '../../hooks/HandleData';
import ToolContext from '../../hooks/ToolContext';

const ScatterPlotChartLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});
    const { selectedLabel, handleLabelSelect, } = useContext(ToolContext);    

    const { deviceType, } = HandleData();
    
    const updateScatterChart = (data) => {
        if (data.length === 1) {
            d3.selectAll('.dot')
                .attr('opacity', 0.1);
        }

        d3.select(`.dot_${data[data.length - 1]}`)
            .transition()
            .duration(200)
            .attr("r", 8)
            .attr('opacity', 1)
            // .attr('opacity', d => {
            //     // if (d.Label === data[data.length - 1]) {
            //     //     return 1; 
            //     // } else {
            //     //     return 0.1;
            //     // }
            // });

    }

    const drawScatterChart = (data, refEl, tooltipRefEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();  
        
        let barHeight,
            chartHeight,
            gapBetween = 10;

        // if (deviceType === 'Mobile') {
        //     barHeight = 30;
        // } else if (data.length > 10) {
        //     barHeight = 40;
        // } else {
        //     barHeight = 60;
        // }
        
        // chartHeight = (barHeight * data.length) + (gapBetween * data.length);

        const margin = {top: 30, right: 30, bottom: 50, left: 50},
              width = 720 - margin.left - margin.right,              
              height = 720 - margin.top - margin.bottom;
            //   highestValue = parseInt(data[0].value) + 5; 

        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);


        const xAvg = data.reduce(function(a, b) {
            return a + parseInt(b.X_Length)}, 0 ) / data.length;

        const yAvg = data.reduce(function(a, b) {
            return a + parseInt(b.Y_Length)}, 0 ) / data.length;

        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

        let xAxis = d3.scaleLinear()
                        .domain([4*0.95, 8*1.001])
                        .range([ 0, width ])        
                
        let yAxis = d3.scaleLinear()
                        .domain([-0.001, 9*1.01])
                        .range([ height, 0])
                        .nice()  

        svg.append("g")
            .attr('class', 'x-axis-line')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis).ticks(10).tickSize(0))
            .selectAll("text")
            .attr('fill', '#eee')
            .attr('font-size', '12px')
            .attr('font-weight', '400')
            .attr("transform", "translate(-5,5)")
            .select(".domain").remove();
        
        svg.append("g")
            .attr('class', 'y-axis-line')
            .call(d3.axisLeft(yAxis).ticks(7).tickSize(0))
            .selectAll("text")
            .attr('fill', '#eee')
            .attr('font-size', '12px')
            .attr('font-weight', '400')
            .attr("transform", "translate(-5,5)")
            .select(".domain").remove();

        svg.select('.x-axis-line path')
            .attr('stroke', '#fff')
            .attr('stroke-width', '1px'); 

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + margin.left)
            .attr("y", height + margin.top + 20)
            .attr('fill', '#fff')
            .text("X Label");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height/2 + 20)
            .attr('fill', '#fff')
            .text("Y Label")

        let xAvgLine = svg.append('line')
                        .attr('class', 'x-avg-line')
                        .attr('x1', xAxis(xAvg))
                        .attr('x2', xAxis(xAvg))
                        .attr('y1', 0)
                        .attr('y2', height)
                        .style("fill", "none")
                        .style("stroke", "#d4d4d4")
                        .style("stroke-dasharray", ("5, 7")) 
                        .style("stroke-width", "2");
                        
        let yAvgLine = svg.append('line')
                        .attr('class', 'y-avg-line')
                        .attr('x1', 0)
                        .attr('x2', width)
                        .attr('y1', yAxis(yAvg))
                        .attr('y2', yAxis(yAvg))
                        .style("fill", "none")
                        .style("stroke", "#d4d4d4")
                        .style("stroke-dasharray", ("5, 7")) 
                        .style("stroke-width", "2");

        // Add dots
        let dots =  svg.append('g')
                        .selectAll(".dot")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr('class', d =>  {
                            return `dot dot_${d.Label}`;
                        })
                        .attr("cx", function (d) {
                            // return xAxis(d.X_Length); 
                            return 0;
                        })
                        .attr("cy", function (d) { return yAxis(d.Y_Length) - 200; } )
                        .attr("r", 6.5)
                        .style("fill", function (d) { 
                            // return color(d.Species) 
                           return 'transparent';
                        })

        dots.transition()
            .delay(function(d,i){return(i*3)})
            .duration(1000)
            .attr("cx", function (d) { return xAxis(d.X_Length) } )
            .attr("cy", function (d) { return yAxis(d.Y_Length) } )  
            .style("fill", function(d) {
                if (d.X_Length >= xAvg && d.Y_Length >= yAvg) { // above average for both axis
                    return '#35F97E';
                } else if (d.X_Length >= xAvg && d.Y_Length < yAvg) { // above average for x but below avg for y 
                    return '#ff9b00';
                } else if (d.X_Length < xAvg && d.Y_Length >= yAvg) { // above average for y but below avg for x
                    return '#00aef4';
                } else {
                    return '#e7045e';
                }
            })   
                        
        setTimeout(() => {
            dots.on('mouseover' , e => {                                        
                mouseOverBar(e);                                                    
            })
            .on('mouseout', mouseOutBar); 
        }, 1000)     

        function mouseOverBar(event) {
            const targetData = event.target.__data__;
                            
            dots.transition()
                .duration(200)
                .attr("r", 8)
                .attr('opacity', d => {
                    if (d.Label !== targetData.Label) {
                        return 0.2; 
                    } else {
                        return 1;
                    }
                });
            
            setTooltipDesc({label: targetData.Label});    
            d3Tooltip.style('visibility', 'visible')
                        .style('top', `${event.clientY + 20}px`)
                        .style('left', `${event.clientX - 50}px`);    

            // labels.transition() 
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
            d3Tooltip.style('visibility', 'hidden')
                        .style('top', `0`)
                        .style('left', `0`);

            dots.transition()
                .attr("r", 6.5)
                .attr('opacity', 1);

            // labels.transition()
            //     .attr('opacity', 1);

            // values.transition()
            //     .attr('opacity', 1);
        }

    }  
        
    return { 
                drawScatterChart, 
                updateScatterChart,
                tooltipDesc,
                // handleResize,
            };
}

export default ScatterPlotChartLogic;