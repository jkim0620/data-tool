import React, { useRef, useEffect, } from 'react';
import { Scrollama } from 'react-scrollama';
import * as d3 from 'd3';
import ToolPeopleLogic from './ToolPeopleLogic.js';

const ToolPeople = (props) => {       
    const { loadPplChart, deactivateOnScroll } = props;

    const { onStepEnter, 
        mapSteps,
        drawBarChart,
        currentStepIndex,
        handleResize,
        onStepEnter2, 
        mapSteps2,
        drawSecondBarChart,
        currentStepIndex2,
        handleResize2,
      } = ToolPeopleLogic();  

    const chart1Ref = useRef(),
          chart2Ref = useRef();

    useEffect(() => {        
        drawBarChart(chart1Ref);
        drawSecondBarChart(chart2Ref);

        if (window.innerWidth <= 950) loadInitialChart();
    }, [])

    function loadInitialChart() {
        const ref = d3.select(chart1Ref.current); 

        const margin = {left: window.innerWidth > 950 ? 200 : 100, right: 50, top: 50, bottom: 50},
            width = chart1Ref.current.clientWidth - margin.left - margin.right;

        let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? width - margin.right : width]);

        ref.selectAll('.survey-question').node().classList.remove('hide');         
        ref.selectAll('.survey-question').node().classList.add('block');   

        ref.selectAll('.source').node().classList.remove('hide');         
        ref.selectAll('.source').node().classList.add('block');         

        ref.selectAll('.legend-box').node().classList.remove('hide');         
        ref.selectAll('.legend-box').node().classList.add('flex');         

        ref.selectAll('.bar-ppl-1')
        .transition()
        .duration(300)
        .delay( (d, i) => {
            return i * 50
        })
        .attr('width', d => {
            return x(d);
        })

        ref.selectAll('.label-ppl-1')
            .transition()
            .attr('fill', '#fff')

        ref.selectAll('.value-ppl-1')
            .transition()
            .attr('fill', '#fff')
            .delay(600)
    }

    useEffect(() => {         
        if (loadPplChart) {
            loadInitialChart();
            chart1Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loadPplChart])

    useEffect(() => {
        deactivateOnScroll('people');
        deactivateOnScroll('solution'); 

        const chart1 = d3.select(chart1Ref.current);  

        if (currentStepIndex && currentStepIndex >= 1 && window.innerWidth > 950) { loadInitialChart(); }

         if (currentStepIndex >= 3) {
            chart1.selectAll('.bar_else-2').node().classList.add('dim');
            chart1.selectAll('.bar_else-3').node().classList.add('dim');  
            chart1.selectAll('.bar_else-4').node().classList.add('dim');  
            chart1.selectAll('.bar_else-5').node().classList.add('dim');  
            chart1.selectAll('.bar_else-6').node().classList.add('dim'); 
            chart1.selectAll('.bar_else-7').node().classList.add('dim'); 
            
            chart1.selectAll('.label_else-1').node().classList.add('dim');  
            chart1.selectAll('.label_else-2').node().classList.add('dim');
            chart1.selectAll('.label_else-3').node().classList.add('dim');  

            chart1.selectAll('.value_else-2').node().classList.add('dim');
            chart1.selectAll('.value_else-3').node().classList.add('dim');  
            chart1.selectAll('.value_else-4').node().classList.add('dim');  
            chart1.selectAll('.value_else-5').node().classList.add('dim');  
            chart1.selectAll('.value_else-6').node().classList.add('dim'); 
            chart1.selectAll('.value_else-7').node().classList.add('dim'); 
        } else {
            chart1.selectAll('.bar_else-2').node().classList.remove('dim');
            chart1.selectAll('.bar_else-3').node().classList.remove('dim');  
            chart1.selectAll('.bar_else-4').node().classList.remove('dim');  
            chart1.selectAll('.bar_else-5').node().classList.remove('dim');
            chart1.selectAll('.bar_else-6').node().classList.remove('dim');    
            chart1.selectAll('.bar_else-7').node().classList.remove('dim');
            
            chart1.selectAll('.label_else-1').node().classList.remove('dim');  
            chart1.selectAll('.label_else-2').node().classList.remove('dim');
            chart1.selectAll('.label_else-3').node().classList.remove('dim'); 

            chart1.selectAll('.value_else-2').node().classList.remove('dim');
            chart1.selectAll('.value_else-3').node().classList.remove('dim');  
            chart1.selectAll('.value_else-4').node().classList.remove('dim');  
            chart1.selectAll('.value_else-5').node().classList.remove('dim');  
            chart1.selectAll('.value_else-6').node().classList.remove('dim'); 
            chart1.selectAll('.value_else-7').node().classList.remove('dim'); 
        }
    }, [currentStepIndex])

    useEffect(() => {
        const chart = d3.select(chart2Ref.current);  

        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
            refPadding = {v: 100, h: 60}, 
            width = chart2Ref.current.clientWidth - margin.left - margin.right;

        let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? width - margin.right : width]);

        if (window.innerWidth <= 950) {
            chart.selectAll('.survey-question').node().classList.remove('hide');         
            chart.selectAll('.survey-question').node().classList.add('block');   

            chart.selectAll('.source').node().classList.remove('hide');         
            chart.selectAll('.source').node().classList.add('block');         

            chart.selectAll('.legend-box').node().classList.remove('hide');         
            chart.selectAll('.legend-box').node().classList.add('flex');         

            chart.selectAll('.bar-ppl-2')
            .transition()
            .duration(300)
            .delay( (d, i) => {
                return i * 40
            })
            .attr('width', d => {
                return x(d);
            })

            chart.selectAll('.label-ppl-2')
                .transition()
                .attr('fill', '#fff')

            chart.selectAll('.value-ppl-2')
                .transition()
                .attr('fill', '#fff')
                .delay(600)
        }            

        if (currentStepIndex2 && currentStepIndex2 >= 1 && window.innerWidth > 950) {
            chart.selectAll('.survey-question').node().classList.remove('hide');         
            chart.selectAll('.survey-question').node().classList.add('block');   

            chart.selectAll('.source').node().classList.remove('hide');         
            chart.selectAll('.source').node().classList.add('block');         

            chart.selectAll('.legend-box').node().classList.remove('hide');         
            chart.selectAll('.legend-box').node().classList.add('flex');         

            chart.selectAll('.bar-ppl-2')
            .transition()
            .duration(300)
            .delay( (d, i) => {
                return i * 40
            })
            .attr('width', d => {
                return x(d);
            })

            chart.selectAll('.label-ppl-2')
                .transition()
                .attr('fill', '#fff')

            chart.selectAll('.value-ppl-2')
                .transition()
                .attr('fill', '#fff')
                .delay(600)
        }

         if (currentStepIndex2 >= 3) {
            chart.selectAll('.bar_else-1').node().classList.add('dim-light');
            chart.selectAll('.bar_else-3').node().classList.add('dim-light');  
            chart.selectAll('.bar_else-5').node().classList.add('dim-light');  
            chart.selectAll('.bar_else-7').node().classList.add('dim-light');         
            chart.selectAll('.bar_else-9').node().classList.add('dim-light');         

            for (let i = 0; i < 10; i++) {
                chart.selectAll(`.value_dim-${i}`).node().classList.add('dim-font');    
            }   
            
            chart.selectAll(`.value-diff_0`).node().classList.add('dim-lit'); 
            chart.selectAll(`.value-diff_2`).node().classList.add('dim-lit'); 
            chart.selectAll(`.value-diff_4`).node().classList.add('dim-lit'); 
            chart.selectAll(`.value-diff_6`).node().classList.add('dim-lit');    
            chart.selectAll(`.value-diff_8`).node().classList.add('dim-lit');    
        } else {
            chart.selectAll('.bar_else-1').node().classList.remove('dim-light');
            chart.selectAll('.bar_else-3').node().classList.remove('dim-light');  
            chart.selectAll('.bar_else-5').node().classList.remove('dim-light');  
            chart.selectAll('.bar_else-7').node().classList.remove('dim-light'); 
            chart.selectAll('.bar_else-9').node().classList.remove('dim-light');                

            for (let i = 0; i < 10; i++) {
                chart.selectAll(`.value_dim-${i}`).node().classList.remove('dim-font');    
            }   
            
            chart.selectAll(`.value-diff_0`).node().classList.remove('dim-lit'); 
            chart.selectAll(`.value-diff_2`).node().classList.remove('dim-lit'); 
            chart.selectAll(`.value-diff_4`).node().classList.remove('dim-lit'); 
            chart.selectAll(`.value-diff_6`).node().classList.remove('dim-lit');    
            chart.selectAll(`.value-diff_8`).node().classList.remove('dim-lit');  
        } 

    }, [currentStepIndex2])

    window.addEventListener('resize', () => {handleResize(chart1Ref)})
    window.addEventListener('resize', () => {handleResize2(chart2Ref)})

    return (
        <React.Fragment>
            <div className="">
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div ref={chart1Ref} className="chart-box" id="people">
                            <p className="survey-question font-text-bold tac hide">How well does your team attract talent?</p>
                            <div className="legend-box hide flex-h-center">
                                <div className="flex flex-v-center" style={{marginRight: '20px'}}>
                                    <div className="legend-box__square bg-ultraMarine"></div>
                                    <p>Bold Target Setters</p>
                                </div>
                                <div className="flex flex-v-center">
                                    <div className="legend-box__square bg-ultraLight"></div>
                                    <p>All Respondents</p>
                                </div>
                            </div>
                            <div className="source hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                            <div className="source source-mobile hide"><p className="gray" style={{fontSize: '0.7em', marginBottom: '0px'}}>Source: Zero100 Q2 2022 Survey of Supply Chain Professionals</p><p className="gray" style={{fontSize: '0.7em', marginTop: '0px'}}>n=269</p></div>
                        </div>
                    </div>
                </div>
                <Scrollama onStepEnter={onStepEnter}>
                {mapSteps}
                </Scrollama> 
            </div>

            <div className="">
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div ref={chart2Ref} className="chart-box">
                            <p className="survey-question font-text-bold tac hide">What type of development programs do you offer?</p>
                            <div className="legend-box hide flex-h-center">
                                <div className="flex flex-v-center" style={{marginRight: '20px'}}>
                                    <div className="legend-box__square bg-ultraMarine"></div>
                                    <p>Bold Target Setters</p>
                                </div>
                                <div className="flex flex-v-center">
                                    <div className="legend-box__square bg-ultraLight"></div>
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

export default ToolPeople;