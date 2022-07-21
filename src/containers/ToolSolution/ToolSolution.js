import React, { useRef, useEffect, } from 'react';
import { Scrollama } from 'react-scrollama';
import * as d3 from 'd3';
import ToolSolutionLogic from './ToolSolutionLogic.js';

const ToolSolution = (props) => {     
    const { toggleSubMenu, loadSolutionChart, deactivateOnScroll } = props;  
    
    const { onStepEnter, 
        mapSteps,
        drawTheLens,
        currentStepIndex,
        handleResize,
      } = ToolSolutionLogic();  

    const chartRef = useRef();
    
    function drawCircle (ref, r) {
        ref.selectAll('.circle')
            .transition()
            .duration(200)
            .delay( (d, i) => {
                return i * 50
            })
            .attr('r', r)
            .attr('opacity', 1)        

        ref.selectAll('.lens-label')
            .transition()
            .attr('opacity', 1)  
    }

    useEffect(() => {        
        drawTheLens(chartRef);
    }, [])

    useEffect(() => {
        const chart = d3.select(chartRef.current);  

        const margin = {left: 50, right: 50, top: 50, bottom: 50},
              width = chartRef.current.clientWidth - margin.left - margin.right,
              radius = (width - margin.right - margin.left) / 3;
              
        if (loadSolutionChart) {
            drawCircle(chart, radius);
            
            chart.selectAll('.circle-digital')
                .attr('stroke', '#FF9B00')  
            chart.selectAll('.circle-esg')
                .attr('stroke', '#00D885')  
            chart.selectAll('.circle-ppl')
                .attr('stroke', '#695CFF') 
            chart.selectAll('.lens-label_digital')
                .attr('fill', '#FF9B00')  
            chart.selectAll('.lens-label_esg')
                .attr('fill', '#00D885')                    
            chart.selectAll('.lens-label_ppl')
                .attr('fill', '#695CFF')  

            chartRef.current.scrollIntoView({ behavior: 'smooth', })
        }
    }, [loadSolutionChart])   

    useEffect(() => {
        deactivateOnScroll('solution'); 

        toggleSubMenu(currentStepIndex);

        const chart = d3.select(chartRef.current);  

        const margin = {left: 50, right: 50, top: 50, bottom: 50},
              width = chartRef.current.clientWidth - margin.left - margin.right,
              radius = (width - margin.right - margin.left) / 3;

        if (window.innerWidth <= 950) {
            drawCircle(chart, radius);         
        }

        if (currentStepIndex && currentStepIndex >= 1 && window.innerWidth > 950) {            
            drawCircle(chart, radius)         
        }

        if (currentStepIndex >= 1 && currentStepIndex < 3) {
            chart.selectAll('.circle-digital')
                .attr('stroke', '#FF9B00')

            chart.selectAll('.lens-label_digital')
                .attr('fill', '#FF9B00') 

            chart.selectAll('.circle-ppl')
                .attr('stroke', '#695CFF')

            chart.selectAll('.lens-label_ppl')
                .attr('fill', '#695CFF')
                
            chart.selectAll('.circle-esg')
                .attr('stroke', '#00D885')

            chart.selectAll('.lens-label_esg')
                .attr('fill', '#00D885')
        } else if (currentStepIndex >= 3 && currentStepIndex < 5) {
            chart.selectAll('.circle')
                .transition()
                .duration(100)
                .attr('stroke', '#666')           
                
            chart.selectAll('.lens-label')
                .transition()
                .duration(100)
                .attr('fill', '#666')

            chart.selectAll('.circle-digital')
                .transition()
                .duration(100)
                .attr('stroke', '#FF9B00')

            chart.selectAll('.lens-label_digital')
                .transition()
                .duration(100)
                .attr('fill', '#FF9B00')    
        } else if (currentStepIndex >= 5 && currentStepIndex < 7) {
            chart.selectAll('.circle')
                .transition()
                .duration(100)
                .attr('stroke', '#666')           
                
            chart.selectAll('.lens-label')
                .transition()
                .duration(100)
                .attr('fill', '#666')

            chart.selectAll('.circle-esg')
                .transition()
                .duration(100)
                .attr('stroke', '#00D885')

            chart.selectAll('.lens-label_esg')
                .transition()
                .duration(100)
                .attr('fill', '#00D885')
        } else if (currentStepIndex >= 7) {
            chart.selectAll('.circle')
                .transition()
                .duration(100)
                .attr('stroke', '#666')           
                
            chart.selectAll('.lens-label')
                .transition()
                .duration(100)
                .attr('fill', '#666')

            chart.selectAll('.circle-ppl')
                .transition()
                .duration(100)
                .attr('stroke', '#695CFF')

            chart.selectAll('.lens-label_ppl')
                .transition()
                .duration(100)
                .attr('fill', '#695CFF')
        } 
    }, [currentStepIndex])

    window.addEventListener('resize', () => {handleResize(chartRef)})
    
    return (
        <React.Fragment>
            <div className="">
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div ref={chartRef} className="chart-box" id="solutions"></div>
                    </div>
                </div>
                <Scrollama onStepEnter={onStepEnter}>
                {mapSteps}
                </Scrollama> 
            </div>            
        
        </React.Fragment>
  );
}

export default ToolSolution;