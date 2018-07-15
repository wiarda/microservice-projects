import React from 'react'
import { resolveLink, copyLink } from '../../helpers/helpers';

export default function UploadedFileFeedback(props){
    const link = resolveLink(props.link)
    return (
        <React.Fragment>
            <div className="row">Name: {props.name}</div>
            <div className="row">Type: {props.type}</div>
            <div className="row">Size: {props.size}</div>
            <div className="row mt-3"><a className="mx-auto" id="copy-link" href={props.link}>{link}</a></div>
            <div className="row text-center">
                <div className="btn btn-primary mt-3 mx-auto" onClick={()=>copyLink("copy-link")}>Copy Link</div>
            </div>       
        </React.Fragment>
    )
}

