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


function updateQte(idProduit, colorProduit, qteUpdate)
{
  console.log(idProduit, colorProduit, qteUpdate);
  totalFinalPrice()
}

function deleteProduct(idProduit, colorProduit)
{
  console.log(idProduit, colorProduit)
  totalFinalPrice()
}

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
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          updateQte(productId, color, item.value);
      });
  });

  let removeCart = document.querySelectorAll(".deleteItem");
  removeCart.forEach((item) => {
      //On écoute le changement sur l'input "itemQuantity"
      item.addEventListener("click", (event) => {
          let productId = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-id');
          let color = item.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product-color');
          deleteProduct(productId, color)
      });
  });
}
afficherCart__item();

totalFinalPrice();



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

function getOrder(contact)
{
  console.log(contact);
}

