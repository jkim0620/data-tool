import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';

const DonutFilter2 = (props) => {
    // const { listDirection } = props;

    const { selectedDonutFilter2, handleDonutFilter } = useContext(ToolContext);    
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

    const toggleFilter = () => {
        setShowFilterMenu(!showFilterMenu);
    } 

    return (
        <div ref={filterRef} className="industry-filter pointer" style={{width: '150px'}} onClick={toggleFilter}>
            <div className="industry-filter__label font-text-bold white" style={{fontSize: '0.9rem'}}>{ selectedDonutFilter2 === 'all' ? 'All Respondents' : 'Senior Leadership' }</div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{maxHeight: '500px', overflow: 'scroll', marginTop: 0, marginBottom: 0 }}>
                <li onClick={ () => { handleDonutFilter('all'); } } className={`label-filter__ul--list ${selectedDonutFilter2 === 'all' && 'selected'} pointer font-text-bold gray`} style={{padding: '12px 7px', fontSize: '0.9rem'}}>All Respondent</li>
                <li onClick={ () => { handleDonutFilter('senior'); } } className={`label-filter__ul--list ${selectedDonutFilter2 === 'senior' && 'selected'} pointer font-text-bold gray`} style={{padding: '12px 7px', fontSize: '0.9rem'}}>Senior Leadership</li>
            </ul>
        </div>
    )
}

export default DonutFilter2;
