import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ml from '../measures'

export default class CookingConverter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <GridLayout
                title="Cooking Measurements Converter"
            >
            <div>Conversion form and content go here</div>
            </GridLayout>
        )
    }
}