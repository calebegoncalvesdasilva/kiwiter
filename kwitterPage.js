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
roomName = localStorage.getItem("roomName");

function send() {
  msg = document.getElementById("msg").value;

  firebase.database().ref("/").child(roomName).push({
    name: userName,
    message: msg,
    like: 0,
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase
    .database()
    .ref("/" + roomName)
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          name = message_data["name"];
          message = message_data["message"];
          like = message_data["like"];
          name_tag =
            "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
          message_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button =
            "<button class='btn btn-warning' id=" +
            firebase_message_id +
            " value=" +
            like +
            " onclick='updateLike(this.id)'>";
          span_tag =
            "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: " +
            like +
            "</span></button><hr>";
          row = name_tag + message_tag + like_button + span_tag;
          document.getElementById("output").innerHTML += row;
        }
      });
    });
}

getData();

function updateLike(message_id) {
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updated_Likes=Number(likes)+1;
 firebase.database().ref(roomName).child(message_id).update({
  like:updated_Likes
 })
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location.replace("index.html"); 
}
