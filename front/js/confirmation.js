const url = new URL(document.location);
const searchParams = url.searchParams;
const orderId = searchParams.get('orderId');

function displayNumberOrder(orderId)
{
    const orderNumber = document.getElementById("orderId")
    orderNumber.innerHTML = orderId
}

function clean_cart()
{
    return localStorage.clear();
}

displayNumberOrder(orderId);
clean_cart();