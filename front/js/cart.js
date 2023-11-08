// récupération du prix dans l'API
async function fetchProductPrice(productId) {
  let urlItem = "http://localhost:3000/api/products/" + productId;
  let response = await fetch(urlItem);
  let data = await response.json();
  let productPrice = data.price;
  return productPrice;
}
// calculs de totalQuantity et totalPrice
async function totalFinalPrice() {
  let cart__items = window.localStorage.getItem("items");
  let itemsJson = JSON.parse(cart__items);
  let totalQuantity = 0;
  let totalPrice = 0;

  for (const result of itemsJson) {
      let productPrice = await fetchProductPrice(result.id);
      totalPrice += result.quantity * productPrice;
      totalQuantity += result.quantity;
      // affichage de totalQuantity et totalPrice
      document.querySelector (`#totalQuantity`).innerHTML = totalQuantity;
      document.querySelector(`#totalPrice`).innerHTML = totalPrice;
  }
}

function chgBaliseQuantity(qteUpdate){
    let baliseElementQuantity = document.querySelector(".cart__item__content__settings__quantity p");
    console.log(baliseElementQuantity);
    baliseElementQuantity = qteUpdate;
    console.log(baliseElementQuantity);
    }

function updateQte(idProduit, colorProduit, qteUpdate)
// paramètres sont issus de changeQuantity (évènement click)
{
  const cart__items = JSON.parse(localStorage.getItem("items")) || [];
  // récupération dans le localStorage du panier avec quantité modifiée par le click
  // la valeur de la clé quantité est une chaine de caractères
  // console.log(cart__items);

  let cart = [];
  // initialisation du tableau cart
  
  
  cart__items.forEach((element) => {
    // parcours du panier cart__items sur chaque produit(element)

    if(element.id == idProduit && element.color == colorProduit){
      // let baliseQuantity = ;
      // let baliseMenuQuantity = document.querySelector(".itemQuantity");
      // baliseQuantity.value = element.quantity;
      // console.log(baliseQuantity.value);
      element.quantity = qteUpdate;
      chgBaliseQuantity(qteUpdate);
    // l'element avec la quantité modifiée est poussé dant le tableau cart
    cart.push(element);
    console.log(cart);
  
    // Sinon l'élément qui n'a pas été sélectionné par le click
    // est poussé dans le tableau cart
    } else {
      cart.push(element);
      // document.querySelector(".cart__item__content__settings__quantity p").innerHTML = `${qteUpdate}`
    };
  
  // console.log(cart);
  // console.log(idProduit, colorProduit, qteUpdate);
  // console.log(qteUpdate);

  
    });
  // document.querySelector(".cart__item__content__settings__quantity p").innerHTML += `${qteUpdate}`
  
  
  // stockage de tous les produits(items) du tableau cart dans le localStorage
  // et pour pouvoir stocker les valeurs il faut toutes les transformer
  // en chaines de caractères
  localStorage.setItem("items", JSON.stringify(cart));
  console.log(cart);
  
  
  totalFinalPrice();  
}


  function deleteProduct(idProduit, colorProduit) {
  // Récupérer le panier du localStorage dans un tableau
  const cart__items = JSON.parse(localStorage.getItem("items")) || [];
  //
  // if
  // cart__items tableau avec items du localStorage est true et le [] vide est false => true
  // OU cart__items tableau avec items du localStorage est true et le [] vide est true => true
  // OU cart__items tableau avec items du localStorage est false et le [] vide est true => true
  // OU cart__items tableau avec items du localStorage est false et le [] vide est false => false
  // être sûr qu'il y a des données dans le localStorage pour remplir le tableau
  // s'il n'y a aucune donnée dans le localStorage soit le tableau ne se remplit pas,
  // soit le tableau est remplit et cela renverra faux.

  // Filtrer les éléments à conserver dans un nouveau tableau
  const new_cart = cart__items.filter(item => item.id !== idProduit || item.color !== colorProduit);
  // if
  // item.id !== idProduit est true et item.color !== colorProduit est true => true
  // item.id !== idProduit est true et item.color !== colorProduit est false => true
  // item.id !== idProduit est false et item.color !== colorProduit est true => true
  // item.id !== idProduit est false et item.color !== colorProduit est false => false
  // si id & color du LocalStorage différents de id & color de l'item sélectionné alors
  // l'item reste dans le nouveau tableau

  // Sauvegarder le nouveau panier dans le localStorage
  localStorage.setItem("items", JSON.stringify(new_cart));


  // Rafraîchir la page
  location.reload();

  // Mettre à jour le prix final
  totalFinalPrice();
  

  
}

// récupération tous les items du localStorage
// remplacer le nouveau localStorage par l'ancien 
// localStorage.removeItem("product");
// mettre à jour l'upDate() après suppression d'un canapé  
  


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
      // récupération du prix de l'api
      let productPrice = await fetchProductPrice(productId);
      // affichage valeurs des propriétés produits
      cart__items = document.getElementById("cart__items");
      // console.log(cart__items);
      cart__item =
          `<article class="cart__item" data-product-id="${productId}" data-product-color="${productColor}">
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

  let changeQuantity = document.querySelectorAll(".itemQuantity");
   changeQuantity.forEach((item) => {
      //On écoute le changement sur l'input "itemQuantity"
      item.addEventListener("change", (event) => {
          event.preventDefault();
          // récupération de l'id affiché dans la balise <article> et du localStorage par afficherCart__item
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          console.log(productId);
          // récuparation de la valeur color affichée dans la balise <article> et du localStorage par afficherCart__item 
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          // let value = item.value;
          updateQte(productId, color, item.value);
 
      })
  })

  let removeCart = document.querySelectorAll(".deleteItem");
  removeCart.forEach((item) => {
      //On écoute le changement sur l'input "deletItem";
      item.addEventListener("click", (event) => {
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          // console.log(productId);
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          // console.log(color);
          deleteProduct(productId, color);
          // rechargement de la page après le click et le deleteProduct
          // removeCart = window.location.reload();
      });
      
  });
  // location.reload;
}
afficherCart__item();
totalFinalPrice();
// deleteProduct();

// Rafraîchir la page
// location.reload();
// updateQte();



// Fonction générique de validation de champ
const fieldStates = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false
};

// Objet pour stocker les données du formulaire
const contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: ""
};

const balisePrenom = document.getElementById("firstName");
const baliseNom = document.getElementById("lastName");
const baliseAdresse = document.getElementById("address");
const baliseVille = document.getElementById("city");
const baliseEmail = document.getElementById("email");

const prenomRegExp = /^[A-zÀ-ú- +\.]+$/;
const nomRegExp = /^[A-zÀ-ú- +\.]+$/;
const adresseRegExp = /^[A-zÀ-ú- +\.0-9^,\/]+$/;
const villeRegExp = /^[A-zÀ-ú- 0-9^,\/]+$/;
const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function validateField(inputElement, regex, errorMessage) {
  const boutonCommander = document.getElementById("order");
  boutonCommander.setAttribute("disabled", "disabled");

  inputElement.addEventListener("change", () => {

      const value = inputElement.value;
      const isValid = regex.test(value);
      const errorElement = document.getElementById(inputElement.id + "ErrorMsg");
      boutonCommander.setAttribute("disabled", "disabled");

      if (isValid) {
          errorElement.innerHTML = "";
      } else {
          errorElement.innerHTML = errorMessage;
      }
      contact[inputElement.id] = value;
      fieldStates[inputElement.id] = isValid;

      const isAllValid = Object.values(fieldStates).every((state) => state);

      if (isAllValid) {
          boutonCommander.removeAttribute("disabled");
          boutonCommander.addEventListener("click", (event) => {

              getOrder(contact);
          })
      }
  });
}

validateField(balisePrenom, prenomRegExp, "ceci n'est pas un prénom");
validateField(baliseNom, nomRegExp, "ceci n'est pas un nom");
validateField(baliseAdresse, adresseRegExp, "ceci n'est pas une adresse");
validateField(baliseVille, villeRegExp, "ceci n'est pas une ville");
validateField(baliseEmail, emailRegExp, "ceci n'est pas une adresse mail");

function getOrder(contact) {
  console.log(contact);
}
