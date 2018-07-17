import React from 'react'

export default function Title({text=null}){
    return (
        <h1 className="mx-auto text-center">{text}</h1>
    )
}