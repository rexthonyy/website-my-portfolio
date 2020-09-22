<?php

	$post = null;

	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		include_once "database/DB.const.php";
		include_once "database/Table.const.php";
		include_once "database/Column.const.php";
		include_once "database/Database.cls.php";
		include_once "database/DbTable.cls.php";
		include_once "database/DbTableQuery.cls.php";
		include_once "database/DbTableOperator.cls.php";
		
		$columns = Column::TITLE.",".Column::CONTENT;
	
		$properties['columns'] = $columns;
		$properties['condition'] = "WHERE id=".$_GET["id"];
		$properties['orderBy'] = "";
		$properties['limit'] = "";
		$database = new Database(DB::INFO, DB::USER, DB::PASS);
		$dbTable = new DbTable($database, Table::BLOG_TB); 
		$dbTableQuery = new DbTableQuery($properties);
		$dbTableOperator = new DbTableOperator();
		$blogPosts = $dbTableOperator->read($dbTable, $dbTableQuery, new DbPrepareResult());
		
		if($blogPosts != null){
			$post = $blogPosts[0];
		}
	}
?>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title>Edit Post</title>
		<link type="text/css" rel="stylesheet" href="css/dialog.css"/>
		<link type="text/css" rel="stylesheet" href="css/editorUpload.css"/>
		<link type="text/css" rel="stylesheet" href="css/editorPreview.css"/>
		<link type="text/css" rel="stylesheet" href="css/editor.css"/>
		<script type="text/javascript" src="js/editPost.js"></script>
		<link type="image/x-icon" rel="icon" href="images/icons/my_header_icon.png"/>
	</head>

	<body>
		<!--The top navigation-->
		<nav>
			<table>
				<tr>
					<td>
						<button class="postActionBtn"><img id="backBtn" src="images/icons/ic_arrow_left.png"  width="24px" height="24px" title="Go back"/></button>
					</td>
					<td>
						<input id="postTitle" type="text" placeholder="Title"/>
					</td>
					<td>
						<button class="actionBtn" id="savePostBtn" title="Save to draft">Save</button><button class="actionBtn" id="publishPostBtn" title="Publish post">Publish</button>
					</td>
				</tr>
			</table>
		</nav>
		
		<section id="body">
			<div id="mainContainer"><!--This is the top navigation window consisting of 3 windows: the main, the preview and the gallery-->
				<div id="navigationEditor">
					<ul>
						<li><a id="editorWindowNavBtn" class="active"><img src="images/icons/ic_edit.png" width="16px" height="16px"/>Edit file</a></li>
						<li><a id="previewWindowNavBtn"><img src="images/icons/ic_eye.png" width="16px" height="16px"/>Preview</a></li>
						<li><a id="uploadWindowNavBtn"><img src="images/icons/ic_photo.png" width="16px" height="16px"/>Upload</a></li>
					</ul>
				</div>
				<!--The editor window-->
				<div id="editorWindow">
					<textarea id="postContent" placeholder="What is on your mind?"></textarea>
				</div>
				<!--The preview window-->
				<div id="previewWindow"></div>
				<!--The upload window-->
				<div id="uploadWindow"></div>
			</div> 
		</section>
		<!--The modal background-->
		<div id="modalBackground">
			<!-- The Spinner -->
			<div class="dialog" id="progressBarModal">
				<img id="progressBarImage" src="images/gifs/loading_bar.gif"/>
			</div>

			<!-- The uploading progress bar -->
			<div class="dialog" id="uploadingModal">
				<div class="progress-bar-fill">
					<span class="progress-bar-text">0%</span>
				</div>
			</div>
		</div>
		<!-- Hidden elements -->
		<form id="uploadForm" style="display: none;">
			<input type="file" name="image[]" id="uploadFile" accept="image/*" multiple />
		</form>
		
		<input id="id" type="hidden" value="<?php echo $_GET["id"]; ?>"/>
		<input id="title" type="hidden" value="<?php echo $post[Column::TITLE]; ?>"/>
		<input id="content" type="hidden" value="<?php echo $post[Column::CONTENT]; ?>"/>
	</body>
</html>