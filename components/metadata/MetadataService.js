import React from 'react'
import GridLayout from '../GridLayout'
import UploadForm from '../UploadForm'
import ServerResponse from '../ServerResponse'



export default class MetaDataService extends React.Component{
    constructor(props){
        super(props)
        this.state = {dragDrop: false}
    }

    componentDidMount(){
        // register listeners on drop area
        this.setState({dragDrop: supportsDragDrop()})
    }

    render(){

        return (
            <GridLayout 
                title={this.props.title || "File Metadata Microservice"}
            >
                <div className="mx-auto mb-3">Upload a file to view its metadata.</div>
    
                <UploadForm
                    supportsDragDrop = {this.state.dragDrop}
                />
    
                <ServerResponse
                    apiResponse={{type:"Placeholder"}}
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
    }
}

function supportsDragDrop(){
    const div = document.createElement("div")
    return (("draggable" in div) || ("ondragstart" in div && "ondrop" in div)) && 
    "FormData" in window && 
    "FileReader" in window
}