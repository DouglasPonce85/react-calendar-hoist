import React from 'react';
import styled from 'styled-components';

import { format } from 'date-fns';
import ChangeMonthButton from './ChangeMonthButton';
import { headerBckColor } from '../utils/index';

const CalendarHeader = props => {
    const { prev, next, date } = props;
    return (
        <Wrapper>
            <ChangeMonthButton click={prev} aria-label='Previous Month'>
                {'<'}
            </ChangeMonthButton>

            {format(date, 'MMMM YYYY')}
            <ChangeMonthButton click={next} aria-label='Next Month'>
                {'>'}
            </ChangeMonthButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    background-color: ${headerBckColor};
    color: black;
    padding: 20px 0;
    margin-top: 25px;
    font-size: 2rem;
    outline: 1px inset;
    color: white;
    text-transform: uppercase;
    border: 0.3px solid #2534587d !important;
`;

export default CalendarHeader;
