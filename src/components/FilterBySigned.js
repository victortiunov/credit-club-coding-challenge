import React from 'react';
import {FiltersContext, participantName} from '../tools';

export const FilterBySigned = () => {
    return (
        <FiltersContext.Consumer>
            {context => (
                <div>
                    Signed:
                    <select className='document-filters__signed-select'
                            value={context.signedBy}
                            onChange={e => context.setSignedBy(e.target.value)}
                    >
                        <option value=''>Select</option>
                        {context.participants.map(participant => (
                            <option key={participant.id} value={participant.id}>
                                {participantName(participant)}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </FiltersContext.Consumer>
    );
};
