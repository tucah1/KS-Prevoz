import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { deleteFavoriteLine, getFavorites } from "../actions/user";
import { connect } from "react-redux";

import Spinner from "./Layout/Spinner";
import ScheduleTable from "./Schedule/ScheduleTable";
import { getLineSchedulById, removeLineSchedule } from "../actions/schedule";

const Favorites = ({
    getFavorites,
    favorites,
    loading,
    deleteFavoriteLine,
    getLineSchedulById,
    removeLineSchedule,
}) => {
    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    const [openedSchedule, setopenedSchedule] = useState("");

    return (
        <>
            <div className="favorites">
                <div className="background-wrapper">
                    <div className="background-col"></div>
                    <div className="background-wave"></div>
                </div>
                <div className="container mainContainer">
                    <div className="main-heading-wrapper">
                        <div className="main-heading-line">
                            <div className="main-heading">Favorite lines</div>
                        </div>
                    </div>
                    {loading ? (
                        <Spinner small={true} />
                    ) : (
                        <>
                            {favorites.map((fav) => (
                                <Fragment key={fav.line_id}>
                                    <div
                                        className="row"
                                        onClick={() => {
                                            if (
                                                openedSchedule !== fav.line_id
                                            ) {
                                                removeLineSchedule();
                                                setopenedSchedule(fav.line_id);
                                                getLineSchedulById(fav.line_id);
                                            }
                                        }}
                                    >
                                        <div className="col-12">
                                            <div className="fav-item d-flex justify-content-between align-items-center">
                                                <div className="fav-item-left d-flex flex-row">
                                                    <p className="fav-line-name">
                                                        {fav.from_point} -{" "}
                                                        {fav.to_point}
                                                    </p>
                                                    <p className="fav-line-type">
                                                        {fav.transport_type}
                                                    </p>
                                                </div>
                                                <button
                                                    className="fav-item-right"
                                                    onClick={() => {
                                                        deleteFavoriteLine(
                                                            fav.line_id
                                                        );
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {openedSchedule === fav.line_id && (
                                        <div className="schedule-table-favorites d-flex justify-content-center align-items-center flex-column ">
                                            <ScheduleTable />
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

Favorites.propTypes = {
    getFavorites: PropTypes.func.isRequired,
    deleteFavoriteLine: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    getLineSchedulById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    favorites: state.user.favorites,
    loading: state.loading.loading,
});

const mapDispatchToProps = {
    getFavorites,
    deleteFavoriteLine,
    getLineSchedulById,
    removeLineSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
