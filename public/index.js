var e;
var ea;
var itemId;

var itemDetails = {
    items: {
        aaaa: {
            img1: "IMG_0239.JPG",
            img2: null,
            itA: "imgTypeA",
            itB: "ihA",
            price: 2.99,
            name: "Travelling Pencil Case",
            itemTypes: {
                "1o": {
                    value: "000",
                    text: "dimond patton"
                },

                "2o": {
                    value: "001",
                    text: "othor"
                },

                "3o": {
                    value: "002",
                    text: "cats"
                },


            },
            info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

        },

        aaab: {
            img1: "testing-height-img.jpg",
            img2: null,
            itA: "imgTypeB",
            itB: "ihB",
            price: 2.99,
            name: "Cat",
            itemTypes: {
                "1o": {
                    value: "000",
                    text: "dimond patton"
                },

                "2o": {
                    value: "001",
                    text: "othor"
                }

            },
            info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

        },

        aaac: {
            img1: "IMG_0242.JPG",
            img2: null,
            itA: "imgTypeA",
            itB: "ihA",
            price: 2.99,
            name: "Test",
            itemTypes: {
                "1o": {
                    value: "000",
                    text: "dimond patton"
                },

                "2o": {
                    value: "001",
                    text: "othor"
                },

                "3o": {
                    value: "002",
                    text: "cats"
                },

                "4o": {
                    value: "003",
                    text: "dogs"
                },
            },
            info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

        }

    }
}

var itemOrder = {
    "i1": "aaab",
    "i2": "aaac",
    "i3": "aaaa",
}


window.onload = function() {
    for (var i = 0; i < 3; i++) {
        e = document.createElement("div");
        e.classList.add("item");
        // e.classList.add("iTypeA");
        var iNumber = i + 1;
        // console.log(itemOrder["i" + iNumber])
        e.onclick = function(event) {
            itemClicked(event);
        }

        e.setAttribute("data-openitem", itemOrder["i" + iNumber])
        // ea = document.createElement("div");
        // ea.classList.add("itemPartA");
        // ea.classList.add("iTypePartA");
        // e.appendChild(ea);
        document.getElementById("mainMenuI").appendChild(e);
    }


    document.getElementById("order").classList.add("hide");



}

function cartAdd() {
    console.log(isNaN(document.getElementById("orderQwantity").value))
    if (document.getElementById("orderQwantity").value.charCodeAt(0) >= 49 && document.getElementById("orderQwantity").value.charCodeAt(0) <= 57) {
        var orderData = itemId + document.getElementById("orderQwantity").value + document.getElementById("changeItemType").value;
        //+ document.getElementById("POorPI").value;
        if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null") {
            localStorage.setItem("cart", orderData);
        }
        else {
            localStorage.setItem("cart", localStorage.getItem("cart") + "-" + orderData);
        }

        alert("Sucsesfully added item to cart");

        hideAllPages();
        openMainMenu();
    }
    else {
        alert("You need to enter a qwantity");
    }

}

function itemClicked(event) {
    hideAllPages();
    openOrderMenu(event);
}

function hideAllPages() {
    document.getElementById("order").classList.add("hide");
    document.getElementById("cart").classList.add("hide");
    document.getElementById("mainMenu").classList.add("hide");
}

function backToMainMenu() {
    hideAllPages();
    openMainMenu();
}

function openMainMenu() {
    document.getElementById("mainMenu").classList.remove("hide");
}

function openOrderMenu(event) {
    itemId = event.srcElement.dataset.openitem;
    console.log(itemId);
    document.getElementById("orderQwantity").value = "";
    document.getElementById("changeItemType").value = "1o";
    document.getElementById("imgHolder").removeChild(document.getElementById("imgHolder").firstChild);
    document.getElementById("changeItemType").innerHTML = "";
    document.getElementById("itemInfoText").innerHTML = itemDetails.items[itemId].info;

    document.getElementById("order").classList.remove("hide");


    e = document.createElement("img");
    e.src = itemDetails.items[itemId].img1;
    // depends on height and width
    e.classList.add(itemDetails.items[itemId].itA, "orderImg");
    ea = document.getElementById("imgHolder");
    //  do all times
    ea.classList.remove("ihA", "ihB");
    //  end
    console.log(itemDetails.items[itemId].itB);
    ea.classList.add(itemDetails.items[itemId].itB);

    // end   



    console.log(e);
    console.log("a");

    document.getElementById("imgHolder").appendChild(e);

    e = document.getElementById("changeItemType");



    Object.keys(itemDetails.items[itemId].itemTypes).forEach(function(key, i) {
        ea = document.createElement("option");

        ea.value = itemDetails.items[itemId].itemTypes[i + 1 + "o"].value;
        ea.innerHTML = itemDetails.items[itemId].itemTypes[i + 1 + "o"].text;

        // e.appendChild(ea);
        console.log(ea)
        document.getElementById("changeItemType").appendChild(ea)


        // itemTypes: {
        //     1: {
        //         value: 1,
        //         text: "dimond patton"
        //     },

        //     2: {
        //         value: 1,
        //         text: "othor"
        //     }
        // },
    })




}

function menuItem(selection) {
    console.log(selection);
}

function openCart() {
    hideAllPages();
    document.getElementById("cart").classList.remove("hide")
    addItemsToCartMenu();
}

function addItemsToCartMenu() {

    document.getElementById("cartI").innerHTML = "";

    var itemsInCart = localStorage.getItem("cart").split("-");
    for (var i = 0; i < itemsInCart.length; i++) {
        e = document.createElement("div");
        e.classList.add("cartItem");
        
        //check adding moltaball    classes 

        ea = document.createElement("div");
        ea.innerHTML = itemDetails.items[itemsInCart[i].substring(0, 4)].name;
        ea.classList.add("nameCart", "defont");
        e.appendChild(ea);

        ea = document.createElement("div");
        ea.innerHTML = "Quantity: " + itemsInCart[i].substring(4, 5);
        ea.classList.add("qwantityCart", "defont");
        e.appendChild(ea);






        ea = document.createElement("img");
        ea.src = itemDetails.items[itemsInCart[i].substring(0, 4)].img1;
        ea.classList.add("imgCart");
        
        
        
        if (itemDetails.items[itemsInCart[i].substring(0, 4)].itB === "ihA") {
            ea.style.width = "10vw"
        }
        else {
            ea.style.height = "10vw"
        }
        e.appendChild(ea);

        document.getElementById("cartI").appendChild(e);



    }
}
