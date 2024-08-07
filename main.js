function validateForm(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const status = document.getElementById('status').value;

    let isValid = true;
    // 
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('genderError').textContent = '';
    document.getElementById('statusError').textContent = '';

    if (!name || !validateName(name)) {
        document.getElementById('nameError').textContent = 'Please enter a valid name.';
        isValid = false;
    }

    if (!email || !validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email.';
        isValid = false;
    }

    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select a gender.';
        isValid = false;
    }

    if (!status) {
        document.getElementById('statusError').textContent = 'Please select a status.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const userData = {
        name: name,
        email: email,
        gender: gender.value,
        status: status
    };

    fetch('https://gorest.co.in/public/v2/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer a8a3a90839920dd03f8f9fdd04f0ab14af9fe2631e698ddc52fba312104eeaf5'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('User created:', data);
            alert('Details submitted successfully.');
            addRowToTable(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit details.');
        });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
}


//display

window.onload = function() {
    fetchData();

    const form = document.getElementById('validationForm');
    form.addEventListener('submit', function(event) {
        validateForm(event);

    });
};



function fetchData() {
    fetch('https://gorest.co.in/public/v2/users', {
            headers: {
                'Authorization': 'Bearer a8a3a90839920dd03f8f9fdd04f0ab14af9fe2631e698ddc52fba312104eeaf5'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
}

function displayData(data) {
    const tableBody = document.querySelector('#data tbody');
    tableBody.innerHTML = '';
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.status}</td>
            <td><button onclick="deleteUser(${user.id})">Delete</button></td>

        `;
        tableBody.appendChild(row);
    });
}


function deleteUser(id) {
    fetch(`https://gorest.co.in/public/v2/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer a8a3a90839920dd03f8f9fdd04f0ab14af9fe2631e698ddc52fba312104eeaf5'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Data deleted successfully!');
                fetchData()
            }
        })
}