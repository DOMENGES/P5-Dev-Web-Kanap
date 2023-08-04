//récupération url du produit depuis le navigateur
const url = new URL(document.location);
console.log (url);
//récupération id du produit dans l'url
const searchParams = url.searchParams;
const idProduct = searchParams.get('id');
console.log(idProduct);

//récupération des balises titre + image + price + description du DOM 
let elementTitle = null;
let imageUrl = null;
let price = null;
let description = null;

//déclaration url2 du produit complétée avec id du produit
let url2 = "http://localhost:3000/api/products/"+idProduct;

//recupération des données(API) au format Json du produit
fetch(url2).then(data=>{
    data.json().then(element=>{ 
    elementTitle = element.name;
    imageUrl = element.imageUrl;
    price = element.price;
    description = element.description;
    // récupération balise image de html
    let elementImg = document.querySelector(".item__img");
    // affichage dans la page web des données image
    elementImg.innerHTML = '<img src="'+imageUrl+'" alt="Photographie d\'un canapé">';
    // récupérations et affichages autres données du produit
    document.getElementById("title").innerHTML = '<h1>'+elementTitle+'</h1>';
    let elementPrice = document.getElementById("price");
    elementPrice.innerHTML = '<span>'+price+ '</span>';
    let elementDescription = document.getElementById("description");
    elementDescription.innerHTML = '<p>'+description+'</p>';

    //récupération tableau couleurs de l'API
    const couleur = element.colors;
    //récupération et affichage de chaque données du tableau couleur
    for (let i=0; i<couleur.length; i++){
        let valeurCouleur = couleur[i];
        let formulaireCouleur = document.getElementById("colors");
        formulaireCouleur.innerHTML += '<option>'+valeurCouleur+'</option>';
    }
    })
})

//déclaration évènement "click" sur bouton "ajouter au panier"
let addToCartBox = document.getElementById("addToCart");
addToCartBox.addEventListener("click", (event)=>{
    event.preventDefault();
    // déclaration tableau articles sélectionnés
    let items=[];
    // traduction + récupération du DOM des données sélectionnées quantity
    let quantity = parseInt(document.getElementById("quantity").value);
    // récupération des données sélectionnées couleur
    let color = document.getElementById("colors").value;
        //test champs des formulaires quantité et couleur
        if(color==""){
            alert("Veuillez choisir une couleur");
            }else if (quantity<=0 || quantity>100){
                alert("la quantité doit être entre 1 et 100");  
        }else{
            // Sinon : formulaires correctement remplis
            //  + Si 
            // récupération du localStorage du tableau items
            if(localStorage.getItem('items')){
                // Alors reformation des données items pour JS
                items = JSON.parse(localStorage.getItem('items'))
                }

                //déclaration d'un nouveau tableau : newItems
                let newItems = [];
                //boolean initialisé à false
                let isExist = false;
                // items(données sélectionnées) avec id et color identiques
                items.forEach(element => {
                    // Si
                    // element : calcul quantité pour id et color identiques
                    // + variable isExist passe à true
                    if(element.id == idProduct && element.color == color){
                    element.quantity = element.quantity + quantity;
                    isExist = true;
                    }
                    // Alors ajout élément(quantité calculée) au tableau newItems
                    newItems.push(element);
                });
            
                // Si isExist est true
                if(!isExist){
                // Alors déclaration item0 avec ttes propriétés originales
                    let item0 = {
                        id: idProduct,
                        name: elementTitle,
                        color:color,
                        quantity:quantity,
                        imageUrl:imageUrl,
                        price : price,
                        description : description
                    }
                    // + intégrer item0 dans newItems
                    newItems.push(item0);
                }
                //sérialisation des valeurs de newItems
                const valeursnewItems = JSON.stringify(newItems);
                //stockage des infos d'items dans localStorage
                window.localStorage.setItem("items", valeursnewItems);
            }
})
// fin ajout au panier des données utilisateur
