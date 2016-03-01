<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Memory Game</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/normalize.css" type="text/css">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Montserrat" type="text/css">
	<link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
	<div class="wrapper">
		<!-- Modal -->
		<div class="form_content">
	        <form method="post" class="score_modal" name="score_form" id="score_form">
		        <h3>Wow you made it to the highscore! </h3>
	            <label for="name">Type your name here. (2-12 characters)</label><br>
	            <input type="text" name="name" id="input_name" class="input-xlarge" value="" maxlength="12"><br>
		        <input class="btn btn-success" type="submit" value="Done!" id="submit_name">
		        <a href="#" class="btn btn-primary close_modal" data-dismiss="modal">Nah</a>
	        </form>
		</div>
		<!-- /Modal -->

		<div class="backdrop"></div>
		<!--*************************************************
		********************** Header ***********************
		**************************************************-->
		<div class="header">
			<h1>This is a simple memory game.</h1>
		</div>
		
		<!--*************************************************
		****************** Main Content *********************
		**************************************************-->
		<div class="main_content">
			<div class="right">
				<h3 class="highscore_heading">Highscores</h3>
				<div id="highscores"></div>
			</div>
		<!-- Memory Board -->
			<div id="memory_board">
				<button id="start_btn">Start Dat Game</button>
			</div>
		<!-- /Memory Board -->
		</div>
		<!-- Click Counter -->
		<div class="counter_area">
			<div class="counter">
				<p><span id="click_counter">0</span> Clicks</p>
			</div>
			<button class="reset_game_btn">Start Over?</button>
		</div>
		<!-- /Click Counter -->
		
		<!-- Match Messages -->
		<div class="msg">
			<p class="is_hidden match_msg" id="match_msg_1">wow</p>
			<p class="is_hidden match_msg" id="match_msg_2">such memory</p>
			<p class="is_hidden match_msg" id="match_msg_3">much intellect</p>
			<p class="is_hidden match_msg" id="match_msg_4">many smart</p>
			<p class="is_hidden match_msg" id="match_msg_5">so amaze</p>
			<p class="is_hidden match_msg" id="match_msg_6">such brilliant</p>
			<p class="is_hidden match_msg" id="match_msg_7">same card wow</p>
			<p class="is_hidden match_msg" id="match_msg_8">such clever</p>
			<p class="is_hidden match_msg" id="match_msg_9">much skillz</p>
			<p class="is_hidden match_msg" id="match_msg_10">wow very brainy</p>
			<p class="is_hidden match_msg" id="match_msg_11">much wise</p>
			<p class="is_hidden match_msg" id="match_msg_11">correct card wow</p>
		</div>
		<!-- /Match Messages -->
	</div>

	<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
	<script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.0/TweenMax.min.js"></script>
	<script src="jquery.flip.js"></script>
	<script src="main.js"></script>
</body>
</html>