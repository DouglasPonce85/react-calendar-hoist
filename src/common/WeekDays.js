import React from 'react';
import styled from 'styled-components';

import { weekDays, weekDayHeaderBckColor } from '../utils/index';

const WeekDays = () => (
    <WeekMenu>
        {weekDays.map((day, index) => (
            <WeekDay key={index}>{day}</WeekDay>
        ))}
    </WeekMenu>
);

const WeekMenu = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    background: #EFEFEF;
`;

const WeekDay = styled.li`
    text-align: center;
    border: 0.1px solid #57576059;
    padding: 7px 0;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: ${ weekDayHeaderBckColor};
`;

export default WeekDays;
