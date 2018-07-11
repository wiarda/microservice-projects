import React from 'react'
import GridLayout from '../GridLayout'
import UploadForm from '../UploadForm'
import ServerResponse from '../ServerResponse'
import UploadedFileFeedback from './UploadedFileFeedback';

const defaultState = {
    dragDrop: false
    ,dragActive: false
    ,apiResponse: {type:"Placeholder"}
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

    dropHandler(e){
        console.log("drop handler")
        this.stopPropagation(e)
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
        let form = new FormData()
        
        form.append("uploadedFile", file)
        
        fetch("/api/metadata/upload", {
            method: "POST"
            ,body: form
        })
        .then(body=>body.json())
        .then(apiResponse=>this.setState({apiResponse}))
    }

    render(){

        return (
            <GridLayout 
                title={this.props.title || "File Metadata Microservice"}
            >
                <div className="mx-auto mb-3">Upload a file to view its metadata.</div>
    
                <UploadForm
                    supportsDragDrop = {this.state.dragDrop}
                    isDragActive={this.state.dragActive}
                    dragEnterHandler={this.dragEnterHandler.bind(this)}
                    dragOverHandler={this.dragOverHandler.bind(this)}
                    dragLeaveHandler={this.dragLeaveHandler.bind(this)}
                    dropHandler={this.dropHandler.bind(this)}
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
        case "Placeholder":
            return "Server response goes here."
        case "uploaded":
            return (
                <UploadedFileFeedback
                    name={metadata.name}
                    type={metadata.filetype}
                    size={metadata.size}
                    link={metadata.link}
                />
            )
        default:
            return null
    }
}


function supportsDragDrop(){
    const div = document.createElement("div")
    return (("draggable" in div) || ("ondragstart" in div && "ondrop" in div)) && 
    "FormData" in window && 
    "FileReader" in window
}