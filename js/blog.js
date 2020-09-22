function loadBlogJS(){
	sendRetrieveDataRequestToServer();
}

function sendRetrieveDataRequestToServer(){
	ajaxRequest = new AjaxRequest();
	ajaxRequest.initialize();
	ajaxRequest.send("GET", "getPosts.req.php", ajaxRetrieveDataResponseHandler);
}

function getBodyContent(){
	return document.getElementById("bodyContent");
}

function getModalBackground(){
	return document.getElementById("modalBackground");
}

function getProgressBarModal(){
	return document.getElementById("progressBarModal");
}

function getId(){
	return document.getElementById("id");
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

function ajaxRetrieveDataResponseHandler(){
	if(ajaxRequest.getReadyState() == 4 && ajaxRequest.getStatus() == 200){	
		let jsonString = ajaxRequest.getResponseText();
		//console.log(jsonString);
		let jsonObj = JSON.parse(jsonString);

		loadPreview(jsonObj);

		hideProgressBarModal();
		hideModal();
	}
}

function loadPreview(jsonObj){
	let postList = new Array();
	for(let i = 0; i < jsonObj.length; i++){
		if(jsonObj[i].isPublished == "true"){
			postList.push(new Post(
				jsonObj[i].id,
				jsonObj[i].isPublished,
				jsonObj[i].title,
				jsonObj[i].content,
				convertFromTimestampToJSDate(jsonObj[i].created)
			));
		}
	}

	postList.sort(function(q1, q2){
		return q2.created - q1.created;
	});

	let innerHTML = "";

	for(let i = 0; i < postList.length; i++){

		if(i > 0){
			innerHTML += "<div class='spacer'></div>";
		}

		let dayNum = postList[i].created.getDate();
		let monthString = months[postList[i].created.getMonth()];
		let fullYear = postList[i].created.getFullYear();

		let date = monthString + " " + dayNum + ", " + fullYear;

		innerHTML += "<div>";
		innerHTML += "<h1><a href='post.php?id="+postList[i].id+"'>" + postList[i].title + "</a></h1>";
		innerHTML += postList[i].content;
		innerHTML += "<div class='blogFooter'><time>"+date+"</time><div><a href='https://twitter.com/share?hashtags=rexthonyy&text=Check out this post blog. Always keep it real' target='_blank'><img src='images/icons/twitter_share_icon.png' title='Share this post on Twitter'/></a><a href='https://www.facebook.com/sharer/sharer.php?u=rexthonyy.github.io/website-my-portfolio' target='_blank'><img class='fb_share' src='images/icons/facebook_share_icon.png' alt='facebook share button'/></a></div></div>";
		innerHTML += "</div>";
	}

	getBodyContent().innerHTML = innerHTML;
}

function Post(id, isPublished, title, content, created){
	this.id = id;
	this.isPublished = isPublished;
	this.title = title;
	this.content = content;
	this.created = created;
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