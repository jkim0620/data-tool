import React, { useState } from 'react';
import { Step } from 'react-scrollama';
import * as d3 from 'd3';
import Filter from '../Filter/Filter';

const ScrollLogic = () => {    
    const [currentStepIndex, setCurrentStepIndex] = useState(null);  

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };          

    const mapSteps = [1, 2, 3, 4, 5].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div            
            style={{
                // opacity: currentStepIndex === stepIndex  || stepIndex === 4 ? 1 : 0.3,   
                // transition: 'opacity 0.2s',
            }}
            >            
            {stepIndex === 0 && <div className="scroll-el"><p className="scroll-el__text">Our analytical model ingests and quantifies accessible, semantic data comprising web hits (documents, news articles, white papers, case studies, regulatory filings, social media posts, etc.) to generate an empirical view of a given industry’s focus and resulting “credible gap” with respect to building sustainable supply chains through digitalization.</p></div>}
            {stepIndex === 1 && <div className="scroll-el"><p className="scroll-el__text">To begin, we scour the web for qualifying documents and digital artifacts that produce a match against the extensive term tree we have defined for <span className="font-text-bold">seven essential supply chain roles.</span></p></div>}            
            {stepIndex === 2 && <div className="scroll-el"><p className="scroll-el__text">In an ideal world, the distribution of this “<span className="font-text-bold">semantic trail</span>” would be equal across competing functional areas—ensuring supply chain leaders balance competing responsibilities between maintaining total accountability of operations (<span className="yolk font-text-bold">Supply-side</span>) vs. catering to ever-increasing customer demands (<span className="emerald font-text-bold">Demand-side</span>).</p></div>}
            {stepIndex === 3 && <div className="scroll-el"><p className="scroll-el__text">But we do not live in an ideal world. Based on an initial study of 100 leading brands, our term tree reveals nearly 80% more digital artifacts associated with <span className="emerald font-text-bold">Demand-side functions</span> when viewed in aggregate. However, this degree of imbalance varies as we filter the results by discrete industry.</p></div>}
            {stepIndex === 4 && <div className="scroll-el-filter"><Filter /></div>}
            </div>
        </Step>
    ))

    const mapSteps_2 = [1, 2, 3].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div            
            style={{
                // opacity: currentStepIndex === stepIndex  || stepIndex === 4 ? 1 : 0.3,   
                // transition: 'opacity 0.2s',
            }}
            >            
            {stepIndex === 0 && <div className="scroll-el"><p className="scroll-el__text">In an ideal world, the distribution of this “<span className="font-text-bold">semantic trail</span>” would be equal across competing functional areas—ensuring supply chain leaders balance competing responsibilities between maintaining total accountability of operations (<span className="yolk font-text-bold">Supply-side</span>) vs. catering to ever-increasing customer demands (<span className="emerald font-text-bold">Demand-side</span>).</p></div>}
            {stepIndex === 1 && <div className="scroll-el"><p className="scroll-el__text">But we do not live in an ideal world. Based on an initial study of 100 leading brands, our term tree reveals nearly 80% more digital artifacts associated with <span className="emerald font-text-bold">Demand-side functions</span> when viewed in aggregate. However, this degree of imbalance varies as we filter the results by discrete industry.</p></div>}
            {stepIndex === 2 && <div className="scroll-el-filter"><Filter /></div>}
            </div>
        </Step>
    ))
    
    const animateSvg = (ref, ref2, y, data) => {        
        const d3Ref = d3.select(ref.current),
              bgRef = d3.select(ref2.current),  
            //   bgWidth = bgRef.getBoundingClientRect().width,
              screenHeight = window.innerHeight;

        const maxRadius = 200; 

        console.log(data)

        const testRect = d3Ref.select('.rect-1'),
              testImg = d3Ref.select('.oval-1');

        // console.log(screenHeight, (y - screenHeight), y,)    
        
        const testEl = bgRef.select('.scroll-el');

        // console.log(testEl)
        
        testRect.transition()
                .duration(0)
                .attr('width', () => { 
                    return 150 - (y / 20) <= 0 ? '0px' : `${150 - (y / 20)}px`;
                })
                .attr('height', () => {
                    return 150 - (y / 20) <= 0 ? '0px' : `${150 - (y / 20)}px`;
                })
                .attr('x', `${150 + (y / 10)}px`)
                .attr('y', `${100 + (y / 10)}px`);

        testImg.transition()
                .duration(0)
                .attr('width', () => { 
                    return 200 - (y / 20) <= 0 ? '0px' : `${200 - (y / 20)}px`;
                })
                .attr('height', () => {
                    return 200 - (y / 20) <= 0 ? '0px' : `${200 - (y / 20)}px`;
                })
                .attr('x', `${600 - (y / 10)}px`)
                .attr('y', `${100 + (y / 10)}px`);

        // const testRef = ref.current;

        // ref.current.style.top = window.scrollY / 10 + 'px';
        // ref.current.style.width = window.scrollY / 10 + 'px';
        if (y > 2600) {
            d3Ref.selectAll('.scroll-tool-label')
                .transition()
                .duration(100)
                .attr('fill', '#fff');
        } else if (y <= 2600) {
            d3Ref.selectAll('.scroll-tool-label')
                .transition()
                .duration(100)
                .attr('fill', 'transparent');  
        }
        
        if (y > 2800) {            
            d3Ref.selectAll('.scroll-tool-score')
                .transition()
                .duration(100)
                .attr('fill', '#fff');    

            d3Ref.selectAll('.scroll-tool-circle')
                .transition()
                .duration(50)
                .attr('r', `${maxRadius * 0.14}px`);
        } else if (y <= 2800) {
            d3Ref.selectAll('.scroll-tool-circle')
                .transition()
                .duration(50)
                .attr('r', '0');
                
            d3Ref.selectAll('.scroll-tool-score')
                .transition()
                .duration(100)
                .attr('fill', 'transparent');       
        }

        if (y > 4000) {
            d3Ref.selectAll('.scroll-tool-circle') 
                .transition()
                // .ease(d3.easePoly)
                .duration(0)                
                .attr('r', (d, i) => {
                    console.log(data,i)
                    return `${maxRadius * data[i].bubble_size}px`
                })
        } else if (y > 2800 && y <= 4000) {
            d3Ref.selectAll('.scroll-tool-circle') 
                .transition()
                // .ease(d3.easePoly)
                .duration(0)                
                .attr('r', `${maxRadius * 0.14}px`)
        }
    }

    return { onStepEnter, 
             mapSteps,
            //  mapSteps_2, 
             animateSvg,
            };
}

export default ScrollLogic;
