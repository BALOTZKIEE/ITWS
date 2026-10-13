let cart = JSON.parse(localStorage.getItem('cart')) || [];

let addToCartButtons = document.querySelectorAll('.add-to-cart a');

addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        let menuCard = button.closest('.menu-card');

        let name = menuCard.querySelector('.name h3').textContent.trim();

        let priceText = menuCard.querySelector('.price p').textContent;
        let price = parseFloat(priceText.replace(/[₱,]/g, ''));

        let image = menuCard.querySelector('img').getAttribute('src');

        let category = menuCard.dataset.category;

        let standaloneRice =
            menuCard.dataset.standaloneRice === 'true';

        let existingItem = cart.find(function(item) {
            return item.name === name &&
                Boolean(item.standaloneRice) === standaloneRice;
        });

        if (existingItem) {
            existingItem.quantity++;

            // Add one default rice for each additional meal
            if (category === 'meals' && !standaloneRice) {
                existingItem.riceQuantity =
                    (existingItem.riceQuantity || 0) + 1;
            }
        } else {
            let item = {
                name: name,
                price: price,
                image: image,
                quantity: 1,
                category: category,
                standaloneRice: standaloneRice,
                riceQuantity:
                category === 'meals' && !standaloneRice ? 1 : 0,
                orderType: 'dine-in'
            };

            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(name + ' added to cart!');

        window.location.href = 'cart.html';
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
