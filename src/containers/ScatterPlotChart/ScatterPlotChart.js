import React, { useRef, useEffect, useContext } from 'react';
import ScatterPlotChartLogic from './ScatterPlotChartLogic.js';
import Filter from '../Filter/Filter';
import HandleData from '../../hooks/HandleData.js';
import ToolContext from '../../hooks/ToolContext';

const ScatterPlotChart = () => {       
    const { scatterData } = HandleData();   
    const { selectedLabel } = useContext(ToolContext); 
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawScatterChart,
        updateScatterChart,
        tooltipDesc,
        handleResize,
      } = ScatterPlotChartLogic();   

    useEffect(() => {              
        scatterData.length > 0 && drawScatterChart(scatterData, chartRef, tooltipRef);
    }, [scatterData])

    useEffect(() => {
        selectedLabel.length > 0 && updateScatterChart(selectedLabel);
    }, [selectedLabel])

    // useEffect(() => {
    //     selectedLabelData.length > 0 && drawScatterChart(selectedLabelData, chartRef, tooltipRef);
    // }, [selectedLabelData])

    // window.addEventListener('resize', () => {handleResize(chartRef, lineData)})

    const FilterPills = (props) => {
        const { label }= props;
        return (<div style={{border: '2px solid #fff', color: '#fff', borderRadius: '20px', display: 'inline', padding: '5px 12px', fontWeight: 'bold', fontSize: '0.9rem', marginRight: '10px'}}>{label}</div>)
        // return (<li className={`label-filter__ul--list pointer font-text-bold gray`} style={{padding: '5px 3px'}}>{label}</li>)
    }

    const drawSelectedPills = selectedLabel.map((el, index) => {
        return (<FilterPills key={index} label={el} />)
    }); 

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold', marginBottom: '20px'}}>SCATTER CHART</div>
            <div style={{display: 'flex'}}>
                <div style={{color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '30px'}}>
                    <div style={{width: '30px', borderBottom: '2px dashed #fff', marginRight: '10px'}}></div>
                    <div>Average Line</div>
                </div>

                <div style={{color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '30px'}}>
                    <div style={{width: '13px', height: '13px', borderRadius: '50%', background: '#35F97E', marginRight: '10px'}}></div>
                    <div>Above Average</div>
                </div>

                <div style={{color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '30px'}}>
                    <div style={{width: '13px', height: '13px', borderRadius: '50%', background: '#00aef4', marginRight: '10px'}}></div>
                    <div>Above Y Average, Below X Average</div>
                </div>

                <div style={{color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '30px'}}>
                    <div style={{width: '13px', height: '13px', borderRadius: '50%', background: '#ff9b00', marginRight: '10px'}}></div>
                    <div>Above X Average, Below Y Average</div>
                </div>

                <div style={{color: '#fff', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '30px'}}>
                    <div style={{width: '13px', height: '13px', borderRadius: '50%', background: '#e7045e', marginRight: '10px'}}></div>
                    <div>Below Average</div>
                </div>
            </div>

            <div style={{display: 'flex',}}>
                <div className="chart__container" ref={chartRef}>
                </div> 

                <div className="" style={{color: '#fff', marginTop: '15px'}}>
                    <Filter listDirection={'down'} />
                    <div style={{padding: '20px 0', display:`${selectedLabel == '' ? 'none' : 'block'}`}}>
                        {drawSelectedPills}
                    </div>
                </div>                
            </div>

            <div className="chart__source">
            </div>   

            <div ref={tooltipRef} className="chart__tooltip" style={{color: '#000'}}>
                <div className="" style={{color: '#000'}}>{tooltipDesc.label}</div>
            </div>                            
        </div>
  );
}

export default ScatterPlotChart;