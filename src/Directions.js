import React, { useState, useRef } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";

const Directions = () => {
    const [state, setState] = useState({
        response: null,
        travelMode: "TRANSIT",
        origin: "sarajevo",
        destination: "",
    });
    const { response, travelMode, origin, destination } = state;

    const directionsCallback = (res) => {
        console.log(res);

        setState({ ...state, origin: "", destination: "" });

        if (res !== null) {
            if (res.status === "OK") {
                setState({ ...state, response: res });
            } else {
                console.log("response: ", res);
            }
        }
    };

    const changeOriginDestination = (value, name) => {
        setState({
            ...state,
            [name]: value,
        });
    };

    return (
        <div className="map">
            <div className="map-settings">
                <AutoCompleteInput
                    name="origin"
                    placeholder="From point"
                    onChangePlace={changeOriginDestination}
                />
                <AutoCompleteInput
                    name="destination"
                    placeholder="To point"
                    onChangePlace={changeOriginDestination}
                />
            </div>

            <div className="map-container">
                <GoogleMap
                    id={process.env.REACT_APP_GOOGLE_API_KEY}
                    mapContainerStyle={{
                        height: "600px",
                        width: "100%",
                    }}
                    zoom={12}
                    center={{
                        lat: 43.85283490767446,
                        lng: 18.39127894082131,
                    }}
                >
                    {destination !== "" && origin !== "" && (
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: origin,
                                travelMode: travelMode,
                                provideRouteAlternatives: true,
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {response !== null && (
                        <DirectionsRenderer
                            options={{
                                directions: response.routes,
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Directions;
