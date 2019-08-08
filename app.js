var firebaseConfig = {
    apiKey: "AIzaSyAk0uwlPQpSacwZy7Adykq6wsvmN0pMVVk",
    authDomain: "webapptest-a55d8.firebaseapp.com",
    databaseURL: "https://webapptest-a55d8.firebaseio.com",
    projectId: "webapptest-a55d8",
    storageBucket: "",
    messagingSenderId: "256940377294",
    appId: "1:256940377294:web:cd3ef5fde8199de1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var buttons = document.querySelectorAll("button");
var input;

for (var i = 0; i < buttons.length; i++) {
    AddListener(buttons[i]);
}

function AddListener (button) {
    button.addEventListener("click", function() {
        button.innerHTML = input;
        updateDatabase();
    })
}

var firestore = firebase.firestore();

const docRef = firestore.collection("Game").doc("1");

function initializeUpdate() {
    let data = ["#", "#", "#",
                "#", "#", "#",
                "#", "#", "#"];
    docRef.set({
        Table: data
    }).then(function() {
        console.log("Status saved!");
    }).catch(function(error) {
        console.log("Got an error: ", error);
    });
}

function updateDatabase() {
    let data = [];
    for (var i = 0; i < buttons.length; i++) {
        data.push(buttons[i].innerHTML);
    }
    docRef.set({
        Table: data
    }).then(function() {
        console.log("Status saved!");
    }).catch(function(error) {
        console.log("Got an error: ", error);
    });
}

getRealtimeUpdates = function() {
    docRef.onSnapshot(function(doc) {
         if (doc && doc.exists) {
             const myData = doc.data();
             for (var i = 0; i < buttons.length; i++) {
                buttons[i].innerHTML = myData.Table[i];
            }
         }
    });
}

document.getElementById("input").addEventListener("change", function() {
    input = document.getElementById("input").value;
})

initializeUpdate();
getRealtimeUpdates();