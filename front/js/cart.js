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
        // productQuantity = result.quantity;
        // console.log(productQuantity);
        totalPrice += result.quantity * productPrice;
        totalQuantity += result.quantity;

        // document.querySelector ()
        document.querySelector (`#totalQuantity`).innerHTML = totalQuantity;
        document.querySelector(`#totalPrice`).innerHTML = totalPrice;
    }
}
// 
// récupérer la valeur de input class itemQuantity
// changer result.quantity par input class itemQuantity

// function mafonction(){
//   console.log(click)
// }
// addEventListener("click", mafonction);
// var quantityInputs = document.getElementsByClassName("itemQuantity");
// console.log(quantityInputs);





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
        <p>Qté : ${productQuantity} </p>
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

totalFinalPrice();


// test champs nom prénom ville
// function verifierChamp(balise){
  // let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  // firstNameErrorMsg = alert("ceci n'est pas un prénom");
  // let PrenomRegExp = new RegExp("^[A-zÀ-ú]+$");
  // if (PrenomRegExp.test(balise.value)){
  //   balise.classList.remove("error");
  // } else {
  //   balise.classList.add("error");
    // balise.addEventListener("change",()=>{
    //   verifierPrenom(balise)
    // })
  // }
// }
// function recommencerBalise(balise){
//   balise.addEventListener("change",()=>{

//   })
// }

// tests formulaire cart__order__form
// let form = document.querySelector("form");
// let balisePrenom = document.getElementById("firstName");
// let baliseNom = document.getElementById("lastName");
// let baliseAdresse = document.getElementById("address");
// let baliseVille = document.getElementById("city");
// let baliseEmail = document.getElementById("email");

// form.addEventListener("submit", (event)=>{
//   event.preventDefault();
  // verifierChamp(balisePrenom);
//   let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
//   firstNameErrorMsg = alert("ceci n'est pas un prénom");
//   let PrenomRegExp = new RegExp("^[A-zÀ-ú]+$");
//   if (PrenomRegExp.test(balisePrenom.value)){
//     balisePrenom.classList.remove(firstNameErrorMsg);
//   } else {
//     balisePrenom.classList.add(firstNameErrorMsg);
//   }
//   console.log(balisePrenom.value);
//   console.log(baliseNom.value);
//   console.log(baliseAdresse.value);
//   console.log(baliseVille.value);
//   console.log(baliseEmail.value)
// })

// 
let balisePrenom = document.getElementById("firstName");
balisePrenom.addEventListener("change", ()=>{
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
firstNameErrorMsg = "ceci n'est pas un prénom";
console.log(firstNameErrorMsg);
console.log(balisePrenom.value);
  let prenomRegExp = new RegExp("^[A-zÀ-ú- +\.]+$");
  if (prenomRegExp.test(balisePrenom.value)){
    // balisePrenom.classList.remove(firstNameErrorMsg);
  } else {
    balisePrenom.classList.add(firstNameErrorMsg);
  }
})
