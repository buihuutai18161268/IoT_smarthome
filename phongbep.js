//Den 01
// var btnOn = document.getElementById("btnOnId_01");
// var btnOff = document.getElementById("btnOffId_01");

// btnOn.onclick = function(){
//     document.getElementById("denId_01").src = "./img/chuong_on.jpg"
//     // WED -> FIREBASE
//     firebase.database().ref("PHONGBEP/").update({
//             CANHBAO: "ON"})
// }

// btnOff.onclick = function(){
//   document.getElementById("denId_01").src = "./img/chuong_off.jpg" 
//   // WED -> FIREBASE
//   firebase.database().ref("PHONGBEP/").update({
//             CANHBAO: "OFF"})
// }


// Tủ lạnh
var tulanhOn = document.getElementById("tulanh_on");
var tulanhOff = document.getElementById("tulanh_off");

tulanhOn.onclick = function(){
  document.getElementById("tulanhId_01").src = "./img/tulanh_on.jpg"
  // WED -> FIREBASE
  firebase.database().ref("PHONGBEP/").update({
        TULANH : "ON" })
}

tulanhOff.onclick = function(){
  document.getElementById("tulanhId_01").src = "./img/tulanh_off.jpg"
  // WED -> FIREBASE
  firebase.database().ref("PHONGBEP/").update({
        TULANH : "OFF" })
}

// Bếp Từ
var beptuOn = document.getElementById("beptu_on");
var beptuOff = document.getElementById("beptu_off");

beptuOn.onclick = function(){
  document.getElementById("beptuId_01").src = "./img/beptu_on.jpg"
  // WED -> FIREBASE
  firebase.database().ref("PHONGBEP/").update({
        BEPTU : "ON" })
}

beptuOff.onclick = function(){
  document.getElementById("beptuId_01").src = "./img/beptu_off.jpg"
  // WED -> FIREBASE
  firebase.database().ref("PHONGBEP/").update({
        BEPTU : "OFF" })
}

///Slider Tron -----------------------------------
// KHÍ GAS
function initial_sliderTron_01(data){
    $("#sliderTronId_01").roundSlider({
      sliderType: "min-range",
      width: 22,
      radius: 100,
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
  
  initial_sliderTron_01(50); //Start first time
  
  
  // WED -> FIREBASE
  var sliderTron_01 = document.getElementById("sliderTronId_01");
  sliderTron_01.addEventListener("mousemove", function(){
    var obj = $("#sliderTronId_01").data("roundSlider");
    var slider1 = obj.getValue();
    firebase.database().ref("PHONGBEP/").update({
      KHIGAS: slider1
    })
  })

// slider ngang
// Giá trị ngưỡng khí gas

var sliderNgang = document.getElementById("sliderNgangId");

sliderNgang.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
  // WED -> FIREBASE
  var slider2 = sliderNgang.value;
  firebase.database().ref("PHONGBEP/").update({
      "p-KHIGAS" : slider2
  })
})

// FIREBASE -> WED

// Tủ lạnh
firebase.database().ref("PHONGBEP/TULANH").on("value",function(snapshot){
  var tulanh = snapshot.val();
  if(tulanh === "ON"){
    document.getElementById("tulanhId_01").src = "./img/tulanh_on.jpg"
  }
  else if(tulanh === "OFF"){
    document.getElementById("tulanhId_01").src = "./img/tulanh_off.jpg"
  }
});

// Bếp từ
firebase.database().ref("PHONGBEP/BEPTU").on("value",function(snapshot){
  var beptu = snapshot.val();
  if(beptu === "ON"){
    document.getElementById("beptuId_01").src = "./img/beptu_on.jpg"
  }
  else if(beptu === "OFF"){
    document.getElementById("beptuId_01").src = "./img/beptu_off.jpg"
  }
});

// Cảnh báo
// firebase.database().ref("PHONGBEP/CANHBAO/").on("value",function(snapshot){
//   var den = snapshot.val();
//   if(den === "ON"){
//     document.getElementById("denId_01").src = "./img/chuong_on.jpg"
//   }
//   else if(den === "OFF"){
//     document.getElementById("denId_01").src = "./img/chuong_off.jpg"
//   }
// });

// sliderNgang......
//ngưỡng khí gas
firebase.database().ref("PHONGBEP/p-KHIGAS/").on("value",function(snapshot){
  var slider = snapshot.val();
  document.getElementById("sliderNgangId").value = slider;
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
});

//sliderTron.......
// khí gas
firebase.database().ref("PHONGBEP/KHIGAS/").on("value",function(snapshot){
  initial_sliderTron_01(snapshot.val());
})

// đồng hồ thực
var current = new Date();

var getCurrentDateTime = setInterval(abc, 1000);

function abc() {
	current = new Date();
    document.getElementById("datetime").textContent = current;       
}

var sliderNgang = document.getElementById("sliderNgangId");

// điều chỉnh cấp độ đèn
var y =0;
var sliderNgang1 = document.getElementById("sliderNgangId1");
sliderNgang1.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value; 
  var slider = sliderNgang1.value;
  firebase.database().ref("PHONGBEP/").update({
    "CANHBAO" : slider
    })
  //chinh do sang 100 * 0.01
  var x = document.getElementById("myDIV");
  y= (sliderNgang1.value) * 0.1;
  if (y < 1) {
    x.style.opacity = y;
  } else {
    x.style.opacity = 1;
  }
})

// firebase -> web cảnh báo
firebase.database().ref("PHONGBEP/CANHBAO/").on("value",function(snapshot){
  var slider = snapshot.val();
  document.getElementById("sliderNgangId1").value = slider;
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value;
   //chinh do sang 100 * 0.01
   var x = document.getElementById("myDIV");
  y= (sliderNgang1.value) * 0.01;
  if (y < 1) {
    x.style.opacity = y;
  } else {
    x.style.opacity = 1;
  }
});