(() => {
  "use strict";

  const productsEl = document.querySelector(".products");

  try {
    const response = fetch("https://dummyjson.com/products");
    const { products } = response.json();
    
    generateProductList(products);
  } catch (error) {
    console.error("API Error:", error);
  }
  //template
  function generateProductList(products) {
    products.forEach(item => {
      const { thumbnail, brand, title, stock, price, discountPercentage, description, rating, id } = item;
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <div class="product-image">
          <img src="${thumbnail}" alt="${title}">
        </div>
        <div class="product-brand">${brand}</div>
        <div class="product-name">${title}</div>
        <div class="product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}">${stock > 0 ? "Product In Stock" : "Product Out of Stock"}</div>
        ${discountPercentage < 5 ? `<div class="product-price">${price} $</div>` : ''}
        ${discountPercentage > 5 ? `<div class="product-discountPercentage">${discountPercentage} %</div>` : ''}
        ${discountPercentage > 5 ? `<div class="product-price-discount">${calculateDiscountedPrice(price, discountPercentage)} $</div>` : ''}
        <div class="product-description">${description}</div>
        <div class="product-rating"><span>Rating:</span> ${rating}</div>
        <div class="product-add-to-cart">
          <a href="#0" class="button see-more" data-id="${id}">More Details</a>
          <a href="#0" class="button add-to-cart" data-id="${id}">Add to Cart</a>
        </div>
      `;

      productsEl.appendChild(productEl);
    });
    //see-more
    document.querySelectorAll(".see-more").forEach(button => {
      button.addEventListener("click", ({ target }) => {
        const productDiv = target.closest(".product");
        const productRating = productDiv.querySelector(".product-rating");
        const productDescription = productDiv.querySelector(".product-description");

        productRating.classList.add("product-show");
        productDescription.classList.add("product-show");

        setTimeout(() => {
          productRating.classList.remove("product-show");
          productDescription.classList.remove("product-show");
        }, 5000);
      });
    });
  }

  //count price 
  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    return `<del>${originalPrice.toFixed(2)} $</del> ${discountedPrice.toFixed(2)} `;
  }
})();
