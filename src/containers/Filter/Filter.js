import React, { useState, useContext, useEffect } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';
import Arrow from  '../../assets/img/arrow_down.svg';

const Filter = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false);          
    const {selectedIndustry, handleIndustrySelect, } = useContext(ToolContext);    
    const {filterList} = HandleData();

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
        <div className="industry-filter pointer" onClick={toggleFilter}>
            <div className="industry-filter__label font-text-bold white">{selectedIndustry} <img className="industry-filter__arrow" style={{ transform: `${showFilterMenu ? 'rotate(180deg)' : 'rotate(0deg)'}` }} src={Arrow} /></div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{ top: `${selectedIndustry === 'Select an Industry' ? '-430px' : '19px'}` }}>
                {drawFilterMenu}
            </ul>
        </div>
    )
}

export default Filter;
