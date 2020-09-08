<?php
	session_start();
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		
		include_once "consts.php";
		
		$password = $_POST['password'];
		
		if(Consts::PASSWORD == $password){
			//$_SESSION['loggedIn'] = "loggedIn";
			echo "true";
		}else{
			echo "false";
		}
	}
?>