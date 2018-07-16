import React from 'react'
import ReactDOM from 'react-dom'
import CookingConverter from './components/CookingConverter'
import styles from './converter.scss'

console.log("hydrating")

ReactDOM.hydrate(<CookingConverter/>, document.getElementById("root"))
