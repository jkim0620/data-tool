import React, { useEffect, useRef }  from 'react';
import Z100Logo from '../../assets/img/Z100-circle-logo-white.svg';
import scrollDownIcon from '../../assets/img/scroll-down-arrow.svg';
import HandleData from '../../hooks/HandleData';

const Intro = () => {
    const { deviceType } = HandleData();

    const scrollRef = useRef();

    useEffect(() => {
        // ctaRef.current.className = 'hide';
        window.addEventListener('scroll', () => scrollRef.current.className = 'hide' );
    }, []);

    return (
        <div style={{display: 'flex', alignItems: 'center', height: '100vh'}}>
            <div className="header-container">
                <div className="white font-text-reg header-container__logo"><a className="pointer" target="_blank" href="https://zero100.com/"><img src={Z100Logo} /></a></div>

                <div className="intro-wrapper">
                    <div className="intro-wrapper__titlebox">
                        <p className="ultraLight font-text-bold intro-wrapper__titlebox--label">DATA TOOL</p>            
                        <h1 className="white intro-wrapper__titlebox--title">Measuring Supply Chain Credibility</h1>
                    </div>
                    <div className="intro-wrapper__textbox introText-box">
                        <p>To help our members better explore the data featured in our flagship report, <a className="ultraLight font-text-bold" target="_blank" href="https://zero100.com/wp-content/uploads/2022/01/Zero100-Gambit-January-2022.pdf">The Zero100 Gambit: Opening Moves to Capture Supply Chain Credibility</a>, we've developed a visualization tool that allows you to explore top-line data {deviceType === 'Desktop' && <br />}by industry.</p>
                        <p>This self-guided tool provides accompanying commentary {deviceType === 'Desktop' && <br />}to highlight:</p>

                        <div className="flex flex-v-center">
                            <div className="ultra-light-sqaure-box tac font-text-bold">1</div>
                            <p>Defining characteristics of a given industry</p>
                        </div>
                        <div className="flex flex-v-center">
                            <div className="ultra-light-sqaure-box tac font-text-bold">2</div>
                            <p>Hallmark strengths and weaknesses of representative brands, in aggregate</p>
                        </div>
                    </div>

                    <div ref={scrollRef} className="tac scroll-down-cta" style={{marginTop: '40px'}}><p className="white font-text-bold" style={{marginBottom: '5px',}}>Scroll</p><img src={scrollDownIcon} /></div>
                </div>
            </div>
        </div>
    )
}

export default Intro;
