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
var swapPosition = 0; // keeps track of imgJson position, limit will reset at dynamic length 
function swapPhoto() {
	console.log('swap photo');
	GalleryImage(null);
}

$(document).ready( function() {
	//$('.details').hide();
	// Get JSON store it in IMGS object
	imgJson = $.getJSON('images.json',function(response){
		GalleryImage(response);
		
	})
	
});
function GalleryImage(rawCall) {
// Initialize the first image on load before swap is called
	if(rawCall != null){
		imgJson = rawCall;
		imgDesc = imgJson.images[swapPosition]['description']
		imgLoc = imgJson.images[swapPosition]['imgLocation']
		imgDate = imgJson.images[swapPosition]['date']
		imgPath = imgJson.images[swapPosition]['imgPath']
		$('#photo').attr("src", imgPath);
		changeDetails(imgLoc, imgDesc, imgDate);
		swapPosition++;
		return true;
	}
	if(swapPosition >= imgJson.images.length){
		swapPosition = 0;
	}
	else{
		imgDesc = imgJson.images[swapPosition]['description']
		imgLoc = imgJson.images[swapPosition]['imgLocation']
		imgDate = imgJson.images[swapPosition]['date']
		imgPath = imgJson.images[swapPosition]['imgPath']
		$('#photo').attr("src", imgPath);
		changeDetails(imgLoc, imgDesc, imgDate);
		swapPosition++;

	}




}

function changeDetails(ploc,pdesc,pdate){
	$('#spanLoc').html(ploc);
	$('#spanDesc').html(pdesc);
	$('#spanDate').html(pdate);
}


