import React, { useRef, useState, }  from 'react';
import ToolDigital from '../ToolDigital/ToolDigital';
import ToolESG from '../ToolESG/ToolESG';
import ToolPeople from '../ToolPeople/ToolPeople';
import ToolSolution from '../ToolSolution/ToolSolution';
import Outro from '../Outro/Outro';
import HandleFunction from '../../hooks/HandleFunction';

const ToolWrapper = React.forwardRef((props, ref) => {
    const { useIsInViewport } = HandleFunction();

    const [activateSubMenu1, setActivateSubMenu1] = useState(false),
          [activateSubMenu2, setActivateSubMenu2] = useState(false),
          [activateSubMenu3, setActivateSubMenu3] = useState(false);

    const [loadDigitalChart, setLoadDigitalChart] = useState(false),
          [loadEsgChart, setLoadEsgChart] = useState(false),
          [loadPplChart, setLoadPplChart] = useState(false),
          [loadSolutionChart, setLoadSolutionChart] =  useState(false);      

    const digitalRef = useRef(),
          esgRef = useRef(),
          pplRef = useRef(),
          solutionRef = useRef();

    const isDigitalInViewport = useIsInViewport(digitalRef),
          isEsgInViewport = useIsInViewport(esgRef),
          isPplInViewport = useIsInViewport(pplRef),
          isSolutionInViewport = useIsInViewport(solutionRef);        

    const toggleSubMenu = (step) => {          
        if (step >= 3 && step < 5) {
            setActivateSubMenu1(true);
            setActivateSubMenu2(false);
            setActivateSubMenu3(false);
        } else if (step >= 5 && step < 7) {
            setActivateSubMenu1(false);
            setActivateSubMenu2(true);
            setActivateSubMenu3(false);
        } else if (step >= 7 && step < 10) {
            setActivateSubMenu1(false);
            setActivateSubMenu2(false);
            setActivateSubMenu3(true);
        } else {
            setActivateSubMenu1(false);
            setActivateSubMenu2(false);
            setActivateSubMenu3(false);
        }
    }

    const toggleNavMenu = (sec) => {
        if (sec === 'digital') {
            setLoadDigitalChart(true);
            setLoadEsgChart(false);
            setLoadPplChart(false);
            setLoadSolutionChart(false);  
            digitalRef.current.scrollIntoView({ behavior: 'smooth' });          
        } else if (sec === 'esg') {
            setLoadEsgChart(true);
            setLoadDigitalChart(false);
            setLoadPplChart(false);
            setLoadSolutionChart(false);
        } else if (sec === 'people') {
            setLoadPplChart(true);
            setLoadDigitalChart(false);
            setLoadEsgChart(false);
            setLoadSolutionChart(false);            
        } else if (sec === 'solution') {
            setLoadSolutionChart(true);
            setLoadDigitalChart(false);
            setLoadEsgChart(false);
            setLoadPplChart(false);            
        } 
    }

    const deactivateOnScroll = (sec) => {        
        if (sec === 'digital') {
            setLoadDigitalChart(false);
        } else if (sec === 'esg') {
            setLoadEsgChart(false);
        } else if (sec === 'people') {
            setLoadPplChart(false);
        } else if (sec === 'solution') {
            setLoadSolutionChart(false);            
        } 
    }

    return (
        <div className="bg-black white" ref={ref}>
            <div className="max-width-wrapper">
                <div className="tool-section section-wrapper">

                    <div className="tool-section__sidebar white">
                        <div className="sticky-nav">
                            <div className="flex"><div className={`${isDigitalInViewport ? 'bg-yolk' : 'bg-mediumGray'}`} style={{height: '20px', width: '2px', marginRight: '10px'}}></div><div className={`nav-menu pointer font-text-bold ${isDigitalInViewport ? 'yolk' : 'mediumGray'}`} onClick={() => {toggleNavMenu('digital')}}><a>DIGITAL</a></div></div>
                            <div className="flex"><div className={`${isEsgInViewport ? 'bg-emerald' : 'bg-mediumGray'}`} style={{height: '20px', width: '2px', marginRight: '10px'}}></div><div className={`nav-menu font-text-bold pointer ${isEsgInViewport ? 'emerald' : 'mediumGray'}`} onClick={() => {toggleNavMenu('esg')}}><a>ESG</a></div></div>
                            <div className="flex"><div className={`${isPplInViewport ? 'bg-ultraLight' : 'bg-mediumGray'}`} style={{height: '20px', width: '2px', marginRight: '10px'}}></div><div className={`nav-menu font-text-bold pointer ${isPplInViewport ? 'ultraLight' : 'mediumGray'}`} onClick={() => {toggleNavMenu('people')}}><a>PEOPLE</a></div></div>
                            <div className="flex">
                                <div className={`${isSolutionInViewport ? 'bg-white' : 'bg-mediumGray'}`} style={{height: '20px', width: '2px', marginRight: '10px'}}></div>
                                <div className={`nav-menu font-text-bold`}>
                                    <div className={`pointer ${isSolutionInViewport ? 'white' : 'mediumGray'}`} onClick={() => {toggleNavMenu('solution')}}><a>SOLUTIONS</a></div>
                                    <p className={`sub-menu font-text-bold ${activateSubMenu1 && !isDigitalInViewport && !isEsgInViewport && !isPplInViewport ? 'yolk' : 'mediumGray'}`}><a>Risk #1: Digital</a></p>
                                    <p className={`sub-menu font-text-bold ${activateSubMenu2 && !isDigitalInViewport && !isEsgInViewport && !isPplInViewport ? 'emerald' : 'mediumGray'}`}><a>Risk #2: ESG</a></p>
                                    <p className={`sub-menu font-text-bold ${activateSubMenu3 && !isDigitalInViewport && !isEsgInViewport && !isPplInViewport ? 'ultraLight' : 'mediumGray'}`}><a>Risk #3: People</a></p>
                                </div>                            
                            </div>
                        </div>
                    </div>

                    <div className="tool-section__topbar" >
                        <div className="sticky-nav-mobile flex">
                            <div className="nav-menu-mobile"><div className={`pointer font-text-bold ${isDigitalInViewport ? 'yolk' : 'mediumGray'}`} onClick={() => {toggleNavMenu('digital')}}>DIGITAL</div><div className={`active-menu-mobile ${isDigitalInViewport ? 'bg-yolk' : 'bg-mediumGray'}`}></div></div>
                            <div className="nav-menu-mobile"><div className={`font-text-bold pointer ${isEsgInViewport ? 'emerald' : 'mediumGray'}`} onClick={() => {toggleNavMenu('esg')}}>ESG</div><div className={`active-menu-mobile ${isEsgInViewport ? 'bg-emerald' : 'bg-mediumGray'}`}></div></div>
                            <div className="nav-menu-mobile"><div className={`font-text-bold pointer ${isPplInViewport ? 'ultraLight' : 'mediumGray'}`} onClick={() => {toggleNavMenu('people')}}>PEOPLE</div><div className={`active-menu-mobile ${isPplInViewport ? 'bg-ultraLight' : 'bg-mediumGray'}`}></div></div>
                            <div className="nav-menu-mobile"><div className={`font-text-bold pointer ${isSolutionInViewport ? 'white' : 'mediumGray'}`} onClick={() => {toggleNavMenu('solution')}}>SOLUTION</div><div className={`active-menu-mobile ${isSolutionInViewport ? 'bg-white' : 'bg-mediumGray'}`}></div></div>
                        </div>
                    </div>

                    <div className="tool-section__chart" >
                        <div ref={digitalRef} id="digital"><ToolDigital loadDigitalChart={loadDigitalChart} deactivateOnScroll={deactivateOnScroll} /></div>
                        <div ref={esgRef}><ToolESG loadEsgChart={loadEsgChart} deactivateOnScroll={deactivateOnScroll} /></div>
                        <div ref={pplRef}><ToolPeople loadPplChart={loadPplChart} deactivateOnScroll={deactivateOnScroll} /></div>
                        <div ref={solutionRef}><ToolSolution loadSolutionChart={loadSolutionChart} toggleSubMenu={toggleSubMenu} deactivateOnScroll={deactivateOnScroll} useIsInViewport={useIsInViewport} /></div>
                    </div>
                    
                </div>

                <Outro />

            </div>
        </div>
    )
})

export default ToolWrapper;
