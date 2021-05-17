import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AutoCompleteInput = ({ placeholder, name, onChangePlace }) => {
    //autocomplete instance, used to initialize autocomplete component
    const [autocomplete, setautocomplete] = useState(null);

    const onLoad = (atcomplete) => {
        setautocomplete(atcomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const obj = autocomplete.getPlace();
            if (obj !== null) {
                console.log(obj);
                const lat = obj.geometry.location.lat();
                const lng = obj.geometry.location.lng();
                onChangePlace({ lat, lng }, name);
            }
        } else {
            console.log("Autocomplete is not loaded yet!");
        }
    };

    return (
        <>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input type="text" placeholder={placeholder} />
            </Autocomplete>
        </>
    );
};

export default AutoCompleteInput;
