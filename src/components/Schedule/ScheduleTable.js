import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import WeekDayButton from "./WeekdayButton";
import { removeLineSchedule } from "../../actions/schedule";
import { Pagination } from "@material-ui/lab";
import { addFavoriteLine, deleteFavoriteLine } from "../../actions/user";

export const ScheduleTable = ({
    schedule,
    loading,
    removeLineSchedule,
    addFavoriteLine,
    deleteFavoriteLine,
    userLevel,
    lineInfo: { from_point, to_point, favorite, line_id, transport_type },
    showFavorite,
}) => {
    useEffect(() => {
        if (schedule.weekday1) {
            calculateColumns(schedule.weekday1.length);
            paginationConfig(schedule.weekday1, schedule.weekday2, 1);
        }
        setisFavorite(favorite);
    }, [schedule]);

    //cleanup useEffect
    useEffect(() => {
        return () => {
            removeLineSchedule();
        };
    }, []);

    //isLine Favorite
    const [isFavorite, setisFavorite] = useState(false);

    const [displayedData, setdisplayedData] = useState({
        from: [],
        to: [],
    });

    const { from, to } = displayedData;

    const [selectedDay, setselectedDay] = useState("weekday");

    const onChangeDay = (e) => {
        setselectedDay(e.target.name);
        // setdisplayedData({
        //     from: schedule[e.target.name + "1"],
        //     to: schedule[e.target.name + "2"],
        // });
        calculateColumns(schedule[e.target.name + "1"]);
        paginationConfig(
            schedule[e.target.name + "1"],
            schedule[e.target.name + "2"],
            1
        );
    };

    //table size config
    const [numberOfColumns, setnumberOfColumns] = useState(1);

    const calculateColumns = (arrLen) => {
        if (arrLen <= 10) {
            setnumberOfColumns(1);
        } else if (arrLen > 10 && arrLen <= 20) {
            setnumberOfColumns(2);
        } else if (arrLen > 20 && arrLen <= 30) {
            setnumberOfColumns(3);
        } else if (arrLen > 30) {
            setnumberOfColumns(4);
        }
    };

    const [pagesConfig, setpagesConfig] = useState({
        totalPages: 1,
        currentPage: 1,
    });

    const { currentPage, totalPages } = pagesConfig;

    const paginationConfig = (fromArr, toArr, page) => {
        if (fromArr.length > 40) {
            setpagesConfig({
                currentPage: page,
                totalPages: Math.ceil(fromArr.length / 40),
            });
            let startIndex = page * 40 - 40;
            let fromEndIndex =
                page * 40 - 1 > fromArr.length
                    ? fromArr.length - 1
                    : page * 40 - 1;

            let toEndIndex =
                page * 40 - 1 > toArr.length ? toArr.length - 1 : page * 40 - 1;

            setdisplayedData({
                from: fromArr.slice(startIndex, fromEndIndex + 1),
                to: toArr.slice(startIndex, toEndIndex + 1),
            });
        } else {
            setdisplayedData({
                from: fromArr,
                to: toArr,
            });
            setpagesConfig({ totalPages: 1, currentPage: 1 });
        }
    };

    const onPageChange = (page) => {
        setpagesConfig({ ...pagesConfig, currentPage: page });
        paginationConfig(
            schedule[selectedDay + "1"],
            schedule[selectedDay + "2"],
            page
        );
    };

    return (
        <>
            {loading ? (
                <Spinner small={true} />
            ) : (
                <>
                    {from.length !== 0 &&
                    to.length !== 0 &&
                    schedule.weekday1 ? (
                        <>
                            <div className="scheduletable-days-btns d-flex justify-content-center align-items-center flex-wrap">
                                <WeekDayButton
                                    name="weekday"
                                    displayName="Week day"
                                    isDisabled={
                                        schedule.weekday1.length === 0 &&
                                        schedule.weekday2.length === 0
                                    }
                                    onChangeFunc={onChangeDay}
                                    isChecked={selectedDay === "weekday"}
                                />
                                <WeekDayButton
                                    name="saturday"
                                    displayName="Saturday"
                                    isDisabled={
                                        schedule.saturday1.length === 0 &&
                                        schedule.saturday2.length === 0
                                    }
                                    onChangeFunc={onChangeDay}
                                    isChecked={selectedDay === "saturday"}
                                />
                                <WeekDayButton
                                    name="sunday"
                                    displayName="Sunday"
                                    isDisabled={
                                        schedule.sunday1.length === 0 &&
                                        schedule.sunday2.length === 0
                                    }
                                    onChangeFunc={onChangeDay}
                                    isChecked={selectedDay === "sunday"}
                                />
                            </div>
                            {userLevel === 1 && showFavorite && (
                                <div className="favorite-btn">
                                    {isFavorite ? (
                                        <button
                                            onClick={() => {
                                                deleteFavoriteLine(line_id);
                                                setisFavorite(false);
                                            }}
                                        >
                                            {" "}
                                            <i className="fas fa-star"></i>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                addFavoriteLine(line_id);
                                                setisFavorite(true);
                                            }}
                                        >
                                            {" "}
                                            <i className="far fa-star"></i>
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="d-flex justify-content-center">
                                <h4 className="table-transtype">
                                    {transport_type}{" "}
                                </h4>
                            </div>
                            <div className="d-flex justify-content-center flex-column schedule-table">
                                <div className="d-flex flex-wrap justify-content-center schedule-table-main">
                                    <div className="d-flex flex-column align-items-center table-left">
                                        <h3 className="table-heading">
                                            {" "}
                                            {from_point}{" "}
                                        </h3>
                                        <div
                                            className={`grid col${numberOfColumns}`}
                                        >
                                            {from.map((item, index) => (
                                                <Fragment key={index}>
                                                    <p className="table-cell d-flex align-items-center justify-content-center ">
                                                        {" "}
                                                        {item}{" "}
                                                    </p>
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="d-flex  flex-column align-items-center table-right">
                                        <h3 className="table-heading">
                                            {to_point}{" "}
                                        </h3>
                                        <div
                                            className={`grid col${numberOfColumns}`}
                                        >
                                            {to.map((item, index) => (
                                                <Fragment key={index}>
                                                    <p className="table-cell d-flex align-items-center justify-content-center">
                                                        {" "}
                                                        {item}{" "}
                                                    </p>
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {totalPages !== 1 && (
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        classes={{
                                            root: "pagination",
                                            ul: "pagination-item",
                                        }}
                                        onChange={(e, page) => {
                                            onPageChange(page);
                                        }}
                                        color="primary"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {!showFavorite ? (
                                <Spinner small={true} />
                            ) : (
                                <div className="schedule-message">
                                    Search for your starting point and
                                    destination!
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

ScheduleTable.propTypes = { removeLineSchedule: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
    loading: state.schedule.loadingSchedule,
    schedule: state.schedule.schedule,
    lineInfo: state.schedule.lineInfo,
    userLevel: state.auth.userLevel,
});

const mapDispatchToProps = {
    removeLineSchedule,
    addFavoriteLine,
    deleteFavoriteLine,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTable);
