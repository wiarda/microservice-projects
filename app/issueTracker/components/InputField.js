import React from 'react'

export default function InputField(
    {inputName, displayName, inputType, feedback, autoComplete, onChange=null,children=null}
) {

    return (
        <div className="form-group position-relative">
            <label htmlFor={inputName}>{displayName}</label>
            <input id={inputName} className={`${feedback ? "is-invalid" : ""} form-control`} type={inputType} name={inputName} onChange={onChange} autoComplete={autoComplete} />
            <small
                className="form-text text-muted"
                data-visibility={feedback ? true : false}
            >
                {feedback}
            </small>
            {children}
        </div>
    )

}