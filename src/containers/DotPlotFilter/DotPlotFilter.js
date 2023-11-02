import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';

const DotPlotFilter = (props) => {
    const { selectedDotPlotFilter, handleDotPlotFilter, dotPlotFilterList, } = useContext(ToolContext);    
    const { labelList, deviceType,  } = HandleData();
    
    const filterRef = useRef();
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
            if (showFilterMenu && filterRef.current && !filterRef.current.contains(e.target)) {
                setShowFilterMenu(false)
            }
        }
    
        document.addEventListener('mousedown', checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [showFilterMenu])

    const FilterLists = (props) => {
        const { label }= props;
        return (<li onClick={ () => { handleDotPlotFilter(label); } } style={{padding: '12px 5px', color: '#fff', fontSize: '0.9rem'}}>{label}</li>)
    }

    const toggleFilter = () => {
        setShowFilterMenu(!showFilterMenu);
    } 

    const drawFilterMenu = dotPlotFilterList.map((el, index) => {
        return (<FilterLists key={index} label={el} />)
    });

    return (
        <div ref={filterRef} className="industry-filter pointer" style={{width: '280px'}} onClick={toggleFilter}>
            <div className="industry-filter__label font-text-bold white" style={{fontSize: '0.9rem', cursor: 'pointer'}}>Select Prioritizing Categories</div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{maxHeight: '500px', overflow: 'scroll', marginTop: 0, marginBottom: 0 }}>
                {drawFilterMenu}
            </ul>
        </div>
    )
}

export default DotPlotFilter;
