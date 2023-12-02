//Déclaration variable adresse url de l'api
let url = "http://localhost:3000/api/products";
//Récupération DOM 
let items = document.getElementById("items");
//récupération de l'url et de toutes ses données
fetch(url).then(datas=>{
    datas.json().then(elements=>{
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