<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<!-- SEO Description -->
        <meta name="description" content="Rex Anthony is a web developer.">
		<title>Preview</title>
		<link type="text/css" rel="stylesheet" href="css/headerAndFooter.css"/>
		<link type="text/css" rel="stylesheet" href="css/preview.css"/>
		<link type="text/css" rel="stylesheet" href="css/blog.css"/>
		<link type="text/css" rel="stylesheet" href="css/dialog.css"/>
		<link type="image/x-icon" rel="icon" href="images/icons/my_header_icon.png"/>
		<script type="text/javascript" src="js/preview.js"></script>
		<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	</head>

	<body>
		<!--The top navigation-->
		<div id="header">
			<div>
				<p>PREVIEW</p>
			</div>
		</div>
		
		<!--The content of the blog-->
		<div id="bodyContainer">
			<div id="bodyContent">
				<!-- <div>
					<h1><a href="#">Introducing Fingerprint Lock for Android</a></h1>
					<p>
						Earlier this year, we rolled out Touch ID and Face ID for iPhone to provide an extra layer of security for WhatsApp users. Today we’re introducing similar authentication, allowing you to unlock the app with your fingerprint, on supported Android phones. To enable it, tap Settings > Account > Privacy > Fingerprint lock. Turn on Unlock with fingerprint, and confirm your fingerprint.
					</p>
					<img class="blogImg" src="images/pics/sample.PNG" alt="somehting"/>
					<div class="blogFooter">
						<time>September 1, 2020</time>
						<div>
							<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
							<a href="https://www.facebook.com/sharer/sharer.php?u=rexthonyy.github.io/website-my-portfolio" target="_blank"><img class="fb_share" src="images/icons/facebook_share_icon.png" alt="facebook share button"/></a>
						</div>
					</div>
				</div> -->
			</div>
		</div>

		<!--The top navigation-->
		<footer>
			<img src="images/icons/my_header_icon.png" alt="my icon"/>
			<div id="socialMediaHandlesFooter">
				<a href="https://facebook.com/rex.anthony.336" target="_blank"><img src="images/icons/facebook_round_icon.png" alt="facebook icon"/></a>
				<a href="https://twitter.com/rexthony" target="_blank"><img src="images/icons/twitter_round_icon.png" alt="twitter icon"/></a>
				<a href="https://instagram.com/rexthonyy" target="_blank"><img src="images/icons/instagram_round_icon.png" alt="instagram icon"/></a>
				<a href="https://github.com/rexthonyy" target="_blank"><img src="images/icons/github_round_icon.png" alt="github icon"/></a>
			</div>
			<address>
				rexthonyy@gmail.com
			</address>
			<div id="footerNav">
				<ul>
					<li><a href="index.html#heroBg">Home</a></li>
					<li><a href="index.html#abt">About</a></li>
					<li><a href="index.html#services">Services</a></li>
					<li><a href="index.html#portfolio">Portfolio</a></li>
					<li><a href="blog.html">Blog</a></li>
				</ul>
			</div>
			<p>
				This website was developed by myself
			</p>
		</footer>

		<!--The modal background-->
		<div id="modalBackground">
			<div class="dialog" id="progressBarModal">
				<img id="progressBarImage" src="images/gifs/loading_bar.gif"/>
			</div>
		</div>	

		<!-- Hidden elements -->
		<input id="id" type="hidden" value="<?php echo $_GET['id']; ?>"/>
	</body>
</html>