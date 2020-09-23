<?php
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		
		$sql = 
		"SELECT id, isPublished, title, content, created, last_updated,
		(SELECT COUNT(id) FROM analytics_tb WHERE blog_id = blog_tb.id) AS views
		FROM blog_tb";

		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTableOperator = new DbTableOperator();
		$blogPosts = $dbTableOperator->readRawSQL($sql, $database, new DbPrepareResult());

		echo $blogPosts == null ? "[]" : json_encode($blogPosts);
	}
?>