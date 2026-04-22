const productQuantityControl = document.querySelectorAll(".product__quantity-control");
const cart = document.querySelector(".cart__products");
const productAddBtn = document.querySelectorAll(".product__add");
const inCartProductsId = [];


productQuantityControl.forEach((controller) => {
    let productValueCnt = controller.parentElement.getElementsByClassName("product__quantity-value")[0];
    controller.addEventListener("click", () => {
        if (controller.classList.contains("product__quantity-control_dec") && Number(productValueCnt.innerText) != 1) {
            productValueCnt.innerText = Number(productValueCnt.innerText) - 1;
        } else if (controller.classList.contains("product__quantity-control_inc")) {
            productValueCnt.innerText = Number(productValueCnt.innerText) + 1;
        }
    })
})

productAddBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        let productInCart = `<div class="cart__product" data-id=${product.dataset.id}><img class="cart__product-image" src=${product.getElementsByClassName("product__image")[0].getAttribute("src")}><div class="cart__product-count">${product.getElementsByClassName("product__quantity-value")[0].innerText}</div></div>`;
        // const prod = document.createElement("div");
        // prod.innerHTML = productInCart;
        // const prodNew = prod.querySelector(".cart__product");
        Array.from(cart.children).forEach((child) => {inCartProductsId.push(child.dataset.id)});
        if (!inCartProductsId.includes(product.dataset.id)) {
            cart.insertAdjacentHTML("beforeend", productInCart);
        } else {
            let foundIndex = null;
            for (let i=0; i < cart.children.length; i++) {
                if (Number(cart.children[i].dataset.id) === Number(product.dataset.id)) {
                    foundIndex = i;
                    break
                }
            }
            cart.children[foundIndex].getElementsByClassName("cart__product-count")[0].textContent = Number(cart.children[foundIndex].innerText) + Number(product.getElementsByClassName("product__quantity-value")[0].innerText);
        }
    })
})