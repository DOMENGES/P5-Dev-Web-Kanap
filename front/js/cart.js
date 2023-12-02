// récupération du prix dans l'API
async function fetchProductPrice(productId) {
  // productId issu de la fonction afficherCart__item
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

// paramètres sont issus de changeQuantity (évènement click sur formulaire qte)
function updateQte(idProduit, colorProduit, qteUpdate)
{
  const cart__items = JSON.parse(localStorage.getItem("items")) || [];
  let cart = [];

  cart__items.forEach((element) => {
    if(element.id == idProduit && element.color == colorProduit ){
      element.quantity = parseInt(qteUpdate); 
      cart.push(element);
    } else {
            cart.push(element);
            };
    localStorage.setItem("items", JSON.stringify(cart));
    totalFinalPrice();  
  });
}

  function deleteProduct(idProduit, colorProduit) {
  const cart__items = JSON.parse(localStorage.getItem("items")) || [];
  
  const new_cart = cart__items.filter(
    item => item.id !== idProduit || item.color !== colorProduit);
  
  localStorage.setItem("items", JSON.stringify(new_cart));
  location.reload();
  totalFinalPrice();  
}

// affichage : image, nom, couleur, prix unitaire, quantité originale/non modifiée
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

  // bouton choix quantité
  let changeQuantity = document.querySelectorAll(".itemQuantity");
   changeQuantity.forEach((item) => {
          item.addEventListener("change", (event) => {
          event.preventDefault();
          // récupération de l'id affiché dans la balise <article> et du localStorage par afficherCart__item
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          // récuparation de la valeur color affichée dans la balise <article> et du localStorage par afficherCart__item 
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          updateQte(productId, color, item.value);
          })
    })
  // bouton supprimer
  let removeCart = document.querySelectorAll(".deleteItem");
  removeCart.forEach((item) => {
      item.addEventListener("click", (event) => {
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          deleteProduct(productId, color);
      });
  });
}
// appel fonctions
afficherCart__item();
totalFinalPrice();
updateQte();

// contact

// initialisation des champs du formulaire contact
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

// règles de validation complexe : RegExp
const prenomRegExp = /^[A-zÀ-ú- +\.]+$/;
const nomRegExp = /^[A-zÀ-ú- +\.]+$/;
const adresseRegExp = /^[A-zÀ-ú- +\.0-9^,\/]+$/;
const villeRegExp = /^[A-zÀ-ú- 0-9^,\/]+$/;
const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// pour valider si les champs sont correctement remplis
function validateField(inputElement, regex, errorMessage) {
  const boutonCommander = document.getElementById("order");
  boutonCommander.setAttribute("disabled", "disabled");

  inputElement.addEventListener("change", (event) => {
      event.preventDefault();
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
          // boutonCommander passe actif
            boutonCommander.removeAttribute("disabled");
            boutonCommander.addEventListener("click", (event) => {
              event.preventDefault();
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

// récupération des id des produits du panier
function getProductIdInCart()
{
    const cart__items = JSON.parse(localStorage.getItem("items")) || [];
    let productsId = [];
    cart__items.forEach((product) => {
        productsId.push(product.id)
    });
    return productsId;
};

// commande : valeurs formulaire et récupération id du panier
// envoi du contact et des id à l'api
// chargement de la page confirmation
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
            window.location.replace(`./confirmation.html?orderId=${res.orderId}`)
        })
        .catch((err) => {
            alert(err.message);
        });
}
