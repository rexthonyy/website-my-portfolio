window.onload = function(){
	window.onscroll = scrollListener;
	window.onclick = windowClickListener;
}

function windowClickListener(){
	var checkbox = getCheckbox();
	checkbox.onchange = function(event){
		var element = event.target;
		if(element.id == "check"){
			if(element.checked){
				isChecked = true;
			}else{
				isChecked = false;
			}
		}
	};
	if(isChecked){
		isChecked = false;
		checkbox.checked = false;
	}
}
function scrollListener(){
	notifyNavBarListener();
}

function notifyNavBarListener(){
	var navBar = getNavBar();
	var navItemContainer = getNavItemContainer();
	var inactiveNavItems = getInactiveNavItems();
	var navHamburger = getNavHamburger();

	if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
		navBar.className="nav_translucent";
		navHamburger.className = "checkbtn_translucent";
		navItemContainer.className = "nav_item_container_translucent";
		for(var i = 0; i < inactiveNavItems.length; i++){
			inactiveNavItems[i].className = "nav_item_inactive_translucent";
		}
	}else{
		navBar.className="nav_transparent";
		navHamburger.className = "checkbtn_transparent";
		navItemContainer.className = "nav_item_container_transparent";
		for(var i = 0; i < inactiveNavItems.length; i++){
			inactiveNavItems[i].className = "nav_item_inactive_transparent";
		}
	}
}

function getCheckbox(){
	return document.getElementById("check");
}

function getNavBar(){
	return document.getElementById("nav");
}
function getNavItemContainer(){
	return document.getElementById("nav_item_container");
}
function getInactiveNavItems(){
	var inactiveNavItems = [];
	var inactiveNavItems1 = document.getElementsByClassName("nav_item_inactive_transparent");
	var inactiveNavItems2 = document.getElementsByClassName("nav_item_inactive_translucent");

	for(var i = 0; i < inactiveNavItems1.length; i++){
		inactiveNavItems.push(inactiveNavItems1[i]);
	}
	for(var i = 0; i < inactiveNavItems2.length; i++){
		inactiveNavItems.push(inactiveNavItems2[i]);
	}
	
	return inactiveNavItems;
}

function getNavHamburger(){
	return document.getElementById("nav_hamburger");
}
