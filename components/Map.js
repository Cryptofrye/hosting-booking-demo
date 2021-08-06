import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});
    
    //Transform the search results object into the { latiitude: 52.516272, lngiitude: 13.3777722 } object
    
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    
    
    //  The latitude and longitude f the center of locationis coordenates
    const center = getCenter(coordinates);
    

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/ferseg/cks0i5kr220hu17ld6tbhmkf5"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offfsetTop={-10}
                    >
                        <p 
                            onClick={() => setSelectedLocation(result)} 
                            className="cursor-point text-2xl animate-bounce"
                            arial-label="push-pin"
                        >        
                            📌
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
