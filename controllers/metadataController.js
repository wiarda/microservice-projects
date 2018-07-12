import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from "../components/pageTemplate"
import MetaDataService from "../components/metadata/MetadataService"
import multer from 'multer'
import ShareLinks from '../models/fileshare/ShareLinksModel';
import {getNextShort, isValidShortLink, doesDocExist} from './urlShortenerController'
import Index from '../models/fileshare/IndexModel';
import GridLayout from '../components/GridLayout'

const upload = multer({ dest: "public/uploads"})

export function instructions(req,res){
    let page = pageTemplate({
        title: "File Metadata Microservice"
        ,content: renderToString(<MetaDataService/>)
        ,scriptsArr: ["/build/vendors~metadata~shortener.bundle.js","/build/metadata.bundle.js"]
        ,stylesArr: ["/build/metadata.css"]
    })

    res.send(page)

}

export const receiveUpload = [
    upload.single("uploadedFile") // parse posted file upload
    ,async function receiveUpload(req,res){ 
        console.log("receiving upload")
        console.log(req.file)
        
        // create a shortlink
        let short = await getNextShort(Index)
        console.log(short)
        // upload to DB
        let ShareLink = new ShareLinks(
            {
                filename: req.file.originalname
                ,link: "\/"+req.file.path
                ,timestamp: Date.now()
                ,shortlink: short
                ,metadata: {
                    size: req.file.size
                    ,filetype: req.file.mimetype
                }
            }
        )

        ShareLink.save()

        // prepare api response
        let response = {
            name: req.file.originalname
            ,filetype: req.file.mimetype
            ,size: req.file.size
            ,link: `/share/${short}`
        }

        res.json({type:"uploaded", ...response})
    }
]

export async function serveFile(req,res){
    let shortlink = req.params.shortlink
    console.log("trying to serve",shortlink)
    let exists = doesDocExist(ShareLinks, shortlink, "shortlink")    

    if(isValidShortLink(shortlink)) {
        let record = await exists
        if (record) { // redirect to the link
            console.log("found the link", record.link)

            let downloadPage = pageTemplate({
                title: "Download your file."
                ,content: renderToString(
                    <GridLayout title="Here's your file!">
                    <div className="mx-auto mb-3">{record.filename}</div>
                    <div className="mx-auto"><a href={record.link} download={record.filename}>Click to Download</a></div>
                    </GridLayout>
                )
            })
            res.send(downloadPage)
        }
    } 

    // shortlink is invalid or doesn't exist
    let errorPage = pageTemplate({
            title: "Sorry, this link has expired." 
            ,content: renderToString(
                <GridLayout title="Sorry, this temporary file link has already expired.">
                    <div className="mx-auto">Would you like to <a href="/api/metadata">share a new file?</a></div>
                </GridLayout>
            )
        })
    res.send(errorPage)
}

