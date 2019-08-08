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

var firestore = firebase.firestore();
var docRef;

var buttons = document.getElementsByClassName("button");
var room = document.getElementById("room");
var input;
var result = '';

document.getElementById("host").addEventListener("click", function () {
    result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    firestore.collection("Game").doc(result).set({
        Table: ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
    }).then(function () {
        console.log("Status saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
    docRef = firestore.collection("Game").doc(result);
    alert(result);
    input = "X";
    getRealtimeUpdates();
});

document.getElementById("join").addEventListener("click", function () {
    docRef = firestore.collection("Game").doc(document.getElementById("room").value);
    input = "O";
    getRealtimeUpdates();
});

for (var i = 0; i < buttons.length; i++) {
    AddListener(buttons[i]);
}

function AddListener(button) {
    button.addEventListener("click", function () {
        button.innerHTML = input;
        updateDatabase();
    })
}

function updateDatabase() {
    let data = [];
    for (var i = 0; i < buttons.length; i++) {
        data.push(buttons[i].innerHTML);
    }
    docRef.set({
        Table: data
    }).then(function () {
        console.log("Status saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}

getRealtimeUpdates = function () {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].innerHTML = myData.Table[i];
            }
        } else {
            alert("Opponent has left the game :P");
        }
    });
}

function deleteGame() {
    docRef.delete().then(function () {
        alert("Game endded");
    }).catch(function (error) {
        alert("Game endded with error");
    })
}

window.onbeforeunload = deleteGame;