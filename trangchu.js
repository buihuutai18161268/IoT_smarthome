// firebase -> wed
// phòng ngủ
firebase.database().ref("PHONGNGU/NHIETDO/").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienthinhietdo").innerHTML = t;

    console.log(t);
});

firebase.database().ref("PHONGNGU/QUAT/").on("value",function(snapshot){
    var quat = snapshot.val();
    document.getElementById("hienthiquat").innerHTML = quat;

    console.log(quat);
});

firebase.database().ref("PHONGNGU/CANHBAO/").on("value",function(snapshot){
    var canhbao = snapshot.val();
    document.getElementById("hienthicanhbao").innerHTML = canhbao;

    console.log(canhbao);
});

firebase.database().ref("PHONGNGU/DOAM/").on("value",function(snapshot){
    var doam = snapshot.val();
    document.getElementById("hienthidoam").innerHTML = doam;

    console.log(doam);
});

// phòng bếp
firebase.database().ref("PHONGBEP/BEPTU/").on("value",function(snapshot){
    var beptu = snapshot.val();
    document.getElementById("hienthibeptu").innerHTML = beptu;

    console.log(beptu);
});

firebase.database().ref("PHONGBEP/CANHBAO/").on("value",function(snapshot){
    var canhbao1 = snapshot.val();
    document.getElementById("hienthicanhbao1").innerHTML = canhbao1;

    console.log(canhbao1);
});

firebase.database().ref("PHONGBEP/TULANH/").on("value",function(snapshot){
    var tulanh = snapshot.val();
    document.getElementById("hienthitulanh").innerHTML = tulanh;

    console.log(tulanh);
});

firebase.database().ref("PHONGBEP/KHIGAS/").on("value",function(snapshot){
    var khigas = snapshot.val();
    document.getElementById("hienthikhigas").innerHTML = khigas;

    console.log(khigas);
});

// phòng khách
firebase.database().ref("PHONGKHACH/TIVI/").on("value",function(snapshot){
    var tivi = snapshot.val();
    document.getElementById("hienthitivi").innerHTML = tivi;

    console.log(tivi);
});

firebase.database().ref("PHONGKHACH/MAYLANH/").on("value",function(snapshot){
    var maylanh = snapshot.val();
    document.getElementById("hienthimaylanh").innerHTML = maylanh;

    console.log(maylanh);
});

firebase.database().ref("PHONGKHACH/DEN/").on("value",function(snapshot){
    var den = snapshot.val();
    document.getElementById("hienthiden").innerHTML = den;

    console.log(den);
});

firebase.database().ref("PHONGKHACH/MATKHAU/").on("value",function(snapshot){
    var cuaravao = snapshot.val();
    document.getElementById("hienthicuaravao").innerHTML = cuaravao;

    console.log(cuaravao);
});

// đồng hồ thực
var current = new Date();

var getCurrentDateTime = setInterval(abc, 1000);

function abc() {
	current = new Date();
    document.getElementById("datetime").textContent = current;       
}

// đồng hồ thực rõ 
// var target_date = new Date().getTime() + (1000*3600*24); // set the countdown date
var days, hours, minutes, seconds; // variables for time units
    
getCountdown();

setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

    // find the amount of "seconds" between now and target
    // var current_date = new Date().getTime();
    // var seconds_left = (target_date - current_date) / 1000;

    // days = pad( parseInt(seconds_left / 86400) );
    // seconds_left = seconds_left % 86400;
         
    // hours = pad( parseInt(seconds_left / 3600) );
    // seconds_left = seconds_left % 3600;
          
    // minutes = pad( parseInt(seconds_left / 60) );
    // seconds = pad( parseInt( seconds_left % 60 ) );

    // var hours = document.getElementById("hour").value;
    // var minutes = document.getElementById("minute").value;
    // var seconds = document.getElementById("second").value;
    // format countdown string + set tag value
    var hours = new Date().getHours()
    var minutes = new Date().getMinutes()
    var seconds = new Date().getSeconds()
    var countdown = document.getElementById("tiles"); // get tag element

    firebase.database().ref("Times/").update({
        Hours: hours }) 
    firebase.database().ref("Times/").update({
        Minutes: minutes }) 
    firebase.database().ref("Times/").update({
        Seconds: seconds }) 
    
    countdown.innerHTML =  "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}



