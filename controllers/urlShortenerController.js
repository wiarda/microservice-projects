import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import UrlShortener from '../components/shortener/UrlShortener'
import ShortLinks from '../models/urlShortenerModel'
import {body, validationResult} from 'express-validator/check'
import {sanitizeBody} from 'express-validator/filter'
import {isValidUrl} from '../helpers/helpers'
import Link from '../models/urlShortenerModel'

export function instructions(req,res){
    let page = pageTemplate({
        title:"URL Shortener"
        ,content: renderToString(<UrlShortener/>)
        ,scriptsArr: ["/build/shortener/client.js"]
    })

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
        let alreadyExists = doesDocExist(req.body.url)

        if (!errors.isEmpty()){ // server side validation failed
            console.log("Server side link validation failed:",errors.array())
            res.json({type:"error",message:`${req.body.url} is an invalid link. Please enter a valid link.`})
        } 
        else { // url is valid
            let exists = await alreadyExists
            if (exists) { 
                // link already exists, so returning it
                let {url, short} = exists
                res.json({type:"exists", url, short})               
            }
            else { // submitted url doesn't exist in database yet
                let short = await uniqueShort
                let document = {url: req.body.url, short}
                let link = new Link(document)
                 
                // add document to database
                link.save(err=>{
                    if (err) res.json({type:"error",message:`Sorry! Our database is down: ${err}`})
                    else{
                        // return short link
                        res.json({type:"exists", ...document})
                    } 
                })
            }
        }
    }
]

function generateShortUrl(){
    return (Date.now()-1530636000000).toString(32)
}

//checks if a document for this url already exists,
//and if so, returns it
async function doesDocExist(url){
    console.log("checking if",url,"is unique")
    let duplicateUrl = await Link.findOne({url})
    console.log ("records:",duplicateUrl)
    if (duplicateUrl) return duplicateUrl
    else return false
}

async function getUniqueShort(short){
    let duplicateShort = await Link.findOne({short})
    if (duplicateShort) {
        short = getUniqueShort(generateShortUrl())
    }
    else return short
    // **TODO** reserve short code at this point
}