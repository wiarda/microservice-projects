import React from 'react'

export default function InputField(
    {inputName, displayName, inputType, feedback, autocomplete}
) {

    return (
        <div className="form-group">
            <label htmlFor={inputName}>{displayName}</label>
            <input id={inputName} className={`${feedback ? "is-invalid" : ""} form-control`} type={inputType} name={inputName} autoComplete={autocomplete} />
            <small
                className="form-text text-muted"
                data-visibility={feedback ? true : false}
            >
                {feedback}
            </small>
        </div>
    )

}