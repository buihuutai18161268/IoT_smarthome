//Den 01
var btnOn = document.getElementById("btnOnId_01");
var btnOff = document.getElementById("btnOffId_01");

btnOn.onclick = function(){
    document.getElementById("denId_01").src = "./img/light_bulb.png"
    // WED -> FIREBASE
    firebase.database().ref("PHONGNGU/").update({
            CANHBAO: "ON"})
}

btnOff.onclick = function(){
  document.getElementById("denId_01").src = "./img/light_bulb_off.png" 
  // WED -> FIREBASE
  firebase.database().ref("PHONGNGU/").update({
            CANHBAO: "OFF"})
}

//Quat 01
var quatOn = document.getElementById("batquat");
var quatOff = document.getElementById("tatquat");

quatOn.onclick = function(){
    document.getElementById("quatId_01").src = "./img/fan_on.gif"
    // WED -> FIREBASE
    firebase.database().ref("PHONGNGU/").update({
            QUAT: "ON"})

}

quatOff.onclick = function(){
  document.getElementById("quatId_01").src = "./img/quat_off.jpg"
  // WED -> FIREBASE
  firebase.database().ref("PHONGNGU/").update({
            QUAT: "OFF"})

}

//SliderNgang...............
// nhiệt độ
var sliderNgang = document.getElementById("sliderNgangId");

sliderNgang.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
  // WED -> FIREBASE
  var slider = sliderNgang.value;
  firebase.database().ref("PHONGNGU/").update({
    "p-NHIETDO": slider
    })
})

// độ ẩm
var sliderNgang1 = document.getElementById("sliderNgangId1");

sliderNgang1.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value;
  // WED -> FIREBASE
  var slider1 = sliderNgang1.value;
  firebase.database().ref("PHONGNGU/").update({
    "p-DOAM": slider1
  })
})

//Slider Tron 01-----------------------------------
// NHIỆT ĐỘ
function initial_sliderTron_01(data1){
  $("#sliderTronId_01").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data1,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "red",
    change: function (args) {
      var obj = $("#sliderTronId_01").data("roundSlider");
      $('#sliderTronId_01').roundSlider('setValue', obj.getValue());
      document.getElementById("nd").innerHTML = obj.getValue();
    }
  });
};

initial_sliderTron_01(50); //Start first time


// WED -> FIREBASE
var sliderTron_01 = document.getElementById("sliderTronId_01");
sliderTron_01.addEventListener("mousemove", function(){
  var obj = $("#sliderTronId_01").data("roundSlider");
  var slider = obj.getValue();
  firebase.database().ref("PHONGNGU/").update({
    NHIETDO: slider
  })
})


//Slider Tron 02-----------------------------------
// Độ ẩm

function initial_sliderTron_02(data2){
  $("#sliderTronId_02").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data2,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "#2cc4d3"
  });
};

initial_sliderTron_02(30); //Start first time

// WED -> FIREBASE
var sliderTron_02 = document.getElementById("sliderTronId_02");
sliderTron_02.addEventListener("mousemove", function(){
  var obj1 = $("#sliderTronId_02").data("roundSlider");
  var slider1 = obj1.getValue();
  firebase.database().ref("PHONGNGU/").update({
    DOAM: slider1
  })
})

//................//
// FIREBASE->WED
// cảnh báo 
firebase.database().ref("PHONGNGU/CANHBAO/").on("value",function(snapshot){
  var canhbao = snapshot.val();
  if(canhbao === "ON"){
    document.getElementById("denId_01").src = "./img/light_bulb.png"
  }
  else if(canhbao === "OFF"){
    document.getElementById("denId_01").src = "./img/light_bulb_off.png"
  }
});

//quạt
firebase.database().ref("PHONGNGU/QUAT/").on("value",function(snapshot){
  var quat = snapshot.val();
  if(quat === "ON"){
    document.getElementById("quatId_01").src = "./img/fan_on.gif"
  }
  else if(quat === "OFF"){
    document.getElementById("quatId_01").src = "./img/quat_off.jpg"
  }
});

// RÈM
firebase.database().ref("PHONGNGU/REM/").on("value",function(snapshot){
  var rem = snapshot.val();
  if(rem === "ON"){
    document.getElementById("remId_01").src = "./img/rem_on.gif"
  }
  else if(rem === "OFF"){
    document.getElementById("remId_01").src = "./img/rem_off.jpg"
  }
});

// sliderNgang......
//ngưỡng nhiệt độ
firebase.database().ref("PHONGNGU/p-NHIETDO/").on("value",function(snapshot){
  var slider = snapshot.val();
  document.getElementById("sliderNgangId").value = slider;
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
})  ;

// Ngưỡng độ ẩm 
firebase.database().ref("PHONGNGU/p-DOAM/").on("value",function(snapshot){
  var slider1 = snapshot.val();
  document.getElementById("sliderNgangId1").value = slider1;
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value;
});

//sliderTron.......
// Nhiệt độ
firebase.database().ref("PHONGNGU/NHIETDO/").on("value",function(snapshot){
  initial_sliderTron_01(snapshot.val());
})

// Độ ẩm
firebase.database().ref("PHONGNGU/DOAM/").on("value",function(snapshot){
  initial_sliderTron_02(snapshot.val());
})


//........................//
// hiển thị giờ
var x = 0; // rèm cửa đóng hoặc mở
$step = 1;
$loops = Math.round(100 / $step);
$increment = 360 / $loops;
$half = Math.round($loops / 2);
$barColor = '#ec366b';
$backColor = '#feeff4';

$(function(){
  clock.init();
});
clock={
  interval:null,
  init:function(){
    $('.input-btn').click(function(){
      switch($(this).data('action')){
        case'start':
          clock.stop();
          clock.start($('.input-num').val());
        break;
        case'stop':
          clock.stop();
        break;
      }
    });
  },
  start:function(t){
    var pie = 0;
    var num = 0;
    var min = t?t:1;
    var sec = min*60;
    var lop = sec;
    $('.count').text(min);
    if(min>0){
      $('.count').addClass('min')
    }else{
      $('.count').addClass('sec')
    }
    clock.interval = setInterval(function(){
      sec = sec-1;
      if(min>1){
        pie = pie+(100/(lop/min));
      }else{
        pie = pie+(100/(lop));
      }
      if(pie>=101){ pie = 1; }
      num = (sec/60).toFixed(2).slice(0,-3);
      if(num==0){
        $('.count').removeClass('min').addClass('sec').text(sec);
      }else{
        $('.count').removeClass('sec').addClass('min').text(num);
      }
      //$('.clock').attr('class','clock pro-'+pie.toFixed(2).slice(0,-3));
      //console.log(pie+'__'+sec);
      $i = (pie.toFixed(2).slice(0,-3))-1;
      if($i < $half){
        $nextdeg = (90 + ( $increment * $i ))+'deg';
        $('.clock').css({'background-image':'linear-gradient(90deg,'+$backColor+' 50%,transparent 50%,transparent),linear-gradient('+$nextdeg+','+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
      }else{
        $nextdeg = (-90 + ( $increment * ( $i - $half ) ))+'deg';
        $('.clock').css({'background-image':'linear-gradient('+$nextdeg+','+$barColor+' 50%,transparent 50%,transparent),linear-gradient(270deg,'+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
      }
      // hiển thị sec lên firebase
      firebase.database().ref("PHONGNGU/").update({
          SEC: sec})
      if(sec==0){
        clearInterval(clock.interval);
        $('.count').text(0);
        //$('.clock').removeAttr('class','clock pro-100');
        $('.clock').removeAttr('style');
        // rèm cửa
        if(x==0)
        {
          document.getElementById("remId_01").src = "./img/rem_on.gif"
          // WED -> FIREBASE
          firebase.database().ref("PHONGNGU/").update({
            REM: "ON"})
        }
        else  if(x==1)
        {
          document.getElementById("remId_01").src = "./img/rem_off.jpg"
           // WED -> FIREBASE
          firebase.database().ref("PHONGNGU/").update({
          REM: "OFF"})
        }
        x = 1-x; // SET CHẾ ĐỘ ĐÓNG HAY MỞ
      }
    },1000);
  },
  stop:function(){
    clearInterval(clock.interval);
    $('.count').text(0);
    $('.clock').removeAttr('style');
  }
}

// switch
$(function() {
  $('#toggle-trigger').change(function() {      
    var state = $(this).prop('checked');

    if(state == true){
      $('#state').text('LIGHT:ON');
      document.getElementById("canhbaoId_01").src = "./img/light_bulb.png"
      // WED -> FIREBASE
      firebase.database().ref("PHONGNGU/").update({
      DEN: "ON"})
    }
    else{
      $('#state').text('LIGHT:OFF');
      document.getElementById("canhbaoId_01").src = "./img/light_bulb_off.png"
      // WED -> FIREBASE
      firebase.database().ref("PHONGNGU/").update({
        DEN: "OFF"})
    }
  })
})
+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.toggle"),f="object"==typeof b&&b;e||d.data("bs.toggle",e=new c(this,f)),"string"==typeof b&&e[b]&&e[b]()})}var c=function(b,c){this.$element=a(b),this.options=a.extend({},this.defaults(),c),this.render()};c.VERSION="2.2.0",c.DEFAULTS={on:"ON",off:"OFF",onstyle:"primary",offstyle:"default",size:"normal",style:"width:60%",width:null,height:null},c.prototype.defaults=function(){return{on:this.$element.attr("data-on")||c.DEFAULTS.on,off:this.$element.attr("data-off")||c.DEFAULTS.off,onstyle:this.$element.attr("data-onstyle")||c.DEFAULTS.onstyle,offstyle:this.$element.attr("data-offstyle")||c.DEFAULTS.offstyle,size:this.$element.attr("data-size")||c.DEFAULTS.size,style:this.$element.attr("data-style")||c.DEFAULTS.style,width:this.$element.attr("data-width")||c.DEFAULTS.width,height:this.$element.attr("data-height")||c.DEFAULTS.height}},c.prototype.render=function(){this._onstyle="btn-"+this.options.onstyle,this._offstyle="btn-"+this.options.offstyle;var b="large"===this.options.size?"btn-lg":"small"===this.options.size?"btn-sm":"mini"===this.options.size?"btn-xs":"",c=a('<label class="btn">').html(this.options.on).addClass(this._onstyle+" "+b),d=a('<label class="btn">').html(this.options.off).addClass(this._offstyle+" "+b+" active"),e=a('<span class="toggle-handle btn btn-default">').addClass(b),f=a('<div class="toggle-group">').append(c,d,e),g=a('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop("checked")?this._onstyle:this._offstyle+" off").addClass(b).addClass(this.options.style);this.$element.wrap(g),a.extend(this,{$toggle:this.$element.parent(),$toggleOn:c,$toggleOff:d,$toggleGroup:f}),this.$toggle.append(f);var h=this.options.width||Math.max(c.outerWidth(),d.outerWidth())+e.outerWidth()/2,i=this.options.height||Math.max(c.outerHeight(),d.outerHeight());c.addClass("toggle-on"),d.addClass("toggle-off"),this.$toggle.css({width:h,height:i}),this.options.height&&(c.css("line-height",c.height()+"px"),d.css("line-height",d.height()+"px")),this.update(!0),this.trigger(!0)},c.prototype.toggle=function(){this.$element.prop("checked")?this.off():this.on()},c.prototype.on=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._offstyle+" off").addClass(this._onstyle),this.$element.prop("checked",!0),void(a||this.trigger()))},c.prototype.off=function(a){return this.$element.prop("disabled")?!1:(this.$toggle.removeClass(this._onstyle).addClass(this._offstyle+" off"),this.$element.prop("checked",!1),void(a||this.trigger()))},c.prototype.enable=function(){this.$toggle.removeAttr("disabled"),this.$element.prop("disabled",!1)},c.prototype.disable=function(){this.$toggle.attr("disabled","disabled"),this.$element.prop("disabled",!0)},c.prototype.update=function(a){this.$element.prop("disabled")?this.disable():this.enable(),this.$element.prop("checked")?this.on(a):this.off(a)},c.prototype.trigger=function(b){this.$element.off("change.bs.toggle"),b||this.$element.change(),this.$element.on("change.bs.toggle",a.proxy(function(){this.update()},this))},c.prototype.destroy=function(){this.$element.off("change.bs.toggle"),this.$toggleGroup.remove(),this.$element.removeData("bs.toggle"),this.$element.unwrap()};var d=a.fn.bootstrapToggle;a.fn.bootstrapToggle=b,a.fn.bootstrapToggle.Constructor=c,a.fn.toggle.noConflict=function(){return a.fn.bootstrapToggle=d,this},a(function(){a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()}),a(document).on("click.bs.toggle","div[data-toggle^=toggle]",function(b){var c=a(this).find("input[type=checkbox]");c.bootstrapToggle("toggle"),b.preventDefault()})}(jQuery);

// Firebase -> web
// đèn(switch)
firebase.database().ref("PHONGNGU/DEN/").on("value",function(snapshot){
  var den = snapshot.val();
  if(den === "ON"){
    document.getElementById("canhbaoId_01").src = "./img/light_bulb.png"
    $('#state').text('LIGHT:ON' );  
  }
  else if(den === "OFF"){
    document.getElementById("canhbaoId_01").src = "./img/light_bulb_off.png"
    $('#state').text('LIGHT:OFF' ); 
  }
});

// đồng hồ thực
var current = new Date();

var getCurrentDateTime = setInterval(abc, 1000);

function abc() {
	current = new Date();
    document.getElementById("datetime").textContent = current;       
}
