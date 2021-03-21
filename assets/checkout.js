//Handle call to backend and generate preference.
document.getElementById("form-checkout").addEventListener("submit", function(e) {
    $('#checkout-btn').attr("disabled", true);
    var orderData = {
        id: document.getElementById("product-id").value,
        quantity: document.getElementById("product-unit").value,
        title: document.getElementById("product-title").value,
        description: document.getElementById("product-description").value,
        price: document.getElementById("product-price").value,
        img: document.getElementById("product-img").value,
        payer: {
            name: document.getElementById("payer-name").value,
            surname: document.getElementById("payer-surname").value,
            email: document.getElementById("payer-email").value,
            phone: {
                area_code: document.getElementById("payer-phone-area_code").value,
                number: document.getElementById("payer-phone-number").value,
            },
            address: {
                street_name: document.getElementById("payer-address-street_name").value,
                street_number: document.getElementById("payer-address-street_number").value,
                zip_code: document.getElementById("payer-address-zip_code").value,
            }
        },
    };
    fetch("/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $("#modal-checkout").show(500).fadeIn();
            }, 500);

        })
        .catch(function(error) {
            console.log('oi');
            console.log(error);
            alert("Unexpected error1");
            $('#checkout-btn').attr("disabled", false);
        });
    e.preventDefault();
});

//Create preference when click on checkout button
function createCheckoutButton(preference) {
    var script = document.createElement("script");

    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src = "https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-button-label", "Pague a compra")
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementById("button-checkout").innerHTML = '';
    document.querySelector("#button-checkout").appendChild(script);
}
$("#modal-checkout").fadeOut(500);