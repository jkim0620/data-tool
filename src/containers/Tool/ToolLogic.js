import { useState, useContext } from 'react';
import * as d3 from 'd3';
import ToolContext from '../../hooks/ToolContext.js';
import HandleData from '../../hooks/HandleData';
import InfoIcon from '../../assets/img/info-marker.svg';

const ToolLogic = () => {          
    const {selectedIndustry, selectedView, allData, industryData} = useContext(ToolContext);
    const { deviceType } = HandleData();

    const [tooltipDesc, setTooltipDesc] = useState({}),
            [labelTooltip, setLabelTooltip] = useState({});

    const heatmapXAxis = ['Plan', 'Source', 'Make', 'Move', 'Sell', 'Use', 'Regenerate'],
          heatmapYAxis = ['Speed', 'Cost', 'Accountability'];

    const tapOrClick = deviceType === 'Mobile' ? 'touchstart' : 'mouseover';      

    const color = { black: '#000',
                    white: '#fff', 
                    lightGray: '#999999', 
                    gray: '#505050', 
                    charcoal: '#121212', 
                    emerald: '#00D885', 
                    yolk: '#FF9B00', 
                    hotpink: '#EA005E',
                    ultraLight: '#695CFF',
                };

    const descByStep = {
        Plan: 'Accurately planning the journey of a good or product from raw material stage to end user delivery.',
        Source: 'Identifying where to extract, buy, or exchange raw materials needed to manufacture finished goods.',
        Make: 'Form by putting parts together or combining substances. Produce something on a large-scale.',
        Move: 'Managing how resources are acquired, stored, and transported to their final destination.',
        Sell: 'The means of distribution through which goods or services pass until they reach the final buyer.',
        Use: 'Customer-centric data profiling their activities while using a product, when and how they used it, and the duration of usage.',
        Regenerate: 'Seeking to restore, replenish, and ultimately “regenerate” more resources than required, resulting in net benefits.'
    }
                
    const getXAxis = (index, param1, param2, squareWidth, margin, columnWidth) => {
        if (param2 === 'speed') {                    
            return (squareWidth * index) + margin + (columnWidth * index);
        } else if (param2 === 'cost' || param2 === 'accountability') {
            switch(param1) {
                case 'Plan':                            
                    return (squareWidth * 0) + margin + (columnWidth * 0);
                    break;
                case 'Source':                            
                    return (squareWidth * 1) + margin + (columnWidth * 1);    
                    break;
                case 'Make':                            
                    return (squareWidth * 2) + margin + (columnWidth * 2);    
                    break;
                case 'Move':                            
                    return (squareWidth * 3) + margin + (columnWidth * 3);    
                    break;
                case 'Sell':                            
                    return (squareWidth * 4) + margin + (columnWidth * 4);    
                    break;
                case 'Use':                            
                    return (squareWidth * 5) + margin + (columnWidth * 5);    
                    break;
                case 'Regenerate':                            
                    return (squareWidth * 6) + margin + (columnWidth * 6);    
                    break;
                default:
                    return 0;
                    break;    
            }
        }
    }

    const drawBubbleChart = (refEl, tooltipRefEl, infoRef, data1, data2) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const screenHeight = window.innerHeight;      
        
        const width = refEl.current.clientWidth,
              height = refEl.current.clientHeight,
              colWidth = width / 7,
              margin = height > 300 ? {left: 20, right: 20, top: 30, scoreTop: 30} : {left: 20, right: 20, top: 0, scoreTop: 15},
              baseRadius = 10,
              maxRadius = 200; 
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', '100%')
                        .attr('height', height)
                        .attr('class', 'svg flex')                        
                        .append('g');                                            
        
        // x axis label
        const bubbleLabel = svg.selectAll('.step-label')
                                .data(data1)
                                .enter()
                                .append('text')
                                .attr('class', d => {
                                    return `step-label ${d.step} font-text-reg`;
                                })
                                .attr('fill', d => {
                                    return d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate' ? color.emerald : color.yolk;
                                })
                                .attr('x', (d, i) => {
                                    return (colWidth * i) + (colWidth / 2) - 5;
                                })
                                .attr('y', () => {
                                    return height <= 400 ? 15 : 50;
                                })
                                .attr('text-anchor', 'middle')
                                .style('font-weight', 700)
                                .text(d => {
                                    return d.step
                                });    
        
        // info icons                                
        svg.selectAll('.info-icon')
            .data(data1)
            .enter()                    
            .append('svg:image')
            .attr('class', d => {
                return `info-icon ${d.step}`
            })
            .attr('x', (d, i) => {
                const getLabelWidth = svg.select(`.step-label.${d.step}`).node().getBoundingClientRect().width;
                return (colWidth * i) + (colWidth / 2) + (getLabelWidth / 2) + 2;
            })
            .attr('y', () => {
                return height <= 400 ? 15 - 10 : 50 - 10;
            })   
            .attr('width', '11px')  
            .style('cursor', 'default')           
            .attr('xlink:href', InfoIcon)
            .on(tapOrClick , e => {                                        
                const infoData = e.target.__data__;   

                if (deviceType === 'Mobile') {
                    d3.select(infoRef.current)
                        .style('visibility', 'visible')
                        .style('top', `${e.touches[0].clientY + 20}px`)
                        .style('left', `${e.touches[0].clientX - 80}px`);
                } else {
                    d3.select(infoRef.current)
                        .style('visibility', 'visible')
                        .style('top', `${e.clientY + 20}px`)
                        .style('left', `${e.clientX - 80}px`);
                }

                setLabelTooltip({infoDesc: descByStep[`${infoData.step}`]});
            })
            .on('mouseout', () => {
                d3.select(infoRef.current)
                    .style('visibility', 'hidden');
            });                                  
        
        // draw selected industry bubbles    
        const industryBubbles = svg.selectAll('.industry-bubble')
                                    .data(data2)
                                    .enter()
                                    .append('circle')
                                    .attr('class', 'industry-bubble')
                                    .attr('fill', d => {
                                        return d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate' ? color.emerald : color.yolk;
                                    })
                                    .attr('stroke', d => {
                                        return d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate' ? color.emerald : color.yolk;
                                    })
                                    .attr('stroke-width', '3px')
                                    .attr('pointer-events', 'none')
                                    .attr('opacity', 1)
                                    .attr('r', 0)
                                    .attr('cx', (d, i) => {
                                        return (colWidth * (i + 1)) - (colWidth / 2);   
                                    })
                                    .attr('cy', () => {
                                        return (height / 2) - margin.top;
                                    })
                                    .on(tapOrClick , e => {                                        
                                        mouseOverIndustry(e.target.__data__);                                                    
                                    })
                                    .on('mouseout', mouseOutIndustry);

        // animate bubbles
        industryBubbles.transition()
                        .duration(1000)
                        .delay( (d, i) => {
                            return i * 200
                        })
                        .ease(d3.easePoly)
                        .attr('r', d => {
                            const ratio = parseInt(d.bubble_size);
                            return maxRadius * d.bubble_size;
                        });
        
        // allow hover event after the animation in done
        industryBubbles.transition()
                        .duration(100)
                        .delay(2500)                        
                        .attr('pointer-events', 'auto');

        // draw all industry avg bubbles                    
        const allIndustryBubbles = svg.selectAll('.all-bubble')
                                        .data(data1)
                                        .enter()
                                        .append('circle')
                                        .attr('class', 'all-bubble')
                                        .attr('fill', 'none')
                                        .attr('pointer-events', 'none')
                                        .attr('stroke', '#fff')
                                        .attr('stroke-width', '3px')
                                        .attr('stroke-dasharray', '5, 4')
                                        .attr('r', 0)
                                        .attr('cx', (d, i) => {
                                            return (colWidth * (i + 1)) - (colWidth / 2); 
                                        })
                                        .attr('cy', () => {
                                            return (height / 2) - margin.top;
                                        })
                                        .on('mouseover', e => {
                                            const targetData = e.target.__data__;

                                            const filterData = industryData.filter(el => {
                                                return el.step === targetData.step;
                                            });

                                            if (filterData[0].bubble_size * 100 > targetData.bubble_size * 100) {
                                                mouseOverIndustry(filterData[0]);
                                            }
                                        })
                                        .on('mouseout', mouseOutIndustry);                                      
                                        
        // animate bubbles
        allIndustryBubbles.transition()
                            .duration(1000)
                            .delay( (d, i) => {
                                return i * 100
                            })
                            .ease(d3.easePoly)
                            .attr('r', d => {
                                return maxRadius * d.bubble_size;
                            });                                 
        
        // allow hover event after the animation in done                            
        allIndustryBubbles.transition()
                        .duration(100)
                        .delay(2500)                        
                        .attr('pointer-events', 'auto');

        // append selected industry percentage text    
        const industryScores = svg.selectAll('.industry-perc')
                                .data(data2)
                                .enter()
                                .append('text')
                                .attr('class', 'industry-perc font-text-bold')
                                .attr('fill', color.black)
                                .style('font-size', '1em')
                                .attr('x', (d, i) => {
                                    return (colWidth * (i + 1)) - (colWidth / 2);
                                })
                                .attr('y', d => {      
                                    const bubbleScore = d.bubble_size * 100;              
                                    return bubbleScore <= 10 ?  (height / 2) - (margin.scoreTop * 2) : (height / 2) - margin.top + 7;
                                })
                                .attr('text-anchor', 'middle')
                                .attr('pointer-events', 'none')
                                .style('cursor', 'default')
                                .text(d => {
                                    const bubbleSize = maxRadius * d.bubble_size;
                                    return `${Math.floor(d.bubble_size * 100)}%`;
                                })
                                .on('mouseover', e => {
                                    const targetData = e.target.__data__;
                                    if (targetData.bubble_size * 100 > 10) {
                                        mouseOverIndustry(targetData);
                                    }
                                })
                                .on('mouseout', mouseOutIndustry);
        
        // animate bubbles
        industryScores.transition()
                        .duration(2000)
                        .ease(d3.easePoly)
                        .attr('fill', d => {
                            if (d.bubble_size * 100 > 10) {
                                return color.black;
                             } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                 return color.emerald;
                             } else {
                                 return color.yolk;
                             }
                        });                          

        // allow hover event after the animation in done                            
        industryScores.transition()
                        .duration(100)
                        .delay(2500)                        
                        .attr('pointer-events', 'auto');

        function mouseOverIndustry(thisData) {         
            let allAvgScore,
                scoreDifference;

            svg.selectAll('.step-label')
                .attr('fill', '#999');    

            svg.select(`.${thisData.step}`)
                .attr('fill', () => {
                    return thisData.step === 'Sell' || thisData.step === 'Use' || thisData.step === 'Regenerate' ? color.emerald : color.yolk;
                });

            tooltipRefEl.current.style.opacity = '1';

            if (screenHeight > 450) {
                tooltipRefEl.current.style.top = 'calc(85% - 50px)';
            } else {
                tooltipRefEl.current.style.top = '40%';
            }

            allData.forEach(el => {
                if (el.step === thisData.step)  allAvgScore = el.bubble_size * 100;                
            });
            scoreDifference = Math.round((thisData.bubble_size * 100) - allAvgScore);

            setTooltipDesc({
                step: thisData.step, 
                difference: scoreDifference === 0 ? 'the same' : scoreDifference > 0 ? `+${scoreDifference}% more` : `${scoreDifference}% less`,
                industry: `${thisData.industry}`,
                desc: descByStep[`${thisData.step}`],
                stepColor: thisData.step === 'Sell' || thisData.step === 'Use' || thisData.step === 'Regenerate' ? 'emerald' : 'yolk',
            })

            industryBubbles.transition()
                            .duration(400)
                            .attr('fill', d => {
                                if (d.step !== thisData.step) {
                                    return color.gray;
                                } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })                                            
                            .attr('stroke', d => {
                                if (d.step !== thisData.step) {
                                    return color.gray;
                                } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })
                            .attr('opacity', d => {
                                if (d.step !== thisData.step) {
                                    return 0.3;
                                } else {
                                    return 1;
                                }
                            });

            allIndustryBubbles.transition()
                                .duration(400)
                                .attr('stroke', d => {
                                    if (d.step !== thisData.step) {
                                        return color.gray;
                                    } else {
                                        return color.white;
                                    }
                                });

            industryScores.transition()
                            .duration(400)
                            .attr('fill', d => {
                                if (d.step !== thisData.step) {
                                    return color.lightGray;
                                } else if (d.bubble_size * 100 > 10) {
                                    return color.black;
                                } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            });       
        }
        
        d3.select(tooltipRefEl.current).select('.closeBtn')
            .on('touchstart', mouseOutIndustry);

        function mouseOutIndustry() {
            tooltipRefEl.current.style.opacity = 0;   
            tooltipRefEl.current.style.top = '-2000px';

            svg.selectAll('.step-label')
                .attr('fill', d => {
                    return d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate' ? color.emerald : color.yolk;
                });

            industryBubbles.transition()
                            .duration(400)
                            .attr('fill', d => {
                                if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })                                            
                            .attr('stroke', d => {
                                if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })
                            .attr('opacity', 1); 

            allIndustryBubbles.transition()
                            .duration(400)
                            .attr('stroke', color.white);
            
            industryScores.transition()
                        .duration(400)
                        .attr('fill', d => {
                            if (d.bubble_size * 100 > 10) {
                                return color.black;
                            } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                return color.emerald;
                            } else {
                                return color.yolk;
                            }
                        });
        }

    }


    // Heatmap View
    const drawHeatmap = (refEl, tooltipRefEl, infoRef, data) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        
        const screenHeight = window.innerHeight,
            screenWidth = window.innerWidth;    

        const width = refEl.current.clientWidth,
              height = refEl.current.clientHeight,
              margin = screenHeight > 450 ? {left: 70, top: 70} : {left: 30, top: 30},
              colSpace = screenHeight > 450 ? 10 : 7,
              squareSize = (width - margin.left - (colSpace * 6)) / 7;

        const colorCode = { 
            level_1: '#695cff', 
            level_2: '#824adf', 
            level_3: '#9b39bf', 
            level_4: '#b5279e', 
            level_5: '#ce167e', 
            level_6: '#e7045e'
        };

        const scoreArr = data.map(el => {
                  return parseInt(el.score * 100);
              });
  
        const greatestNum = Math.max(...scoreArr),
                smallestNum = Math.min(...scoreArr),
                difference = greatestNum - smallestNum,
                range = difference / 6;      

        const d3Tooltip = d3.select(tooltipRefEl.current); 

        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', '100%')
                        .attr('height', height)
                        .attr('class', 'svg flex')                        
                        .append('g');   

        const squares = svg.selectAll('.square')
                            .data(data)
                            .enter()
                            .append('rect')
                            .attr('class', 'square')
                            .attr('width', squareSize)
                            .attr('height', squareSize)
                            .attr('opacity', 1)
                            .attr('x', (d, index) => {
                               return getXAxis(index, d.x_axis, d.y_axis, squareSize, margin.left, colSpace);                              
                            })
                            .attr('y', (d, i) => {
                                if (d.y_axis === 'speed') {
                                    return margin.top;
                                } else if (d.y_axis === 'cost') {
                                    return margin.top + squareSize + colSpace;
                                } else {
                                    return margin.top + (squareSize * 2) + (colSpace * 2)
                                }
                            })
                            .attr('fill', color.black)
                            .attr('pointer-events', 'none')
                            .on('mouseover', e => {
                                mouseOverSquare(e);
                            })
                            .on('mouseout', mouseOutSquare);

            squares.transition()
                    .duration(1000)
                    .delay( (d, i) => {
                        return (Math.random() * 5) * 100;
                    })
                    .attr('fill', d => {
                        return getHeatmapColor(parseInt(d.score * 100))
                    })
                    
            squares.transition()
                    .duration(100)
                    .delay(1500)                        
                    .attr('pointer-events', 'auto');        
            
            const squareScores = svg.selectAll('.score')
                                    .data(data)
                                    .enter()
                                    .append('text')
                                    .attr('class', 'score font-text-bold')
                                    .attr('fill' , color.white)
                                    .attr('opacity', 0)
                                    .attr('x', (d, i) => {
                                        const halfSqaure = squareSize / 2;
                                        return getXAxis(i, d.x_axis, d.y_axis, squareSize, margin.left, colSpace) + halfSqaure;                              
                                    })
                                    .attr('y', (d, i) => {
                                        if (d.y_axis === 'speed') {
                                            return margin.top + (squareSize / 2) + 7;
                                        } else if (d.y_axis === 'cost') {
                                            return margin.top + (squareSize) + colSpace + (squareSize / 2) + 7;
                                        } else {
                                            return margin.top + (squareSize * 2) + (colSpace * 2) + (squareSize / 2) + 7;
                                        }
                                    })
                                    .attr('text-anchor', 'middle')
                                    .attr('pointer-events', 'none')
                                    .style('font-size', '1em')
                                    .style('cursor', 'default')
                                    .text(d => {
                                        return `${Math.round(d.score * 100)}%`;
                                    })
                                    .on('mouseover', e => {                                      
                                        mouseOverSquare(e);
                                    })
                                    .on('mouseout', mouseOutSquare);
        
        squareScores.transition()
                    .duration(1000)
                    .delay( (d, i) => {
                        return (Math.random() * 5) * 100;
                    })
                    .attr('opacity', 1)

        squareScores.transition()
                    .duration(100)
                    .delay(1500)                        
                    .attr('pointer-events', 'auto');                                    
        
        const xAxisLabel = svg.selectAll('.xaxis-label')
                                .data(heatmapXAxis)
                                .enter()
                               .append('text')
                               .attr('class', d => {
                                    return `xaxis-label ${d}`;
                               })
                               .attr('x', (d, i) => {
                                   return ((squareSize * i) + (colSpace * i) + margin.left) + (squareSize / 2) - 8;
                               })
                               .attr('y', () => {
                                   return screenHeight > 450 ? 50 : 15;
                               })
                               .attr('fill', color.white)
                               .attr('opacity', 1)
                               .attr('text-anchor', 'middle')
                               .style('font-weight', 700)
                               .text(d => {
                                   return d;
                               });

        const yAxisLabel = svg.selectAll('.yaxis-label')
                               .data(heatmapYAxis)
                               .enter()
                               .append('text')
                               .attr('class', 'yaxis-label')
                               .attr('fill', color.white)
                               .attr('opacity', 1)
                               .style('font-weight', 700)
                               .attr('x', () => {
                                   return screenHeight > 450 ? margin.left / 2 : margin.left;
                               })
                               .attr('y', (d, i) => {
                                    return margin.top + (squareSize * i) + (colSpace * i) + (squareSize / 2);
                               })
                               .style('text-anchor', 'middle')
                               .attr('transform', (d, i) => { 
                                    return  screenHeight > 450 ? `rotate(-90 ${margin.left / 2}, ${(margin.top + (squareSize * i) + (colSpace * i) + (squareSize / 2))})` : `rotate(-90 ${margin.left / 2 + 7}, ${(margin.top + 7 + (squareSize * i) + (colSpace * i) + (squareSize / 2))})`
                               })
                               .text(d => {
                                   return d;
                               });


        svg.selectAll('.info-icon')
            .data(heatmapXAxis)
            .enter()                    
            .append('svg:image')
            .attr('class', d => {
                return `info-icon ${d}`
            })
            .attr('x', (d, i) => {
                const getLabelWidth = svg.select(`.xaxis-label.${d}`).node().getBoundingClientRect().width;
                return ((squareSize * i) + (colSpace * i) + margin.left) + (squareSize / 2) + (getLabelWidth / 2) - 4;
            })
            .attr('y', () => {
                return height <= 400 ? 15 - 10 : 50 - 10;
            })   
            .attr('width', '11px')  
            .style('cursor', 'default')           
            .attr('xlink:href', InfoIcon)
            .on(tapOrClick , e => {                                        
                const infoData = e.target.__data__;   

                if (deviceType === 'Mobile') {
                    d3.select(infoRef.current)
                        .style('visibility', 'visible')
                        .style('top', `${e.touches[0].clientY + 20}px`)
                        .style('left', `${e.touches[0].clientX - 80}px`);
                } else {
                    d3.select(infoRef.current)
                    .style('visibility', 'visible')
                    .style('top', `${e.clientY + 20}px`)
                    .style('left', `${e.clientX - 80}px`);
                }
                            

                setLabelTooltip({infoDesc: descByStep[`${infoData}`]});
            })
            .on('mouseout', () => {
                d3.select(infoRef.current)
                    .style('visibility', 'hidden');
            });    
        
        function mouseOverSquare(event) {
            const targetData = event.target.__data__;

            setTooltipDesc({desc: targetData.box_hover});
            
            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 50}px`);

            squares.transition()
                    .duration(300)
                    .attr('opacity', d => {
                        if (d.x_axis === targetData.x_axis && d.y_axis === targetData.y_axis) {
                            return 1;
                        } else {
                            return 0.3;
                        }
                    });

            xAxisLabel.transition()
                        .duration(200)
                        .attr('opacity', d => {
                            if (targetData.x_axis === d) {
                                return 1;
                            } else {
                                return 0.3;
                            }
                        })
                        .attr('font-weight', d => {
                            if (targetData.x_axis === d) {
                                return 700;
                            } else {
                                return 500;
                            }
                        });
                                
            yAxisLabel.transition()
                        .duration(200)
                        .attr('opacity', d => {
                            if (targetData.y_axis === d.toLowerCase()) {
                                return 1;
                            } else {
                                return 0.3;
                            }
                        })
                        .attr('font-weight', d => {
                            if (targetData.y_axis === d.toLowerCase()) {
                                return 700;
                            } else {
                                return 500;
                            }
                        });
                                
            squareScores.transition()
                        .duration(300)
                        .attr('opacity', d => {
                            if (d.x_axis === targetData.x_axis && d.y_axis === targetData.y_axis) {
                                return 1;
                            } else {
                                return 0.3;
                            }
                        });
        }

        function mouseOutSquare() {
            d3Tooltip.style('visibility', 'hidden')
                    .style('top', `0`)
                    .style('left', `0`);

            setTooltipDesc({});                    

            squares.transition()
                    .duration(300)
                    .attr('opacity', 1)

            squareScores.transition()
                        .duration(300)
                        .attr('opacity', 1);                                              

            xAxisLabel.transition()
                        .duration(200)
                        .attr('opacity', 1)
                        .attr('font-weight', 500);
            
            yAxisLabel.transition()
                        .duration(200)
                        .attr('opacity', 1)
                        .attr('font-weight', 500); 
        }

        function getHeatmapColor(scoreN) {    
            const level = (scoreN - smallestNum) / range;
            let getColor;
            if (level >= 0 && level <= 1) {
                getColor = colorCode.level_1;
            } else if (level > 1 && level <= 2) {
                getColor = colorCode.level_2;
            } else if (level > 2 && level <= 3) {
                getColor = colorCode.level_3;
            } else if (level > 3 && level <= 4) {
                getColor = colorCode.level_4;
            } else if (level > 4 && level <= 5) {
                getColor = colorCode.level_5;
            } else if (level > 5 && level <= 6) {
                getColor = colorCode.level_6;
            }
             
            return getColor;
        }

    }

    const handleResize = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg');

        const screenHeight = window.innerHeight;
            
        if (selectedView === 'bubble') {
            const newWidth = refEl.current.clientWidth,
                newHeight = refEl.current.clientHeight,
                newColWidth = newWidth / 7,
                margin = newHeight > 300 ? {left: 20, right: 20, top: 30, scoreTop: 30} : {left: 20, right: 20, top: 0, scoreTop: 15};

            svg.selectAll('.industry-bubble')
                .attr('cx', (d, i) => {
                    return (newColWidth * (i + 1)) - (newColWidth / 2);   
                })
                .attr('cy', () => {
                    return (newHeight / 2) - margin.top;
                });

            svg.selectAll('.all-bubble')   
                .attr('cx', (d, i) => {
                    return (newColWidth * (i + 1)) - (newColWidth / 2);   
                })
                .attr('cy', (newHeight / 2) - margin.top); 

            svg.selectAll('.industry-perc')                
                .attr('x', (d, i) => {
                    return (newColWidth * (i + 1)) - (newColWidth / 2);
                })
                .attr('y', d => {      
                    const bubbleScore = d.bubble_size * 100,
                          marginByH = newHeight <= 300 ? margin.top : margin.top;                   
                    return bubbleScore <= 10 ?  (newHeight / 2) - (margin.scoreTop * 2) : (newHeight / 2) - margin.top + 7;
                })

            svg.selectAll('.step-label')
                .attr('x', (d, i) => {
                    return (newColWidth * i) + (newColWidth / 2) - 5;
                }) 

            svg.selectAll('.info-icon')
                .attr('x', (d, i) => {
                    const getLabelWidth = svg.select(`.step-label.${d.step}`).node().getBoundingClientRect().width;
                    return (newColWidth * i) + (newColWidth / 2) + (getLabelWidth / 2) + 2;
                })    

                
        }

        if (selectedView === 'heatmap') {
            const newWidth = refEl.current.clientWidth,
                newHeight = refEl.current.clientHeight,
                margin = screenHeight > 450 ? {left: 70, top: 70} : {left: 30, top: 30},
                newColSpace = screenHeight > 450 ? 10 : 7,
                newSquareSize = (newWidth - margin.left - (newColSpace * 6)) / 7;

            svg.selectAll('.square')
                .attr('width', newSquareSize)
                .attr('height', newSquareSize)
                .attr('x', (d, index) => {
                    return getXAxis(index, d.x_axis, d.y_axis, newSquareSize, margin.left, newColSpace);                              
                })
                .attr('y', (d, i) => {
                    if (d.y_axis === 'speed') {
                        return margin.top;
                    } else if (d.y_axis === 'cost') {
                        return margin.top + newSquareSize + newColSpace;
                    } else {
                        return margin.top + (newSquareSize * 2) + (newColSpace * 2)
                    }
                });

            svg.selectAll('.info-icon')
                .attr('x', (d, i) => {
                    const getLabelWidth = svg.select(`.xaxis-label.${d}`).node().getBoundingClientRect().width;
                    return ((newSquareSize * i) + (newColSpace * i) + margin.left) + (newSquareSize / 2) + (getLabelWidth / 2) - 4;
                })
                .attr('y', () => {
                    return screenHeight <= 450 ? 15 - 10 : 50 - 10;
                })   

            svg.selectAll('.xaxis-label')
               .attr('x', (d, i) => {
                   return ((newSquareSize * i) + (newColSpace * i) + margin.left) + (newSquareSize / 2) - 8;
               })
               .attr('y', () => {
                   return screenHeight > 450 ? 50 : 15;
               })

            svg.selectAll('.yaxis-label')
               .attr('x', () => {
                   return screenHeight > 450 ? margin.left / 2 : margin.left;
               })
               .attr('y', (d, i) => {
                    return margin.top + (newSquareSize * i) + (newColSpace * i) + (newSquareSize / 2);
               })
               .attr('transform', (d, i) => { 
                    return  screenHeight > 450 ? `rotate(-90 ${margin.left / 2}, ${(margin.top + (newSquareSize * i) + (newColSpace * i) + (newSquareSize / 2))})` : `rotate(-90 ${margin.left / 2 + 7}, ${(margin.top + 7 + (newSquareSize * i) + (newColSpace * i) + (newSquareSize / 2))})`
               })
               
            svg.selectAll('.score')
               .attr('x', (d, i) => {
                    const halfSqaure = newSquareSize / 2;
                    return getXAxis(i, d.x_axis, d.y_axis, newSquareSize, margin.left, newColSpace) + halfSqaure;                              
                })
                .attr('y', (d, i) => {
                    if (d.y_axis === 'speed') {
                        return margin.top + (newSquareSize / 2) + 7;
                    } else if (d.y_axis === 'cost') {
                        return margin.top + (newSquareSize) + newColSpace + (newSquareSize / 2) + 7;
                    } else {
                        return margin.top + (newSquareSize * 2) + (newColSpace * 2) + (newSquareSize / 2) + 7;
                    }
                })
        }
    }    

    return { drawBubbleChart, 
             drawHeatmap,
             allData, 
             industryData, 
             selectedIndustry,
             selectedView,
             tooltipDesc,
             labelTooltip,
             handleResize,
             deviceType,
             };
}

export default ToolLogic;