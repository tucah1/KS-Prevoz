import React from "react";

function AutocompleteResults({ results }) {
    return (
        <>
            <div className="results">
                {results &&
                    results.map((res, index) => (
                        <div key={index} className="res-item">
                            {res}
                        </div>
                    ))}
            </div>
        </>
    );
}

export default AutocompleteResults;
