/*! Initial configurations */
(function(window){
	/* iOS checks */
	var Browser = {
		AppMode: !!window.navigator.standalone,
		iPad: /(iPad)/g.test(navigator.userAgent),
		iPod: /(iPhone|iPod)/g.test(navigator.userAgent)
	};
	var sc, ui = document.getElementById("UI");
	/* Screen configs */
	if(Browser.AppMode===true&&Browser.iPod===true){
		sc= {width:320, height:470};
	}else if(Browser.iPod===true){
		sc = {width:window.innerWidth||window.outerWidth||320, height:window.innerHeight||window.outerHeight||470};
	}else if(Browser.iPad===true){
		sc = {width:522, height:768};
	}else if(window.innerWidth<=480){
		// mobile shits like windows phone 8 or androids
		sc = {width:window.innerWidth||window.outerWidth||320, height:window.innerHeight||window.outerHeight||470};
	}else{
		// pc?
		sc = {width:340, height:500};
	}
	/* center the ui */
	ui.style.top = ui.style.left = "50%";
	ui.style.marginTop = "-"+(sc.height/2)+"px";
	ui.style.marginLeft = "-"+(sc.width/2)+"px";
	ui.style.width  = sc.width + "px";
	ui.style.height = sc.height + "px";
	/* save to window */
	window.Browser = Browser;
	window.sc = sc;
})(window);