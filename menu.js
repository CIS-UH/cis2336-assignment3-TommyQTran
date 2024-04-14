// Array of menu items with their details
const menuItems = [
    { name: 'Burger', image: 'images/burger.jpeg', price: 9.99 },
    { name: 'Pizza', image: 'images/pizza.jpeg', price: 12.99 },
    { name: 'Salad', image: 'images/salad.jpeg', price: 7.99 },
];

// Get the menu container element
const menuContainer = document.getElementById('menu-container');

// Function to create the order form dynamically
function createOrderForm() {
    const orderFormContent = document.getElementById('order-form-content');
    orderFormContent.innerHTML = '';

    // Loop through each menu item and create form elements
    menuItems.forEach(item => {
        const formItem = document.createElement('div');
        formItem.classList.add('form-item');

        const name = document.createElement('label');
        name.textContent = item.name;

        const quantity = document.createElement('input');
        quantity.type = 'number';
        quantity.min = '0';
        quantity.max = '10';
        quantity.value = '0';
        quantity.dataset.price = item.price;

        formItem.appendChild(name);
        formItem.appendChild(quantity);

        orderFormContent.appendChild(formItem);
    });
}

// Function to validate the order quantities
function validateOrder(quantities) {
    let isEmpty = true;
    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] < 0 || quantities[i] > 10) {
            alert(`Invalid quantity for ${menuItems[i].name}. Please enter a number between 0 and 10.`);
            return false;
        }
        if (quantities[i] > 0) {
            isEmpty = false;
        }
    }
    if (isEmpty) {
        alert('Please select at least one item to place an order.');
        return false;
    }
    return true;
}

// Function to handle the order submission
function submitOrder(event) {
    event.preventDefault();

    // Get the entered quantities from the form inputs
    const quantities = Array.from(document.querySelectorAll('#order-form-content input')).map(input => parseInt(input.value));

    // Validate the order quantities
    if (validateOrder(quantities)) {
        // Create an array of ordered items with their details
        const order = menuItems.map((item, index) => ({
            name: item.name,
            quantity: quantities[index],
            price: item.price
        })).filter(item => item.quantity > 0);

        console.log('Order submitted:', order);
        alert('Order submitted successfully!');
    }
}

// Function to display the menu items
function displayMenu() {
    menuContainer.innerHTML = '';

    // Loop through each menu item and create menu item elements
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;

        const name = document.createElement('h3');
        name.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = `$${item.price.toFixed(2)}`;

        menuItem.appendChild(image);
        menuItem.appendChild(name);
        menuItem.appendChild(price);

        menuContainer.appendChild(menuItem);
    });
}

// Call the functions to display the menu and create the order form
displayMenu();
createOrderForm();

// Add event listener to the submit order button
document.getElementById('submit-order').addEventListener('click', submitOrder);