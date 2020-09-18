window.onload = function(){
	currentDate = new Date();
	setEventListeners();
	updatePreview();
	sendRetrieveImagesRequestToServer();
}

function setEventListeners(){
	setBackButtonClickListener();
	setTitleInputChangeListener();
	setSaveButtonClickListener();
	setPublishButtonClickListener();
	setEditorWindowNavButtonClickListener();
	setPreviewWindowNavButtonClickListener();
	setUploadWindowNavButtonClickListener();
	setEditorTabPressListener();
	setEditorInputChangeListener();
}

function sendRetrieveImagesRequestToServer(){
	//start Ajax request
	ajaxRequest = new AjaxRequest();
	ajaxRequest.initialize();
	ajaxRequest.send("GET", "getPostImages.req.php", ajaxRetrieveImagesResponseHandler);
}

function ajaxRetrieveImagesResponseHandler(){
	if(ajaxRequest.getReadyState() == 4 && ajaxRequest.getStatus() == 200){	
		let jsonString = ajaxRequest.getResponseText();
		jsonObj = JSON.parse(jsonString);

		hideProgressBarModal();
		hideModal();

		setupUploadWindow(jsonObj);
	}
}

function setBackButtonClickListener(){
	let backButton = getBackButton();
	backButton.onclick = clickListener;
}

function setTitleInputChangeListener(){
	let titleInput = getTitleInput();
	titleInput.addEventListener("input", function(event){
		updatePreview();
	});
}

function setSaveButtonClickListener(){
	let saveButton = getSaveButton();
	saveButton.onclick = clickListener;
}

function setPublishButtonClickListener(){
	let publishButton = getPublishButton();
	publishButton.onclick = clickListener;
}

function setEditorWindowNavButtonClickListener(){
	let editorWindowNavButton = getEditorWindowNavButton();
	editorWindowNavButton.onclick = clickListener;
}
	
function setPreviewWindowNavButtonClickListener(){
	let previewWindowNavButton = getPreviewWindowNavButton();
	previewWindowNavButton.onclick = clickListener;
}

function setUploadWindowNavButtonClickListener(){
	let uploadWindowNavButton = getUploadWindowNavButton();
	uploadWindowNavButton.onclick = clickListener;
}

function setEditorTabPressListener(){
	let editorInput = getEditorInput();
	editorInput.onkeydown = function(e){
		if(e.keyCode == 9 || e.which == 9){
			e.preventDefault();
			let s = this.selectionStart;
			this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
			this.selectionEnd = s + 1;
		}
	};
}

function setEditorInputChangeListener(){
	let editorInput = getEditorInput();
	editorInput.addEventListener("input", function(event){
		updatePreview();
	});
}

function getBackButton(){
	return document.getElementById("backBtn");
}

function getTitleInput(){
	return document.getElementById("postTitle");
}

function getSaveButton(){
	return document.getElementById("savePostBtn");
}

function getPublishButton(){
	return document.getElementById("publishPostBtn");
}

function getEditorWindowNavButton(){
	return document.getElementById("editorWindowNavBtn");
}

function getPreviewWindowNavButton(){
	return document.getElementById("previewWindowNavBtn");
}

function getUploadWindowNavButton(){
	return document.getElementById("uploadWindowNavBtn");
}

function getEditorWindow(){
	return document.getElementById("editorWindow");
}

function getPreviewWindow(){
	return document.getElementById("previewWindow");
}

function getUploadWindow(){
	return document.getElementById("uploadWindow");
}

function getEditorInput(){
	return document.getElementById("postContent");
}

function getModalBackground(){
	return document.getElementById("modalBackground");
}

function getProgressBarModal(){
	return document.getElementById("progressBarModal");
}

function getPostImages(){
	return document.getElementsByClassName("postImage");
}

function getCopyButtons(){
	return document.getElementsByClassName("btnCopy");
}

function getDeleteButtons(){
	return document.getElementsByClassName("btnDelete");
}

function getFAB(){
	return document.getElementById("fab");
}

function clickListener(event){
	var element = event.target;
	switch(element.id){
		case "backBtn":
			window.history.back();
		break;

		case "savePostBtn":
			alert("Save post");
		break;

		case "publishPostBtn":
			alert("Publish post");
		break;

		case "editorWindowNavBtn":
			openEditorWindow();
		break;

		case "previewWindowNavBtn":
			openPreviewWindow();
		break;

		case "uploadWindowNavBtn":
			openUploadWindow();
		break;
	}
}

function openEditorWindow(){
	getEditorWindowNavButton().className = "active";
	getPreviewWindowNavButton().className = getUploadWindowNavButton().className = "";

	getEditorWindow().style.display = "block";
	getPreviewWindow().style.display = "none";
	getUploadWindow().style.display = "none";
}

function openPreviewWindow(){
	getPreviewWindowNavButton().className = "active";
	getEditorWindowNavButton().className = getUploadWindowNavButton().className = "";
	
	getEditorWindow().style.display = "none";
	getPreviewWindow().style.display = "block";
	getUploadWindow().style.display = "none";
}

function openUploadWindow(){
	getUploadWindowNavButton().className = "active";
	getEditorWindowNavButton().className = getPreviewWindowNavButton().className = "";

	getEditorWindow().style.display = "none";
	getPreviewWindow().style.display = "none";
	getUploadWindow().style.display = "block";
}

function updatePreview(){
	let titleInput = getTitleInput();
	let editorInput = getEditorInput();
	let previewWindow = getPreviewWindow();

	let dayNum = currentDate.getDate();
	let monthString = months[currentDate.getMonth()];
	let fullYear = currentDate.getFullYear();

	let date = monthString + " " + dayNum + ", " + fullYear;

	let innerHTML = "";

	innerHTML += "<h1><a href='#'>" + titleInput.value + "</a></h1>";
	innerHTML += editorInput.value;
	innerHTML += "<div class='blogFooter'><time>"+date+"</time><div><a href='https://twitter.com/share?ref_src=twsrc%5Etfw' class='twitter-share-button' data-show-count='false'>Tweet</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script><a href='https://www.facebook.com/sharer/sharer.php?u=rexthonyy.github.io/website-my-portfolio' target='_blank'><img class='fb_share' src='images/icons/facebook_share_icon.png' alt='facebook share button'/></a></div></div>";
	previewWindow.innerHTML = innerHTML;
}

function setupUploadWindow(jsonObj){
	setupUploadWindowLayout(jsonObj);
	setupPostImageClickListener();
	setupCopyImageClickListener();
	setupDeleteImageClickListener();
	setupUploadImageClickListener();
}

function setupUploadWindowLayout(jsonObj){
	let innerHTML = "";
	innerHTML = loadUploadTable(jsonObj, innerHTML, 5, "uploaded1");
	innerHTML = loadUploadTable(jsonObj, innerHTML, 4, "uploaded2");
	innerHTML = loadUploadTable(jsonObj, innerHTML, 3, "uploaded3");
	innerHTML = loadUploadTable(jsonObj, innerHTML, 2, "uploaded4");
	innerHTML = loadUploadTable(jsonObj, innerHTML, 1, "uploaded5");

	innerHTML += "<div id='fabContainer'><img id='fab' src='images/icons/ic_add.png'/></div>";
	
	getUploadWindow().innerHTML = innerHTML;
}

function loadUploadTable(jsonObj, innerHTML, grid, id){
	innerHTML += "<table id='"+id+"'>";
	for(let i = 0; i <= (jsonObj.length / grid); i++){
		innerHTML += "<tr>";
			for(let j = (i * grid); j < ((i * grid) + grid); j++){
				if(j < jsonObj.length){
					let imageLink = jsonObj[j].image_link;
					let id = jsonObj[j].id;
					if(imageLink != undefined){
						innerHTML += "<td><div class='hideableContainer'><img id='"+id+"' class='postImage' src='"+imageLink+"'/><div class='hideable'><span><button id='"+id+"' class='btnCopy'>Copy</button><button id='"+id+"' class='btnDelete'>Delete</button></span></div></div></td>";
					}
				}else{
					innerHTML += "<td></td>";
				}
			}
		innerHTML += "</tr>";
	}
	innerHTML += "</table>";
	
	return innerHTML;
}

function setupPostImageClickListener(){
	let postImages = getPostImages();
	for(let i = 0; i < postImages.length; i++){
		postImages[i].onclick = function(event){
			copyImageUrl(this.id);
		};
	}
}

function setupCopyImageClickListener(){
	let copyBtns = getCopyButtons();
	for(let i = 0; i < copyBtns.length; i++){
		copyBtns[i].onclick = function(event){
			copyImageUrl(this.id);
		};
	}
}

function setupDeleteImageClickListener(){
	let deleteBtns = getDeleteButtons();
	for(let i = 0; i < deleteBtns.length; i++){
		deleteBtns[i].onclick = function(event){
			alert("delete | id : " + this.id);
		};
	}
}

function setupUploadImageClickListener(){
	let fab = getFAB();
	fab.onclick = function(event){
		alert("add image");
	};
}

function copyImageUrl(id){
	let postImage = getPostImageWithId(id);
	let toCopy = "<img class='blogImg' src='"+postImage.image_link+"' alt='"+postImage.name+"' title='"+postImage.name+"'/>";
	copyToClipboard(toCopy);
}

function getPostImageWithId(id){
	for(let i = 0; i < jsonObj.length; i++){
		if(id == jsonObj[i].id){
			return jsonObj[i];
		}
	}
	return undefined;
}

function hideModal(){
	let modalBackground = getModalBackground();
	modalBackground.style.display = "none";
}

function showModal(){
	let modalBackground = getModalBackground();
	modalBackground.style.display = "block";
}

function showProgressBarModal(){
	let progressBarModal = getProgressBarModal();
	progressBarModal.style.display = "block";
}

function hideProgressBarModal(){
	let progressBarModal = getProgressBarModal();
	progressBarModal.style.display = "none";
}

//---------------------UTILITY FUNCTIONS-------------------
function AjaxRequest(){
	this.request = null;
	
	this.initialize = function (){
		if(window.XMLHttpRequest){
			try{
				this.request = new XMLHttpRequest();
			}catch(e){
				this.request = null;
			}
		//Now try the ActiveX (IE) version
		}else if(window.ActiveXObject){
			try{
				this.request = new ActiveXObject("Msxml2.XMLHTTP");
			//Try the older ActiveX object for older versions of IE
			}catch(e){
				try{
					this.request = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					this.request = null;
				}
			}
		}
	};
	
	this.getReadyState = function (){
		return this.request.readyState;
	};
	
	this.getStatus = function (){
		return this.request.status;
	};
	
	this.getResponseText = function (){
		return this.request.responseText;
	};
	
	this.getResponseXML = function (){
		return this.request.responseXML;
	};
	
	this.abort = function (){
		this.request.abort();
	};
	
	this.send = function (type, url, handler, postDataType, postData){
		if(this.request != null){
			//Kill the previous request
			this.abort();
			
			//Tack on a dummy parameter to override browser caching
			url += "?dummy=" + new Date().getTime();
			
			try{
				this.request.onreadystatechange = handler;
				this.request.open(type, url, true);	//always asynchronous (true)
				if(type.toLowerCase() == "get"){
					//Send a GET request
					this.request.send(null);
				}else{
					//Send a POST request
					this.request.setRequestHeader("Content-Type", postDataType);
					this.request.send(postData);
				}
			}catch(e){
				alert("Ajax error communicating with the server.\n"+"Details:"+e);
			}
		}
	};
}

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function copyToClipboard(text){
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}