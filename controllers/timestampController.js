import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import TimestampInstructions from '../components/TimestampInstructions'

export const timestampInstructions = function (req,res){
    let component = renderToString(<TimestampInstructions/>)
    // console.log("component")
    // console.log(component)

    let page = pageTemplate("Timestamp Microservices", component)

    // res.writeHead( 200, { "Content-Type": "text/html" } )
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(page)
}

export const timestampController = function(req,res){
    let input = req.params.date
    let dateObj
    let date = isNumeric(input) ? new Date(Number(input)) : new Date(input)

    if (isNaN(date)) dateObj = {error: "Invalid Date"}
    else dateObj = buildDateObj(date)

    res.json(dateObj)
}

export function currentTime(req,res){
    res.json(buildDateObj(new Date(Date.now())))
}
    
function isNumeric(input){
    if (Number(input)) return true
}

function buildDateObj(time){
    return {
        unix: time.getTime()
        ,utc: time.toUTCString()
    }
}