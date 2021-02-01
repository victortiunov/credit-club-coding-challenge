import React from 'react';
import {FilterByUsers} from './FilterByUsers';
import {FilterByText} from './FilterByText';
import {FilterBySigned} from './FilterBySigned';

export const Filters = () => {
    return (
        <div className='document-filters'>
            <FilterByUsers />
            <FilterByText />
            <FilterBySigned />
        </div>

    )
};
