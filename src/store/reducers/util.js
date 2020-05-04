import { eachDay, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import uuid from 'uuid';

/**
 * getMonthRange - Get an array of all the dates in a given month
 *
 * @param {Date} date - Date in the month whose range we're trying to get
 * @returns {Date[]}
 */
export const getMonthRange = date =>
    eachDay(startOfMonth(date), endOfMonth(date)).map(day => ({
        date: day,
        id: uuid(),
        reminders: [],
    }));

/**
 * getPrevOrNextRange - Get an array of all the dates in the previous or next month
 *
 * @param {Date[]} monthRange - The month range to check against
 * @param {String} time - 'next' or 'prev' month range to return
 * @returns {Date[]}
 */
export const getPrevOrNextRange = (monthRange, time) => {
    // Take the first day of the range passed
    const dateInCurrentRange = monthRange[0].date;
    let dateInRange = null;
    if (time === 'next') {
        dateInRange = addMonths(dateInCurrentRange, 1);
    }
    if (time === 'prev') {
        dateInRange = subMonths(dateInCurrentRange, 1);
    }
    return getMonthRange(dateInRange);
};
