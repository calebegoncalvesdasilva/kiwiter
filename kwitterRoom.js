const firebaseConfig = {
  apiKey: "AIzaSyBFKT6tbyjsido1F-t1kMhaYNnyDmsOThw",
  authDomain: "kiwitter-34136.firebaseapp.com",
  databaseURL: "https://kiwitter-34136-default-rtdb.firebaseio.com/",
  projectId: "kiwitter-34136",
  storageBucket: "kiwitter-34136.appspot.com",
  messagingSenderId: "430846242640",
  appId: "1:430846242640:web:dc38b56a0c567ddd4ec655",
};

firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML =
  "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala",
  });

  localStorage.setItem("roomName", roomName);

  window.location = "kwitterPage.html";
}

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        roomNames = childKey;
        console.log("Nome da Sala - " + roomNames);
        row =
          "<div class='roomName' id=" +
          roomNames +
          " onclick='redirectToRoomName(this.id)' >" +
          roomNames +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "kwitterPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
