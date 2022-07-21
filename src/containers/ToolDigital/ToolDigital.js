import React, { useRef, useEffect, } from 'react';
import { Scrollama } from 'react-scrollama';
import * as d3 from 'd3';
import ToolDigitalLogic from './ToolDigitalLogic.js';

const ToolDigital = (props) => {       
    const { loadDigitalChart, deactivateOnScroll } = props;

    const { onStepEnter, 
        mapSteps,
        drawBarChart,
        currentStepIndex,
        handleResize,
        drawSecondBarChart,
        onStepEnter2, 
        mapSteps2,
        currentStepIndex2,
        handleResize2,
      } = ToolDigitalLogic();  

    const chart1Ref = useRef(),
          chart2Ref = useRef();

    function loadInitialChart() {
        const ref = d3.select(chart1Ref.current);                    
        
        const margin = {left: 90, right: 70, top: 50, bottom: 50},
              width = chart1Ref.current.clientWidth - margin.left - margin.right;

        let xAxis = d3.scaleLinear()
            .domain([0, 100])
            .range([ 0, width]); 

        ref.selectAll('.survey-question').node().classList.remove('hide');         
        ref.selectAll('.survey-question').node().classList.add('block');    

        ref.selectAll('.source').node().classList.remove('hide');         
        ref.selectAll('.source').node().classList.add('block');   

        ref.selectAll('.bar-rect')
            .transition()
            .duration(300)                        
            .attr('width', d => { 
                return xAxis(d.value); 
            })
            .delay( (d, i) => {
                return i * 100
            })

        ref.selectAll('.label-digital-1')
            .transition()
            .attr('fill', '#fff')

        ref.selectAll('.value-digital-1')
            .transition()
            .attr('fill', '#fff')
            .delay(400)
    }      

    useEffect(() => {        
        drawBarChart(chart1Ref);
        drawSecondBarChart(chart2Ref);   

        if (window.innerWidth <= 950) { loadInitialChart(); }
    }, [])

    
    useEffect(() => {     
        if (loadDigitalChart) {
            loadInitialChart();
        }
    }, [loadDigitalChart]);

    useEffect(() => {   
        deactivateOnScroll('digital');
        deactivateOnScroll('esg'); 

        const chart1 = d3.select(chart1Ref.current); 

        if (currentStepIndex && currentStepIndex >= 1 && window.innerWidth > 950) { loadInitialChart() }
        
        if (currentStepIndex >= 4) {
            chart1.selectAll('.bar-dim-0').node().classList.add('dim');
            chart1.selectAll('.bar-dim-1').node().classList.add('dim');         
            chart1.selectAll('.label-dim-0').node().classList.add('dim');
            chart1.selectAll('.label-dim-1').node().classList.add('dim');
            chart1.selectAll('.value-dim-0').node().classList.add('dim');
            chart1.selectAll('.value-dim-1').node().classList.add('dim');         
        } else {       
            chart1.selectAll('.bar-dim-0').node().classList.remove('dim');     
            chart1.selectAll('.bar-dim-1').node().classList.remove('dim');
            chart1.selectAll('.label-dim-0').node().classList.remove('dim');     
            chart1.selectAll('.label-dim-1').node().classList.remove('dim');
            chart1.selectAll('.value-dim-0').node().classList.remove('dim');     
            chart1.selectAll('.value-dim-1').node().classList.remove('dim');
        } 

    }, [currentStepIndex])

    useEffect(() => {
        const chart2 = d3.select(chart2Ref.current);  

        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
            width = chart2Ref.current.clientWidth - margin.left - margin.right;

        let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? width - margin.right : width]);

        if (window.innerWidth < 951) {
            chart2.selectAll('.survey-question').node().classList.remove('hide');         
            chart2.selectAll('.survey-question').node().classList.add('block');  

            chart2.selectAll('.source').node().classList.remove('hide');         
            chart2.selectAll('.source').node().classList.add('block');  

            chart2.selectAll('.legend-box').node().classList.remove('hide');         
            chart2.selectAll('.legend-box').node().classList.add('flex');  

            chart2.selectAll('.bar')
            .transition()
            .duration(300)
            .delay( (d, i) => {
                return i * 50
            })
            .attr('width', d => {
                return x(d);
            })

            chart2.selectAll('.label-digital-2')
                .transition()
                .attr('fill', '#fff')

            chart2.selectAll('.value-digital-2')
                .transition()
                .attr('fill', '#fff')
                .delay(500)
        }

        if (currentStepIndex2 && currentStepIndex2 >= 1 && window.innerWidth > 950) {  
            chart2.selectAll('.survey-question').node().classList.remove('hide');         
            chart2.selectAll('.survey-question').node().classList.add('block');  

            chart2.selectAll('.source').node().classList.remove('hide');         
            chart2.selectAll('.source').node().classList.add('block');  

            chart2.selectAll('.legend-box').node().classList.remove('hide');         
            chart2.selectAll('.legend-box').node().classList.add('flex');  

            chart2.selectAll('.bar')
            .transition()
            .duration(300)
            .delay( (d, i) => {
                return i * 50
            })
            .attr('width', d => {
                return x(d);
            })

            chart2.selectAll('.label-digital-2')
                .transition()
                .attr('fill', '#fff')

            chart2.selectAll('.value-digital-2')
                .transition()
                .attr('fill', '#fff')
                .delay(500)
        }

         if (currentStepIndex2 >= 3) {
            chart2.selectAll('.bar_else-2').node().classList.add('dim');
            chart2.selectAll('.bar_else-3').node().classList.add('dim');  
            chart2.selectAll('.bar_else-4').node().classList.add('dim');  
            chart2.selectAll('.bar_else-5').node().classList.add('dim');  
            chart2.selectAll('.label_else-1').node().classList.add('dim');
            chart2.selectAll('.label_else-2').node().classList.add('dim');
            chart2.selectAll('.value_else-2').node().classList.add('dim');
            chart2.selectAll('.value_else-3').node().classList.add('dim');  
            chart2.selectAll('.value_else-4').node().classList.add('dim');  
            chart2.selectAll('.value_else-5').node().classList.add('dim');    
        } else {
            chart2.selectAll('.bar_else-2').node().classList.remove('dim');
            chart2.selectAll('.bar_else-3').node().classList.remove('dim');  
            chart2.selectAll('.bar_else-4').node().classList.remove('dim');  
            chart2.selectAll('.bar_else-5').node().classList.remove('dim');
            chart2.selectAll('.label_else-1').node().classList.remove('dim');  
            chart2.selectAll('.label_else-2').node().classList.remove('dim');
            chart2.selectAll('.value_else-2').node().classList.remove('dim');
            chart2.selectAll('.value_else-3').node().classList.remove('dim');  
            chart2.selectAll('.value_else-4').node().classList.remove('dim');  
            chart2.selectAll('.value_else-5').node().classList.remove('dim');
        }
    }, [currentStepIndex2])

    window.addEventListener('resize', () => {handleResize(chart1Ref)})
    window.addEventListener('resize', () => {handleResize2(chart2Ref)})

    return (
        <React.Fragment>
            <div>
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div className="chart-box" ref={chart1Ref}>
                            <p className="survey-question font-text-bold tac hide">How long do you expect your existing ERP system(s) to remain in use as a key part of your supply chain?</p>                            
                            <div className="source hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                            <div className="source source-mobile hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                        </div>                       
                    </div>
                </div>
                <Scrollama onStepEnter={onStepEnter}>
                {mapSteps}
                </Scrollama> 
            </div>

            <div>
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div ref={chart2Ref} className="chart-box">
                            <p className="survey-question font-text-bold tac hide">How do you plan to increase your focus on ESG criteria using supply chain technology?</p>
                            <div className="legend-box hide flex-h-center">
                                <div className="flex flex-v-center" style={{marginRight: '20px'}}>
                                    <div className="legend-box__square bg-yolk"></div>
                                    <p>Bold Target Setters</p>
                                </div>
                                <div className="flex flex-v-center">
                                    <div className="legend-box__square bg-lightYolk"></div>
                                    <p>All Respondents</p>
                                </div>
                            </div>
                            <div className="source hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                            <div className="source source-mobile hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                        </div>
                    </div>
                </div>
                <Scrollama onStepEnter={onStepEnter2}>
                {mapSteps2}
                </Scrollama> 
            </div>
        </React.Fragment>
  );
}

export default ToolDigital;