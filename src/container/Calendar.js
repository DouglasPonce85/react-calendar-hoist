import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

import WeekDays from '../common/WeekDays';
import CalendarHeader from '../common/CalendarHeader';
import Month from './Month';
import DevelopedBy from '../common/DevelopedBy';

import { devlopedByInfo } from '../utils/index';

class Calendar extends Component {
    render() {
        const { author, linkedinUrl, githubUrl } = devlopedByInfo;
        const { onSetNextMonth, onSetPrevMonth, currentMonth } = this.props;
        return (
            <>
                <DevelopedBy
                    author={author}
                    linkedinUrl={linkedinUrl}
                    githubUrl={githubUrl}
                />
                <CalendarHeader
                    next={onSetNextMonth}
                    prev={onSetPrevMonth}
                    date={currentMonth[0].date}
                />
                <WeekDays />
                <Month range={currentMonth} />
            </>
        );
    }
}

const mapStateToProps = state => ({
    currentMonth: state.month,
});

const mapDispatchToProps = dispatch => ({
    onSetNextMonth: () => dispatch(actions.setNextMonth()),
    onSetPrevMonth: () => dispatch(actions.setPrevMonth()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
