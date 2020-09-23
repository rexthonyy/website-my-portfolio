<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		
		//print_r($_POST);
		//exit;
		$columns = "(".Column::ISPUBLISHED.",".Column::TITLE.",".Column::CONTENT.")";
		$tokens = "(?, ?, ?)";
		$values = array();
		$values[] = $_POST[Column::ISPUBLISHED];
		$values[] = $_POST[Column::TITLE];
		$values[] = $_POST[Column::CONTENT];

		$properties['columns'] = $columns;
		$properties['values'] = $values;
		$properties['tokens'] = $tokens;
		
		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTable = new DbTable($database, Table::BLOG_TB); 
		$dbTableQuery = new DbTableQuery($properties);
		$dbTableOperator = new DbTableOperator();
		$dbTableOperator->insert($dbTable, $dbTableQuery);

		echo "true";
	}
?>