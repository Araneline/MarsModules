var today = null;
var temp_array = [0,0];
var pressure_array = [0,0];
var first = true;
var result = null;
function CheckMaas(){ /* Request to jsonp MAAS API */
    $.ajax({
      url: "http://marsweather.ingenology.com/v1/latest/?format=jsonp",
      dataType: "jsonp",
      success: function (data) {
        data = data["report"];
        result = data;
        today = new Date();
        today_mars = (today.getFullYear() - 1957) + '.' + (result["season"].match(/[0-9]+/)) + '.' + result["ls"];
          ScrambleEffect('#MarsTime', today_mars);
          if (first != false) {
            SetInfo(1);
            probe = "ОАЗИС-1";
            probe_img = "images/1_oasis.jpg";
            ScrambleEffect('#probe', probe);
            $("#probe_image").attr('src', probe_img); 
            $("#noise_image").css('opacity', '0');
            first = false;
          }          
      }
    });

    if (result == null) {
      result = {"terrestrial_date": "2017-08-19", "sol": 1790, "ls": 49.0, "min_temp": -81.0, "min_temp_fahrenheit": -113.8, "max_temp": -12.0, "max_temp_fahrenheit": -7.6, "pressure": 882.0, "pressure_string": "Higher", "abs_humidity": null, "wind_speed": null, "wind_direction": "--", "atmo_opacity": "Sunny", "season": "Month 2", "sunrise": "2017-08-19T11:11:00Z", "sunset": "2017-08-19T22:59:00Z"};
      today = new Date();
      today_mars = (today.getFullYear() - 1957) + '.' + (result["season"].match(/[0-9]+/)) + '.' + result["ls"];
    }
    /* Randomize some numbers for different probes */
    min_deg = -2.5;
    max_deg = 2.5;
    min_press = -1;
    max_press = 1;
    for (i=0;i<4;i++) { /* randomize for 4 probes */
      temp_array.push((Math.random() * (min_deg - max_deg) + max_deg).toFixed(2)); /* push to array with randomized temperature */
      pressure_array.push((Math.random() * (min_press - max_press) + max_press).toFixed(2)); /* push to array with randomized atm pressure */
    }
    };
function SetInfo(probe_number){ /* Change left-side info (except image and probe name) */
        var atmosphere = "--";
        switch(result["atmo_opacity"]) {
          case "Sunny":
            atmosphere = "Солнечно"
            break;
          case "Cloudy":
            atmosphere = "Облачно"
            break;
        }
        ScrambleEffect('#atmo', atmosphere);
        ScrambleEffect('#temperature', ((parseFloat(result["max_temp"]) + parseFloat(temp_array[probe_number])).toFixed(2) + "°C"));
        ScrambleEffect('#pressure', ((parseFloat(result["pressure"]) + parseFloat(pressure_array[probe_number])).toString()));
        ScrambleEffect('#atmo', atmosphere);
        ScrambleEffect('#sunrise', (result["sunrise"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/)));
        ScrambleEffect('#sunset', (result["sunset"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/)));

            if(result["wind_direction"] == "--") {
          ScrambleEffect('#wind_direction', ("n/a"));
            } else {
          ScrambleEffect('#wind_direction', (result["wind_direction"]));
            }
            if(result["wind_speed"] == null) {
          ScrambleEffect('#wind_speed', ("n/a"));
            } else {
          ScrambleEffect('#wind_speed', (result["wind_speed"]));
            }
};
function hover(element) { /* func for probe hover */
  if (element.hasAttribute('clicked'))
  {
    element.setAttribute('src', 'images/flag_active.png'); 
    $(element).parent().children().eq(0).addClass('invisible');
  } else {
    element.setAttribute('src', 'images/flag_preactive.png'); 
  }
};
function unhover(element) { /* func for probe unhover */
if (element.hasAttribute('clicked'))
  {
    element.setAttribute('src', 'images/flag_inactive.png');  
    $(element).parent().children().eq(0).removeClass('invisible');
  } else {
    element.setAttribute('src', 'images/flag_inactive.png');  
  }     
};

function clickflag(element) { /* Click on Probe */
  if (!(element.hasAttribute('clicked')))
  {
    $("#noise_image").css('opacity', '1');
    element.setAttribute('src', 'images/flag_active.png');  
    var prev_img = $("img[clicked='true']");
    prev_img.removeAttr('clicked');
    prev_img.parent().children().eq(0).addClass('invisible');
    prev_img.attr('src', 'images/flag_inactive.png');

    $(element).parent().addClass('glitch');    
    element.setAttribute('clicked', 'true');    
    var probe = "--";
    switch($(element).parent().attr('id')) {
      case "flag1":
        probe = "ОАЗИС-1";
        probe_img = "images/1_oasis.jpg";
        SetInfo(1);
        break;
      case "flag2":
        probe = "ЗУТФЕН-2";
        probe_img = "images/2_zutphen.jpg";
        SetInfo(2);
        break;
      case "flag3":
        probe = "ГАЛДАКАО-3";
        probe_img = "images/3_galdakao.jpg";
        SetInfo(3);
        break;
      case "flag4":
        probe = "МААДИМ-4";
        probe_img = "images/4_maadim.jpg";
        SetInfo(4);
        break;
      case "flag5":
        probe = "СПИРИТ-5";
        probe_img = "images/5_spirit.jpg";
        SetInfo(5);
        break;
    }
    ScrambleEffect('#probe', probe);
    var start = performance.now();

    function glitches(time){
      var timePassed = time - start;
      if (timePassed > 1000) {
        element.setAttribute('src', 'images/flag_inactive.png');
        $(element).parent().children().eq(0).removeClass('invisible');
        $(element).parent().removeClass('glitch');
        $("#probe_image").attr('src', probe_img);
        $("#noise_image").css('opacity', '0');
        cancelAnimationFrame(glitches);
      } else {
        requestAnimationFrame(glitches);
      }

    };
    requestAnimationFrame(glitches);

  }
};
function icon_hover(icon) { /* on icon hover (right column) */
  var position = -4;
  var input = $(icon).attr('src');
  icon.setAttribute('src', [input.slice(0, position), "_chosen", input.slice(position)].join(''));
};
function icon_unhover(icon) { /* on icon unhover (right column) */
  var input = $(icon).attr('src');
  icon.setAttribute('src', input.replace('_chosen',''));
};
window.onload = function() {
canvas = document.getElementById('dustCanvas');
context = canvas.getContext('2d');
context.canvas.width = 566;
context.canvas.height = 500;

for (var i = 0; i < 20; i++){ //randomize fiest matrix
    mas[i] = [];
    for (var j = 0; j < 17; j++){
      if (Math.floor(Math.random() * (0 - 2) + 2) == 0) {
          mas[i][j] = Math.floor(Math.random() * (0 - 2) + 2);
      } else {
        mas[i][j] = 0;
      }
}};

for (var i = 0; i < 20; i++){ //inititalize second matrix
    mas_next[i] = [];
    for (var j = 0; j < 17; j++){
        mas_next[i][j] = 0;
}};

for (var i = 0; i < 20; i++){ //evolve 1 matrix into 2nd
    for (var j = 0; j < 17; j++){
        mas_next[i][j] = evolve(mas[i][j],i,j);
}};

  CheckMaas();
  today = new Date(); /* Today is? */
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear() + 50;
  if(dd<10) {
      dd = '0'+dd
  } 
  if(mm<10) {
      mm = '0'+mm
  } 
  today = yyyy + '.' + mm + '.' + dd;
  ScrambleEffect('#EarthTime', today);

mas_evolve();
animate(10000);
animate_main_cycle();
};

window.addEventListener("touchstart", touchHandler, false);

function touchHandler(event){
    if(event.touches.length > 1){
        //the event is multi-touch
        //you can then prevent the behavior
        event.preventDefault()
    }
};