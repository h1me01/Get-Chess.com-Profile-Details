const chessAPI = 'https://api.chess.com/pub/player/';
const input = document.getElementById('text');
const main = document.getElementById('main');
const form = document.getElementById('form');

async function GetDataOfPlayer(player) {
    try {
        const response = await fetch(chessAPI + player);

        if (!response.ok) {
            throw new Error('Player not found');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function GetCountry(countryURL) {
    try {
        const response = await fetch(countryURL);

        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.log(error);
    }
}

async function SetPlayerInformation(player) {
    try {
        const result = await GetDataOfPlayer(player);

        let playerData = {
            name: result.name || result.username,
            username: result.username,
            avatar: result.avatar || 'img/firstIMG.gif',
            followers: result.followers,
            location: result.location || '(Player has not set location yet)',
            title: result.title || 'None',
            country: await GetCountry(result.country),
        };

        AddingMain(playerData);
    } catch (error) {
        console.log(error);
    }
}

function AddingMain(playerData) {
    const { username, name, avatar, country, location, title, followers } = playerData;
    
    main.innerHTML = `
    <div class="player-name">${username}</div>
    <div class="player-data">
      <div class="player-img">
        <img src="${avatar}" alt="...">
      </div>
      <div class="player-info">
        The name of the Player is ${name} and he lives in ${country}, to be more specific he is located in ${location}. 
      </div>
    </div>
    <div class="player-games">
      <div class="statics">
        <div class="wins">
          Real Name: ${name}
        </div>
        <div class="losses">
          Title: ${title}
        </div>
        <div class="draws">
          Followers: ${followers}
        </div>
      </div>
    </div>
  `;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let playerName = input.value;
    SetPlayerInformation(playerName);
});