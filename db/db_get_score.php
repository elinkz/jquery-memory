<?php

function getHighscoreFromDB() {
	global $mysqli;
	
	$result = $mysqli->query("SELECT * FROM high_score ORDER BY high_score.score ASC LIMIT 10");
	$array = array();

	while ($row = $result->fetch_row()) {
	    array_push($array, array(
	    	"id" => intval($row[0]),
	    	"name" => $row[1],
	    	"score" => intval($row[2])
	    ));
	}
	
	return $array;
}