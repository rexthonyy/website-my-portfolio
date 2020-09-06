window.onload = function(){
	setEventListeners();
}

function setEventListeners(){
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

function setCloseSelectionClickListener(){
	var closeSelectionBtn = getCloseSelectionButton();
	closeSelectionBtn.onclick = clickListener;
}

function setPublishSelectedButtonClickListener(){
	var publishSelectedBtn = getPublishSelectedButton();
	publishSelectedBtn.onclick = clickListener;
}

function setUnpublishSelectedButtonClickListener(){
	var unpublishSelectedBtn = getUnpublishSelectedButton();
	unpublishSelectedBtn.onclick = clickListener;
}

function setDeleteSelectedButtonClickListener(){
	var deleteSelectedBtn = getDeleteSelectedButton();
	deleteSelectedBtn.onclick = clickListener;
}

function setNewPostListener(){
	var newPostBtns = getNewPostButtons();
	for(var i = 0; i < newPostBtns.length; i++){
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
			menuItems[this.id].style.display = "block";
			menuIcons[this.id].style.display = "none";
		});
		postItems[i].addEventListener("mouseout", function(){
			var menuItems = getMenuItems();
			var menuIcons = getMenuIcons();
			menuItems[this.id].style.display = "none";
			menuIcons[this.id].style.display = "block";
		});
	}
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
			// window.open("editor.php", "_self");
			alert("create a new post");
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