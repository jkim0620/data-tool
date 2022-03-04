import React, {useState, useEffect, useRef} from 'react';
import Sticker from 'react-stickyfill';
import { Scrollama } from 'react-scrollama';
import throttle from 'lodash.throttle';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';
import ScrollLogic from './ScrollLogic.js';
import Tool from '../Tool/Tool';
import Sidebar from '../Sidebar/Sidebar';
import VideoImg from '../../assets/img/supply-chain-credibility-design_video1.png';
import DocImg1 from '../../assets/img/supply-chain-credibility-design_doc1.png';
import DocImg2 from '../../assets/img/supply-chain-credibility-design_doc2.png';
import DocImg3 from '../../assets/img/supply-chain-credibility-design_doc3.png';
import GraphImg from '../../assets/img/supply-chain-credibility-design_graph1.png';
import GraphImg2 from '../../assets/img/supply-chain-credibility-design_graph2.png';
import HeadlineImg1 from '../../assets/img/supply-chain-credibility-design_headline1.png'; 
import HeadlineImg2 from '../../assets/img/supply-chain-credibility-design_headline2.png';
import HeadlineImg3 from '../../assets/img/supply-chain-credibility-design_headline3.png'; 
import HeadlineImg4 from '../../assets/img/supply-chain-credibility-design_headline4.png'; 
import HeadlineImg5 from '../../assets/img/supply-chain-credibility-design_headline5.png';
import HeadlineImg6 from '../../assets/img/supply-chain-credibility-design_headline6.png';
import HeadlineImg7 from '../../assets/img/supply-chain-credibility-design_headline7.png'; 
import HeadlineImg8 from '../../assets/img/supply-chain-credibility-design_headline8.png';
import HeadlineImg9 from '../../assets/img/supply-chain-credibility-design_headline9.png';
import HeadlineImg10 from '../../assets/img/supply-chain-credibility-design_headline10.png';
import SocialImg1 from '../../assets/img/supply-chain-credibility-design_social1.png';
import SocialImg2 from '../../assets/img/supply-chain-credibility-design_social2.png'; 
import FolderIcon from '../../assets/img/supply-chain-credibility-design_folder-icon.svg'; 
import HeartIcon from '../../assets/img/supply-chain-credibility-design_lg-icon-heart.svg'; 
import LikeIcon from '../../assets/img/supply-chain-credibility-design_lg-icon-like.svg'; 
import MagnifyIcon from '../../assets/img/supply-chain-credibility-design_lg-icon-magnifying.svg'; 
import PlayIcon from '../../assets/img/supply-chain-credibility-design_lg-icon-play.svg'; 
import NewsPaperIcon from '../../assets/img/supply-chain-credibility-design_newspaper-icon.svg'; 
import BlueCircle from '../../assets/img/supply-chain-credibility-design_md-circle-blue.svg'; 
import GreenCircle from '../../assets/img/supply-chain-credibility-design_md-circle-green.svg'; 
import PeachCircle from '../../assets/img/supply-chain-credibility-design_md-circle-peach.svg'; 
import PinkCircle from '../../assets/img/supply-chain-credibility-design_md-circle-pink.svg'; 
import OrangeCircle from '../../assets/img/supply-chain-credibility-design_sm-circle-orange.svg'; 
import PurpleCircle from '../../assets/img/supply-chain-credibility-design_sm-circle-purple.svg'; 
import { delay } from 'lodash';

const Scroll = () => {
    const {selectedIndustry, 
           handleIndustrySelect, 
           selectedView, 
           handleViewSelect,
           industryData,
           allData,
           deviceType} = HandleData();

    const { onStepEnter, 
            mapSteps,
            animateSvg,
            positionSvg,
          } = ScrollLogic();    

    const toolRef = useRef(),
          scrollRef = useRef(),
          svgRef = useRef();

    const [ hideIntro, setHideIntro ] = useState(false);      
    
    useEffect(() => {
        positionSvg(svgRef, allData);
        
    }, [])

    useEffect(() => {
        deviceType === 'Desktop' ? toolRef.current.scrollIntoView({behavior:'smooth'}) : toolRef.current.scrollIntoView();   
        
        // const delayTime = deviceType === 'Desktop' ? 1000 : 0;
        if (selectedIndustry !== 'Select an Industry' && !hideIntro && deviceType === 'Desktop') {
            setTimeout(() => {
                setHideIntro(true);
            }, 1000)            
        }
    }, [selectedIndustry])
        
    window.addEventListener('scroll', throttle(() => {animateSvg(svgRef, window.scrollY, allData)}, 16), false);
    window.addEventListener('resize', () => { positionSvg(svgRef, allData); } )

    return (
        <ToolContext.Provider 
        value={{selectedIndustry, 
                handleIndustrySelect, 
                selectedView, 
                handleViewSelect,
                industryData, 
                allData,
        }}>
            <div className={`${hideIntro ? 'hide' : 'block'} scroll-board-wrapper`} ref={scrollRef}>
                <Sticker>
                    <div className={`scroll-board`}>
                        <div className="animation-wrapper" ref={svgRef}>
                            <svg style={{width: '100%', height: '100%',}}>
                                <g>
                                    <image className="animation-el animation-el-doc1"  x="10" y="0" width="200px" href={DocImg1}></image>    
                                    <image className="animation-el animation-el-doc2" x="600" y="10" width="150px" href={DocImg2}></image>    
                                    <image className="animation-el animation-el-doc3" x="700" y="50" width="200px" href={DocImg3}></image>    
                                    <image className="animation-el animation-el-video1" x="200" y="10" width="200px" href={VideoImg}></image>  
                                    <image className="animation-el animation-el-headline1" x="0" y="220" width="300px" href={HeadlineImg1}></image>    
                                    <image className="animation-el animation-el-graph2" x="450" y="300" width="150px" href={GraphImg2}></image>  
                                    <image className="animation-el animation-el-headline2" x="200" y="300" width="300px" href={HeadlineImg2}></image>    
                                    <image className="animation-el animation-el-social1" x="0" y="400" width="150px" href={SocialImg1}></image>    
                                    <image className="animation-el animation-el-graph1" x="50" y="300" href={GraphImg}></image>                                         
                                    <image className="animation-el animation-el-headline3" x="400" y="500" width="250px" href={HeadlineImg3}></image>    
                                    <image className="animation-el animation-el-headline4" x="600" y="400" width="250px" href={HeadlineImg4}></image> 
                                    <image className="animation-el animation-el-social2" x="1100" y="300" width="100px" href={SocialImg2}></image>      
                                    <image className="animation-el animation-el-headline5" x="850" y="400" width="150px" href={HeadlineImg5}></image>      
                                    <image className="animation-el animation-el-headline6" x="850" y="220" width="300px" href={HeadlineImg6}></image>      
                                    <image className="animation-el animation-el-headline8" x="800" y="10" width="200px" href={HeadlineImg8}></image>      
                                    <image className="animation-el animation-el-headline7" x="950" y="100" width="300px" href={HeadlineImg7}></image> 
                                    <image className="animation-el animation-el-headline10" x="450" y="170" width="150px" href={HeadlineImg10}></image> 
                                    <image className="animation-el animation-el-headline9" x="580" y="200" width="220px" href={HeadlineImg9}></image> 
                                    <image className="animation-el animation-el-newspaper" x="950" y="260" width="60px" href={NewsPaperIcon}></image> 
                                    <image className="animation-el animation-el-magnify" x="350" y="450" width="80px" href={MagnifyIcon}></image>       
                                                                            
                                    <image className="animation-el animation-el-folder" x="600" y="10" width="80px"  href={FolderIcon}></image> 
                                    <image className="animation-el animation-el-play" x="700" y="10" width="80px"  href={PlayIcon}></image> 
                                    <image className="animation-el animation-el-like" x="100" y="300" width="80px" href={LikeIcon}></image>  
                                    <image className="animation-el animation-el-heart" x="700" y="600" width="80px" href={HeartIcon}></image>    
                                    <image className="animation-el animation-el-bluedot" x="620" y="380" width="30px" href={BlueCircle}></image> 
                                    <image className="animation-el animation-el-pinkdot"  x="10" y="0" width="30px" href={PinkCircle}></image>  
                                    <image className="animation-el animation-el-orangedot"  x="10" y="0" width="30px" href={OrangeCircle}></image>  
                                    <image className="animation-el animation-el-orangedot-2" x="1200" y="0" width="20px" href={OrangeCircle}></image>  
                                    <image className="animation-el animation-el-orangedot-3" x="600" y="600" width="50px" href={OrangeCircle}></image>  
                                    <image className="animation-el animation-el-purpledot" x="400" y="500" width="50px" href={PurpleCircle}></image>  
                                    <image className="animation-el animation-el-purpledot-2" x="150" y="600" width="30px" href={PurpleCircle}></image>  
                                    <image className="animation-el animation-el-purpledot-3" x="1100" y="550" width="30px" href={PurpleCircle}></image>  
                                    <image className="animation-el animation-el-purpledot-4" x="1000" y="30" width="30px" href={PurpleCircle}></image>  
                                    <image className="animation-el animation-el-peachdot" x="500" y="10" width="50px"  href={PeachCircle}></image>
                                    <image className="animation-el animation-el-peachdot-2" x="1150" y="200" width="40px" href={PeachCircle}></image>      
                                    <image className="animation-el animation-el-peachdot-3" x="220" y="280" width="30px" href={PeachCircle}></image>  
                                    <image className="animation-el animation-el-greendot" x="20" y="300" width="30px" href={GreenCircle}></image> 

                                    <rect className="animation-rain animation-rain-rect" x="720" y="150" width="10px" height="10px" fill="#695CFF"></rect> 
                                    <rect className="animation-rain animation-rain-rect-2" x="520" y="150" width="10px" height="10px" fill="#FF9B00"></rect> 
                                    <rect className="animation-rain animation-rain-rect-3" x="600" y="170" width="10px" height="10px" fill="#fff"></rect> 
                                    <rect className="animation-rain animation-rain-rect-4" x="480" y="160" width="10px" height="10px" fill="#fff"></rect> 
                                    <rect className="animation-rain animation-rain-rect-5" x="660" y="120" width="10px" height="10px" fill="#00D885"></rect> 
                                    <rect className="animation-rain animation-rain-rect-6" x="530" y="120" width="10px" height="10px" fill="#695CFF"></rect> 
                                    <rect className="animation-rain animation-rain-rect-7" x="550" y="200" width="10px" height="10px" fill="#E7045E"></rect> 
                                    <rect className="animation-rain animation-rain-rect-8" x="720" y="200" width="10px" height="10px" fill="#fff"></rect> 
                                    <rect className="animation-rain animation-rain-rect-9" x="850" y="150" width="10px" height="10px" fill="#695CFF"></rect> 
                                    <rect className="animation-rain animation-rain-rect-10" x="660" y="120" width="10px" height="10px" fill="#FFC8A4"></rect> 
                                    <circle className="animation-rain animation-rain-circle" cx="500" cy="120" r="6" fill="#00D885"></circle> 
                                    <circle className="animation-rain animation-rain-circle-2" cx="600" cy="130" r="6" fill="#fff"></circle> 
                                    <circle className="animation-rain animation-rain-circle-3" cx="700" cy="120" r="6" fill="#695CFF"></circle> 
                                    <circle className="animation-rain animation-rain-circle-4" cx="650" cy="160" r="6" fill="#FF9B00"></circle> 
                                    <circle className="animation-rain animation-rain-circle-5" cx="680" cy="160" r="6" fill="#fff"></circle> 
                                    <circle className="animation-rain animation-rain-circle-6" cx="800" cy="220" r="6" fill="#FF9B00"></circle> 
                                    <circle className="animation-rain animation-rain-circle-7" cx="350" cy="220" r="6" fill="#695CFF"></circle> 
                                    <circle className="animation-rain animation-rain-circle-8" cx="770" cy="150" r="6" fill="#00AEF4"></circle> 
                                    <circle className="animation-rain animation-rain-circle-9" cx="770" cy="150" r="6" fill="#fff"></circle> 
                                    <circle className="animation-rain animation-rain-circle-10" cx="650" cy="160" r="6" fill="#695CFF"></circle> 

                                    <svg className="chart-svg" style={{height: '100%',}}>
                                        <g>
                                            <text className="scroll-tool-label scroll-tool-label-1 scroll-tool-label-yolk" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Plan</text>
                                            <text className="scroll-tool-label scroll-tool-label-2 scroll-tool-label-yolk" y="250px"  textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Source</text>                                                
                                            <text className="scroll-tool-label scroll-tool-label-3 scroll-tool-label-yolk" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Make</text>
                                            <text className="scroll-tool-label scroll-tool-label-4 scroll-tool-label-yolk" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Move</text>
                                            <text className="scroll-tool-label scroll-tool-label-5 scroll-tool-label-emerald" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Sell</text>
                                            <text className="scroll-tool-label scroll-tool-label-6 scroll-tool-label-emerald" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Use</text>
                                            <text className="scroll-tool-label scroll-tool-label-7 scroll-tool-label-emerald" y="250px" textAnchor="middle" fill="transparent" style={{fontWeight: 700}}>Regenerate</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>                                                
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <text className="scroll-tool-score" y="365px" fontWeight="600" textAnchor="middle" fill="transparent">14%</text>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#FF9B00" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                            <circle className="scroll-tool-circle" cy="360px" r="0" fill="transparent" stroke="#00D885" strokeDasharray="5, 4" strokeWidth="3px"></circle>
                                        </g>
                                    </svg>
                                </g>
                            </svg>
                        </div> 
                    </div>
                </Sticker>

                <Scrollama onStepEnter={onStepEnter}>
                {mapSteps}
                </Scrollama>                
            </div>                   

            <div ref={toolRef} className={`${selectedIndustry !== 'Select an Industry' ? 'block' : 'hide'}`}>
                {/* <Sticker> */}
                    <div className="tool-wrapper-container">
                        <div className="tool-wrapper">
                            <Sidebar />    
                            <Tool />
                        </div> 
                        <div className="gray" style={{fontSize: '0.8em', marginTop: '30px'}}>Source: Zero100.</div>
                    </div>   

                {/* </Sticker> */}
            </div>
        </ToolContext.Provider>        
    )
}

export default Scroll;
