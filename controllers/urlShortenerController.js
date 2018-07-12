import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from '../components/pageTemplate'
import UrlShortener from '../components/shortener/UrlShortener'
import GridLayout from '../components/GridLayout'
import {body, validationResult} from 'express-validator/check'
import {sanitizeBody, sanitizeParam} from 'express-validator/filter'
import {isValidUrl} from '../helpers/helpers'
import Link from '../models/shortener/urlShortenerModel'
import Index from '../models/shortener/indexModel'
import {serverAddress} from '../bin/www'

export function instructions(req,res){
    let page = pageTemplate({
        title:"URL Shortener"
        ,content: renderToString(<UrlShortener/>)
        ,scriptsArr: ["/build/vendors~metadata~shortener.bundle.js","/build/shortener.bundle.js"]
    })

    res.send(page)
}

export async function serveLink(req,res){
    let short = req.params.short

    if(isValidShortLink(short)) {
        // shortlink is valid -- check if it exists in DB
        let exists = await doesDocExist(Link, short, "short")    
        if (exists) { // redirect to the link
            console.log("found the link", unescapeUri(exists.url))
            res.redirect(prefixUrl(unescapeUri(exists.url)))
        }
    } 

    // shortlink is invalid or doesn't exist
    let errorPage = pageTemplate({
            title: "Sorry, this shortlink doesn't exist." 
            ,content: renderToString(
                <GridLayout title="Sorry, this shortlink doesn't exist.">
                    <div className="mx-auto">Would you like to <a href="/api/shorten">make a new one?</a></div>
                </GridLayout>
            )
        })
    res.send(errorPage)
}


export const addUrl = [
    body("url","Please enter a valid url.")
    .isLength({min: 1}).trim()
    .custom(value=>isValidUrl(value))
    ,sanitizeBody("url").trim().escape()
    ,async function(req, res, next){
        const errors = validationResult(req)
        let nextShort = getNextShort(Index)
        // let uniqueShort = getUniqueShort(generateShortUrl())
        let alreadyExists = doesDocExist(req.body.url)

        if (!errors.isEmpty()){ // server side validation failed
            console.log("Server side link validation failed:",errors.array())
            res.json({type:"error",message:`"${req.body.url}" is an invalid link. Please enter a valid link.`})
        } 
        else { // url is valid
            let exists = await alreadyExists
            if (exists) { 
                // link already exists, so returning it
                let {url, short} = exists
                res.json({type:"exists", url, short, serverAddress, domain:req.headers.host})               
            }
            else { // submitted url doesn't exist in database yet
                let short = await nextShort
                let document = {url: req.body.url, short}
                let link = new Link(document)
                 
                // add document to database
                link.save(err=>{
                    if (err) res.json({type:"error",message:`Sorry! Our database is down: ${err}`})
                    else{
                        // return short link
                        res.json({type:"exists", serverAddress, domain:req.headers.host, ...document})
                    } 
                })
            }
        }
    }
]


export function convertToShort(index){
    return Number(index).toString(32)
}

//checks if a document for this url already exists,
//and if so, returns it
export async function doesDocExist(collection, value, prop="url"){
    let duplicateUrl = await collection.findOne({[prop]:value})

    if (duplicateUrl) return duplicateUrl
    else return false
}

export async function getNextShort(db){
    let next = await db.findOneAndUpdate(
        {name: "shortener"}
        ,{$inc: {index: 1}}
        ,{
            new: true
            ,upsert: true
        }
    )

    if (next) return next.short
    else return getNextShort(db)
}

function prefixUrl(address){
    // prefixes address with "http://" if necessary
    let re = /^https?:\/\//i
    if (re.test(address)) return address
    else return `http://${address}`
}

/**
 * 
 * @param {string} address 
 */
function unescapeUri(address){
    let hexRE = /&#x(\w+);/g
    return address.replace(hexRE, function(match,p1){
        return String.fromCharCode(parseInt(p1,16))
    })
}

/**
 * 
 * @param {string} short 
 */
export function isValidShortLink(short){
    let re = /^[a-zA-Z0-9]+$/
    return re.test(short)
}