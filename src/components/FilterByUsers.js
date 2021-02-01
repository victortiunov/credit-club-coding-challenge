import React from 'react';
import {FILTER_USERS, FiltersContext} from '../tools';

export const FilterByUsers = () => {
    return (
        <FiltersContext.Consumer>
            {context => (
                <div className='document-filters__users'>
                    {Object.keys(FILTER_USERS).map(key => (
                        <div key={`filter-user-${key}`}
                             className={`document-filters__filter-user ${context.filterUsers === FILTER_USERS[key] ? 'document-filters__filter-user_active' : ''}`}
                             onClick={() => context.setFilterUsers(FILTER_USERS[key])}
                        >
                            {FILTER_USERS[key]}
                        </div>
                    ))}
                </div>
            )}
        </FiltersContext.Consumer>
    );
};
