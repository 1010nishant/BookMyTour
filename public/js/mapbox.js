/* eslint-disable */
export const displayMap = () => {
    const locations = JSON.parse(document.getElementById('map').dataset.locations);
    console.log(locations);
    // const locationsData = JSON.parse(
    //     document.getElementById('map').dataset.locations
    // );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    const markerArray = [];
    locations.forEach((loc) => {
        const reversedArr = [...loc.coordinates].reverse();

        const myIcon = L.icon({
            iconUrl: './../img/pin.png',
            iconSize: [30, 35],
            iconAnchor: [15, 35],
        });

        L.marker(reversedArr, { icon: myIcon }).addTo(map);
        markerArray.push(reversedArr);
    });
    const bounds = L.latLngBounds(markerArray);
    map.fitBounds(bounds);

};
