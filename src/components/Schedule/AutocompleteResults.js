import React from "react";

function AutocompleteResults({ results, point, onClickFunc }) {
    return (
        <>
            <div className="results d-flex flex-column align-items-center">
                {results &&
                    results.map((res, index) => (
                        <div
                            key={index}
                            className="res-item"
                            onClick={() => {
                                onClickFunc(point, res);
                            }}
                        >
                            {res}
                        </div>
                    ))}
            </div>
        </>
    );
}

export default AutocompleteResults;
