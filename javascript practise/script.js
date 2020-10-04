//console.log("Hello!");
let menuItems = [];
let cart = [];
function Table() {
    if (localStorage.getItem("menuLocal") === null) {
        menuItems = [
            { id: 1, name: 'Sandwich', price: 99, active: 'Yes', dateOfLaunch: '15/03/2017', category: 'Main Course', freeDelivery: 'Yes' },
             { id: 2, name: 'Burger', price: 129, active: 'Yes', dateOfLaunch: '23/12/2017', category: 'Main Course', freeDelivery: 'No' },
             { id: 3, name: 'Pizza', price: 149, active: 'Yes', dateOfLaunch: '21/08/2017', category: 'Main Course', freeDelivery: 'No' },
             { id: 4, name: 'French Fries', price: 57, active: 'No', dateOfLaunch: '02/07/2017', category: 'Starter', freeDelivery: 'Yes' },
             { id: 5, name: 'Chocolate Brownies', price: 32, active: 'Yes', dateOfLaunch: '02/11/2022', category: 'Dessert', freeDelivery: 'Yes' }
         ];
        localStorage.setItem("menuLocal", JSON.stringify(menuItems));
    }
    else {
        let localItems = JSON.parse(localStorage.getItem("menuLocal"));
        localItems.forEach(function(item) {
            menuItems.push(item);
        })
    }
}

function adminMenuTable() {
    
    Table();
    let tbody = document.getElementsByTagName("tbody")[0];

    menuItems.forEach(function(item, index) {
        let dataRow = tbody.insertRow();

        let nameCell = dataRow.insertCell();
        let priceCell = dataRow.insertCell();
        let activeCell = dataRow.insertCell();
        let dateOfLaunchCell = dataRow.insertCell();
        let categoryCell = dataRow.insertCell();
        let freeDeliveryCell = dataRow.insertCell();
        let editCell = dataRow.insertCell();

        nameCell.innerText = item.name;
        priceCell.innerText = item.price;
        activeCell.innerText = item.active;
        dateOfLaunchCell.innerText = item.dateOfLaunch;
        categoryCell.innerText = item.category;
        freeDeliveryCell.innerText = item.freeDelivery;

        let editBtn = document.createElement('a');
        editBtn.innerText = "Edit";
        editBtn.setAttribute('data-userIndex', index);
        editBtn.setAttribute('href', "edit-menu-item.html");
        editBtn.onclick = edit;
        editCell.appendChild(editBtn);
    })
}

function edit() {
    let index = this.getAttribute('data-userIndex');
    let editItem = menuItems[index];
    window.sessionStorage.setItem("editItem", JSON.stringify(editItem));
    window.sessionStorage.setItem("index", JSON.stringify(index));
}

function Details() {
    document.getElementById("name").value = JSON.parse(window.sessionStorage.getItem("editItem")).name;
    document.getElementById("price").value = JSON.parse(window.sessionStorage.getItem("editItem")).price;
    document.getElementById(JSON.parse(window.sessionStorage.getItem("editItem")).active).click();
    document.getElementById("date").value = JSON.parse(window.sessionStorage.getItem("editItem")).dateOfLaunch;
    document.getElementById("category").value = JSON.parse(window.sessionStorage.getItem("editItem")).category;
    if (JSON.parse(window.sessionStorage.getItem("editItem")).freeDelivery==="Yes")
        document.getElementById("free_delivery").click();
}
function validateForm() {
    let name = document.forms["truForm"]["name"].value;
    let price = document.forms["truForm"]["price"].value;
    let date = document.forms["truForm"]["date"].value;
    let category = document.forms["truForm"]["category"];
    let selectedCategory = category.options[category.selectedIndex].value;
    let flag = true;

    if (name == "") {
        alert("name is required");
        flag = false;
    }
    else if (price == "") {
        alert("Price is required");
        flag = false;
    }
    else if (isNaN(price)) {
        alert("Price has to be a number");
        flag = false;
    }
    else if (date == "") {
        alert("Date of Launch is required");
        flag = false;
    }
    else if (selectedCategory == "Default") {
        alert("Select one category");
        flag = false;
    }
    if (flag === true) {
        save();
    }
    return false;
}
function save() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let isActive = "";
    if (document.getElementById("Yes").checked)
        isActive = "Yes";
    else 
        isActive = "No";
    let dateOfLaunch = document.getElementById("date").value;
    let allCategories = document.getElementById("category");
    let category = allCategories.options[allCategories.selectedIndex].value;
    let freeDelivery = document.getElementById("free_delivery");
    let isFreeDelivery = "";
    if (freeDelivery.checked)
        isFreeDelivery = "Yes";
    else
        isFreeDelivery = "No";
    
    let index = JSON.parse(window.sessionStorage.getItem("index"));
    let menuItems = JSON.parse(localStorage.getItem("menuLocal"));
    let item = menuItems[index];
    item.name = name;
    item.price = price;
    item.active = isActive;
    item.dateOfLaunch = dateOfLaunch;
    item.category = category;
    item.freeDelivery = isFreeDelivery;

    menuItems[index] = item;
    localStorage.setItem("menuLocal", JSON.stringify(menuItems));

    window.location.href = "edit-menu-status.html";
}

function CustomerTable() {
    
    Table();
    let tbody = document.getElementsByTagName("tbody")[0];

    menuItems.forEach(function(item, index) {
        if (item.active == "Yes") {
            let dataRow = tbody.insertRow();

            let nameCell = dataRow.insertCell();
            let freeDeliveryCell = dataRow.insertCell();
            let priceCell = dataRow.insertCell();
            let categoryCell = dataRow.insertCell();
            let cartCell = dataRow.insertCell();

            nameCell.innerText = item.name;
            freeDeliveryCell.innerText = item.freeDelivery;
            priceCell.innerText = item.price;
            categoryCell.innerText = item.category;
            
            let addToCartBtn = document.createElement('a');
            addToCartBtn.innerText = "Add to Cart";
            addToCartBtn.setAttribute('data-userIndex', index);
            addToCartBtn.setAttribute('href', "customer_status.html");
            addToCartBtn.onclick = addToCart;
            cartCell.appendChild(addToCartBtn);
        }
    })
}

function addToCart () {
    if (localStorage.getItem("cart") !== null) {
        let localCart = JSON.parse(localStorage.getItem("cart"));
        localCart.forEach(function(item){
            cart.push(item);
        })
    }
    let indexCart = this.getAttribute('data-userIndex');
    window.sessionStorage.setItem("indexCart", JSON.stringify(indexCart));

    let item = menuItems[indexCart];
    let cartItem = {
        name : item.name,
        freeDelivery : item.freeDelivery,
        price : item.price,
        category : item.category
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    cart = [];
}

let totalPrice = 0;
function cartPage() {
    
    if (localStorage.getItem("cart") == null || localStorage.getItem("cart").length == 2) {
        window.location.href = "cart_empty.html";
    }
    else {
        let localCart = JSON.parse(localStorage.getItem("cart"));
        localCart.forEach(function(item){
            totalPrice += parseFloat(item.price); 
            cart.push(item);
        })
    }

    let tbody = document.getElementsByTagName("tbody")[0];
    cart.forEach(function(item, index) {
        let dataRow = tbody.insertRow();

        let nameCell = dataRow.insertCell();
        let freeDeliveryCell = dataRow.insertCell();
        let priceCell = dataRow.insertCell();
        let deleteCell = dataRow.insertCell();

        nameCell.innerText = item.name;
        freeDeliveryCell.innerText = item.freeDelivery;
        priceCell.innerText = item.price;
        
        let deleteFromCartBtn = document.createElement('a');
        deleteFromCartBtn.innerText = "Delete";
        deleteFromCartBtn.setAttribute('data-userIndex', index);
        deleteFromCartBtn.setAttribute('href', "cart_status.html");
        deleteFromCartBtn.onclick = deleteFromCart;
        deleteCell.appendChild(deleteFromCartBtn);
    })

    let dataRow = tbody.insertRow();
    let emptyCell = dataRow.insertCell();
    let totalCell = dataRow.insertCell();
    let totalPriceCell = dataRow.insertCell();
    dataRow.insertCell();

    totalCell.innerText = "Total";
    totalPriceCell.innerText = "Rs. " + totalPrice;
}

function deleteFromCart () {
    if (localStorage.getItem("cart")===null || localStorage.getItem("cart").length == 2) {
        window.location.href = "cart_empty.html";
    }
    let deleteIndex = this.getAttribute("data-userIndex");
    cart.splice(deleteIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
}