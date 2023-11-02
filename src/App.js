import React, { useRef, useContext }  from 'react';
import './App.css';
import BarChartH from './containers/BarChartH/BarChartH';
import BarChartV from './containers/BarChartV/BarChartV';
import LineChart from './containers/LineChart/LineChart';
import ScatterPlotChart from './containers/ScatterPlotChart/ScatterPlotChart';
import StackedBarChartH from './containers/StackedBarChartH/StackedBarChartH';
import DonutChart from './containers/DonutChart/DonutChart';
import DotPlotChart from './containers/DotPlotChart/DotPlotChart';
import ToolContext from './hooks/ToolContext';
import HandleData from './hooks/HandleData';

function App() {
	const toolRef = useRef();

	const { selectedLabel, 
			handleLabelSelect, 
			handleStackedFilterSelect, 
			selectedStackedFilter,
			donutChartData,
			selectedDonutFilter,
			selectedDonutFilter2,
			handleDonutFilter,
			dotPlotChartData,
			handleDotPlotFilter,
            selectedDotPlotFilter,
            selectedDotPlotFilter2,
			dotPlotFilterList,
		  } = HandleData();

  	return (		
		<div className="bg-black">
			<ToolContext.Provider 
				value={{ selectedLabel, 
						handleLabelSelect, 
						handleStackedFilterSelect, 
						selectedStackedFilter,
						donutChartData,
						selectedDonutFilter, 
						selectedDonutFilter2, 
						handleDonutFilter,
						dotPlotChartData,
						handleDotPlotFilter,
						selectedDotPlotFilter,
						selectedDotPlotFilter2,
						dotPlotFilterList, }}
			>	
				<DotPlotChart ref={toolRef} />
				{/* <DonutChart ref={toolRef} / > */}
				{/* <StackedBarChartH ref={toolRef} / > */}
				{/* <ScatterPlotChart ref={toolRef} / > */}
				{/* <BarChartV ref={toolRef} /> */}
				{/* <BarChartH ref={toolRef} /> */}
				{/* <LineChart ref={toolRef} /> */}
			</ToolContext.Provider>
		</div>				
  	);
}

export default App;
