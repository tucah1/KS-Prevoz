import React, {
    useState,
    useMemo,
    useCallback,
    useRef,
    useEffect,
} from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";

const Map = () => {
    //map
    const mapOptions = useMemo(() => {
        return {
            gestureHandling: "greedy",
            zoom: 13,
            center: {
                lat: 43.84662290995682,
                lng: 18.354884835620837,
            },
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
        };
    }, []);

    const onMapClick = (e) => {
        if (originRef.current.value === "") {
            originRef.current.value =
                e.latLng.lat().toFixed(7) + ", " + e.latLng.lng().toFixed(7);
            setState({ ...state, origin: e.latLng });
        } else if (destinationRef.current.value === "") {
            destinationRef.current.value =
                e.latLng.lat().toFixed(7) + ", " + e.latLng.lng().toFixed(7);
            setState({ ...state, destination: e.latLng });
        }
    };

    //autocomplete
    const originRef = useRef();
    const destinationRef = useRef();
    const changeOriginDestination = (value, name) => {
        setState({
            ...state,
            [name]: value,
        });
    };
    //direction service
    const [state, setState] = useState({
        origin: "",
        destination: "",
    });

    const [response, setresponse] = useState(null);
    const { origin, destination } = state;

    const directionsCallback = useCallback((res) => {
        if (res !== null) {
            if (res.status === "OK") {
                setresponse(res);
            } else {
                console.log("response: ", res);
            }
        }
    }, []);

    const directionsServiceOptions = useMemo(() => {
        return {
            destination: destination,
            origin: origin,
            travelMode: "TRANSIT",
            provideRouteAlternatives: true,
            optimizeWaypoints: true,
            // transitOptions: { routingPreference: "LESS_WALKING" },
        };
    }, [destination, origin]);

    //direction renderer
    const directionsRendererOptions = useMemo(() => {
        return {
            directions: response,
            draggable: true,
            panel: document.getElementById("panel"),
        };
    }, [response]);

    const [autocompleteOptions] = useState({
        bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(
                43.76880279151828,
                18.195625232847878
            ),
            new window.google.maps.LatLng(43.92163144451796, 18.443906243492375)
        ),
        strictBounds: true,
        fields: ["geometry.location"],
    });

    //togglepanel
    const [hidePanel, sethidePanel] = useState(false);

    return (
        <>
            <div className="map">
                <div className="map-container">
                    <GoogleMap
                        id={process.env.REACT_APP_GOOGLE_API_KEY}
                        mapContainerStyle={{
                            height: "85vh",
                            width: "100%",
                            borderRadius: "20px",
                        }}
                        options={mapOptions}
                        onClick={(e) => {
                            onMapClick(e);
                        }}
                    >
                        <div
                            id="panel"
                            className={
                                hidePanel
                                    ? "d-flex flex-column hidePanel"
                                    : "d-flex flex-column"
                            }
                        >
                            <div id="input-section">
                                <AutoCompleteInput
                                    name="origin"
                                    placeholder="Type starting point or click on the map..."
                                    onChangePlace={changeOriginDestination}
                                    opts={autocompleteOptions}
                                    refInput={originRef}
                                />
                                <AutoCompleteInput
                                    name="destination"
                                    placeholder="Type destination or click on the map..."
                                    onChangePlace={changeOriginDestination}
                                    opts={autocompleteOptions}
                                    refInput={destinationRef}
                                />
                            </div>
                            <button
                                id="togglePanel"
                                onClick={() => {
                                    sethidePanel(!hidePanel);
                                }}
                            >
                                {hidePanel ? (
                                    <i className="fas fa-arrow-right"></i>
                                ) : (
                                    <i className="fas fa-arrow-left"></i>
                                )}
                            </button>
                        </div>

                        {destination !== "" && origin !== "" && (
                            <DirectionsService
                                options={directionsServiceOptions}
                                callback={directionsCallback}
                            />
                        )}

                        {response !== null && (
                            <DirectionsRenderer
                                routeIndex={2}
                                options={directionsRendererOptions}
                            />
                        )}
                    </GoogleMap>
                </div>
            </div>
        </>
    );
};

export default Map;
