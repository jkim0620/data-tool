import {useState, useEffect,} from 'react';
import * as d3 from 'd3';
import bubbleData from '../assets/data/supply-chain-credibility-bubble-data.csv';
import heatmapData from '../assets/data/supply-chain-credibility-heatmap-data.csv';

const HandleData = () => {
    const [selectedView, setSelectedView] = useState('bubble'),
          [selectedIndustry, setSelectedIndustry] = useState('Select an Industry'),
          [filterList, setFilterList] = useState([]),                    
          [allData, setAllData] = useState([]),
          [industryData, setIndustryData] = useState([]);

    const [bubbleDataStorage, setBubbleDataStorage] = useState([]),
          [heatmapDataStorage, setHeatmapDataStorage] = useState([]);    

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
        d3.csv(bubbleData)
            .then(data => {
                // store full bubble data here
                setBubbleDataStorage(data);                

                // filter data by 'all industry average'
                const filterData = data.filter(d => {
                    return d.industry === 'All Industry Average';
                });
                
                // store avg industry scores here
                setAllData(filterData);
            });

        d3.csv(heatmapData)
            .then(data => {
                // store full heatmap data here
                setHeatmapDataStorage(data);
                
                 // get the list of industry to create filter menu lists
                 const industryArr = data.map(d => {
                    return d.industry;
                });                
                let filterIndustry = Array.from(new Set(industryArr));
                setFilterList(filterIndustry);
            })    
        
    }, [])

    useEffect(() => {
        getData(selectedIndustry, selectedView);
    }, [selectedView])

    useEffect(() => {     
        getData(selectedIndustry, selectedView);
    }, [selectedIndustry]);

    // function that is called when industry selection changes
    const getData = (whichIndustry, view) => {
        const whichData = view === 'bubble' ? bubbleDataStorage : heatmapDataStorage;
        const filterData = whichData.filter(d => {
            return d.industry === whichIndustry;
        });
        setIndustryData(filterData);
    }

    // handle industry selection on click of the filter
    const handleIndustrySelect = (val) => {
        setSelectedIndustry(val)
    } 

    const handleViewSelect = (val) => {
        setSelectedView(val);
    }    

    return { selectedIndustry, 
             handleIndustrySelect, 
             selectedView,
             handleViewSelect,
             filterList, 
             getData, 
             allData, 
             industryData,
             deviceType,
            };
}

export default HandleData;
