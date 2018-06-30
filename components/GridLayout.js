import React from 'react'


export default function GridLayout(props){
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-0 col-sm-1 col-lg-2"></div>    
                
                <div className="col-0 col-sm-1 col-lg-2">
                    
                    <div className="row">{props.title}</div>
                    
                    <div className="row py-3"></div>
                    
                    <div className="row">{props.content}</div>
                                 
                </div>                 
                
                <div className="col-0 col-sm-1 col-lg-2"></div>    
            </div>
        </div>   
    )
}
