// variable to hold app id
var app_id = 'app_id=ee84c96b';
// variable to hold app key
var app_key = 'app_key=3aa60311a1e7234f876e281f65056dbe';

// variable to hold place types
var place_types = "JamCam";

// variable to hold mosaic links
var mosaic_links = $("#mosaic-links");

// variable to navbar
var navbar = $(".navbar");

// variable to hold image mosaic
var mosaic_image = $("#mosaic-image");

// variable to hold video mosaic
var mosaic_video = $("#mosaic-video");

// variable to hold small size mosaic
var mosaic_size_small = "width='100' height='82' style='width: 100px; height: 82px;'";
// variable to hold large size mosaic
var mosaic_size_medium = "width='200' height='164' style='width: 200px; height: 164px;'";
// variable to hold large size mosaic
var mosaic_size_large = "width='352' height='288' style='width: 352px; height: 288px;'";

// set navbar function
function set_navbar(type) {
    if (type === "image") {
        $("#navbar-link-mosaic-video").removeClass("active");
        $("#navbar-link-mosaic-image").addClass("active");
    } else if (type === "video") {
        $("#navbar-link-mosaic-image").removeClass("active");
        $("#navbar-link-mosaic-video").addClass("active");
    }
    $("#navbar-link-size-small, #navbar-link-size-medium").removeClass("active");
    $("#navbar-link-size-large").addClass("active");
}

// build mosaic function
function build_mosaic(type, size) {
    // if type is image
    if (type === "image") {
        $.ajax({
            // URL to GET data from
            url: 'https://api.tfl.gov.uk/Place/Type/' + place_types + '?' + app_id + '&' + app_key
        }).then(function (jam_cams) {
            mosaic_image.empty();
            $.each(jam_cams, function (key, val) {
                $("#mosaic-image").append("<img class='lazyload' data-src='" + val.additionalProperties[1].value + "'" + size + "alt=''>");
            })
        });
    // if type is video
    } else if (type === "video") {
        $.ajax({
            // URL to GET data from
            url: 'https://api.tfl.gov.uk/Place/Type/' + place_types + '?' + app_id + '&' + app_key
        }).then(function (jam_cams) {
                mosaic_video.empty();
                $.each(jam_cams, function (key, val) {
                    $("#mosaic-video").append(
                        "<video class='lazyload align-bottom' " + size + " controls preload='none'>" +
                        "<source src='" + val.additionalProperties[2].value + "' type='video/mp4'>" +
                        "</video>"
                    );
                })
        });
    }
}

// on click event
$("#navbar-brand").click(function(e) {
    e.preventDefault();

    mosaic_image.empty().hide();
    mosaic_video.empty().hide();
    navbar.hide();
    mosaic_links.show();
});

// on click event
$("#mosaic-link-image, #navbar-link-mosaic-image").click(function(e) {
    e.preventDefault();

    mosaic_links.hide();
    mosaic_video.empty().hide();
    build_mosaic("image", mosaic_size_large);
    set_navbar("image");
    navbar.show();
    mosaic_image.show();
});

// on click event
$("#mosaic-link-video, #navbar-link-mosaic-video").click(function(e) {
    e.preventDefault();

    mosaic_links.hide();
    mosaic_image.empty().hide();
    build_mosaic("video", mosaic_size_large);
    set_navbar("video");
    navbar.show();
    mosaic_video.show();
});

// on click event
$("#navbar-link-size-small").click(function(e) {
    e.preventDefault();
    if ($("#navbar-link-mosaic-image").hasClass("active")) {
        mosaic_video.empty().hide();
        build_mosaic("image", mosaic_size_small);
    } else {
        mosaic_image.empty().hide();
        build_mosaic("video", mosaic_size_small);
    }
    $("#navbar-link-size-medium, #navbar-link-size-large").removeClass("active");
    $("#navbar-link-size-small").addClass("active");
});

// on click event
$("#navbar-link-size-medium").click(function(e) {
    e.preventDefault();
    if ($("#navbar-link-mosaic-image").hasClass("active")) {
        mosaic_video.empty().hide();
        build_mosaic("image", mosaic_size_medium);
    } else {
        mosaic_image.empty().hide();
        build_mosaic("video", mosaic_size_medium);
    }
    $("#navbar-link-size-small, #navbar-link-size-large").removeClass("active");
    $("#navbar-link-size-medium").addClass("active");
});

// on click event
$("#navbar-link-size-large").click(function(e) {
    e.preventDefault();
    if ($("#navbar-link-mosaic-image").hasClass("active")) {
        mosaic_video.empty().hide();
        build_mosaic("image", mosaic_size_large);
    } else {
        mosaic_image.empty().hide();
        build_mosaic("video", mosaic_size_large);
    }
    $("#navbar-link-size-small, #navbar-link-size-medium").removeClass("active");
    $("#navbar-link-size-large").addClass("active");
});

// hide navvar
navbar.hide();
// hide image mosaic
mosaic_image.hide();
// hide video mosaic
mosaic_video.hide();