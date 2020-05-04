import { getMonthRange, getPrevOrNextRange } from './util';
import * as actionTypes from '../actions/actionTypes';

const currentMonth = getMonthRange(new Date());

const initialState = {
    currentMonthIndex: 0,
    month: currentMonth,
    year: { 0: currentMonth },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEXT_MONTH: {
            const nextMonthIndex = state.currentMonthIndex + 1;

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: state.month,
                [nextMonthIndex]: state.year[nextMonthIndex]
                    ? state.year[nextMonthIndex]
                    : getPrevOrNextRange(state.month, 'next'),
            };

            return {
                ...state,
                currentMonthIndex: nextMonthIndex,
                month: updatedYear[nextMonthIndex],
                year: updatedYear,
            };
        }
        case actionTypes.SET_PREV_MONTH: {
            const nextMonthIndex = state.currentMonthIndex - 1;

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: state.month,
                [nextMonthIndex]: state.year[nextMonthIndex]
                    ? state.year[nextMonthIndex]
                    : getPrevOrNextRange(state.month, 'prev'),
            };

            return {
                ...state,
                currentMonthIndex: nextMonthIndex,
                month: updatedYear[nextMonthIndex],
                year: updatedYear,
            };
        }
        case actionTypes.CREATE_REMINDER: {
            const { reminder, dayId } = action;

            const updatedMonth = state.month.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        reminders: day.reminders.concat(reminder),
                    };
                }
                return day;
            });

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: updatedMonth,
            };

            return {
                ...state,
                month: updatedMonth,
                year: updatedYear,
            };
        }
        case actionTypes.UPDATE_REMINDER: {
            const { reminder, dayId } = action;

            const updatedMonth = state.month.map(day => {
                if (day.id === dayId) {
                    const updatedReminders = day.reminders.map(r => {
                        if (r.id === reminder.id) {
                            return reminder;
                        }
                        return r;
                    });
                    return {
                        ...day,
                        reminders: updatedReminders,
                    };
                }
                return day;
            });

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: updatedMonth,
            };

            return {
                ...state,
                month: updatedMonth,
                year: updatedYear,
            };
        }
        case actionTypes.DELETE_REMINDER: {
            const { reminder, dayId } = action;

            const updatedMonth = state.month.map(day => {
                if (day.id === dayId) {
                    const updatedReminders = day.reminders.filter(r => r.id !== reminder.id);
                    return {
                        ...day,
                        reminders: updatedReminders,
                    };
                }
                return day;
            });

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: updatedMonth,
            };

            return {
                ...state,
                month: updatedMonth,
                year: updatedYear,
            };
        }
        default:
            return state;
    }
};

export default reducer;
