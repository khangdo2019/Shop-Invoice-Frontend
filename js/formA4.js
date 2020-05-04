/*
    The function formSubmit() is called when the form "myform" is submitted.
    It should run some validations and show the output.
*/
var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/ //Email Regular Expression
var postcodeRegex = /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/ //Postcode regular expression
var phoneRegex = /^[0-9]{3}[\-\.\s]?[0-9]{3}[\-\.\s]?[0-9]{4}$/ //Phone number Regular Expression
var addressRegex = /^\d+\s[A-Za-z0-9\s]+$/ //Address Regular Expression
var cityRegex = /^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*$/ //City Regular Expression
var numberRegex = /^[1-9][0-9]*$/ //Required at least 1 product.

function formSubmit() {

    //Write your code here
    //----------Fetch all the values-------
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var postcode = document.getElementById('postcode').value;
    var province = document.getElementById('province').value;
    var product1 = document.getElementById('product1').value;
    var product2 = document.getElementById('product2').value;
    var product3 = document.getElementById('product3').value;
    var delivery = document.getElementById('delivery').value;

    //----------Sanitize values--------

    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    address = address.trim();
    city = city.trim();
    postcode = postcode.trim();
    province = province.trim();
    product1 = product1.trim();
    product2 = product2.trim();
    product3 = product3.trim();
    delivery = delivery.trim();

    //----------Validate-----------
    var errors = '';
    //Name is not an empty string
    if (name == '') {
        errors += `Name is required.<br>`;
    }

    //Check the email format email@domain.com
    if (!emailRegex.test(email)) {
        errors += `Email is not in a correct format.<br>`;
    }

    //Check the phone format 123-123-1234
    if (!phoneRegex.test(phone)) {
        errors += `Phone number is not in a correct format.<br>`;
    }

    //Check the address format
    if (!addressRegex.test(address)) {
        errors += `Address is not in a correct format.<br>`;
    }

    //Check the city format
    if (!cityRegex.test(city)) {
        errors += `City is not in a correct format.<br>`;
    }

    //Check the postcode format
    if (!postcodeRegex.test(postcode)) {
        errors += `Postcode is not in a correct format.<br>`;
    }

    //Check the province selected
    if (province == "") {
        errors += `Please select your province.<br>`;
    }

    //Please pick 1 product
    if ((!numberRegex.test(product1)) && (!numberRegex.test(product2)) && (!numberRegex.test(product3))) {
        errors += `Please select 1 product. <br>`;
    }

    //Check the delivery time selected
    if (delivery == "") {
        errors += `Please select your delivery time.<br>`;
    }

    //---------Check errors and show------------
    if (errors) {
        document.getElementById('errors').innerHTML = errors;
        modal();
    } else {
        document.getElementById('formData').style.visibility = "visible";
        document.getElementById('invoiceHeader').style.visibility = "visible";
        document.getElementById('form').style.display = "none";
        document.getElementById('formHeader').style.display = "none";

        //clear the errors
        document.getElementById('errors').innerHTML = '';

        //Displays customer's information
        document.getElementById('nameInvoice').innerHTML = name;
        document.getElementById('emailInvoice').innerHTML = email;
        document.getElementById('phoneInvoice').innerHTML = phone;

        deliveryAddress = `${address}, ${city}, ${province}, ${postcode}`;
        document.getElementById('addressInvoice').innerHTML = deliveryAddress.toUpperCase();

        //----Calculate the fare----
        //Price of products
        var product1Price = 1200;
        var product2Price = 600;
        var product3Price = 800;

        //Parsing the value
        if (product1 == "") {
            product1 = 0;
        } else product1 = parseInt(product1);
        if (product2 == "") {
            product2 = 0;
        } else product2 = parseInt(product2);
        if (product3 == "") {
            product3 = 0;
        } else product3 = parseInt(product3);
        delivery = parseInt(delivery);

        //Calculate the value of each product.
        var product1Value = product1 * product1Price;
        var product2Value = product2 * product2Price;
        var product3Value = product3 * product3Price;

        //Displays the product value.
        document.getElementById('product1Invoice').innerHTML = `${product1} LAPTOP @ $${product1Price.toFixed(2)}`;
        document.getElementById('product2Invoice').innerHTML = `${product2} SMARTPHONE @ $${product2Price.toFixed(2)}`;
        document.getElementById('product3Invoice').innerHTML = `${product3} DESKTOP @ $${product3Price.toFixed(2)}`;
        document.getElementById('product1Total').innerHTML = `$${product1Value}`;
        document.getElementById('product2Total').innerHTML = `$${product2Value}`;
        document.getElementById('product3Total').innerHTML = `$${product3Value}`;

        //Calculates the delivery value and displays it
        var deliveryPrice;
        switch (delivery) {
            case 1:
                deliveryPrice = 30;
                break;
            case 2:
                deliveryPrice = 25;
                break;
            case 3:
                deliveryPrice = 20;
                break;
            case 4:
                deliveryPrice = 15;
                break;
            default:
                deliveryPrice = 0;
        }
        document.getElementById('shippingInvoice').innerHTML = `$${deliveryPrice}`;

        //Calculates the rate of taxes and displays it
        /*
        alberta 5
        BC 12
        manitoba 12
        newBrunswick 15
        newfoundland 15
        novaScotia 15
        ontario 13
        quebec 14.975
        saskatchewan 11
        */

        var taxRate = 0;
        switch (province) {
            case 'alberta':
                taxRate = 5;
                break;
            case 'BC':
                taxRate = 12;
                break;
            case 'manitoba':
                taxRate = 12;
                break;
            case 'newBrunswick':
                taxRate = 15;
                break;
            case 'newfoundland':
                taxRate = 15;
                break;
            case 'novaScotia':
                taxRate = 15;
                break;
            case 'ontario':
                taxRate = 13;
                break;
            case 'quebec':
                taxRate = 14.975;
                break;
            case 'saskatchewan':
                taxRate = 11;
                break;
            default:
                taxRate = 0;
        }
        document.getElementById('taxesInvoice').innerHTML = `TAXES @ ${taxRate}%`;

        //Calculates total value and Taxes
        var subTotal = product1Value + product2Value + product3Value + deliveryPrice;
        var taxes = subTotal * taxRate / 100;
        var total = subTotal + taxes;

        //Displays the total and taxes
        document.getElementById('subTotalInvoice').innerHTML = `$${subTotal}`;
        document.getElementById('taxesTotal').innerHTML = `$${taxes.toFixed(2)}`;
        document.getElementById('totalInvoice').innerHTML = `$${total.toFixed(2)}`;
    }
    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}

function modal() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}