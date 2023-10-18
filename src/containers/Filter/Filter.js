import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';
//import Arrow from  '../../assets/img/arrow_down.svg';

const Filter = (props) => {
    const { listDirection } = props;

    const { selectedLabel, handleLabelSelect, } = useContext(ToolContext);    
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
        return (<li onClick={ () => { handleLabelSelect(label); } } className={`label-filter__ul--list ${selectedLabel === label && 'selected'} pointer font-text-bold gray`} style={{padding: '5px 3px'}}>{label}</li>)
        // return (<li className={`label-filter__ul--list pointer font-text-bold gray`} style={{padding: '5px 3px'}}>{label}</li>)
    }

    const toggleFilter = () => {
        setShowFilterMenu(!showFilterMenu);
    }

    const drawFilterMenu = labelList.map((el, index) => {
        return (<FilterLists key={index} label={el} />)
    });  

    return (
        <div ref={filterRef} className="industry-filter pointer" style={{width: '200px'}} onClick={toggleFilter}>
            <div className="industry-filter__label font-text-bold white">Select</div>
            <ul className={`industry-filter__ul ${showFilterMenu ? 'block' : 'hide'}`} style={{top: `${listDirection === 'up' ? deviceType === 'Mobile' ? '-264px' : '-424px' : '18px'}`, maxHeight: '500px', overflow: 'scroll' }}>
                {drawFilterMenu}
            </ul>
        </div>
    )
}

export default Filter;
