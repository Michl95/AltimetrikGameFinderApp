let games = ''; // by assigning a global scope to this variable I keep the previous games loaded while new games are being loaded
let page = 1;
let lastGameOneScreen; // by default when we load for the first time we are not going to have 

// observer
// I want it to be a new instance - I need to pass two things, the function I want to be executed when we are making use of our observer - When I reach the last game I want to execute a function that loads new games
let observer = new IntersectionObserver((entrys) => {
    // we access to entrys through a forEach
    entrys.forEach(entry => {
        // I`ll check if our target which is our last game has a particual property - means that is on screen - watch for all of our games and forEach one ask if it has a certin property
        if (entry.isIntersecting) {
            page++;
            loadGames();

        }
    });
}, {
    // Observer options - added marginBottom to give time to do the request for better fluency
    rootMargin: '0px 0px 400px 0px',
    threshold: 1.0
});


const loadGames = async() => { // connects to our API, loads the games and put it in out container
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=0287d94a76d24548a822e6b8ce6351c8&page=${page}`); // fetch return a promise and we store it in our variable, a promise means that we are making a request but we have to wait until it finished before doing something with it
        // if our response is OK
        if (response.status === 200) {
            const res = await response.json();
            res.results.forEach(game => {
                games += `<div class="game-card">
                <div class="game-card_img_container">
                    <svg class="game-card--heart" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C3.11 2 2 3.113 2 4.467C2 5.991 2.882 7.617 4.246 9.21C5.392 10.547 6.784 11.753 8 12.726C9.216 11.753 10.608 10.546 11.754 9.21C13.118 7.617 14 5.99 14 4.467C14 3.113 12.89 2 11.5 2C10.11 2 9 3.113 9 4.467C9 4.73222 8.89464 4.98658 8.70711 5.17411C8.51957 5.36165 8.26522 5.467 8 5.467C7.73478 5.467 7.48043 5.36165 7.29289 5.17411C7.10536 4.98658 7 4.73222 7 4.467C7 3.113 5.89 2 4.5 2ZM8 1.659C7.57656 1.13976 7.0427 0.721428 6.43726 0.434448C5.83181 0.147467 5.17001 -0.000945666 4.5 4.53399e-06C2.024 4.53399e-06 0 1.99 0 4.467C0 6.718 1.267 8.807 2.727 10.511C4.208 12.24 6.024 13.729 7.386 14.789C7.56154 14.9256 7.7776 14.9997 8 14.9997C8.2224 14.9997 8.43846 14.9256 8.614 14.789C9.976 13.729 11.792 12.239 13.273 10.511C14.733 8.807 16 6.718 16 4.467C16 1.99 13.976 4.53399e-06 11.5 4.53399e-06C10.09 4.53399e-06 8.826 0.646004 8 1.659Z" fill="#ffffff"/>
                    </svg>
                    <img class="game-card--img" src="${game.background_image}" alt="">
                </div>
                <div class="game-card_info--container">
                    <div class="game-card_title-container">
                        <h3 class="game-card--title text-title">${game.name}</h3>
                        <span class="game-card--number number">#${game.rating}</span>
                    </div>
                    <div class="game-card_releaseDate-container">
                        <p class="text_card-500 realease">Release date:</p>
                        <p class="text_card-400 date">${game.released}</p>
                        <span class="game-card_icon--container">
                            <svg class="playstation" id="playstation" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.55164 9.53674e-06L9.55164 18.2774L13.3604 19.5885L13.3604 4.26319C13.3604 3.54103 13.6567 3.06155 14.132 3.22645C14.7534 3.41372 14.8742 4.07895 14.8742 4.79307L14.8742 10.9138C17.2449 12.1606 19.1114 10.9131 19.1114 7.62345C19.1114 4.26188 18.0171 2.76435 14.7972 1.56033C13.5271 1.10084 11.1734 0.325457 9.55164 9.53674e-06Z" fill="#ffffff"/>
                                <path d="M14.3503 16.9129L20.1076 14.3203C20.7589 14.0148 20.8585 13.5998 20.3314 13.3817C19.796 13.1596 18.8404 13.2232 18.1821 13.5222L14.3503 15.2325V12.5036L14.5698 12.412C14.5698 12.412 15.6789 11.9148 17.239 11.7008C18.796 11.4848 20.7055 11.7289 22.2063 12.4446C23.8969 13.1241 24.0864 14.1153 23.6587 14.8051C23.2247 15.4877 22.1726 15.9815 22.1726 15.9815L14.3503 19.5367" fill="#ffffff"/>
                                <path d="M1.7099 17.2146C-0.0868735 16.6444 -0.386499 15.4395 0.433179 14.7435C1.18926 14.1079 2.47691 13.6295 2.47691 13.6295L7.79974 11.4675V13.9281L3.97289 15.4908C3.29503 15.767 3.1934 16.1557 3.73939 16.359C4.29514 16.5706 5.28141 16.5137 5.95966 16.2286L7.79974 15.4728V17.6695C7.68114 17.6921 7.54927 17.715 7.42892 17.7384C5.5943 18.0852 3.63971 17.9428 1.7099 17.2146Z" fill="#ffffff"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7661 19.4589C23.6149 19.6145 23.4164 19.7024 23.2027 19.7024C22.989 19.7024 22.784 19.6145 22.6326 19.4589C22.4831 19.3005 22.4004 19.0936 22.4004 18.8706C22.4004 18.4089 22.7591 18.0357 23.2027 18.0357C23.4164 18.0357 23.6149 18.1208 23.7661 18.2798C23.9156 18.4352 24 18.6456 24 18.8706C24 19.0936 23.9156 19.3005 23.7661 19.4589ZM22.5352 18.8707C22.5352 18.6808 22.6033 18.5067 22.7279 18.3776C22.8555 18.2458 23.0258 18.1747 23.2027 18.1747C23.3798 18.1747 23.5458 18.2458 23.6703 18.3776C23.7959 18.5067 23.8638 18.6808 23.8638 18.8707C23.8638 19.2511 23.567 19.5599 23.2027 19.5599C23.0258 19.5599 22.8555 19.4896 22.7279 19.3594C22.6033 19.2281 22.5352 19.0558 22.5352 18.8707ZM23.5677 19.2169C23.5748 19.2384 23.5835 19.2511 23.5958 19.2548L23.607 19.2614V19.3143H23.4334L23.4302 19.3036L23.4184 19.2717C23.4164 19.2548 23.4141 19.2328 23.4117 19.1957L23.404 19.0508C23.402 18.9993 23.3859 18.9694 23.3561 18.9496C23.334 18.9419 23.3039 18.9359 23.259 18.9359H23.018V19.3143H22.8599V18.3849H23.2745C23.3421 18.3849 23.399 18.3975 23.4426 18.4167C23.53 18.4596 23.5748 18.5368 23.5748 18.6455C23.5748 18.6988 23.5621 18.7487 23.5402 18.7856C23.5212 18.8116 23.4988 18.8353 23.4744 18.8585L23.4809 18.8633C23.4974 18.8754 23.5138 18.8874 23.5235 18.9051C23.5456 18.9305 23.5556 18.9731 23.5574 19.028L23.5614 19.1463C23.5621 19.1766 23.5644 19.2002 23.5677 19.2169ZM23.3807 18.7599C23.4063 18.7427 23.4184 18.7085 23.4184 18.6561C23.4184 18.6009 23.4001 18.5641 23.3642 18.5458C23.3421 18.5368 23.3146 18.5303 23.2779 18.5303H23.018V18.7914H23.2635C23.3123 18.7914 23.3511 18.7809 23.3807 18.7599Z" fill="#fffff"/>
                            </svg>
                            <svg class="xbox" id="xbox" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.9286 0 13.5238 0.616246 14.9762 1.65266C15 1.65266 15 1.68067 15 1.70868C15 1.73669 14.9762 1.73669 14.9524 1.73669C13.0952 1.2605 10.2857 3.13725 10.0238 3.33333H10H9.97619C9.71429 3.13725 6.90476 1.2605 5.04762 1.73669C5.02381 1.73669 5 1.73669 5 1.70868C5 1.68067 5 1.65266 5.02381 1.65266C6.47619 0.616246 8.07143 0 10 0ZM16.3903 17.5988C17.8903 16.0464 12.9308 10.5648 10.0035 8.33333C10.0035 8.33333 9.97935 8.33333 9.97935 8.35759C7.07626 10.5648 2.09261 16.0464 3.61674 17.5988C5.31021 19.1026 7.56011 20 10.0035 20C12.447 20 14.6727 19.1026 16.3903 17.5988ZM2.73973 3.38078C2.72831 3.38078 2.7226 3.38705 2.7169 3.39332C2.71119 3.39959 2.70548 3.40585 2.69406 3.40585C1.0274 5.2358 0 7.76763 0 10.5501C0 12.8313 0.707763 14.9621 1.87215 16.6416C1.87215 16.6667 1.89498 16.6667 1.91781 16.6667C1.94064 16.6667 1.94064 16.6416 1.91781 16.6165C1.21005 14.2351 4.79452 8.4946 6.64384 6.0881L6.66667 6.06303C6.66667 6.03796 6.66667 6.03796 6.64384 6.03796C3.83562 2.9797 2.89954 3.30558 2.73973 3.38078ZM13.3333 6.05268L13.3562 6.02759C16.1644 2.99144 17.1005 3.31764 17.2374 3.36782C17.2469 3.36782 17.2525 3.36782 17.2574 3.36962C17.2642 3.37215 17.2698 3.37825 17.2831 3.39291C18.9726 5.22464 20 7.75895 20 10.5442C20 12.8276 19.2922 14.9604 18.1279 16.6416C18.1279 16.6667 18.105 16.6667 18.0822 16.6667V16.6165C18.7671 14.2327 15.2055 8.48662 13.3562 6.07777C13.3333 6.07777 13.3333 6.05268 13.3333 6.05268Z" fill="#ffffff"/>
                            </svg>
                            <svg  class="windows" id="windows" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 9.16667H9.16667V1.53647L20 0V9.16667ZM8.33333 1.66667V9.16667H0V2.77865L8.33333 1.66667ZM8.33333 10H0V17.0992L8.33333 18.3333V10ZM9.16667 18.3262V10H20V20L9.16667 18.3262Z" fill="#ffffff"/>
                            </svg>
                        </span>
                    </div>
                    <div class="game-card_genre--container">
                        <p class="text_card-500 genre">Genres</p>
                        <p class="text_card-400">Action, RPG</p>
                    </div>
                </div>
            </div>`;
            });
            document.getElementById('game-card_container').innerHTML = games;
            // when our site reaches the last page we are going to stop runing this code otherwise our page will break into super tiny small pieces
            if (page < 37397) {

                // if I have already a game stored in that variable being observed I want it to stop observing it - Don't be a creep.
                if (lastGameOneScreen) {
                    observer.unobserve(lastGameOneScreen);
                }
                // and then I execute this code to observe my new last game
                const gamesOnScreen = document.querySelectorAll('.game-card_container .game-card');

                // getting the last game I have on screen and store it
                lastGameOneScreen = gamesOnScreen[gamesOnScreen.length - 1];

                // when our variable enters in our screen i want or observer to execute our code
                observer.observe(lastGameOneScreen)
            }

        } else if (response.status === 401) {
            console.log('Your key is not working');
        } else if (response.status === 404) {
            console.log('The game does not exist');
        } else {
            console.log('Something went wrong');
        }

    } catch (error) { // this has nothing to do with our request. in case there is an error it will show us in details
        console.log(error);
    }
}

// whne working with asyn function is  good to work with try and catch.
loadGames()