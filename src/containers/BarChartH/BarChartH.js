import React, { useRef, useEffect, } from 'react';
import BarChartHorizontalLogic from './BarChartHLogic.js';
import HandleData from '../../hooks/HandleData.js';

const BarChartHorizontal = () => {       
    const { chartData } = HandleData();
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawBarChart,
        tooltipDesc,
        handleResize,
      } = BarChartHorizontalLogic();   

    useEffect(() => {        
        chartData.length > 0 && drawBarChart(chartData, chartRef, tooltipRef);
    }, [chartData])

    window.addEventListener('resize', () => {handleResize(chartRef, chartData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}>Horizontal Bar Chart</div>

            <div className="chart__container" ref={chartRef}>
            </div>  

            <div className="chart__source">
                {/* <p>Q: "Looking ahead, what academic disciplines do you consider the best foundation for must-have skills that will dominate supply chain work in 2030? (Select up to 3)"
                    <br />
                    Source: Zero100 Q3 2022 Survey of U.S. Supply Chain Professionals.
                    <br />
                    n = 539 respondents
                    <br />
                    © 2022 Zero100. <span style={{ color: '#695cff', fontWeight: '700' }}>zero100.com</span>
                </p> */}
            </div>   

            <div ref={tooltipRef} className="chart__tooltip">
                <div className="">{tooltipDesc.label}</div>
            </div>                            
        </div>
  );
}

export default BarChartHorizontal;