// récupération du prix dans l'API puis traduction en format Json
// calcul du prix total avec quantité du localStorage
async function fetchProductPrice(productId, qte){
  const response = await fetch(`http://localhost:3000/api/products/${productId}`);
  const data = await response.json();
  let total = qte * data.price;
  return total;
}

function getTotalPrice() {
  // récupération de tous les produits dans le localStorage et traduction en format JSON
  let cart__items = window.localStorage.getItem("items");
  let itemsJson = JSON.parse(cart__items);
  let total = 0;
  let qte = 0;
  // récupération des valeurs des propriétés price et quantity de chaque produit
  // calcul du prix total (price*quantity) de chaque produit
  itemsJson.map(
    res => {
      total += res.price * res.quantity;
      qte += res.quantity;
    }
  )
  // affichage dans la page Web du prix total et de la quantité totale
  document.querySelector (`#totalPrice`).innerHTML = total;
  document.querySelector (`#totalQuantity`).innerHTML = qte;
}
// récupération des valeurs propriétés des produits du localStorage excepté le prix des produits
async function displayCartElements() {
  let cart__items = window.localStorage.getItem("items");
  let itemsJson = JSON.parse(cart__items);
  for (let i=0; i<itemsJson.length; i++){
    let cart__item = itemsJson[i];
    let productId = cart__item.id;
    let productColor = cart__item.color;
    let productUrl = cart__item.imageUrl;
    let productName = cart__item.name;
    let productQuantity = cart__item.quantity;
// récupération du prix dans l'API avec id du produit du localStorage
// calcul du prix total avec quantité du localStorage
    let productPrice = await fetchProductPrice(productId, productQuantity);

    cart__items = document.getElementById("cart__items");
// affichage d'UNE carte d'UN produit
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
// affichage de toute les cartes produits
              cart__items.innerHTML += cart__item;          
  }
}
displayCartElements();
getTotalPrice();

// vérification et test firstName et Name
function validerPrenomNom(firstName,lastName){
  let nom = firstName;
  nom = lastName;
  if(nom.length>=2){
    return true;
  }
  return false;
}
// évènement click de "commander !"
const form = document.getElementById("order");
form.addEventListener("click", (Event) =>{
  Event.preventDefault();
// formulaire firstName
let baliseFirstName = document.getElementById("firstName");
let firstName = baliseFirstName.value;
console.log(firstName);
// formulaire lastName
let baliseLastName = document.getElementById("lastName");
let lastName = baliseLastName.value;
// validation firstName et lastName
if(validerPrenomNom(firstName) && validerPrenomNom(lastName)){
  return console.log(firstName, lastName);
}else
{ console.log("erreur")}
})