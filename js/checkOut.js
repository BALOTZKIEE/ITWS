let confirmOrder = document.getElementById("confirm-order");
let checkoutForm = document.getElementById("checkout-form");

confirmOrder.addEventListener("click", function(event) {

    if (!checkoutForm.checkValidity()) {
        event.preventDefault();
        checkoutForm.reportValidity();
    }

});
