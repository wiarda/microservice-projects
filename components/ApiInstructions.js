import React from 'react'

export default class ApiInstructions extends React.Component{
    constructor(props){
        super(props)
        this.toggleInstructions = this.toggleInstructions.bind(this)
        this.state = {expanded:"collapse",expandedHeight:null}
    }
    
    componentDidMount(){
        this.deriveHeight()
    }

    toggleInstructions(){
        console.log("toggling")
        let expanded = this.state.expanded === "expand" ? "collapse" : "expand"
        this.setState({expanded})
    }

    deriveHeight(){
        console.log("let's check the height of the bounding size of the box", 
        document.getElementById("api-instructions").getBoundingClientRect())
    }

    render(){
        console.log("rendering")
        
        
        return (
            <div 
                className="api-instructions__block mx-3" 
                id="instructions-block"
            >
                
                <div 
                    className="api-instructions__container mx-3" 
                    data-state={this.state.expanded}
                    onClickCapture={this.toggleInstructions} 
                />

                <div className="row mx-3 position-relative api-instructions__button-row" data-state={this.state.expanded}>

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
                    className="api-instructions__text mx-4"
                >
                    Instructions go here
                    <br/>
                    <br/>
                    <br/>
                    and
                    they
                    <br/>
                    <br/>
                    are
                    <br/>
                    really
                    <br/>
                    long
                    <br/>
                    !
                </div>
        
            </div>
        )
    }
}