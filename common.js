var msie = null; /* IE check */
var today = null;
var temp_array = [0,0];
var pressure_array = [0,0];
function CheckMaas(){ /* Request to jsonp MAAS API */
    $.ajax({
      url: "http://marsweather.ingenology.com/v1/latest/?format=jsonp",
      dataType: "jsonp",
      success: function (data) {
        data = data["report"];
        result = data;
        today = new Date();
        today_mars = (today.getFullYear() - 1957) + '.' + (result["season"].match(/[0-9]+/)) + '.' + result["ls"];
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          $('#MarsTime').html(today_mars);
        } else {
          ScrambleEffect('#MarsTime',today_mars);
        }

      }
    });
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
          if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            $('#atmo').html(atmosphere);
            $("#temperature").html(parseFloat(result["max_temp"]) + parseFloat(temp_array[probe_number]) + "°C");
            $("#sunrise").html(result["sunrise"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/));
            $("#sunset").html(result["sunset"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/));
            $("#pressure").html((parseFloat(result["pressure"]) + parseFloat(pressure_array[probe_number])).toString());
            if(result["wind_direction"] == "--") {
              $("#wind_direction").html("n/a");
            } else {
              $("#wind_direction").html(result["wind_direction"]);
            }
            if(result["wind_speed"] == null) {
              $("#wind_speed").html("n/a");
            } else {
              $("#wind_speed").html(result["wind_speed"].toString());
            }
          } else {
          ScrambleEffect('#atmo', atmosphere);
            ScrambleEffect("#temperature", (parseFloat(result["max_temp"]) + parseFloat(temp_array[probe_number])) + "°C");
            ScrambleEffect("#sunrise", result["sunrise"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/));
            ScrambleEffect("#sunset", result["sunset"].match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/));
            ScrambleEffect("#pressure", (parseFloat(result["pressure"]) + parseFloat(pressure_array[probe_number])).toString());
            if(result["wind_direction"] == "--") {
              ScrambleEffect("#wind_direction","n/a");
            } else {
              ScrambleEffect("#wind_direction",result["wind_direction"]);
            }
            if(result["wind_speed"] == null) {
              ScrambleEffect("#wind_speed","n/a");
            } else {
              ScrambleEffect("#wind_speed",result["wind_speed"].toString());
            }
        }
};
jQuery.fn.visible = function() {
  return this.css('opacity', '1');
};
jQuery.fn.invisible = function() {
  return this.css('opacity', '0');
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
    $("#noise_image").visible();
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
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      $("#probe").html(probe);
    } else {
      ScrambleEffect("#probe", probe);
    }
    setTimeout(function(){element.setAttribute('src', 'images/flag_inactive.png'); $(element).parent().children().eq(0).removeClass('invisible'); $(element).parent().removeClass('glitch');},1500); /* time for probe glitch effect */
    setTimeout(function(){$("#probe_image").attr('src', probe_img); $("#noise_image").invisible();}, 750); /* time for noise on the image */
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
  var result = null; /* variable for MAAS API resulted jsonp */
  CheckMaas(); 
  setInterval(CheckMaas,3600000); /* Check MAAS API every hour */
  var useragent = window.navigator.userAgent;  /* Check if */
  msie = useragent.indexOf("MSIE ");           /* IE is used */
  today = new Date(); /* Today is? */
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear() + 150;
  if(dd<10) {
      dd = '0'+dd
  } 
  if(mm<10) {
      mm = '0'+mm
  } 
  today = yyyy + '.' + mm + '.' + dd;
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { /* Set Today's date */
      $('#EarthTime').html(today);
    } else {
      ScrambleEffect('#EarthTime',today);
    }
}