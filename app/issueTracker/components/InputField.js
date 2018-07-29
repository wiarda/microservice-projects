import React from 'react'

export default function InputField({
    inputName
    , validity
    , displayName
    , inputType
    , feedback
    , autoComplete
    , onChange = null
    , onClick = null
    , children = null
    , onBlur = null
}) {
    return (
        <div className="form-group position-relative">
            <label htmlFor={inputName}>{displayName}</label>
            <input
                type={inputType}
                id={inputName}
                name={inputName}
                className={`${validity} form-control`}
                onChange={onChange}
                onClick={onClick}
                autoComplete={autoComplete}
                onBlur={onBlur? e=>onBlur(e.target.value,inputName):null}
            />
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