import { useState } from 'react';
import * as d3 from 'd3';
import { Step } from 'react-scrollama';

const ToolSolutionLogic = () => {          
    const [currentStepIndex, setCurrentStepIndex] = useState(null);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };  

    const mapSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
            <div
            style={{
                margin: '0vh 0 0vh 0',
            }}
            className="scroll-box"
            >            
            {stepIndex === 0 && <div className="scroll-el empty mb0-mobile"></div>}
            {stepIndex === 1 && <div className="scroll-el empty mb0-mobile" style={{marginBottom: '30vh'}}></div>}
            {stepIndex === 2 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><p className="scroll-el__text">Borrowing from the best <span className="font-text-bold yolk">Digital</span> practices of <span className="font-text-bold">Bold</span> companies setting aggressive net zero carbon goals—we find three solutions to overcome these critical risks.</p></div>}            
            {stepIndex === 3 && <div className="scroll-el empty" style={{marginBottom: '30vh'}} id="solution-digital"></div>}
            {stepIndex === 4 && <div className="scroll-el mb"style={{marginBottom: '50vh'}}><div className="scroll-el__col"><div className="scroll-el__colLeft"><p className="scroll-el__label yolk font-text-bold">Risk</p></div><div className="scroll-el__colRight" style={{width: '70%'}}><p className="scroll-el__title font-text-bold" style={{marginBottom: 0}}>Reliance on Legacy Systems</p></div></div><div className="scroll-el__col" style={{alignItems: 'start'}}><div className="scroll-el__colLeft"><p className="scroll-el__label font-text-bold yolk" style={{marginRight: '25px'}}>Solution</p></div><div className="scroll-el__colRight"><p className="scroll-el__title font-text-bold">Prioritize Customization vs. Configuration</p></div></div><p className="scroll-el__text"><span className="font-text-bold" style={{marginBottom: 0}}>Bold</span> companies are better at determining the ROI from competing solutions models—and placing their bets accordingly. This is a critical learning as the wider community converges on a singular changeover to new, in-house solutions.</p></div>}
            {stepIndex === 5 && <div className="scroll-el empty" style={{marginBottom: '30vh'}} id="solution-esg"></div>}
            {stepIndex === 6 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><div className="scroll-el__col"><div className="scroll-el__colLeft"><p className="scroll-el__label emerald font-text-bold">Risk</p></div><div className="scroll-el__colRight" style={{width: '70%'}}><p className="scroll-el__title font-text-bold" style={{marginBottom: 0}}>Lack of Effective Prioritization</p></div></div><div className="scroll-el__col" style={{alignItems: 'start'}}><div className="scroll-el__colLeft"><p className="scroll-el__label font-text-bold emerald" style={{marginRight: '25px'}}>Solution</p></div><div className="scroll-el__colRight"><p className="scroll-el__title font-text-bold">Invest in N-Tier Visibility</p></div></div><p className="scroll-el__text">Priority setting isn’t sufficient — <span className="font-text-bold">Bold</span> companies are attacking the prerequisite conditions to follow-through on those priorities. In this case, investing in N-Tier visibility.</p></div>}
            {stepIndex === 7 && <div className="scroll-el empty" style={{marginBottom: '30vh'}} id="solution-people"></div>}
            {stepIndex === 8 && <div className="scroll-el mb" style={{marginBottom: '50vh'}}><div className="scroll-el__col"><div className="scroll-el__colLeft"><p className="scroll-el__label ultraLight font-text-bold">Risk</p></div><div className="scroll-el__colRight" style={{width: '70%'}}><p className="scroll-el__title font-text-bold" style={{marginBottom: 0}}>Ignoring Impact of Purpose-Led Organization</p></div></div><div className="scroll-el__col" style={{alignItems: 'start'}}><div className="scroll-el__colLeft"><p className="scroll-el__label font-text-bold ultraLight" style={{marginRight: '25px'}}>Solution</p></div><div className="scroll-el__colRight"><p className="scroll-el__title font-text-bold">Demonstrate How New Recruits Will Achieve Targets</p></div></div><p className="scroll-el__text">If <span className="font-text-bold">Bold</span> companies are encountering fewer hiring headwinds AND prove successful at retaining strong talent, there’s the argument to be made that the best and brightest are gravitating to the places that don’t need them as urgently to pull the community to the left of that 2050 timeline.</p></div>}
            {stepIndex === 9 && <div className="scroll-el empty mb0-mobile"></div>}
            
            </div>
        </Step>
    )) 

    const drawTheLens = (refEl) => {
        d3.select(refEl.current).selectAll('.svg').remove();
        const margin = {left: 50, right: 50, top: 50, bottom: 50},
              width = refEl.current.clientWidth - margin.left - margin.right,
              height = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 60, h: 60} : {v: 0, h: 0}, 
              radius = (width - margin.right - margin.left) / 3;
        
        const svg = d3.select(refEl.current)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right - refPadding.h)
                        .attr('height', height + margin.left + margin.right - refPadding.v)
                        .attr('class', 'svg')                        
                        .append('g')
                        .attr('transform','translate(' + margin.left + ',' + 0 + ')');                                                

        svg.append('circle')
            .attr('fill', 'transparent')
            .attr('stroke', '#FF9B00')
            .attr('stroke-width', '3px')
            .attr('class', 'circle circle-digital')
            .attr('opacity', 0)
            .attr('r', 50)
            .attr('cx', () => {
                if (window.innerWidth > 950) {
                    return  (width / 2) - (margin.right / 2) - (radius / 2)
                } else {
                    return  (width / 2) - (radius / 2)
                }

            }) 
            .attr('cy', height / 3 + margin.top) 

        svg.append('circle')
            .attr('fill', 'transparent')
            .attr('stroke', '#00D885')
            .attr('stroke-width', '3px')
            .attr('class', 'circle circle-esg')
            .attr('opacity', 0)
            .attr('r', 50)
            .attr('cx', () => {
                if (window.innerWidth > 950) {
                    return  (width / 2) - (margin.right / 2) + (radius / 2)
                } else {
                    return  (width / 2) + (radius / 2)
                }
            }) 
            .attr('cy', height / 3 + margin.top) 

        svg.append('circle')
            .attr('fill', 'transparent')
            .attr('stroke', '#695CFF')
            .attr('stroke-width', '3px')
            .attr('class', 'circle circle-ppl')
            .attr('opacity', 0)
            .attr('r', 50)
            .attr('cx', () => {
                if (window.innerWidth > 950) {
                    return  (width / 2) - (margin.right / 2)
                } else {
                    return  (width / 2)
                }
            }) 
            .attr('cy', height / 3 + margin.top + radius) 
 
        svg.append('text')
            .attr('fill', '#FF9B00')
            .attr('class', 'lens-label lens-label_digital')
            .attr('x', () => {
                if (window.innerWidth > 950) {
                    return (width / 2) - margin.right - margin.left - (radius / 2)
                } else {
                    return (width / 2) - margin.right - (radius / 2) - 40;
                }
            }) 
            .attr('y', height / 3 + margin.top) 
            .attr('opacity', 0)
            .attr('text-anchor', 'middle')
            .attr('font-size', () => {
                if (window.innerWidth > 950) {
                    return  '24px';
                } else {
                    return '16px';
                }  
            })
            .attr('font-weight', '600')
            .text('Digital')

        svg.append('text')
            .attr('fill', '#00D885')
            .attr('class', 'lens-label lens-label_esg')
            .attr('x', () => {
                if (window.innerWidth > 950) {
                    return (width / 2) + (margin.right) + (radius / 2)
                } else {
                    return (width / 2) + margin.right + (radius / 2) + 40
                }
            }) 
            .attr('y', height / 3 + margin.top) 
            .attr('opacity', 0)
            .attr('text-anchor', 'middle')
            .attr('font-size', () => {
                if (window.innerWidth > 950) {
                    return  '24px';
                } else {
                    return '16px';
                }
            })
            .attr('font-weight', '600')
            .text('ESG')

        svg.append('text')
            .attr('fill', '#695CFF')
            .attr('class', 'lens-label lens-label_ppl')
            .attr('opacity', 0)
            .attr('x', () => {
                if (window.innerWidth > 950) {
                    return  (width / 2) - (margin.right / 2);
                } else {
                    return width / 2;
                }
            })
            .attr('y', () => {
                if (window.innerWidth > 950) {
                    return height / 3 + margin.top + radius + margin.top;
                } else {
                    return height / 2 + radius + 30;
                }
            }) 
            .attr('text-anchor', 'middle')
            .attr('font-size', () => {
                if (window.innerWidth > 950) {
                    return  '24px';
                } else {
                    return '16px';
                }
            })
            .attr('font-weight', '600')
            .text('People')
    }

    const handleResize = (refEl) => {
        const d3Ref = d3.select(refEl.current),
            svg = d3Ref.select('.svg'),
            circleDigtial = d3Ref.selectAll('.circle-digital'),
            circleEsg = d3Ref.selectAll('.circle-esg'),
            circlePpl = d3Ref.selectAll('.circle-ppl'),            
            labelDigital = d3Ref.selectAll('.lens-label_digital'),
            labelEsg = d3Ref.selectAll('.lens-label_esg'),
            labelPpl = d3Ref.selectAll('.lens-label_ppl');

        const margin = {left: 50, right: 50, top: 50, bottom: 50},
              newWidth = refEl.current.clientWidth - margin.left - margin.right,
              newHeight = refEl.current.clientHeight - margin.top - margin.bottom,
              refPadding = window.innerWidth > 950 ? {v: 60, h: 60} : {v: 0, h: 0}, 
              newRadius = (newWidth - margin.right - margin.left) / 3;

        svg.attr('width', newWidth + margin.left + margin.right - refPadding.h)
              .attr('height', newHeight + margin.left + margin.right - refPadding.v);

        circleDigtial.attr('cx', () => {
                        if (window.innerWidth > 950) {
                            return (newWidth / 2) - (margin.right / 2) - (newRadius / 2);
                        } else {
                            return (newWidth / 2) - (newRadius / 2);
                        }
                    }) 
                    .attr('cy', newHeight / 3 + margin.top) 
                    .attr('r', newRadius)

        circleEsg.attr('cx', () => {
                    if (window.innerWidth > 950) {
                        return (newWidth / 2) - (margin.right / 2) + (newRadius / 2);
                    } else {
                        return (newWidth / 2) + (newRadius / 2);
                    }
                }) 
                .attr('cy', newHeight / 3 + margin.top)   
                .attr('r', newRadius)
                
        circlePpl.attr('cx', () => {
                    if ( window.innerWidth > 950) {
                        return (newWidth / 2) - (margin.right / 2);
                    } else {
                        return newWidth / 2;
                    }
                }) 
                .attr('cy', newHeight / 3 + margin.top + newRadius) 
                .attr('r', newRadius)

        labelDigital.attr('x', () => {
                        if (window.innerWidth > 950) {
                            return (newWidth / 2) - margin.right - margin.left - (newRadius / 2);
                        } else {
                            return (newWidth / 2) - margin.right - (newRadius / 2) - 40;
                        }
                    }) 
                    .attr('y', newHeight / 3 + margin.top)  
                    
        labelEsg.attr('x', () => {
                    if (window.innerWidth > 950) {
                        return (newWidth / 2) + (margin.right) + (newRadius / 2);
                    } else {
                        return (newWidth / 2) + margin.right + (newRadius / 2) + 40;
                    }
                }) 
                .attr('y', newHeight / 3 + margin.top)

        labelPpl.attr('x', () => {
                    if (window.innerWidth > 950) {
                        return (newWidth / 2) - (margin.right / 2);
                    } else {
                        return newWidth / 2;
                    }
                })
                .attr('y', () => {
                    if (window.innerWidth > 950) {
                        return newHeight / 3 + margin.top + newRadius + margin.top;
                    } else {
                        return newHeight / 2 + newRadius + 30;
                    }
                })       

    }

    return { 
        drawTheLens, 
        onStepEnter, 
        mapSteps,
        currentStepIndex,
        handleResize,
    };

}

export default ToolSolutionLogic;