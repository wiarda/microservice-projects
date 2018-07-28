import React from 'react'
import Title from './Title'
import Children from './Children'

export default class GridLayout extends React.Component{
    constructor(props){
        super(props)
    }
      
    render(){

        let title = this.props.title ? (
            <div className="row mt-5">
                <Title text={this.props.title}/>
            </div>
            ) :
            null

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-0 col-sm-1 col-lg-2"></div>    
                    
                    <div className="col-12 col-sm-10 col-lg-8">
                        
                        {title}
                        
                        <div className="row py-3"></div>
                        
                        <Children 
                            children={this.props.children}
                            minWidth={this.props.minWidth}
                        />
                        
                    </div>                 
                    
                    <div className="col-0 col-sm-1 col-lg-2"></div>    
                </div>
            </div>   
        )
    }
}
