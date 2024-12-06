const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=A";
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let totalPrice = 0;

// Fetch products from the MealBD API based on the search term
async function fetchProducts(query = "") {
    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();

        if (data.meals) {
            displayProducts(data.meals);
        } else {
            productsContainer.innerHTML = '<p>No products found. Try a different search.</p>';
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Display products on the homepage
function displayProducts(products) {
    productsContainer.innerHTML = ""; // Clear previous products
    products.forEach(product => {
        const price = (Math.random() * 10 + 5).toFixed(2); // Random price since API doesn't provide it
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <h2>${product.strMeal}</h2>
            <p>${product.strMealThumb ? `<img src="${product.strMealThumb}" alt="${product.strMeal}" style="width:100%;">` : ''}</p>
            <p>Price: $<span>${price}</span></p>
            <button onclick="addToCart(${price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Add a product to the cart and update the total price
function addToCart(price) {
    totalPrice += parseFloat(price);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchProducts(query);
});

// Load initial products when the page loads
window.onload = () => fetchProducts();
