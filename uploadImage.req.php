<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		// $targetPath = "images/".basename($_FILES['image']['name'][0]);
		// move_uploaded_file($_FILES['image']['tmp_name'][0], $targetPath);
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		include_once "helper/ImageHandler.cls.php";
		include_once "consts.php";
		
		// print_r($_FILES);
		// echo pathinfo($_FILES["image"]["name"][0])['filename'];
		// exit;
		$numberOfImages = count($_FILES['image']['name']);

		for($i = 0; $i < $numberOfImages; $i++){

			$img_path = "";

			if(isset($_FILES['image']['tmp_name'][$i])){
				$fileType = $_FILES['image']['type'][$i];
				switch($fileType){
					case 'image/gif':
					case 'image/jpeg':
					case 'image/jpg':
					case 'image/pjpeg':
					case 'image/png':
						try
						{
							//set the save directory
							$img = new ImageHandler(Consts::IMAGE_UPLOAD_DIR, array(785, 442), $i);
							//store the image in the directory and get the local path from local host
							$img_path = $img->processUploadedImage($_FILES['image']);
							
							$columns = "(".Column::NAME.",".Column::IMAGE_LINK.")";
							$tokens = "(?, ?)";
							$values = array();
							$values[] = pathinfo($_FILES["image"]["name"][$i])["filename"];//the image name
							$values[] = $img_path;//the image link

							$properties['columns'] = $columns;
							$properties['values'] = $values;
							$properties['tokens'] = $tokens;
							
							$database = new Database(DB::INFO, DB::USER, DB::PASS);
							$dbTable = new DbTable($database, Table::IMAGE_TB); 
							$dbTableQuery = new DbTableQuery($properties);
							$dbTableOperator = new DbTableOperator();
							$dbTableOperator->insert($dbTable, $dbTableQuery);
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
		
		echo isset($blogPostImages) ? json_encode($blogPostImages) : "[]";
	}
?>