import React from 'react'

export default class ApiInstructions extends React.Component{
    constructor(props){
        super(props)
        this.toggleInstructions = this.toggleInstructions.bind(this)
        this.state = {expanded:"collapse",expandedHeight:null}
    }
    
    toggleInstructions(){
        console.log("toggling")
        let expanded = this.state.expanded === "expand" ? "collapse" : "expand"
        this.setState({expanded})
    }

    render(){
        console.log("rendering")
        
        
        return (
            <div 
                className="api-instructions__block" 
                id="instructions-block"
            >
                
                <div 
                    className="api-instructions__container" 
                    data-state={this.state.expanded}
                    onClickCapture={this.toggleInstructions} 
                />

                <div className="row no-gutters position-relative api-instructions__button-row" data-state={this.state.expanded}>

                    <button 
                        onClick={this.toggleInstructions} 
                        className="api-instructions__button" 
                        data-state={this.state.expanded}
                    >
                        <span>API Instructions </span>
                        <i 
                            className="align-middle material-icons api-instructions__icon"
                            data-state={this.state.expanded}
                        >
                            expand_more
                        </i>
                    </button>
                </div>
              
                <div className="p3"></div>
                
                <div 
                    id="api-instructions" 
                    data-state={this.state.expanded} 
                    className="api-instructions__text mx-2"
                >
                    
                    {this.props.children}

                    <div className="p-1"/>
                </div>
        
            </div>
        )
    }
}