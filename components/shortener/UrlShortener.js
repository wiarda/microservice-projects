import React from 'react'
import GridLayout from '../GridLayout'
import Form from '../Form'
import ServerResponse from '../ServerResponse'
import path from 'path'
import {isValidUrl} from '../../helpers/helpers'


console.log(process.version)

const DEFAULT_STATE = {
    formUrl:"Enter your URL"
}

export default class UrlShortener extends React.Component{
    constructor(props){
        super(props)
        this.state = DEFAULT_STATE
        this.clearDefaultUrl = this.clearDefaultUrl.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    clearDefaultUrl(){
        if (this.state.formUrl == DEFAULT_STATE.formUrl) this.setState({formUrl:""})
    }

    handleInput(e){
        this.setState({formUrl: e.target.value})
    }

    handleSubmit(e){
        console.log("submitting", this.state.formUrl)
        e.preventDefault()

        if (isValidUrl(this.state.formUrl)){ 
            // url is valid, send to server
            let submit = fetch("/api/shorten", {
                method: "POST"
                ,headers: {"Content-Type": "application/json; charset=utf-8"}
                ,body: JSON.stringify({url: this.state.formUrl})
            })
            .then(body=>body.json())
            .then(function(response){
                console.log(response)
                this.setState({response})
            }.bind(this))
            .catch(function(err){
                console.log(err)
            })
        }
        else {
            this.setState({response: {type:"invalid", message:"Please enter a valid web address."}})
        }
              
    }

    render(){
   
        return (
            <GridLayout
                title="URL Shortener"
            >
                <Form
                    submitHandler={this.handleSubmit}
                    fieldValue={this.state.formUrl}
                    fieldClickHandler={this.clearDefaultUrl}
                    fieldInputHandler={this.handleInput}
                    submitButtonText="Shorten"
                    action="/api/shorten"
                />
                <ServerResponse
                    apiResponse={this.state.response}
                    parser={shortLinkParser}
                />
            </GridLayout>
        )
    }
}


function shortLinkParser(response){

    switch (response && response.type){
        case "exists":
            return (
            <div>Here's your shortlink:
                <br/>
                <a className="text-center d-block" href={`/short/${response.short}`}>
                    {path.resolve(__dirname,response.short)}
                </a>
            </div>
                )

        case "error":
            return <div>{response.message}</div>

        case "invalid":
            return <div>{response.message}</div>
            
        default:
            return null
    }
    
}