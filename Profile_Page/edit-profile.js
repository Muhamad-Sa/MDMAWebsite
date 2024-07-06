// edit-profile.js

window.onload = function() {
    // Fetch user data from server
    fetch('/get-user-data')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('password').value = data.password;
        document.getElementById('address').value = data.address;
        document.getElementById('payment-card').value = data.paymentCard;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('profile-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            address: document.getElementById('address').value,
            paymentCard: document.getElementById('payment-card').value
        };

        // Perform validation
        if (validateFormData(formData)) {
            // Send data to server (example using fetch API)
            fetch('/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile updated successfully');
                    window.location.href = 'profile.html'; // Redirect to main profile page
                } else {
                    alert('Error updating profile');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating profile');
            });
        }
    });

    function validateFormData(formData) {
        // Example validation
        if (formData.name === '' || formData.email === '' || formData.password === '') {
            alert('Name, email, and password are required');
            return false;
        }
        return true;
    }
};
