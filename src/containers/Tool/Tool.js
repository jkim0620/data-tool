import React, { useContext, useRef, useEffect, useState } from 'react';
import ToolLogic from './ToolLogic.js';
import ToolContext from '../../hooks/ToolContext';
import RightArrow from '../../assets/img/right-arrow.svg';
import CloseBtn from '../../assets/img/close-btn.png';

const Tool = () => {    
    const ref = useRef(),
          tooltipBubbleRef = useRef(),
          tooltipHeatmapRef = useRef(),
          toolWrapperRef = useRef(),
          ctaMobileRef = useRef(),
          bubbleIntroMobile = useRef(),
          labelInfoRef = useRef();     

    const { handleViewSelect, } = useContext(ToolContext);

    const { drawBubbleChart, 
        drawHeatmap,
        allData, 
        industryData, 
        selectedView,
        selectedIndustry,
        tooltipDesc,
        labelTooltip,
        handleResize,
        deviceType,
    } = ToolLogic();   

    // quick patch for hiding desc but not a good solution
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (selectedView === 'heatmap') tooltipBubbleRef.current.style.top = '-100px';            

        if (window.innerHeight <= 450 || window.innerWidth <= 950) {            
            selectedView === 'heatmap' ? toolWrapperRef.current.style.height = `${((window.innerWidth / 7) * 3 + 50)}px` : toolWrapperRef.current.style.height = '260px';
        }
        if (count < 4) setCount(count + 1);
    }, [selectedView])    

    useEffect(() => {     
        selectedView === 'bubble' ? drawBubbleChart(ref, tooltipBubbleRef, labelInfoRef, allData, industryData) : drawHeatmap(ref, tooltipHeatmapRef, labelInfoRef, industryData);
    }, [industryData])        

    useEffect(() => {
        if (window.innerHeight <= 450) {
            toolWrapperRef.current.style.height = '260px';
        }
    }, [])

    window.addEventListener('resize', () => {handleResize(ref)})

    const handleBtnClick = () => {
        ctaMobileRef.current.className = 'hide';
        bubbleIntroMobile.current.className = 'hide';
    }  

    return (
        <div className="tool-wrapper__tool">
            <div className="tool-wrapper__tool--header">
                {selectedView === 'bubble' ? 
                <p className="white font-text-bold tool-title">Relative Density of Semantic Trail</p>
                : 
                <p className="white font-text-bold tool-title">The Game Board: Heatmap of Industry's Affinity by Topic</p>
                }
                {selectedView === 'bubble' ? 
                <div className="legend-box">
                    <div className="flex flex-v-center">
                        <div className="legend-box__circle legend-box__circle--solid"></div>
                        <div className="legend-box__text">Selected Industry</div>
                    </div>

                    <div className="flex flex-v-center" style={{ marginLeft: '30px' }}>
                        <div className="legend-box__circle legend-box__circle--dotted"></div>
                        <div className="legend-box__text">All Industry Average</div>
                    </div>                    
                </div>
                :
                <div className="legend-box">
                    <div className="flex flex-v-center">
                        <div className="legend-box__square legend-box__square--cold"></div>
                        <div className="legend-box__text">Cold Spot (0%)</div>
                    </div>

                    <div className="flex flex-v-center" style={{ marginLeft: '30px' }}>
                        <div className="legend-box__square legend-box__square--hot"></div>
                        <div className="legend-box__text">Hot Spot (100%)</div>
                    </div>
                </div>
                }
            </div>

            <div ref={toolWrapperRef} className="tool-wrapper__tool--container">
                <div ref={ref} className="data-tool-container"></div>                

                <div ref={tooltipBubbleRef} className="tooltip-bubble">
                    {deviceType === 'Mobile' && <div className="white closeBtn" style={{position: 'absolute', right: '10px', top: '5px' }}><img style={{width: '13px',}} src={CloseBtn} /></div>}
                    {/* <div className={`tac font-text-bold ${tooltipDesc.stepColor}`} style={{marginBottom: '5px'}}>{tooltipDesc.step}</div>
                    <p>{tooltipDesc.desc}</p> */}
                    <p className=""><span className={`font-text-bold ultraLight`}>{tooltipDesc.industry}</span> brands in this function produce <span className={`font-text-bold ultraLight`}>{tooltipDesc.difference}</span> qualifying hits vs. the index average.</p>                                               
                </div>

                <div ref={tooltipHeatmapRef} className="tooltip-heatmap">
                    <div className="font-text-bold white">{tooltipDesc.desc}</div>
                </div>

                <div ref={labelInfoRef} className="tooltip-label">
                    <div className="font-text-reg white">{labelTooltip.infoDesc}</div>
                </div>
            </div>

            <div className="cta-box-mobile">
                {count <= 1 && <React.Fragment>
                    <div ref={bubbleIntroMobile}>
                        <p>We can also parse each functional area into three essential business benefits (Speed, Cost, Accountability) using our Game Board framework. </p>                    
                    </div>
                    <div ref={ctaMobileRef} className="gb-cta-mobile flex-v-center" onClick={() => { handleViewSelect('heatmap'); handleBtnClick(); }}><div className="cta-btn font-text-bold pointer white flex-v-center flex">SEE GAME BOARD <img className="cta-btn__arrow" src={RightArrow} /></div> </div>
                </React.Fragment>}

                {selectedView === 'heatmap' && count < 3 &&
                <React.Fragment>
                    <p className="block">Across the 21 themes depicted on the Z100 Game Board, we can gauge an industry’s relative “affinity” for the capabilities and competencies described within, identifying overall strengths (<span className="font-text-bold pink">Hot Spots</span>) and opportunities (<span className="font-text-bold ultraLight">Cold Spots</span>).</p>
                    <p className="italic">For a view of your brand-specific Heatmap, please reach out to your Engagement Manager.</p>
                </React.Fragment>
                }  
            </div>
        </div>
    )
}

export default Tool;