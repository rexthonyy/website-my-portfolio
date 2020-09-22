<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";

		$columns = Column::ID.",".Column::ISPUBLISHED.",".Column::TITLE.",".Column::CONTENT.",".Column::CREATED.",".Column::LAST_UPDATED;
	
		$properties['columns'] = $columns;
		$properties['condition'] = "WHERE id=".$_POST["id"];
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