
// KAKUMA CONNECT JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // PRODUCT SEARCH AND FILTER
    const searchInput = document.getElementById("productSearch");
    const searchButton = document.querySelector(".search-box button");
    const clearButton = document.getElementById("clearSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const products = document.querySelectorAll(".product-card");

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        products.forEach(function (product) {
            const productName =
                product.querySelector("h3").textContent.toLowerCase();

            const category = product.dataset.category;

            const matchesSearch = productName.includes(searchText);
            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            product.style.display =
                matchesSearch && matchesCategory ? "inline-block" : "none";
        });
    }

    searchButton.addEventListener("click", filterProducts);
    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);

    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "all";
        filterProducts();
    });

    // SHOPPING CART
    let cartCount = 0;
    let cartTotal = 0;

    const cartDisplay = document.getElementById("cartCount");
    const totalItems = document.getElementById("totalItems");
    const totalPrice = document.getElementById("totalPrice");

    const cartButtons = document.querySelectorAll(".add-to-cart");
    const removeButtons = document.querySelectorAll(".remove-from-cart");

    function updateCart() {
        cartDisplay.textContent = cartCount;
        totalItems.textContent = cartCount;
        totalPrice.textContent = cartTotal.toLocaleString("en-KE");
    }

    cartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const product = button.closest(".product-card");
            const price = Number(product.dataset.price);

            product.dataset.cartQuantity =
                Number(product.dataset.cartQuantity || 0) + 1;

            cartCount++;
            cartTotal += price;

            updateCart();
        });
    });

    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const product = button.closest(".product-card");
            const price = Number(product.dataset.price);
            const quantity =
                Number(product.dataset.cartQuantity || 0);

            if (quantity > 0) {
                product.dataset.cartQuantity = quantity - 1;
                cartCount--;
                cartTotal -= price;
                updateCart();
            } else {
                alert("This product is not in your cart.");
            }
        });
    });

    // CHECKOUT
    const checkoutButton =
        document.getElementById("checkoutButton");

    const checkoutForm =
        document.getElementById("checkoutForm");

    checkoutButton.addEventListener("click", function () {
        if (cartCount === 0) {
            alert("Your shopping cart is empty.");
        } else {
            checkoutForm.style.display = "block";
        }
    });

    const orderForm = document.getElementById("orderForm");

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName =
            document.getElementById("customerName").value;

        const customerLocation =
            document.getElementById("customerLocation").value;

        alert(
            "ORDER SUCCESSFUL!\n\n" +
            "Thank you, " + customerName + "!\n" +
            "Your order has been received.\n" +
            "Delivery location: " + customerLocation + "\n" +
            "Total: KSh " + cartTotal.toLocaleString("en-KE")
        );

        cartCount = 0;
        cartTotal = 0;

        products.forEach(function (product) {
            product.dataset.cartQuantity = 0;
        });

        updateCart();
        orderForm.reset();
        checkoutForm.style.display = "none";
    });

    // CONTACT FORM
    const contactForm =
        document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;

        alert(
            "Thank you, " + name +
            "! Your message has been received."
        );

        contactForm.reset();
    });

    // FREELANCER REGISTRATION
    const freelancerForm =
        document.getElementById("freelancerForm");

    freelancerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const freelancerName =
            document.getElementById("freelancerName").value;

        const freelancerSkill =
            document.getElementById("freelancerSkill").value;

        alert(
            "REGISTRATION SUCCESSFUL!\n\n" +
            "Welcome, " + freelancerName + "!\n" +
            "Your skills: " + freelancerSkill + "\n" +
            "Thank you for joining Kakuma Connect."
        );

        freelancerForm.reset();
    });

});
