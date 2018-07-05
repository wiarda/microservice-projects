import React from 'react'
import Row from './Row'

export default function ServerResponse({apiResponse, parser}){
    
    // console.log("ServerResponse:",apiResponse)

    let contents = (
        <div style={{maxWidth:"500px"}} className="mx-auto">
            {parser(apiResponse)}
        </div>
        )
    
    return apiResponse ? 
    (
        <div className="container-fluid">
            <div className="row py-3"></div>
            <Row contents={contents}/>
            
        </div>
    ) : null
}