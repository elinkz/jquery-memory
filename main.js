(function (window) {

    var clickCounter = 0;

    // Show highscore & counter
    function startGame() {       
        $('.counter_area').fadeIn('slow');
        //$('.right').fadeIn('slow');
    }

    // Reset counter
    function resetClickCounter() {
        clickCounter = 0;
        $("#click_counter").text(clickCounter);
    }

    var defaultTileImg = 'img/tile_bg.jpg';
    
    // Memory board images array
    var memoryArray = [   
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'
    ];

    var gameMemoryArray = [];
    var memoryValues = [];
    var memoryTitleIds = [];
    var tilesFlipped = 0;

    /************************************
    *
    * Randomize Success Messages
    * 
    *************************************/
    function randomNumber(MinValue, MaxValue) {
        return Math.round(Math.random() * (MinValue - MaxValue) + MaxValue);
    }

    function showRandomMsg() {
        var $allMsg = $(".msg p");
        var randomNum = randomNumber(0, $allMsg.length - 1);
        $allMsg.eq(randomNum).animate({fontSize: '2.2em'}, "slow").toggle('bounce', {times: 3}, 'slow').fadeOut('slow');
    }

    /************************************
    *
    * Modal Functionality
    * 
    *************************************/
    function showModal() {
        $('.form_content').css('display', 'block');
        $('.backdrop').css('display', 'block').animate({'opacity' : '.50'}, 300, 'linear');
        $('.form_content').animate({'opacity': '1'}, 300, 'linear');
        $('body').scrollTop(0).addClass('lightbox-open');
        $('.form_content h3').append('You found all the pictures with ' + clickCounter + ' clicks.');
        $('#input_name').val('').focus();
    }
        
    function closeModal() {
        $('.close_modal, .backdrop').click(function(evt) { 
            evt.preventDefault();
            
            $('.backdrop, .form_content').animate({'opacity' : '0'}, 300, 'linear', 
            function() {
                $('body').removeClass('lightform_content-open');
                $('.backdrop, .form_content').css('display', 'none');
            });
        });
    }

    closeModal();

    function closeModalOnSubmit() {
        $('.backdrop, .form_content').animate({'opacity' : '0'}, 300, 'linear', 
        function() {
            $('body').removeClass('lightform_content-open');
            $('.backdrop, .form_content').css('display', 'none');
            newGame();
        });
    }
    
    // Save & post score 
    function postHighScore() {                
        if(clickCounter < 50) {
            $("#click_counter").text('You Found All The Pictues With: ' + clickCounter);
            showModal();
                                 
        } else {
            $("#click_counter").text('Meh.. You got ' + clickCounter);
        }
    }

    // Sanitize/check player name, throw possible errors
    function sanitizePlayerName(playerName) {
        var sanitizedPlayerName,
            re,
            match;

        if ( typeof playerName !== 'string' ) {
            throw {
                name: 'InvalidParameterError',
                message: 'Expected parameter `playerName` to be of type string.'
            };
        }

        re = new RegExp('[a-zA-ZåäöÅÄÖ]{2,}', 'g');

        match = playerName.match(re);

        if ( !match ) {
            throw {
                name: 'NonMatchingString',
                message: 'Provided string did not match the reg exp.'
            };
        }

        sanitizedPlayerName = match.join('');

        if ( playerName !== sanitizedPlayerName ) {
            throw {
                name: 'UnacceptablePlayerName',
                message: 'Sanitized name did not match user submitted name.'
            };
        }

        return sanitizedPlayerName;
    }

    $('#score_form').on('submit', function(evt) {
        var name;

        evt.preventDefault();

        name = $(this).find('#input_name').val();

        try {
            name = sanitizePlayerName(name);
        } catch (e) {
            alert("Not an acceptable name.");
            console.debug(e);
            return;
        }

        $.ajax({
            url: '_includes/api.php',
            data: {
                name: name,
                user_score: clickCounter
            },
            method: 'POST',
            dataType: 'json',
            success: function(data) {
                templateHighscore(data);
            }
        });  

        closeModalOnSubmit();       
    });

    /************************************
    *
    * Get Highscore From Database
    * 
    *************************************/
    getHighScore();

    function getHighScore() { // Send a http request with AJAX 
        $.ajax({                                      
          url: '_includes/api.php',        // Script to call to get data          
          data: "",                        // Insert url argumnets here to pass to api.php                              
          dataType: 'json',                // Data format      
          success: function(data)          // On recieve of reply
          {
            templateHighscore(data);
          } 
        });
      }

    function templateHighscore (data) {
        var output;

        output = '<ol>';
        data.forEach(function (highscore) {
            output += '<li>' + '<span class="name">' + highscore.name + '</span>' +
            '<span class="score">' + highscore.score + '</span>' + '</li>';
        });
        output += '</table>';

        // Update html content
        $('#highscores').html(output); 
    }

    /************************************
    *
    * Memory Board Functionality
    * 
    *************************************/
    function memoryTileShuffle (arr) {
        var i = arr.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i+1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }

    function newGame() {
        gameMemoryArray = [];
        $('#memory_board').html("");
        
        newBoard();

        resetClickCounter();
        $(".reset_game_btn").css("display", "block");

    }

    function newBoard() {
        gameMemoryArray = gameMemoryArray.concat(memoryArray.slice(), memoryArray.slice());
        
        startGame();

        tilesFlipped = 0;
        var output = '';
        memoryTileShuffle(gameMemoryArray);
        for(var i = 0; i < gameMemoryArray.length; i++) {
            output += '<div class="tile" id="tile_'+i+'"><div class="front"></div><div class="back"></div></div>';
        }
        $('#memory_board').html(output);

        $(".tile").flip({
          axis: 'y',
          trigger: 'manual',
          reverse: true,
          speed: 500
        });
    }
    
    window.debug = {}

    function memoryFlipTile(tile_bg) {
        var $tile = $(this);

        // Check if clicked tile is not flipped yet & if flipped tiles are less than 2
        if( !$tile.hasClass('is-flipped') && memoryValues.length < 2 ) {

            $('#click_counter').text(++clickCounter);
    
            window.debug = {}

            $tile.find('.back').css('backgroundImage', 'url(' + tile_bg + ')').end().addClass('is-flipped');

            $tile.flip(true);
            
            if(memoryValues.length == 0) {

                memoryValues.push(tile_bg);
                memoryTitleIds.push(this.id);

            } else if(memoryValues.length == 1) {

                memoryValues.push(tile_bg);
                memoryTitleIds.push(this.id);

                if(memoryValues[0] == memoryValues[1]) {
    
                    showRandomMsg();
                    tilesFlipped += 2;

                    // Clear both arrays
                    memoryValues = [];
                    memoryTitleIds = [];

                    // Check to see if whole board is cleared
                    if(tilesFlipped == gameMemoryArray.length) {
                        postHighScore();
                    }

                } else { // If there is no match
                    function flip2Back() {
                        // Flip the 2 tiles back over
                        var $tile_1 = $('#' + memoryTitleIds[0]);
                        var $tile_2 = $('#' + memoryTitleIds[1]);

                        $tile_1.flip(false);
                        $tile_2.flip(false);

                        // Wait for flip animation to run before removing class/clear background img
                        setTimeout(function () {
                            $tile_1.removeClass('is-flipped').find('.back').css('backgroundImage', '');
                            $tile_2.removeClass('is-flipped').find('.back').css('backgroundImage', '');
                        }, 500);

                        // Clear both arrays
                        memoryValues = [];
                        memoryTitleIds = [];
                    }
                    setTimeout(flip2Back, 700);
                }
            }   
            window.debug = {}
        }
    }

    $('#start_btn').on('click', newGame);
    $('.reset_game_btn').on('click', newGame);
    $('#memory_board').on('click', '.tile', function(event) {
        var i = parseInt(this.id.match(/\d+$/)[0], 10);
        memoryFlipTile.call(this, gameMemoryArray[i]);
    });

}(window));
