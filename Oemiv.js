/*
To allow outside scripts to access pieces of our sandbox, we need
to give it a name. This name should be something you're pretty
sure wont be used by any other script you might include on your site.
*/
var Oemiv = (function($) {
    // start out just like usual
    'use strict';

    /*
    To help visualize which parts of our sandbox are visible to the
    outside world, I like to prefix private variables with an
    underscore. Then I can know just by looking which parts are
    private and which are public.

    This is not required! It's just a technique that I find helpful.

    The variables below are available only to our sandbox. The outside
    world cannot see any of the 3 variables below.
    */

    // URL to get videos from the Staff Picks channel
    var _vimeo_channel_url = 'http://vimeo.com/api/v2/channel/staffpicks/videos.json';

    // URL to get video embed code
    var _vimeo_video_url = 'http://vimeo.com/api/oembed.json?width=500&height=281';

    ///variables to reference element where the thumbnails should be added
    var _$video_thumbnail_container;

    var _$video_diplay_title;
    var _$video_diplay_description;
    var _$video_diplay_embed;

    var _video_thumbnail_template;
     

    // set up a click handler for each video in the <ul>
    var _setup_event_listener = function() {
        _$video_thumbnail_container.on('click', 'a', function(e) {
            e.preventDefault();

            // remove selected class from all thumbnails
            //target any a tag inside of the video_list
            _$video_thumbnail_container.find('a').removeClass('selected');

            // add selected class to this thumbnail
            $(this).addClass('selected');
            // tell our Oemiv object to get the video at the clicked link's URL
            Oemiv.get_video(this.href);
        });
    };

    

    /*
    Anything inside this return object is a accessible outside the sandbox.
    Property names inside this object do not start with an underscore because
    they are visible to the outside world.
    */
    return {
        // function to get a list of all available videos
        init: function(config) {
            // store the user supplied confid value in Oemiv's private variable
            _$video_thumbnail_container = config.video_thumbnail_container;
            _$video_diplay_title = config.video_diplay_title;
            _$video_diplay_description = config.video_diplay_description;
            _$video_diplay_embed = config.video_diplay_embed;
            _video_thumbnail_template = _.template(config.video_thumbnail_template.html());

            $.getScript(_vimeo_channel_url + '?callback=Oemiv.list_videos');
            // call our private function to set up the event listener on the thumbnails
            _setup_event_listener();
        },
        // add a function to our Oemiv global object to be called by the Vimeo API
        // this function will display thumbnails of all videos returned by the API
        list_videos: function(videos) {


            // variables needed in the loop below
            var video_values, video_markup;

            // add the videos to the gallery
            for (var i = 0; i < videos.length; i++) {
                video_values ={
                    url: videos[i].url,
                    image: videos[i].thumbnail_small
                };

                video_markup =  _video_thumbnail_template(video_values);

                // append the <li> to the container
                _$video_thumbnail_container.append(video_markup);
            }
        },
        // function to get a single video from Vimeo
        get_video: function(url) {
            $.getScript(_vimeo_video_url + '&url=' + url + '&callback=Oemiv.display_video');
        },
        // function to display a single video on the page
        display_video: function(video) {

            // add the video title to the DOM
             _$video_diplay_title.text(video.title);// find it in script.js

            // add the video description to the DOM
             _$video_diplay_description.text(video.description);//find it in script.js

            // add the video embed code to the page
            // notice we're using the html function here, as we need to
            // inject markup into the DOM (instead of just text)
            _$video_diplay_embed.html(video.html);//find it in script.js
        }

        //var new_video = video_template(template_values);
        //$('#video-list').append(new_video)
    };
})(window.jQuery);

