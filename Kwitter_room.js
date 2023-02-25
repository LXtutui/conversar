const firebaseConfig = {
    apiKey: "AIzaSyBUfBoeLrhBJkCZ0qH-Nst2GgtRw0eCCoY",
    authDomain: "vamoscoversar-6fe76.firebaseapp.com",
    databaseURL: "https://vamoscoversar-6fe76-default-rtdb.firebaseio.com",
    projectId: "vamoscoversar-6fe76",
    storageBucket: "vamoscoversar-6fe76.appspot.com",
    messagingSenderId: "641970599372",
    appId: "1:641970599372:web:0632a7ca2ed49796e45969"
  };
firebase.initializeApp(firebaseConfig);
var nome_usuario = localStorage.getItem("userName");

document.getElementById("user_name").innerHTML="Benvindo(a) " + nome_usuario;

function addRoom(){
    var nome_sala = document.getElementById("roomName").value;
    firebase.database().ref("/").child(nome_sala).update({
        purpose:"adicionando nome da sala"
    });
    localStorage.setItem("room",nome_sala);
    window.location="Kwitter_page.html";
}
function getData() {firebase.database().ref("/").on('value',
    function(snapshot) {document.getElementById("output").innerHTML ="";
        snapshot.forEach(function(childSnapshot) {childKey =childSnapshot.key;
        roomNames = childKey;
            var caixa = "<div class='roomName 'id="+roomNames+" onclick='redirectRoom(this.id)'> #"+roomNames+"</div><hr>";
            document.getElementById("output").innerHTML+=caixa;
        });
    });
}
getData();
function redirectRoom(nome_sala){
    localStorage.setItem("room",nome_sala);
    window.location="Kwitter_page.html";
}
function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("room");
    window.location="index.html";
}