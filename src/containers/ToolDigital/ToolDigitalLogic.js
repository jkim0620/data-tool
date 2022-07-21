import { useState, } from 'react';
import * as d3 from 'd3';
import { Step } from 'react-scrollama';
import HandleFunction from '../../hooks/HandleFunction';

const ToolDigitalLogic = () => {         
    const { wrap } = HandleFunction();

    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [currentStepIndex2, setCurrentStepIndex2] = useState(null);    

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepEnter2 = ({ data }) => {
        setCurrentStepIndex2(data);
    };

    const mapSteps = [1, 2, 3, 4, 5, 6, 7].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el" style={{marginBottom: '30vh'}}><p>Based on the collected data, these <span className="font-text-bold">Bold</span> companies are actively taking steps to overcome 3 critical risks facing supply chain leaders...</p></div>}            
            {stepIndex === 3 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__label font-text-bold yolk">RISK #1</p><p className="scroll-el__title font-text-bold">Reliance on Legacy Systems</p><p className="scroll-el__text">We asked a lot of questions about spending specific to information and operational technology infrastructure—and found that there is broad consensus that the sun is finally setting on legacy ERP systems.</p></div>}            
            {stepIndex === 4 && <div className="scroll-el empty" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 5 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text"><span className="font-text-bold">57%</span> of respondents believe traditional ERP will be phased out within a 5-year window. In many cases, this is not out of choice, but because tech partners (including SAP) have already announced the end of support for legacy solutions by 2027.</p></div>}
            {stepIndex === 6 && <div className="scroll-el empty bottom mb0-mobile"></div>}
            </div>
        </Step>
    ))    

    const mapSteps2 = [1, 2, 3, 4, 5, 6,].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">As we look ahead to the next generation of solutions that can move the needle on growing demand for operational and ESG transparency, we find the first divergence between <span className="font-text-bold">Bold</span> companies, as compared to their peers falling behind 2050 targets.</p></div>}
            {stepIndex === 3 && <div className="scroll-el empty" style={{marginBottom: '30vh'}}><p className="scroll-el__text"></p></div>}
            {stepIndex === 4 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text"><span className="font-text-bold">Bold</span> companies are more likely to report building internal tools that are fully customized to their specific needs and applications vs. rent or borrow a commodity solution that was not designed for their explicit use case.</p></div>}            
            {stepIndex === 5 && <div className="scroll-el empty mb0-mobile"></div>}
            </div>
        </Step>
    ))       
    
    const barData = [
        {highlight: false, label: 'Indefinitely', value: 20.61},
        {highlight: false, label: '5 - 10 years', value: 21.82},
        {highlight: true, label: '3 - 5 years', value: 49.09},
        {highlight: true, label: '< 3 years', value: 8.48},                    
    ];  

    const drawBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();  
        
        const margin = {left: 90, right: 70, top: 50, bottom: 50},
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              width = refEl.current.clientWidth - margin.left - margin.right,              
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              gapBetween = 15; 
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right - refPadding.h)
                        .attr('height', height - refPadding.v)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + 0 + ')');
            
        let xAxis = d3.scaleLinear()
                .domain([0, 100])
                .range([ 0, width]);            
                
        let yAxis = d3.scaleBand()
                        .range([ 0, height - margin.bottom - margin.top ])
                        .domain(barData.map(function(d) { return d.label; }))
                        .padding(.1);
        
        const bars = svg.selectAll('.bar-rect')
                        .data(barData)
                        .enter()
                        .append('rect')
                        .attr('class', (d, i) => {
                            if (d.highlight) {
                                return 'bar-rect';
                            } else{
                                return `bar-rect bar-dim bar-dim-${i}`;
                            }
                             
                        })
                        .attr('x', xAxis(0) )
                        .attr('y', function(d) { return yAxis(d.label); })                        
                        .attr('width', d => { return xAxis(0); })
                        .attr('height', yAxis.bandwidth() - gapBetween )
                        .attr('fill', '#ff9b00')
                        
        svg.selectAll('.label-digital-1')
            .data(barData)
            .enter()
            .append('text')
            .attr('fill', () => {
                if (window.innerWidth > 950) {
                    return '#121212'
                }  else {
                    return '#fff'
                }
            })
            .attr('class', (d, i) => {
                if (d.highlight) {
                    return 'label-digital-1';
                } else{
                    return `label-digital-1 bar-dim label-dim-${i}`;
                }
                 
            })
            .attr('x', (d, i) => {
                return -10;
            })
            .attr('y', (d,i) => {
                return (yAxis.bandwidth() * i) + (gapBetween * i) + (yAxis.bandwidth() / 2)
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .text(d => {
                return d.label
            });
            
            
        svg.selectAll('.value-digital-1')
            .data(barData)
            .enter()
            .append('text')
            .attr('fill', () => {
                if (window.innerWidth > 950) {
                    return '#121212'
                }  else {
                    return '#fff'
                }
            })
            .attr('class', (d, i) => {
                if (d.highlight) {
                    return 'value-digital-1';
                } else{
                    return `value-digital-1 bar-dim value-dim-${i}`;
                }
                 
            })
            .attr('x', d => { 
                return xAxis(d.value) + 15; 
            })
            .attr('y', (d,i) => {
                return (yAxis.bandwidth() * i) + (gapBetween * i) + (yAxis.bandwidth() / 2)
            })
            .attr('text-anchor', 'start')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => {
                return `${Math.round(d.value)}%`
            });


    }

    let bar2Data = {
        labels: ['Build Internal Tools', 'Rent 3rd Party Tools', 'Borrow Consultants',],
        series: [
            {
                label: 'bold',
                values: [72, 9, 19]
            },
            {
                label: 'all',
                values: [47, 35, 16]
            }
        ]
    }

    const handleResize = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar-rect'),
            labels = d3Ref.selectAll('.label-digital-1'),
            values = d3Ref.selectAll('.value-digital-1');

        const margin = {left: 90, right: 70, top: 50, bottom: 50},
            refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
            newWidth = refEl.current.clientWidth - margin.left - margin.right,              
            newHeight = refEl.current.clientHeight - margin.top - margin.bottom,
            gapBetween = 15; 


        svg.attr('width', newWidth + margin.left + margin.right - refPadding.h)
            .attr('height', newHeight - refPadding.v)
            .attr('class', 'svg')                        
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + 0 + ')');
            
        let newXAxis = d3.scaleLinear()
                .domain([0, 100])
                .range([ 0, newWidth]);            
                
        let newYAxis = d3.scaleBand()
                .range([ 0, newHeight - margin.bottom - margin.top ])
                .domain(barData.map(function(d) { return d.label; }))
                .padding(.1);

        bars.attr('x', newXAxis(0) )
            .attr('y', function(d) { return newYAxis(d.label); })                        
            .attr('height', newYAxis.bandwidth() - gapBetween )

        labels.attr('y', (d,i) => {
                    return (newYAxis.bandwidth() * i) + (gapBetween * i) + (newYAxis.bandwidth() / 2)
                })

        values.attr('x', d => { 
                return newXAxis(d.value) + 15; 
            })
            .attr('y', (d,i) => {
                return (newYAxis.bandwidth() * i) + (gapBetween * i) + (newYAxis.bandwidth() / 2)
            })        

    } 
     
    const drawSecondBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 20,
              barHeight = (height - refPadding.v) / 6 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        const zippedData = [72,47,9,35,19,16];

        let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? width - margin.right : width]);

        let y = d3.scaleLinear()
                    .range([height + gapBetweenGroups, 0]);
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right - refPadding.h)
                        .attr('height', height - refPadding.v)
                        .attr('class', 'svg')                                

        let barGroup = svg.selectAll('g')
                        .data(zippedData)
                        .enter().append('g')
                        .attr('transform', function(d, i) {
                            return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
                        });

        barGroup.append('rect')
            .attr('fill', (d,i) => {
                if ((i + 1) % 2 === 1) {
                    return '#ff9b00';
                } else {
                    return '#ffd799';
                }
            })
            .attr('class', (d, i) => {
                if (i < 2) {
                    return 'bar bar_internal'
                } else {
                    return `bar bar_else-${i} bar-dim`
                }
            })
            .attr('height', barHeight - 7)

        svg.selectAll('.label-digital-2')
            .data(bar2Data.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-digital-2 label_internal'
                } else {
                    return `label-digital-2 label_else-${i} bar-dim`
                }
            })
            .attr('fill', () => {
                if (window.innerWidth > 950) {
                    return '#121212'
                }  else {
                    return '#fff'
                }
            })
            .attr('x', (d, i) => {
                return margin.left - 15;
            })
            .attr('y', (d,i) => {
                return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .text(d => {
                return d;
            }) 
            .call(wrap, margin.left - 20)

        svg.selectAll('.value-digital-2')
            .data(zippedData)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i < 2) {
                    return 'value-digital-2 value_internal'
                } else {
                    return `value-digital-2 value_else-${i} bar-dim`
                }
            })
            .attr('fill', () => {
                if (window.innerWidth > 950) {
                    return '#121212'
                }  else {
                    return '#fff'
                }
            })
            .attr('x', (d, i) => {
                return x(d) + margin.left + 15;
            })
            .attr('y', (d,i) => {
                if (i < 2) {
                    return (barHeight * i) + (barHeight / 2) + 10;
                } else if (i >= 2 && i < 4) {
                    return (barHeight * i) + (barHeight / 2) + gapBetweenGroups + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                }
            })
            .attr('text-anchor', 'start')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => {
                return `${d}%`;
            })                     
    }

    const handleResize2 = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar'),
            values = d3Ref.selectAll('.value-digital-2'); 

        d3.select(refEl.current).selectAll('.label-digital-2').remove();
        
        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
            newWidth = refEl.current.clientWidth - margin.left - margin.right,
            newHeight = refEl.current.clientHeight - margin.top - margin.bottom,
            refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
            gapBetweenGroups = 20,
            barHeight = (newHeight - refPadding.v) / 6 - (gapBetweenGroups / 2),
            groupHeight = barHeight * 2;

        let newX = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0,  window.innerWidth > 950 ? newWidth - margin.right : newWidth]);

        svg.attr('width', newWidth + margin.left + margin.right - refPadding.h)
            .attr('height', newHeight - refPadding.v)

        svg.selectAll('g')
            .attr('transform', function(d, i) {
                return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
            });

        bars.attr('height', barHeight - 7) 

        svg.selectAll('.label-digital-2')
            .data(bar2Data.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-digital-2 label_internal'
                } else {
                    return `label-digital-2 label_else-${i} bar-dim`
                }
            })
            .attr('fill', () => {
                if (window.innerWidth > 950) {
                    return '#121212'
                }  else {
                    return '#fff'
                }
            })
            .attr('x', (d, i) => {
                return margin.left - 15;
            })
            .attr('y', (d,i) => {
                return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .text(d => {
                return d;
            }) 
            .call(wrap, margin.left - 20)   

        values.attr('x', (d, i) => {
                return newX(d) + margin.left + 15;
            })
            .attr('y', (d,i) => {
                if (i < 2) {
                    return (barHeight * i) + (barHeight / 2) + 10;
                } else if (i >= 2 && i < 4) {
                    return (barHeight * i) + (barHeight / 2) + gapBetweenGroups + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                }
            })  
    }   
        

    return { 
                drawBarChart, 
                onStepEnter, 
                mapSteps,
                currentStepIndex,
                handleResize,
                drawSecondBarChart,
                onStepEnter2, 
                mapSteps2,
                currentStepIndex2,
                handleResize2,
            };
}

export default ToolDigitalLogic;