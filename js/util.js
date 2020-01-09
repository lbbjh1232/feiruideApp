var util = {
	options: {
		ACTIVE_COLOR: "#3383FC",
		NORMAL_COLOR: "#000",
		subpages: ["html/message.html","html/friend.html", "html/my.html"]
	},
	/**
	 *  简单封装了绘制原生view控件的方法
	 *  绘制内容支持font（文本，字体图标）,图片img , 矩形区域rect
	 */
	drawNative: function(id, styles, tags) {
		var view = new plus.nativeObj.View(id, styles, tags);
		return view;
	},
	/**
	 * 初始化首个tab窗口 和 创建子webview窗口 
	 */
	initSubpage: function(aniShow) {
		
		// 设置顶部状态栏
		// plus.navigator.setStatusBarBackground('#3383FC');
		
		var subpage_style = {
				top: 0,
				bottom: 52,
				kernel:"WKWebview"
			},
			subpages = util.options.subpages,
			self = plus.webview.currentWebview(),
			temp = {};
			
			
		//兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
		// if(mui.os.android) {
			if(plus.navigator.isImmersedStatusbar()) {
				subpage_style.top += plus.navigator.getStatusbarHeight();
			}
			if(self.getTitleNView()) {
				subpage_style.top += 40;
			}
			
		// }

		// 初始化第一个tab项为首次显示
		temp[self.id] = "true";
		mui.extend(aniShow, temp);
		// 初始化绘制首个tab按钮
		util.toggleNview(0);

		for(var i = 0, len = subpages.length; i < len; i++) {

			if(!plus.webview.getWebviewById(subpages[i])) {
				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
				// append到当前父webview
				self.append(sub);
				
				// 初始化隐藏
				sub.hide();
			}
		}
	},
	/**	
	 * 点击切换tab窗口 
	 */
	changeSubpage: function(targetPage, activePage, aniShow) {
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetPage]) {
			plus.webview.show(targetPage);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetPage] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetPage, "fade-in", 300);
		}
		//隐藏当前 除了第一个父窗口
		if(activePage !== plus.webview.getLaunchWebview()) {
			plus.webview.hide(activePage);
		}
		
	},
	
	/**
	 * 点击重绘底部tab （view控件）
	 */
	toggleNview: function(currIndex) {
		currIndex = currIndex * 2;
		// 重绘当前tag 包括icon和text，所以执行两个重绘操作
		util.updateSubNView(currIndex, util.options.ACTIVE_COLOR);
		util.updateSubNView(currIndex + 1, util.options.ACTIVE_COLOR);
		// 重绘兄弟tag 反之排除当前点击的icon和text
		for(var i = 0; i < 8; i++) {
			if(i !== currIndex && i !== currIndex + 1) {
				util.updateSubNView(i, util.options.NORMAL_COLOR);
			}
		}
	},
	/*
	 * 改变颜色
	 */
	changeColor: function(obj, color) {
		obj.color = color;
		return obj;
	},
	/*
	 * 利用 plus.nativeObj.View 提供的 drawText 方法更新 view 控件
	 */
	updateSubNView: function(currIndex, color) {
		var self = plus.webview.currentWebview(),
			nviewEvent = plus.nativeObj.View.getViewById("tabBar"), // 获取nview控件对象
			nviewObj = self.getStyle().subNViews[0], // 获取nview对象的属性
			currTag = nviewObj.tags[currIndex]; // 获取当前需重绘的tag

		nviewEvent.drawText(currTag.text, currTag.position, util.changeColor(currTag.textStyles, color), currTag.id);
	},
	
	/*
	 * 绘制标题栏
	 */
	updateTitleNView: function(currIndex){
		//获取titleNView对象
		var self = plus.webview.currentWebview(),text,
		titleView = self.getTitleNView(),
		buttons = [],
		accountInfo = plus.storage.getItem('accountInfo');
		
		// 添加好友
		var addFriend = function(){
			if(accountInfo==null){
				mui.alert('请先登录','提示','确认',function (e) {
				   e.index
				});
				return;
			}
			mui.openWindow({
				url :'html/user/user-add.html',
				id : 'html/user/user-add.html'
			})
		}
		
		switch(currIndex){
			case 0:
				text = '药械e家';
				break;
				
			case 1: 
				text = '消息';
				break;
				
			case 2: 
				text = '通讯录';
				if(accountInfo != null && JSON.parse(accountInfo).roleid != 12 ){
					buttons.push({
						text:'\ue75c',
						fontSrc:'fonts/icon.ttf',
						fontSize : '25px',
						float:'right',
						onclick : addFriend,
					})
				}
				break;
				
			case 3:
				text = '我的';
				buttons.push({
					text : '\ue750',
					fontSrc : 'fonts/icon.ttf',
					fontSize : '25px',
					float : 'right',
					onclick : function(){
						mui.openWindow({
							url : 'html/my/setting.html',
							id : 'html/my/setting.html',
						})
					},
				})
				break;
		}
		
		// 设置文本
		self.setStyle({titleNView:{titleText:text,buttons:buttons}});
	}
	
	
};