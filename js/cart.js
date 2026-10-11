let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get the elements from cart.html
let cartItems = document.querySelector('#cart-items');
let cartTotal = document.querySelector('#cart-total');
let emptyMessage = document.querySelector('#empty-cart');
let cartTable = document.querySelector('#cart-table');


// FUNCTION 1: Display the cart
function displayCart() {

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    let total = 0;

    // Check if the cart is empty
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        cartTable.style.display = 'none';

        cartTotal.textContent = 'TOTAL: ₱0.00';

        return;
    }

    // If the cart has items, show the table
    emptyMessage.style.display = 'none';
    cartTable.style.display = 'table';


    // Display each item in the cart
    cart.forEach(function(item, index) {

        let subtotal = item.price * item.quantity;

        // Add the subtotal to the total
        total = total + subtotal;


        // Create a table row for the item
        let row = `
            <tr>
                <td>
                    <img src="${item.image}" alt="${item.name}" class="img">
                </td>

                <td>${item.name}</td>

                <td class="price">
                    ₱${item.price.toFixed(2)}
                </td>

                <td>
                    <div class="quantity">

                        <button type="button"
                            class="minus-btn"
                            data-index="${index}">−</button>

                        <span class="quantity-number">
                            ${item.quantity}
                        </span>

                        <button type="button"
                            class="plus-btn"
                            data-index="${index}">+</button>

                    </div>
                </td>

                <td class="price">
                    ₱${subtotal.toFixed(2)}
                </td>

                <td>
                    <button type="button"
                        class="remove-btn"
                        data-index="${index}">×</button>
                </td>
            </tr>
        `;

        // Add the row to the table
        cartItems.innerHTML = cartItems.innerHTML + row;

    });


    // Display the final total
    cartTotal.textContent = 'TOTAL: ₱' + total.toFixed(2);

}


// FUNCTION 2: Handle the cart buttons
cartItems.addEventListener('click', function(event) {

    // Get the button that was clicked
    let button = event.target;

    // Check if the clicked element is a button
    if (button.tagName !== 'BUTTON') {
        return;
    }

    // Get the item's position in the cart array
    let index = Number(button.dataset.index);


    // If the plus button was clicked
    if (button.classList.contains('plus-btn')) {

        cart[index].quantity = cart[index].quantity + 1;

    }

    // If the minus button was clicked
    else if (button.classList.contains('minus-btn')) {

        if (cart[index].quantity > 1) {

            cart[index].quantity = cart[index].quantity - 1;

        } else {

            // Remove the item if its quantity is already 1
            cart.splice(index, 1);

        }

    }

    // If the remove button was clicked
    else if (button.classList.contains('remove-btn')) {

        cart.splice(index, 1);

    }

    else {
        return;
    }


    // Save the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCart();

});


// Display the cart when the page opens
displayCart();
