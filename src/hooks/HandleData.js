import {useState, useEffect,} from 'react';
import * as d3 from 'd3';
import thisData from '../assets/data/chart_data_sample_2.csv';
import dataSample2 from '../assets/data/line_data_sample.csv';
import scatterDataSample from '../assets/data/scatter_data_sample.csv';
import stackedBarChartDataSample from '../assets/data/stacked_bar_chart_data_sample.csv';

const HandleData = () => {
    const [chartData, setChartData] = useState([]),
          [lineData, setLineData] = useState([]),
          [scatterData, setScatterData] = useState([]),
          [stackedBarChartData, setStackedBarChartData] = useState([]);
    
    const [labelList, setLabelList] = useState([]),
          [stackedFilterList, setStackedFilterList] = useState([]);

    const [selectedLabel, setSelectedLabel] = useState([]),
          [selectedStackedFilter, setSelectedStackedFilter] = useState('full');

    const [deviceType, setDeviceType] = useState("");

    useEffect(() => {
        if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
            navigator.userAgent
        )
        ) {
        setDeviceType("Mobile");
        } else {
        setDeviceType("Desktop");
        }
    }, []);

    useEffect(() => {
        d3.csv(thisData)
            .then(data => {
                // sort hight to low
                data.sort((a, b) => b.value - a.value );
               
                setChartData(data);                
            });  
        
    }, []) 
    
    useEffect(() => {
        d3.csv(dataSample2)
            .then(data => {
                setLineData(data);                
            });  
        
    }, []) 

    // get Scatter Chart data sample
    useEffect(() => {
        d3.csv(scatterDataSample)
            .then(data => {    
                // get the list of industry to create filter menu lists
                const labelArr = data.map(d => {
                    return d.Label;
                });                
               
                let filterLabels = Array.from(new Set(labelArr));
                setLabelList(filterLabels);

                setScatterData(data);                
            });  
        
    }, [])     

    // get Stacked Bar Chart data sample
    useEffect(() => {
        d3.csv(stackedBarChartDataSample)
            .then(data => {    
                // get the column list create filter menu lists                
                let filterList = data.columns.slice(1);  
                filterList.unshift('full');              
                setStackedFilterList(filterList);

                setStackedBarChartData(data);                
            });          
    }, []) 

    // handle filter selection on click of the filter
    const handleLabelSelect = (val) => {
        setSelectedLabel(selectedLabel => [...selectedLabel, val])
    } 

    // handle stacked filter selection on click of the filter
    const handleStackedFilterSelect = (val) => {
        setSelectedStackedFilter(val)
    } 

    return { 
            chartData,
            lineData,
            scatterData,
            stackedBarChartData,
            stackedFilterList,
            handleStackedFilterSelect,
            selectedStackedFilter,
            labelList,
            handleLabelSelect,
            // selectedLabelData,
            selectedLabel,
            deviceType,
        };
}

export default HandleData;
