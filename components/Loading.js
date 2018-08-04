import React from 'react'

export default function Loading(props){

    console.log("loading",props)
    let minWidthStyle = props.minWidth? {minWidth:props.minWidth}:{}
    let spinner = props.spinner ? <div className="loader mx-auto"/> : null
    return (
        <div className="row" style={minWidthStyle} data-visibility={props.isLoading}>
            <div className="container position-relative">
                {spinner}
                <div className="loading-text-absolute mx-auto">{props.message? props.message : "Loading..."}.</div>
            </div>
        </div>
    )
}