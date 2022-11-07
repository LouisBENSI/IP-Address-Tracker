let input = document.querySelector("#input"),
    bouton = document.querySelector("#bouton"),
    errorMessage = document.querySelector(".errorMessage"),
    lat = 48.84776440847722,
    long = 2.343943538319505

bouton.addEventListener("click", () => {
    if (input.value.length) {
        let url = `https://geo.ipify.org/api/v1?apiKey=at_zZhw29ygwo5OlNHETLTCPoyh02oZR&ipAddress=${input.value}`

        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                document.querySelector("#ip").innerHTML = data.ip
                document.querySelector("#city").innerHTML = data.location.city + ", " + data.location.region + ", " + data.location.postalCode
                document.querySelector("#utc").innerHTML = 'UTC : ' + data.location.timezone
                document.querySelector("#isp").innerHTML = data.isp

                long = (data.location.lng)
                lat = (data.location.lat)

                displayMap(lat, long)
            })


    } else {
        errorMessage.classList.remove("hidden")
    }
})

function displayMap(lat, long) {
    var container = L.DomUtil.get('mapid'); if(container != null){ container._leaflet_id = null; }

    var map = L.map('mapid').setView([lat, long], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoibG9jYzM1IiwiYSI6ImNrZ2kzN3JuYTBrZjkyenRlcWRhbDYya3EifQ.9nWEjmRnBFNu71o-LfueIA',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,

    }).addTo(map);
}

displayMap(lat, long)


