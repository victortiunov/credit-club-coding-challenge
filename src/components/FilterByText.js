import React from 'react';
import {FiltersContext} from '../tools';

export const FilterByText = () => {
    return (
        <FiltersContext.Consumer>
            {context => (
                <input className='document-filters__search-text'
                       type='search'
                       value={context.searchText}
                       placeholder='Search...'
                       onChange={e => context.setSearchText(e.target.value)}
                />
            )}
        </FiltersContext.Consumer>
    );
};
