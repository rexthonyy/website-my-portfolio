window.onload = function(){
	setEventListeners();
}

function setEventListeners(){
	setNewPostListener();
	setSearchBarFocusListener();
	setSearchBarChangeListener();
	setClearSearchBarButtonListener();
	setSearchButtonListener();
	setDisplayPostDropDownSelectionListener();
	setSelectAllCheckboxistener();
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

function clickListener(event){
	var element = event.target;
	switch(element.id){
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

function displayPosts(){
	var searchBar = getSearchBar();
	var displayPostDropDown = getDisplayPostDropDown();
	alert("Search for : " + searchBar.value + " Filter : " + displayPostDropDown.value);
}

function selectAllPosts(){
	alert("Selecting all posts");
}

function deselectAllPosts(){
	alert("Deselecting all posts");
}

function checkSelectedPosts(){
	alert("Checking selected posts");
}