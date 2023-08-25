function addClickEventToCard(cardId, productFieldId, priceFieldId) {
  const card = document.getElementById(cardId);
  const productField = document.getElementById(productFieldId);
  const priceField = document.getElementById(priceFieldId);

  card.addEventListener("click", function () {
    const productName = productField.innerText;
    const productPrice = parseFloat(priceField.innerText);

    const count = document.querySelectorAll("#price-name p").length + 1;
    const p = document.createElement("p");
    p.classList.add("my-4");
    p.innerHTML = `<strong>${count}.${productName} (${productPrice} tk)</strong>`;
    document.getElementById("price-name").appendChild(p);

    updateTotalPrice();
    updatePurchaseButton();
  });
}

function updateTotalPrice() {
  const prices = document.querySelectorAll("#price-name p");
  let totalPrice = 0;

  prices.forEach((price) => {
    const priceText = price.innerText.match(/\(([^)]+)\)/)[1];
    const parsedPrice = parseFloat(priceText);

    if (!isNaN(parsedPrice)) {
      totalPrice += parsedPrice;
    }
  });

  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function updatePurchaseButton() {
  const totalSpan = document.getElementById("total-price");
  const couponInput = document.getElementById("coupon-input");
  const makePurchaseBtn = document.getElementById("make-purchase");
  const discountSpan = document.getElementById("discount");
  const totalAfterDiscountSpan = document.getElementById(
    "total-after-discount"
  );

  const totalPrice = parseFloat(totalSpan.innerText);
  const couponCode = couponInput.value;
  let discount = 0;
  let totalAfterDiscount = totalPrice;

  if (totalPrice > 200 && couponCode === "SELL200") {
    discount = totalPrice * 0.2;
    totalAfterDiscount = totalPrice - discount;
  }

  discountSpan.innerText = discount.toFixed(2);
  totalAfterDiscountSpan.innerText = totalAfterDiscount.toFixed(2);

  makePurchaseBtn.disabled = totalAfterDiscount <= 0;
}

document.getElementById("apply-coupon").addEventListener("click", function () {
  updatePurchaseButton();
});

document.getElementById("go-home").addEventListener("click", function () {
  const priceNameContainer = document.getElementById("price-name");
  while (priceNameContainer.firstChild) {
    priceNameContainer.removeChild(priceNameContainer.firstChild);
  }
  document.getElementById("total-price").innerText = "0.00";
  document.getElementById("discount").innerText = "0.00";
  document.getElementById("total-after-discount").innerText = "0.00";
  document.getElementById("coupon-input").value = "";
  document.getElementById("make-purchase").disabled = true;
});
