import React from 'react'
import GridLayout from '../GridLayout'
import UploadForm from '../UploadForm'
import ServerResponse from '../ServerResponse'
import UploadedFileFeedback from './UploadedFileFeedback';
import { FILE_SIZE_LIMIT } from '../../app/metadata/settings';

const defaultState = {
    dragDrop: false
    ,dragActive: false
    ,apiResponse: {type:"placeholder"}
}

export default class MetaDataService extends React.Component{
    constructor(props){
        super(props)
        this.state = defaultState
    }

    componentDidMount(){
        this.setState({dragDrop: supportsDragDrop()})
    }

    dragEnterHandler(e){
        this.stopPropagation(e)
        this.setState({dragActive: true})
    }

    dragOverHandler(e){
        this.stopPropagation(e)
    }

    dragLeaveHandler(e){
        this.stopPropagation(e)
        this.setState({dragActive: false})
    }

    submitHandler(e){
        console.log("submitting form")
        console.log(this)
        console.log(e.files)
    }

    dropHandler(e){
        console.log("drop handler")
        this.stopPropagation(e)
        console.log(e)
        let files = [...e.dataTransfer.files]
  
        files.forEach(this.uploadFile.bind(this))
        
        this.setState({dragActive: false, files})
    }

    stopPropagation(e){
        e.preventDefault()
        e.stopPropagation()
    }

    uploadFile(file){
        console.log("uploading",file)
        
        if (file.size < FILE_SIZE_LIMIT) {
            let form = new FormData()
            form.append("uploadedFile", file)
            
            fetch("/api/metadata/upload", {
                method: "POST"
                ,body: form
            })
            .then(body=>body.json())
            .then(apiResponse=>this.setState({apiResponse}))
            //add code to handle server timeout
        }
        else {
          this.setState({apiResponse:{type:"Oversize"}})  
        }
    }

    render(){

        return (
            <GridLayout 
                title={this.props.title || "Temporary File Sharing Service"}
            >
                <div className="mx-auto mb-3">File share links will last for 24 hours.</div>
    
                <UploadForm
                    supportsDragDrop = {this.state.dragDrop}
                    isDragActive={this.state.dragActive}
                    dragEnterHandler={this.dragEnterHandler.bind(this)}
                    dragOverHandler={this.dragOverHandler.bind(this)}
                    dragLeaveHandler={this.dragLeaveHandler.bind(this)}
                    dropHandler={this.dropHandler.bind(this)}
                    submitHandler={this.submitHandler.bind(this)}
                />
    
                <ServerResponse
                    apiResponse={this.state.apiResponse}
                    parser={parseMetadata}
                />
    
            </GridLayout>
        )
    }
}


function parseMetadata(metadata){
   
    switch (metadata.type){
        case "uploaded":
            return (
                <UploadedFileFeedback
                    name={metadata.name}
                    type={metadata.filetype}
                    size={metadata.size}
                    link={metadata.link}
                />
            )
        case "Oversize":
            return (
                <div className="row">Sorry! We only accept files up to 10mb in size.</div>
            )
        default:
            return (
                <React.Fragment>
                    <div className="row">This service accepts files up to 10mb in size.</div>
                </React.Fragment>
            )
                
    }
}


function supportsDragDrop(){
    const div = document.createElement("div")
    return (("draggable" in div) || ("ondragstart" in div && "ondrop" in div)) && 
    "FormData" in window && 
    "FileReader" in window
}