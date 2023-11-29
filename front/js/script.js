//Déclaration variable adresse url de l'api
let url = "http://localhost:3000/api/products";
//Déclaration variable items et liée avec la balise du fichier html grâce au DOM
let items = document.getElementById("items");
//récupération de l'url et de toutes ses données
fetch(url).then(datas=>{
  //données traduites au format JSON
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