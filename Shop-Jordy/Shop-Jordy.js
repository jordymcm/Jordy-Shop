// Initialize Firebase
var listOfItems;
// var states = ["NSW","WA", "QLD", "SA", "VIC", "TAS"]

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

firebase.auth().signInAnonymously().catch(function(error) {
    console.error(error);
});

firebase.auth().onAuthStateChanged(function(user) {
    console.log("change")
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(user.uid);
        // ...
    }
    else {
        // User is signed out.
        console.log("test");
        // ...
    }
});
firebase.auth().signInAnonymously().catch(function(error) {
    console.error(error);
});

firebase.auth().onAuthStateChanged(function(user) {
    console.log("change")
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(user);
        // ...
    }
    else {
        // User is signed out.
        console.log("test");
        // ...
    }
});

function submitPassword() {
    let pass = document.getElementById("password").value;
    let mail = "jordan@mcmaster.id.au";

    document.getElementById("aroundPass").classList.add("hide");
    document.getElementById("aroundList").classList.remove("hide");

    // firebase.auth().signInWithEmailAndPassword(mail, pass).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.error("auth", errorCode, errorMessage);
    //     // ...
    //     document.getElementById("aroundPass").classList.remove("hide");
    //     document.getElementById("aroundList").classList.add("hide");
    //     document.getElementById("password").value = "";
    // });





}


function databaseRead() {
    console.log("databaseRead called")
    database.ref("orders").on('value', function(snapshot) {
        console.log(snapshot.val())
        listOfItems = snapshot.val();
    });
    // , function(error) {
    //     console.error("error:", error);
    // }
}
window.onload = function() {
    databaseRead();
    setTimeout(function() {
        displayItems();
    }, 2000);

};

function displayItems() {
    console.log(listOfItems)
    Object.keys(listOfItems).forEach(function(key) {
        console.log(listOfItems[key]);
        console.log(" |")
        listOfItems[key].data.items
        console.log(listOfItems[key].data.items);
        createTableItem(key)
    });
}

function createTableItem(key) {
    var e;
    var ea;
    e = document.createElement("tr");





    for (var i = 0; i < 7; i++) {
        ea = document.createElement("td");

        var ih = "";

        if (i === 0) {
            ih = listOfItems[key].data.details.name;
        }

        if (i === 1) {
            ih = listOfItems[key].data.details.email;
        }

        if (i === 2) {
            ih = listOfItems[key].data.details.addressLine;
        }

        if (i === 3) {
            ih = listOfItems[key].data.details.postCode;
        }

        if (i === 4) {
            ih = listOfItems[key].data.details.state;
        }

        if (i === 5) {

            var l = [];

            Object.keys(listOfItems[key].data.items).forEach(function(keyn) {
                l.push(listOfItems[key].data.items[keyn]);
            });
            ih = l.join(" ");

            // alert(ih)

            // ih = listOfItems[key].data.details.email;
        }

        if (i === 6) {

            for (var ia = 0; ia < 3; ia++) {
                var cbt;

                if (ia === 0) {
                    cbt = "payed";
                }

                if (ia === 1) {
                    cbt = "packed";
                }

                if (ia === 2) {
                    cbt = "sent";
                }

                var eb = document.createElement("input");

                eb.setAttribute("type", "checkbox");
                eb.setAttribute("data-checkbox", key);
                eb.setAttribute("data-checkboxt", cbt);
                console.log("testing")
                console.log(cbt)
                eb.checked = listOfItems[key].data[cbt];
                eb.onclick = function(event) {
                    console.log(event)
                    checkbox(event);
                }
                ea.appendChild(eb);
            }
        }




        console.log(ih);
        if (ih !== "") {
            ea.innerHTML = ih;
        }
        e.appendChild(ea);
    }

    document.getElementById("items").appendChild(e);



}

function checkbox(event) {
    // console.log(event.srcElement.dataset.checkbox);
    var orderId = event.srcElement.dataset.checkbox;
    var cbtd = event.srcElement.dataset.checkboxt;
    console.log(orderId);
    console.log(cbtd);
    // console.log(database.ref([orderId].data[cbtd]));
    // database.ref(orderId.data[cbtd]).set(true)
    
    database.ref("orders/" + orderId + "/data/" + cbtd).set(event.srcElement.checked);
}
