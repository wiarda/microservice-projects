import React from 'react'
import {renderToString} from 'react-dom/server'
import pageTemplate from "../components/pageTemplate"
import MetaDataService from "../components/metadata/MetadataService"

export function instructions(req,res){
    let page = pageTemplate({
        title: "File Metadata Microservice"
        ,content: renderToString(<MetaDataService/>)
        ,scriptsArr: ["/build/vendors~metadata~shortener.bundle.js","/build/metadata.bundle.js"]
    })

    res.send(page)

}