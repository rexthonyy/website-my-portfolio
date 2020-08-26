window.onload = function(){
	window.onscroll = scrollListener;
}

function getValue(){
	return document.getElementById("nav");
}

function getSection(index){
	return document.getElementsByTagName("section")[index];
}

function getHeader(){
	return document.getElementsByTagName("h1");
}
function setHeader(text){
	getValue().textContent = text;
}
function scrollListener(){
	var index;
	for(var i = 0; i < getHeader().length; i++){
		var header = getHeader()[i].getBoundingClientRect();
		if(header.top > 0){
			index = i;
			break;
		}
	}
	setHeader(index);
}