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

// function chgBaliseQuantity(qteUpdate){
//       let baliseElementQuantity = document.querySelector(".cart__item__content__settings__quantity p");
//       baliseElementQuantity.innerHTML = qteUpdate;
//     }
// paramètres sont issus de changeQuantity (évènement click)
function updateQte(idProduit, colorProduit, qteUpdate)
{
   // récupération dans le localStorage du panier avec quantité modifiée par le click
  const cart__items = JSON.parse(localStorage.getItem("items")) || [];
  // initialisation du tableau cart : nouveau panier
  let cart = [];
  // parcours du panier cart__items sur chaque produit(element)
  cart__items.forEach((element) => {
    if(element.id == idProduit && element.color == colorProduit ){
      element.quantity = parseInt(qteUpdate); 
    // l'element avec la quantité modifiée est poussé dant le tableau cart
    cart.push(element);
    // Sinon l'élément qui n'a pas été sélectionné par le click
    // est poussé dans le tableau cart
    } else {
      cart.push(element);
      // document.querySelector(".cart__item__content__settings__quantity p").innerHTML = `${qteUpdate}`
      };
  // stockage de tous les produits(items) du tableau cart dans le localStorage
  // et pour pouvoir stocker les valeurs il faut toutes les transformer
  // en chaines de caractères
  localStorage.setItem("items", JSON.stringify(cart));
  totalFinalPrice();  
});
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
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
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
          // récuparation de la valeur color affichée dans la balise <article> et du localStorage par afficherCart__item 
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          updateQte(productId, color, item.value);
          location.reload();
          })
    })
  let removeCart = document.querySelectorAll(".deleteItem");
  removeCart.forEach((item) => {
      //On écoute le changement sur l'input "deletItem";
      item.addEventListener("click", (event) => {
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          deleteProduct(productId, color);
      });
      
  });

}
afficherCart__item();
totalFinalPrice();
updateQte();



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

// sélection DOM des balises de l'objet contact
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
  // attribut + value = disabled => bouton inactif
  // boutonCommander initialisé à inactif
  boutonCommander.setAttribute("disabled", "disabled");
  // écoute chgt dans chaque input (champs) du formulaire
  inputElement.addEventListener("change", (event) => {
      event.preventDefault();
      // écoute et test des valeurs entrées dans le formulaire
      // affichage du message d'erreur si nécessaire
      // DOM balise de champ du formulaire 
      const value = inputElement.value;
      console.log(inputElement);
      // valeur saisie par l'utilisateur
      console.log(value);
      // test valeur correcte
      const isValid = regex.test(value);
      // console.log(isValid);
      // DOM balise du message d'erreur
      const errorElement = document.getElementById(inputElement.id + "ErrorMsg");
      // id balise du champ sélectionné par l'utilisateur
      console.log(inputElement.id);
      // si l'attribut est présent, 
      // quelle que soit sa valeur réelle, 
      // sa valeur est considérée comme true (vraie). 
      // L'absence de l'attribut signifie que sa valeur est false (fausse). 
      // En définissant la valeur de l'attribut disabled sur la chaîne vide (""), 
      // nous définissons disabled sur true,
      // ce qui entraîne la désactivation du bouton.
      boutonCommander.setAttribute("disabled", "disabled");
      // boutonCommander toujours inactif
      // il faut attendre que le formulaire soit correctement et totalement rempli
      if (isValid) {
          errorElement.innerHTML = "";
      } else {
          errorElement.innerHTML = errorMessage;
      }
      // valeur du champ saisie par l'utilisateur
      contact[inputElement.id] = value;
      console.log(value);
      // Vrai corectement rempli: valeur du champ saisie par l'utilisateur
      fieldStates[inputElement.id] = isValid;
      // objet avec ttes valeurs du contact Vrai ou Faux de correctement rempli
      console.log(fieldStates);
      // Tous les champs de l'objet Vrai(correctement rempli)
      const isAllValid = Object.values(fieldStates).every((state) => state);
      console.log(isAllValid);

      if (isAllValid) {
          // boutonCommander passe actif
          boutonCommander.removeAttribute("disabled");
          // écoute click de boutonCommander
          boutonCommander.addEventListener("click", (event) => {

              getOrder(contact);
          })
      }
  });
}
// messages d'erreur pour chaque balise
validateField(balisePrenom, prenomRegExp, "ceci n'est pas un prénom");
validateField(baliseNom, nomRegExp, "ceci n'est pas un nom");
validateField(baliseAdresse, adresseRegExp, "ceci n'est pas une adresse");
validateField(baliseVille, villeRegExp, "ceci n'est pas une ville");
validateField(baliseEmail, emailRegExp, "ceci n'est pas une adresse mail");

function getProductIdInCart()
{
    // récupération des produits du localStorage
    const cart__items = JSON.parse(localStorage.getItem("items")) || [];
    // initialisation du tableau des id des produits
    let productsId = [];
    // remplissage du tableau des id des produits
    cart__items.forEach((product) => {
        productsId.push(product.id)
    })
    // console.log(productsId);
    return productsId;
};

function getOrder(contact) {

      const form = {
      contact : {
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: contact.address,
          city: contact.city,
          email: contact.email
      },
      products : getProductIdInCart(),
      
    };
    console.log(contact);
    console.log(form);

    fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then(res => res.json())
        .then(res => {
            alert("Votre commande a bien été effectuée !")
            window.location.replace(`front/html/confirmation.html?orderId=${res.orderId}`)
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        });
}
