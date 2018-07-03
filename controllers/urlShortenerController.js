import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import UrlShortener from '../components/UrlShortener'
import ShortLinks from '../models/urlShortenerModel'
import {body, validationResult} from 'express-validator/check'
import {sanitizeBody} from 'express-validator/filter'
import {isValidUrl} from '../helpers/helpers'
import Link from '../models/urlShortenerModel'
import { CLIENT_RENEG_WINDOW } from 'tls';

export function instructions(req,res){
    let page = pageTemplate("URL Shortener",renderToString(<UrlShortener/>))
    res.send(page)
}

export function shortenUrl(req,res){
    console.log(req.body.url)
    body("url","Please enter a url to shorten.").isLength({min: 1})
    sanitizeBody("url").trim().escape()

    res.send(req.body)
}

export function showAllLinks(req,res){
    ShortLinks.find({}, "url")
}


export const addUrl = [
    body("url","Please enter a valid url.")
    .isLength({min: 1}).trim()
    .custom(value=>isValidUrl(value))
    ,sanitizeBody("url").trim().escape()
    ,async function(req, res, next){
        const errors = validationResult(req)
        let uniqueShort = getUniqueShort(generateShortUrl())
        let isUnique = isUrlUnique(req.body.url)
        let link

        if (!errors.isEmpty()){
            // url failed validation -- add an alert for user
            console.log("there's a problem with your link:",errors.array())
        } 
        else {
            // url is valid
            if (await isUnique) { 
                // submitted url doesn't exist in database
                let short = await uniqueShort
                let link = new Link({url: req.body.url, short})
                console.log("unique link", req.body.url, short)
                
                // add document to database
                link.save(err=>{
                    if (err) res.send(err)
                    else res.send(generateShortUrl())
                })
            }
            else {
                // link already exists, so pull old record and return it
                console.log("link already exists")
            }
        }
    }
]

function generateShortUrl(){
    return (Date.now()-1530636000000).toString(32)
}

async function isUrlUnique(url){
    console.log("checking if",url,"is unique")
    let duplicateUrl = await Link.findOne({url})
    console.log ("records:",duplicateUrl)
    if (duplicateUrl) return false
    else return true
}

async function getUniqueShort(short){
    let uniqueShort = await Link.findOne({short})
    if (uniqueShort) {
        short = getUniqueShort(generateShortUrl())
    }
    else return short
}