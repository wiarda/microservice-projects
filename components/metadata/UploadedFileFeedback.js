import React from 'react'

export default function UploadedFileFeedback(props){
    console.log(props.link)
    return (
        <React.Fragment>
            <div className="row">Name: {props.name}</div>
            <div className="row">Type: {props.type}</div>
            <div className="row">Size: {props.size}</div>
            <div className="row" style={{whiteSpace:"pre"}}>Link: <a href={`/${props.link}`} download={props.name}>Download your file</a></div>       
        </React.Fragment>
    )
}