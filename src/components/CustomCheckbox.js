import React, {useState} from 'react';

function CustomCheckbox({
                            style,
                            isChecked,
                            setIsChecked
                        }) {

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div
            className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
            onClick={toggleCheckbox}
        >
            <div
                className="checkbox-box"
            >
                {isChecked && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={style.mark} width="18px" height="18px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                )}
            </div>
            <span style={{color: style.color}}>
                Employed
            </span>
        </div>
    );
}

export default CustomCheckbox;
