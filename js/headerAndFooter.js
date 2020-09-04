window.onload = function(){
	window.onscroll = scrollListener;
	window.onclick = windowClickListener;
	getNavHamburger().onclick = windowClickListener;
	loadSkills();
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
	}else{
		isChecked = true;
		checkbox.checked = true;
	}
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
	var index = undefined;
	var sections = getSection();
	for(var i = 0; i < sections.length; i++){
		var section = sections[i].getBoundingClientRect();
		if(section.top > 0){
			index = i;
			break;
		}
	}
	if(index != undefined){
		disableAllNavHeaderItems();
		setActiveNavHeader(index);
		notifyNavBarListener();
	}
}

function disableAllNavHeaderItems(){
	var activeItem = document.getElementsByClassName("nav_item_active")[0].className = "nav_item_inactive_translucent";
}

function setActiveNavHeader(index){
	switch(index){
		case 1: //home
			document.getElementById("nav_item_home").className = "nav_item_active";
		break;

		case 2: //home
			document.getElementById("nav_item_about").className = "nav_item_active";
		break;

		case 3: //services
			document.getElementById("nav_item_services").className = "nav_item_active";
		break;

		case 4: //Portfolio
			document.getElementById("nav_item_portfolio").className = "nav_item_active";
		break;

		case 5: //Pricing
			document.getElementById("nav_item_pricing").className = "nav_item_active";
		break;
	}
}

function getSection(){
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

function loadSkills(){
	var skills = [];
	skills.push(new Skill("UI/UX Design", 83));
	skills.push(new Skill("Web Design", 92));
	skills.push(new Skill("App development", 87));
	skills.push(new Skill("SEO", 92));

	loadSkillLayout(skills);
}

function loadSkillLayout(skills){
	var skillElements = getSkillElements();
	for(var i = 0; i < skillElements.length; i++){
		var innerHTML = "";
		var skillElm = skillElements[i];
		for(var j = 0; j < skills.length; j++){
			var skill = skills[j];
			
			innerHTML += "<h3>"+skill.name+"</h3><h4>"+skill.percent+"%</h4><div class=\"skill_bar_background\"><div style=\"width:"+skill.percent+"%\" class=\"skill_bar_progress\"></div></div>";
		}
		skillElm.innerHTML = innerHTML;
	}
}

function Skill(name, percent){
	this.name = name;
	this.percent = percent;
}

function getSkillElements(){
	var skillElements = [];
	skillElements.push(document.getElementById("skills"));
	skillElements.push(document.getElementById("skills2"));
	return skillElements;
}