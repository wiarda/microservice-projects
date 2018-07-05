import ReactDOM from 'react-dom'
import React from 'react'
import UrlShortener from 'Components/shortener/UrlShortener'


console.log("hydrating")

ReactDOM.hydrate(<UrlShortener/>, document.getElementById("root"))

