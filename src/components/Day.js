
import React from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import {
    todayColor,
    notDayMonthColor,
    weekDayBckColor,
    weekendBckColor,
} from '../utils/index';


const isWeekend = (day) => {
    const paramDay = new Date(day);
    return paramDay.getDay() === 6 || paramDay.getDay() === 0;
}

const getDayBackgroundColor = (isToday, day) => {
    return isToday ? todayColor :
        !day ? notDayMonthColor :
            isWeekend(day) ? weekendBckColor : weekDayBckColor;
}

const Day = (props) => {
    const { empty, children, isToday, createReminder, day } = props;

    return (
        <DayWrapper isToday={isToday} day={day}>
            {!empty ?
                <ReminderButton onClick={createReminder}>
                    <i className="fa fa-calendar-plus-o" />
                </ReminderButton> : null}
            {children}
        </DayWrapper>
    );
};

const DayWrapper = styled.div`
    border-color: #ddd;
    border-style: solid;
    border-width: 1px;
    padding: 0;
    vertical-align: top;
    font-weight: bold;
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: start;
    position: relative;
    font-size: 1.2rem;
    overflow-y: overlay;
    background-color: ${props => getDayBackgroundColor(props.isToday, props.day)};
`;

const ReminderButton = styled(Button)`
    position: absolute;
    right: 40%;
    width: 30%;
    color: #09539d !important;
    border: none;
    background-color: transparent;
    font-size: 30px;
    top: 10px;
    left: 40%;

    &:hover {
        transform: scale(1.3);
    }
`;

export default Day;
