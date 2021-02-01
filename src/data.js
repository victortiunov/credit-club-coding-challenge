import { name, random, date, lorem } from 'faker';

// DON'T CHANGE ME
const ELEMENTS_COUNT = 5000;

const participantFactory = () => ({
    firstName: name.firstName(),
    lastName: name.lastName(),
    id: random.uuid()
});

const elementFactory = (sourceParticipants) => {
    const participants = sourceParticipants.slice().map((p) => ({
        ...p,
        signedDate: random.arrayElement([date.past(), null])
    }));

    participants.length = random.number(participants.length) ?? 1;

    return {
        participants,
        id: random.uuid(),
        title: lorem.sentence(),
        signedDate: random.arrayElement([date.past(), null])
    };
};

export const getFakeData = () => {
    const participants = new Array(10).fill(null).map(participantFactory);

    return Promise.resolve({
        participants,
        documents: new Array(ELEMENTS_COUNT)
            .fill(null)
            .map(() => elementFactory(participants))
    });
};
