import './App.css';
import Intro from './containers/Intro/Intro';
// import Tool from './containers/Tool/Tool';
import Scroll from './containers/Scroll/Scroll';

import React from 'react';

function App() {
  	return (
		
		<div className="bg-black">
			<div className="supply-chain-interactive-conainer">
				<Intro />
				<Scroll />
				{/* <Tool /> */}
			</div>
		</div>
				
  	);
}

export default App;
