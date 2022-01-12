import React, {useState, useEffect, useRef} from 'react';
import Sticker from 'react-stickyfill';
import { Scrollama } from 'react-scrollama';
import throttle from 'lodash.throttle';
import * as d3 from 'd3';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';
import ScrollLogic from './ScrollLogic.js';
import Tool from '../Tool/Tool';
import Sidebar from '../Sidebar/Sidebar';
// import Rect from '../../assets/img/Rectangle.svg';
import Oval from '../../assets/img/oval.png';

const Scroll = () => {
    const {selectedIndustry, 
           handleIndustrySelect, 
           selectedView, 
           handleViewSelect,
           industryData,
           allData} = HandleData();

    const { onStepEnter, 
            mapSteps,
            // mapSteps_2,
            animateSvg,
          } = ScrollLogic();    

    const toolRef = useRef(),
          scrollRef = useRef(),
        //   testRef = useRef();
          svgRef = useRef();
    
    // scroll smoothly to the Tool view when industry selection has been made
    useEffect(() => {
        toolRef.current.scrollIntoView({behavior:'smooth'})   
    }, [selectedIndustry])
    
    // function throttled_version() {
    //     // item[1].style.width = window.scrollY + 100 + 'px';
    //     // testRef.current.style.top = window.scrollY / 10 + 'px';
    //     // testRef.current.style.width = window.scrollY / 10 + 'px';
    //  }
     
    window.addEventListener('scroll', throttle(() => {animateSvg(svgRef, scrollRef, window.scrollY, allData)}, 16), false);


    return (
        <ToolContext.Provider 
        value={{selectedIndustry, 
                handleIndustrySelect, 
                selectedView, 
                handleViewSelect,
                industryData, 
                allData,
        }}>
            <div ref={scrollRef} style={{height: '580vh'}}>
                <Sticker>
                    <div className={`scroll-board`}>
                        <div style={{fontSize: '75px', color: '#fff', paddingTop: '50px', textAlign: 'center'}}>
                            {/* ANIMATION BOARD 1 */}
                            {/* <div style={{top: '50px', width: '300px'}} className="animation-el"><img style={{width: '100%'}} src={Oval} /></div> */}
                            <div className="animation-el" ref={svgRef}>
                                <svg style={{width: '100%', height: '500px'}}>
                                    <g>
                                        <rect fill="#fff" x="10px" y="10px" width="150px" height="150px" className="rect-1"></rect>
                                        <image className="oval-1" x="600" y="10" width="200px" height="200px" href={Oval}></image>
                                        <svg>
                                            <g>
                                                <text className="scroll-tool-label" x="70px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Plan</text>
                                                <text className="scroll-tool-label" x="200px" fontSize="16px" y="250px" textAnchor="middle" fill="transparent">Source</text>                                                
                                                <text className="scroll-tool-label" x="330px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Make</text>
                                                <text className="scroll-tool-label" x="460px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Move</text>
                                                <text className="scroll-tool-label" x="590px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Sell</text>
                                                <text className="scroll-tool-label" x="720px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Use</text>
                                                <text className="scroll-tool-label" x="850px" y="250px" fontSize="16px" textAnchor="middle" fill="transparent">Regenerate</text>
                                                <text className="scroll-tool-score" x="70px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <text className="scroll-tool-score" x="200px" fontSize="16px" y="385px" textAnchor="middle" fill="transparent">14%</text>                                                
                                                <text className="scroll-tool-score" x="330px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <text className="scroll-tool-score" x="460px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <text className="scroll-tool-score" x="590px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <text className="scroll-tool-score" x="720px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <text className="scroll-tool-score" x="850px" y="385px" fontSize="16px" textAnchor="middle" fill="transparent">14%</text>
                                                <circle className="scroll-tool-circle" cx="70px" cy="380px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="200px" cy="380px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="330px" cy="380px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="460px" cy="380px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="590px" cy="380px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="720px" cy="380px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                                <circle className="scroll-tool-circle" cx="850px" cy="380px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            </g>
                                        </svg>
                                    </g>
                                </svg>
                            </div> 
                        </div>
                    </div>
                </Sticker>

                <Scrollama onStepEnter={onStepEnter}>
                {mapSteps}
                </Scrollama>                
            </div>                   

            <div ref={toolRef} className={`${selectedIndustry !== 'Select an Industry' ? 'block' : 'hide'}`} style={{height: '110vh'}}>
                <Sticker>
                    <div className="scroll-board">
                        <div className="tool-wrapper">
                            <Sidebar />    
                            <Tool />
                        </div>
                    </div>    
                </Sticker>
            </div>
        </ToolContext.Provider>        
    )
}

export default Scroll;
