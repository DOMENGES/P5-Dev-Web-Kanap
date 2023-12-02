//récupération url du produit depuis le navigateur
const url = new URL(document.location);
//récupération id du produit dans l'url
const searchParams = url.searchParams;
const idProduct = searchParams.get('id');

//initialisation des propriétés du produit
let elementTitle = null;
let elementId = null;
let elementColor = null;
let imageUrl = null;
let price = null;
let description = null;

//déclaration url2 du produit complétée avec id du produit
let url2 = "http://localhost:3000/api/products/"+idProduct;

//recupération des données(API) au format Json de chaque element(produit)
fetch(url2).then(data=>{
    data.json().then(element=>{ 
    elementTitle = element.name;
    imageUrl = element.imageUrl;
    price = element.price;
    description = element.description;
    // affichage image
    let elementImg = document.querySelector(".item__img");
    elementImg.innerHTML = '<img src="'+imageUrl+'" alt="Photographie d\'un canapé">';
    // affichage titre produit, prix, description
    document.getElementById("title").innerHTML = '<h1>'+elementTitle+'</h1>';
    document.querySelector("title").innerHTML = elementTitle;
    let elementPrice = document.getElementById("price");
    elementPrice.innerHTML = '<span>'+price+ '</span>';
    let elementDescription = document.getElementById("description");
    elementDescription.innerHTML = '<p>'+description+'</p>';

    //affichage dans le formulaire valeurs couleur du produit
    const couleur = element.colors;
    for (let i=0; i<couleur.length; i++){
        let valeurCouleur = couleur[i];
        let formulaireCouleur = document.getElementById("colors");
        formulaireCouleur.innerHTML += '<option>'+valeurCouleur+'</option>';
    }
    })
})

//évènement "click" sur bouton "ajouter au panier"
let addToCartBox = document.getElementById("addToCart");
addToCartBox.addEventListener("click", (event)=>{
    event.preventDefault();
    // initialisation tableau items du localStorage
    let items=[];
    // récupération valeur quantity du formulaire modifiée/ou pas, par l'utilisateur
    let quantity = parseInt(document.getElementById("quantity").value);
    // récupération valeur color de la page Web
    let color = document.getElementById("colors").value;
        //test si champs correctement remplis de couleur et quantité
        if(color==""){
            alert("Veuillez choisir une couleur");
            }else if (quantity<=0 || quantity>100){
                alert("la quantité doit être entre 1 et 100");  
        }else{
            // Si champs correctement remplis
            // initialisation d'un nouveau tableau : newItems
            // avec résultats calcul quantity modifiée/ou pas par l'utilisateur
            if(localStorage.getItem('items')){
                items = JSON.parse(localStorage.getItem('items'));
                }
                let newItems = [];
                let isExist = false;
                
                items.forEach(element => {
                    // si valeurs id et color du localStorage 
                    // et valeurs id et color affichées sur la page Web
                    // sont identiques
                    // alors calcul quantity et variable isExist = true
                    if(element.id === idProduct && element.color === color){
                    element.quantity = element.quantity + quantity;
                    isExist = true;
                    }
                    // ajout element après calcul quantity
                    // à newItems
                    newItems.push(element);
                });
                    // variable isExist = false
                    // element.id != idProduct ou element.color != color
                    // ajout element à newItems 
                    if(!isExist){
                        let item0 = {
                            id: idProduct,
                            name: elementTitle,
                            color:color,
                            quantity:quantity,
                            imageUrl:imageUrl,
                            price : price,
                            description : description
                        }
                        newItems.push(item0);
                    }
                //sérialisation des valeurs de newItems
                const valeursnewItems = JSON.stringify(newItems);
                //stockage des infos de valeurnewsItems dans localStorage
                window.localStorage.setItem("items", valeursnewItems);
            }
})
