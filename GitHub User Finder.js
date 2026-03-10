
const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('usernameInput');
const profileCard = document.getElementById('profileCard');
const errorMessage = document.getElementById('error-message');

const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const bioEl = document.getElementById('bio');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');
const profileLink = document.getElementById('profileLink');

const API_URL = 'https://api.github.com/users/';

async function fetchGitHubUser(username) {
    try {
        const response = await fetch(API_URL + username);
        
        if (!response.ok) {
            throw new Error('User not found');
        }
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        showError();
    }
}


function updateUI(user) {
  
    errorMessage.classList.add('hidden');
    profileCard.classList.remove('hidden');


    avatar.src = user.avatar_url;

    nameEl.textContent = user.name ? user.name : user.login; 
    usernameEl.textContent = `@${user.login}`;
    bioEl.textContent = user.bio ? user.bio : 'This user has no bio available.';
    followersEl.textContent = user.followers;
    followingEl.textContent = user.following;
    profileLink.href = user.html_url;
}


function showError() {
    profileCard.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubUser(username);
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubUser(username);
        }
    }
});