import { useState, } from 'react';
import * as d3 from 'd3';
import { Step } from 'react-scrollama';
import HandleFunction from '../../hooks/HandleFunction';

const ToolPeopleLogic = () => {          
    const { wrap } = HandleFunction();

    const [currentStepIndex, setCurrentStepIndex] = useState(null),
          [currentStepIndex2, setCurrentStepIndex2] = useState(null);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };  

    const mapSteps = [1, 2, 3, 4, 5, 6,].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{height: '30vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__label font-text-bold ultraLight">RISK #3</p><p className="scroll-el__title font-text-bold">Ignoring Impact of Purpose-Led Organizations</p><p className="scroll-el__text">Hiring is tough right now. In fact, <span className="font-text-bold">80%</span> of the sample use “Tough” or “Difficult” to describe the current recruiting climate.</p></div>}            
            {stepIndex === 3 && <div className="scroll-el empty" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 4 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">This is not the case with <span className="font-text-bold">Bold</span> target setters—a third of which report they are easily hiring strong talent.</p></div>}
            {stepIndex === 5 && <div className="scroll-el empty mb0-mobile"></div>}
            </div>
        </Step>
    )) 
    
    const onStepEnter2 = ({ data }) => {
        setCurrentStepIndex2(data);
    };  

    const mapSteps2 = [1, 2, 3, 4, 5, 6,].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{height: '30vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">But the <span className="font-text-bold">Bold</span> target setters are not stopping there. They are combining investments in attracting talent with retaining talent through enhanced investment in development and mentorship programs.</p></div>}            
            {stepIndex === 3 && <div className="scroll-el empty" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 4 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">This is the biggest of the three risks as it suggests talent is gravitating towards organizations that are ahead of their goals and arguably need less help—thereby putting the collective community target in jeopardy.</p></div>}
            {stepIndex === 5 && <div className="scroll-el empty mb0-mobile"></div>}
            </div>
        </Step>
    )) 

    let barData = {
        labels: ['Easily hiring strong talent', 'Tough, but manageable recruiting process', 'Becoming more diffibult to source talent', 'Very difficult to fill any position(s)'],
        series: [
            {
                label: 'bold',
                values: [34,38,22,6]
            },
            {
                label: 'all',
                values: [21,37,28,13]
            }
        ]
    }

    const drawBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: window.innerWidth > 950 ? 200 : 100, right: 50, top: 50, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,
              barHeight = (height - refPadding.v) / 8 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        const zippedData = [34,21,38,37,22,28,6,13,];

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
                    

        let bar = svg.selectAll('g')
                        .data(zippedData)
                        .enter().append('g')
                        .attr('transform', function(d, i) {
                            return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/barData.series.length) )  + 0 ) + ')';
                        });

        bar.append('rect')
            .attr('fill', (d,i) => {
                if ((i + 1) % 2 === 1) {
                    return '#321aad';
                } else {
                    return '#695cff';
                }
            })
            .attr('class', (d, i) => {
                if (i < 2) {
                    return 'bar-ppl-1'
                } else {
                    return `bar-ppl-1 bar_else-${i} bar-dim`
                }
            })
            .attr('height', barHeight - 7)


        svg.selectAll('.label-ppl-1')
            .data(barData.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-ppl-1'
                } else {
                    return `label-ppl-1 label_else-${i} bar-dim`
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
                if (window.innerWidth > 950) {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) - 20;
                }
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .text(d => {
                return d;
            })
            .call(wrap, margin.left - 20)
        

        svg.selectAll('.value-ppl-1')
            .data(zippedData)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i < 2) {
                    return 'value-ppl-1'
                } else {
                    return `value-ppl-1 value_else-${i} bar-dim`
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
                } else if (i >= 4 && i < 6) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                }
            })
            .attr('text-anchor', 'start')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => {
                return `${d}%`;
            })

    }

    const handleResize = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar-ppl-1'),
            values = d3Ref.selectAll('.value-ppl-1'); 

        d3.select(refEl.current).selectAll('.label-ppl-1').remove();

        const margin = {left: window.innerWidth > 950 ? 200 : 100, right: 50, top: 50, bottom: 50},
              newWidth = refEl.current.clientWidth - margin.left - margin.right,
              newHeight = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,
              barHeight = (newHeight - refPadding.v) / 8 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        let newX = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? newWidth - margin.right : newWidth]);

        svg.attr('width', newWidth + margin.left + margin.right - refPadding.h)
            .attr('height', newHeight - refPadding.v)                       
                    

        svg.selectAll('g')
            .attr('transform', function(d, i) {
                return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/barData.series.length) )  + 0 ) + ')';
            });
            
        bars.attr('height', barHeight - 7)

        svg.selectAll('.label-ppl-1')
            .data(barData.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-ppl-1'
                } else {
                    return `label-ppl-1 label_else-${i} bar-dim`
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
                if (window.innerWidth > 950) {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) - 20;
                }
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
                } else if (i >= 4 && i < 6) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                }
            })    
    }

    

    let barData2 = {
        labels: ['Internal technical training programs', 'Internal leadership training', 'Rotational program for grads', 'Rotational program for mid-career', 'External leardership training'],
        series: [
            {
                label: 'bold',
                values: [63, 59, 56, 50, 44]
            },
            {
                label: 'all',
                values: [49, 47, 36, 32, 32]
            }
        ]
    }

    const drawSecondBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,         
              barHeight = (height - refPadding.v) / 10 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;
        
        const zippedData = [63, 49, 59, 47, 56, 36, 50, 32, 44, 32];

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

        let bar = svg.selectAll('g')
                        .data(zippedData)
                        .enter().append('g')
                        .attr('transform', function(d, i) {
                            return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/barData.series.length) ) + 0 ) + ')';
                        });

        bar.append('rect')
            .attr('fill', (d,i) => {
                if ((i + 1) % 2 === 1) {
                    return '#321aad';
                } else {
                    return '#695cff';
                }
            })
            .attr('class', (d, i) => {
                if ((i + 1) % 2 !== 1) {
                    return `bar-ppl-2 bar_else-${i} bar-dim`
                } else {
                    return 'bar-ppl-2'
                }
            })
            .attr('height', barHeight - 5)


        svg.selectAll('.label-ppl-2')
            .data(barData2.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-ppl-2'
                } else {
                    return `label-ppl-2 label_else-${i} bar-dim`
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
                if (window.innerWidth > 950) {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) - 15;
                }
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', '600')
            .text(d => {
                return d;
            })
            .call(wrap, margin.left - 20)
        

        svg.selectAll('.value-ppl-2')
            .data(zippedData)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                return `value-ppl-2 value_dim-${i} bar-dim`
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
                } else if (i >= 4 && i < 6) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                } else if (i >= 6 && i < 8) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 4) + 10;
                }
            })
            .attr('text-anchor', 'start')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => {
                return `${d}%`;
            })

        const diffData = [14, null, 12, null, 20, null, 18, null, 12];

        svg.selectAll('.value-diff')
            .data(diffData)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if ((i + 1) % 2 !== 1) {
                    return `value-diff`
                } else {
                    return `value-diff value-diff_${i} bar-dim`
                }
            })
            .attr('fill', 'transparent')
            .attr('x', (d, i) => {
                return x(zippedData[i]) + margin.left + 15;
            })
            .attr('y', (d,i) => {
                if (d && i < 2) {
                    return (barHeight * i) + (barHeight / 2) + 10;
                } else if (d && i >= 2 && i < 4) {
                    return (barHeight * i) + (barHeight / 2) + gapBetweenGroups + 10;
                } else if (d && i >= 4 && i < 6) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                } else if (d && i >= 6 && i < 8) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 4) + 10;
                }
            })
            .attr('text-anchor', 'start')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .text(d => {
                if (d) {
                    return `+${d}%`;
                }
            })    

    }

    const handleResize2 = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar-ppl-2'),
            values = d3Ref.selectAll('.value-ppl-2'),
            valueDiffs = d3Ref.selectAll('.value-diff'); 

        d3.select(refEl.current).selectAll('.label-ppl-2').remove();

        const zippedData = [63, 49,59, 46, 56, 36, 50, 32, 44, 32];
        
        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
              newWidth = refEl.current.clientWidth - margin.left - margin.right,
              newHeight = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,         
              barHeight = (newHeight - refPadding.v) / 10 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        let newX = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? newWidth - margin.right : newWidth]);
        
        svg.attr('width', newWidth + margin.left + margin.right - refPadding.h)
            .attr('height', newHeight - refPadding.v)                      
                    
        svg.selectAll('g')
            .attr('transform', function(d, i) {
                return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/barData.series.length) ) + 0 ) + ')';
            });

        bars.attr('height', barHeight - 5)   

        svg.selectAll('.label-ppl-2')
            .data(barData2.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-ppl-2'
                } else {
                    return `label-ppl-2 label_else-${i} bar-dim`
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
                if (window.innerWidth > 950) {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 5;
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) - 15;
                }
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
                } else if (i >= 4 && i < 6) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                } else if (i >= 6 && i < 8) {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                } else {
                    return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 4) + 10;
                }
            })   
            
        valueDiffs.attr('x', (d, i) => {
                    return newX(zippedData[i]) + margin.left + 15;
                })
                .attr('y', (d,i) => {
                    if (d && i < 2) {
                        return (barHeight * i) + (barHeight / 2) + 10;
                    } else if (d && i >= 2 && i < 4) {
                        return (barHeight * i) + (barHeight / 2) + gapBetweenGroups + 10;
                    } else if (d && i >= 4 && i < 6) {
                        return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 2) + 10;
                    } else if (d && i >= 6 && i < 8) {
                        return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 3) + 10;
                    } else {
                        return (barHeight * i) + (barHeight / 2) + (gapBetweenGroups * 4) + 10;
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

export default ToolPeopleLogic;