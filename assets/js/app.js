const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "6501c98b580b76098ab8ca6446e2e3d6";

form.addEventListener("submit", event => {
    event.preventDefault();
    let inputVal = input.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=it`;
    let urlUnsplash = `https://api.unsplash.com/search/photos?query=${inputVal}&per_page=1&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`;
    let imagebkg = 'percorso/immagine/default'; // Immagine di default

    fetch(urlUnsplash)
        .then(response => response.json())
        .then(data => {
            if (data.results.length != 0) {
                imagebkg = data.results[0].urls.full; // Ottieni l'URL dell'immagine da Unsplash se presente
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const { main, name, sys, weather, dt } = data;
                    const description = weather[0]["description"];
                    const icon = `assets/animated/${weather[0]["icon"]}.svg`;

                    const city = document.createElement("li");
                    city.classList.add("city");
                    city.style.backgroundImage = `url('${imagebkg}')`; // Imposta lo sfondo dell'elemento città con l'immagine da Unsplash

                    const cityTemplate = `
                              
                        <div class="city-temp">
                            <span>${Math.round(main.temp)}</span> 
                            <sup>°C</sup>           
                        </div>
                        <figure class="city-icon">
                            <img src="${icon}" alt="${description}">
                            
                        </figure>
                        <h2 class="city-name">
                            <span>${name}</span>
                        </h2>    
                    `;

                    city.innerHTML = cityTemplate;
                    list.appendChild(city);
                })
                .catch(() => {
                    msg.textContent = "Città non trovata, prova di nuovo";
                });
        })
        .catch(() => {
            msg.textContent = "Errore nel recupero dell'immagine da Unsplash";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});
