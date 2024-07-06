// profile.js

window.onload = function() {
    // Fetch user data from server
    fetch('/get-user-data')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').innerText = data.name;
        document.getElementById('email').innerText = data.email;
        document.getElementById('address').innerText = data.address;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Fetch user orders from server
    fetch('/get-user-orders')
    .then(response => response.json())
    .then(data => {
        const ordersList = document.getElementById('orders-list');
        data.orders.forEach(order => {
            const listItem = document.createElement('li');
            listItem.innerText = `Order ID: ${order.id}, Date: ${order.date}, Total: ${order.total}`;
            ordersList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('edit-profile-button').addEventListener('click', function() {
        window.location.href = 'edit-profile.html'; // Link to the modification card page
    });
};
