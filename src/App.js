import React, {useEffect, useState} from 'react';
import {getFakeData} from './data';
import {DocumentsList} from './components/DocumentsList';

export const App = () => {
    const [data, setData] = useState({
        documents: [],
        participants: [],
        currentUserId: null,
    });

    useEffect(() => {
        (async () => {
            const data = await getFakeData();
            setData({
                ...data,
                currentUserId: data.participants[0].id,
            });
        })();
    }, []);

    return (
        <DocumentsList {...data} />
    );
}
