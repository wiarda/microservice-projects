import React from 'react'
import GridLayout from './GridLayout'
// import pageTemplate from './pageTemplate'

export default function TimestampInstructions(props){
    let title = (
        <h1 className="mx-auto">Timestamp Microservice</h1>
    )
    
    let instructions = (
        <ol>
            <li>Enter a date or timestamp at {`/api/timestamp/<date>`}</li>
            <li>Valid dates should be written in the format "YYYY-MM-DD"</li>
            <li>For a current timestamp, go to /api/timestamp/current</li>
            <li>Valid inputs will return a JSON object with the structure:</li>
            <span>{`{"unix": <timestamp>, "utc": <UTC time string>}`}</span>
        </ol>
    )
    
    return (
        <GridLayout
        title={title}
        content={instructions}
        />  
    )

}
