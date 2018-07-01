import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import UrlShortener from '../components/UrlShortener'

export function instructions(req,res){
    let page = pageTemplate("URL Shortener",renderToString(<UrlShortener/>))
    res.send(page)
}

export function shortenUrl(req,res){
    console.log(req.body)
    res.send(req.body)
}