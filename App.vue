<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound: function(res) {
			// 跳转到 404 页面：
			uni.redirectTo({
				url: "pages/index/index",
			});
		},

	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import "./xqUI/xqUI.css";
	@import "./xqUI/xqIcons.css";
	/* #endif */
	
	*{padding:0;margin:0;}
	page{background:#fff;}
	
	::-webkit-scrollbar{
	  width:6px;
	  height:10px;
	}
	::-webkit-scrollbar-thumb {
	  border-radius: 3px;
	  background:#36B374;
	}
	::-webkit-scrollbar-track {
	  background: none;
	}
	.ant-picker-input input{border:none !important;}
	.ant-picker-header button{background:none !important;border:none !important;}
	.ant-picker-header .ant-picker-header-super-prev-btn,
	.ant-picker-header .ant-picker-header-super-next-btn{margin:0 15px;}
	
	/* .red{color:red;}
	.blue{color:#40a9ff;}
	.ant-btn-primary,uni-button[type='primary']{background:#19a819 !important; border-color:#19a819 !important;}
	.ant-pagination-item-active,.ant-pagination-item-active:hover,.ant-pagination-item:hover{border-color:#19a819 !important;}
	.ant-pagination-item-active a{color:#19a819 !important;}
	.ant-pagination-item:hover a{color:#19a819 !important;}
	uni-button:after{height:198% !important;} */

	/* input{display:none !important;} */
	
	/* .gree{color:#19A819;}
	.greebtn{border:1px solid #19A819; padding:0 10px; border-radius:4px;}
	.cur{cursor: pointer;}
	.w12{width:1200px;margin:auto;}
	.w10{width:1000px;margin:auto;} */
</style>
