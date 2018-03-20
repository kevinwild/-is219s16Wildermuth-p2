// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;

	}

}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	console.log('swap photo');

}

$(document).ready( function() {
	//$('.details').hide();
	// Get JSON store it in IMGS object
	imgJson = $.getJSON('images.json',function(response){
		GalleryImage(response);
		
	})
	
});
function GalleryImage(rawCall) {
	if(rawCall != null){
		imgJson = rawCall;

		imgDesc = imgJson.images[0]['description']
		imgLoc = imgJson.images[0]['imgLocation']
		imgDate = imgJson.images[0]['date']
		imgPath = imgJson.images[0]['imgPath']

		$('#photo').attr("src", imgPath);
		changeDetails(imgLoc, imgDesc, imgDate);

	}
}
function changeDetails(ploc,pdesc,pdate){
	$('#spanLoc').html(ploc);
	$('#spanDesc').html(pdesc);
	$('#spanDate').html(pdate);
}


