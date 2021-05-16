import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getAutocompleteResults,
    getLineSchedulById,
    getLineSchedulByNames,
    removeAutocompleteResults,
} from "../../actions/schedule";
import ScheduleTable from "./ScheduleTable";
import { useState } from "react";
import AutocompleteResults from "./AutocompleteResults";

export const Schedule = ({
    getLineSchedulByNames,
    getAutocompleteResults,
    removeAutocompleteResults,
    results,
}) => {
    //cleanup useEffect
    useEffect(() => {
        return () => {
            setisSelected({
                from_point: false,
                to_point: false,
            });
            setformData({ from_point: "", to_point: "" });
            setactiveInput(2);
        };
    }, []);

    //indicate which input field is currently active (focused)
    //used to render results for right input
    //2 ->non is active, 0 -> from input active, 1 -> to input active
    const [activeInput, setactiveInput] = useState(2);
    const [formData, setformData] = useState({ from_point: "", to_point: "" });

    const { from_point, to_point } = formData;

    const onInputChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.value === "" || isSelected[e.target.name]) {
            setisSelected({ ...isSelected, [e.target.name]: false });
        }
        if (
            e.target.value.length > 0 ||
            isSelected.to_point ||
            isSelected.from_point
        ) {
            getAutocompleteResults({
                ...formData,
                [e.target.name]: e.target.value,
                active: activeInput,
            });
        } else {
            // removeAutocompleteResults();
            setisSelected({ ...isSelected, [e.target.name]: false });
        }
    };

    const resetAutocomplete = (e, input) => {
        if (isSelected.from_point || isSelected.to_point) {
            getAutocompleteResults({
                ...formData,
                [e.target.name]: e.target.value,
                active: input,
            });
        }
        // } else {
        //     removeAutocompleteResults();
        // }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setactiveInput(2);
        getLineSchedulByNames(formData);
    };

    const onResultItemClick = (point, val) => {
        setformData({ ...formData, [point]: val });
        setisSelected({ ...isSelected, [point]: true });
        setactiveInput(2);
    };

    //check when both points are selected from results list
    const [isSelected, setisSelected] = useState({
        from_point: false,
        to_point: false,
    });

    useEffect(() => {
        if (isSelected.from_point && isSelected.to_point) {
            getLineSchedulByNames(formData);
        }
    }, [isSelected]);

    return (
        <>
            <div className="container" id="schedule">
                <div className="schedule-search">
                    <form
                        className="d-flex flex-wrap justify-content-center"
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                    >
                        <div className="search-wrap">
                            <input
                                type="text"
                                name="from_point"
                                className="schedule-search-input"
                                placeholder="Starting point"
                                autoComplete="off"
                                spellCheck={false}
                                value={from_point}
                                minLength={2}
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                                onFocus={(e) => {
                                    setactiveInput(0);
                                    resetAutocomplete(e, 0);
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setactiveInput(2);
                                    }, 150);
                                }}
                                required
                            />
                            {!isSelected.from_point &&
                                activeInput === 0 &&
                                results && (
                                    <AutocompleteResults
                                        results={results}
                                        point="from_point"
                                        onClickFunc={onResultItemClick}
                                    />
                                )}
                        </div>

                        <button className="schedule-search-btn">
                            <i className="fas fa-search"></i>
                        </button>
                        <div className="search-wrap">
                            <input
                                type="text"
                                name="to_point"
                                className="schedule-search-input"
                                placeholder="Destination"
                                autoComplete="off"
                                spellCheck={false}
                                minLength={2}
                                value={to_point}
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                                onFocus={(e) => {
                                    setactiveInput(1);
                                    resetAutocomplete(e, 1);
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setactiveInput(2);
                                    }, 150);
                                }}
                                required
                            />
                            {!isSelected.to_point &&
                                activeInput === 1 &&
                                results && (
                                    <AutocompleteResults
                                        results={results}
                                        point="to_point"
                                        onClickFunc={onResultItemClick}
                                    />
                                )}
                        </div>
                    </form>
                </div>
                <div className="schedule-table-wrapper position-relative d-flex justify-content-center align-items-center flex-column">
                    <ScheduleTable showFavorite={true} />
                </div>
            </div>
        </>
    );
};

Schedule.propTypes = {
    // props: PropTypes,
};

const mapStateToProps = (state) => ({
    results: state.schedule.results,
});

const mapDispatchToProps = {
    getLineSchedulByNames,
    getAutocompleteResults,
    removeAutocompleteResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
