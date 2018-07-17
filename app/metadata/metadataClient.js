import React from 'react'
import ReactDOM from 'react-dom'
import MetadataService from "Components/metadata/MetadataService"
import commonStyles from 'App/shared/styles/main.scss'
import styles from "App/metadata/metadata.scss"

console.log("hydrating")

ReactDOM.hydrate(<MetadataService/>, document.getElementById("root"))
