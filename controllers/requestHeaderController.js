import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import RequestHeaderInstructions from '../components/RequestHeaderInstructions'

export function instructionsPage(req,res){
    let component = renderToString(<RequestHeaderInstructions output={parseHeader(req)}/>)
    let page = pageTemplate("Request Header Parser Microservice", component)
    res.send(page)
}

export function parseRequestHeader(req,res){
    res.json(parseHeader(req))
}

function parseHeader(request){
    return {
        "ip-address": request.headers['x-forwarded-for'] || request.ip || request.connection.remoteAddress
        ,language: request.headers["accept-language"]
        ,software: request.headers["user-agent"]
    }
}