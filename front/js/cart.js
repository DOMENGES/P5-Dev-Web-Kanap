// récupération du localStorage du tableau items + traduction données pour JS
let cart__items = window.localStorage.getItem("items");
let itemsJson = JSON.parse(cart__items);

// parcourt du tableau items pour récupérer chaque produit(cart__item) sélectionné par l'utilisateur
for (let i=0; i<itemsJson.length; i++){
    let cart__item = itemsJson[i];
    console.log(cart__item);
    let productId = cart__item.id;
    console.log(productId); 
    let productColor = cart__item.color;
    let productUrl = cart__item.imageUrl;
    let productName = cart__item.name;
    let productQuantity = cart__item.quantity;
    let productPrice = getPrice(productId);
    // récupération du prix dans l'API
function getPrice(productId){
  fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => {return response.json()})
  .then(res => {
    return console.log(res.price)
    })
}
productPrice = getPrice(productId);
// productPrice = document.querySelector(".cart__item__content__description, p, p")

    // async function fetchProductPrice(_productId) {
    //   return new Promise((resolve, reject) => {
    //     fetch(`http://localhost:3000/api/products/${_productId}`)
    //         .then(function (response) {
    //           if (!response.ok) {
    //             throw new Error('Not ok.');
    //           }
    //           return response.json();
    //         })
    //         .then(function (productData) {

    //           price = productData.price;
    //           resolve(price);
    //         })
    //         .catch(function (error) {
    //           console.error('Error', error);
    //           reject(error);
    //         });
    //   });
    // } 

    cart__items = document.getElementById("cart__items");

    cart__item = `
    <article class="cart__item"> ${productId}  ${ productColor}
    <div class="cart__item__img">
      <img src="${productUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>  ${productName}</h2>
        <p>  ${productColor}</p>
        <p> ${productPrice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${productQuantity} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </article>`;
  cart__items.innerHTML += cart__item;          
}


   








                                                  
