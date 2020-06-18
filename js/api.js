// 接口配置文件
var DEV = "dev";
var PRO = 'pro';
// 环境选择
var ENVIRONMENT = PRO;

// 接口地址
var API = {
	// HOST : "https://test.yxt.feiruide.cn/index.php",
	// IMAGE_HOST : 'https://ticket.yp.feiruide.cn/test',
	// TICKET_HOST : 'https://ticket.yp.feiruide.cn/test/upload',
	// SHARE_HOST : 'http://test.share.feiruide.cn:9095',
	
	HOST : "https://yxt.feiruide.cn/index.php",
	TICKET_HOST : 'https://ticket.yp.feiruide.cn/upload',
	IMAGE_HOST : 'https://ticket.yp.feiruide.cn/',
	SHARE_HOST : 'http://share.feiruide.cn:9094',
	
	BAND_PHONE : '/user/bandPhone',
	BAND_WECHAT : '/user/bandWechat',
	LOGIN_WECHAT : '/user/loginWechat',
	RESET_PASSWORD : '/user/resetPassword',
	REG_WECHAT : '/user/regWechat',
	SET_ACCOUNT :'/user/setAccount',
	
	SMS_CODE : '/user/smsCode',
	CHECK_VERSION : '/user/checkVersion',
	SAVE_CLIENT_ID : '/user/saveClientId',
	DOWNLOAD_APP : '/user/downloadApp',
	LOGIN : "/user/login",
	GET_USERINFO : "/user/getUserInfo",	
	GET_NET_DRUG : "/drug/getNetDrug",
	GET_HOS_DRUG : "/drug/getHosDrug",
	GET_HOS_TICKET : "/drug/getHosTicket",
	GET_HOS_COMAPNY : '/drug/getHosCompany',
	GET_DETAIL_TICKET : '/drug/getDetailTicket',
	CHECK_TICKET : '/drug/checkTicket',
	GET_COM_DRUG : '/drug/getComDrug',
	GET_ESSENTIAL_DRUG : '/drug/getEssentialDrug',
	GET_MEDICATION_GUIDE : '/drug/getMedicationGuide',
	GET_DRUG_DESCRIPTION : '/drug/getDrugDescription',
	
	// 入库
	GET_COM_TICKET : '/drug/getComTicket',
	GET_INTO_TICKET : '/drug/getIntoTicket',
	DEL_DRUG_INTO : '/drug/delDrugInto',
	EDIT_DRUG_INTO : '/drug/editDrugInto',
	UPLOAD_TICKET : '/drug/uploadTicket',
	GET_PRODUCER_LIST : '/drug/getProducerList',
	GET_DRUG_LIST : '/drug/getDrugList',
	CHECK_DRUG_REPORT : '/drug/checkDrugReport',
	DELETE_TICKET : '/drug/deleteTicket',
	WAREHOUSE_INTO_FROM_PRO : '/drug/warehouseIntoFromPro',
	CHECK_TRADE_EXIST : '/drug/checkTradeExist',
	CHECK_AGENT_EXIST : '/drug/checkAgentExist',
	WAREHOUSE_INTO_FROM_AS_PRO : '/drug/warehouseIntoFromAsPro',
	WAREHOUSE_INTO_FROM_GROUP : '/drug/warehouseIntoFromGroup',
	GET_GROUP_COMPANY : '/drug/getGroupCompany',
	ADD_GROUP_COMPANY : '/drug/addGroupCompany',
	GET_GROUP_DRUG : '/drug/getGroupDrug',
	WAREHOUSE_INTO_FROM_ALLOT : '/drug/warehouseIntoFromAllot',
	// 出库
	GET_COM_OUT : '/drug/getComOut',
	GET_HOSPITAL : '/drug/getHospital',
	DEL_DRUG_OUT : '/drug/delDrugOut',
	EDIT_DRUG_OUT : '/drug/editDrugOut',
	GET_REJECT_OUT : '/drug/getRejectOut',
	REJECT_TO_HOS : '/drug/rejectToHos',
	GET_OUT_DRUG : '/drug/getOutDrug',
	WAREHOUSE_OUT : '/drug/warehouseOut',
	
	// 药检报告
	REPORT_LIST : '/drug/reportList',
	GET_REPORT_DRUG : '/drug/getReportDrug',
	ADD_REPORT : '/drug/addReport',
	DEL_REPORT : '/drug/delReport',
	GET_COMPANY : '/drug/getCompany',
	REPORT_PUSH : '/drug/reportPush',
	
	// 短缺药品
	GET_SHORTAGE : '/drug/getShortage',
	PRO_NET_DRUG : '/drug/proNetDrug',
	RE_SUBMIT : '/drug/reSubmit',
	CHECK_PROVIDE : '/drug/checkProvide',
	IS_PRPVIDE : "/drug/isProvide",
	PRO_SUBMIT : '/drug/proSubmit',
	SURE_BUY : '/drug/sureBuy',
	GET_MY_SHORTAGE : '/drug/getMyShortage',
	CLOSE_SHORTAGE : '/drug/closeShortage',
	RE_EDIT_SUBMIT : '/drug/reEditSubmit',
	GET_MY_PROVIDE : '/drug/getMyProvide',
	CHECK_RE_FROM_PRO : '/drug/checkReFromPro',
	MODIFY_PROVIDE : '/drug/modifyProvide',
	PRO_EDIT_SUBMIT : '/drug/proEditSubmit',
	
	//首营资料
	GET_ENTERPRISE_FIRST : '/drug/getEnterPriseFirst',
	
	
	// 采购计划单
	UPLOAD_PURCHASE : '/drug/uploadPurchase',
	DELETE_PURCHASE : '/drug/deletePurchase',
	SUBMIT_PURCHASE_PLAN :'/drug/submitPurchasePlan',
	GET_PURCHASE_PLAN : '/drug/getPurchasePlan',
	GET_PLAN_DRUG : '/drug/getPlanDrug',
	GET_SINGLE_PLAN : '/drug/getSinglePlan',
	EDIT_PURCHASE_PLAN :'/drug/editPurchasePlan',
	CHANGE_PLAN_STATE :'/drug/changePlanState',
	GET_COM_PURCHASE_PLAN :'/drug/getComPurchasePlan',
	
	// 货源查询
	GET_STOCK_DRUG : '/drug/getStockDrug',
	//医保目录查询
	GET_ENSURANCE_DRUG : '/drug/getEnsuranceDrug',
	//挂网耗材查询
	GET_APPLIANCE : '/drug/getAppliance',
	// 药品编码查询
	GET_DRUG_CODE : '/drug/getDrugCode',
	
	//综合统计
	APP_STATIS : '/drug/appStatis',
	
	// 账号注册 身份认证
	REGISTER : '/user/register',
	UPLOAD_AUTH : '/user/uploadAuth',
	DELETE_AUTH : '/user/deleteAuth',
	AUTH_SUBMIT : '/user/authSubmit',
	GET_AUTH : '/user/getAuth',
	CANCLE : '/user/cancle',
	
	FEED_BACK : '/user/feedBack',
	
	// 新闻资讯
	GET_NEWS : '/news/getNews',
	NEWS_DETAIL : '/news/newsDetail',
	
	// 积分
	SIGN_IN : '/point/signIn',
	IS_SIGN : '/point/isSign',
	LOAD_POINT : '/point/loadPoint',
	SHARE_NEWS :'/point/shareNews',
	GET_POINT_RULE : '/point/getPointRule',
	EXCHANGE_OUT : '/point/exchangeOut',
	
	// 论坛社区
	COMMUNITY_IMG_UPLOAD : '/community/uploadImg',
	COMMUNITY_IMG_DELETE : '/community/deleteImg',
	COMMUNITY_RELEASE : '/community/release',
	COMMUNITY_LOAD :'/community/load',
	COMMUNITY_TAB : '/community/tab',
	COMMUNITY_ALL_HOT : '/community/allHot',
	COMMUNITY_DETAIL : '/community/detail',
	COMMUNITY_COMMENT : '/community/comment',
	COMMUNITY_ADD_COMMENT : '/community/addComment',
	COMMUNITY_ZAN : '/community/zan',
	COMMUNITY_SEARCH : '/community/search',
	COMMUNITY_MY : '/community/my',
	//话题管理
	COMMUNITY_GET_TOPIC : '/community/getTopic',
	ADD_TOPIC : '/community/addTopic',
	EDIT_TOPIC : '/community/editTopic',

	//客服
	CHAT_IMG_UPLOAD : '/chat/chatImgUpload',
	SAVE_MESSAGE : '/chat/saveMessage',
	CHANGE_IS_READ : '/chat/changeIsRead',
	CHECK_NONE_USER : '/chat/checkNoneUser',
	CHECK_ADMIN_ID : '/chat/checkAdminId',
	LOAD_MESSAGE_LIST : '/chat/loadMessageList',
	GET_CHAT_LIST : '/chat/getChatList',
	DELETE_RECORED : '/chat/deleteRecored',
	SEARCH_USER : '/chat/searchUser',
	CHECK_RELATION_TYPE : '/chat/checkRelationType',
	USER_ADD_REQUEST : '/chat/userAddRequst',
	GET_USER_LIST : '/chat/getUserList',
	GET_NEW_FRIEND : '/chat/getNewFriend',
	CHECK_USER : '/chat/checkUser',
	NEW_RECORD_DEL : '/chat/newRecordDel',
	FRIEND_DEL : '/chat/friendDel',
};

var CONFIG = {
	// WS_HOST : 'ws://47.98.253.189:8383',
	WS_HOST : 'ws://47.98.253.189:8282',
}

// 全局数据
var globalData = {
	//存储条件
      storageCondition: [{
          value: 0,
          text: '-'
      }, {
          value: 1,
          text: '常温'
      }, {
          value: 2,
          text: '冷藏'
      }, {
          value: 3,
          text: '阴凉'
      }, {
          value: 4,
          text: '凉暗'
      },{
          value:5,
          text:'避光'
      },{
          value:6,
          text:'遮光'
      }],
      //药品分类
      drugCategory: [{
          value: 0,
          text: '-'
      }, {
          value: 1,
          text: '麻醉'
      }, {
          value: 2,
          text: '精一'
      }, {
          value: 3,
          text: '精二'
      }, {
          value: 4,
          text: '高警示药品'
      }, {
          value: 5,
          text: '毒性药品'
      }],

      //光敏
      drugSun: [{
          value: 0,
          text: '-'
      }, {
          value: 1,
          text: '避光'
      }, {
          value: 2,
          text: '遮光'
      }],

      //基药类别 value 表示数据库标记  text 文字说明
      JyCategory: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '非基药'
      }, {
          value: 2,
          text: '国家基药'
      }, {
          value: 3,
          text: '省补基药'
      }],
      //采购类别 value 表示数据库标记 text 文字说明
      BuyCategory: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '常规上网限价药品'
      }, {
          value: 2,
          text: '常用低价药品'
      }, {
          value: 3,
          text: '基础输液'
      }, {
          value: 4,
          text: '定点生产药品'
      }, {
          value: 5,
          text: '国家谈判药品'
      }, {
          value: 6,
          text: '中标药品'
      }, {
          value: 7,
          text: '自行采购药品'
      }, {
          value: 8,
          text: '妇儿专科非专利药品'
      }, {
          value: 9,
          text: '急（抢）救药品'
      }, {
          value: 10,
          text: '麻醉药品'
      }, {
          value: 11,
          text: '一类精神药品'
      }, {
          value: 12,
          text: '挂网限量采购药品'
      }, {
          value: 13,
          text: '其他挂网药品'
      }, {
          value: 14,
          text: '二类疫苗'
      }, {
          value: 15,
          text: '二类精神药品'
      }, {
          value: 16,
          text: '挂网限量采购药品（抗癌药专项集中采购药品）'
      }, {
          value: 17,
          text: '国家谈判药品（抗癌药专项集中采购药品）'
      }, {
          value: 18,
          text: '常规上网限价药品（抗癌药专项集中采购药品）'
      }, {
          value: 19,
          text: '挂网限量采购药品（中标药品）'
      }, {
          value: 20,
          text: '中标药品（抗癌药专项集中采购药品）'
      }, {
          value: 21,
          text: '抗癌药专项集中采购药品'
      }],
      //选择是否国产  value 表示数据库标记 text 文字说明
      IsChinaCategory: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '国产'
      }, {
          value: 2,
          text: '进口'
      }],
      //是否川产
      IsChuanProduce: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '川企'
      }, {
          value: 2,
          text: '省外'
      }, {
          value: 3,
          text: '投川省外'
      }, {
          value: 4,
          text: '川省投外'
      }],
      
      //药品是否医保
      InsuranceCategory: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '是'
      }, {
          value: 2,
          text: '否'
      }],
      //药品是否贵重
      IsExpensiveCategory: [{
          value: 0,
          text: '全部'
      }, {
          value: 1,
          text: '是'
      }, {
          value: 2,
          text: '否'
      }],
	  NewCountryCode:"国家新6.0码"
}

