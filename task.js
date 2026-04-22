const productQuantityControl = document.querySelectorAll(".product__quantity-control");
const cart = document.querySelector(".cart__products");
const productAddBtn = document.querySelectorAll(".product__add");
const productRemoveBtn = document.querySelectorAll(".product__remove");
const cartCard = document.querySelector(".cart");
const inCartProductsId = [];

const cartHide = function() {
    if (cart.children.length === 0) {
        cartCard.classList.add("cart_hidden");
    }
}

cartHide()


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
        cartCard.classList.remove("cart_hidden");
        const product = e.target.closest(".product");
        let productInCart = `<div class="cart__product" data-id=${product.dataset.id}><img class="cart__product-image" src=${product.getElementsByClassName("product__image")[0].getAttribute("src")}><div class="cart__product-count">${product.getElementsByClassName("product__quantity-value")[0].innerText}</div></div>`;
        Array.from(cart.children).forEach((child) => {
            if (!inCartProductsId.includes(child.dataset.id)) {
                inCartProductsId.push(child.dataset.id);
            }
        });
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

productRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        if (inCartProductsId.includes(product.dataset.id)) {
            let foundIndex = null;
            for (let i=0; i < cart.children.length; i++) {
                if (Number(cart.children[i].dataset.id) === Number(product.dataset.id)) {
                    foundIndex = i;
                    break
                }
            }
            if (Number(cart.children[foundIndex].innerText) - Number(product.getElementsByClassName("product__quantity-value")[0].innerText) > 0) {
                cart.children[foundIndex].getElementsByClassName("cart__product-count")[0].textContent = Number(cart.children[foundIndex].innerText) - Number(product.getElementsByClassName("product__quantity-value")[0].innerText);
            } else {
                cart.children[foundIndex].remove();
                cartHide();
            };
        }
    })
})