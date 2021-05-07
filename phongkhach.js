//tivi
var tiviOn = document.getElementById("tiviOnId_01");
var tiviOff = document.getElementById("tiviOffId_01");

tiviOn.onclick = function(){
    document.getElementById("tiviId_01").src = "./img/tivi_on.jpg"
    // WED -> FIREBASE
    firebase.database().ref("PHONGKHACH/").update({
            TIVI: "ON"})
}

tiviOff.onclick = function(){
    document.getElementById("tiviId_01").src = "./img/tivi_off.jpg" 
    // WED -> FIREBASE
    firebase.database().ref("PHONGKHACH/").update({
              TIVI: "OFF"})
  }

  //Den 01
function hengiosang(){
  document.getElementById("denId_01").src = "./img/bulbon.jpg"
  firebase.database().ref("PHONGKHACH/").update({
    DEN : "ON"})

}

function hengiotat(){
document.getElementById("denId_01").src = "./img/bulboff.jpg"
firebase.database().ref("PHONGKHACH/").update({
  DEN: "OFF"})
}

// máy lạnh
var maylanhOn = document.getElementById("maylanhOnId_01");
var maylanhOff = document.getElementById("maylanhOffId_01");

maylanhOn.onclick = function(){
    document.getElementById("maylanhId_01").src = "./img/air_on.png"
    // WED -> FIREBASE
    firebase.database().ref("PHONGKHACH/").update({
            MAYLANH: "ON"})
}

maylanhOff.onclick = function(){
    document.getElementById("maylanhId_01").src = "./img/air_off.png"
    // WED -> FIREBASE
    firebase.database().ref("PHONGKHACH/").update({
            MAYLANH: "OFF"})
}

// firebase -> web
// TIVI
firebase.database().ref("PHONGKHACH/TIVI").on("value",function(snapshot){
    var tivi = snapshot.val();
    if(tivi === "ON"){
      document.getElementById("tiviId_01").src = "./img/tivi_on.jpg"
    }
    else if(tivi === "OFF"){
      document.getElementById("tiviId_01").src = "./img/tivi_off.jpg"
    }
});

// ĐÈN
firebase.database().ref("PHONGKHACH/DEN").on("value",function(snapshot){
    var den = snapshot.val();
    if(den === "ON"){
      document.getElementById("denId_01").src = "./img/bulbon.jpg"
    }
    else if(den === "OFF"){
      document.getElementById("denId_01").src = "./img/bulboff.jpg"
    }
});

// cửa
function send(){
    // firebase -> web
    firebase.database().ref("PHONGKHACH/MATKHAU").on("value",function(snapshot){
      var pw = snapshot.val();
      var mk = document.getElementById("password").value;
      // web -> firebase
      firebase.database().ref("PHONGKHACH/").update({
          DANGNHAP: mk})
      var choice =  confirm('MẬT KHẨU BẠN NHẬP LÀ:\n'+mk);
      if(mk == pw )
      {
        confirm('MẬT KHẨU ĐÚNG\n'+'CỬA MỞ');
        var seconds= 10;
        var countdown = setInterval(function() {
          document.getElementById("countdown").textContent = seconds;    
          document.getElementById("progressBar").value = 10 - seconds;
          seconds--; 
          document.getElementById("cuaId_01").src = "./img/door_on.jpg";
          if (seconds < 0)
          {
            clearInterval(countdown);
            document.getElementById("cuaId_01").src = "./img/door_off.jpg";
          }
        }, 1000); 
      }
      else{
          confirm('MẬT KHẨU SAI VUI LÒNG NHẬP LẠI\n');
          document.getElementById("cuaId_01").src = "./img/door_off.jpg"
      }     
    });
}


// đồng hồ thực
var current = new Date();

var getCurrentDateTime = setInterval(abc, 1000);

function abc() {
	current = new Date();
    document.getElementById("datetime").textContent = current;       
}

// nút nhấn điều chỉnh nhiệt độ của máy lạnh
var x;
firebase.database().ref("PHONGKHACH/NHIETDO").on("value",function(snapshot){
  initial_sliderTron_01(snapshot.val());
})
var tam;
function initial_sliderTron_01(data){
  $("#sliderTronId_01").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 70,
    readOnly: false,
    value: data,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "red",
    change: function (args) {
      var obj = $("#sliderTronId_01").data("roundSlider");
      $('#sliderTronId_01').roundSlider('setValue', obj.getValue());
      document.getElementById("gas").innerHTML = obj.getValue();
    }
  });
};

// MÁY LẠNH
firebase.database().ref("PHONGKHACH/MAYLANH").on("value",function(snapshot){
  var maylanh = snapshot.val();
  tam = maylanh;
  if(maylanh === "ON"){
    document.getElementById("maylanhId_01").src = "./img/air_on.png"
  }
  else if(maylanh === "OFF"){
    document.getElementById("maylanhId_01").src = "./img/air_off.png"
  }
});

var btn_up = document.getElementById("btn_up");
var btn_down = document.getElementById("btn_down");
btn_up.onclick = function(){
  if(tam=="ON") x +=1;
  $('#sliderTronId_01').roundSlider('setValue', x);
  firebase.database().ref("PHONGKHACH/").update({
    "button": "UP",
    "NHIETDO": x })
}
btn_down.onclick = function(){
  if(tam=="ON") x -= 1;
  firebase.database().ref("PHONGKHACH/").update({
    "button": "DOWN",
    "NHIETDO": x })
  $('#sliderTronId_01').roundSlider('setValue', x);
}

//sliderTron.......//firebase -> web
// nhiệt độ máy lạnh
firebase.database().ref("PHONGKHACH/NHIETDO").on("value",function(snapshot){
  x=snapshot.val();
})

initial_sliderTron_01(x); //Start first time

