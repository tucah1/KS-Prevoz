import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { deleteFavoriteLine, getFavorites } from "../actions/user";
import { connect } from "react-redux";

import Spinner from "./Layout/Spinner";

const Favorites = ({
    getFavorites,
    favorites,
    loading,
    deleteFavoriteLine,
}) => {
    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="favorites">
                        <div className="background-wrapper">
                            <div className="background-col"></div>
                            <div className="background-wave"></div>
                        </div>
                        <div className="container mainContainer">
                            <div className="main-heading-wrapper">
                                <div className="main-heading-line">
                                    <div className="main-heading">
                                        Favorite lines
                                    </div>
                                </div>
                            </div>
                            {favorites.map((fav) => (
                                <Fragment key={fav.line_id}>
                                    <div className="row ">
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
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

Favorites.propTypes = {
    getFavorites: PropTypes.func.isRequired,
    deleteFavoriteLine: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    favorites: state.user.favorites,
    loading: state.loading.loading,
});

const mapDispatchToProps = { getFavorites, deleteFavoriteLine };

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
