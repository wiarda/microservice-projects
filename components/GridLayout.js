import React from 'react'


export default function GridLayout({title,content,sampleOutput=null}){
    let output = sampleOutput ? 
    (
        <React.Fragment>
            <div className="row mt-3">Sample output:</div>
            <div className="row">{JSON.stringify(sampleOutput)}</div>
        </React.Fragment>
    ):
    null
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-0 col-sm-1 col-lg-2"></div>    
                
                <div className="col-12 col-sm-10 col-lg-8">
                    
                    <div className="row mt-5">{title}</div>
                    
                    <div className="row py-3"></div>
                    
                    <div className="row">{content}</div>
                    
                    {output}
                                 
                </div>                 
                
                <div className="col-0 col-sm-1 col-lg-2"></div>    
            </div>
        </div>   
    )
}
