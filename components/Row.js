import React from 'react'

export default function Row({contents=null, minWidth="500px"}){
    console.log(minWidth)
    return (
        <div className="row">
            <div className="mx-auto" style={{minWidth}}>{contents}</div>
        </div>
    )
}