<?php

require '../db/db_connect.php';

if ( $_SERVER['REQUEST_METHOD'] == "POST" ) {
	require "../db/db_insert_score.php";
}

require "../db/db_get_score.php";

$highscore = getHighscoreFromDB();

$mysqli->close();

echo json_encode($highscore);
