import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getAutocompleteResults,
    getLineSchedulById,
} from "../../actions/schedule";
import ScheduleTable from "./ScheduleTable";
import { useState } from "react";
import AutocompleteResults from "./AutocompleteResults";

export const Schedule = ({
    getLineSchedulById,
    getAutocompleteResults,
    results,
}) => {
    useEffect(() => {
        // getLineSchedulById("77d7683c-cc51-402d-b343-941548f3ce03");
        // getLineSchedulById("84bb2ff4-f056-4515-962e-8c0e649c924a");
    }, []);

    //indicate which input field is currently active (focused)
    //used to render results for right input
    //2 ->non is active, 0 -> from input active, 1 -> to input active
    const [activeInput, setactiveInput] = useState(2);
    const [formData, setformData] = useState({ from_point: "", to_point: "" });

    const { from_point, to_point } = formData;

    const onInputChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.value.length > 1) {
            getAutocompleteResults({
                ...formData,
                [e.target.name]: e.target.value,
                active: activeInput,
            });
        }
    };

    return (
        <>
            <div className="container" id="schedule">
                <div className="schedule-search">
                    <form className="d-flex flex-wrap justify-content-center">
                        <div className="search-wrap">
                            <input
                                type="text"
                                name="from_point"
                                className="schedule-search-input"
                                placeholder="Starting point"
                                autoComplete="off"
                                value={from_point}
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                                onFocus={() => {
                                    setactiveInput(0);
                                }}
                                onBlur={() => {
                                    setactiveInput(2);
                                }}
                                required
                            />
                            {activeInput === 0 && results && (
                                <AutocompleteResults results={results} />
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
                                value={to_point}
                                onChange={(e) => {
                                    onInputChange(e);
                                }}
                                onFocus={() => {
                                    setactiveInput(1);
                                }}
                                onBlur={() => {
                                    setactiveInput(2);
                                }}
                                required
                            />
                            {activeInput === 1 && results && (
                                <AutocompleteResults results={results} />
                            )}
                        </div>
                    </form>
                </div>
                <div className="schedule-table-wrapper d-flex justify-content-center align-items-center flex-column">
                    <ScheduleTable />
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
    getLineSchedulById,
    getAutocompleteResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
