import React, { useRef, useEffect, } from 'react';
import ToolLogic from './ToolLogic.js';

const Tool = () => {    
    const ref = useRef(),
          tooltipRef = useRef();     

    const { drawBubbleChart, 
            drawHeatmap,
            allData, 
            industryData, 
            selectedView,
            selectedIndustry,
            tooltipDesc,
        } = ToolLogic();    

    useEffect(() => {     
        selectedView === 'bubble' ? drawBubbleChart(ref, tooltipRef, allData, industryData) : drawHeatmap(ref, tooltipRef, industryData);
    }, [industryData])

    return (
        <div className="tool-wrapper__tool">
            <div className="tool-wrapper__tool--header">
                {selectedView === 'bubble' ? 
                <p className="white font-text-bold">Relative Density of Semantic Trail for {selectedIndustry} Brands</p>
                : 
                <p className="white font-text-bold">{selectedIndustry} Brands' Strengths & Weaknesses</p>
                }
                {selectedView === 'bubble' ? 
                <div className="legend-box">
                    <div className="flex flex-v-center">
                        <div className="legend-box__circle legend-box__circle--dotted"></div>
                        <div className="legend-box__text">All Industry Avg.</div>
                    </div>

                    <div className="flex flex-v-center" style={{ marginLeft: '30px' }}>
                        <div className="legend-box__circle legend-box__circle--solid"></div>
                        <div className="legend-box__text">Selected Industry</div>
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

            <div ref={ref} className="tool-wrapper__tool--container">
            </div>

            <div ref={tooltipRef} className="tooltip">
                {selectedView === 'bubble' ? <React.Fragment>
                                            <div className={`tac font-text-bold ${tooltipDesc.tipColor}`} style={{marginBottom: '5px'}}>{tooltipDesc.step}</div>
                                            <div className="font-text-reg white"><span className={`font-text-bold ${tooltipDesc.tipColor}`}>{tooltipDesc.score}</span> shares of <span className="font-text-bold">{tooltipDesc.hit}</span> total hits across {tooltipDesc.industry}.</div>
                                        </React.Fragment>
                :
                <div className="font-text-bold white">{tooltipDesc.desc}</div>
                }
            </div>
        </div>
    )
}

export default Tool;