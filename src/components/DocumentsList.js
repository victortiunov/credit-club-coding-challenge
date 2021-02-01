import React, {useEffect, useState} from 'react';
import {Document} from './Document';
import {FILTER_USERS, filterDocuments, FiltersContext} from '../tools';
import {Filters} from './Filters';

export const DocumentsList = data => {
    const {documents, participants, currentUserId} = data;
    const [filterUsers, setFilterUsers] = useState(FILTER_USERS.ALL);
    const [searchText, setSearchText] = useState('');
    const [signedBy, setSignedBy] = useState('');
    const [documentsHeight, setDocumentsHeight] = useState(window.innerHeight);

    const contextValue = {
        filterUsers,
        setFilterUsers,
        searchText,
        setSearchText,
        participants,
        signedBy,
        setSignedBy,
    };

    const updateSize = () => setDocumentsHeight(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <FiltersContext.Provider value={contextValue}>
            <div className='documents' style={{height: documentsHeight}}>
                <Filters />
                <ul className='documents-list'>
                    {filterDocuments(documents, filterUsers, currentUserId, searchText, signedBy).slice(0, 20).map(document => <Document key={document.id} {...document} />)}
                </ul>
            </div>
        </FiltersContext.Provider>
    );
};
