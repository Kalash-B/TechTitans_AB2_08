const API_URL = "http://localhost:5000/api/farmers/nearby";

function getNearbyFarmers() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`${API_URL}?lat=${latitude}&lng=${longitude}`);
                const farmers = await response.json();
                displayFarmers(farmers);
            } catch (error) {
                console.error("Error fetching farmers:", error);
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function displayFarmers(farmers) {
    const farmerList = document.getElementById("farmerList");
    farmerList.innerHTML = "";

    farmers.forEach(farmer => {
        const li = document.createElement("li");
        li.textContent = `${farmer.name} - ${farmer.produce.join(", ")}`;
        farmerList.appendChild(li);
    });
}
