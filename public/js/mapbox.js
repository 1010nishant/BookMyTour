/* eslint-disable */
export const displayMap = locations => {
    mapboxgl.accessToken =
        mapboxgl.accessToken = 'pk.eyJ1IjoiMTAxMG5pc2hhbnQiLCJhIjoiY2xyeDZmZ3FvMTdyNTJxbG13YTdoaHpsNiJ9.ASJhM8EFHljf5wJ-uZS8xQ';
    // mapboxgl.accessToken = 'pk.eyJ1IjoiMTAxMG5pc2hhbnQiLCJhIjoiY2xyeDY0aDFqMTc5MTJvcGJjODE1Y25jdiJ9.jTJ68ySTFZ5fTlr8FAC6WA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/1010nishant/clrx8a2ou005001qqbvce31is',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};
