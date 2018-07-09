import React from 'react'
import ReactDOM from 'react-dom'
import MetadataService from "Components/metadata/MetadataService"

console.log("hydrating")

ReactDOM.hydrate(<MetadataService/>, document.getElementById("root"))
