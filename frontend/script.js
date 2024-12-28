document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('registrationForm').reset();
    })
    .catch(error => console.error('Error:', error));
});