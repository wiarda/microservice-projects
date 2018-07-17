import React from 'react'

export default function SelectOptions({optionsArray,selection}){
    let options = optionsArray.map((option,index)=>{
        let content = Array.isArray(option) ? option[0] : option
        let value = Array.isArray(option) ? option[1] : option

        return (
            <option value={value} key={content}>{content}</option>
        )
    })

    return options
}