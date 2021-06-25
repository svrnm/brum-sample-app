
window.cart = {
    count: 0,
    remotePrice: 0,
    discount: 0,
    linePrice: 0,
    delivery: 7.99,
    totalPrice: 0
}

window.onload = function () {
    callBackend('/api/getPrice', (remotePrice) => {
        loadLogo(async () => {
            const price = document.getElementById("price");
            price.innerHTML = remotePrice
            const addToCartButton = document.getElementById("addToCart");
            const checkoutButton = document.getElementById('buy')
            const reloadButton = document.getElementById('reload');
            addToCartButton.style.display = 'block';
            checkoutButton.addEventListener('click', () => {
                const customerID = document.getElementById('customerId').value;
                const transactionID = uuidv4();
                const paymentProvider = Array.from(document.querySelectorAll('input[name="payment_provider"]')).reduce((result, current) => {
                    if(current.checked) {
                        return current.value;
                    }
                    return result;
                }, 'none');

                window.appPaynamicsAPI.addEventListener('payed', () => {
                    callBackend('/api/checkout?/' + customerID + '/' + transactionID, (response) => {
                        const status = JSON.parse(response).status
                        if(status === 'success') {
                            const message = document.getElementById('message');
                            message.style.display = 'block';
                        }
                    })
                })

                window.appPaynamicsAPI.pay(paymentProvider)
            })
            addToCartButton.addEventListener('click', () => {
                const checkoutWidget = document.getElementById('checkout');
                const unitCount = document.getElementById('unitCount');
                const unitPrice = document.getElementById('unitPrice');
                const discount = document.getElementById('discount');
                const linePrice = document.getElementById('linePrice');
                const totalPrice = document.getElementById('totalPrice');
                const delivery = document.getElementById('delivery');

                window.cart.count++;
                window.cart.remotePrice = remotePrice;
                window.cart.discount = 2000 * window.cart.count;
                window.cart.linePrice = window.cart.count * parseInt(remotePrice) - window.cart.discount
                window.cart.totalPrice = window.cart.linePrice + 7.99;

                unitCount.innerHTML = window.cart.count;
                unitPrice.innerHTML = window.cart.remotePrice;
                discount.innerHTML = window.cart.discount;
                linePrice.innerHTML = window.cart.linePrice;
                delivery.innerHTML = window.cart.delivery;
                totalPrice.innerHTML = window.cart.totalPrice;

                checkoutWidget.style.display = 'block';
            });
            reloadButton.addEventListener('click', () => {
                document.location.reload();
            })
            logo.addEventListener('click', async () => {
            addToCartButton.click();  
            await next(() => { document.getElementById('customerId').value = uuidv4(); })
            await next(() => { checkoutButton.click(); })
            await next(() => { reloadButton.click(); })
            })
        })  
    });
}