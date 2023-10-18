import { useState, } from 'react';
import * as d3 from 'd3';
import { group } from 'd3-array';
import HandleData from '../../hooks/HandleData';

const LineChartLogic = () => {  
    const [tooltipDesc, setTooltipDesc] = useState({});

    const { deviceType, } = HandleData();

    const drawLineChart = (data, refEl, tooltipRefEl) => {
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

        const margin = {left: 50, right: 30, top: 30, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,              
              height = 700 - margin.top - margin.bottom;
            //   highestValue = parseInt(data[0].value) + 5; 

        const d3Tooltip = tooltipRefEl && d3.select(tooltipRefEl.current);

        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

         // Add X axis --> it is a date format
        let xAxis = d3.scaleTime()
                .domain(d3.extent(data, function(d) { 
                    // console.log(d3.timeParse("%Y-%m-%d")(d.date))
                    return d3.timeParse("%Y-%m-%d")(d.date); 
                }))
                .range([ 0, width ]);

        // let xAxis = d3.scaleLinear()
        //         .domain([0, 100]) 
        //         .range([ 0, width]);            
                
        let yAxis = d3.scaleLinear()
                        .domain([0, 10]) 
                        .range([ height, 0]);  

        svg.append("g")
            .attr('class', 'x-axis-line')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr('fill', '#eee')
            .attr('font-size', '12px')
            .attr('font-weight', '400')
            .style("text-anchor", "end");
        
        svg.append("g")
            .attr('class', 'y-axis-line')
            .call(d3.axisLeft(yAxis))
            //.call(d3.axisLeft(yAxis).tickSize(0).tickFormat(''))
            .selectAll("text")
            .attr('fill', '#eee')
            .attr('font-size', '12px')
            .attr('font-weight', '400')
            .style("text-anchor", "end");

        svg.select('.x-axis-line path')
            .attr('stroke', '#fff')
            .attr('stroke-width', '1px'); 

        //use .nest()function to group data so the line can be computed for each group
        // var sumstat = d3.group() 
        //                 .key(d => d.label)
        //                 .entries(data);

        // helper function to convert nested Map to {key: x, values: []} format
        const mapToObject = (map = new Map) => Array.from(
            map.entries(), 
            ([k, v]) => ({
            "key": k,
            "values": v
            })
        );

        // call the helper function with output of d3.group
        const nestedData = data
        .reduce((arr, item) => {
            const keyObj = arr.find(({key}) => key === item.label);
            if (!keyObj) {
                arr.push({key: item.label, values: [item]});
                return arr;
            }
            keyObj.values.push(item);
        //   const typeObj = cityObj.values.find(({key}) => key === item.type);
        //   if (!typeObj) {
        //     cityObj.values.push({key: item.type, values: [item]});
        //     return arr;
        //   }
          //typeObj.values.push(item);
            return arr;
        }, []);

        // console.log(nestedData);

        // //set color pallete for different vairables
        var mediaName =  nestedData.map(d => d.key) 
        var color = d3.scaleOrdinal().domain(mediaName).range(['#FA00FF', '#35F97E'])    

        // var line = d3.line()
        //             .x(function(d, i) {
        //                 //console.log('x value', xAxis(d3.timeParse("%Y-%m-%d")(d.date)))
        //                  return xAxis(d3.timeParse("%Y-%m-%d")(d.date)); 
        //             }) 
        //             .y(function(d) { 
        //                 //console.log('y value', yAxis(d.value))
        //                 return yAxis(d.value); 
        //             }) 

        // svg.selectAll(".line")
        //             .append("g")
        //             .attr("class", "line")
        //             .data(nestedData)
        //             .enter()
        //             .append("path")
        //             .attr("d", function (d) {
        //                 console.log(d)
        //                 return d3.line()
        //                     .x(j => {
        //                         console.log(j)
        //                         return xAxis(d3.timeParse("%Y-%m-%d")(j['date']))
        //                     })
        //                     .y(j => yAxis(parseInt(j['value'])))
        //                     (d.values)
        //             })
        //             .attr("fill", "none")
        //             .attr("stroke", d => color(d.key))
        //             // .attr("stroke", "#FA00FF")
        //             .attr("stroke-width", 3)            

        // Add empty path
        const path =svg.append("path")
                        .attr("transform", `translate(${margin.left},0)`)
                        .attr("fill", "none")
                        .attr("stroke", "steelblue")
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("stroke-width", 1.5);

        const updatedPath = svg.selectAll(".line")
                    .append("g")
                    .attr("class", "line")
                    .data(nestedData)
                    .enter()
                    .append("path")
                    .attr("d", function (d) {
                        // console.log(d)
                        return d3.line()
                            .x(j => {
                                // console.log(j)
                                return xAxis(d3.timeParse("%Y-%m-%d")(j['date']))
                            })
                            .y(j => yAxis(parseInt(j['value'])))
                            (d.values)
                    })
                    .attr("fill", "none")
                    .attr("stroke", d => color(d.key))
                    // .attr("stroke", "#FA00FF")
                    .attr("stroke-width", 3) 

        const pathLength = updatedPath.node().getTotalLength();

        const transitionPath = d3.transition()
                                // .ease(d3.easeSin)
                                .duration(2000);
                                updatedPath
                                .attr("stroke-dashoffset", pathLength)
                                .attr("stroke-dasharray", pathLength)
                                .transition(transitionPath)
                                .attr("stroke-dashoffset", 0);

        setTimeout(() => {
            updatedPath.on('mouseover' , e => {                                        
                mouseOverBar(e);                                                    
            })
            .on('mouseout', mouseOutBar); 
        }, 1000)                  

        // bars.transition()
        //     .duration(500)                        
        //     .attr('width', d => { 
        //         return xAxis(d.value); 
        //     })
        //     .delay( (d, i) => {
        //         return i * 100
        //     })  

        // setTimeout(() => {
        //     bars.on('mouseover' , e => {                                        
        //         mouseOverBar(e);                                                    
        //     })
        //     .on('mouseout', mouseOutBar); 
        // }, data.length * 100 + 500)    
                        
        // const labels = svg.selectAll('.bar-label')
        //                 .data(data)
        //                 .enter()
        //                 .append('text')
        //                 .attr('fill', () => {
        //                     return '#fff';
        //                 })
        //                 .attr('class', (d, i) => {
        //                     return 'bar-label';
        //                 })
        //                 .attr('x', (d, i) => {
        //                     return -10;
        //                 })
        //                 .attr('y', (d,i) => {
        //                     return yAxis(d.label) + (yAxis.bandwidth() / 2);
        //                 })
        //                 .attr('text-anchor', 'end')
        //                 .attr('font-size', '14px')
        //                 .attr('font-weight', '600')
        //                 .text(d => {
        //                     if (deviceType === 'Mobile' && d.label.length > 9) {
        //                         return `${d.label.substr(0, 9)}..`;
        //                     } else {
        //                         return d.label;
        //                     }
        //                 });
        
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
            
       

        function mouseOverBar(event) {
            const targetData = event.target.__data__;

            // if (deviceType === 'Mobile') {
            //     
            // }
            setTooltipDesc({ label: targetData['key'] });

            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);

            console.log(targetData)
            
            updatedPath.transition()
                .duration(200)
                .attr('opacity', d => {
                    console.log('hover',d)
                    if (d['key'] !== targetData['key']) {
                        return 0.2; 
                    } else {
                        return 1;
                    }
                });

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
            d3Tooltip.style('visibility', 'hidden')
                    .style('top', `0`)
                    .style('left', `0`);
           
            setTooltipDesc({});  

            updatedPath.transition()
                        .attr('opacity', 1);

            // labels.transition()
            //     .attr('opacity', 1);

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

    // }
        
    return { 
                drawLineChart, 
                tooltipDesc,
                // handleResize,
            };
}

export default LineChartLogic;