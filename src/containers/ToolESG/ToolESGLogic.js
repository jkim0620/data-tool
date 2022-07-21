import { useState, } from 'react';
import * as d3 from 'd3';
import { Step } from 'react-scrollama';
import HandleFunction from '../../hooks/HandleFunction';

const ToolESGLogic = () => {          
    const { wrap } = HandleFunction();

    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [currentStepIndex2, setCurrentStepIndex2] = useState(null);    

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepEnter2 = ({ data }) => {
        setCurrentStepIndex2(data);
    };

    const mapSteps = [1, 2, 3, 4,].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{marginBottom: '50vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__label font-text-bold emerald">RISK #2</p><p className="scroll-el__title font-text-bold">Lack of Effective Prioritization</p><p className="scroll-el__text">We asked survey respondents where they were increasing vs. decreasing their focus on nine competing ESG criteria. <span className="font-text-bold">Bold</span> companies are consistently increasing prioritization of environmental criteria (by +30-50% margins).</p></div>}            
            {stepIndex === 3 && <div className="scroll-el empty mb0-mobile"></div>}
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
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">Digging deeper into the data, it’s clear that those falling behind targets don’t demonstrate <span className="italic">less</span> willpower of desire to advance these criteria over their peers.</p></div>}            
            {stepIndex === 3 && <div className="scroll-el empty" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 4 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">They are simply disadvantaged in one important regard. The largest share (44%) report <span className="italic">minimal</span> visibility into their supply chain partners outside the four walls of their organization. Equipped with lesser insight into Tier 1-3 GHG emissions, there is little incentive to increase “E” priorities without a more robust measurement apparatus in place.​</p></div>}
            {stepIndex === 5 && <div className="scroll-el empty mb0-mobile"></div>}
            </div>
        </Step>
    ))       

    let barData = {
        labels: ['Renewable Energy', 'Carbon Reduction', 'Water Conservation', 'Plastic Reduction',],
        series: [
            {
                label: 'bold',
                values: [84, 78, 75, 75]
            },
            {
                label: 'behind',
                values: [41, 31, 44, 44]
            }
        ]
    }

    const drawBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: window.innerWidth > 950 ? 170 : 110, right: 50, top: 50, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,
              barHeight = (height - refPadding.v) / 8 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        const zippedData = [84,41,78,31,75,44,75,44];

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
                            return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
                        });

        bar.append('rect')
            .attr('fill', (d,i) => {
                if ((i + 1) % 2 === 1) {
                    return '#00d885';
                } else {
                    return '#99CEBA';
                }
            })
            .attr('class', 'bar-ESG-1')
            .attr('height', barHeight - 7)


        svg.selectAll('.label-esg-1')
            .data(barData.labels)
            .enter()
            .append('text')
            .attr('class', 'label-esg-1')
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
            .call(wrap, margin.left - 25)

        svg.selectAll('.value-esg-1')
            .data(zippedData)
            .enter()
            .append('text')
            .attr('class', 'value-esg-1')
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
            bars = d3Ref.selectAll('.bar-ESG-1'),
            labels = d3Ref.selectAll('.label-esg-1'),
            values = d3Ref.selectAll('.value-esg-1');
            
            d3.select(refEl.current).selectAll('.label-esg-1').remove();

        const margin = {left: window.innerWidth > 950 ? 170 : 110, right: 50, top: 50, bottom: 50},
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
                return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
            });

        bars.attr('height', barHeight - 7)

        svg.selectAll('.label-esg-1')
            .data(barData.labels)
            .enter()
            .append('text')
            .attr('class', 'label-esg-1')
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
            .call(wrap, margin.left - 25)

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

    let bar2Data = {
        labels: ['Minimal Supplier Visibility', 'Tier 1', 'Tier 2', 'Tier 3',],
        series: [
            {
                label: 'bold',
                values: [28, 41, 22, 9]
            },
            {
                label: 'behind',
                values: [44, 25, 25, 6]
            }
        ]
    }
     
    const drawSecondBarChart = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50, },
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 100, h: 60} : {v: 80, h: 0}, 
              gapBetweenGroups = 15,
              barHeight = (height - refPadding.v) / 8 - (gapBetweenGroups / 2),
              groupHeight = barHeight * 2;

        const zippedData = [28,44,41,25,22,25,9,6];

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
                            return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
                        });

        bar.append('rect')
            .attr('fill', (d,i) => {
                if ((i + 1) % 2 === 1) {
                    return '#00d885';
                } else {
                    return '#99CEBA';
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

        svg.selectAll('.label-esg-2')
            .data(bar2Data.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-esg-2 label_internal'
                } else {
                    return `label-esg-2 label_else-${i} bar-dim`
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
                if (d === 'Minimal Supplier Visibility') {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2);
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 10;
                }
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', 600)
            .text(d => {
                return d;
            })
            .call(wrap, margin.left - 20); 

        svg.selectAll('.value-esg-2')
            .data(zippedData)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i < 2) {
                    return 'value-esg-2 value_internal'
                } else {
                    return `value-esg-2 value_else-${i} bar-dim`
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
                return `${d}% `;
            })
            
    }

    const handleResize2 = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            bars = d3Ref.selectAll('.bar'),
            values = d3Ref.selectAll('.value-esg-2');

        // have to remove labels on window resize because of the wrap function
        d3.select(refEl.current).selectAll('.label-esg-2').remove();

        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50, },
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
                return 'translate(' + margin.left + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar2Data.series.length) )  + 0) + ')';
            });

        bars.attr('height', barHeight - 7)

        svg.selectAll('.label-esg-2')
            .data(bar2Data.labels)
            .enter()
            .append('text')
            .attr('class', (d, i) => {
                if (i === 0) {
                    return 'label-esg-2 label_internal'
                } else {
                    return `label-esg-2 label_else-${i} bar-dim`
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
                if (d === 'Minimal Supplier Visibility') {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2);
                } else {
                    return (groupHeight * i) + (gapBetweenGroups * i) + (groupHeight / 2) + 10;
                }
            })
            .attr('text-anchor', 'end')
            .attr('font-size', '14px')
            .attr('font-weight', 600)
            .text(d => {
                return d;
            })
            .call(wrap, margin.left - 20); 

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

export default ToolESGLogic;