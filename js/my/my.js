
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
};

mui.plusReady(function () {
	
	//初始化
	loadView();
	var admin = mui.getAdminId(),ws,adminInfo;
	//获取客户id 
	admin.then(res=>{
		if(res.code == 200){
			adminInfo = res.data.aid;
		}else{
			adminInfo = ''
		}
	})
	
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
			ws = new WebSocket(CONFIG.WS_HOST);
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
	document.getElementById('toLogin').addEventListener('tap',function(){
		mui.openWindow({
			url:"my/login.html",
			id : 'login'
		})
	})
	
	// 身份认证
	mui('#business').on('tap','#auth',function(){
		mui.openWindow({
			url:"my/auth.html",
			id : 'auth',
			show : {
				autoShow : true,
			}
		})
	});
	//积分管理
	mui('#business').on('tap','#point',function(){
		mui.openWindow({
			url:"points/index.html",
			id : 'points',
			show : {
				autoShow : true,
			}
		})
	});
	
	// 联系客服,随机分配在线客服(默认超级管理员为客服)
	mui('#service').on('tap','#custmer',function(){
		if(!adminInfo){
			mui.alert('客服未连接成功,请重新连接','提示','确认',function(){
				admin = mui.getAdminId();
				admin.then(res=>{
					if(res.code == 200){
						adminInfo = res.data.aid;
						mui.toast('连接成功');
					}else{
						mui.toast('连接失败');
					}
				})
			});
			return;
		}
		mui.openWindow({
			url:"my/customer-chat.html",
			id:"customer-chat",
			extras:{
				toInfo:adminInfo  //分配客服
			}
		})
		
	})
	
	
	
})