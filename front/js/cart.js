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


// test champs
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
let baliseNom = document.getElementById("lastName");
let baliseAdresse = document.getElementById("address");
let baliseVille = document.getElementById("city");
let baliseEmail = document.getElementById("email");
balisePrenom.addEventListener("change", ()=>{
  let prenomRegExp = new RegExp("^[A-zÀ-ú- +\.]+$");
  if (prenomRegExp.test(balisePrenom.value)){
    document.getElementById(`firstName`).innerHTML = "balisePrenom.value";
    document.getElementById(`firstNameErrorMsg`).innerHTML = "";
    // let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    // firstNameErrorMsg = "ceci n'est pas un prénom";
    // balisePrenom.classList.remove(firstNameErrorMsg);
  } else {
    // let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    // console.log(firstNameErrorMsg);
    document.getElementById(`firstNameErrorMsg`).innerHTML = "ceci n'est pas un prénom";
    // firstNameErrorMsg = "ceci n'est pas un prénom";
    // balisePrenom.classList.add(firstNameErrorMsg);
  }
})
baliseNom.addEventListener("change", ()=>{
  let nomRegExp = new RegExp("^[A-zÀ-ú- +\.]+$");
  if (nomRegExp.test(baliseNom.value)){
  document.getElementById(`lastName`).innerHTML = "baliseNom.value";
  document.getElementById(`lastNameErrorMsg`).innerHTML = "";
  } else {
    document.getElementById(`lastNameErrorMsg`).innerHTML = "ceci n'est pas un nom";
  }
})
baliseAdresse.addEventListener("change", ()=>{
  let adresseRegExp = new RegExp("^[A-zÀ-ú- +\.0-9^,\/]+$");
  if (adresseRegExp.test(baliseAdresse.value)){
  document.getElementById(`address`).innerHTML = "baliseVille.value";
  document.getElementById(`addressErrorMsg`).innerHTML = "";
  } else {
    document.getElementById(`addressErrorMsg`).innerHTML = "ceci n'est pas une adresse";
  }
})
baliseVille.addEventListener("change", ()=>{
  let villeRegExp = new RegExp("^[A-zÀ-ú- 0-9^,\/]+$");
  if (villeRegExp.test(baliseVille.value)){
  document.getElementById(`city`).innerHTML = "baliseVille.value";
  document.getElementById(`cityErrorMsg`).innerHTML = "";
  } else {
    document.getElementById(`cityErrorMsg`).innerHTML = "ceci n'est pas une ville";
  }
})
baliseEmail.addEventListener("submit", (event)=>{
  event.preventDefault;
  let emailRegExp = new RegExp("^[a-z.@-]+$");
  if (emailRegExp.test(baliseEmail.value)){
  document.getElementById(`email`).innerHTML = "baliseEmail.value";
  document.getElementById(`emailErrorMsg`).innerHTML = "";
  } else {
    document.getElementById(`emailErrorMsg`).innerHTML = "ceci n'est pas une adresse mail";
  }
})
class contactClient {
  constructor(prenom,nom, adresse, ville, email){
    this.prenom = prenom;
    this.nom = nom;
    this.adresse = adresse;
    this.ville = ville;
    this.email = email;
  }
}
let client1 = new contactClient("balisePrenom.value","baliseNom.value","baliseAdresse.value","baliseVille.value","baliseEmail.value");
console.log(client1);
// let btncommander = document.getElementById("order");
// btncommander.addEventListener("submit",(event)=>{
//   event.preventDefault();
//   if()
// })



