const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-field');
const card = document.getElementById('card');

const APIURL = 'https://api.github.com/users/';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = searchField.value;

    displayCard(username);

    //empty search field
    searchField.value = '';
});

async function displayCard(username) {
    try {
        const {data} = await axios(APIURL + username);
        createCard(data);
        addRepos(username);
    } catch (error) {
        createErrorCard('no user found...');
    }      
}

function createCard(user) {
    const cardContent = `
        <div id="profile-picture">
            <img src="${user.avatar_url}" alt="${user.name}">
        </div>

        <div id="user-info">
            <h1 id="username">${user.name}</h1>
            <p id="user-bio">${user.bio}</p>

            <div id="user-stats">
                <span>${user.followers} <strong>Followers</strong></span>
                <span>${user.following} <strong>Following</strong></span>
                <span>${user.public_repos} <strong>Repos</strong></span>
            </div>

            <div id="user-repos"></div>
        </div>
    `;

    card.innerHTML = cardContent;
    card.style.display = 'flex';
}

function createErrorCard(message) {
    card.textContent = message;
    card.style.display = 'flex';
    card.style.justifyContent = 'center';
}

async function addRepos(username) {
    try {
        const {data} = await axios(APIURL + username + '/repos');
        const repos = data.slice(0, 10);
        const userRepos = document.getElementById('user-repos');

        repos.forEach(repoData => {
            const repo = document.createElement('span');
            repo.classList.add('repo');
            repo.textContent = repoData.name;
            userRepos.appendChild(repo);
        });
    } catch (error) {
        displayErrorRepos('error occured while retrieving repos');       
    }
}

function displayErrorRepos(message) {
    const userRepos = document.getElementById('user-repos');
    userRepos.textContent = message;
}