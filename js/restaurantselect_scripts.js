var linkLocation;
		
function getViewport() {

	 var viewPortWidth;
	 var viewPortHeight;

	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 if (typeof window.innerWidth != 'undefined') {
	   viewPortWidth = window.innerWidth;
	   viewPortHeight = window.innerHeight;
	 }

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	 else if (typeof document.documentElement != 'undefined'
	 && typeof document.documentElement.clientWidth !=
	 'undefined' && document.documentElement.clientWidth != 0) {
	    viewPortWidth = document.documentElement.clientWidth;
	    viewPortHeight = document.documentElement.clientHeight;
	 }

	 // older versions of IE
	 else {
	   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
	   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
	 }
	 return [viewPortWidth, viewPortHeight];
}

function showRestaurantInfo() {
	$(".restaurantinfo").css({"visibility":"visible"});
	$(".restaurantinfo").hide().show("drop", { direction: "left" }, 500, showScrollbars);
}

function showScrollbars() {
	$("body").css("overflow-x", "visible");
	$("body").css("overflow-y", "scroll");
}
	
function refreshPage() {
	$(this).css({"visibility":"hidden"});
    $(this).css({"display":"block"});
	window.location = document.URL; //current url
}

function fadeBeforeRedirect() {
	$(this).css({"visibility":"hidden"});
    $(this).css({"display":"block"});
	$(".headerfooter").fadeOut(500, goToRedirect);
}

function goToRedirect() {
	window.location = linkLocation;
}

$(window).load(function() {
	/*
	$("body").css("display", "none");

    $("body").fadeIn(1000);
    
	$("a").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(1000, redirectPage);
	});
		
	function redirectPage() {
		window.location = linkLocation;
	}*/
	
	var img = $("#restaurantphoto");
	if (img.width() != 0 && img.width() != 28)	//image doesn't exist (28 is for IE9)
	{
		/*alert(img.width());
		alert(img.height());
		alert(img.width()/img.height());*/
		if (img.width()/img.height() > 1.22) //wide photo
		{
			$("#restaurantphoto").css("width", 365);
		}
		else
		{
			$("#restaurantphoto").css("height", 300);
		}
	}
	else
	{
		 $("#middle_right").css("line-height", "300px"); //used to center the text
		 $("#middle_right").text("no official photo available :(");
	}
	
	var browserWidthHeight = getViewport();
	var browserWidth = browserWidthHeight[0];
	var computedMiddleMargins = (browserWidth-750)/2;
	if (computedMiddleMargins < 0)		//never have a negative margin
	{
		computedMiddleMargins = 0;
	}
	
	$("#middle").css("margin-left", computedMiddleMargins);
	$("#middle").css("margin-right", computedMiddleMargins);
	
	if (document.referrer.indexOf("restaurantselect") == -1)
	{
		$(".headerfooter").fadeIn(500, showRestaurantInfo);
	}
	else
	{
		showRestaurantInfo();
	}
	
	$(document).keypress(function(){
		$("body").css("overflow-x", "hidden"); //hides horizontal scrollbar from jquery drop effect
		$(".restaurantinfo").toggle("drop", { direction: "right" }, 500, refreshPage);
	});
	
	$(document).click(function(event){
		if (event.target.id == "homepage")	//clicked on 'start over' link
		{
			event.preventDefault();
			linkLocation = "index.html";
			$("body").css("overflow-x", "hidden"); //hides horizontal scrollbar from jquery drop effect
			$(".restaurantinfo").toggle("drop", { direction: "right" }, 500, fadeBeforeRedirect);
		}
		else if (event.target.id == "yelpsite" || event.target.id == "nameLink" || event.target.id == "reviewLink")	//clicked on links
		{
			//do nothing; new window opened automatically
		}
		else
		{
			var googleMapsWidth = $("#map_canvas").outerWidth();
			var googleMapsHeight = $("#map_canvas").outerHeight();
			var topHeight = $("#top").outerHeight(true);	//true to include margin
			var middleHeight = $("#middle").outerHeight(true);	//true to include margin
			var pageMidX = browserWidth/2;
			var mapUpperY = topHeight + middleHeight;
			var mapLowerY = mapUpperY - googleMapsHeight;
			var mapRightmostX = pageMidX - 5;	//gap of 5 pixels between map canvas and middle of page
			var mapLeftmostX = mapRightmostX - googleMapsWidth;
			
			/*alert(mapRightmostX);
			alert(mapLeftmostX);
			alert(mapUpperY);
			alert(mapLowerY);
			alert(event.pageX);
			alert(event.pageY);*/
			
			if ((event.pageX < mapLeftmostX || event.pageX > mapRightmostX || event.pageY < mapLowerY || event.pageY > mapUpperY))
			{
				$("body").css("overflow-x", "hidden"); //hides horizontal scrollbar from jquery drop effect
				$("body").css("overflow-y", "scroll"); //hides vertical scrollbar from jquery drop effect
				$(".restaurantinfo").toggle("drop", { direction: "right" }, 500, refreshPage);
			}
		}
	});
});

$(document).ready(function(){
	if ($("#nameLink").text() == "N/A")		//no restaurants returned
	{
		$("#reviewLink").css("visibility", "hidden");	//hide 'read more reviews..' link
		$("#nameLink").contents().unwrap();		//remove link from N/A
	}
	if (document.referrer.indexOf("restaurantselect") == -1)
	{
		$(".headerfooter").hide();
	}
	$("body").css("overflow-x", "hidden"); //hides horizontal scrollbar from jquery drop effect
	$("body").css("overflow-y", "scroll"); //hides vertical scrollbar from jquery drop effect
});