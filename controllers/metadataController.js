import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from "../components/pageTemplate"
import MetaDataService from "../components/metadata/MetadataService"
import multer from 'multer'
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
    upload.single("uploadedFile")
    ,function receiveUpload(req,res){
        console.log("receiving upload")
        console.log(req.file)
        let response = {
            name: req.file.originalname
            ,filetype: req.file.mimetype
            ,size: req.file.size
            ,link: req.file.path
        }
        res.json({type:"uploaded", ...response})
    }
]

