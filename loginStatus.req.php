<?php
	session_start();
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		echo isset($_SESSION['loggedIn']) ? "true" : "false";
	}
?>