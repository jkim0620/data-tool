import {useState, useEffect,} from 'react';
import * as d3 from 'd3';
import thisData from '../assets/data/chart_data_sample_2.csv';
import dataSample2 from '../assets/data/line_data_sample.csv';
import scatterDataSample from '../assets/data/scatter_data_sample.csv';
import stackedBarChartDataSample from '../assets/data/stacked_bar_chart_data_sample.csv';
import donutChartDataSample from '../assets/data/donut_chart_data_sample.csv';
import donutChartDataSample2 from '../assets/data/donut_chart_data_sample_2.csv';

const HandleData = () => {
    const [chartData, setChartData] = useState([]),
          [lineData, setLineData] = useState([]),
          [scatterData, setScatterData] = useState([]),
          [stackedBarChartData, setStackedBarChartData] = useState([]),
          [donutChartData, setDonutChartData] = useState([]);
    
    // Scatter Plot Chart      
    const [labelList, setLabelList] = useState([]),
          [selectedLabel, setSelectedLabel] = useState([]);          

    // Stacked Horizontal Bar Chart      
    const [stackedFilterList, setStackedFilterList] = useState([]),
          [selectedStackedFilter, setSelectedStackedFilter] = useState('full');    
    
    // Donut Chart
    const [selectedDonutFilter, setSelectedDonutFilter] = useState('country'),
          [selectedDonutFilter2, setSelectedDonutFilter2] = useState('all');      

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

    // get Donut Chart data sample
    useEffect(() => {
        d3.csv(donutChartDataSample)
            .then(data => {    
                setDonutChartData(data);                
            });          
    }, []) 

    useEffect(() => {
        let dataSample =  selectedDonutFilter === 'country' ? donutChartDataSample : donutChartDataSample2;
        d3.csv(dataSample)
            .then(data => {    
                setDonutChartData(data); 
                handleDonutFilter('all');  
            })
    }, [selectedDonutFilter])

    // Scatter Plot Chart: handle filter selection on click of the filter
    const handleLabelSelect = (val) => {
        setSelectedLabel(selectedLabel => [...selectedLabel, val])
    } 

    // Stacked Horizontal Bar Chart: handle stacked filter selection on click of the filter
    const handleStackedFilterSelect = (val) => {
        setSelectedStackedFilter(val)
    } 

    const handleDonutFilter = (val, isFirstFilter) => {
        // isFirstFilter && setSelectedDonutFilter2('all');
        isFirstFilter ? setSelectedDonutFilter(val) : setSelectedDonutFilter2(val);  
    }

    const textWrap = (text, width) => {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = 0, //parseFloat(text.attr("dy")),
                tspan = text.text(null)
                            .append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                .text(word);
                }
            }
        });
    }

    return { 
            chartData,
            lineData,
            scatterData,
            stackedBarChartData,
            donutChartData,
            selectedDonutFilter,
            selectedDonutFilter2,
            handleDonutFilter,
            stackedFilterList,
            handleStackedFilterSelect,
            selectedStackedFilter,
            labelList,
            handleLabelSelect,
            // selectedLabelData,
            selectedLabel,
            deviceType,
            textWrap
        };
}

export default HandleData;
