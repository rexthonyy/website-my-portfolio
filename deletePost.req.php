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
			$properties = array();
			$properties['condition'] = "WHERE id = ".$ids[$i];
			
			$database = new Database(DB::INFO, DB::USER, DB::PASS);
			$dbTable = new DbTable($database, Table::BLOG_TB); 
			$dbTableQuery = new DbTableQuery($properties);
			$dbTableOperator = new DbTableOperator();
			$dbTableOperator->delete($dbTable, $dbTableQuery);
		}

		$columns = Column::ID.",".Column::ISPUBLISHED.",".Column::TITLE.",".Column::CONTENT.",".Column::CREATED.",".Column::LAST_UPDATED;
	
		$properties['columns'] = $columns;
		$properties['condition'] = "";
		$properties['orderBy'] = "";
		$properties['limit'] = "";
		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTable = new DbTable($database, Table::BLOG_TB); 
		$dbTableQuery = new DbTableQuery($properties);
		$dbTableOperator = new DbTableOperator();
		$blogPosts = $dbTableOperator->read($dbTable, $dbTableQuery, new DbPrepareResult());
		
		echo isset($blogPosts) ? json_encode($blogPosts) : "[]";
	}
?>