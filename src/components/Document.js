import React from 'react';
import {FiltersContext, formatDate, getHighlightedText, participantName} from '../tools';

export const Document = document => {
    const {title, signedDate, participants} = document;
    const highlightClassName = 'highlighted';

    return (
        <FiltersContext.Consumer>
            {context => (
                <div className='document'>
                    <div className={`document__head ${signedDate ? 'document__head_signed' : ''}`}>
                        <div className='document__title'>{getHighlightedText(title, context.searchText, highlightClassName)}</div>
                        {signedDate && <div className='document__signed-date'>{`Date of signing: ${formatDate(signedDate)}`}</div> }
                    </div>
                    <div className='document__participants'>
                        {participants.map(participant => (
                            <div key={participant.id} className={`document__participant ${participant.signedDate ? 'document__participant_signed' : ''}`}>
                                {getHighlightedText(participantName(participant), context.searchText, highlightClassName)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </FiltersContext.Consumer>
    )
};
