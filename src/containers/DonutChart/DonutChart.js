import React, { useRef, useEffect, useContext } from 'react';
import DonutChartLogic from './DonutChartLogic.js';
import DonutFilter from '../DonutFilter/DonutFilter.js';
import DonutFilter2 from '../DonutFilter2/DonutFilter2.js';
// import StackedBarFilter from '../StackedBarFilter/StackedBarFilter.js';
import HandleData from '../../hooks/HandleData.js';
import ToolContext from '../../hooks/ToolContext.js';

const DonutChart = () => {       
    // const { donutChartData } = HandleData();
    const { donutChartData, selectedDonutFilter, selectedDonutFilter2 } = useContext(ToolContext);
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawDonutChart,
        updateDonutChart,
        tooltipDesc,
        handleResize,
      } = DonutChartLogic();   

    useEffect(() => {      
        donutChartData.length > 0 && drawDonutChart(donutChartData, chartRef, tooltipRef, true);
    }, [donutChartData])

    useEffect(() => {        
        donutChartData.length > 0 && updateDonutChart(donutChartData, chartRef);
    }, [selectedDonutFilter2])

    window.addEventListener('resize', () => {handleResize(chartRef, donutChartData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}></div>

            <div style={{marginBottom: '30px', fontWeight: 'bold', color: '#fff', fontSize: '1rem'}}><span style={{color: '#695cff'}}>Methodology:</span> Panel Composition</div>    
                        
            <DonutFilter />

            <div style={{display: 'flex', marginBottom: '25px'}}>
                <DonutFilter2 />
                <div style={{color: '#fff', marginLeft: '12px', fontSize: '0.9rem'}}>{selectedDonutFilter2 === 'senior' ? '(VP / SVP / EVP / CSCO / COO / CXO)' : '(Analyst and above, excluding Entry Level)'} <span style={{color: '#888', marginLeft: '10px'}}>{selectedDonutFilter2 === 'all' ? 'n = 1,029' : 'n = 122'}</span></div>
            </div>

            <div style={{color: '#fff', fontSize: '1rem', fontStyle: 'italic'}}>
                {selectedDonutFilter === 'country' ? 'Q: Where are you based?' : 'Q: What industry best represents where your company competes?'}
            </div>

            <div className="chart__container" ref={chartRef} style={{width: '100%', height: '100%'}}></div>  

            <div className="chart__source">
                <p style={{color: '#888', fontSize: '0.8rem'}}>
                    Source: Q1 2023 Survey of Supply Chain Leaders.
                    <br />
                    © 2022 Zero100. <span style={{ color: '#695cff', fontWeight: '700' }}>zero100.com</span>
                </p>
            </div>   

            <div ref={tooltipRef} className="chart__tooltip" style={{backgroundColor: 'rgba(38,38,38,0.8)', padding: '15px 10px'}}>
                <div className="" style={{color: '#fff'}}><span style={{color: '#35F97E'}}>{tooltipDesc.value}%</span>  {selectedDonutFilter2 === 'all' ? 'All Respondents' : 'Senior Leadership'} <br />in {tooltipDesc.label}</div>
            </div>                            
        </div>
  );
}

export default DonutChart;