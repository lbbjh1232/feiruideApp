mui.plusReady(function(){
	if(plus.navigator.isImmersedStatusbar() && isIPhoneX()){
	    //.mui-scroll-wrapper
	    var nav = document.querySelector(".mui-scroll-wrapper");
	    if(nav){
	        nav.style.cssText="top: calc(84px + 5rem);height: calc(99% - 84px - 5rem);";
	    } else {
	        return;
	    }
		
		//.search-box
		var nav = document.querySelector(".search-box");
		if(nav){
		    nav.style.cssText="top: 84px;";
		} else {
		    return;
		}
		
		//close-box
		var nav = document.querySelector(".close-box");
		if(nav){
		    nav.style.cssText="padding-top: 40px;";
		} else {
		    return;
		}
		
	    
	}
})