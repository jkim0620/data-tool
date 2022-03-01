import './App.css';
import Intro from './containers/Intro/Intro';
// import Tool from './containers/Tool/Tool';
import Scroll from './containers/Scroll/Scroll';
import FlipIcon from './assets/img/icon-phone-flip.svg';

import React from 'react';

function App() {
  	return (
		
		<div className="bg-black">
				<div className="alert-modal">
					<div className="white font-tex-bold" style={{fontSize: '55px'}}><img style={{width: '150px'}} src={FlipIcon} /></div>
				</div>
			<div className="supply-chain-interactive-container">			
				<Intro />
				<Scroll />
			</div>
		</div>
				
  	);
}

export default App;
