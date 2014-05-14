;(function($){
	'use strict';
	// create the config to tell where the oemiv.js starts 
	var oemiv_config ={
		video_thumbnail_container: $('#video-list'), 
		video_diplay_title:$('#video-title'),
		video_diplay_description : $('#video-description'),
		video_diplay_embed: $('#video-embed'),
		
		video_thumbnail_template: $('#video-template'),

	};


	Oemiv.init(oemiv_config);// oemiv start with oemiv_config
})(window.jQuery);

// this script has to run parallelly with Oemiv.js
// we just break javascript files separately
// and also your Oemiv.js as a template for the otehr html file