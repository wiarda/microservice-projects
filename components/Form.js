import React from 'react'

export default function Form({submitHandler
    ,fieldValue
    ,fieldClickHandler
    ,fieldInputHandler
    ,submitButtonText
    ,action="/"}){
    
        return (
            <form 
                style={{"minWidth": "500px"}} 
                className="mx-auto" 
                onSubmit={submitHandler}
                action={action}
                method="post" 
            >
                <input 
                    className="w-100" 
                    type="text" 
                    id="url" 
                    name="url" 
                    value={fieldValue} 
                    onClick={fieldClickHandler} 
                    onChange={fieldInputHandler}
                />        
                <div className="button mt-3 text-center">
                    <button className="btn btn-primary" type="submit">{submitButtonText}</button>
                </div>
            </form>
        )
}

