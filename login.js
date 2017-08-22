    var start = performance.now();
    var line_state = 0;
    var prevTime = 0;

    function rotate_line(time){
      var timePassed = time - start;
      if ((timePassed - prevTime) > 200) {
        switch(line_state) {
            case 0:
                $('.line').css({'transform' : 'rotate(0deg)'});
                line_state = 1;
                break;
            case 1:
                $('.line').css({'transform' : 'rotate(45deg)'});
                line_state = 2;
                break;
            case 2:
                $('.line').css({'transform' : 'rotate(90deg)'});
                line_state = 3;
                break;
            case 3:
                $('.line').css({'transform' : 'rotate(135deg)'});
                line_state = 0;
                break;
        }
        prevTime = timePassed;
        requestAnimationFrame(rotate_line);
      } else {
        requestAnimationFrame(rotate_line);
      }

    };
    requestAnimationFrame(rotate_line);


    $('#inputID').keyup(function() {
        if($('#inputID').val().length > 0) {
            $('#inputID').css('color','rgb(176,146,97)');
        } else {
            $('#inputID').css('color','transparent');
        }
    });

    $('#inputID').change(function() {
            checkAuth($('#inputID').val().split("").reverse().join(""));
    });    


    function checkAuth(code) {
        $('#inputID').prop('disabled', true);
        $('.outer_border').css('background','transparent');
        $('#message_div').children().eq(0).remove();
        $('#message_div').children().eq(0).remove();
        var typed2 = new Typed("#message_div", {strings: ["<span class=\"message\">ПРОВЕРКА</span><span class=\"line\">&boxh;</span>"], typeSpeed: speedType});

        $('#console_container').append("<div><span id=\"a_string\" class=\"consoletext nomargin\"></span></div>");
        var typed2 = new Typed("#a_string", {strings: ["// Подключение юзера " + code], typeSpeed: speedType, onComplete: function(self) {$("#a_string").removeAttr('id')}});

        $('#console_container').append("<div><span id=\"b_string\" class=\"consoletext nomargin\"></span><span id=\"e_string\" class=\"consoletext nomargin\"></span></div>");
        var typed2 = new Typed("#b_string", {strings: ["// Ждём подключения "], startDelay: 1500, typeSpeed: speedType, onComplete: function(self) {$("#b_string").removeAttr('id')}, preStringTyped: function(self) {$('#console_container').animate({scrollTop: $('#console_container').prop('scrollHeight')}, 500);}});
        var typed2 = new Typed("#e_string", {strings: ["......"], startDelay: 2000, typeSpeed: 500, onComplete: function(self) {$("#e_string").removeAttr('id'); errorAuth()}});
    };

    function errorAuth() {
        $('#message_div').children().eq(0).remove();
        $('#message_div').children().eq(0).remove();
        $('.outer_border').css('background','rgb(100,0,3)');
        var typed2 = new Typed("#message_div", {strings: ["<span class=\"message error\">ОШИБКА</span>"], typeSpeed: speedType});
        $('#console_container').append("<div><span id=\"c_string\" class=\"consoletext nomargin\"></span></div>");
        var typed2 = new Typed("#c_string", {strings: ["// Ошибка аутентификации."], startDelay: 500, typeSpeed: speedType, preStringTyped: function(self) {$('#console_container').animate({scrollTop: $('#console_container').prop('scrollHeight')}, 500);}, onComplete: function(self) {$("#c_string").removeAttr('id')}});

        setTimeout(function(){
            $('#message_div').children().eq(0).remove();
            $('.outer_border').css('background','transparent');
            $('#inputID').val('');
            $('#inputID').css('color','transparent');
            $('#inputID').prop('disabled', false);
            $('#inputID').focus();            
        }, 2500);
    }

    function updateScroll() {
        var element = document.getElementById("console_container");
        element.scrollTop = element.scrollHeight;
    };

    var fontSize = $('#first_string').css('font-size');
    var lineHeight = Math.floor(parseInt(fontSize.replace('px','')) * 1.3);
    const speedType = -150;


    $('#console_container').css('height', lineHeight * 3);

    var typed = new Typed("#first_string", {strings: ["// MarsOS v1.27"], typeSpeed: speedType});

    $('#console_container').append("<div><span id=\"second_string\" class=\"consoletext nomargin\"></span></div>");
    var typed2 = new Typed("#second_string", {strings: ["// Защищенное соединение  : Mars Secure Logon"], startDelay: 1500, typeSpeed: speedType});