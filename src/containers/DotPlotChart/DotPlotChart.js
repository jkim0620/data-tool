import React, { useRef, useEffect, useContext } from 'react';
import DotPlotChartLogic from './DotPlotChartLogic.js';
// import HandleData from '../../hooks/HandleData.js';
import ToolContext from '../../hooks/ToolContext.js';

const DotPlotChart = () => {       
    // const { donutChartData } = HandleData();
    const { dotPlotChartData } = useContext(ToolContext);
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawDotPlot,
        // updateDonutChart,
        tooltipDesc,
        // handleResize,
      } = DotPlotChartLogic();   

    useEffect(() => {      
        dotPlotChartData.length > 0 && drawDotPlot(dotPlotChartData, chartRef, tooltipRef, true);
    }, [dotPlotChartData])

    // useEffect(() => {        
    //     dotPlotChartData.length > 0 && updateDonutChart(dotPlotChartData, chartRef);
    // }, [selectedDonutFilter2])

    // window.addEventListener('resize', () => {handleResize(chartRef, dotPlotChartData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}></div>

            <h3 style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1rem', color: '#00d885'}}>Figure 8</h3>
            <div style={{marginBottom: '10px', fontWeight: 'bold', color: '#fff', fontSize: '1rem'}}>More Digital Maturity = More Decarbonization Investment</div>    
                        
            {/* <DonutFilter /> */}

            {/* <div style={{display: 'flex', marginBottom: '25px'}}>
                <DonutFilter2 />
                <div style={{color: '#fff', marginLeft: '12px', fontSize: '0.9rem'}}></div>
            </div> */}

            <p style={{color: '#fff', fontSize: '1rem', fontStyle: 'italic'}}>
                Q: How are you prioritizing these decarbonization initiatives?
            </p>

            <div className="chart__container" ref={chartRef} style={{width: '100%', height: '100%'}}></div>  

            <div className="chart__source">
                <p style={{color: '#888', fontSize: '0.8rem'}}>
                    Source: Zero100 proprietary data and analysis, Rewired 2030 Study, August 2023.
                    <br />
                    ©2023 Zero100. <span style={{ color: '#695cff', fontWeight: '700' }}>zero100.com</span>
                </p>
            </div>   

            <div ref={tooltipRef} className="chart__tooltip" style={{backgroundColor: 'rgba(38,38,38,0.8)', padding: '15px 10px'}}>
                {/* <div className="" style={{color: '#fff'}}><span style={{color: '#35F97E'}}>{tooltipDesc.value}%</span><br />in {tooltipDesc.label}</div> */}
            </div>                            
        </div>
  );
}

export default DotPlotChart;