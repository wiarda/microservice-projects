import React from 'react'

export default function Loading(props){
    let minWidthStyle = props.minWidth? {minWidth:props.minWidth}:{}
    let spinner = props.spinner ? <div className="loader mx-auto"/> : null
    return (
        <React.Fragment>
        <div className="row" style={minWidthStyle}>
            <div className="container position-relative">
                {spinner}
                <div className="loading-text-absolute mx-auto">Loading...</div>
            </div>
        </div>
        </React.Fragment>
    )
}