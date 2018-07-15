import React from 'react'
import {hydrate} from 'react-dom/server'

console.log("hydrating")

hydrate(<div>Component goes here</div>, document.getElementById("root"))
