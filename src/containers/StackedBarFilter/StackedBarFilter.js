import React, { useContext } from 'react';
import ToolContext from '../../hooks/ToolContext';
import HandleData from '../../hooks/HandleData';

const StackedBarFilter = () => {    
    const { handleStackedFilterSelect, selectedStackedFilter } = useContext(ToolContext);    
    const { stackedFilterList } = HandleData();

    const FilterLists = (props) => {
        const { listId, list, color }= props;
        return (<div onClick={ () => { handleStackedFilterSelect(listId); } } className={`label-filter__ul--list ${selectedStackedFilter === list && 'selected'} pointer font-text-bold white`} style={{padding: '7px 15px', border: `2px solid ${color}`, borderRadius: '20px', fontSize: '0.85rem', marginRight: '10px', marginBottom: '15px', backgroundColor: `${selectedStackedFilter === listId ? color : 'transparent'}`}}>{list}</div>)
    }

    const drawFilterMenu = stackedFilterList.map((el, index) => {
        let listName,
            color;

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
        <div className="industry-filter pointer" style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={{color: '#fff', fontWeight: 'bold', marginRight: '15px', marginBottom: '15px'}}>Sort By:</div>{drawFilterMenu}
        </div>
    )
}

export default StackedBarFilter;
