
mui.init({
	swipeBack:true //启用右滑关闭功能
});

var vm = new Vue({
	el:'#app',
	data:{
		accountInfo:false
	}
})

var loadView = function(){
	var accountInfo = plus.storage.getItem('accountInfo');
	
	if( accountInfo != null){
		vm.accountInfo = JSON.parse(accountInfo);
	}else{
		vm.accountInfo = false;
	}
}



mui.plusReady(function () {
	
	//初始化
	loadView();
	var adminInfo = mui.getAdminId(),ws;
	
	var currentView = plus.webview.currentWebview();
	// 页面show监听
	currentView.addEventListener('show',function(){
		loadView();
	})
	
	// 登录后重载页面监听
	window.addEventListener('loginLoad',function(e){
		var sign = e.detail.id;
		if(sign == 1){
			loadView();
			//建立websocket连接
			ws = new WebSocket('ws://120.79.234.154:8282');
			var data = JSON.stringify({
				type:'kick',
				fromid : JSON.parse(plus.storage.getItem('accountInfo')).id,
				deviceid : mui.getUuid(),
			});
			
			// 延迟5s发送消息
			var mytime = setTimeout(function() {
				ws.send(data);
			}, 5000);
		}else{
			//账号剔除
			loadView();
		}
			
		
	})
	
    // 跳转至登录页
	mui('.mui-table-view').on('tap','#toLogin',function(){
		mui.openWindow({
			url:"my/login.html"
		})
	})
	
	 // 跳转至注册页
	mui('.mui-table-view').on('tap','#toReg',function(){
		mui.openWindow({
			url:"my/reg.html"
		})
	})
	
	// 退出登录
	mui('.mui-table-view').on('tap','#quit',function(){
		mui.confirm('是否确认退出登录','提示',['取消','确认'],function (e) {
			if(e.index == 1){
				plus.nativeUI.showWaiting();
				plus.storage.removeItem('accountInfo'); //删除用户缓存
				var messageview = plus.webview.getWebviewById('html/message.html');
				var indexview = plus.webview.getLaunchWebview();
				mui.fire(indexview,'loginLoad');	//重载首页
				mui.fire(messageview,'loginLoad');	//重载消息列表页
				loadView(); //重载个人页面
				plus.nativeUI.closeWaiting();

			}
		},'div');
		
	});
	
	// 联系客服,随机分配在线客服(默认超级管理员为客服)
	mui('.mui-table-view').on('tap','#custmer',function(){
	
		mui.openWindow({
			url:"my/customer-chat.html",
			id:"my/customer-chat.html",
			extras:{
				toInfo:adminInfo  //分配客服
			}
		})
		
	})
	
	
	
})