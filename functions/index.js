var functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


// var valuesOfIds = {};
var TP;



// var starCountRef = admin.database().ref("itemDetails");
// admin.database().ref("itemDetails").on('value', function(snapshot) {
//     SID(snapshot.val());

// });


// function SID(data) {
//     itemDetails = data;
// }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     var functions = require('firebase-functions');

//     functions.database.ref('/');
//     response.send("Hello from Firebase!");


// });



// exports.testing = functions.https.onRequest((request, response) => {


//     return admin.database().ref("test/aaa").once('value', (snapshot) => {
//         var value = snapshot.val();
//         response.send("test: " + value);
//     });

// });

// exports.copyTEst = functions.database.ref("test/{key}")
//     .onCreate((changedField, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         //const original = changedField.val();
//         console.log('Uppercasing', context.params.key, changedField.val());
//         // const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         // return snapshot.ref.parent.child('uppercase').set(uppercase);
//         return functions.database.ref("testa/" + context.params.key).set(changedField.val());
//     });

// exports.copyTEst = functions.database.ref("test/{key}")
//     .onCreate((changedField, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         //const original = changedField.val();
//         console.log('Uppercasing', context.params.key, changedField.val());
//         // const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         // return snapshot.ref.parent.child('uppercase').set(uppercase);
//         return admin.database().ref("testa/" + context.params.key).set(changedField.val());
//         // .database().ref("/users/"+id+"/info/status").set("ok")
//     });

exports.copyOrder = functions.database.ref("userOrders/{key}")
    .onCreate((changedField, context) => {
        
        
        console.log("hello!");




        var starCountRef = admin.database().ref("itemDetails");
        admin.database().ref("itemDetails").on('value', (snapshot) => {
            console.log("retreive itemDetails");
            var d = new Date();
            var order = changedField.val();
            var td = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
            var itemDetails = snapshot.val();

            console.log("order: ", order);
            console.log("itemDetails:", itemDetails);
            
            var PQ = calculatePostage(order.data.items, itemDetails);

            console.log("PQ ^");
            console.log(PQ);



            // var NCF = changedField.val();
            order.data['postage'] = PQ;
            console.log("final order ^");
            console.log(order);
            // calculateTotalPrice(order.data.items);
            // NCF.data['totalPrice'] = TP;

            console.log('Adding order: td=', td);
            
            admin.database().ref("orders/" + td).set(order);

        });

    });


// function calculateTotalPrice(CFItems) {
//     CFItems.forEach(function(key, i){
//         addToTotalPrice(2);
// itemDetails.items[CFItems[i].substring(0, 4)].price * parseFloat(CFItems[i].substring(4,5))
//     });
// }

// function addToTotalPrice(change) {
//     TP = TP + change;
// }

function calculatePostage(CFItems, itemDetails) {
    console.log(CFItems)

    var valuesOfIds = addToValuesOfIds(CFItems);



    var PQ = 0;
    Object.keys(valuesOfIds).forEach(function(key, i) {
        PQ = calculateItemPostage(itemDetails.items[key], PQ, valuesOfIds[key]);
    });

    return PQ;
}

function calculateItemPostage(itemInfo, PQ, valuesOfIdsItem) {

    // console.log("|||||")
    // console.log(valuesOfIds[key])
    // console.log(itemDetails.items[key].postQuantity)
    // console.log(valuesOfIds[key])
    if (itemInfo.postQuantity === 1) {
        PQ = PQ + valuesOfIdsItem * 2;
    }
    else {
        if (valuesOfIdsItem === 1 && itemInfo.postQuantity !== 1) {
            PQ = PQ + 1;
        }
        else {
            PQ = PQ + Math.ceil(valuesOfIdsItem / itemInfo.postQuantity) * 2;
        }
    }

    return PQ;
}

// parse and add data to data map, and add sum duplicates
function addToValuesOfIds(dataList) {

    var valuesOfIds = {};

    dataList.forEach(function(key, i) {
        var data = dataList[i];
        if (valuesOfIds[data.substring(0, 4)] === undefined) {
            valuesOfIds[data.substring(0, 4)] = parseFloat(data.substring(4, 5));
        }
        else {
            valuesOfIds[data.substring(0, 4)] = parseFloat(valuesOfIds[data.substring(0, 4)]) + parseFloat(data.substring(4, 5));
        }
    });

    return valuesOfIds;

}
