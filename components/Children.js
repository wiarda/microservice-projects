import React from 'react'
import Row from './Row'

export default class Children extends React.PureComponent{

    render(){
        if (Array.isArray(this.props.children)){
            return this.props.children.map((el,i)=>{
                return <Row key={i} contents={el}/>
            })
        }
        else {
            return <Row contents={this.props.children}/>
        }    
    }

}