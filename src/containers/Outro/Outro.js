import React from 'react';

const Outro = () => {     
    return (
        <React.Fragment>
            <div className="max-width-wrapper">
                <div className="section-wrapper">
                    <div className="scroll-board">
                        <div className="scroll-board__chart" style={{justifyContent: 'center', maxWidth: '550px', margin: '0 auto', marginTop: '-150px'}}>
                            <div className="tac">
                                <h1>Dive Deeper</h1>
                                <div className="white">See our <a className="ultraLight font-text-bold pointer" href="https://zero100.com/signal/" style={{textDecoration: 'underline'}} target="_blank">latest content</a> for our further exploration of topics featured on The Lens <br />-or-<br />Reach out to your Engagement Manager for an Analyst briefing on the wider survey findings.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
        </React.Fragment>
  );
}

export default Outro;