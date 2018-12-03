// Initialize Firebase
var config = {
    apiKey: "AIzaSyDb1nRDnf0SkQAm-AF_lI9hov8FHbsf5m4",
    authDomain: "jordy-shop.firebaseapp.com",
    databaseURL: "https://jordy-shop.firebaseio.com",
    projectId: "jordy-shop",
    storageBucket: "jordy-shop.appspot.com",
    messagingSenderId: "275722148119"
};
firebase.initializeApp(config);
const database = firebase.database();



var e;
var ea;
var eb;
var ec;
var itemId;
var orderDisplay = 1;
var name = "";
var email = "";
var PC = "";
var AL = "";
var state = "";
var open = "N";

// var itemDetails = {
    // items: {
    //     aaaa: {
    //         img1: "IMG_0239.JPG",
    //         img2: "testing-height-img.jpg",
    //         itA: "imgTypeA",
    //         itB: "ihA",
    //         price: 2.99,
    //         name: "Travelling Pencil Case",
    //         itemTypes: {
    //             "1o": {
    //                 value: "000",
    //                 text: "dimond patton"
    //             },

    //             "2o": {
    //                 value: "001",
    //                 text: "othor"
    //             },

    //             "3o": {
    //                 value: "002",
    //                 text: "cats"
    //             },


    //         },
    //         info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

    //     },

    //     aaab: {
    //         img1: "testing-height-img.jpg",
    //         img2: null,
    //         itA: "imgTypeB",
    //         itB: "ihB",
    //         price: 2.99,
    //         name: "Cat",
    //         itemTypes: {
    //             "1o": {
    //                 value: "000",
    //                 text: "dimond patton"
    //             },

    //             "2o": {
    //                 value: "001",
    //                 text: "othor"
    //             }

    //         },
    //         info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

    //     },

    //     aaac: {
    //         img1: "IMG_0242.JPG",
    //         img2: null,
    //         itA: "imgTypeA",
    //         itB: "ihA",
    //         price: 2.99,
    //         name: "Test",
    //         itemTypes: {
    //             "1o": {
    //                 value: "000",
    //                 text: "dimond patton"
    //             },

    //             "2o": {
    //                 value: "001",
    //                 text: "othor"
    //             },

    //             "3o": {
    //                 value: "002",
    //                 text: "cats"
    //             },

    //             "4o": {
    //                 value: "003",
    //                 text: "dogs"
    //             },
    //         },
    //         info: "This pencil case is suitable for travelling, it is 17.5cm X 7cm, fits 12 pencils and is handmade and closes with velcro making it more compact."

    //     }

    // }
// }

var itemOrder = {
    "i1": "aaab",
    "i2": "aaac",
    "i3": "aaaa",
}

var itemDetails;

window.onload = function() {
    var starCountRef = database.ref("itemDetails");
    database.ref("itemDetails").on('value', function(snapshot) {
        SID(snapshot.val())

    });
}

function SID(data) {
    itemDetails = data;
    console.log(data)
    FW()
}

function FW() {

    // window.onload = function() {

    for (var i = 0; i < 3; i++) {
        e = document.createElement("div");
        e.classList.add("item");
        // e.classList.add("iTypeA");
        var iNumber = i + 1;
        // console.log(itemOrder["i" + iNumber])


        ea = document.createElement("div");
        ea.classList.add("itemPartA");
        ec = document.createElement("div");
        ec.classList.add("itemPartAA", "defont");
        ec.innerHTML = itemDetails.items[itemOrder["i" + iNumber]].name;
        ea.appendChild(ec);
        ec = document.createElement("div");
        ec.classList.add("itemPartAB", "defont");
        ea.appendChild(ec);
        ec.innerHTML = "$" + itemDetails.items[itemOrder["i" + iNumber]].price;
        e.appendChild(ea);

        ea = document.createElement("div");
        ea.classList.add("itemPartB");
        // console.log(itemDetails.items[itemOrder["i" + iNumber]].img1)
        eb = document.createElement("img");
        eb.src = itemDetails.items[itemOrder["i" + iNumber]].img1;
        eb.classList.add("itemImg")
        ea.appendChild(eb);


        e.appendChild(ea);

        ea = document.createElement("div");
        ea.classList.add("itemClickP");
        ea.setAttribute("data-openitem", itemOrder["i" + iNumber])
        ea.onclick = function(event) {
            itemClicked(event);
        }
        e.appendChild(ea);

        document.getElementById("mainMenuI").appendChild(e);
    }


    document.getElementById("order").classList.add("hide");
    document.getElementById("cart").classList.add("hide");



    //}

}

function cartAdd() {
    open = "N";
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
    open = "N";
    document.getElementById("mainMenu").classList.remove("hide");
}

function openOrderMenu(event) {
    open = "Y";
    itemId = event.srcElement.dataset.openitem;
    console.log(itemId);
    document.getElementById("namePOItem").innerHTML = itemDetails.items[itemId].name + "&nbsp &nbsp &nbsp &nbsp $" + itemDetails.items[itemId].price;
    document.getElementById("orderQwantity").value = "";
    document.getElementById("changeItemType").value = "1o";
    document.getElementById("imgHolder").removeChild(document.getElementById("imgHolder").firstChild);
    document.getElementById("changeItemType").innerHTML = "";
    document.getElementById("itemInfoText").innerHTML = itemDetails.items[itemId].info;

    document.getElementById("order").classList.remove("hide");


    e = document.createElement("img");
    e.src = itemDetails.items[itemId].img1;

    e.classList.add(itemDetails.items[itemId].itA, "orderImg");
    ea = document.getElementById("imgHolder");

    ea.classList.remove("ihA", "ihB");

    console.log(itemDetails.items[itemId].itB);
    ea.classList.add(itemDetails.items[itemId].itB);



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
    open = "N";
    hideAllPages();
    document.getElementById("orderButton").classList.add("hide");
    if (!(localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null")) {
        document.getElementById("orderButton").classList.remove("hide");
    }
    document.getElementById("orderDeatails").classList.add("hide");
    document.getElementById("cart").classList.remove("hide")
    addItemsToCartMenu();
}

function addItemsToCartMenu() {

    document.getElementById("cartI").innerHTML = "";

    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "null") {


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

            ea = document.createElement("div");
            ea.innerHTML = "Remove";
            ea.classList.add("removeFromCartButton", "defont");
            ea.setAttribute("data-removeitem", itemsInCart[i]);
            ea.onclick = function(event) {
                removeFromCart(event);
            }
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
}

function removeFromCart(event) {


    var a = localStorage.getItem("cart").split("-");
    var b = a.filter((i) => !(i === event.srcElement.dataset.removeitem))
    var c = b.join("-");
    localStorage.setItem("cart", c);
    if (localStorage.getItem("cart").length < 8) {
        localStorage.setItem("cart", null)
        document.getElementById("orderButton").classList.add("hide");
        if (!(localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null")) {
            document.getElementById("orderButton").classList.remove("hide");
        }
    }
    addItemsToCartMenu();

}

function orderButtonClicked() {
    document.getElementById("orderDOrderButton").innerHTML = ("Next");
    document.getElementById("stop").classList.remove("hide");
    document.getElementById("orderButton").classList.add("hide");
    document.getElementById("orderDeatails").classList.remove("hide");

    document.getElementById("ODIA").classList.add("hide");
    document.getElementById("ODIB").classList.add("hide");
    document.getElementById("ODIC").classList.add("hide");
    document.getElementById("ODID").classList.add("hide");

    document.getElementById("ODIB").classList.remove("hide");
    orderDisplay = 1;
    writeInvoice();

    document.getElementById("orderDName").value = ("");
    document.getElementById("orderDEmail").value = ("");
    document.getElementById("orderDALA").value = ("");
    document.getElementById("orderDName").value = ("");
    document.getElementById("orderDPostCode").value = ("");
    document.getElementById("OrderDSelectState").value = ("NSW");


    // hideOrShowDetails();
}

function closeOrderDetails() {
    document.getElementById("stop").classList.add("hide");
    if (!(localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null")) {
        document.getElementById("orderButton").classList.remove("hide");
    }
    document.getElementById("orderDeatails").classList.add("hide");
}

function finishOrderButtonClicked() {

    var YN = "N";
    console.log("d")




    if (orderDisplay === 1) {
        YN = "Y";
        console.log("e")
        document.getElementById("ODIA").classList.remove("hide");
        document.getElementById("ODIB").classList.add("hide");
    }

    if (orderDisplay === 2) {
        console.log("c");
        name = document.getElementById("orderDName").value;
        email = document.getElementById("orderDEmail").value;
        PC = document.getElementById("orderDPostCode").value;
        AL = document.getElementById("orderDALA").value;
        state = document.getElementById("OrderDSelectState").value;
        if (name !== "" && email !== "" && PC !== "" && AL !== "" && state !== "") {
            YN = "Y";
            console.log("a");
            document.getElementById("ODIC").classList.remove("hide");
            document.getElementById("ODIA").classList.add("hide");
        }
        else {
            console.log("b");
            alert("You need to finish filling out your deatails");
        }
    }

    if (orderDisplay === 3) {
        YN = "Y";
        document.getElementById("ODID").classList.remove("hide");
        document.getElementById("ODIC").classList.add("hide");
        document.getElementById("orderDOrderButton").innerHTML = ("Order");
    }

    if (orderDisplay === 4) {
        document.getElementById("ODID").classList.add("hide");
        YN = "Y";
        addOrderToDatabase();
        closeOrderDetails();
    }

    if (YN === "Y") {
        orderDisplay++;
    }


}

function emptyCart() {
    localStorage.setItem("cart", null);
    addItemsToCartMenu();
}

function hideOrShowDetails() {
    if (document.getElementById("POorPI").value === "1") {
        document.getElementById("orderDeatailsA").classList.remove("hide");
        document.getElementById("orderDeatailsB").classList.add("hide");
    }
    else {
        document.getElementById("orderDeatailsA").classList.add("hide");
        document.getElementById("orderDeatailsB").classList.remove("hide");
    }
}

function addOrderToDatabase() {
    var listOfItems = localStorage.getItem("cart").split("-");
    var mapOfItems = {};
    console.log(listOfItems)

    listOfItems.forEach(function(item, i) {
        mapOfItems[i.toString()] = item;
    });
    console.log(state);
    database.ref("userOrders").set(null);
    database.ref("userOrders").set({
        "orderData": {
            "data": {
                "items": mapOfItems,

                "details": {
                    "name": name,
                    "email": email,
                    "postCode": PC,
                    "addressLine": AL,
                    "state": state
                },
                "packed": false,
                "sent": false,
                "payed": false
            }
        }
    });

    setTimeout(function() {
        database.ref("userOrders").set(null);
    }, 3000);

    emptyCart();


    // console.log(database.ref("lastOrderId").val())



}

function writeInvoice() {

    document.getElementById("orderDeatailsIA").innerHTML = "";

    var TP = 0;

    var eb = document.createElement("div");
    eb.setAttribute("id", "orderDeatailsIAI");


    var itemsInCart = localStorage.getItem("cart").split("-");
    for (var i = 0; i < itemsInCart.length; i++) {
        var e = document.createElement("span");
        //     itemDetails = {
        // items: {
        //     aaaa: {
        //         img1: "IMG_0239.JPG",
        var ih = "Name: " + itemDetails.items[itemsInCart[i].substring(0, 4)].name + " | Quantity: " + itemsInCart[i].charAt(4) + " | Price: $" + (itemDetails.items[itemsInCart[i].substring(0, 4)].price * itemsInCart[i].charAt(4)).toFixed(2);
        TP = TP + itemDetails.items[itemsInCart[i].substring(0, 4)].price * itemsInCart[i].charAt(4);
        console.log(ih);

        e.classList.add("II", "defont");


        e.innerHTML = ih;

        eb.appendChild(e);
    }

    var ea = document.createElement("span");
    ea.innerHTML = "Totle: $" + TP.toFixed(2);
    ea.setAttribute("id", "TP");
    ea.classList.add("defont");

    document.getElementById("orderDeatailsIA").appendChild(ea);
    document.getElementById("orderDeatailsIA").appendChild(eb);

}


setInterval(function() {
    if (open === "Y") {
        var valueOfQ = document.getElementById("orderQwantity").value;
        var valueOfQAnswer = valueOfQ === "1" || valueOfQ === "2" || valueOfQ === "3" || valueOfQ === "4" || valueOfQ === "5" || valueOfQ === "6" || valueOfQ === "7" || valueOfQ === "8" || valueOfQ === "9";
        if (valueOfQAnswer) {
            console.log("l");
            document.getElementById("orderPriceTotle").innerHTML = "Totle Price: $" + (itemDetails.items[itemId].price * document.getElementById("orderQwantity").value).toFixed(2);
        }
        else {
            document.getElementById("orderPriceTotle").innerHTML = "Totle Price: $" + itemDetails.items[itemId].price.toFixed(2);
        }

    }
}, 1000);
