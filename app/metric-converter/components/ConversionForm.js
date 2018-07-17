import React from 'react'
import SelectOptions from '../../../components/SelectOptions'

export default function ConversionForm(props){
    return (
        <form
            action="/request" 
            className="mx-auto w-75"
            style={{minWidth:props.minWidth}}
            method="get"
            onSubmit={props.submitHandler}
        >
            <div className="form-group form-row">
                <div className="col-4 p-1">
                    <input 
                        onChange={props.inputHandler}
                        onClick={props.defaultTextHandler} 
                        id="amount"
                        name="amount"  
                        type="text" 
                        className={`form-control ${props.amountValidity}`} 
                        value={props.amount}
                    />
                    <small id="amountHelp" className="form-text text-muted text-center">
                        {props.amountValidity == "is-invalid" ? "Please enter a number" : ""}
                    </small>
                </div>

                <div className="col-4 p-1">
                    <select 
                        onChange={e=>props.changeHandler(e,"from")}
                        id="from" 
                        name="unitFrom" 
                        type="text" 
                        className={`form-control ${props.fromValidity}`}
                        value={props.from} 
                    >
                        <SelectOptions optionsArray={props.optionsFrom}/>
                    </select>
                    <small id="fromHelp" className="form-text text-muted text-center">
                        {props.fromValidity == "is-invalid" ? "Please select a unit" : ""}
                    </small>
                </div>

                <div className="col-4 p-1">
                    <select 
                        onChange={e=>props.changeHandler(e,"to")}
                        id="to" 
                        name="unitTo" 
                        type="text" 
                        className={`form-control ${props.toValidity}`}
                        value={props.to}
                    >
                        <SelectOptions optionsArray={props.optionsTo}/>
                    </select>
                    <small id="toHelp" className="form-text text-muted text-center" style={{minHeight:"20px"}}>
                        {props.toValidity == "is-invalid" ? "Please select a unit" : ""}
                    </small>
                </div>
            </div>
            <div className="form-row mt-3">
                <button 
                    className="btn btn-primary mx-auto" 
                    type="submit"
                    onClick={props.submitHandler}
                >
                Convert
                </button>
            </div>
        </form>
    )
}


