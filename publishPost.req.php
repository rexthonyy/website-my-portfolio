<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		
		$ids = explode(',', $_POST["ids"]);

		for($i = 0; $i < sizeof($ids); $i++){
			$equality = Column::ISPUBLISHED."=? ";
			$values = array();
			$values[] = "true";

			$properties['equality'] = $equality;
			$properties['values'] = $values;
			$properties['condition'] = "WHERE id=". $ids[$i];

			$database = new Database(DB::INFO, DB::USER, DB::PASS);
			$dbTable = new DbTable($database, Table::BLOG_TB); 
			$dbTableQuery = new DbTableQuery($properties);
			$dbTableOperator = new DbTableOperator();
			$dbTableOperator->update($dbTable, $dbTableQuery);
		}

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