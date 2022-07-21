let games = '';
let page = 1;
let lastGameOneScreen;
let searchBtn = document.getElementById('searchbar');
let counter = 1;
const logOut = document.querySelector('.logOut');
const suggestedList = document.getElementById('game_search_suggestion');




const urlKey = 'https://api.rawg.io/api/games?key=0287d94a76d24548a822e6b8ce6351c8';
const header = {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
}


let observer = new IntersectionObserver((entrys) => {

    entrys.forEach(entry => {

        if (entry.isIntersecting) {
            page++;
            loadGames();
        }
    });
}, {

    rootMargin: '0px 0px 400px 0px',
    threshold: 1.0
});


// platforms

const xbox = `<svg class="xbox" id="xbox" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.9286 0 13.5238 0.616246 14.9762 1.65266C15 1.65266 15 1.68067 15 1.70868C15 1.73669 14.9762 1.73669 14.9524 1.73669C13.0952 1.2605 10.2857 3.13725 10.0238 3.33333H10H9.97619C9.71429 3.13725 6.90476 1.2605 5.04762 1.73669C5.02381 1.73669 5 1.73669 5 1.70868C5 1.68067 5 1.65266 5.02381 1.65266C6.47619 0.616246 8.07143 0 10 0ZM16.3903 17.5988C17.8903 16.0464 12.9308 10.5648 10.0035 8.33333C10.0035 8.33333 9.97935 8.33333 9.97935 8.35759C7.07626 10.5648 2.09261 16.0464 3.61674 17.5988C5.31021 19.1026 7.56011 20 10.0035 20C12.447 20 14.6727 19.1026 16.3903 17.5988ZM2.73973 3.38078C2.72831 3.38078 2.7226 3.38705 2.7169 3.39332C2.71119 3.39959 2.70548 3.40585 2.69406 3.40585C1.0274 5.2358 0 7.76763 0 10.5501C0 12.8313 0.707763 14.9621 1.87215 16.6416C1.87215 16.6667 1.89498 16.6667 1.91781 16.6667C1.94064 16.6667 1.94064 16.6416 1.91781 16.6165C1.21005 14.2351 4.79452 8.4946 6.64384 6.0881L6.66667 6.06303C6.66667 6.03796 6.66667 6.03796 6.64384 6.03796C3.83562 2.9797 2.89954 3.30558 2.73973 3.38078ZM13.3333 6.05268L13.3562 6.02759C16.1644 2.99144 17.1005 3.31764 17.2374 3.36782C17.2469 3.36782 17.2525 3.36782 17.2574 3.36962C17.2642 3.37215 17.2698 3.37825 17.2831 3.39291C18.9726 5.22464 20 7.75895 20 10.5442C20 12.8276 19.2922 14.9604 18.1279 16.6416C18.1279 16.6667 18.105 16.6667 18.0822 16.6667V16.6165C18.7671 14.2327 15.2055 8.48662 13.3562 6.07777C13.3333 6.07777 13.3333 6.05268 13.3333 6.05268Z" fill="#ffffff"/>
</svg>`;
const windows = `<svg  class="windows" id="windows" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9.16667H9.16667V1.53647L20 0V9.16667ZM8.33333 1.66667V9.16667H0V2.77865L8.33333 1.66667ZM8.33333 10H0V17.0992L8.33333 18.3333V10ZM9.16667 18.3262V10H20V20L9.16667 18.3262Z" fill="#ffffff"/>
</svg>`;
const play = `<svg class="playstation" id="playstation" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.55164 9.53674e-06L9.55164 18.2774L13.3604 19.5885L13.3604 4.26319C13.3604 3.54103 13.6567 3.06155 14.132 3.22645C14.7534 3.41372 14.8742 4.07895 14.8742 4.79307L14.8742 10.9138C17.2449 12.1606 19.1114 10.9131 19.1114 7.62345C19.1114 4.26188 18.0171 2.76435 14.7972 1.56033C13.5271 1.10084 11.1734 0.325457 9.55164 9.53674e-06Z" fill="#ffffff"/>
<path d="M14.3503 16.9129L20.1076 14.3203C20.7589 14.0148 20.8585 13.5998 20.3314 13.3817C19.796 13.1596 18.8404 13.2232 18.1821 13.5222L14.3503 15.2325V12.5036L14.5698 12.412C14.5698 12.412 15.6789 11.9148 17.239 11.7008C18.796 11.4848 20.7055 11.7289 22.2063 12.4446C23.8969 13.1241 24.0864 14.1153 23.6587 14.8051C23.2247 15.4877 22.1726 15.9815 22.1726 15.9815L14.3503 19.5367" fill="#ffffff"/>
<path d="M1.7099 17.2146C-0.0868735 16.6444 -0.386499 15.4395 0.433179 14.7435C1.18926 14.1079 2.47691 13.6295 2.47691 13.6295L7.79974 11.4675V13.9281L3.97289 15.4908C3.29503 15.767 3.1934 16.1557 3.73939 16.359C4.29514 16.5706 5.28141 16.5137 5.95966 16.2286L7.79974 15.4728V17.6695C7.68114 17.6921 7.54927 17.715 7.42892 17.7384C5.5943 18.0852 3.63971 17.9428 1.7099 17.2146Z" fill="#ffffff"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.7661 19.4589C23.6149 19.6145 23.4164 19.7024 23.2027 19.7024C22.989 19.7024 22.784 19.6145 22.6326 19.4589C22.4831 19.3005 22.4004 19.0936 22.4004 18.8706C22.4004 18.4089 22.7591 18.0357 23.2027 18.0357C23.4164 18.0357 23.6149 18.1208 23.7661 18.2798C23.9156 18.4352 24 18.6456 24 18.8706C24 19.0936 23.9156 19.3005 23.7661 19.4589ZM22.5352 18.8707C22.5352 18.6808 22.6033 18.5067 22.7279 18.3776C22.8555 18.2458 23.0258 18.1747 23.2027 18.1747C23.3798 18.1747 23.5458 18.2458 23.6703 18.3776C23.7959 18.5067 23.8638 18.6808 23.8638 18.8707C23.8638 19.2511 23.567 19.5599 23.2027 19.5599C23.0258 19.5599 22.8555 19.4896 22.7279 19.3594C22.6033 19.2281 22.5352 19.0558 22.5352 18.8707ZM23.5677 19.2169C23.5748 19.2384 23.5835 19.2511 23.5958 19.2548L23.607 19.2614V19.3143H23.4334L23.4302 19.3036L23.4184 19.2717C23.4164 19.2548 23.4141 19.2328 23.4117 19.1957L23.404 19.0508C23.402 18.9993 23.3859 18.9694 23.3561 18.9496C23.334 18.9419 23.3039 18.9359 23.259 18.9359H23.018V19.3143H22.8599V18.3849H23.2745C23.3421 18.3849 23.399 18.3975 23.4426 18.4167C23.53 18.4596 23.5748 18.5368 23.5748 18.6455C23.5748 18.6988 23.5621 18.7487 23.5402 18.7856C23.5212 18.8116 23.4988 18.8353 23.4744 18.8585L23.4809 18.8633C23.4974 18.8754 23.5138 18.8874 23.5235 18.9051C23.5456 18.9305 23.5556 18.9731 23.5574 19.028L23.5614 19.1463C23.5621 19.1766 23.5644 19.2002 23.5677 19.2169ZM23.3807 18.7599C23.4063 18.7427 23.4184 18.7085 23.4184 18.6561C23.4184 18.6009 23.4001 18.5641 23.3642 18.5458C23.3421 18.5368 23.3146 18.5303 23.2779 18.5303H23.018V18.7914H23.2635C23.3123 18.7914 23.3511 18.7809 23.3807 18.7599Z" fill="#fffff"/>
</svg>`;

const gamePlatforms = (platforms) => {
    let allPlatforms = '';
    platforms.map((platforms) => {
        switch (platforms.platform.id) {
            case (1):
                allPlatforms += windows;
                break;
            case (2):
                allPlatforms += play;
                break;
            case (3):
                allPlatforms += xbox;
                break;
        }
    });
    return [allPlatforms];
}

const convertDate = (releasedDate) => {
    return new Date(releasedDate).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
const loadGames = async() => {
    try {
        const response = await fetch(`${urlKey}&page=${page}`, header);
        if (response.status === 200) {
            const res = await response.json();
            res.results.forEach(({ name: gameTitle, genres: genres, released: releasedDate, background_image: bgImg, parent_platforms: platforms = [], id: gameId, short_screenshots: gamePics}) => {
                let genreName = '';
                
                for (let i = 0; i < genres.length; i++) {
                    genreName += `${genres[i].name}, `;
                }

                games += `<button class="game-card" onclick="modalRender()" onclick="getGameId()" id="${gameId}">
                <div class="game-card_img_container">
                    <svg class="game-card--heart" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C3.11 2 2 3.113 2 4.467C2 5.991 2.882 7.617 4.246 9.21C5.392 10.547 6.784 11.753 8 12.726C9.216 11.753 10.608 10.546 11.754 9.21C13.118 7.617 14 5.99 14 4.467C14 3.113 12.89 2 11.5 2C10.11 2 9 3.113 9 4.467C9 4.73222 8.89464 4.98658 8.70711 5.17411C8.51957 5.36165 8.26522 5.467 8 5.467C7.73478 5.467 7.48043 5.36165 7.29289 5.17411C7.10536 4.98658 7 4.73222 7 4.467C7 3.113 5.89 2 4.5 2ZM8 1.659C7.57656 1.13976 7.0427 0.721428 6.43726 0.434448C5.83181 0.147467 5.17001 -0.000945666 4.5 4.53399e-06C2.024 4.53399e-06 0 1.99 0 4.467C0 6.718 1.267 8.807 2.727 10.511C4.208 12.24 6.024 13.729 7.386 14.789C7.56154 14.9256 7.7776 14.9997 8 14.9997C8.2224 14.9997 8.43846 14.9256 8.614 14.789C9.976 13.729 11.792 12.239 13.273 10.511C14.733 8.807 16 6.718 16 4.467C16 1.99 13.976 4.53399e-06 11.5 4.53399e-06C10.09 4.53399e-06 8.826 0.646004 8 1.659Z" fill="#ffffff"/>
                    </svg>
                    <img class="game-card--img" src="${bgImg}" alt="">
                </div>
                <div class="game-card_info--container">
                    <div class="game-card_title-container">
                        <h5 class="game-card--title text-title">${gameTitle}</h5>
                        <span class="game-card--number number">#${counter}</span>
                    </div>
                    <div class="game-card_releaseDate-container">
                        <p class="text_card-500 realease">Release date:</p>
                        <p class="text_card-400 date">${convertDate(releasedDate)}</p>
                        <span class="game-card_icon--container">
                        ${gamePlatforms(platforms)}
                        </span>
                    </div>
                    <div class="game-card_genre--container">
                        <p class="text_card-500 genre">Genres</p>
                        <p class="text_card-400">${genreName}</p>
                    </div>
                </div>
            </button>`;
                counter = counter + 1;
            });
            document.getElementById('game-card_container').innerHTML = games;

            if (page < 37397) {


                if (lastGameOneScreen) {
                    observer.unobserve(lastGameOneScreen);
                }

                const gamesOnScreen = document.querySelectorAll('.game-card_container .game-card');


                lastGameOneScreen = gamesOnScreen[gamesOnScreen.length - 1];


                observer.observe(lastGameOneScreen)
            }

        } else if (response.status === 401) {
            console.log('Your key is not working');
        } else if (response.status === 404) {
            console.log('The game does not exist');
        } else {
            console.log('Something went wrong');
        }

    } catch (error) {
        console.log(error);
    }
    getGameId();
}
loadGames();



searchBtn.addEventListener('blur', (e) => {
    suggestedList.style.display = 'none'
})
logOut.addEventListener('click', () => {
    window.location.href = '../index.html';
})



//---------------------------------------------------

const searchReq = async(searchValue) => {
    document.getElementById('game-card_container').innerHTML = games;
    games = '';
    try {
        const resp = await fetch(`${urlKey}&search=${searchValue}`, header);
        if (resp.status === 200) {
            const res = await resp.json();
            const result = res.results;
            const shortResult = result.slice(0, 4);
            shortResult.forEach(({ name: gameTitle, genres: genres, released: releasedDate, background_image: bgImg, parent_platforms: platforms = [], id: gameId }) => {
                let genreName = '';
                for (let i = 0; i < genres.length; i++) {
                    genreName += `${genres[i].name}, `;
                }
                games += `<button class="game-card" onclick="modalRender()" id="${gameId}">
                        <div class="game-card_img_container">
                            <svg class="game-card--heart" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C3.11 2 2 3.113 2 4.467C2 5.991 2.882 7.617 4.246 9.21C5.392 10.547 6.784 11.753 8 12.726C9.216 11.753 10.608 10.546 11.754 9.21C13.118 7.617 14 5.99 14 4.467C14 3.113 12.89 2 11.5 2C10.11 2 9 3.113 9 4.467C9 4.73222 8.89464 4.98658 8.70711 5.17411C8.51957 5.36165 8.26522 5.467 8 5.467C7.73478 5.467 7.48043 5.36165 7.29289 5.17411C7.10536 4.98658 7 4.73222 7 4.467C7 3.113 5.89 2 4.5 2ZM8 1.659C7.57656 1.13976 7.0427 0.721428 6.43726 0.434448C5.83181 0.147467 5.17001 -0.000945666 4.5 4.53399e-06C2.024 4.53399e-06 0 1.99 0 4.467C0 6.718 1.267 8.807 2.727 10.511C4.208 12.24 6.024 13.729 7.386 14.789C7.56154 14.9256 7.7776 14.9997 8 14.9997C8.2224 14.9997 8.43846 14.9256 8.614 14.789C9.976 13.729 11.792 12.239 13.273 10.511C14.733 8.807 16 6.718 16 4.467C16 1.99 13.976 4.53399e-06 11.5 4.53399e-06C10.09 4.53399e-06 8.826 0.646004 8 1.659Z" fill="#ffffff"/>
                            </svg>
                            <img class="game-card--img" src="${bgImg}" alt="">
                        </div>
                        <div class="game-card_info--container">
                            <div class="game-card_title-container">
                                <h5 class="game-card--title text-title">${gameTitle}</h5>
                                <span class="game-card--number number">#${counter}</span>
                            </div>
                            <div class="game-card_releaseDate-container">
                                <p class="text_card-500 realease">Release date:</p>
                                <p class="text_card-400 date">${convertDate(releasedDate)}</p>
                                <span class="game-card_icon--container">
                                ${gamePlatforms(platforms)}
                                </span>
                            </div>
                            <div class="game-card_genre--container">
                                <p class="text_card-500 genre">Genres</p>
                                <p class="text_card-400">${genreName}</p>
                            </div>
                        </div>
                    </button>`;
                counter = counter + 1;
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// -------------------------------

const fetchSuggestions = async function(searchValue) {
    try {
        suggestedList.innerHTML = '<li class="header__suggestion-block-text">Loading...</li>'
        let response = await fetch(
            `https://api.rawg.io/api/games?key=a5ec9a0abd70401288b5e273d53daea9&search=${searchValue}`
        );
        let games = await response.json();
        if (games.results.length > 0) {
            let suggestions = []

            // Filter game results by starting query
            games.results.forEach((result) => {
                //only results matching starting with the search query
                if (result.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
                    suggestions.push(result)
                }
            })

            // only return first 3 suggestions
            if (suggestions.length > 0) {
                suggestions = suggestions.slice(0, 4)
                const suggestionsHtml = suggestions.map((suggestion) => `<li class="header__suggestion-block-text" onclick="search('${suggestion.name}')">${suggestion.name}</li>`).join('')
                suggestedList.innerHTML = suggestionsHtml
            }
        } else {
            suggestedList.innerHTML = '<li class="header__suggestion-block-text">No games were found</li>'

        }
    } catch (error) {
        suggestedList.innerHTML = '<li class="header__suggestion-block-text">Cant load suggestions</li>'
    }
}

function dbonce(callback, delay) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            cb(...args)
        }, delay)
        console.log('sugerido')
    }

}

//suggest dbonce
searchBtn.addEventListener("keyup", function(e) {

    if (e.target.value.length > 2) {
        dbonce(fetchSuggestions(searchBtn.value), 200)
        console.log('sugeridos2')
    }
    if (e.target.value.length = 0) {}

});


searchBtn.addEventListener('keypress', (e) => {
    const searchValue = searchBtn.value.trim();
    if (searchValue.length > 2) {
        searchReq(searchValue);
        console.log('cargando juegos');
    }
})








/// mobile nav


let navToggle = document.querySelector('nav_top_mobile--hamburguer');
const navMbile = document.querySelector('.nav_mobile');

function navMobile() {
    navMbile.classList.remove('hidden')
    navMbile.classList.add('active')
}
let cross = document.querySelector('cross');

function navMobileClose() {
    navMbile.classList.remove('active')
    navMbile.classList.add('hidden')
}


//-----------Light mode ----------------//
const modalCross = document.querySelector('.modal-cross-btn');
const modalContainer = document.getElementById('modal-container');
const modal = document.querySelector('.modal');
const modalGradient = document.querySelectorAll('.modal--gradient');

let body = document.querySelector('.second-page');
let switchOn = document.getElementById('switchOn');
let switchOff = document.getElementById('switchOff');
let headerHome = document.querySelector('.main_second-page_header');
let trending = document.getElementById('newAndTrending');
let trendingP = document.getElementById('trendingPrgh');
let navLinks = document.querySelector('.aside_nav');
let links = navLinks.querySelectorAll('.aside_nav--main--link');
let gradient = document.querySelector('footer .linear-gradient');
let darkModeP = document.getElementById('darkMode');

let cardContainer = document.getElementById('game-card_container');
let gameCardId;

let cardBg = cardContainer.children;

let cardTitle = document.querySelectorAll('.text-title');
let lightMode = localStorage.getItem('lightMode')

const lightModeOn = () => {
    document.body.classList.add('lightMode')
    localStorage.setItem('lightMode', 'enabled')
    headerHome.classList.add('light');
    trending.classList.add('light');
    trendingP.classList.add('light');
    for (const link of links) {
        link.classList.add('light');

    }
    gradient.classList.add('light');
    switchOn.style.display = 'none'
    switchOff.style.display = 'block'
    darkModeP.style.color = '#000'
    for (const card of cardBg) {
        card.classList.add('light');
    }
    modalContainer.classList.add('light');
}


const lightModeOff = () => {
    document.body.classList.remove('lightMode')
    localStorage.setItem('lightMode', 'disabled')
    body.classList.remove('light');
    headerHome.classList.remove('light');
    trending.classList.remove('light');
    trendingP.classList.remove('light');
    for (const link of links) {
        link.classList.remove('light');

    }
    gradient.classList.remove('light');
    switchOn.style.display = 'block'
    switchOff.style.display = 'none'
    darkModeP.style.color = '#fff'
    for (const card of cardBg) {
        card.classList.remove('light');
    }
    modalContainer.classList.remove('light'); 
}

if (lightMode === 'enabled') {
    lightModeOn();

}

switchOn.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode')
    if (lightMode !== "enabled") {
        lightModeOn();
        console.log('On')
    } else {
        lightModeOff();
        console.log('Off')
    }
})
switchOff.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode')
    if (lightMode !== "enabled") {
        lightModeOn();
        console.log('On')
    } else {
        lightModeOff();
        console.log('Off')
    }
})



// MODAL


function getGameId(){
    let gameCard  = document.querySelectorAll('.game-card');
    gameCard.forEach(card => {
        card.addEventListener('click', () =>{
            let gameN = card.getAttribute('id');
            loadModal(gameN);
        })
    })
}

function modalRender() {
    modalContainer.classList.remove("hidden");
    getGameId();
}

const loadModal=  async(id) => {

    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=0287d94a76d24548a822e6b8ce6351c8`, header);
        const gameShots = await fetch (`https://api.rawg.io/api/games/${id}/screenshots?key=0287d94a76d24548a822e6b8ce6351c8`, header);
        
        if (response.status, gameShots.status === 200) {
            const res = await response.json();
            const pics = await gameShots.json();
            const gamePics = pics.results;
            const {name, description_raw, genres, released, developers, website, parent_platforms, background_image, publishers} = res
            let genreName = '';
            let gameDevs = '';
            platformString = '';
            publisherString = '';
            gameScreenshot = [];
            for (let i = 0; i < genres.length; i++) {
                genreName += `${genres[i].name}, `;
            }
            for (let i = 0; i < developers.length; i++){
                gameDevs +=`${developers[i].name}, `
            }
            for (let i = 0; i < parent_platforms.length; i++){
                platformString +=`${parent_platforms[i].platform.name}, `

            }
            for (let i = 0; i < publishers.length; i++){
                publisherString +=`${publishers[i].name}, `

            }
            gamePics.forEach((img) =>{
                const image = img.image
                gameScreenshot.push(image)

            })

                modalContainer.innerHTML = ` <div class="modal">
                <div class="modal--gradient">
                    <div class="modal_wrapper">
                        <button class="modal-cross-btn" onclick="closeModal()">
                            <svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.17508 1.17552C1.39386 0.956796 1.69056 0.833922 1.99991 0.833922C2.30927 0.833922 2.60596 0.956796 2.82475 1.17552L8.99991 7.35099L15.1751 1.17552C15.2827 1.06409 15.4114 0.975205 15.5538 0.914059C15.6961 0.852912 15.8492 0.820726 16.0041 0.81938C16.159 0.818034 16.3126 0.847554 16.456 0.906218C16.5994 0.964881 16.7297 1.05151 16.8392 1.16106C16.9487 1.27061 17.0354 1.40087 17.094 1.54426C17.1527 1.68765 17.1822 1.84128 17.1809 1.9962C17.1795 2.15111 17.1473 2.30421 17.0862 2.44656C17.0251 2.5889 16.9362 2.71764 16.8247 2.82527L10.6496 9.00073L16.8247 15.1762C17.0373 15.3962 17.1549 15.691 17.1522 15.9969C17.1495 16.3028 17.0268 16.5954 16.8105 16.8117C16.5942 17.0281 16.3016 17.1508 15.9957 17.1534C15.6898 17.1561 15.3951 17.0385 15.1751 16.8259L8.99991 10.6505L2.82475 16.8259C2.60471 17.0385 2.31001 17.1561 2.00411 17.1534C1.69822 17.1508 1.4056 17.0281 1.18929 16.8117C0.972982 16.5954 0.850285 16.3028 0.847627 15.9969C0.844969 15.691 0.962563 15.3962 1.17508 15.1762L7.35025 9.00073L1.17508 2.82527C0.956364 2.60648 0.833496 2.30977 0.833496 2.0004C0.833496 1.69102 0.956364 1.39432 1.17508 1.17552Z" fill="white"/>
                            </svg>
                        </button>
            
                        <div class="modal_wrapper_info">
                            <div class="modal_wrapper_info--icons">
                                <svg width="32" height="32" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.55164 9.53674e-06L9.55164 18.2774L13.3604 19.5885L13.3604 4.26319C13.3604 3.54103 13.6567 3.06155 14.132 3.22645C14.7534 3.41372 14.8742 4.07895 14.8742 4.79307L14.8742 10.9138C17.2449 12.1606 19.1114 10.9131 19.1114 7.62345C19.1114 4.26188 18.0171 2.76435 14.7972 1.56033C13.5271 1.10084 11.1734 0.325457 9.55164 9.53674e-06Z" fill="#fff"/>
                                    <path d="M14.3503 16.9129L20.1076 14.3203C20.7589 14.0148 20.8585 13.5998 20.3314 13.3817C19.796 13.1596 18.8404 13.2232 18.1821 13.5222L14.3503 15.2325V12.5036L14.5698 12.412C14.5698 12.412 15.6789 11.9148 17.239 11.7008C18.796 11.4848 20.7055 11.7289 22.2063 12.4446C23.8969 13.1241 24.0864 14.1153 23.6587 14.8051C23.2247 15.4877 22.1726 15.9815 22.1726 15.9815L14.3503 19.5367" fill="#fff"/>
                                    <path d="M1.7099 17.2146C-0.0868735 16.6444 -0.386499 15.4395 0.433179 14.7435C1.18926 14.1079 2.47691 13.6295 2.47691 13.6295L7.79974 11.4675V13.9281L3.97289 15.4908C3.29503 15.767 3.1934 16.1557 3.73939 16.359C4.29514 16.5706 5.28141 16.5137 5.95966 16.2286L7.79974 15.4728V17.6695C7.68114 17.6921 7.54927 17.715 7.42892 17.7384C5.5943 18.0852 3.63971 17.9428 1.7099 17.2146Z" fill="#fff"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7661 19.4589C23.6149 19.6145 23.4164 19.7024 23.2027 19.7024C22.989 19.7024 22.784 19.6145 22.6326 19.4589C22.4831 19.3005 22.4004 19.0936 22.4004 18.8706C22.4004 18.4089 22.7591 18.0357 23.2027 18.0357C23.4164 18.0357 23.6149 18.1208 23.7661 18.2798C23.9156 18.4352 24 18.6456 24 18.8706C24 19.0936 23.9156 19.3005 23.7661 19.4589ZM22.5352 18.8707C22.5352 18.6808 22.6033 18.5067 22.7279 18.3776C22.8555 18.2458 23.0258 18.1747 23.2027 18.1747C23.3798 18.1747 23.5458 18.2458 23.6703 18.3776C23.7959 18.5067 23.8638 18.6808 23.8638 18.8707C23.8638 19.2511 23.567 19.5599 23.2027 19.5599C23.0258 19.5599 22.8555 19.4896 22.7279 19.3594C22.6033 19.2281 22.5352 19.0558 22.5352 18.8707ZM23.5677 19.2169C23.5748 19.2384 23.5835 19.2511 23.5958 19.2548L23.607 19.2614V19.3143H23.4334L23.4302 19.3036L23.4184 19.2717C23.4164 19.2548 23.4141 19.2328 23.4117 19.1957L23.404 19.0508C23.402 18.9993 23.3859 18.9694 23.3561 18.9496C23.334 18.9419 23.3039 18.9359 23.259 18.9359H23.018V19.3143H22.8599V18.3849H23.2745C23.3421 18.3849 23.399 18.3975 23.4426 18.4167C23.53 18.4596 23.5748 18.5368 23.5748 18.6455C23.5748 18.6988 23.5621 18.7487 23.5402 18.7856C23.5212 18.8116 23.4988 18.8353 23.4744 18.8585L23.4809 18.8633C23.4974 18.8754 23.5138 18.8874 23.5235 18.9051C23.5456 18.9305 23.5556 18.9731 23.5574 19.028L23.5614 19.1463C23.5621 19.1766 23.5644 19.2002 23.5677 19.2169ZM23.3807 18.7599C23.4063 18.7427 23.4184 18.7085 23.4184 18.6561C23.4184 18.6009 23.4001 18.5641 23.3642 18.5458C23.3421 18.5368 23.3146 18.5303 23.2779 18.5303H23.018V18.7914H23.2635C23.3123 18.7914 23.3511 18.7809 23.3807 18.7599Z" fill="#fff"/>
                                </svg>
                                <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 9.16667H9.16667V1.53647L20 0V9.16667ZM8.33333 1.66667V9.16667H0V2.77865L8.33333 1.66667ZM8.33333 10H0V17.0992L8.33333 18.3333V10ZM9.16667 18.3262V10H20V20L9.16667 18.3262Z" fill="#fff"/>
                                </svg>
                                <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.9286 0 13.5238 0.616246 14.9762 1.65266C15 1.65266 15 1.68067 15 1.70868C15 1.73669 14.9762 1.73669 14.9524 1.73669C13.0952 1.2605 10.2857 3.13725 10.0238 3.33333H10H9.97619C9.71429 3.13725 6.90476 1.2605 5.04762 1.73669C5.02381 1.73669 5 1.73669 5 1.70868C5 1.68067 5 1.65266 5.02381 1.65266C6.47619 0.616246 8.07143 0 10 0ZM16.3903 17.5988C17.8903 16.0464 12.9308 10.5648 10.0035 8.33333C10.0035 8.33333 9.97935 8.33333 9.97935 8.35759C7.07626 10.5648 2.09261 16.0464 3.61674 17.5988C5.31021 19.1026 7.56011 20 10.0035 20C12.447 20 14.6727 19.1026 16.3903 17.5988ZM2.73973 3.38078C2.72831 3.38078 2.7226 3.38705 2.7169 3.39332C2.71119 3.39959 2.70548 3.40585 2.69406 3.40585C1.0274 5.2358 0 7.76763 0 10.5501C0 12.8313 0.707763 14.9621 1.87215 16.6416C1.87215 16.6667 1.89498 16.6667 1.91781 16.6667C1.94064 16.6667 1.94064 16.6416 1.91781 16.6165C1.21005 14.2351 4.79452 8.4946 6.64384 6.0881L6.66667 6.06303C6.66667 6.03796 6.66667 6.03796 6.64384 6.03796C3.83562 2.9797 2.89954 3.30558 2.73973 3.38078ZM13.3333 6.05268L13.3562 6.02759C16.1644 2.99144 17.1005 3.31764 17.2374 3.36782C17.2469 3.36782 17.2525 3.36782 17.2574 3.36962C17.2642 3.37215 17.2698 3.37825 17.2831 3.39291C18.9726 5.22464 20 7.75895 20 10.5442C20 12.8276 19.2922 14.9604 18.1279 16.6416C18.1279 16.6667 18.105 16.6667 18.0822 16.6667V16.6165C18.7671 14.2327 15.2055 8.48662 13.3562 6.07777C13.3333 6.07777 13.3333 6.05268 13.3333 6.05268Z" fill="#fff"/>
                                </svg>
                            </div>
                            <div class="modal_wrapper_info-description">
                                <h4 class="modal-gameTitle">${name}</h4>
                                <div class="modal_wrapper_info-description--date">
                                    <span>May 31, 2021</span>
                                    <span>#1 TOP 2021</span>
                                    <span>#9 RPG</span>
                                </div>
                                <p>${description_raw}</p>
                                <div class="modal_buttons_container">
                                    <button class="filledButton">Add to wishlist   <svg class="buttonHeart" width="16" height="15" viewBox="0 0 16 15" fill="filled" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="#fff" clip-rule="evenodd" d="M4.5 2C3.11 2 2 3.113 2 4.467C2 5.991 2.882 7.617 4.246 9.21C5.392 10.547 6.784 11.753 8 12.726C9.216 11.753 10.608 10.546 11.754 9.21C13.118 7.617 14 5.99 14 4.467C14 3.113 12.89 2 11.5 2C10.11 2 9 3.113 9 4.467C9 4.73222 8.89464 4.98658 8.70711 5.17411C8.51957 5.36165 8.26522 5.467 8 5.467C7.73478 5.467 7.48043 5.36165 7.29289 5.17411C7.10536 4.98658 7 4.73222 7 4.467C7 3.113 5.89 2 4.5 2ZM8 1.659C7.57656 1.13976 7.0427 0.721428 6.43726 0.434448C5.83181 0.147467 5.17001 -0.000945666 4.5 4.53399e-06C2.024 4.53399e-06 0 1.99 0 4.467C0 6.718 1.267 8.807 2.727 10.511C4.208 12.24 6.024 13.729 7.386 14.789C7.56154 14.9256 7.7776 14.9997 8 14.9997C8.2224 14.9997 8.43846 14.9256 8.614 14.789C9.976 13.729 11.792 12.239 13.273 10.511C14.733 8.807 16 6.718 16 4.467C16 1.99 13.976 4.53399e-06 11.5 4.53399e-06C10.09 4.53399e-06 8.826 0.646004 8 1.659Z" fill="#fff"/>
                                        </svg></button>
                                    <button class="emptyButton">Purchase</button>
                                </div>
                            </div>
            
                            <div class="modal_wrapper_details">
                                <div class="modal_wrapper_details--column1">
                                    <div class="details_box">
                                        <h6 class="detail-title">Platforms</h6>
                                        <p class="detail-description">${platformString}</p>
                                    </div>
                                    <div class="details_box">
                                        <h6 class="detail-title">Release date</h6>
                                        <p class="detail-description">${convertDate(released)}</p>
                                    </div>
                                    <div class="details_box">
                                        <h6 class="detail-title">Publisher</h6>
                                        <p class="detail-description">${publisherString}</p>
                                    </div>
                                    <div class="details_box">
                                        <h6 class="detail-title">Website</h6>
                                        <a class="detail-description" href="${website}" target="_blank">${website}</a>
                                    </div>
                                </div>
                                <div class="modal_wrapper_details--column2">
                                    <div class="details_box">
                                        <h6 class="detail-title" >Genres</h6>
                                        <p class="detail-description">${genreName}</p>
                                    </div>
                                    <div class="details_box">
                                        <h6 class="detail-title">Developer</h6>
                                        <p class="detail-description">${gameDevs}</p>
                                    </div>
                                    <div class="details_box">
                                        <h6 class="detail-title">Age Rating</h6>
                                        <p class="detail-description">Not rated</p>
                                    </div>
                                    <div class="details_box--icon">
                                        <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.7666 20.4307L27.7678 20.4342C28.1528 20.9358 28.3371 22.6029 25.6969 22.3066C24.6128 22.2007 23.5472 21.9536 22.5271 21.5716C21.7298 21.2659 20.9672 20.8764 20.2521 20.4097C19.1924 20.8361 18.07 21.086 16.9294 21.1493C16.1155 22.2415 15.0575 23.1282 13.8399 23.7387C12.6222 24.3492 11.2787 24.6666 9.9166 24.6655C8.99755 24.6663 8.08411 24.5222 7.20994 24.2385C6.6966 24.536 6.11327 24.8265 5.46927 25.0703C4.1626 25.5649 3.07877 25.7504 2.29944 25.8053C1.7161 25.8484 1.30427 25.8181 1.10127 25.7948C0.655603 25.7434 0.256603 25.4891 0.0839368 25.0621C0.00978686 24.8774 -0.0158467 24.6767 0.00947561 24.4792C0.0347979 24.2818 0.110233 24.0941 0.228603 23.934C0.522603 23.5315 0.79327 23.1104 1.04994 22.6834C1.54927 21.8504 2.03927 20.9522 2.16294 19.9745C1.61584 18.9301 1.28547 17.786 1.19167 16.6107C1.09786 15.4354 1.24257 14.2533 1.61709 13.1354C1.9916 12.0174 2.58821 10.9867 3.37108 10.1051C4.15394 9.22352 5.10692 8.50922 6.17277 8.00512C6.54594 6.59531 7.20873 5.27869 8.1189 4.13917C9.02907 2.99966 10.1667 2.06224 11.4592 1.38666C12.7517 0.711084 14.1708 0.31216 15.626 0.215316C17.0812 0.118471 18.5406 0.325829 19.9113 0.824175C21.2819 1.32252 22.5337 2.10093 23.5868 3.10978C24.64 4.11863 25.4714 5.33581 26.0281 6.68375C26.5849 8.03168 26.8547 9.4808 26.8203 10.9388C26.786 12.3967 26.4483 13.8315 25.8288 15.1518C25.6071 17.163 26.6186 18.8558 27.7654 20.4307H27.7666ZM8.1666 10.6662C8.16724 9.43561 8.44598 8.22112 8.98199 7.11344C9.518 6.00576 10.2974 5.03352 11.262 4.26939C12.2266 3.50526 13.3514 2.96898 14.5524 2.70065C15.7534 2.43231 16.9995 2.43884 18.1976 2.71976C19.3957 3.00068 20.5149 3.54871 21.4714 4.32292C22.4279 5.09712 23.1971 6.07748 23.7214 7.19072C24.2458 8.30396 24.5118 9.52131 24.4995 10.7518C24.4873 11.9823 24.1971 13.1941 23.6506 14.2966C23.5946 14.4093 23.5572 14.5302 23.5398 14.6548C23.2843 16.4922 23.7148 18.1675 24.5956 19.7762C23.3214 19.4662 22.1205 18.9093 21.0606 18.1371C20.8903 18.0136 20.6899 17.9385 20.4804 17.9196C20.2709 17.9007 20.0602 17.9388 19.8706 18.0298C18.6254 18.6282 17.2488 18.9009 15.8695 18.8224C14.4903 18.744 13.1535 18.317 11.9842 17.5813C10.8149 16.8456 9.8513 15.8253 9.18365 14.616C8.51599 13.4066 8.16607 12.0476 8.1666 10.6662ZM5.83794 10.9625C5.90356 13.2834 6.73632 15.5171 8.20607 17.3146C9.67582 19.1121 11.6997 20.372 13.9614 20.8973C12.8189 21.8277 11.39 22.3346 9.9166 22.3323C9.06494 22.3323 8.25644 22.1678 7.51677 21.8691C7.34362 21.7991 7.15618 21.7716 6.97021 21.7891C6.78425 21.8065 6.60519 21.8684 6.4481 21.9694C5.93594 22.2996 5.3281 22.6286 4.6421 22.8887C4.23645 23.0434 3.82146 23.1724 3.3996 23.2749C3.7881 22.5667 4.18127 21.7233 4.36094 20.93C4.45077 20.5368 4.50094 20.1554 4.52194 19.7972C4.53617 19.5669 4.48177 19.3375 4.3656 19.1381C3.79639 18.1598 3.49762 17.0477 3.49994 15.9159C3.49994 13.921 4.40994 12.1396 5.83794 10.9625Z" fill="#36B972"/>
                                        </svg>
                                        <svg width="18" height="23" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.973 2.944C6.773 3.957 6.437 5.477 5.207 6.707C5.095 6.819 4.972 6.937 4.842 7.063C3.7 8.164 2 9.804 2 12.5C2 13.963 2.63 15.35 3.601 16.375C4.578 17.406 5.829 18 7 18H12C12.352 18 12.646 17.91 12.82 17.793C12.965 17.697 13 17.613 13 17.5C13 17.388 12.965 17.303 12.82 17.207C12.646 17.091 12.352 17 12 17H11C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H12.5C12.852 15 13.146 14.91 13.32 14.793C13.465 14.697 13.5 14.613 13.5 14.5C13.5 14.388 13.465 14.303 13.32 14.207C13.146 14.091 12.852 14 12.5 14H11.5C11.2348 14 10.9804 13.8946 10.7929 13.7071C10.6054 13.5196 10.5 13.2652 10.5 13C10.5 12.7348 10.6054 12.4804 10.7929 12.2929C10.9804 12.1054 11.2348 12 11.5 12H13C13.352 12 13.646 11.91 13.82 11.793C13.965 11.697 14 11.613 14 11.5C14 11.388 13.965 11.303 13.82 11.207C13.646 11.091 13.352 11 13 11H12C11.7348 11 11.4804 10.8946 11.2929 10.7071C11.1054 10.5196 11 10.2652 11 10C11 9.73478 11.1054 9.48043 11.2929 9.29289C11.4804 9.10536 11.7348 9 12 9H13C13.352 9 13.646 8.91 13.82 8.793C13.965 8.697 14 8.613 14 8.5C14 8.388 13.965 8.303 13.82 8.207C13.646 8.091 13.352 8 13 8H8.5C8.34101 8.00004 8.1843 7.96217 8.04288 7.88954C7.90145 7.8169 7.77938 7.71159 7.6868 7.58234C7.59421 7.45309 7.53378 7.30363 7.51051 7.14636C7.48724 6.98908 7.50181 6.82852 7.553 6.678V6.677L7.557 6.667L7.57 6.627L7.623 6.457C7.667 6.307 7.728 6.09 7.791 5.829C7.94306 5.21731 8.03615 4.59245 8.069 3.963C8.095 3.278 8.004 2.753 7.821 2.433C7.713 2.243 7.55 2.072 7.171 2.018C7.123 2.182 7.079 2.406 7.015 2.734L6.973 2.944ZM9.803 6C9.925 5.442 10.041 4.747 10.068 4.037C10.098 3.222 10.018 2.247 9.558 1.442C9.048 0.546 8.146 0 6.9 0C6.518 0 6.16 0.126 5.87 0.38C5.607 0.61 5.457 0.896 5.364 1.126C5.216 1.493 5.124 1.969 5.047 2.371L5.011 2.556C4.817 3.543 4.563 4.523 3.793 5.293C3.705 5.381 3.598 5.483 3.476 5.598C2.353 6.662 0 8.893 0 12.5C0 14.537 0.87 16.4 2.149 17.75C3.422 19.094 5.171 20 7 20H12C12.648 20 13.354 19.84 13.93 19.457C14.535 19.053 15 18.387 15 17.5C15 17.031 14.87 16.625 14.66 16.285C15.149 15.875 15.5 15.272 15.5 14.5C15.5 14.031 15.37 13.624 15.16 13.286C15.649 12.876 16 12.272 16 11.5C16 10.891 15.782 10.387 15.449 10C15.781 9.613 16 9.109 16 8.5C16 7.612 15.535 6.947 14.93 6.543C14.354 6.159 13.648 6 13 6H9.803Z" fill="#36B972"/>
                                        </svg>
                                        <svg width="17" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17484 0.675202C8.39362 0.456486 8.69032 0.333618 8.99968 0.333618C9.30903 0.333618 9.60573 0.456486 9.82451 0.675202L14.4912 5.34187C14.7037 5.56191 14.8213 5.85661 14.8186 6.1625C14.816 6.4684 14.6933 6.76101 14.477 6.97732C14.2607 7.19363 13.968 7.31633 13.6621 7.31899C13.3562 7.32165 13.0615 7.20405 12.8415 6.99154L10.1663 4.31637V15.5C10.1663 15.8095 10.0434 16.1062 9.82463 16.325C9.60584 16.5438 9.3091 16.6667 8.99968 16.6667C8.69026 16.6667 8.39351 16.5438 8.17472 16.325C7.95593 16.1062 7.83301 15.8095 7.83301 15.5V4.31637L5.15784 6.99154C4.93781 7.20405 4.6431 7.32165 4.33721 7.31899C4.03131 7.31633 3.7387 7.19363 3.52239 6.97732C3.30608 6.76101 3.18338 6.4684 3.18072 6.1625C3.17806 5.85661 3.29566 5.56191 3.50818 5.34187L8.17484 0.675202ZM0.833008 13.1667C0.833008 12.2384 1.20176 11.3482 1.85813 10.6918C2.51451 10.0355 3.40475 9.6667 4.33301 9.6667H5.49968C5.80909 9.6667 6.10584 9.78962 6.32463 10.0084C6.54343 10.2272 6.66634 10.524 6.66634 10.8334C6.66634 11.1428 6.54343 11.4395 6.32463 11.6583C6.10584 11.8771 5.80909 12 5.49968 12H4.33301C4.02359 12 3.72684 12.123 3.50805 12.3417C3.28926 12.5605 3.16634 12.8573 3.16634 13.1667V20.1667C3.16634 20.4761 3.28926 20.7729 3.50805 20.9917C3.72684 21.2105 4.02359 21.3334 4.33301 21.3334H13.6663C13.9758 21.3334 14.2725 21.2105 14.4913 20.9917C14.7101 20.7729 14.833 20.4761 14.833 20.1667V13.1667C14.833 12.8573 14.7101 12.5605 14.4913 12.3417C14.2725 12.123 13.9758 12 13.6663 12H12.4997C12.1903 12 11.8935 11.8771 11.6747 11.6583C11.4559 11.4395 11.333 11.1428 11.333 10.8334C11.333 10.524 11.4559 10.2272 11.6747 10.0084C11.8935 9.78962 12.1903 9.6667 12.4997 9.6667H13.6663C14.5946 9.6667 15.4848 10.0355 16.1412 10.6918C16.7976 11.3482 17.1663 12.2384 17.1663 13.1667V20.1667C17.1663 21.095 16.7976 21.9852 16.1412 22.6416C15.4848 23.298 14.5946 23.6667 13.6663 23.6667H4.33301C3.40475 23.6667 2.51451 23.298 1.85813 22.6416C1.20176 21.9852 0.833008 21.095 0.833008 20.1667V13.1667Z" fill="#36B972"/>
                                        </svg> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal_wrapper_media">
                            <img src="${gameScreenshot[0]}" alt="">
                            <div class="modal_wrapper_media--small-preview">
                                <img src="${gameScreenshot[2]}" alt="">
                                <img src="${gameScreenshot[3]}" alt="">
                                <img src="${gameScreenshot[4]}" alt="">
                                <img src="${gameScreenshot[5]}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            
            let modalBakcground = document.querySelector('.modal-container .modal');
            modalBakcground.style.backgroundImage = `url(${background_image})`;
            modalBakcground.style.backgroundSize = 'contain';
            modalBakcground.style.backgroundRepeat = 'no-repeat';
            

            
        }  
          
    }
catch(error){
    console.log(error)
}}

function closeModal() {
    modalContainer.innerHTML = ''
    modalContainer.classList.add("hidden");
}





