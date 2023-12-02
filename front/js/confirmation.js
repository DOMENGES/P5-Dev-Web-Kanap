const url = new URL(document.location);
const searchParams = url.searchParams;
const orderId = searchParams.get('orderId');
// affichage du numéro de commande
function displayNumberOrder(orderId)
{
    const orderNumber = document.getElementById("orderId");
    orderNumber.innerHTML = orderId;
}
// effacement des données du localStorage
function clean_cart()
{
    return localStorage.clear();
}

displayNumberOrder(orderId);
clean_cart();