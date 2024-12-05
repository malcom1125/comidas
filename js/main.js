// Initialize products
document.addEventListener('DOMContentLoaded', () => {
    // Populate each category section
    Object.entries(products).forEach(([category, items]) => {
        const section = document.querySelector(`#${category} .products-grid`);
        if (section) {
            section.innerHTML = items.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-ingredients">${product.ingredients.join(', ')}</p>
                        <div class="product-footer">
                            <span class="product-price">$${product.price.toLocaleString()}</span>
                            <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product)})'>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    });
});