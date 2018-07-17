import React from 'react'

export default class UploadForm extends React.Component{
    constructor(props){
        super(props)
    }

  
    render(){
        let formStyles = `mx-auto form-control${this.props.isDragActive?" active-dragging-container":""}`

        return (
   
            <form 
                method="post"
                action="/api/metadata" 
                className={formStyles} 
                id="drop-zone"
                onDragEnterCapture={this.props.dragEnterHandler}
                onDragOverCapture={this.props.dragOverHandler}
                onDragLeaveCapture={this.props.dragLeaveHandler}
                onDropCapture={this.props.dropHandler}
            >
                <div className="form-group text-center">
                    <div className="py-1"></div>
                    <div className="">Drag and drop</div><div className="mb-2">or</div>
                    <input 
                        id="input-file" 
                        type="file" 
                        className="form-control-file" 
                        name="uploadedFile"
                        onChange={this.props.submitHandler}
                    />
                    <label id="input-button" className="btn btn-primary" htmlFor="input-file">Select a file</label>
                </div>
            </form>

        )
    }
}