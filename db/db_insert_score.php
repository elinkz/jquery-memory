<?php
if ( !isset($_POST['user_score']) || !isset($_POST['name']) ) {
	die('Fail');
} 

$user_score = intval( $_POST['user_score'] );
$user_name = $_POST['name'];
$id = 0;

if ( $user_score > 50 || $user_score < 20 ) {
	die('U cheat bitch');
}

function storeHighScore($highscore, $name) {
	global $mysqli;
	
	$query = "INSERT INTO high_score VALUES (?, ?, ?)";

	if( $stmt = $mysqli->prepare($query) ) { 
		
		$stmt->bind_param('isi', $id, $name, $highscore); 
		$stmt->execute(); 
		$stmt->close();
	}

}

storeHighScore($user_score, $user_name);
