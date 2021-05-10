import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const Schedule = (props) => {
    return (
        <>
            <div className="cntainer">
                <div className="schedule-search">
                    <form className="d-flex justify-content-center">
                        <input type="text" name="fromPoint" />
                        <input type="text" name="toPoint" />
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

Schedule.propTypes = {
    // props: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
