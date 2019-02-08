/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */

// Endpoints
const BASE_URL = 'http://questioner-server.herokuapp.com/api/v2';
const SIGNUP_URL = `${BASE_URL}/auth/signup`;
const LOGIN_URL = `${BASE_URL}/auth/login`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;
const UPCOMING_MEETUPS_URL = `${BASE_URL}/meetups/upcoming`;


/**
 * Function to check if user is logged in
 */
function checkLogin() {
    if (!localStorage.getItem('loggedIn')) {
        window.location.replace('login.html');
    } else if (localStorage.getItem('loggedIn') === false) {
        window.location.replace('login.html');
    }
}

/**
 * Function to register a new user
 */
function register() {
    loader = document.getElementById('signup-loader');
    loader.style.display = 'block';

    fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phonenumber: document.getElementById('phonenumber').value,
        }),
    })
    .then(res => res.json())
    .then((data) => {
        loader.style.display = 'none';

        if (data.status === 422) {
            window.alert('Invalid data provided');
        } else if (data.status === 201) {
            window.location.replace('login.html');
        } else {
            window.alert(data.message);
        }
    })
    .catch((error) => {
        loader.style.display = 'none';

        console.log(`Error: ${error}`);
    });
}

/**
 * Function to login user
 */
function login() {
    loader = document.getElementById('login-loader');
    loader.style.display = 'block';

    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }),
    })
    .then(res => res.json())
    .then((data) => {
        loader.style.display = 'none';

        if (data.status === 422) {
            window.alert('Invalid data provided');
        } else if (data.status === 200) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('token', data.access_token);

            window.location.replace('index.html');
        } else {
            window.alert(data.message);
        }
    })
    .catch((error) => {
        loader.style.display = 'none';

        console.log(`Error: ${error}`);
    });
}

/**
 * Function to logout a user
 */
function logout() {
    const token = localStorage.getItem('token');
    console.log(`Token: ${token}`);

    fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(res => res.json())
    .then((data) => {
        console.log(`Token: ${token}, Data: ${JSON.stringify(data)}`);

        if (data.status === 200) {
            localStorage.setItem('loggedIn', false);
            localStorage.removeItem('token');

            window.location.replace('login.html');
        } else {
            window.alert(data.message);
        }
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    });
}

/**
 * Function to fetch upcoming meetups
 */
function fetchUpcomingMeetups() {
    meetupsList = document.getElementById('upcoming-meetups-list');
    emptyState = document.getElementById('upcoming-meetups-empty');

    fetch(UPCOMING_MEETUPS_URL, {
        method: 'GET',
    })
    .then(res => res.json())
    .then((data) => {
        if (data.status === 200) {
            const meetups = data.data;

            if (meetups.length > 0) {
                emptyState.style.display = 'none';
                meetupsList.style.display = 'grid';

                meetups.forEach((meetup) => {
                    const newMeetup = document.createElement('div');
                    newMeetup.classList.add('meetup');
                    newMeetup.id = meetup.id;
                    newMeetup.addEventListener('click', viewMeetup(meetup.id));

                    const details = `
                        <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F52898717%2F21809261606%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C19%2C1280%2C640&s=337936a5d54b58a232e00f63a3f643fc" alt="sd">

                        <div class="meetup-info">
                            <div class="cal">
                                <span class="cal-month">JAN</span>
                                <span class="cal-date">07</span>
                            </div>

                            <div class="details">
                                <p class="details-title">${meetup.topic}</p>

                                <span class="details-date">${meetup.happening_on}</span>

                                <span class="details-venue">${meetup.location}</span>
                            </div>
                        </div>
                    `;

                    newMeetup.innerHTML = details;
                    meetupsList.appendChild(newMeetup);
                });
            } else {
                meetupsList.style.display = 'none';
                emptyState.style.display = 'flex';
            }
        }
    })
    .catch((error) => {
        console.log(`Error fetching upcoming meetups: ${error}`);
    });
}

function viewMeetup(id) {
    console.log(`Meetup: ${id}`);
}

function meetups() {
    window.location = 'meetups.html';
}

function createMeetup() {
    window.location = 'create-meetup.html';
}

function deleteMeetup() {
    alert('Meetup deleted!');
}

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') {
        // Buttons
        const logoutBtn = document.getElementById('logout');

        // Register event listeners
        logoutBtn.addEventListener('click', logout);
    }
});
