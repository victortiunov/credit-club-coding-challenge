import React from 'react';

export const formatDate = date => date.toLocaleString('ru', {day: '2-digit', month: '2-digit', year: 'numeric'});

export const participantName = participant => `${participant.firstName} ${participant.lastName}`;

export const filterDocuments = (documents, filterUsers, currentUserId, searchText, signedBy) => {
    let filteredDocuments = filterByUsers(documents, filterUsers, currentUserId);
    filteredDocuments = filterBySigned(filteredDocuments, signedBy);
    return filterByText(filteredDocuments, searchText);
};

const filterByUsers = (documents, filterUsers, currentUserId) => {
    if (filterUsers === FILTER_USERS.ALL) {
        return documents;
    }
    return documents.filter(document => !!document.participants.find(participant => participant.id === currentUserId));
};

const filterByText = (documents, searchText) => documents.filter(document => {
    const regExp = new RegExp(searchText, 'i');
    if (document.title.match(regExp) !== null) {
        return true;
    }

    for (const participant of document.participants) {
        if (participantName(participant).match(regExp) !== null) {
            return true;
        }
    }

    return false;
});

const filterBySigned = (documents, signedBy) => {
    if (!signedBy) {
        return documents;
    }
    return documents.filter(document => !!document.participants.find(participant => participant.id === signedBy && !!participant.signedDate))
};

export const getHighlightedText = (original, searchText, className) => {
    return original;
    /*
    const founds = [...original.matchAll(new RegExp(searchText, 'ig'))];
    if (founds.length === 0) {
        return original;
    }

    const elements = [];
    let currentIndex = 0;
    founds.forEach((found, idx) => {
        elements.push(<span key={`normal-text-${idx}`}>{original.substring(currentIndex, found.index)}</span>);
        elements.push(<span key={`highlighted-text-${idx}`} className={className}>{original.substring(found.index, found.index + searchText.length)}</span>);
        currentIndex = found.index + searchText.length;
    });
    elements.push(<span key='last-normal-text'>{original.substring(currentIndex)}</span>);

    return (
        <React.Fragment>
            {elements}
        </React.Fragment>
    );
     */
};

const FILTER_USERS = Object.freeze({
    ALL: 'All',
    ME: 'By me',
});

const FiltersContext = React.createContext({
    filterUsers: FILTER_USERS.ALL,
    setFilterUsers: () => {},
    searchText: '',
    setSearchText: () => {},
    participants: [],
    signedBy: '',
    setSignedBy: () => {},
});

export {FILTER_USERS, FiltersContext};
