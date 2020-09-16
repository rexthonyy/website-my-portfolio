<?php
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		
		$columns = Column::ID.",".Column::NAME.",".Column::IMAGE_LINK.",".Column::CREATED;
	
		$properties['columns'] = $columns;
		$properties['condition'] = "";
		$properties['orderBy'] = "";
		$properties['limit'] = "";
		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTable = new DbTable($database, Table::IMAGE_TB); 
		$dbTableQuery = new DbTableQuery($properties);
		$dbTableOperator = new DbTableOperator();
		$blogPostImages = $dbTableOperator->read($dbTable, $dbTableQuery, new DbPrepareResult());
		
		echo isset($blogPostImages) ? json_encode($blogPostImages) : "[{}]";
	}
?>