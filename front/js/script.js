//Déclaration variable adresse http de l'api
let url = "http://localhost:3000/api/products";
//Déclaration variable items et liée avec la balise du fichier html
let items = document.getElementById("items");
//alternative : await fetch(url) ?
//Lorsque la fonction fetch a atteind l'api
//alors (.then) la promesse est "resolved"
//et les données datas sont prises en argument de la 
//fonction then
fetch(url).then(datas=>{
  //les datas au format json avec .then et le paramètre
  //elements dans la fonction
    datas.json().then(elements=>{
      //.forEach qui parcourt le tableau elements et
      //execute la fonction de chaque element de elements
        elements.forEach((element) => {
          //interpolation du code html contenu dans la balise items
            items.innerHTML+='<a href="./product.html?id='+element._id+'">\
            <article>\
              <img src="'+element.imageUrl+'" alt="Lorem ipsum dolor sit amet, '+element.name+'">\
              <h3 class="productName">'+element.name+'</h3>\
              <p class="productDescription">'+element.description+'</p>\
            </article>\
          </a>'     
        });

    })
})