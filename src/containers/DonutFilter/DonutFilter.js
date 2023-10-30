import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';

const DonutFilter = (props) => {
    // const { listDirection } = props;

    const { selectedDonutFilter, handleDonutFilter } = useContext(ToolContext);    
    // const { labelList, deviceType,  } = HandleData();

    // const toggleFilter = () => {
    //     setShowFilterMenu(!showFilterMenu);
    // } 

    return (
        <div className="industry-filter pointer" style={{marginBottom: '25px', display: 'flex', width: 'auto'}}>
            {/* <div className="industry-filter__label font-text-bold white">{ selectedDonutFilter === 'location' ? 'Location' : 'Industry' }</div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{maxHeight: '500px', overflow: 'scroll', marginTop: 0, marginBottom: 0 }}>
                <li onClick={ () => { handleDonutFilter('location', true); } } className={`label-filter__ul--list ${selectedDonutFilter === 'location' && 'selected'} pointer font-text-bold gray`} style={{padding: '12px 7px'}}>Location</li>
                <li onClick={ () => { handleDonutFilter('industry', true); } } className={`label-filter__ul--list ${selectedDonutFilter === 'industry' && 'selected'} pointer font-text-bold gray`} style={{padding: '12px 7px'}}>Industry</li>
            </ul> */}
            <div onClick={ () => { handleDonutFilter('country', true); } } className={`label-filter__ul--list ${selectedDonutFilter === 'country' && 'selected'} pointer font-text-bold gray`} style={{color:'#fff', fontSize: '0.9rem', width: '120px', padding: '5px 12px', border: `solid ${selectedDonutFilter === 'country' ? '#695cff' : '#444'} 2px`, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', textAlign: 'center', backgroundColor: `${selectedDonutFilter === 'country' ? '#695cff' : 'transparent'}`, marginRight: '-1px'}}>By Location</div>
            <div onClick={ () => { handleDonutFilter('industry', true); } } className={`label-filter__ul--list ${selectedDonutFilter === 'industry' && 'selected'} pointer font-text-bold gray`} style={{color:'#fff', fontSize: '0.9rem', width: '120px', padding: '5px 12px', border: `solid ${selectedDonutFilter === 'industry' ? '#695cff' : '#444'} 2px`, borderTopRightRadius: '20px', borderBottomRightRadius: '20px', textAlign: 'center', backgroundColor: `${selectedDonutFilter === 'industry' ? '#695cff' : 'transparent'}`}}>By Industry</div>
        </div>
    )
}

export default DonutFilter;
