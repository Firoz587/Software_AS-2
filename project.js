const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");
const cartList = document.getElementById("cart-list");

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

let cart = [];

async function fetchMeals(query) {
    try {
        const response = await fetch(`${API_BASE_URL}search.php?s=${query}`);
        const data = await response.json();
        displayResults(data.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

function displayResults(meals) {
    resultsContainer.innerHTML = "";
    if (!meals) {
        resultsContainer.innerHTML = "<p>No meals found. Try a different search!</p>";
        return;
    }

    meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("card");
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-body">
                <h3>${meal.strMeal}</h3>
                <button onclick="addToCart('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Add to Cart</button>
            </div>
        `;

        resultsContainer.appendChild(mealCard);
    });
}

function addToCart(id, name, image) {
    if (cart.find((item) => item.id === id)) {
        alert("This meal is already in your cart!");
        return;
    }

    const cartItem = { id, name, image };
    cart.push(cartItem);
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>
                <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 5px; margin-right: 10px;">
                ${item.name}
            </span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;

        cartList.appendChild(cartItem);
    });
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
    }
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
