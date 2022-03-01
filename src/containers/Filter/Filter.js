import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';
import Arrow from  '../../assets/img/arrow_down.svg';

const Filter = () => {
    const { selectedIndustry, handleIndustrySelect, } = useContext(ToolContext);    
    const { filterList, deviceType } = HandleData();
    
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
        const { industry }= props;
        return (<li onClick={ () => { handleIndustrySelect(industry); } } className={`industry-filter__ul--list ${selectedIndustry === industry && 'selected'} pointer font-text-bold gray`}>{industry}</li>)
    }

    const toggleFilter = () => {
        setShowFilterMenu(!showFilterMenu);
    }

    const drawFilterMenu = filterList.map((el, index) => {
        return (<FilterLists key={index} industry={el} />)
    });  


    return (
        <div ref={filterRef} className="industry-filter pointer" onClick={toggleFilter}>
            <div className="industry-filter__label font-text-bold white">{selectedIndustry} <img className="industry-filter__arrow" style={{ transform: `${showFilterMenu ? 'rotate(180deg)' : 'rotate(0deg)'}` }} src={Arrow} /></div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{top: `${selectedIndustry === 'Select an Industry' ? deviceType === 'Mobile' ? '-264px' : '-424px' : '18px'}` }}>
                {drawFilterMenu}
            </ul>
        </div>
    )
}

export default Filter;
