var input = document.querySelector("#input"),
    bouton = document.querySelector("#bouton");



bouton.addEventListener("click", () => {

    let valeur = input.value,
        url = `https://geo.ipify.org/api/v1?apiKey=at_zZhw29ygwo5OlNHETLTCPoyh02oZR&ipAddress=${valeur}`;

    let requete = new XMLHttpRequest();
    requete.open('GET', url);

    requete.response = 'json';
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = JSON.parse(requete.response);
                console.log(reponse);

                document.querySelector("#ip").innerHTML = reponse.ip;
                document.querySelector("#city").innerHTML = reponse.location.city + ", " + reponse.location.region + ", " + reponse.location.postalCode;
                document.querySelector("#utc").innerHTML = 'UTC : ' + reponse.location.timezone;
                document.querySelector("#isp").innerHTML = reponse.isp;

                let lat = (reponse.location.lat);
                let lng = (reponse.location.lng);
                var mymap = L.map('mapid').setView([lat, lng], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibG9jYzM1IiwiYSI6ImNrZ2kzN3JuYTBrZjkyenRlcWRhbDYya3EifQ.9nWEjmRnBFNu71o-LfueIA'
                }).addTo(mymap);

                marker.setLatLng([lat, lng]).update();



            }
        }
    }

});


