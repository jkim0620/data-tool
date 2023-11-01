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
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '18px'}}><span style={{color: '#00aef4'}}>Reponsible:</span> Measurement & Planning Tools Lag</div>
            <p style={{color: '#fff', fontSize: '1rem', fontStyle: 'italic', marginBottom: '30px'}}>Q: How are you prioritizing the below decarbonization investments?</p>

            <StackedBarFilter />

            <div className="chart__container" ref={chartRef}>
            </div>  

            <div className="chart__source">
                <p style={{color: '#888', fontSize: '0.8rem'}}>
                    <br />
                    Source: Q1 2023 Survey of Supply Chain Leaders.
                    <br />
                    n = 807
                    <br />
                    © 2022 Zero100. <span style={{ color: '#695cff', fontWeight: '700' }}>zero100.com</span>
                </p>
            </div>   

            <div ref={tooltipRef} className="chart__tooltip" style={{backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff'}}>
                <div style={{marginBottom: '7px'}}>{tooltipDesc.label}</div>
                <div className="">{tooltipDesc.value}%</div>
            </div>                            
        </div>
  );
}

export default StackedBarChartHorizontal;