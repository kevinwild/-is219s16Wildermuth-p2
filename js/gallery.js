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
	if($('#initalLoad').val() != 0){
		GalleryImage(null);
		swapPosition++;
	}
}

$(document).ready( function() {
	$('.details').hide();
	// Prompt USER WHICH IMAGE LIBRARY THEY WANT TO LOAD?
	$('#exampleModal').modal({show: true, backdrop: 'static'});  
	$('#loadImgs').click(function(){
		$('#initalLoad').val('1');
		var galleryType = $("input:radio[name ='galleryType']:checked").val();
		// Get JSON store it in IMGS object
		imgJson = $.getJSON(galleryType+'.json',function(response){
			GalleryImage(response);	
		})
		$('#exampleModal').modal('hide');

	});



	//...... Control moreIndicator
	$('.moreIndicator').click(function(){
		if($('.details').css('display') == 'none'){
			$('.details').fadeIn();
			 $(this).addClass("rot270");


		}else{
			$('.details').fadeOut();
			$(this).removeClass("rot270");

		}
	});

	//...... Control prevPhoto
	$('#prevPhoto').click(function(){
		swapPosition--;
		GalleryImage(null);
	});
	//...... Control nextPhoto
	$('#nextPhoto').click(function(){
		swapPosition++;
		GalleryImage(null);
	});


	
});//... END .... Document onLoad
function GalleryImage(rawCall) {
// Initialize JSON OBJ and the first image on load before swap is called
	if(rawCall != null){

		imgJson = rawCall;
		imgDesc = imgJson.images[swapPosition]['description']
		imgLoc = imgJson.images[swapPosition]['imgLocation']
		imgDate = imgJson.images[swapPosition]['date']
		imgPath = imgJson.images[swapPosition]['imgPath']
		$('#photo').attr("src", imgPath);
		changeDetails(imgLoc, imgDesc, imgDate);
		swapPosition++;
	}
	else{
		checkPosition();
		imgDesc = imgJson.images[swapPosition]['description']
		imgLoc = imgJson.images[swapPosition]['imgLocation']
		imgDate = imgJson.images[swapPosition]['date']
		imgPath = imgJson.images[swapPosition]['imgPath']
		$('#photo').attr("src", imgPath);
		changeDetails(imgLoc, imgDesc, imgDate);

	}




}
function checkPosition(){
	if(swapPosition >= imgJson.images.length){
		swapPosition = 0;
	}
	if(swapPosition < 0){
		swapPosition = imgJson.images.length - 1;
	}
}


function changeDetails(ploc,pdesc,pdate){
	$('#spanLoc').html(ploc);
	$('#spanDesc').html(pdesc);
	$('#spanDate').html(pdate);
}

function selectFile(){
	imgJson = $.getJSON('images.json',function(response){
		GalleryImage(response);	
	})
}


