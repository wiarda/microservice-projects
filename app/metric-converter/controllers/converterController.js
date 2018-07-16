import React from 'react'
import CookingConverter from '../components/CookingConverter'
import { renderToString } from 'react-dom/server'
import pageTemplate from '../../../components/pageTemplate'

export function converterInstructions(req,res){
    let page = pageTemplate({
        title: "Cooking Measurements Converter"
        ,content: renderToString(<CookingConverter/>)
        ,scriptsArr:["/build/shared.bundle.js","/build/converter.bundle.js"]
        ,stylesArr:["/build/converter.css"]
    })

    res.send(page)
}
