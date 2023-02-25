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
var nome_sala = localStorage.getItem("room")
document.getElementById("user_name").innerHTML="Benvindo(a) " + nome_usuario;

function addMessage(){
    var mensagem = document.getElementById("mensagem").value;
    firebase.database().ref(nome_sala).push({
        name:nome_usuario,
        message:mensagem,
        like:0
    });
    document.getElementById("mensagem").value="";
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

function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("room");
    window.location="index.html";
}