var e;
var ea;
var itemId;

var itemDetails = {
    items: {
        aaaa: {
            img1: "IMG_0239.JPG",
            img2: null,
            price: 2.99

        },

    }
}


window.onload = function() {
    for (var i = 0; i < 5; i++) {
        e = document.createElement("div");
        e.classList.add("item");
        e.classList.add("iTypeA");
        e.onclick = itemClicked, itemId = "aaaa";
        ea = document.createElement("div");
        ea.classList.add("itemPartA");
        ea.classList.add("iTypePartA");
        e.appendChild(ea);
        document.getElementById("mainMenuI").appendChild(e);
    }


    document.getElementById("order").classList.add("hide");



}

function cartAdd() {
    console.log(isNaN(document.getElementById("orderQwantity").value))
    if (isNaN(document.getElementById("orderQwantity").value) === false && document.getElementById("orderQwantity").value !== "" && document.getElementById("orderQwantity").value !== "0") {
        var orderData = itemId + document.getElementById("orderQwantity").value;
        //+ document.getElementById("POorPI").value;
        if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null") {
            localStorage.setItem("cart", orderData);
        }
        else {
            localStorage.setItem("cart", localStorage.getItem("cart") + "-" + orderData);
        }
    }
    else {
        alert("You need to enter a qwantity");
    }

}

function itemClicked() {
    hideAllPages()
    openOrderMenu();
}

function hideAllPages() {
    document.getElementById("order").classList.add("hide");
    document.getElementById("mainMenu").classList.add("hide");
}

function backToMainMenu() {
    hideAllPages();
    openMainMenu();
}

function openMainMenu() {
    document.getElementById("mainMenu").classList.remove("hide");
}

function openOrderMenu() {
    document.getElementById("imgHolder").removeChild(document.getElementById("imgHolder").firstChild);

    document.getElementById("order").classList.remove("hide");


    e = document.createElement("img");
    e.src = itemDetails.items[itemId].img1;
    // depends on heig and width
    e.classList.add("imgTypeA");
    ea = document.getElementById("imgHolder");
    //  do all times
    ea.classList.remove("ihA", "ihB");
    //  end
    ea.classList.add("ihA");



    // end   



    console.log(e);
    console.log("a");

    document.getElementById("imgHolder").appendChild(e);


}

function menuItem(selection) {
    console.log(selection);
}
