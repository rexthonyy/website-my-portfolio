window.onload = function(){
	window.onscroll = scrollListener;
}

function scrollListener(){
	notifyNavBarListener();
}

function notifyNavBarListener(){
	var navBar = getNavBar();
	var inactiveNavItems = getInactiveNavItems();

	if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
		navBar.className="nav_translucent";
		
		for(var i = 0; i < inactiveNavItems.length; i++){
			inactiveNavItems[i].className = "nav_item_inactive_translucent";
		}
	}else{
		navBar.className="nav_transparent";

		for(var i = 0; i < inactiveNavItems.length; i++){
			inactiveNavItems[i].className = "nav_item_inactive_transparent";
		}
	}
}

function getNavBar(){
	return document.getElementById("nav");
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
