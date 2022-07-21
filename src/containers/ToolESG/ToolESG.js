import React, { useRef, useEffect, } from 'react';
import { Scrollama } from 'react-scrollama';
import * as d3 from 'd3';
import ToolESGLogic from './ToolESGLogic.js';

const ToolESG = (props) => {       
    const { loadEsgChart, deactivateOnScroll } = props;

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
      } = ToolESGLogic();  

    const chart1Ref = useRef(),
          chart2Ref = useRef();

    useEffect(() => {        
        drawBarChart(chart1Ref);
        drawSecondBarChart(chart2Ref);

        if (window.innerWidth <= 950) loadInitialChart();                
    }, [])

    function loadInitialChart() {
        const ref = d3.select(chart1Ref.current);                    
        
        const margin = {left: window.innerWidth > 950 ? 170 : 110, right: 50, top: 50, bottom: 50},
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

        ref.selectAll('.bar-ESG-1')
            .transition()
            .duration(400)                        
            .attr('width', d => { 
                return x(d); 
            })
            .delay( (d, i) => {
                return i * 50
            })
        
        ref.selectAll('.label-esg-1')
            .transition()
            .attr('fill', '#fff')

        ref.selectAll('.value-esg-1')
            .transition()
            .attr('fill', '#fff')
            .delay(600)
    }

    useEffect(() => {           
        if (loadEsgChart) { 
            loadInitialChart();
            chart1Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loadEsgChart])

    useEffect(() => {       
        deactivateOnScroll('esg'); 
        deactivateOnScroll('people');

        if (currentStepIndex && currentStepIndex >= 1 && window.innerWidth > 950) loadInitialChart();                
    }, [currentStepIndex])

    useEffect(() => {
        const chart2 = d3.select(chart2Ref.current);  

        const margin = {left: window.innerWidth > 950 ? 170 : 100, right: 50, top: 50, bottom: 50},
            refPadding = {v: 100, h: 60}, 
            width = chart2Ref.current.clientWidth - margin.left - margin.right;

        let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 0, window.innerWidth > 950 ? width - margin.right : width]);

        if (window.innerWidth <= 950) {
            chart2.selectAll('.survey-question').node().classList.remove('hide');         
            chart2.selectAll('.survey-question').node().classList.add('block');   

            chart2.selectAll('.source').node().classList.remove('hide');         
            chart2.selectAll('.source').node().classList.add('block');  

            chart2.selectAll('.legend-box').node().classList.remove('hide');         
            chart2.selectAll('.legend-box').node().classList.add('flex');         

            chart2.selectAll('.bar')
            .transition()
            .duration(400)
            .delay( (d, i) => {
                return i * 50
            })
            .attr('width', d => {
                return x(d);
            })

            chart2.selectAll('.label-esg-2')
                .transition()
                .attr('fill', '#fff')

            chart2.selectAll('.value-esg-2')
                .transition()
                .attr('fill', '#fff')
                .delay(600)
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
            .duration(400)
            .delay( (d, i) => {
                return i * 50
            })
            .attr('width', d => {
                return x(d);
            })

            chart2.selectAll('.label-esg-2')
                .transition()
                .attr('fill', '#fff')

            chart2.selectAll('.value-esg-2')
                .transition()
                .attr('fill', '#fff')
                .delay(600)
        }

         if (currentStepIndex2 >= 3) {
            chart2.selectAll('.bar_else-2').node().classList.add('dim');
            chart2.selectAll('.bar_else-3').node().classList.add('dim');  
            chart2.selectAll('.bar_else-4').node().classList.add('dim');  
            chart2.selectAll('.bar_else-5').node().classList.add('dim');  
            chart2.selectAll('.bar_else-6').node().classList.add('dim'); 
            chart2.selectAll('.bar_else-7').node().classList.add('dim'); 
            
            chart2.selectAll('.label_else-1').node().classList.add('dim');  
            chart2.selectAll('.label_else-2').node().classList.add('dim');
            chart2.selectAll('.label_else-3').node().classList.add('dim');  

            chart2.selectAll('.value_else-2').node().classList.add('dim');
            chart2.selectAll('.value_else-3').node().classList.add('dim');  
            chart2.selectAll('.value_else-4').node().classList.add('dim');  
            chart2.selectAll('.value_else-5').node().classList.add('dim');  
            chart2.selectAll('.value_else-6').node().classList.add('dim'); 
            chart2.selectAll('.value_else-7').node().classList.add('dim'); 
        } else {
            chart2.selectAll('.bar_else-2').node().classList.remove('dim');
            chart2.selectAll('.bar_else-3').node().classList.remove('dim');  
            chart2.selectAll('.bar_else-4').node().classList.remove('dim');  
            chart2.selectAll('.bar_else-5').node().classList.remove('dim');
            chart2.selectAll('.bar_else-6').node().classList.remove('dim');    
            chart2.selectAll('.bar_else-7').node().classList.remove('dim');
            
            chart2.selectAll('.label_else-1').node().classList.remove('dim');  
            chart2.selectAll('.label_else-2').node().classList.remove('dim');
            chart2.selectAll('.label_else-3').node().classList.remove('dim'); 

            chart2.selectAll('.value_else-2').node().classList.remove('dim');
            chart2.selectAll('.value_else-3').node().classList.remove('dim');  
            chart2.selectAll('.value_else-4').node().classList.remove('dim');  
            chart2.selectAll('.value_else-5').node().classList.remove('dim');  
            chart2.selectAll('.value_else-6').node().classList.remove('dim'); 
            chart2.selectAll('.value_else-7').node().classList.remove('dim'); 
        }
    }, [currentStepIndex2])

    window.addEventListener('resize', () => {handleResize(chart1Ref)})
    window.addEventListener('resize', () => {handleResize2(chart2Ref)})

    return (
        <React.Fragment>
            <div className="">
                <div className="scroll-board">
                    <div className="scroll-board__chart">
                        <div ref={chart1Ref} className="chart-box" id="esg">
                            <p className="survey-question font-text-bold tac hide">Are you increasing focus on the following ESG criteria?</p>
                            <div className="legend-box hide flex-h-center">
                                <div className="flex flex-v-center" style={{marginRight: '20px'}}>
                                    <div className="legend-box__square bg-emerald"></div>
                                    <p>Bold Target Setters</p>
                                </div>
                                <div className="flex flex-v-center">
                                    <div className="legend-box__square bg-lightEmerald"></div>
                                    <p>Behind Target</p>
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
                    <div className="scroll-board__chart" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh'}}>
                        <div ref={chart2Ref} className="chart-box">
                            <p className="survey-question font-text-bold tac hide">How far into your supply chain can you see your greenhouse gas emissions?</p>
                            <div className="legend-box hide flex-h-center">
                                <div className="flex flex-v-center" style={{marginRight: '20px'}}>
                                    <div className="legend-box__square bg-emerald"></div>
                                    <p>Bold Target Setters</p>
                                </div>
                                <div className="flex flex-v-center">
                                    <div className="legend-box__square bg-lightEmerald"></div>
                                    <p>Behind Target</p>
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

export default ToolESG;