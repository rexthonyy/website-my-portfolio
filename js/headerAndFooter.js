function loadHeaderAndFooterJS(){
	window.onscroll = scrollListener;
	notifyNavItemListener();
	
	isClickedHamburger = false;
	isChecked = false;
	checkboxEffect = null;

	var checkbox = getCheckbox();
	checkbox.onchange = function(event){
		// alert("checkbox");
		var element = event.target;
		if(element.id == "check"){
			checkboxEffect();
			isClickedHamburger = false;
		}
	};

	window.onclick = windowClickListener;
	getNavHamburger().onclick = navHamburgerListener;
}
function windowClickListener(){
	// alert("window");
	var checkbox = getCheckbox();
	if(isChecked){
		if(isClickedHamburger){
			checkboxEffect = closeNav;
		}else{
			closeNav();
		}
	}
}

function navHamburgerListener(){
	// alert("hamburger");
	isClickedHamburger = true;
	var checkbox = getCheckbox();
	if(isChecked){
		checkboxEffect = closeNav;
	}else{
		checkboxEffect = openNav;
	}
}

function openNav(){
	getCheckbox().checked = true;
	isChecked = true;
}

function closeNav(){
	getCheckbox().checked = false;
	isChecked = false;
}

function scrollListener(){
	notifyNavBarListener();
	notifyNavItemListener();
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

function notifyNavItemListener(){
	let index = undefined;
	let sections = getSections();
	for(let i = 0; i < sections.length; i++){
		let section = sections[i].getBoundingClientRect();
		if(section.top > 0){
			break;
		}else{
			index = i;
		}
	}
	if(index != undefined){
		disableAllNavHeaderItems();
		setActiveNavHeader(index);
		notifyNavBarListener();
	}
}

function disableAllNavHeaderItems(){
	let navItems = document.getElementsByClassName("nav_item_active");
	for(let i = 0; i < navItems.length; i++){
		navItems[i].className = "nav_item_inactive_translucent";
	}
}

function setActiveNavHeader(index){
	switch(index){
		case 0: //home
			document.getElementById("nav_item_home").className = "nav_item_active";
		break;

		case 1: //about
			document.getElementById("nav_item_about").className = "nav_item_active";
		break;

		case 2: //services
			document.getElementById("nav_item_services").className = "nav_item_active";
		break;

		case 3: //Portfolio
			document.getElementById("nav_item_portfolio").className = "nav_item_active";
		break;

		case 4: //Pricing
			document.getElementById("nav_item_pricing").className = "nav_item_active";
		break;
	}
}

function getSections(){
	return document.getElementsByTagName("section");
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