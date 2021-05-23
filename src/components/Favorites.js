import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { deleteFavoriteLine, getFavorites } from "../actions/user";
import { connect } from "react-redux";

import Spinner from "./Layout/Spinner";
import ScheduleTable from "./Schedule/ScheduleTable";
import { getLineSchedulById } from "../actions/schedule";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";

const Favorites = ({
    getFavorites,
    favorites,
    loading,
    deleteFavoriteLine,
    getLineSchedulById,
}) => {
    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    const [openedSchedule, setopenedSchedule] = useState("");

    const toggleScheduleDisplay = (id) => {
        if (openedSchedule !== id) {
            setopenedSchedule(id);
            getLineSchedulById(id);
        } else {
            setopenedSchedule("");
        }
    };

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
                            {favorites.length !== 0 ? (
                                <>
                                    {favorites.map((fav) => (
                                        <Fragment key={fav.line_id}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="fav-item d-flex justify-content-between align-items-center">
                                                        <div
                                                            className="fav-item-left d-flex flex-row w-100"
                                                            onClick={() => {
                                                                toggleScheduleDisplay(
                                                                    fav.line_id
                                                                );
                                                            }}
                                                        >
                                                            <p className="fav-line-name">
                                                                {fav.from_point}{" "}
                                                                - {fav.to_point}
                                                            </p>
                                                            <p className="fav-line-type d-flex align-items-center">
                                                                {
                                                                    fav.transport_type
                                                                }
                                                            </p>
                                                        </div>
                                                        {openedSchedule ===
                                                        fav.line_id ? (
                                                            <Tooltip
                                                                title="Hide line schedule"
                                                                placement="top"
                                                                enterDelay={300}
                                                                leaveDelay={100}
                                                                arrow
                                                            >
                                                                <button
                                                                    className="fav-item-right mx-2"
                                                                    onClick={() => {
                                                                        setopenedSchedule(
                                                                            ""
                                                                        );
                                                                    }}
                                                                >
                                                                    {/* <i class="fas fa-trash"></i> */}
                                                                    <ExpandLessIcon />
                                                                </button>
                                                            </Tooltip>
                                                        ) : (
                                                            <>
                                                                <Tooltip
                                                                    title="Show line schedule"
                                                                    placement="top"
                                                                    enterDelay={
                                                                        300
                                                                    }
                                                                    leaveDelay={
                                                                        100
                                                                    }
                                                                    arrow
                                                                >
                                                                    <button
                                                                        className="fav-item-right mx-2"
                                                                        onClick={() => {
                                                                            toggleScheduleDisplay(
                                                                                fav.line_id
                                                                            );
                                                                        }}
                                                                    >
                                                                        {/* <i class="fas fa-trash"></i> */}
                                                                        <ExpandMoreIcon />
                                                                    </button>
                                                                </Tooltip>
                                                            </>
                                                        )}
                                                        <Tooltip
                                                            title="Delete line"
                                                            placement="top"
                                                            enterDelay={300}
                                                            leaveDelay={100}
                                                            arrow
                                                        >
                                                            <button
                                                                className="fav-item-right mx-2"
                                                                onClick={() => {
                                                                    deleteFavoriteLine(
                                                                        fav.line_id
                                                                    );
                                                                }}
                                                            >
                                                                {/* <i class="fas fa-trash"></i> */}
                                                                <DeleteForeverIcon />
                                                            </button>
                                                        </Tooltip>
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
                            ) : (
                                <>
                                    <div className="favorites-message">
                                        <p>
                                            You don't have any favorite lines
                                            yet. Search{" "}
                                            <a href="/#schedule">schedule</a>{" "}
                                            and add some!
                                        </p>
                                    </div>
                                </>
                            )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
