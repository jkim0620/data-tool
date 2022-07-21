import React, { useEffect, useRef, useState, useMemo }  from 'react';
import './App.css';
import Intro from './containers/Intro/Intro';
import ToolWrapper from './containers/ToolWrapper/ToolWrapper';
import AlertIcon from './assets/img/warning-icon-01.svg'
import HandleFunction from './hooks/HandleFunction';

function App() {
	const {deviceType, useIsInViewport} = HandleFunction();	

	const toolRef = useRef();

	const isToolInViewport = useIsInViewport(toolRef)

  	return (		
		<div className="bg-charcoal">
			{/* {deviceType === 'Mobile' &&
			<div className={`alert-modal`}>
				<div className="white font-text-bold tac"><img style={{width: '100px'}} src={AlertIcon} /><div><p className="font-text-bold">Mobile experience coming soon</p></div></div>
			</div>
			} */}
			<div className="">			
				<Intro ref={toolRef} isToolInViewport={isToolInViewport} />
				<ToolWrapper ref={toolRef} />
			</div>				
		</div>
				
  	);
}

export default App;
