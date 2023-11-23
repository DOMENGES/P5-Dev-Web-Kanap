const url = new URL(document.location);
console.log(url);
const searchParams = url.searchParams;
const orderId = searchParams.get('orderId');
console.log(orderId);

function displayNumberOrder(orderId)
{
    const orderNumber = document.getElementById("orderId");
    orderNumber.innerHTML = orderId;
    console.log(orderId);
}

function clean_cart()
{
    return localStorage.clear();
}

displayNumberOrder(orderId);
clean_cart();