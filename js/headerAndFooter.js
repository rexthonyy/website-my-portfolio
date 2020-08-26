window.onload = function(){
	window.onscroll = scrollListener;
}

function scrollListener(){
	notifyNavBarListener();
}

function notifyNavBarListener(){
	if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
		getNavBar().className="nav_translucent";
	}else{
		getNavBar().className="nav_transparent";
	}
}

function getNavBar(){
	return document.getElementById("nav");
}