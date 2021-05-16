import React from "react";

function WeekdayButton({
    name,
    displayName,
    isDisabled,
    isChecked,
    onChangeFunc,
}) {
    return (
        <>
            <label htmlFor={name} className="radio-button">
                <input
                    type="radio"
                    name={name}
                    id={name}
                    disabled={isDisabled}
                    checked={isChecked}
                    onChange={(e) => {
                        onChangeFunc(e);
                    }}
                />
                <span>{displayName}</span>
            </label>
        </>
    );
}

export default WeekdayButton;
