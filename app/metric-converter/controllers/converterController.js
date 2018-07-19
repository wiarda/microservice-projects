import React from 'react'
import CookingConverter from '../components/CookingConverter'
import { renderToString } from 'react-dom/server'
import pageTemplate from '../../../components/pageTemplate'
import validator from 'validator'
import convert from '../measures'
import { capitalize } from '../../../helpers/helpers'

export function converterInstructions(req,res){
    let page = pageTemplate({
        title: "Cooking Measurements Converter"
        ,content: renderToString(<CookingConverter/>)
        ,scriptsArr:["/build/shared.bundle.js","/build/converter.bundle.js"]
        ,stylesArr:["https://fonts.googleapis.com/icon?family=Material+Icons","/build/shared.css","/build/converter.css"]
    })

    res.send(page)
}

export function conversionRequest(req,res){
    // console.log("request received")
    // console.log(req.query)
    let {amount,from,to} = req.query
    let error = {type:"error"} 
   
    // validate amount
    if (!validator.isFloat(amount)) {
        amount = validator.escape(amount)
        error.amount = amount
        error.amountError=`${amount} is not a valid number`
        error.flag=true
    }

    //validate from field
    if (!convert[from]){
        from = validator.escape(from)
        error.from = from
        error.fromError = `${from} is not a valid unit`
        error.flag = true
    }
    
    // validate to field
    if (!convert[to]) {
        to = validator.escape(to)
        error.to = to
        error.toError = `${to} is not a valid unit`
        error.flag = true
    }

    // handle failed validation
    if (error.flag){
        res.json(error)
    }
    // handle successful validation
    else {
        let answer = convert[from][`to${capitalize(to)}`](amount)
        let fromPlural = amount == 1 ? "" : "s"
        let toPlural = answer == 1 ? "" : "s"

        let success = {
            type: "success"
            ,amount
            ,from
            ,to
            ,answer
            ,result: `${amount} ${convert[from].name+fromPlural} is equal to ${answer} ${convert[to].name+toPlural}.`  
        }
        res.json(success)
    }

}


