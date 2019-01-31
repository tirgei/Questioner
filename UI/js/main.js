/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */

// Endpoints
const BASE_URL = 'http://questioner-server.herokuapp.com/api/v2';
const SIGNUP_URL = `${BASE_URL}/auth/signup`;

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


function viewMeetup() {
    window.location = 'meetup.html';
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
