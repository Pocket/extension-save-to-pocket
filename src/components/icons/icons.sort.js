import React from 'react'
import { svgStyles } from './style'

export const Sort = ( iconOn ) => {
    if(iconOn){
        return (
            <svg style={svgStyles()} xmlns="http://www.w3.org/2000/svg"  className="icon" viewBox="0 0 100 100">
                <rect x="3.8" y="4.9" width="40.9" height="25.55"/>
                <path d="M91.7,8.9V26.4H58.9V8.9H91.7m4-4H54.9V30.4H95.7V4.9h0Z"/>
                <path d="M40.6,39.5V57.1H7.8V39.5H40.6m4-4H3.8V61.1H44.6V35.5h0Z"/>
                <path d="M91.7,39.5V57.1H58.9V39.5H91.7m4-4H54.9V61.1H95.7V35.5h0Z"/>
                <path d="M40.6,70.3V87.9H7.8V70.3H40.6m4-4H3.8V91.9H44.6V66.3h0Z"/>
                <rect x="54.9" y="66.3" width="40.9" height="25.55"/>
            </svg>
        )
    }
    return (
        <svg style={svgStyles()} xmlns="http://www.w3.org/2000/svg"  className="icon" viewBox="0 0 100 100">
            <rect x="3.8" y="4.9" width="40.9" height="25.55"/>
            <path d="M91.7,8.9V26.4H58.9V8.9H91.7m4-4H54.9V30.4H95.7V4.9h0Z"/>
            <path d="M40.6,39.5V57.1H7.8V39.5H40.6m4-4H3.8V61.1H44.6V35.5h0Z"/>
            <path d="M91.7,39.5V57.1H58.9V39.5H91.7m4-4H54.9V61.1H95.7V35.5h0Z"/>
            <path d="M40.6,70.3V87.9H7.8V70.3H40.6m4-4H3.8V91.9H44.6V66.3h0Z"/>
            <rect x="54.9" y="66.3" width="40.9" height="25.55"/>
        </svg>
    )
}
