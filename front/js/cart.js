// récupération du prix dans l'API
async function fetchProductPrice(productId) {
    let urlItem = "http://localhost:3000/api/products/" + productId;
    // console.log(urlItem);
    let response = await fetch(urlItem);
    let data = await response.json();
    let productPrice = data.price;
    return productPrice;
}
// calcul et affichage totalQuantity
async function totalFinalPrice() {
    let cart__items = window.localStorage.getItem("items");
    let itemsJson = JSON.parse(cart__items);
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const result of itemsJson) {
        let productPrice = await fetchProductPrice(result.id);
        totalPrice += result.quantity * productPrice;
        totalQuantity += result.quantity;

        document.querySelector (`#totalQuantity`).innerHTML = totalQuantity;
        document.querySelector(`#totalPrice`).innerHTML = totalPrice;
    }
}


// changer le totalQuantity
// function changeQuantity(){
//   const btnAddToCart = parseInt(document.querySelector("input .itemQuantity"));
// let qte = parseInt(btnAddToCart);
// console.log(btnAddToCart);
// btnAddToCart.addEventListener("change",(event)=> {
//     console.log(event.value);
//   })
// }

// récupération tous les items du localStorage
async function afficherCart__item (){
    let cart__items = window.localStorage.getItem("items");
    let itemsJson = JSON.parse(cart__items);
    for (let i=0; i<itemsJson.length; i++){
        let cart__item = itemsJson[i];
        let productId = cart__item.id;
        let productColor = cart__item.color;
        let productUrl = cart__item.imageUrl;
        let productName = cart__item.name;
        let productQuantity = cart__item.quantity;
        let productPrice = await fetchProductPrice(productId);

        cart__items = document.getElementById("cart__items");
        cart__item =
            `<article class="cart__item">
    <div class="cart__item__img">
      <img src="${productUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productName}</h2>
        <p>${productColor}</p>
        <p>${productPrice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> `
        cart__items.innerHTML += cart__item;
    }
}
afficherCart__item();

//fetchProductPrice();
totalFinalPrice();
// totalQuantityPrice();

// changeQuantity();
// fetchProductPrice()
//