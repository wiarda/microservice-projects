import React from 'react'
import GridLayout from './GridLayout'


export default function UrlShortener(props){

    let title=(
        <h1 className="mx-auto">URL Shortener</h1>
    )

    let content = (
        <form style={{"min-width": "500px;"}} className="mx-auto" action="/api/shorten" method="post">
            {/* <div className="mb-2">Enter your URL here:</div> */}
            <input className="w-100" type="text" id="url" name="url" value="Enter your URL"/>        
            <div className="button mt-3 text-center">
                <button className="btn btn-primary" type="submit">Shorten</button>
            </div>
        </form>
    )


    return (
        <GridLayout
            title={title}
            content={content}
        />
    )
}