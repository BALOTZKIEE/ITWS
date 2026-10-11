let addToCartButtons = document.querySelectorAll('.add-to-cart a');

// Check every Add to Cart link
addToCartButtons.forEach(function(button) {

    button.addEventListener('click', function(event) {

        let foodCard = button.closest('.menu-card');
        let foodName = foodCard.querySelector('.name h3').textContent;
        let priceText = foodCard.querySelector('.price p').textContent;
        let foodPrice = Number(priceText.replace('₱', '').trim());
        let foodImage = foodCard.querySelector('img').getAttribute('src');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let foundFood = false;

        for (let i = 0; i < cart.length; i++) {

            if (cart[i].name === foodName) {

                // Increase the quantity if the food already exists
                cart[i].quantity = cart[i].quantity + 1;

                foundFood = true;

                break;
            }
        }

        // Add the food if it is not already in the cart
        if (foundFood === false) {

            let newFood = {
                name: foodName,
                price: foodPrice,
                image: foodImage,
                quantity: 1
            };

            cart.push(newFood);
        }
        // Save the updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        // Show a confirmation message
        alert(foodName + ' added to cart!');
    });
});


// FILTER MENU 
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search");
let menuCards = document.querySelectorAll(".menu-card");
let noResults = document.querySelector("#no-results");
let categoryLinks = document.querySelectorAll(".category-section ul li a");

let activeCategory = "all";

// FILTER MENU ITEMS
let filterMenu = () => {
    let searchValue = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    menuCards.forEach((card) => {
        let itemName = card.querySelector(".name h3").textContent.toLowerCase();
        let itemCategory = card.dataset.category;

        // CHECK IF THE ITEM MATCHES THE SEARCH
        let matchesSearch = itemName.includes(searchValue);

        // CHECK IF THE CATEGORY IS SELECTED
        let matchesCategory =
            activeCategory === "all" || itemCategory === activeCategory;

        // SHOW OR HIDE THE MENU ITEM
        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // SHOW MESSAGE IF NO ITEMS ARE FOUND
    noResults.hidden = visibleCount > 0;
};

// SEARCH BUTTON
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterMenu();
});

// SEARCH WHILE TYPING
searchInput.addEventListener("input", () => {
    filterMenu();
});

// CATEGORY BUTTONS
categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        activeCategory = link.getAttribute("href").substring(1);

        // REMOVE ACTIVE CLASS FROM ALL CATEGORIES
        categoryLinks.forEach((category) => {
            category.classList.remove("active");
        });

        // HIGHLIGHT THE SELECTED CATEGORY
        link.classList.add("active");

        filterMenu();
    });
});

// DISPLAY ALL ITEMS WHEN THE PAGE LOADS
filterMenu();
