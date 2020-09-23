<?php	
	abstract class Column {
		//all
		const ID = "id";
		
		//blog_tb
		const ISPUBLISHED = "isPublished";
		const TITLE = "title";
		const CONTENT = "content";
		const CREATED = "created";
		const LAST_UPDATED = "last_updated";
		
		//image_tb
		const NAME = "name";
		const IMAGE_LINK = "image_link";

		//analytics_tb
		const BLOG_ID = "blog_id";
		const IP_ADDRESS = "ip_address";
		const REFERRER = "referrer";
	}
?>