// jq code
var controller;
// detect if mobile browser. regex -> http://detectmobilebrowsers.com
var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

if (isMobile) {
var myScroll;
$(document).ready(function () {
    // wrap for iscroll
    $("#content-wrapper")
        .addClass("scrollContainer")
        .wrapInner('<div class="scrollContent"></div>');

    // add iScroll
    myScroll = new IScroll('#content-wrapper', {scrollX: false, scrollY: true, scrollbars: true, useTransform: false, useTransition: false, probeType: 3, click: true});

    // update container on scroll
    myScroll.on("scroll", function () {
        controller.update();
    });

    // overwrite scroll position calculation to use child's offset instead of parents scrollTop();
    controller.scrollPos(function () {
        return -myScroll.y;
    });

    // refresh height, so all is included.
    setTimeout(function () {
        myScroll.refresh();
    }, 0);

    // manual set hight (so height 100% is available within scroll container)
    $(document).on("orientationchange", function () {
        $("section")
            .css("min-height", $(window).height())
            .parent(".scrollmagic-pin-spacer").css("min-height", $(window).height());
    });
    $(document).trigger("orientationchange"); // trigger to init
});
// init the controller
controller = new ScrollMagic.Controller({
    container: "#content-wrapper",
    globalSceneOptions: {
        triggerHook: "onLeave"
    }
});
} else {
// init the controller
controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onLeave"
    }
});
}
$(function () {
// set current version in cdn link(s)
var cdnLinks = [
    "cdnjs.cloudflare.com/ajax/libs/ScrollMagic/%version%/ScrollMagic.min.js",
    "cdnjs.cloudflare.com/ajax/libs/ScrollMagic/%version%/plugins/debug.addIndicators.min.js",
];
var cdnCode = cdnLinks.map(function(link) {
    return '<script src="//' + link.replace(/%version%/gim, ScrollMagic.version) + '"></script' + '>';
}).join("\n");

$("<pre>").text(cdnCode).appendTo("#get-it-now code.cdn");
});

$('#toggle.buttons a.has-code').click(function() {
  $('#get-it-now .item').removeClass('active');
  $('#toggle.buttons a').removeClass('active');

  $(this).addClass('active');
  $('#get-it-now .'+$(this).data('code')).addClass('active');

  $('#get-it-now').removeAttr('class').addClass($(this).data('code'));

  return false;
});

$("#start h1").wrapEach(/(.)/g, "<span>$1</span>");

// animations
var nervousHat = new TimelineMax({repeat: -1, yoyo: true})
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "+=5", left: "-=6", rotation: -3}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "-=10", left: "+=6", rotation: 0}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "+=5", left: "+=6", rotation: 3}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "-=5", left: "-=3", rotation: 1.5}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "+=5", left: "-=6", rotation: -1.5}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "+=5", left: "+=3", rotation: 0}))
    .add(TweenMax.to("#start .tophat", 0.3, {bottom: "-=10"}));
var abracadabra = TweenMax.fromTo("#start .wand", 1, {top: -$(window).height()/3, left: 370, rotation: 20}, {top: 10, rotation: -20});
var reveal = new TimelineMax()
    .add([
            TweenMax.to("#start .tophat", 1, {bottom: $(window).height(), left: "-=50", rotation: -20}),
            TweenMax.from("#start h1", 1, {scale: 0.2, top: "+=70"}),
            TweenMax.to("#start .wand", 0.8, {top: -$(window).height()/3, left: 450, rotation: 30}),
            TweenMax.to("#start .floor", 1, {autoAlpha: 0})
        ]);
var laola = new TimelineMax()
    .add(TweenMax.staggerTo("#start h1 span", 0.5, {top: -150, x: -75, scale: 2, color: '#ff4468' }, 0.2))
    .add(TweenMax.staggerTo("#start h1 span", 0.5, {top: 0, x: 0, scale: 1, color: '#fff'}, 0.2), 0.5);

// container pin
var startpin = new ScrollMagic.Scene({
        duration: 700
    })
    .setPin("section#start")
    .addTo(controller);

// msg scroll ani
new ScrollMagic.Scene({
        duration: 140,
        offset: -100
    })
    .setTween(TweenMax.to("#msg div.scroll", 1, {backgroundPosition: "0 13px", repeat: -1, delay: 1, repeatDelay: 2, ease: Linear.easeNone}))
    .addTo(controller);
// msg hide
new ScrollMagic.Scene({
        offset: 40
    })
    .setTween(TweenMax.to("#msg", 0.5, {bottom: -40}))
    .addTo(controller);

// hat movement
new ScrollMagic.Scene({
        duration: 300,
        offset: -100
    })
    .setTween(nervousHat)
    .addTo(controller);

// magic wand
new ScrollMagic.Scene({
        offset: 20,
        duration: 180
    })
    .on("end", function (e) {
        if (e.scrollDirection == "FORWARD" && startpin.progress() < 0.37) { // check pin progress so it doesnt launch on refresh
            // make it rain!
            $("#start .sparkpoint").sparkle({
                amount: 40,
                duration: 0.2
            });
        }
    })
    .setTween(abracadabra)
    .addTo(controller);

// big reveal
new ScrollMagic.Scene({
        duration: 300,
        offset: 260
    })
    .setTween(reveal)
    .addTo(controller);

// jumping text
new ScrollMagic.Scene({
        duration: 200,
        offset: 450
    })
    .setTween(laola)
    .addTo(controller);
  
 