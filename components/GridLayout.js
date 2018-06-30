import React from 'react'


export default function GridLayout({title,content}){
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-0 col-sm-1 col-lg-2"></div>    
                
                <div className="col-0 col-sm-1 col-lg-2">
                    
                    <div className="row">{title}</div>
                    
                    <div className="row py-3"></div>
                    
                    <div className="row">{content}</div>
                                 
                </div>                 
                
                <div className="col-0 col-sm-1 col-lg-2"></div>    
            </div>
        </div>   
    )
}
