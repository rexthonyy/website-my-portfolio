<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		include_once "helper/ImageHandler.cls.php";
		include_once "consts.php";
		
		//get the image_link of the id
		$id = $_POST["id"];

		$columns = Column::IMAGE_LINK;
	
		$properties['columns'] = $columns;
		$properties['condition'] = "WHERE id=" . $id;
		$properties['orderBy'] = "";
		$properties['limit'] = "";
		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTable = new DbTable($database, Table::IMAGE_TB); 
		$dbTableQuery = new DbTableQuery($properties);
		$dbTableOperator = new DbTableOperator();
		$imageList = $dbTableOperator->read($dbTable, $dbTableQuery, new DbPrepareResult());

		if($imageList != null){
			//delete the image from the repository
			unlink($imageList[0][Column::IMAGE_LINK]);

			//delete the image from the database
			$properties = array();
			$properties['condition'] = "WHERE id = ".$id;
			
			$database = new Database(DB::INFO, DB::USER, DB::PASS);
			$dbTable = new DbTable($database, Table::IMAGE_TB); 
			$dbTableQuery = new DbTableQuery($properties);
			$dbTableOperator = new DbTableOperator();
			$dbTableOperator->delete($dbTable, $dbTableQuery);
		}
		
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
		
		echo isset($blogPostImages) ? json_encode($blogPostImages) : "[]";
	}
?>