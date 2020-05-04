import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import { monthBtnBckColor } from '../utils/index';

const ChangeMonthButton = ({ click, children }) => {
    return (
        <MonthBtn onClick={click}>{children}</MonthBtn>
    )
};

const MonthBtn = styled(Button)`
    background-color: ${ monthBtnBckColor};
    border: 1px solid white;
    
    &:hover {
        background-color: #0c73d9;
    }
`;

export default ChangeMonthButton;
