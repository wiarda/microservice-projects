import React from 'react'

export default function UploadForm(props){

    if (props.supportsDragDrop){

    }


    return (
        <form action="post" className="mx-auto" id="drop-zone">
            <div className="form-group">
                <input type="file" className="form-control-file" name="uploaded"/>
            </div>
        </form>
    )
}