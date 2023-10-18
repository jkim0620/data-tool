import React, { useRef, useEffect, } from 'react';
import LineChartLogic from './LineChartLogic.js';
import HandleData from '../../hooks/HandleData.js';

const LineChart = () => {       
    const { lineData } = HandleData();

    var testData = [
        { year: 2016, media: "Digital", value: 72.2 },
        { year: 2017, media: "Digital", value: 90.39 },
        { year: 2018, media: "Digital", value: 107.3 },
        { year: 2019, media: "Digital", value: 125.75 },
        { year: 2020, media: "Digital", value: 142.23 },
        { year: 2021, media: "Digital", value: 156.43 },
        { year: 2022, media: "Digital", value: 170.48 },
        { year: 2016, media: "TV", value: 71.29 },
        { year: 2017, media: "TV", value: 70.22 },
        { year: 2018, media: "TV", value: 69.87 },
        { year: 2019, media: "TV", value: 69.17 },
        { year: 2020, media: "TV", value: 69.52 },
        { year: 2021, media: "TV", value: 68.82 },
        { year: 2022, media: "TV", value: 68.13 },
        { year: 2016, media: "Print", value: 25.49 },
        { year: 2017, media: "Print", value: 22.81 },
        { year: 2018, media: "Print", value: 20.05 },
        { year: 2019, media: "Print", value: 17.29 },
        { year: 2020, media: "Print", value: 15.19 },
        { year: 2021, media: "Print", value: 13.56 },
        { year: 2022, media: "Print", value: 12.38 },
        { year: 2016, media: "Radio", value: 14.33 },
        { year: 2017, media: "Radio", value: 14.33 },
        { year: 2018, media: "Radio", value: 14.41 },
        { year: 2019, media: "Radio", value: 14.43 },
        { year: 2020, media: "Radio", value: 14.46 },
        { year: 2021, media: "Radio", value: 14.49 },
        { year: 2022, media: "Radio", value: 14.52 },
        { year: 2016, media: "Out-of-home", value: 7.6 },
        { year: 2017, media: "Out-of-home", value: 7.75 },
        { year: 2018, media: "Out-of-home", value: 7.87 },
        { year: 2019, media: "Out-of-home", value: 7.95 },
        { year: 2020, media: "Out-of-home", value: 8.03 },
        { year: 2021, media: "Out-of-home", value: 8.11 },
        { year: 2022, media: "Out-of-home", value: 8.19 },
        { year: 2016, media: "Directories", value: 2.35 },
        { year: 2017, media: "Directories", value: 1.83 },
        { year: 2018, media: "Directories", value: 1.47 },
        { year: 2019, media: "Directories", value: 1.19 },
        { year: 2020, media: "Directories", value: 0.99 },
        { year: 2021, media: "Directories", value: 0.84 },
        { year: 2022, media: "Directories", value: 0.74 }
    ];
    
    const chartRef = useRef(),
          tooltipRef = useRef();

    const { 
        drawLineChart,
        tooltipDesc,
        handleResize,
      } = LineChartLogic();   

    useEffect(() => {      
        lineData.length > 0 && drawLineChart(lineData, chartRef, tooltipRef);
    }, [lineData])

    window.addEventListener('resize', () => {handleResize(chartRef, lineData)})

    return (
        <div className="chart chart-wrapper">
            <div className="chart__title" style={{color: '#fff', fontWeight: 'bold'}}>Line Chart</div>

            <div className="chart__container" ref={chartRef}>
            </div>  

            <div className="chart__source">
            </div>   

            <div ref={tooltipRef} className="chart__tooltip">
                <div className="">{tooltipDesc.label}</div>
            </div>                            
        </div>
  );
}

export default LineChart;