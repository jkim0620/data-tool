import React, { useRef, useEffect, } from 'react';
import BarChartVLogic from './BarChartVLogic.js';
import HandleData from '../../hooks/HandleData.js';

const BarChartVertical = () => {       
    const { chartData } = HandleData();
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawBarChart,
        tooltipDesc,
        handleResize,
      } = BarChartVLogic();   

    useEffect(() => {     
        chartData.length > 0 && drawBarChart(chartData, chartRef, tooltipRef);
    }, [chartData])

    window.addEventListener('resize', () => {handleResize(chartRef, chartData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}>Vertical Bar Chart</div>

            <div className="chart__container" ref={chartRef}>
            </div>  

            <div className="chart__source">
            </div>   

            {/* <div ref={tooltipRef} className="chart__tooltip">
                <div className="">{tooltipDesc.label}</div>
            </div>                             */}
        </div>
  );
}

export default BarChartVertical;