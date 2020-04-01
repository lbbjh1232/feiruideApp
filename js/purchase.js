mui.plusReady(function(){
	if(plus.navigator.isImmersedStatusbar() && isIPhoneX()){
	   //.mui-scroll-wrapper
	   var nav = document.querySelector(".mui-scroll-wrapper");
	   if(nav){
	       nav.style.cssText="top: 84px;height: calc(99% - 80px);";
	   } else {
	       return;
	   }
	    
	}
})