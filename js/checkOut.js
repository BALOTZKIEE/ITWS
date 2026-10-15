let confirmOrder = document.getElementById("confirm-order");
let checkoutForm = document.getElementById("checkout-form");

confirmOrder.addEventListener("click", function(event) {

    if (!checkoutForm.checkValidity()) {
        event.preventDefault();
        checkoutForm.reportValidity();
    }

});


// Order Summary
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let summaryItems = document.getElementById("summary-items");
let summaryTotal = document.getElementById("summary-total");

let ricePrice = 10;
let takeOutFee = 10;
let total = 0;

cart.forEach(function(item) {

    let isStandaloneRice = item.standaloneRice === true;
    let isMeal = item.category === "meals" && !isStandaloneRice;

    let riceAdjustment = 0;

    if (isMeal) {
        let riceQuantity = item.riceQuantity ?? item.quantity;
        riceAdjustment = (riceQuantity - item.quantity) * ricePrice;
    }

    let takeOutAdjustment = 0;

    if (isMeal && item.orderType === "take-out") {
        takeOutAdjustment = takeOutFee * item.quantity;
    }

    let subtotal = (item.price * item.quantity)
        + riceAdjustment
        + takeOutAdjustment;

    total += subtotal;

    summaryItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${subtotal.toFixed(2)}</td>
        </tr>
    `;

});

summaryTotal.textContent = "₱" + total.toFixed(2);