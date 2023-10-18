import React, { useState, useContext, useEffect, useRef } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';

const StackedBarFilter = (props) => {
    const { listDirection } = props;

    const { handleStackedFilterSelect, selectedStackedFilter } = useContext(ToolContext);    
    const { stackedFilterList, deviceType,  } = HandleData();
    
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

      useEffect(() => {
        console.log('selected filter', selectedStackedFilter)
      }, [selectedStackedFilter])


    const FilterLists = (props) => {
        const { listId, list, color }= props;
        return (<div onClick={ () => { handleStackedFilterSelect(listId); } } className={`label-filter__ul--list ${selectedStackedFilter === list && 'selected'} pointer font-text-bold white`} style={{padding: '7px 15px', border: `2px solid ${color}`, borderRadius: '20px', fontSize: '0.85rem', marginRight: '10px', backgroundColor: `${selectedStackedFilter === listId ? color : 'transparent'}`}}>{list}</div>)
        // return (<li className={`label-filter__ul--list pointer font-text-bold gray`} style={{padding: '5px 3px'}}>{label}</li>)
    }

    const toggleFilter = () => {
        setShowFilterMenu(!showFilterMenu);
    }

    const drawFilterMenu = stackedFilterList.map((el, index) => {
        let listName,
            color;
            // .range(['#444','#e7045e','#ff9b00', '#00d885', '#00aef4'])
        switch(el) {
            case 'not_investing':
                listName = 'Not Investing';
                color = '#444';
                break;
            case 'investing':
                listName = 'Investing, but not Piloting';
                color = '#e7045e';
                break;
            case 'piloting':
                listName = 'Piloting';
                color = '#ff9b00';
                break;
            case 'pilot_to_scaling':
                listName = 'Moving from Pilot to Scaling';
                color = '#00d885';
                break;                
            case 'fully_deployed':
                listName = 'Fully Deployed';
                color = '#00aef4';
                break;  
            default:
                listName = 'Full View';
                color = '#695cff';
                break;                  
        }
        return (<FilterLists key={index} listId={el} list={listName} color={color} />)
    });  

    return (
        <div ref={filterRef} className="industry-filter pointer" style={{display: 'flex', alignItems: 'center'}} onClick={toggleFilter}>
            <div style={{color: '#fff', fontWeight: 'bold', marginRight: '15px'}}>Sort By:</div>{drawFilterMenu}
        </div>
    )
}

export default StackedBarFilter;
