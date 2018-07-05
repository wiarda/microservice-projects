import React from 'react'
import GridLayout from '../GridLayout'
import Title from '../Title'

const DEFAULT_STATE = {
    formUrl:"Enter your URL"
}

export default class UrlShortener extends React.Component{
    constructor(props){
        super(props)
        this.state = DEFAULT_STATE
        this.handleForm = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    clearDefaultUrl(){
        if (this.state.formUrl == DEFAULT_STATE.formUrl) this.setState({formUrl:""})
    }

    handleInput(e){
        this.setState({formValue: e.target.value})
    }

    handleSubmit(e){
        console.log("submitting", this.state.formUrl)
        e.preventDefault()
    }

    render(){
        let title=(
            <h1 className="mx-auto">URL Shortener</h1>
        )

        let content = (
            <form style={{"minWidth": "500px"}} className="mx-auto" onSubmit={this.handleSubmit} action="/api/shorten" method="post">
                {/* <div className="mb-2">Enter your URL here:</div> */}
                <input className="w-100" type="text" id="url" name="url" value={this.state.formUrl} onClick={this.clearDefaultUrl} onChange={this.handleInput}/>        
                <div className="button mt-3 text-center">
                    <button className="btn btn-primary" type="submit">Shorten</button>
                </div>
            </form>
        )


        return (
            <GridLayout
                title={<Title text="URL Shortener"/>}
                content={content}
            />
        )
    }
}


function getShortLink(){

}