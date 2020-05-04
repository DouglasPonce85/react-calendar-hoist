import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid';

import Button from '../common/Button';
import * as actions from '../store/actions';
import {
    colours,
    defaultReminderColor,
    submitButtonBckColor
} from '../utils/index';

class ReminderForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            reminder: {
                title: '',
                time: '',
                city: '',
                colour: defaultReminderColor,
                id: '',
            },
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        if (this.props.reminder) {
            this.setState({ reminder: this.props.reminder });
        }
    }

    inputChangedHandler = (event, id) => {
        const reminder = {
            ...this.state.reminder,
            [id]: event.target.value,
        };
        this.setState({ reminder });
    };

    createReminder = () => {
        this.props.onCreateReminder(this.props.dayId, {
            ...this.state.reminder,
            id: uuid(),
        });

        this.setState(this.initialState);
        this.props.closeModal();
    };

    updateReminder = () => {
        this.props.onUpdateReminder(this.props.dayId, this.state.reminder);
        this.setState(this.initialState);
        this.props.closeModal();
    };

    deleteReminder = () => {
        this.props.onDeleteReminder(this.props.dayId, this.state.reminder);
        this.setState(this.initialState);
        this.props.closeModal();
    };

    reminderFormHandler = () => {
        if (this.props.reminder) {
            this.updateReminder();
        } else {
            this.createReminder();
        }
    };

    showCloseButton = () => {
        return !this.props.reminder;
    }

    setReminderColour = colour => {
        this.setState({
            reminder: {
                ...this.state.reminder,
                colour,
            },
        });
    };

    canSubmitReminder = () => {
        return this.state.reminder.title &&
            this.state.reminder.time;
    }

    render() {
        return (
            <Backdrop>
                <Modal>
                    <TitleWrapper>
                        <TitleContainer>
                            Add new reminder
                        </TitleContainer>
                        <i className="fa fa-calendar-check-o" />
                    </TitleWrapper>

                    {this.showCloseButton() && (
                        <CloseButton onClick={this.props.closeModal}>x</CloseButton>)
                    }

                    <Form>
                        <label className='element-wrapper' htmlFor='title'>
                            <span>Reminder Name</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'title')}
                                type='text'
                                id='title'
                                placeholder='Add a title'
                                value={this.state.reminder.title}
                            />
                        </label>
                        <label className='element-wrapper' htmlFor='time'>
                            <span>Enter City</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'city')}
                                type='text'
                                id='city'
                                value={this.state.reminder.city}
                            />
                        </label>
                        <label className='element-wrapper' htmlFor='time'>
                            <span>Enter time</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'time')}
                                type='time'
                                id='time'
                                value={this.state.reminder.time}
                            />
                        </label>

                        <div className='element-wrapper'>
                            <span>Select reminder color</span>
                            <CircleWrapper>
                                {colours.map(colour => (
                                    <Circle
                                        type='button'
                                        onClick={() => this.setReminderColour(colour)}
                                        colour={colour}
                                        key={colour}
                                    />
                                ))}
                            </CircleWrapper>

                            <ColorSelected>
                                <Circle
                                    type='button'
                                    colour={this.state.reminder.colour}
                                    key={this.state.reminder.colour}
                                />
                            </ColorSelected>
                        </div>

                        {this.canSubmitReminder() && (
                            <SubmitButton type='button' onClick={this.reminderFormHandler}>
                                Submit
                            </SubmitButton>)
                        }

                        {this.props.reminder ? (
                            <DeleteButton type='button' onClick={this.deleteReminder}>
                                Delete
                            </DeleteButton>
                        ) : null}
                    </Form>

                </Modal>
            </Backdrop>
        );
    }
}

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 5s ease-in-out;
    display: flex;
`;

const Modal = styled.div`
    position: fixed;
    z-index: 999;
    box-shadow: 1px 1px 9px 3px #000000ad;
    width: 650px;
    height: 720px;
    padding: 16px;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    transition: all 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    place-items: center center;
    background-color: #1a2c3b;
    color: white;
    font-weight: 300;
`;

const Form = styled.form`
    padding: 50px;
    display: flex;
    flex-direction: column;
    place-items: center center;
    left: 37%;
    position: absolute;

    > .element-wrapper {
        display: block;
        margin-bottom: 10px;
        input,
        span {
            display: block;
            margin-bottom: 15px;
        }
        input {
            min-width: 300px;
            color: #000;
            border: 1px solid #f3f3f3;
            padding: 10px 14px;
            line-height: normal;
            letter-spacing: inherit;
            border-radius: 0;
            box-shadow: none;
            background-color: #f3f3f3;
        }
    }
`;

const TitleWrapper = styled.div`
    background-color: #F27063;
    display: flex;
    height: 95%;
    padding: 30px;
    width: 231px;
    padding: 20px;
    display: table;
    position: absolute;
    left: 2%;

    i  {
        font-size: 90px;
        padding-left: 25%;
        padding-top: 35%;
    }
`;

const TitleContainer = styled.div`
    font-size: 32px;
    width: 95%;
    position: relative;
    padding-top: 220px;
    text-align: center;
    text-transform: uppercase;
`;

const SubmitButton = styled(Button)`
    border-radius: 2px;
    padding: 15px 20px;
    line-height: auto;
    height: auto;
    letter-spacing: 2px;
    margin-bottom: 10px;
    width: 200px;
    background-color: ${ submitButtonBckColor};
    color: #f27063 !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    border-color: #f27063 !important;
`;

const DeleteButton = styled(SubmitButton)`
    background-color: ${ submitButtonBckColor};

    &:hover {
        background-color: #f4a294;
    }
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 70px;    
    background-color: #f27063;
    border: none;
    z-index: 999;

    &:hover {
        background-color: tomato;
    }
`;

const Circle = styled(Button)`
    background-color: ${props => props.colour};
    width: 36px;
    &:hover {
        background-color: ${props => props.colour};
    }
`;

const CircleWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

const ColorSelected = styled(CircleWrapper)`
    width: 125%;
    display: block;
    position: relative;

    span {
        font-size: 10px;
        font-weight: 600;
        color: #fff;
    }

    button {
        width: 80%;
        margin: auto auto;
        clear: both;
        border: none;
        cursor: none;
    }
`;

const mapDispatchToProps = dispatch => ({
    onCreateReminder: (dayId, reminder) => dispatch(actions.createReminder(dayId, reminder)),
    onUpdateReminder: (dayId, reminder) => dispatch(actions.updateReminder(dayId, reminder)),
    onDeleteReminder: (dayId, reminder) => dispatch(actions.deleteReminder(dayId, reminder)),
});

export default connect(
    null,
    mapDispatchToProps
)(ReminderForm);
