import React from 'react';
import Z100Logo from '../../assets/img/Z100-circle-logo-white.svg';
import TheLens from '../../assets/img/interactive-intro-lens-02.svg';
import ChartImg from '../../assets/img/interactive-intro-chart-01.svg';
import scrollDownIcon from '../../assets/img/scroll-down-arrow.svg';

const Intro = React.forwardRef((props, ref) => {
    const {isToolInViewport} = props;

    return (
        <React.Fragment>
            <div className="bg-black" style={{display: 'flex', justifyContent: 'center'}}>
                <div className="max-width-wrapper white">
                    <div className="intro-section section-wrapper">
                        <div className="intro-section__logo"><a className="pointer" target="_blank" href="https://zero100.com/"><img src={Z100Logo} /></a></div>
                        <h1 className="tac intro-section__title">Zero100 Supply Chains and the Collision of <span className="yolk">Digital</span>, <span className="emerald">ESG</span> & <span className="ultraLight">People</span></h1>

                        <div className="intro-section__textbox">
                            <p>In Q2 2022, we asked nearly 300 supply chain professionals over 40 questions to identify what is driving operations leaders to make unprecedented bets on:</p>
                            <div className="intro-section__imgbox">
                                <img className="lens-img" src={TheLens} />
                            </div>
                            <p>Sorting through the resulting 10,000 data points, we pinpointed 3 key questions for operations leaders:</p>
                            <div style={{padding: '30px 0'}}>
                               <div className="flex"><p><span style={{marginRight: '15px'}} className="font-text-bold yolk">1</span></p> <p>Do you have the right <span className="font-text-bold yolk">tech tools</span>?</p></div>
                                <div className="flex"><p><span style={{marginRight: '15px'}} className="font-text-bold emerald">2</span></p> <p>Do you have the right <span className="font-text-bold emerald">ESG priorities</span>?</p></div>
                                <div className="flex"><p><span style={{marginRight: '15px'}} className="font-text-bold ultraLight">3</span></p> <p>Do you have the right <span className="font-text-bold ultraLight">people strategies</span>?</p></div>
                            </div>
                            <p style={{paddingBottom: '20px'}}>Consistently, the answers to these questions changed dramatically based on a single filtering criterion: <span className="italic">How</span> aggressive is your company setting their net zero carbon targets?</p>
                            <p>Our survey revealed nearly <span className="font-text-bold emerald">1-in-5 organizations are setting aggressive targets for 2030 or before</span>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-charcoal" style={{display: 'flex', justifyContent: 'center'}}>
                <div className="max-width-wrapper white">
                    <div className="intro-section section-wrapper">
                        <div className="intro-section__textbox">
                            <p style={{paddingBottom: '30px', maxWidth: '300px', margin: '0 auto'}} className="tac font-text-bold">When does your company plan to reach net zero carbon?</p>                            
                        </div>

                        <img src={ChartImg} className="intro-section__chartImg" />
                    </div>
                </div>
            </div>

            <div className={`scroll-cta font-text-bold tac ${isToolInViewport ? 'hide' : 'block'}`} style={{fontSize: '0.9em'}}><div className="font-text-bold ultraLight" style={{fontSize: '1.1em', marginBottom: '10px'}}>Scroll</div><img className="bounce scroll-arrow" src={scrollDownIcon} /></div>       
            <div className="bg-black"><div className={`scroll-cta-mobile font-text-bold tac`} style={{fontSize: '0.9em'}}><div className="font-text-bold ultraLight" style={{fontSize: '1.1em', marginBottom: '10px'}}>Scroll</div><img className="bounce scroll-arrow" src={scrollDownIcon} /></div></div>
        </React.Fragment>
    )
})

export default Intro;
