import { useState, useContext } from 'react';
import * as d3 from 'd3';
import ToolContext from '../../hooks/ToolContext.js';

const ToolLogic = () => {          
    const {selectedIndustry, selectedView, allData, industryData} = useContext(ToolContext);

    const [tooltipDesc, setTooltipDesc] = useState({});

    const heatmapXAxis = ['Plan', 'Source', 'Make', 'Move', 'Sell', 'Use', 'Regenerate'],
          heatmapYAxis = ['Speed', 'Cost', 'Accountability'];

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

    const drawBubbleChart = (refEl, tooltipRefEl, data1, data2) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        
        const width = refEl.current.clientWidth,
              height = refEl.current.clientHeight - 200,
              colWidth = width / 7,
              margin = {left: 20, right: 20, top: 30},
              baseRadius = 10,
              maxRadius = 200; 
              
        const d3Tooltip = d3.select(tooltipRefEl.current);      
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', '100%')
                        .attr('height', height)
                        .attr('class', 'svg flex')                        
                        .append('g');                                            
        
        // x axis label
        svg.selectAll('.step-label')
            .data(data1)
            .enter()
            .append('text')
            .attr('class', 'step-label font-text-reg')
            .attr('fill', '#fff')
            .attr('x', (d, i) => {
                return (colWidth * i) + (colWidth / 2);
            })
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .text(d => {
                return d.step
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
                                    .attr('cy', height / 2 - margin.top)
                                    .on('mouseover', e => {                                        
                                        mouseOverIndustry(e);                                                    
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
                                            return (colWidth * (i + 1)) - (colWidth / 2);;   
                                        })
                                        .attr('cy', height / 2 - margin.top)
                                        .on('mouseover', e => {
                                            const targetData = e.target.__data__;

                                            setTooltipDesc({
                                                step: targetData.step, 
                                                score: `${Math.floor(targetData.bubble_size * 100)}%`, 
                                                hit: targetData.hits,
                                                industry: 'all industries',
                                                tipColor: targetData.step === 'Sell' || targetData.step === 'Use' || targetData.step === 'Regenerate' ? 'emerald' : 'yolk'
                                            });

                                            d3Tooltip.style('visibility', 'visible')
                                                    .style('top', `${targetData.clientY + 20}`)
                                                    .style('left', `${targetData.clientX - 100}`);

                                            svg.selectAll(`.all-bubble`)
                                                .transition()
                                                .duration(400)
                                                .attr('stroke', d => {
                                                    if (d.step !== targetData.step) {
                                                        return color.gray;
                                                    } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                                        return color.emerald;
                                                    } else {
                                                        return color.yolk;
                                                    }
                                                });

                                            industryBubbles.transition()
                                                            .duration(400)
                                                            .attr('fill', 'none')
                                                            .attr('stroke', 'none');

                                            industryScores.transition()
                                                        .duration(400)
                                                        .attr('fill', 'none');  
                                                        
                                            avgScores.transition()
                                                    .duration(400)
                                                    .attr('fill', d => {
                                                        return d.step === targetData.step ? color.white : color.gray;
                                                    });
                                        })
                                        .on('mouseout', e => {
                                            d3Tooltip.style('visibility', 'hidden');
                                            setTooltipDesc({});

                                            svg.selectAll(`.all-bubble`)
                                                .transition()
                                                .duration(400)
                                                .attr('stroke', color.white);

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
                                                        
                                            avgScores.transition()
                                                        .duration(400)
                                                        .attr('fill', 'none')            
                                        });                                        
                                        
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
                                .attr('fill', d => {
                                    if (d.bubble_size * 100 > 10) {
                                       return color.black;
                                    } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                        return color.emerald;
                                    } else {
                                        return color.yolk;
                                    }
                                })
                                .style('font-size', '15px')
                                .attr('x', (d, i) => {
                                    return (colWidth * (i + 1)) - (colWidth / 2);
                                })
                                .attr('y', d => {      
                                    const bubbleScore = d.bubble_size * 100;                          
                                    return bubbleScore <= 10 ?  height / 2 - (margin.top * 2) : height / 2 + 7 - margin.top;
                                })
                                .attr('text-anchor', 'middle')
                                .attr('pointer-events', 'none')
                                .style('cursor', 'default')
                                .text(d => {
                                    const bubbleSize = maxRadius * d.bubble_size;
                                    return `${Math.floor(d.bubble_size * 100)}%`;
                                })
                                .on('mouseover', e => {
                                    if (e.target.__data__.bubble_size * 100 > 10) {
                                        mouseOverIndustry(e);
                                    }
                                })
                                .on('mouseout', mouseOutIndustry);

        // allow hover event after the animation in done                            
        industryScores.transition()
                        .duration(100)
                        .delay(2500)                        
                        .attr('pointer-events', 'auto');

        const avgScores = svg.selectAll('all-perc')
                                .data(data1)
                                .enter()
                                .append('text')
                                .attr('class', 'all-perc font-text-bold')
                                .attr('fill', 'none')
                                .style('font-size', '15px')
                                .attr('x', (d, i) => {
                                    return (colWidth * (i + 1)) - (colWidth / 2);
                                })
                                .attr('y', d => {      
                                    const bubbleScore = d.bubble_size * 100;                          
                                    return bubbleScore <= 10 ?  height / 2 - (margin.top * 2) : height / 2 + 7 - margin.top;
                                })
                                .attr('text-anchor', 'middle')
                                .style('cursor', 'default')
                                .text(d => {
                                    const bubbleSize = maxRadius * d.bubble_size;
                                    return `${Math.floor(d.bubble_size * 100)}%`;
                                });

        function mouseOverIndustry(event) {            
            const targetData = event.target.__data__;

            setTooltipDesc({
                step: targetData.step, 
                score: `${Math.floor(targetData.bubble_size * 100)}%`, 
                hit: targetData.hits,
                industry: `${targetData.industry} brands`,
                tipColor: targetData.step === 'Sell' || targetData.step === 'Use' || targetData.step === 'Regenerate' ? 'emerald' : 'yolk'
            })

            d3Tooltip.style('visibility', 'visible')
                    .style('top', `${event.clientY + 20}px`)
                    .style('left', `${event.clientX - 100}px`)

            industryBubbles.transition()
                            .duration(400)
                            .attr('fill', d => {
                                if (d.step !== targetData.step) {
                                    return color.gray;
                                } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })                                            
                            .attr('stroke', d => {
                                if (d.step !== targetData.step) {
                                    return color.gray;
                                } else if (d.step === 'Sell' || d.step === 'Use' || d.step === 'Regenerate') {
                                    return color.emerald;
                                } else {
                                    return color.yolk;
                                }
                            })
                            .attr('opacity', d => {
                                if (d.step !== targetData.step) {
                                    return 0.3;
                                } else {
                                    return 1;
                                }
                            });

            allIndustryBubbles.transition()
                                .duration(400)
                                .attr('stroke', color.gray);

            industryScores.transition()
                            .duration(400)
                            .attr('fill', d => {
                                if (d.step !== targetData.step) {
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

        function mouseOutIndustry() {
            d3Tooltip.style('visibility', 'hidden');

            setTooltipDesc({});

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
    const drawHeatmap = (refEl, tooltipRefEl, data) => {
        d3.select(refEl.current).selectAll('.svg').remove();

        const width = refEl.current.clientWidth,
              height = refEl.current.clientHeight,
              margin = {left: 70, top: 70},
              colSpace = 10,
              squareSize = (width - margin.left - (colSpace * 6)) / 7;

        const colorCode = { 
            level_1: '#695cff', 
            level_2: '#824adf', 
            level_3: '#9b39bf', 
            level_4: '#b5279e', 
            level_5: '#ce167e', 
            level_6: '#e7045e'
        };

        const boxDesc = {
            speed_plan: 'Cognitive Planning',
            speed_source: 'Dynamic Materials',
            speed_make: 'Lights-Out, On-Demand',
            speed_move: 'Shorter Supply Chains',
            speed_sell: 'Buy Any Way, Pickup Anywhere',
            speed_use: 'Integrated Devices',
            speed_regenerate: 'Self-Healing Products',
            cost_plan: 'Bolt-In, Bolt-Out Collab Platform',
            cost_source: 'Respect-Based Sourcing',
            cost_make: 'Zero Waste Ecosystems',
            cost_move: 'Autonomous Future',
            cost_sell: 'On-the-Fly Pricing',
            cost_use: 'Design for Repair',
            cost_regenerate: 'ReX Marketplace',
            accountability_plan: 'Network Ecosystem',
            accountability_source: 'Planet-Based Accounting',
            accountability_make: 'Machine Vision Safety ',
            accountability_move: 'Cradle-to-Cradle Visibility',
            accountability_sell: 'Radical Transparency',
            accountability_use: 'Product Passports',
            accountability_regenerate: 'Carbon Negative',
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
                                    .style('font-size', '15px')
                                    .style('cursor', 'default')
                                    .text(d => {
                                        return `${Math.floor(d.score * 100)}%`;
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
                               .attr('class', 'xaxis-label')
                               .attr('x', (d, i) => {
                                   return ((squareSize * i) + (colSpace * i) + margin.left) + (squareSize / 2);
                               })
                               .attr('y', 50)
                               .attr('fill', color.white)
                               .attr('opacity', 1)
                               .attr('text-anchor', 'middle')
                               .style('font-size', '15px')
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
                               .attr('x', margin.left / 2)
                               .attr('y', (d, i) => {
                                    return margin.top + (squareSize * i) + (colSpace * i) + (squareSize / 2);
                               })
                               .style('text-anchor', 'middle')
                               .attr('transform', (d, i) => {
                                    return  `rotate(-90 ${margin.left / 2}, ${(margin.top + (squareSize * i) + (colSpace * i) + (squareSize / 2))})`
                               })
                               .text(d => {
                                   return d;
                               });
        
        function mouseOverSquare(event) {
            const targetData = event.target.__data__;

            setTooltipDesc({desc: `${boxDesc[`${targetData.y_axis}_${(targetData.x_axis).toLowerCase()}`]}`});
            
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
            d3Tooltip.style('visibility', 'hidden');
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

    return { drawBubbleChart, 
             drawHeatmap,
             allData, 
             industryData, 
             selectedIndustry,
             selectedView,
             tooltipDesc,
             };
}

export default ToolLogic;