import React, { useRef, useEffect, useContext } from 'react';
import StackedBarChartHorizontalLogic from './StackedBarChartHLogic.js';
import StackedBarFilter from '../StackedBarFilter/StackedBarFilter.js';
import HandleData from '../../hooks/HandleData.js';
import ToolContext from '../../hooks/ToolContext';

const StackedBarChartHorizontal = () => {       
    const { stackedBarChartData } = HandleData();
    const { selectedStackedFilter } = useContext(ToolContext);
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawBarChart,
        tooltipDesc,
        handleResize,
      } = StackedBarChartHorizontalLogic();   

    useEffect(() => {        
        stackedBarChartData.length > 0 && drawBarChart(stackedBarChartData, chartRef, tooltipRef);
    }, [stackedBarChartData])

    useEffect(() => {        
        stackedBarChartData.length > 0 && drawBarChart(stackedBarChartData, chartRef, tooltipRef);
    }, [selectedStackedFilter])

    window.addEventListener('resize', () => {handleResize(chartRef, stackedBarChartData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}></div>

            <StackedBarFilter />

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
                <div style={{marginBottom: '7px'}}>{tooltipDesc.label}</div>
                <div className="">{tooltipDesc.value}%</div>
            </div>                            
        </div>
  );
}

export default StackedBarChartHorizontal;