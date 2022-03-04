import React from 'react';
import './App.css';
import Intro from './containers/Intro/Intro';
import Scroll from './containers/Scroll/Scroll';
import FlipIcon from './assets/img/icon-phone-flip.svg';
import HandleData from './hooks/HandleData';
import AlertIcon from './assets/img/icon-alert.png'; 

function App() {
	const {deviceType} = HandleData();
  	return (
		
		<div className="bg-black">
			{deviceType === 'Desktop' ?
			<React.Fragment>
				<div className="alert-modal">
					<div className="white font-tex-bold" style={{fontSize: '55px'}}><img style={{width: '150px'}} src={FlipIcon} /></div>
				</div>
				<div className="supply-chain-interactive-container">			
					<Intro />
					<Scroll />
				</div>
			</React.Fragment>
			:
			<div className="flex flex-v-center" style={{background: '#000', minHeight: '100vh', width: '100%', color: '#fff',}}>
				<div style={{margin: '0 auto'}}>
					<div className="tac" syle={{width: '100%'}}>
						<img style={{width: '50px', margin: '0 auto'}} src={AlertIcon} />
					</div>
					<p>Please view on desktop to access this tool</p>
				</div>
			</div>
			}
			
		</div>
				
  	);
}

export default App;
