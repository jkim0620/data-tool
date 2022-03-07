import React, { useState, useRef } from 'react';
import { Step } from 'react-scrollama';
import * as d3 from 'd3';
import Filter from '../Filter/Filter';
import HandleData from '../../hooks/HandleData';

const ScrollLogic = () => {    
    const [currentStepIndex, setCurrentStepIndex] = useState(null);  
    
    const { deviceType, selectedIndustry, } = HandleData();

    const filterRef = useRef();

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };          

    const mapSteps = [1, 2, 3, 4, 5,].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div>            
            {stepIndex === 0 && <div className="scroll-el"><p className="scroll-el__text">Our analytical model ingests and quantifies accessible, semantic data comprising web hits (documents, news articles, white papers, case studies, regulatory filings, social media posts, etc.) to generate an empirical view of a given industry’s focus and resulting <span className="ultraLight font-text-bold">“credibility gap”</span> with respect to building sustainable supply chains through digitalization.</p></div>}
            {stepIndex === 1 && <div className="scroll-el"><p className="scroll-el__text">To begin, we scour the web for qualifying documents and digital artifacts that produce a match against the extensive term tree we have defined for each of the <span className="font-text-bold ultraLight">seven essential supply chain functions.</span></p></div>}            
            {stepIndex === 2 && <div className="scroll-el"><p className="scroll-el__text">In an ideal world, the distribution of this “semantic trail” would be <span className="ultraLight font-text-bold">equal across all seven functional areas</span>.<br /><br />This would ensure balance among supply chain leaders competing responsibilities on both sides:</p> <ul style={{paddingLeft: '20px'}}><li className="white scroll-el__text--list" style={{marginBottom: '5px'}}><span className="yolk font-text-bold">Supply</span> – maintaining total accountability of their operations</li><li className="white scroll-el__text--list"><span className="emerald font-text-bold">Demand</span> – catering to the ever-increasing customer expectations</li></ul></div>}
            {stepIndex === 3 && <div className="scroll-el scroll-el__last"><p className="scroll-el__text"><span className="font-text-bold ultraLight">But we do not live in an ideal world.</span><br/><br />Based on an initial study of 100 leading brands, our term tree reveals nearly 80% more digital artifacts associated with <span className="emerald font-text-bold">Demand-side</span> functions when viewed in aggregate{deviceType === 'Mobile' ? ' by industry using the filter below.' : '.'}</p></div>}
            {stepIndex === 4 && <div ref={filterRef} className={`scroll-el-filter white`}><div className=""><p className="white font-text-bold tac scroll-el-filter__cta">Explore how this imbalance shifts by industry:</p></div><Filter /></div>}
            </div>
        </Step>
    ))
    
    const animateSvg = (ref, y, data) => {        
        const d3Ref = d3.select(ref.current),
              bgWidth = ref.current.clientWidth,
              screenWidth = window.innerWidth,
              screenHeight = window.innerHeight,
              scrollY = y / screenHeight;

        const maxRadius = 200;                   

        d3Ref.select('.animation-el-doc1') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 230 ? 230 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', () => {
                return `${-(bgWidth / 20) + (y / 5)}px`;
            }) 
            .attr('y', () => {
                return `${-(bgWidth / 20) + (y / 8)}px`;
            }); 

        d3Ref.select('.animation-el-doc2') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 230 ? 230 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', () => {
                return  `${(bgWidth / 1.6) - (y / 50)}px`
            })
            .attr('y', `${(screenHeight / 2) - (y / 20)}px`); 
            
        d3Ref.select('.animation-el-doc3') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 230 ? 230 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${(bgWidth / 1.5) - (y / 20)}px`)
            .attr('y', `${(screenHeight / 20) + (y / 15)}px`); 
            
        d3Ref.select('.animation-el-graph1') // 왼쪽 하단
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 220 ? 220 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${-(bgWidth / 98) + (y / 5)}px`)
            .attr('y', `${(screenHeight / 1.8) - (y / 10)}px`);

        d3Ref.select('.animation-el-graph2')
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 250 ? 250 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }
            })
            .attr('x', `${(bgWidth / 3.5) + (y / 10)}px`)
            .attr('y', `${(screenHeight / 2.3) - (y / 20)}px`);  
            
        d3Ref.select('.animation-el-social1') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 200 ? 200 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${-(bgWidth / 6.5) + (y / 4)}px`)
            .attr('y', `${(screenHeight / 2.2) - (y / 20)}px`);
            
        d3Ref.select('.animation-el-social2') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 200 ? 200 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 8) <= 0 ? '0px' : `${(getWidth) - (y / 8)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }
            })
            .attr('x', `${(bgWidth / 1.1) - (y / 10)}px`) 
            .attr('y', `${(screenHeight / 2.3) - (y / 20)}px`); 

        d3Ref.select('.animation-el-headline1') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 270 ? 270 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 15) <= 0 ? '0px' : `${(getWidth) - (y / 15)}px`;
                } else {
                    return (getWidth) - (y / 8) <= 0 ? '0px' : `${(getWidth) - (y / 8)}px`;
                }
            })
            .attr('x', `${-(bgWidth / 7) + (y / 4)}px`);

        d3Ref.select('.animation-el-headline2') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 270 ? 270 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }

            })
            .attr('x', `${(bgWidth / 5.5) + (y / 10)}px`)
            .attr('y', `${(screenHeight / 2.5) - (y / 25)}px`); 
            
        d3Ref.select('.animation-el-headline3')
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 300 ? 300 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }
            })
            .attr('x', `${(bgWidth / 3) + (y / 15)}px`)
            .attr('y', `${(screenHeight / 1.25) - (y / 6)}px`);  
            
        d3Ref.select('.animation-el-headline4')
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 250 ? 250 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 15) <= 0 ? '0px' : `${(getWidth) - (y / 15)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('y', `${(screenHeight / 1.65) - (y / 10)}px`);   
            
        d3Ref.select('.animation-el-headline5') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 220 ? 220 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', () => {
                return `${(bgWidth / 1.3) - (y / 20)}px`;
            }) 
            .attr('y', `${(screenHeight / 1.6) - (y / 10)}px`);

        d3Ref.select('.animation-el-headline6') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 4 < 270 ? 270 : bgWidth / 4;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${(bgWidth / 1.3) - (y / 13)}px`); 
        
        d3Ref.select('.animation-el-headline7')
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 4 < 300 ? 300 : bgWidth / 4;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }
            })
            .attr('x', `${(bgWidth / 1.15) - (y / 7)}px`)
            .attr('y', `${(screenHeight / 12) + (y / 15)}px`); 

        d3Ref.select('.animation-el-headline8') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 6 < 200 ? 200 : bgWidth / 6;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 15) <= 0 ? '0px' : `${(getWidth) - (y / 15)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${(bgWidth / 1.3) - (y / 10)}px`)
            .attr('y', `${-(screenHeight / 10) + (y / 7)}px`); 

        d3Ref.select('.animation-el-headline9') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 350 ? 350 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 7) <= 0 ? '0px' : `${(getWidth) - (y / 7)}px`;
                } else {
                    return (getWidth) - (y / 3) <= 0 ? '0px' : `${(getWidth) - (y / 3)}px`;
                }
            })
            .attr('x', `${(bgWidth / 2.5) + (y / 15)}px`)
            .attr('y', `${(screenHeight / 5) + (y / 20)}px`); 

        d3Ref.select('.animation-el-headline10') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 250 ? 250 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 5) <= 0 ? '0px' : `${(getWidth) - (y / 5)}px`;
                }
            })
            .attr('x', `${(bgWidth / 4.5) + (y / 15)}px`)
            .attr('y', `${(screenHeight / 8) + (y / 15)}px`); 
        
        d3Ref.select('.animation-el-video1') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = bgWidth / 5 < 300 ? 300 : bgWidth / 5;
                if (screenHeight > 450) {
                    return (getWidth) - (y / 10) <= 0 ? '0px' : `${(getWidth) - (y / 10)}px`;
                } else {
                    return (getWidth) - (y / 4) <= 0 ? '0px' : `${(getWidth) - (y / 4)}px`;
                }
            })
            .attr('x', `${(bgWidth / 8) + (y / 10)}px`) 
            .attr('y', `${(screenHeight / 70) + (y / 10)}px`);
            
        d3Ref.select('.animation-el-folder') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 100 : 50;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 2.5) + (y / 20)}px`) 
            .attr('y', `${(screenHeight / 40) + (y / 10)}px`); 
        
        d3Ref.select('.animation-el-play') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 90 : 45;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 1.8)}px`)
            .attr('y', `${-(screenHeight / 20) + (y / 9)}px`);  

        d3Ref.select('.animation-el-like') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 90 : 45;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${-(bgWidth / 40) + (y / 5)}px`)
            .attr('y', `${(screenHeight / 2.5) - (y / 20)}px`); 
            
        d3Ref.select('.animation-el-heart') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 90 : 45;
                return getWidth - (y / 30) <= 0 ? '0px' : `${getWidth - (y / 30)}px`;
            })
            .attr('x', `${(bgWidth / 1.6) - (y / 20)}px`) 
            .attr('y', `${(screenHeight / 1.2) - (y / 6)}px`);

        d3Ref.select('.animation-el-newspaper') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 80 : 30;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 1.1) - (y / 8)}px`);
            
        d3Ref.select('.animation-el-magnify') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 100 : 50;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 3.3) + (y / 20)}px`)
            .attr('y', `${(screenHeight / 1.4) - (y / 7)}px`);

        d3Ref.select('.animation-el-bluedot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 70 : 35;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('y', `${(screenHeight / 1.9) - (y / 15)}px`);

        d3Ref.select('.animation-el-pinkdot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 60 : 30;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${-(bgWidth / 7) + (y / 4)}px`) 
            .attr('y', `${y / 10}px`); 

        d3Ref.select('.animation-el-orangedot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 45 : 30;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${-(bgWidth / 8) + (y / 5)}px`) 
            .attr('y', `${-(screenHeight / 15) + (y / 10)}px`); 

        d3Ref.select('.animation-el-orangedot-2') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 40 : 20;
                return getWidth - (y / 50) <= 0 ? '0px' : `${getWidth - (y / 50)}px`;
            })
            .attr('x', `${(bgWidth) - (y / 10)}px`)
            .attr('y', `${-(screenHeight / 13) + (y / 10)}px`);   

        d3Ref.select('.animation-el-orangedot-3') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 40 : 20;
                return getWidth - (y / 50) <= 0 ? '0px' : `${getWidth - (y / 50)}px`;
            })
            .attr('x', `${(bgWidth / 2.5) + (y / 20)}px`)
            .attr('y', `${(screenHeight) - (y / 5)}px`);

        d3Ref.select('.animation-el-purpledot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 60 : 30;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 4) + (y / 20)}px`)
            .attr('y', `${(screenHeight / 1.1) - (y / 5)}px`);

        d3Ref.select('.animation-el-purpledot-2') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 45 : 25;
                return getWidth - (y / 50) <= 0 ? '0px' : `${getWidth - (y / 50)}px`;
            })
            .attr('x', `${(bgWidth / 50) + (y / 7)}px`)
            .attr('y', `${(screenHeight / 1.1) - (y / 6)}px`);

        d3Ref.select('.animation-el-purpledot-3') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 45 : 25;
                return getWidth - (y / 50) <= 0 ? '0px' : `${getWidth - (y / 50)}px`;
            })
            .attr('x', `${bgWidth - (y / 10)}px`)
            .attr('y', `${(screenHeight / 1.1) - (y / 5)}px`);

        d3Ref.select('.animation-el-purpledot-4') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 45 : 25;
                return getWidth - (y / 50) <= 0 ? '0px' : `${getWidth - (y / 50)}px`;
            })
            .attr('x', `${(bgWidth / 1.1) - (y / 10)}px`)
            .attr('y', `${-(screenHeight / 10) + (y / 10)}px`);    

        d3Ref.select('.animation-el-peachdot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 50 : 25;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 3) + (y / 20)}px`) 
            .attr('y', `${-(screenHeight / 20) + (y / 15)}px`); 

        d3Ref.select('.animation-el-peachdot-2')
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 80 : 40;
                return getWidth - (y / 20) <= 0 ? '0px' : `${getWidth - (y / 20)}px`;
            })
            .attr('x', `${bgWidth - (y / 8)}px`) 
            .attr('y', `${(screenHeight / 4)}px`);      
            
        d3Ref.select('.animation-el-peachdot-3') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 45 : 23;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${(bgWidth / 25) + (y / 5)}px`); 

        d3Ref.select('.animation-el-greendot') 
            .transition()
            .duration(0)
            .attr('width', () => {
                const getWidth = screenHeight > 450 ? 50 : 25;
                return getWidth - (y / 40) <= 0 ? '0px' : `${getWidth - (y / 40)}px`;
            })
            .attr('x', `${-(bgWidth / 5.5) + (y / 4)}px`); 

        
        // show animated svg elements
        if (scrollY <= 2.74) {   
            d3Ref.selectAll('.animation-el')
                .style('visibility', 'visible')    
        } else { // hide animated svg elements
            d3Ref.selectAll('.animation-el')
                .style('visibility', 'hidden')            
        }

        // show animated rain elements
        if (scrollY > 2.85 && scrollY < 3.7) {
            d3Ref.selectAll('.animation-rain')
                .transition()
                .duration(100)
                .style('visibility', 'visible')

            d3Ref.select('.animation-rain-rect')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${(bgWidth / 2.5) + (y / 20)}px`) 
                .attr('y', `${(screenHeight / 50) + (y / 15)}px`); 
                

            d3Ref.select('.animation-rain-rect-2')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${(bgWidth / 2) - (y / 15)}px`) 
                .attr('y', `${(screenHeight / 15) + (y / 20)}px`); 

            d3Ref.select('.animation-rain-rect-3')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${bgWidth / 2}px`)
                .attr('y', `${-(screenHeight / 7.5) + (y / 10)}px`);    
                
            d3Ref.select('.animation-rain-rect-4')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${bgWidth / 2.5}px`)
                .attr('y', `${-(screenHeight / 9) + (y / 10)}px`); 


            d3Ref.select('.animation-rain-rect-5')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${(bgWidth / 2.1) + (y / 20)}px`) 
                .attr('y', `${-(screenHeight / 7.5) + (y / 10)}px`) 

            d3Ref.select('.animation-rain-rect-6')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', bgWidth / 2.3)
                .attr('y', `${-(screenHeight / 7) + (y / 10)}px`) 

            d3Ref.select('.animation-rain-rect-7')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 73 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 28 - (y / 40);                    
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 73 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 28 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', bgWidth / 2.2)
                .attr('y', `${-(screenHeight / 10) + (y / 10)}px`);                              

            d3Ref.select('.animation-rain-rect-8')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 70 - (y / 40) : screenHeight > 450 ? 65 - (y / 40) : 25 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${(bgWidth / 2) + (y / 20)}px`) 
                .attr('y', `${-(screenHeight / 13) + (y / 10)}px`); 


            d3Ref.select('.animation-rain-rect-9')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 70 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 70 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('y', `${-(screenHeight / 12) + (y / 10)}px`) 
                .attr('x', `${(bgWidth / 3.5) + (y / 5)}px`) 

            d3Ref.select('.animation-rain-rect-10')
                .attr('width', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 70 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('height', () => {
                    const rectSize = screenHeight > 750 ? 75 - (y / 40) : screenHeight > 450 ? 70 - (y / 40) : 30 - (y / 40);
                    return rectSize <= 0 ? '0px' : `${rectSize}px`;
                })
                .attr('x', `${bgWidth / 1.9}px`)
                .attr('y', `${-(screenHeight / 6.5) + (y / 10)}px`) 


            d3Ref.select('.animation-rain-circle')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 40) : screenHeight > 450 ? 52 - (y / 40) : 20 - (y / 40);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 1.4) - (y / 7)}px`) 
                .attr('cy', `${(screenHeight / 22) + (y / 15)}px`); 

            d3Ref.select('.animation-rain-circle-2')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 40) : screenHeight > 450 ? 52 - (y / 40) : 20 - (y / 40);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', bgWidth / 2)
                .attr('cy', `${-(screenHeight / 10) + (y / 10)}px`); 

            d3Ref.select('.animation-rain-circle-3')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 45) : screenHeight > 450 ? 52 - (y / 45) : 20 - (y / 40);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 6) + (y / 5)}px`) 
                .attr('cy', `${y / 15}px`); 

            d3Ref.select('.animation-rain-circle-4')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 42) : screenHeight > 450 ? 52 - (y / 42) : 20 - (y / 42);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', bgWidth / 1.8)
                .attr('cy', `${-(screenHeight / 18) + (y / 10)}px`);   
                
            d3Ref.select('.animation-rain-circle-5')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 45) : screenHeight > 450 ? 52 - (y / 45) : 20 - (y / 45);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', bgWidth / 1.8)
                .attr('cy', `${-(screenHeight / 9) + (y / 10)}px`);  
                
            d3Ref.select('.animation-rain-circle-6')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 48) : screenHeight > 450 ? 52 - (y / 48) : 20 - (y / 48);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 4.3) + (y / 5)}px`) 
                .attr('cy', `${-(screenHeight / 10) + (y / 10)}px`);

            d3Ref.select('.animation-rain-circle-7')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 62 - (y / 48) : screenHeight > 450 ? 52 - (y / 48) : 20 - (y / 48);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 1.4) - (y / 5)}px`) 
                .attr('cy', `${-(screenHeight / 13) + (y / 10)}px`)

            d3Ref.select('.animation-rain-circle-8')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 58 - (y / 48) : screenHeight > 450 ? 48 - (y / 48) : 15 - (y / 48);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 1.3) - (y / 5)}px`) 
                .attr('cy', `${-(screenHeight / 9) + (y / 10)}px`);

            d3Ref.select('.animation-rain-circle-9')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 58 - (y / 48) : screenHeight > 450 ? 48 - (y / 48) : 15 - (y / 48);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${bgWidth / 2.1}px`)
                .attr('cy', `${-(screenHeight / 6.5) + (y / 10)}px`) 

            d3Ref.select('.animation-rain-circle-10')
                .attr('r', () => {
                    const radiusSize = screenHeight > 750 ? 65 - (y / 48) : screenHeight > 450 ? 55 - (y / 48) : 10 - (y / 48);
                    return radiusSize <= 0 ? '0px' : `${radiusSize}px`;
                })
                .attr('cx', `${(bgWidth / 2.3)}px`) 
                .attr('cy', `${-(screenHeight / 12) + (y / 10)}px`);   

        } else { // hide animated rain elements
            d3Ref.selectAll('.animation-rain')
                .transition()
                .duration(300)
                .style('visibility', 'hidden')  
        }

        if (scrollY < 2.9) {
            d3Ref.selectAll('.scroll-tool-label')
                .transition()
                .duration(100)
                .attr('fill', 'transparent');        
        }

        if (scrollY >= 2.9 && scrollY < 3.7) {
            d3Ref.selectAll('.scroll-tool-label')
                .attr('y', () => {
                    const getHeight = screenHeight > 450 ? screenHeight / 7 : screenHeight / 15;
                    return `${(getHeight) + ((y / 5) / 5)}px`;
                })  
                
            d3Ref.selectAll('.scroll-tool-label-yolk')    
                .attr('fill', '#FF9B00')

            d3Ref.selectAll('.scroll-tool-label-emerald')
                .attr('fill', '#00D885')    
        }

        // hide/show chart
        if (scrollY <= 3.5) {
            d3Ref.selectAll('.scroll-tool-circle')
                .transition()
                .duration(50)
                .attr('r', '0');
                
            d3Ref.selectAll('.scroll-tool-score')
                .transition()
                .duration(100)
                .attr('fill', 'transparent');  
        } else if (scrollY > 3.5 && scrollY <= 4.2) {
            d3Ref.selectAll('.scroll-tool-score')
                .attr('fill', '#fff')
                .attr('y', `${(screenHeight / 2) - 50 + 5}px`)
                .text('14%');   

            d3Ref.selectAll('.scroll-tool-circle')
                .transition()
                .duration(50)
                .attr('r', `${maxRadius * 0.14}px`);    
        } else if (scrollY > 4.2) {
            d3Ref.selectAll('.scroll-tool-score')
                .attr('y', (d, i) => {
                    const getHeight = screenHeight > 450 ? 30 : -40;
                    const yAxis = data[i].bubble_size * 100 < 10 ? `${(screenHeight / 2) - 50 - (getHeight)}px` : `${(screenHeight / 2) - 50 + 5}px`;
                    return yAxis;
                })
                .text((d, i) => {
                    return `${data[i].bubble_size * 100}%`;
                });  

            d3Ref.selectAll('.scroll-tool-circle') 
                .transition()
                .duration(50)                
                .attr('r', (d, i) => {
                    return data[i] && `${maxRadius * data[i].bubble_size}px`
                })
        }

        

    }

    const positionSvg = (ref, data) => {
        const d3Ref = d3.select(ref.current);

        const bgWidth = ref.current.clientWidth,
                screenHeight = window.innerHeight,
                screenWidth = window.innerWidth,
                chartWidth = screenWidth > 950 ? 800 : screenWidth - 200,
                colWidth = chartWidth / 6,
                getMargin = (bgWidth - chartWidth) / 2;

        d3Ref.selectAll('.scroll-tool-label')
                .attr('x', (d, i) => {
                    return `${getMargin + ((colWidth * i))}px`;
                })  
                .attr('y', `${(screenHeight / 3.5)}px`)

        d3Ref.selectAll('.scroll-tool-circle')
                .attr('cx', (d, i) => {
                    return `${getMargin + ((colWidth * i) )}px`;
                })
                .attr('cy', `${(screenHeight / 2) - 50}px`)
                
        d3Ref.selectAll('.scroll-tool-score')        
                .attr('x', (d, i) => {
                    return `${getMargin + (colWidth * i)}px`;
                })
                .attr('y', `${(screenHeight / 2) - 50 + 5}px`)
                  
    }

    return { onStepEnter, 
             mapSteps,
             animateSvg,
             positionSvg,
             filterRef,
            };
}

export default ScrollLogic;
