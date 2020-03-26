// 加载等待框
//扩展mui.showLoading  
(function($, window) {  
    //显示加载框  
    $.showLoading = function(message,type) {  
        if ($.os.plus && type !== 'div') {  
            $.plusReady(function() {  
                plus.nativeUI.showWaiting(message);
            });  
        } else {  
            var html = '';  
            html += '<i class="mui-spinner mui-spinner-white"></i>';  
            html += '<p class="text">' + (message || "数据加载中") + '</p>';  
 
            //遮罩层  
            var mask=document.getElementsByClassName("mui-show-loading-mask");
            if(mask.length==0){  
                mask = document.createElement('div');  
                mask.classList.add("mui-show-loading-mask");  
                document.body.appendChild(mask);  
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{  
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }  
            //加载框  
            var toast=document.getElementsByClassName("mui-show-loading");  
            if(toast.length==0){  
                toast = document.createElement('div');  
                toast.classList.add("mui-show-loading");  
                toast.classList.add('loading-visible');  
                document.body.appendChild(toast);  
                toast.innerHTML = html;  
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{  
                toast[0].innerHTML = html;  
                toast[0].classList.add("loading-visible");  
            }  
        }     
    };  

    //隐藏加载框  
    $.hideLoading = function(callback) {  
        if ($.os.plus) {  
            $.plusReady(function() {  
                plus.nativeUI.closeWaiting();  
            });  
        }   
        var mask=document.getElementsByClassName("mui-show-loading-mask");  
        var toast=document.getElementsByClassName("mui-show-loading");  
        if(mask.length>0){  
            mask[0].classList.add("mui-show-loading-mask-hidden");  
        }  
        if(toast.length>0){  
            toast[0].classList.remove("loading-visible");  
            callback && callback();  
        }  
      }  
})(mui, window);  

// https网络请求封装
(function($){
	//更新登录信息用户名、头像、电话
	$.updateInfo =function(field,value){
		let accountInfo = plus.storage.getItem('accountInfo');
		if(accountInfo == null){
			return;
		}
		accountInfo = JSON.parse(accountInfo);
		accountInfo[field] = value;
		plus.storage.setItem('accountInfo',JSON.stringify(accountInfo));
		
	}
	
	// 判断存储权限是否打开
	$.judgeStoragePermisson = function(){
		var isOpen = permission.requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE');
		isOpen.then(function(e){
			if(e != 1){
				mui.alert('为保证APP正常运行，请打开应用存储权限','提示','确认',function (e) {
				   permission.gotoAppPermissionSetting();
				})
			}
		})
	}
	
	// 消息提示声
	$.notice = function(){
		var p = plus.audio.createPlayer( "../images/notice.wav" );
		p.play( function () {}, function ( e ) {} );
	}
	
	// 获取或生成设备唯一id
	$.getUuid = function(){
		var uuid = plus.storage.getItem('uuid');
		if(uuid == null){
			//不存在，则生成本设备唯一标识
			uuid = Math.random().toString(36).slice(-8) + new Date().getTime().toString();
			plus.storage.setItem('uuid',uuid);
		}
		return uuid;
	};
	
	$.http = function(url,params,method,show){
		var accountInfo = plus.storage.getItem('accountInfo') != null ? JSON.parse( plus.storage.getItem('accountInfo') ) : {token : ''},userid = '',clientid = '';
		
		//绑定用户clientid
		if(plus.storage.getItem('clientid') != null){
			clientid = plus.storage.getItem('clientid');
		}
		
		if( plus.storage.getItem('uid') != null){
			userid = plus.storage.getItem('uid');
		}
		
		if( plus.storage.getItem('accountInfo') != null){
			userid = JSON.parse( plus.storage.getItem('accountInfo') ).id;
		}
		
		var obj = { device_uid : userid , device_cid : clientid};
		params = mui.extend(obj,params);
		
		var url = API.HOST + url;
		var result = 'success';
		return new Promise(function(resolve,reject){
			// plus.nativeUI.showWaiting()
			mui.ajax(url,{
				type:method,
				async:true,
				data:params,
				dataType:'json',
				headers : {auth :'Bearer ' + accountInfo.token},
				success:(data)=>{
					plus.nativeUI.closeWaiting();
					result = data;
					if(result.code == 203){
						var message = plus.webview.getWebviewById('html/message.html');
						mui.fire(message,'kickOut',{msg : result.message});
						reject();
						
					}else{
						//正常返回
						// console.log(JSON.stringify(result))
						resolve(result);
					}
				},
				error:(xhr,type,errorThrown)=>{
					plus.nativeUI.closeWaiting();
					if(show == undefined){
						mui.toast('网络异常，稍后再试');
					}
					
					
				}
			}); 
		});
		
		// mui.ajax(url,{
		// 	type:method,
		// 	async:true,
		// 	data:params,
		// 	dataType:'json',
		// 	headers : {auth :'Bearer ' + accountInfo.token},
		// 	success:(data)=>{
		// 		result = data;
		// 		if(result.code == 203){
		// 			var message = plus.webview.getWebviewById('html/message.html');
		// 			mui.fire(message,'kickOut',{msg : result.message});
		// 			return;
					
		// 		}else{
		// 			//正常返回
		// 			return  result;
		// 		}
		// 	},
		// 	error:(xhr,type,errorThrown)=>{
		// 		result = 'fail';
		// 		mui.alert('请求异常，稍后再试','提示','确定',function (e) {});
		// 		return;
		// 	}
		// });
		
		// if(result == 'fail'){
		// 	mui.alert('请求异常，稍后再试','提示','确定',function (e) {});
		// 	return;
			
		// }else{
		// 	// 接口鉴权返回
		// 	if(result.code == 203){
		// 		var message = plus.webview.getWebviewById('html/message.html');
		// 		mui.fire(message,'kickOut',{msg : result.message});
		// 		return;
				
		// 	}else{
		// 		//正常返回
		// 		return  result;

		// 	}
		// }
		
	};
	
	$.http_post = function(url,params,show){
		return $.http(url,params,'POST',show);
	};
	
	$.http_get = function(url,params){
		return $.http(url,params,'GET');
	};
	
	// 表单失去焦点
	$.inputBlur = function(selectors){
		// 点击事件
		window.addEventListener('tap',function(){
			selectors.blur();
		})
		// 上滑动
		window.addEventListener('swipeup',function(){
			selectors.blur();
		})
		// 下滑动
		window.addEventListener('swipedown',function(){
			selectors.blur();
		})
		// 左滑动
		window.addEventListener('swipeleft',function(){
			selectors.blur();
		})
		// 右滑动
		window.addEventListener('swiperight',function(){
			selectors.blur();
		})
	}
	
	// 网络状态监听，联网失败，提示用户
	$.networkError = function () {
		document.addEventListener('netchange',function(){
			 // 判断网络是否连接
			var types = [];
				
			types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
			
			types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
			
			types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
			
			types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
			
			types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
			
			types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
			
			types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
			
			var str = types[plus.networkinfo.getCurrentType()];
			
			if (str == '未知' || str == '未连接网络'){
				
				mui.alert('网络异常，请确认网络情况','提示','确认',function (e) {
				   e.index
				})
				
				// return;
			}else{
				$.setMyId();
				$.getClientId();
			}
			
		})
	}
	
	
	// 判断是否登录并放回到首页
	$.isLogin = function(){
		// 判断登录状态是否存在
		var accountInfo = plus.storage.getItem('accountInfo');
		if( accountInfo != null ){
			return;
		}
		
	   var homeId = plus.webview.getLaunchWebview().id;
	   
	   //获取目标页面
	   var target = plus.webview.getWebviewById(homeId);
	   if (!target) {
		console.log("目标页面不存在！");
		return;
	   }
	   //获取当前页面
	   var current = plus.webview.currentWebview();
	   if (current === target) {
		console.log("目标页面是当前页面！");
		return;
	   }
	   //将要关闭的页面
	   var pages = new Array(current);
	   //父级页面
	   var opener = current.opener();
	   
	   while (opener){
		if (opener === target) {//找到了目标页面
			mui.fire(target,'login');
			
			//关闭目标页面的所有子级页面pages
			pages.map(function(page){
				page.close();
			});
			
			return;
		}
		pages.push(opener);
		opener = opener.opener();
	   }
	   //没有找到目标页面
	   console.log("目标页面不是当前页面的祖先页面！");
		
	}
	
	// mui scroll 下刷新组件
	$.pullDownRefresh = function(obj,scrollObj,callback){
		// 监听页面滚动 obj dom对象，scrollObj mui对象
		//var y,s = false,iconShow = false;
		var x,y,x0,y0,x1,y1,xt,yt,eable = false,h = 5,p=3,sy;
		var html = '<div class="pullDown"><span class="pullDown-icon">↓ </span> <span class="pullDown-text">下拉刷新</span></div>';
		var ele = document.createElement('div');
		ele.setAttribute('id','pullDown-box');
		ele.innerHTML = html;
		
		// 滚动监听
		
		obj.addEventListener('scroll',function(){
			sy = scrollObj.y;
			//console.log(sy)
		})
		
		// 滑动开始
		obj.addEventListener('dragstart',function(e){
			//console.log(e.detail.center.y)
			x=x0 = e.detail.center.x;
			y=y0 = e.detail.center.y;
		});
		
		// 滑动中
		obj.addEventListener('drag',function(e){
			x1 = e.detail.center.x;
			y1 = e.detail.center.y;
			//console.log(y1)

			xt = Math.abs(x1-x);
			yt = Math.abs(y1-y);
			
			if(yt > 0 && y1 >= y0 && !eable && sy >= 0){
				y0 = y1
				obj.firstChild.insertBefore(ele,obj.firstChild.children[0]);
				ele.style.height = 0;
				eable = true;
			}
			
			// 无滚动条下拉时，动画提示效果
			if(eable && y1 >= y0  && sy == 0){
				y0 = y1;
				h += 2;
				p += 1;
				if( p >= 23 ){
					p = 23;
				}
				if( h >= 45 ){
					h = 45;
				}
				//console.log('p:'+p + ',h:'+h)
				ele.style.height = h+'px';
				ele.firstChild.style.bottom = '-'+ p + 'px';
				
			}else if(eable && y1 < y0  && sy == 0){
				y0 = y1;
				p -= 1;
				h -= 2;
				ele.style.height = h+'px';
				ele.firstChild.style.bottom = '-'+ p + 'px';
			}
			
		
			if(eable && yt >= 80){
				var icon = document.getElementsByClassName('pullDown-icon')[0];
				icon.innerHTML = '↑';
				
			}else if(yt < 80 && y > 6 && eable){
				var icon = document.getElementsByClassName('pullDown-icon')[0];
				eable = false;
				icon.innerHTML = '↓';
			}
			
		})
		
		// 拖动结束触发回调函数
		obj.addEventListener('dragend',function(e){

			if(eable){
				callback();
				eable = false;
			}
			// 判断是否存在刷新样式节点
			if( document.getElementById('pullDown-box') ){ 
				p = 3;
				h = 5;
				ele.style.height = h+'px';
				ele.firstChild.style.bottom = '-'+ p + 'px';
				// 删除元素
				obj.firstChild.removeChild(ele);
			}
			
		})
		
	}
		
	// 获取用户通讯id
	$.setMyId= function(){
		//查询游客还是系统用户
		var accountInfo = plus.storage.getItem('accountInfo');
		if( accountInfo != null ){
			accountInfo = JSON.parse(accountInfo);
			//已登录
			myid = accountInfo.id; //以系统用户id为唯一标识
			plus.storage.setItem('myid',myid.toString())
			
		}else{
			
			//首次打开未登录及游客时,将设备标识存入用户表
			var uuid = $.getUuid();
			var checkUser = $.http_post(API.CHECK_NONE_USER,{uuid:uuid});
			checkUser.then(checkUser=>{
				if(checkUser.code == 200){
					myid = checkUser.data.uid;
					
					//将游客id存储起来,用于绑定clientid
					plus.storage.setItem("uid",myid.toString());
					
				}else{
					//随机分配字符,存入之后,无法现在游客记录上,客服可以显示
					myid =  Math.random().toString(36).slice(-8)+new Date().getTime();
				}
				plus.storage.setItem("myid",myid.toString());
			})
		}
	}
	
	$.getMyId = function(){
		if(plus.storage.getItem("myid") == null){
			// setTimeout(function(){
				// $.getMyId();
			// },2000)
			return 0;
		}else{
			return plus.storage.getItem("myid");
		}
	}
	
	//获取客服通讯id
	$.getAdminId = function(){
		return $.http_post(API.CHECK_ADMIN_ID,{});
	}
	
	//加载用户聊天记录
	$.messageLoad = function(fromid,toid,temp){
		return $.http_post(API.LOAD_MESSAGE_LIST,{fromid:fromid,toid:toid,temp:temp});
	}
	
	//绘制底部菜单未读消息提示,消息列表页
	$.updateMessCount = function(isCount,isList){
		var view = plus.webview.getLaunchWebview(),
		nviewEvent = plus.nativeObj.View.getViewById("icon"),myid = $.getMyId(),count = 0;
		var countLoad = function(count){
					var num = count >= 10 ? "9+" : count;
					var leftPos = Math.ceil(window.innerWidth / 8); 
					var drawIcon = new plus.nativeObj.View('icon',{
						bottom : '33px',
						left : (leftPos*3 +8).toString()+'px',
						width : '18px',
						height : '18px'
					},[
						{
							tag:'rect',
							id : 'message',
							position: {
								top: '1px',
								left: '0px',
								width: '100%',
								height: '100%'
							},
							rectStyles: {
								color: '#FF0000',
								radius: '18px',
							}
						},
						{
							tag : 'font',
							id : 'count',
							text : num,
							position: {
								top: '1px',
								left: '0px',
								width: '100%',
								height: '100%'
							},
							textStyles :{
								size : '12px',
								align:'center',
								color:'#FFFFFF',
								verticalAlign :'middle'
							}
							
						}
					])
					
					view.append(drawIcon);
				}
				
			
			var res  = $.http_post(API.GET_CHAT_LIST,{fromid:myid});
			res.then(res=>{
				if(res.code == 200){
					count = res.data.totlecount;
					//总数，列表都加载
					if(isCount && isList){
						if(nviewEvent != null){
							nviewEvent.close();
						}
						if(count > 0){
							countLoad(count);
						}
						vm.result = res.data.userinfo;
						
					}
					
					//只加载总数
					if(isCount && !isList){
						if(nviewEvent != null){
							nviewEvent.close();
						}
						
						if(count > 0){
							countLoad(count);
						
						}
					}
					
					// 只加载列表
					if(isList && !isCount){
						vm.result = res.data.userinfo;
					}
					
				}		
			})
			
			

		}
		
	// websocket心跳检测
	$.heartCheck =function(ws){
		var check = {
			timeout: 55*1000,  //  心跳检测时长
			timeoutObj: null, // 定时变量
			reset: function () { // 重置定时
				if(this.timeoutObj != null) clearTimeout(this.timeoutObj);
				return this;
			},
			start: function () { // 开启定时
				var self = this;
				this.timeoutObj = setTimeout(function () {
					console.log('关闭了')
				  // 心跳时间内收不到消息，主动触发连接关闭，开始重连
					ws.close();

				},this.timeout)
			}
		}
		return check;
	}
	
	// 获取滚动条的高度
	$.getScrollTop =  function (){
		var scrollTop=0;
		
		if(document.documentElement&&document.documentElement.scrollTop){
			scrollTop=document.documentElement.scrollTop;
			
		}else if(document.body){
			scrollTop=document.body.scrollTop;
			
		}
		return scrollTop;
	}
	
	// 获取设备推送clientID、token(ios使用)
	$.getClientId = function(){
		if(plus.storage.getItem('clientid') != null ) return;
		
		var pinf = plus.push.getClientInfo();
		var cid = pinf.clientid;				//客户端标识
		var version = mui.os.android ? 1 : 2;
		var token = pinf.token;
		
		setTimeout(function(){
			cid = pinf.clientid;
			token = pinf.token;
			//存储到服务器
			if(cid != 'null' && token != 'null' && cid && token ){
				var res = $.http_post(API.SAVE_CLIENT_ID,{cid:cid,token:token,version:version,vendor:plus.device.vendor},false);
				res.then(res=>{
					plus.storage.setItem('clientid',res.data.info.toString());
				})
			}else{
				$.getClientId();
			}
		}, 2000);
		
	}
	
	function change(t) {
	    if (t < 10) {
	        return "0" + t;
	    } else {
	        return t;
	    }
	}
	
	// 时间戳转时间格式
	$.date = function(timestamp) {
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y, M, D, h, m, s = ''
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		D = change(date.getDate());
		return Y + M + D;
	}
	
	// 判断两个数组是否完全相等
	$.isEqualArr = function(arr,arr1){
		if (arr.length !== arr1.length) {
			return false
		}
		for (var i = 0; i < arr.length; i++) {
			if ( JSON.stringify(arr[i]) !== JSON.stringify(arr1[i]) ) {
				return false
			}
		}
		return true
	}
	
	function createLoadView(){
		// 创建遮罩层
		var html = '<div class="progress"><div class="pro-title">下载进度</div><div id="update" style="height: 8px;" class="mui-progressbar"><span></span></div></div>';
		var mask = document.createElement('div');
		mask.classList.add('mask');
		mask.setAttribute('id','mask');
		mask.innerHTML = html;
		document.body.appendChild(mask);
	}
	
	// 下载app
	$.downloadApp = function(){
		// 创建下载任务
		if(mui.os.ios){
			plus.runtime.openURL("https://apps.apple.com/cn/app/id1492786744",function(){
				mui.toast("打开appstore失败");
			})
			return ;
		}
		
		var i;
		var task = plus.downloader.createDownload(API.HOST + API.DOWNLOAD_APP,{method : 'POST'},function(t,status){
			// 删除下载进度节点
			document.body.removeChild(document.getElementById('mask'));
			clearInterval(i);
			if(status == 200){
				plus.runtime.install(t.filename);
				
			}else{
				mui.alert('下载失败','提示','确认',function (e) {});
			}
		});
		
		// 开始下载
		task.start();
		createLoadView();
		// 创建进度条
		i = setInterval(function(){
			var totleSize = task.totalSize;
			var downloadSize = task.downloadedSize;
			var percent = downloadSize / totleSize;
			var number = (Math.round(percent * 100) / 100) * 100;
			mui('#update').progressbar().setProgress(number);
		},1000)
	}
	
	// app版本比较
	function compareVersion(currentVer,newVer){
		var current = currentVer.toString().replace(/\./g,'');
		var newver = newVer.toString().replace(/\./g,'');
		if(parseInt(current) < parseInt(newver)){
			return true;
		}
		return false;
	}
	
	// 更新app并安装
	$.appUpdate = function(msg,isCheck = false){
		var wgtVer = null;
		plus.runtime.getProperty(plus.runtime.appid,function(info){
			// 当前版本
			wgtVer = info.version;
			
			// 查询更新版本
			var res = $.http_post(API.CHECK_VERSION,{});
			res.then(res=>{
				var newVer = res.data.app_version;
				var iosVer = res.data.ios_version;
				var message = msg == undefined ? '发现了新的版本，为保障你的功能正常使用，请立即更新!' : msg + newVer;
				if( (compareVersion(wgtVer,newVer) && mui.os.android) || (compareVersion(wgtVer,iosVer) && mui.os.ios) ){
					mui.confirm(message,'更新提示',['更新','取消'],function (e){
					   if(e.index == 0){
							// 开始下载
							$.downloadApp();
					   }
					})
					
				}else{
					if(isCheck){
						mui.toast('已是最新版本');
					}
				}
				
			})
			
			
		});
	}

	/**
	 * 更新分享服务
	 */
	
	 $.updateSerivces = function(){
		plus.share.getServices(function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
	    sweixin=shares['weixin'];
		}, function(e){
			console.log('获取分享服务列表失败：'+e.message);
		});
		
		plus.oauth.getServices(function(service){
			logins = {};
			for(let i in service){
				let t=service[i];
				logins[t.id]=t;
			}
			
			lweixin=logins['weixin'];
			
		},function(e){
			//获取服务失败
		})
		
	};
	
	// 微信分享
	 $.share = function(srv, msg, button){
	  if(!srv){
	    // outLine('无效的分享服务！');
	    return;
	  }
	  button&&(msg.extra=button.extra);
		// 发送分享
		if(srv.authenticated){
			// outLine('---已授权---');
			$.doShare(srv, msg);
		}else{
			// outLine('---未授权---');
			srv.authorize(function(){
				$.doShare(srv, msg);
			}, function(e){
				// outLine('认证授权失败：'+JSON.stringify(e));
			});
		}  
	}
	// 发送分享
	 $.doShare = function(srv, msg){
		srv.send(msg, function(){
			mui.toast('分享成功');
			
		}, function(e){
			console.log('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
		});
	};
	
	//第三方连接
	$.thirdLink = function(title,href){
		var win = '/html/search-tool/embed.html';
		// 创建窗口
		var ws = plus.webview.create(win,win,{scrollIndicator :'none',scalable : false,backButtonAutoControl : 'close',},{title,href})
		ws.show('pop-in');
	}
	
	
	// wechat bind
	$.weBind = function(auth,uid){
		auth.login(function(){
			plus.nativeUI.showWaiting()
			auth.getUserInfo(function(){
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
				var openid = auth.userInfo.openid;
				var avatar = auth.userInfo.headimgurl;
				var unionid = auth.userInfo.unionid;
				let params = {
					uid : uid,
					nickname,
					openid,
					avatar,
					unionid
				}
				let res = $.http_post(API.BAND_WECHAT,params);
				plus.nativeUI.closeWaiting();
				res.then(res=>{
					if(res.code == 200){
						$.toast('绑定成功');
						$.updateInfo('nickname',nickname);
						$.updateInfo('openid',openid);
						$.updateInfo('avatar',avatar);
						mui.fire(plus.webview.getWebviewById('html/my.html'),'loginLoad');
						location.reload();
					}else{
						$.alert(res.message);
					}
				})
				
			},function(e){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("获取用户信息失败！",null,"绑定");
				
			});
		},function(e){
			plus.nativeUI.closeWaiting();
		});
	}
	
	// wechat fast login
	$.weLogin = function(auth,fire){
		auth.login(function(){
			plus.nativeUI.showWaiting('登录中',{width:'20%'})
			auth.getUserInfo(function(){
				var openid = auth.userInfo.openid;
				var unionid = auth.userInfo.unionid;
				let params = {
					openid,
					unionid,
					deviceId : $.getUuid(),
					clientId : plus.storage.getItem('clientid') != null ? plus.storage.getItem('clientid') : ''
				}
				let res = $.http_post(API.LOGIN_WECHAT,params);
				res.then(res=>{
					plus.nativeUI.closeWaiting();
					if(res.code == 200){
						$.toast('登录成功');
						//设置本地数据缓存
						plus.storage.setItem('accountInfo',JSON.stringify(res.data));
						setTimeout(function(){
							$.back(fire);
						},800);
					}else{
						$.alert(res.message);
					}
				})
				
			},function(e){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("获取用户信息失败！",null,"微信登录");
			});
		},function(e){
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert("认证失败",null,"认证提示");
		});
	}
	
	// fast register by wechat
	$.weReg = function(auth){
		auth.login(function(){
			plus.nativeUI.showWaiting()
			auth.getUserInfo(function(){
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
				var openid = auth.userInfo.openid;
				var avatar = auth.userInfo.headimgurl;
				var unionid = auth.userInfo.unionid;
				let params = {
					nickname,
					openid,
					avatar,
					unionid
				}
				let res = $.http_post(API.REG_WECHAT,params);
				res.then(res=>{
					plus.nativeUI.closeWaiting();
					if(res.code == 200){
						$.toast('注册成功');
						//设置本地数据缓存
						plus.storage.setItem('accountInfo',JSON.stringify(res.data));
						setTimeout(function(){
							$.back();
						},800);
					}else{
						$.alert(res.message);
					}
				})
				
			},function(e){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("获取用户信息失败！",null,"微信登录");
			});
		},function(e){
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert("认证失败",null,"认证提示");
		});
	}
	
	// change statusBar style
	$.changeStatusBar = function(style,backgroundColor){
		plus.navigator.setStatusBarBackground(backgroundColor ==undefined ? '#3383FC':backgroundColor);
		plus.navigator.setStatusBarStyle(style == undefined ?'light':style);
	}
	
	//post operation of back function 
	$.afterBack = null;
	// $.beforeBack = null;
	//rewrite mui.back
	$.back = function(callback){
		// (  $.beforeBack != null && typeof $.beforeBack ==='function' ) ? $.beforeBack():null;
		
		// close current window 
		let win = plus.webview.currentWebview();
		win.close();
		
		// execute after function
		(  $.afterBack != null && typeof $.afterBack ==='function' ) ? $.afterBack():null;
		
		(callback != undefined && typeof callback ==='function' ) ? callback():null;
		
		// after $.after execute ,then assign it to null
		$.afterBack = null;
	}
	
	$.statusAndSetAfterBack = function(currentStyle,currentColor){
		// judge pre-page statusStyle
		let preStyle = plus.navigator.getStatusBarStyle(); //light or dark
		let preColor = plus.navigator.getStatusBarBackground(); //color 
		
		if(currentStyle == undefined || currentColor == undefined){return;}
		
		//set after-back function
		$.afterBack = function(){
			$.changeStatusBar(preStyle,preColor);
		} 
		
		// then change current-page statusStyle
		$.changeStatusBar(currentStyle,currentColor);
		
	}
	
	
	// rewrite mui.openWindow
	let OLD_OPEN_WINDOW = $.openWindow;
	
	// proposition operation of openWindow function
	$.beforeOpenWindow = null;
	
	$.openWindow = function(style){
		($.beforeOpenWindow != null && typeof $.beforeOpenWindow ==='function' ) ? $.beforeOpenWindow():null;
		
		OLD_OPEN_WINDOW(style);
	}
	
	// paint status : only in index page
	$.paintStatus = function(){
		//获取titleNView对象
		var self = plus.webview.currentWebview(),text,views = [plus.webview.getWebviewById('html/message.html').isVisible(),plus.webview.getWebviewById('html/friend.html').isVisible(),plus.webview.getWebviewById('html/my.html').isVisible()];
		var index = views.indexOf(true);
		var currIndex = index != -1 ?  parseInt(index)+1 : 0 ;
		var titleView = self.getTitleNView();
		var buttons = [];
		var accountInfo = plus.storage.getItem('accountInfo');
		
		// 添加好友
		var addFriend = function(){
			$.loginPageShow();
			
			mui.openWindow({
				url :'/html/user/user-add.html',
				id : '/html/user/user-add.html'
			})
		}
		
		// 切换角色
		var switchRole = function(){
			mui.openWindow({
				url : '/html/user/switch-role.html',
				id : 'switch-role.html'
			})
		}
		
		switch(currIndex){
			case 0:
				text = '药械e家';
				if(accountInfo == null || ( accountInfo != null && JSON.parse(accountInfo).roleid == 12)  ){
					buttons.push({
						text:'切换角色',
						width:"80px",
						fontSize : '14px',
						float:'right',
						onclick: switchRole
					});
				}
				
				break;
				
			case 1: 
				text = '消息';
				buttons.push({
					text:'',
					width:"80px",
					fontSize : '14px',
					float:'right',
				});
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
							url : '/html/my/setting.html',
							id : 'setting',
						})
					},
				})
				break;
		}
		
		// 设置文本
		self.setStyle({titleNView:{titleText:text,buttons:buttons}});
	}
	
	// if off-line then display login page
	$.loginPageShow = function(error){
		let accountInfo = plus.storage.getItem('accountInfo');
		if(!accountInfo){
			$.openWindow({
				url : '/html/my/login.html',
				id : 'login'
			});
			
			if(error == undefined ){
				throw "error";
			} 
		}
		return;
	};
	
	// ordinary user should complete identity authentication
	$.authPageShow = function(error){
		$.openWindow({
			url : '/html/my/auth.html',
			id : 'auth'
		});
		
	}
	
	
	// create float window
	let floatWin;
	$.floatWindow = function(url='',style = {},extras = {}){
		floatWin = floatWin || plus.webview.create(url, 'float',style,extras);
		floatWin.addEventListener('loaded', function(){
			floatWin.show('fade-in', 100);
			floatWin = null;
		}, false);
		
		floatWin.addEventListener('maskClick',function(){
			floatWin.close()
		})
		
	}
	
	
})(mui)

