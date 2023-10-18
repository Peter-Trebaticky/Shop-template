(function () {
  "use strict";

  let productsEl = document.querySelector(".products");

  fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
      generateProductList(data.products);

      //Add to Cart
      let addToCartButtons = document.querySelectorAll(".add-to-cart");

      addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
          let productId = event.currentTarget.getAttribute("data-id");
          let product = data.products.find(item => item.id === parseInt(productId));
          console.log("Full Product Information:", product);
        });
      });
    })
    .catch(error => console.error("API Error:", error));


    //template
  let generateProductList = function (products) {
    products.forEach(function (item) {
      let productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.thumbnail}" alt="${item.title}">
                             </div>
                             <div class="product-brand">${item.brand}</div>
                             <div class="product-name">${item.title}</div>
                             <div class="product-stock ${item.stock > 0 ? 'in-stock' : 'out-of-stock'}"> ${item.stock > 0 ? "Product In Stock" : "Product Out of Stock"}</div>
                             <div class="product-price">${item.discountPercentage < 5 ? `${item.price} $` : ''}</div>
                             <div class="product-discountPercentage"> ${item.discountPercentage > 5 ? `${item.discountPercentage} %` : ''}</div>
                             <div class="product-price-discount"> ${item.discountPercentage > 5 ? calculateDiscountedPrice(item.price, item.discountPercentage) + ' $' : ''}</div>
                             <div class="product-description">${item.description}</div>
                             <div class="product-rating"><span>Rating:</span> ${item.rating}</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more" data-id="${item.id}">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id="${item.id}">Add to Cart</a>
                             </div>
                          </div>`;

      productsEl.appendChild(productEl);
          

      //see-more
      let seeMoreButtons = document.querySelectorAll(".see-more");
      seeMoreButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
          let productDiv = event.currentTarget.closest(".product");
          let productRating = productDiv.querySelector(".product-rating");
          let productDescription = productDiv.querySelector(".product-description");

          productRating.classList.add("product-show");
          productDescription.classList.add("product-show");

          setTimeout(function () {
            productRating.classList.remove("product-show");
            productDescription.classList.remove("product-show");
          }, 5000);
        });
      });
  });

  //count prize  
  };
  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    return `<del>${originalPrice.toFixed(2)} $</del> ${discountedPrice.toFixed(2)} `;
  }

})();
