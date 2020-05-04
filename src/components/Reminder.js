import React from 'react';
import styled from 'styled-components';

const Reminder = props => {
    const { city, colour, time, title, openReminderForm } = props;
    return (
        <Wrapper colour={colour} onClick={openReminderForm}>
            <header>{title} | {city}</header>
            <p>Time: {time}</p>
            <Edit>🖊</Edit>
        </Wrapper>
    );
};

const Edit = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 1rem;
    opacity: 0;
    transition: all 0.3s linear;
`;

const Wrapper = styled.div`
    background-color: ${props => (props.colour ? props.colour : '#bfccc847')};
    display: inline-block;
    width: 90%;
    padding: 5px 10px;
    font-size: 0.7rem;
    color: #0f0e0e;
    font-weight: 600;
    position: relative;
    cursor: pointer;
    top: 40px;
    height: 40px;

    p {
        line-height: 5px;
    }
    
    &:hover ${Edit} {
        opacity: 1;
    }
`;

export default Reminder;
