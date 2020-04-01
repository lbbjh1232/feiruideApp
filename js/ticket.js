mui.plusReady(function(){
	if(plus.navigator.isImmersedStatusbar() && isIPhoneX()){
	    //.mui-scroll-wrapper
	    var nav = document.querySelector(".mui-control-content");
	    if(nav){
	        nav.style.cssText="min-height: calc(100vh - 120px);";
	    } else {
	        return;
	    }
	    
	}
})