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
		
		print_r($_FILES);
		echo "Rex Anthony";
		exit;

		$numberOfImages = count($_FILES['image']['name']);

		for($i = 0; $i < $numberOfImages; $i++){

			$img_path = "";

			if(isset($_FILES['image']['tmp_name'])){
				$fileType = $_FILES['image']['type'];
				switch($fileType){
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/pjpeg':
					case 'image/png':
						try
						{
							//set the save directory
							$img = new ImageHandler(Consts::IMAGE_UPLOAD_DIR);
							//store the image in the directory and get the local path from local host
							$img_path = $img->processUploadedImage($_FILES['image'][$i]);
						}
						catch(Exception $e){
							// If an error occured, output your custom error message
							die($e->getMessage());
						}
					break;
					
					default:
						echo "Error uploading image : Unknown image extension";
				}
			}
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
		
		echo isset($blogPostImages) ? json_encode($blogPostImages) : "[{}]";
	}
?>