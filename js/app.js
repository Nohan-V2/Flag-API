// interactions
const $searchInput = document.querySelector(".search-input");
const $selectInput = document.querySelector(".select-input");

const $nightMode = document.querySelector(".night-mode");

// Main container
const $results = document.querySelector(".results");

fetch(
  "https://restcountries.com/v3.1/independent?status=false&fields=name,flags,population,capital,region"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    data.forEach((country) => {
      const $countryCard = document.createElement("div");
      $countryCard.classList.add("country-card");
      $results.appendChild($countryCard);

      const $countryFlag = document.createElement("img");
      $countryFlag.classList.add("country-flag");
      $countryFlag.alt = country.name.common;
      $countryFlag.src = country.flags.png;
      $countryCard.appendChild($countryFlag);

      const $countryDetails = document.createElement("div");
      $countryDetails.classList.add("country-details");
      $countryCard.appendChild($countryDetails);

      const $countryName = document.createElement("h2");
      $countryName.classList.add("country-name");
      $countryName.textContent = country.name.common;
      $countryDetails.appendChild($countryName);

      const $detailsList = document.createElement("ul");
      $countryDetails.appendChild($detailsList);

      const $population = document.createElement("li");
      $population.textContent =
        "Population: " + country.population.toLocaleString();
      $detailsList.appendChild($population);

      const $region = document.createElement("li");
      $region.textContent = "Region: " + country.region;
      $detailsList.appendChild($region);

      const $capital = document.createElement("li");
      $capital.textContent = "Capital: " + country.capital;
      $detailsList.appendChild($capital);

      // Tri par region
      $selectInput.addEventListener("change", () => {
        if ($selectInput.value === "africa") {
          if (country.region === "Africa") {
            $countryCard.classList.remove("hidden");
          } else {
            $countryCard.classList.add("hidden");
          }
        } else if ($selectInput.value === "america") {
          if (country.region === "Americas") {
            $countryCard.classList.remove("hidden");
          } else {
            $countryCard.classList.add("hidden");
          }
        } else if ($selectInput.value === "asia") {
          if (country.region === "Asia") {
            $countryCard.classList.remove("hidden");
          } else {
            $countryCard.classList.add("hidden");
          }
        } else if ($selectInput.value === "europe") {
          if (country.region === "Europe") {
            $countryCard.classList.remove("hidden");
          } else {
            $countryCard.classList.add("hidden");
          }
        } else if ($selectInput.value === "oceania") {
          if (country.region === "Oceania") {
            $countryCard.classList.remove("hidden");
          } else {
            $countryCard.classList.add("hidden");
          }
        } else {
          $countryCard.classList.remove("hidden");
        }
      });

      // Search country
      $searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const countryName = country.name.common.toLowerCase();

        if (countryName.includes(searchTerm)) {
          $countryCard.classList.remove("hidden");
        } else {
          $countryCard.classList.add("hidden");
        }
      });

      // Annule le comportement de search lors de de la touche entrée
      $searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });

      // Mode nuit
      $nightMode.addEventListener("click", () => {
        isTrue = false;

        if (isTrue === false) {
          isTrue = true;
          $nightMode.classList.remove("night-mode");
          $nightMode.textContent = "Dark Mode";
          document.body.classList.remove("dark-mode");
        } else {
          $nightMode.classList.add("night-mode");
          $nightMode.textContent = "Light Mode";
          document.body.classList.add("dark-mode");
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
