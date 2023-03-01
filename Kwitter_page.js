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
var nome_sala = localStorage.getItem("room");

function addMessage(){
    var mensagem = document.getElementById("mensagem").value;
    firebase.database().ref(nome_sala).push({
        name:nome_usuario,
        message:mensagem,
        like:0
    });
    document.getElementById("mensagem").value="";
}

function getData() {firebase.database().ref("/"+nome_sala).on('value',
    function(snapshot) {document.getElementById("output").innerHTML ="";
        snapshot.forEach(function(childSnapshot) {
            childKey =childSnapshot.key;
            var childData=childSnapshot.val();
            if(childKey!="purpose"){
                var id_da_mensagem=childKey;
                var dados_da_mensagem=childData;
                var nome=dados_da_mensagem["name"];
                var mensagem=dados_da_mensagem["message"];
                var like=dados_da_mensagem["like"];
            }
            var name_tag="<h4>"+nome+"</h4>";
            var mensagem_tag="<h4>"+mensagem+"</h4>";
            var btn_like = "<button class='btn btn-primary' id="+id_da_mensagem+" value="+like+" onclick='atualiza_like(this.id)'>";
            var span = "<span>like: "+like+"</span></button><hr>";
            var caixa = name_tag+mensagem_tag+btn_like+span;
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
function atualiza_like(id_da_mensagem){
    console.log("clicado btn likr- "+id_da_mensagem);
    var btn = id_da_mensagem;
    var like = document.getElementById(btn).value;
    var conta_like = Number(like)+1;
    console.log("numero de likes é :"+conta_like);
    firebase.database().ref(nome_sala).child(id_da_mensagem).update({
      like:conta_like
    });
  }