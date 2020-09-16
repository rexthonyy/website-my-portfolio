window.onload = function(){
	setEventListeners();
	sendDashboardAccessRequestToServers();
}

function setEventListeners(){
	setLoginButtonClickListener();
	setCloseSelectionClickListener();
	setPublishSelectedButtonClickListener();
	setUnpublishSelectedButtonClickListener();
	setDeleteSelectedButtonClickListener();
	setNewPostListener();
	setSearchBarFocusListener();
	setSearchBarChangeListener();
	setClearSearchBarButtonListener();
	setSearchButtonListener();
	setDisplayPostDropDownSelectionListener();
	setSelectAllCheckboxistener();
	setPostHoverListener();
	setPostCheckboxClickListener();
	setPublishOrUnpublishPostButtonListener();
	setDeletePostButtonListener();
	setPreviewPostButtonListener();
	setSharePostButtonListener();
	setAnalyticsButtonListener();
	setPostClickListener();
}

function sendDashboardAccessRequestToServers(){
	//start Ajax request
	ajaxRequest = new AjaxRequest();
	ajaxRequest.initialize();
	ajaxRequest.send("GET", "loginStatus.req.php", ajaxDashboardAccessResponseHandler);
}

function sendLoginRequestToServer(password){
	//start Ajax request
	let postData = "password=" + escape(password);
	ajaxRequest = new AjaxRequest();
	ajaxRequest.initialize();
	ajaxRequest.send("POST", "passwordValidation.req.php", ajaxLoginRequestResponseHandler, "application/x-www-form-urlencoded; charset=UTF-8", postData);
}

function sendRetrieveDataRequestToServer(){
	ajaxRequest = new AjaxRequest();
	ajaxRequest.initialize();
	ajaxRequest.send("GET", "getPosts.req.php", ajaxRetrieveDataResponseHandler);
}

function setLoginButtonClickListener(){
	let loginButton = getLoginButton();
	loginButton.onclick = clickListener;
}

function setCloseSelectionClickListener(){
	let closeSelectionBtn = getCloseSelectionButton();
	closeSelectionBtn.onclick = clickListener;
}

function setPublishSelectedButtonClickListener(){
	let publishSelectedBtn = getPublishSelectedButton();
	publishSelectedBtn.onclick = clickListener;
}

function setUnpublishSelectedButtonClickListener(){
	let unpublishSelectedBtn = getUnpublishSelectedButton();
	unpublishSelectedBtn.onclick = clickListener;
}

function setDeleteSelectedButtonClickListener(){
	let deleteSelectedBtn = getDeleteSelectedButton();
	deleteSelectedBtn.onclick = clickListener;
}

function setNewPostListener(){
	let newPostBtns = getNewPostButtons();
	for(let i = 0; i < newPostBtns.length; i++){
		newPostBtns[i].onclick = clickListener;
	}
}

function setSearchBarFocusListener(){
	var searchBar = getSearchBar();
	searchBar.addEventListener("focus", searchBarFocusListener, true);
	searchBar.addEventListener("blur", searchBarUnfocusListener, true);
}

function setSearchBarChangeListener(){
	var searchBar = getSearchBar();
	searchBarChangeListener("");
	searchBar.addEventListener("input", function(evt){ 
		searchBarChangeListener(this.value);
	});
}

function setClearSearchBarButtonListener(){
	var clearSearchBtn = getClearSearchBtn();
	clearSearchBtn.onclick = clickListener;
}

function setSearchButtonListener(){
	var searchBtn = getSearchBtn();
	searchBtn.onclick = clickListener;
}

function setDisplayPostDropDownSelectionListener(){
	var displayPostDropDown = getDisplayPostDropDown();
	displayPostDropDown.onchange = function(event){
		displayPosts();
	};
}

function setSelectAllCheckboxistener(){
	var selectAllCheckbox = getSelectAllCheckbox();
	selectAllCheckbox.onchange = function(event){
		if(this.checked){
			selectAllPosts();
		}else{
			deselectAllPosts();
		}
		checkSelectedPosts();
	};
}

function setPostHoverListener(){
	var postItems = getPostItems();

	for(var i = 0; i < postItems.length; i++){
		var menuItems = getMenuItems();
		var menuIcons = getMenuIcons();
		menuItems[i].style.display = "none";
		menuIcons[i].style.display = "block";
		postItems[i].addEventListener("mouseover", function(){
			var menuItems = getMenuItems();
			var menuIcons = getMenuIcons();
			menuItems[getPostIndexWithId(this.id)].style.display = "block";
			menuIcons[getPostIndexWithId(this.id)].style.display = "none";
		});
		postItems[i].addEventListener("mouseout", function(){
			var menuItems = getMenuItems();
			var menuIcons = getMenuIcons();
			menuItems[getPostIndexWithId(this.id)].style.display = "none";
			menuIcons[getPostIndexWithId(this.id)].style.display = "block";
		});
	}
}

function getPostIndexWithId(id){
	let postItems = getPostItems();
	let index = -1;
	for(let i = 0; i < postItems.length; i++){
		if(postItems[i].id == id){
			index = i;
			break;
		}
	}

	return index;
}

function setPostCheckboxClickListener(){
	var postCheckboxes = getPostCheckboxes();
	for(var i = 0; i < postCheckboxes.length; i++){
		postCheckboxes[i].onclick = function(e){
			stopClickPropagation(e);
		};
		postCheckboxes[i].onchange = function(event){
			checkSelectedPosts();
		}
	}
}

function setPublishOrUnpublishPostButtonListener(){
	var btns = getPublishOrUnpublishPostButton();
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = function(e){
			stopClickPropagation(e);
			alert("Publish post");
		};
	}
}

function setDeletePostButtonListener(){
	var btns = getDeletePostButton();
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = function(e){
			stopClickPropagation(e);
			alert("Delete post");
		};
	}
}

function setPreviewPostButtonListener(){
	var btns = getPreviewPostButton();
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = function(e){
			stopClickPropagation(e);
			alert("Preview post");
		};
	}
}

function setSharePostButtonListener(){
	var btns = getSharePostButtons();
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = function(e){
			stopClickPropagation(e);
			alert("Share post");
		};
	}
}

function setAnalyticsButtonListener(){
	var btns = getAnalyticsPostButtons();
	for(var i = 0; i < btns.length; i++){
		btns[i].onclick = function(e){
			stopClickPropagation(e);
			alert("Analytics post");
		};
	}
}

function setPostClickListener(){
	var posts = getPosts();
	for(var i = 0; i < posts.length; i++){
		posts[i].onclick = function(e){
			alert("Clicked post with id : " + this.id);
		};
	}
}

function getModalBackground(){
	return document.getElementById("modalBackground");
}

function getProgressBarModal(){
	return document.getElementById("progressBarModal");
}

function getLoginModal(){
	return document.getElementById("loginModal");
}

function getLoginPasswordInput(){
	return document.getElementById("loginPasswordInput");
}

function getLoginPasswordInputError(){
	return document.getElementById("loginPasswordInputError");
}

function getLoginButton(){
	return document.getElementById("loginBtn");
}

function getSearchNav(){
	return document.getElementById("searchNav");
}

function getSelectionNav(){
	return document.getElementById("selectionNav");
}

function getCloseSelectionButton(){
	return document.getElementById("closeSelectionBtn");
}

function getPublishSelectedButton(){
	return document.getElementById("publishSelectedBtn");
}

function getUnpublishSelectedButton(){
	return document.getElementById("unpublishSelectedBtn");
}

function getDeleteSelectedButton(){
	return document.getElementById("deleteSelectedBtn");
}

function getNumSelection(){
	return document.getElementById("numSelection");
}

function getNewPostButtons(){
	return document.getElementsByClassName("btnNewPost");
}

function getSearchBar(){
	return document.getElementById("searchBar");
}

function getSearchContainer(){
	return document.getElementById("searchContainer");
}

function getClearSearchBtn(){
	return document.getElementById("clearSearchBtn");
}

function getSearchBtn(){
	return document.getElementById("searchBtn");
}

function getDisplayPostDropDown(){
	return document.getElementById("displayPostDropDown");
}

function getAllFilterDropDownElement(){
	return document.getElementById("allFilter");
}

function getPublishedFilterDropDownElement(){
	return document.getElementById("publishedFilter");
}

function getDraftsFilterDropDownElement(){
	return document.getElementById("draftsFilter");
}

function getSelectAllCheckbox(){
	return document.getElementById("selectAllCheckbox");
}

function getPostItems(){
	return document.getElementsByClassName("post");
}

function getMenuItems(){
	return document.getElementsByClassName("menuItems");
}

function getMenuIcons(){
	return document.getElementsByClassName("menuIcon");
}

function getPostCheckboxes(){
	return document.getElementsByClassName("postCheckbox");
}

function getPublishOrUnpublishPostButton(){
	return document.getElementsByClassName("publishBtn");
}

function getDeletePostButton(){
	return document.getElementsByClassName("deleteBtn");
}

function getPreviewPostButton(){
	return document.getElementsByClassName("previewBtn");
}

function getSharePostButtons(){
	return document.getElementsByClassName("shareBtn");
}

function getAnalyticsPostButtons(){
	return document.getElementsByClassName("analyticsBtn");
}

function getPosts(){
	return document.getElementsByClassName("post");
}

function clickListener(event){
	var element = event.target;
	switch(element.id){
		case "loginBtn":
			let loginPasswordInput = getLoginPasswordInput();
			if(loginPasswordInput.value.length == 0){
				showLoginPasswordInputError();
				setLoginPasswordInputError("<p>Please enter a password</p>");
			}else{
				let password = loginPasswordInput.value;
				hideLoginModal();
				showProgressBarModal();
				sendLoginRequestToServer(password);
			}
		break;

		case "closeSelectionBtn":
			deselectAllPosts();
			checkSelectedPosts();
		break;

		case "publishSelectedBtn":
			alert("publish selected button");
		break;

		case "unpublishSelectedBtn":
			alert("unpublish selected button");
		break;

		case "deleteSelectedBtn":
			alert("delete selected button");
		break;

		case "newPostBtn":
			window.open("editor.html", "_self");
		break;

		case "clearSearchBtn":
			var searchBar = getSearchBar();
			searchBar.value = "";
			searchBar.focus();
			searchBarChangeListener("");
			displayPosts();
		break;

		case "searchBtn":
			displayPosts();
		break;
	}
}

function searchBarFocusListener(){
	var searchContainer = getSearchContainer();
	searchContainer.className = "searchContainerFocus";
}

function searchBarUnfocusListener(){
	var searchContainer = getSearchContainer();
	searchContainer.className = "searchContainerNoFocus";
}

function searchBarChangeListener(value){
	var clearSearchBtn = getClearSearchBtn();
	if(value.length > 0){
		clearSearchBtn.style.display="block";
	}else{
		clearSearchBtn.style.display="none";
	}
}

function stopClickPropagation(e){
	if(!e) e = window.event;
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}

function displayPosts(){
	var searchBar = getSearchBar();
	var displayPostDropDown = getDisplayPostDropDown();
	alert("Search for : " + searchBar.value + " Filter : " + displayPostDropDown.value);
}

function selectAllPosts(){
	var postCheckboxes = getPostCheckboxes();
	for(var i = 0; i < postCheckboxes.length; i++){
		postCheckboxes[i].checked = true;
	}
}

function deselectAllPosts(){
	var postCheckboxes = getPostCheckboxes();
	for(var i = 0; i < postCheckboxes.length; i++){
		postCheckboxes[i].checked = false;
	}
}

function checkSelectedPosts(){
	checkAPostSelected();
	checkAllPostsSelected();
}

function checkAPostSelected(){
	var searchNav = getSearchNav();
	var selectionNav = getSelectionNav();
	var postCheckboxes = getPostCheckboxes();
	var numSelection = getNumSelection();
	var isAPostSelected = false;
	var numPostsSelected = 0;
	for(var i = 0; i < postCheckboxes.length; i++){
		if(postCheckboxes[i].checked){
			isAPostSelected = true;
			numPostsSelected++;
		}
	}
	if(isAPostSelected){
		searchNav.style.display = "none";
		selectionNav.style.display = "block";
		numSelection.textContent = numPostsSelected + " selected";
	}else{
		searchNav.style.display = "block";
		selectionNav.style.display = "none";
	}
}

function checkAllPostsSelected(){
	var selectAllCheckbox = getSelectAllCheckbox();
	var postCheckboxes = getPostCheckboxes();
	var isAllPostsSelected = true;
	for(var i = 0; i < postCheckboxes.length; i++){
		if(!postCheckboxes[i].checked){
			isAllPostsSelected = false;
			break;
		}
	}
	selectAllCheckbox.checked = isAllPostsSelected;
}

function setLoginPasswordInputError(value){
	let loginPasswordInputError = getLoginPasswordInputError();
	loginPasswordInputError.innerHTML = value;
}

function hideLoginPasswordInputError(){
	let loginPasswordInputError = getLoginPasswordInputError();
	loginPasswordInputError.style.display = "none";
}

function showLoginPasswordInputError(){
	let loginPasswordInputError = getLoginPasswordInputError();
	loginPasswordInputError.style.display = "block";
}
 
function hideModal(){
	let modalBackground = getModalBackground();
	modalBackground.style.display = "none";
}

function showModal(){
	let modalBackground = getModalBackground();
	modalBackground.style.display = "block";
}

function showLoginModal(){
	let loginModal = getLoginModal();
	loginModal.style.display = "block";
}

function hideLoginModal(){
	let loginModal = getLoginModal();
	loginModal.style.display = "none";
}

function showProgressBarModal(){
	let progressBarModal = getProgressBarModal();
	progressBarModal.style.display = "block";
}

function hideProgressBarModal(){
	let progressBarModal = getProgressBarModal();
	progressBarModal.style.display = "none";
}

function ajaxDashboardAccessResponseHandler(){
	if(ajaxRequest.getReadyState() == 4 && ajaxRequest.getStatus() == 200){	
		let isLoggedIn = ajaxRequest.getResponseText();
		if(isLoggedIn == "true"){
			hideModal();
			hideProgressBarModal();
		}else{
			showModal();
			showLoginModal();
		}
	}
}

function ajaxLoginRequestResponseHandler(){
	if(ajaxRequest.getReadyState() == 4 && ajaxRequest.getStatus() == 200){	
		let isLoggedIn = ajaxRequest.getResponseText();
		if(isLoggedIn == "true"){
			sendRetrieveDataRequestToServer();
		}else{
			showModal();
			showLoginModal();
			showLoginPasswordInputError();
			setLoginPasswordInputError("<p>Password is not correct</p>");
		}
	}
}

function ajaxRetrieveDataResponseHandler(){
	if(ajaxRequest.getReadyState() == 4 && ajaxRequest.getStatus() == 200){	
		let jsonString = ajaxRequest.getResponseText();
		let jsonObj = JSON.parse(jsonString);

		hideProgressBarModal();
		hideModal();

		loadPostData(jsonObj);
	}
}

function loadPostData(jsonObj){
	postList = new Array();

	for(let i = 0; i < jsonObj.length; i++){
		postList.push(new Post(
			jsonObj[i].id,
			jsonObj[i].isPublished,
			jsonObj[i].title,
			jsonObj[i].content,
			convertFromTimestampToJSDate(jsonObj[i].created)
		));
	}

	postList.sort(function(q1, q2){
		return q2.created - q1.created;
	});

	updatePostAnalytics();//update the number of all posts, number of published/draft posts etc
	updatePosts();
}

function getNumberOfPublishedPosts(){
	let numPublishedPosts = 0;
	for(let i = 0; i < postList.length; i++){
		if(postList[i].isPublished == "true"){
			numPublishedPosts++;
		}
	}
	return numPublishedPosts;
}

function updatePostAnalytics(){
	let allFilter = getAllFilterDropDownElement();
	let publishedFilter = getPublishedFilterDropDownElement();
	let draftsFilter = getDraftsFilterDropDownElement();

	let numPosts = postList.length;

	allFilter.textContent = "All (" + numPosts + ")";
	publishedFilter.textContent = "Published (" + getNumberOfPublishedPosts() + ")";
	draftsFilter.textContent = "Drafts (" + (numPosts - getNumberOfPublishedPosts()) + ")";
}

function updatePosts(){
	updatePostLayout();
	setEventListeners();
}

function updatePostLayout(){
	let searchText = getSearchBar();
	let filterDropDown = getDisplayPostDropDown();

	let searchObj = new SearchObj(searchText.value, filterDropDown.value);

	let html = "";

	for(let i = 0; i < postList.length; i++){
		if(postList[i].equals(searchObj)){
			
			let id = postList[i].id;
			let isPublished = postList[i].isPublished == "true";
			let title = postList[i].title;
			let content = postList[i].content;
			let created = postList[i].created;

			let isPublishedLayout = isPublished ? ">Published" : "style='color:orange;'>Draft";
			let publishIcon = isPublished ? "ic_unpublish.png" : "ic_publish.png";
			let publishTitle = isPublished ? "Unpublish" : "Publish";
			let dateCreated = months[created.getMonth()] + " " + created.getDate();

			html += 
			"<table id='"+id+"' class='post'>" +
					"<tr>" +
						"<td>" +
							"<input class='postCheckbox' type='checkbox'/>" +
						"</td>" +
						"<td>" +
							"<table>" +
								"<tr>" +
									"<td>"+title+"</td>" +
									"<td>" +
										"<span>" +
											"<span class='menuItems'>" +
												"<button class='postActionBtn'><img class='publishBtn' src='images/icons/"+publishIcon+"'  width='24px' height='24px' title='"+publishTitle+"'/></button>" +
												"<button class='postActionBtn'><img class='deleteBtn' src='images/icons/ic_delete.png'  width='24px' height='24px' title='Delete post'/></button>" +
												"<button class='postActionBtn'><img class='previewBtn' src='images/icons/ic_eye.png'  width='24px' height='24px' title='Preview post'/></button>" +
											"</span>" + 
											"<button class='postActionBtn menuIcon'><img class='ellipsesBtn' src='images/icons/ic_ellipses.png'  width='24px' height='24px'/></button>" +
										"</span>" +
									"</td>" +
								"</tr>" +
								"<tr>" +
									"<td><span "+isPublishedLayout+ "</span> &#183; "+dateCreated+"</td>" +
									"<td>" +
										"<span>" +
											"<button class='postActionBtnSmall' style='margin-right: 16px;'><img class='shareBtn' src='images/icons/ic_share.png'  width='18px' height='18px' title='Share post'/></button>" +
											"<span>" +
												"0<button class='postActionBtnSmall'><img class='analyticsBtn' src='images/icons/ic_chart.png'  width='18px' height='18px' title='View analytics'/></button>" +
											"</span>" +
										"</span>" +
									"</td>" +
								"</tr>" +
							"</table>" +
						"</td>" +
					"</tr>" +
				"</table>";
		}
	}

	document.getElementById("postContainer").innerHTML = html;
}

function Post(id, isPublished, title, content, created){
	this.id = id;
	this.isPublished = isPublished;
	this.title = title;
	this.content = content;
	this.created = created;

	this.equals = function (searchObj){
		if(this.isPublished.toLowerCase() == searchObj.filter.toLowerCase() || searchObj.filter.toLowerCase() == "all"){
			if(
			this.title.toLowerCase().trim().indexOf(searchObj.searchText.toLowerCase().trim()) != -1 ||
			this.content.toLowerCase().indexOf.trim(searchObj.searchText.toLowerCase().trim()) != -1 
			){
				return true;
			}
		}
		return false;
	};
}

function SearchObj(searchText, filter){
	this.searchText = searchText;
	this.filter = filter;
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

function convertFromTimestampToJSDate (timestamp) {
	//spit timestamp into [Y, M, D, h, m, s]
	var t = timestamp.split(/[- :]/);
	
	//apply each element to the Date function
	var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3]-1, t[4], t[5]));
	
	return d;
}

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];