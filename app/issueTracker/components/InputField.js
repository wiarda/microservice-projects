import React from 'react'

export default function InputField(
    {inputName, displayName, inputType, feedback, autoComplete}
) {

    return (
        <div className="form-group">
            <label htmlFor={inputName}>{displayName}</label>
            <input id={inputName} className={`${feedback ? "is-invalid" : ""} form-control`} type={inputType} name={inputName} autoComplete={autoComplete} />
            <small
                className="form-text text-muted"
                data-visibility={feedback ? true : false}
            >
                {feedback}
            </small>
        </div>
    )

}