import React, {useEffect, useState} from 'react';
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {Document} from './Document';
import {FILTER_USERS, filterDocuments, FiltersContext} from '../tools';
import {Filters} from './Filters';

export const DocumentsList = data => {
    const {documents, participants, currentUserId} = data;
    const [filteredDocuments, setFilteredDocuments] = useState(documents);
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

    useEffect(() => {
        const filtered = filterDocuments(documents, filterUsers, currentUserId, searchText, signedBy);
        setFilteredDocuments(filtered);
    }, [documents, currentUserId, filterUsers, searchText, signedBy]);

    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100,
    });

    const renderRow = ({index, key, style, parent}) => {
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <Document document={filteredDocuments[index]} style={style} />;
            </CellMeasurer>
        );
    };

    return (
        <FiltersContext.Provider value={contextValue}>
            <div className='documents' style={{height: documentsHeight}}>
                <Filters />
                <div className='documents-list'>
                    {filteredDocuments.length > 0 ?
                        <AutoSizer>
                            {({width, height}) => <List
                                width={width}
                                height={height}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                rowRenderer={renderRow}
                                rowCount={filteredDocuments.length}
                                overscanRowCount={5}
                            />}
                        </AutoSizer> :
                        <div className='documents-list-no-data'>No data found...</div>
                    }
                </div>
            </div>
        </FiltersContext.Provider>
    );
};
