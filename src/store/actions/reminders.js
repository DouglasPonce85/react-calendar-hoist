import * as actionTypes from './actionTypes';

export const createReminder = (dayId, reminder) => ({
    type: actionTypes.CREATE_REMINDER,
    dayId,
    reminder,
});

export const deleteReminder = (dayId, reminder) => ({
    type: actionTypes.DELETE_REMINDER,
    dayId,
    reminder,
});

export const updateReminder = (dayId, reminder) => ({
    type: actionTypes.UPDATE_REMINDER,
    dayId,
    reminder,
});
