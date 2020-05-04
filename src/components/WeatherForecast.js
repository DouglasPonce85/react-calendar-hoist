import React from 'react';
import styled from 'styled-components';
import 'owfont/css/owfont-regular.css';

import {
    weatherCloudsColor,
    cloudyDays,
    sunnyDayColor
} from '../utils/index';

const WeatherForecast = props => {
    const dayIndex = props.day.date.getDate() - 1;
    const forecast = props.forecast[dayIndex];

    const isRainy = (typeDay) => {
        return cloudyDays.includes(typeDay);
    }

    return (
        <ForecastWrapper typeDay={forecast.weather.main} isRainy={isRainy}>
            <div className="Forecast1">
                <div className="weather">
                    <div className="info">
                        <span>{forecast.weather.main}</span>
                        <span>{' '} {Math.round(forecast.temp)}&deg;</span>
                        <br />
                        <span className="humidity">Humidity: {Math.round(forecast.humidity)}%<br /></span>
                    </div>
                    <div className={`owf owf-${forecast.weather.id}`} />
                </div>
            </div>
        </ForecastWrapper>
    )
};

const ForecastWrapper = styled.div`
    color: #09539d !important;
    font-size: 11.5px;
    font-weight: 600;
    left: 5px;
    position: absolute;

    .owf {
        color: ${props => props.isRainy(props.typeDay) ? weatherCloudsColor : sunnyDayColor};
        font-size: 40px;
        top: 10px;
    }

    .weather {
        position: absolute;
        top: 5px;
        width: 90px;
        display: grid;
    }

    .humidity {
        font-size: 8.5px;
    }
`;

export default WeatherForecast;