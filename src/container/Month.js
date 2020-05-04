import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { isToday, getDay, format } from 'date-fns';

import Day from '../components/Day';
import Reminder from '../components/Reminder';
import ReminderForm from './ReminderForm';

import { fetchForecastByCityName } from '../services/weatherService';
import WeatherForecast from '../components/WeatherForecast';

class Month extends Component {
    state = {
        reminderFormOpen: false,
        dayId: null,
        reminder: null,
        forecast: [],
        weatherLoaded: false,
        cityName: 'San Pedro Sula, HN'
    };

    componentDidMount() {
        this.getForecastData();
    }

    toggleReminderForm = (dayId, closeModal) => {
        this.setState({
            reminderFormOpen: !this.state.reminderFormOpen,
            dayId,
        });

        if (this.state.reminder) {
            this.setState({ reminder: null });
        }
    };

    openReminderForm = (dayId, reminder) => {
        this.setState({ reminder, reminderFormOpen: true });
        this.toggleReminderForm(dayId, false);
    };

    async getForecastData() {
        this.setState({ weatherLoaded: false });
        const result = await fetchForecastByCityName(this.state.cityName);

        this.setState({
            weatherLoaded: true,
            forecast: result.list.map(item => ({
                date: new Date(),
                temp: item.main.temp,
                humidity: item.main.humidity,
                weather: item.weather[0],
            }))
        });
    }

    canShowWeatherForecast = () => {
        return this.state.weatherLoaded && this.state.forecast;
    }

    getSortedReminders = (reminders) => {
        return reminders.sort((a, b) => (a.time > b.time) ? 1 : -1);
    }

    render() {
        let days = null;
        const { range } = this.props;

        if (range.length) {
            const padding = Array(getDay(range[0].date)).fill(null);
            const paddedRange = [...padding, ...range];

            days = paddedRange.map(day => {
                if (day) {
                    const formattedDay = format(day.date, 'D');
                    const sortedReminders = this.getSortedReminders(day.reminders);
                    const reminders = sortedReminders.map(r => (
                        <Reminder
                            openReminderForm={() => this.openReminderForm(day.id, r)}
                            key={r.id}
                            title={r.title}
                            colour={r.colour}
                            time={r.time}
                            city={r.city}
                        />
                    ));

                    return (
                        <Day
                            createReminder={() => this.toggleReminderForm(day.id)}
                            key={day.id}
                            day={day.date}
                            isToday={isToday(day.date)}
                        >
                            {this.canShowWeatherForecast() && (
                                <WeatherForecast
                                    day={day}
                                    cityName={this.state.cityName}
                                    forecast={this.state.forecast}
                                />)
                            }
                            <FormattedDayStyle>{formattedDay}</FormattedDayStyle>
                            <Reminders>{reminders}</Reminders>
                        </Day>
                    );
                }

                return <Day empty key={uuid()} />;
            });
        }

        let reminderForm = null;
        if (this.state.reminderFormOpen) {
            reminderForm = (
                <ReminderForm
                    closeModal={() => this.toggleReminderForm(this.state.dayId)}
                    show={this.state.reminderFormOpen}
                    dayId={this.state.dayId}
                    reminder={this.state.reminder}
                />
            );
        }

        return (
            <Fragment>
                {reminderForm}
                <Wrapper>{days}</Wrapper>
            </Fragment>
        );
    }
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 200px);
`;

const Reminders = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`;

const FormattedDayStyle = styled.div`
    color: #09539d !important;
    font-size: 20px;
    font-weight: 700;
    top: 5px;
    left: 85%;
    position: absolute;
`;

export default Month;
