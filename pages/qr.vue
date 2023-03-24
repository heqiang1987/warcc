  <template>
      <!-- 页面主体 -->
	  <view @click="closemenu" class="wcontent">
		<xqheadertop ref="header"></xqheadertop>
		<view class="content">
			<view class="xq-text-center xq-fz36 xq-bold tel">Authorized login</view>
		    <view class="xq-nowrap qrcontent">
				<view class="xq-flex1 xq-flex-end">
					<view class="endc">
						<view class="xq-bold blanktel xq-fz28">
							To link your WhatsApp Account:
						</view>
						<view class="slist">
							1.Open Whats App on your phone
						</view>
						<view class="slist">
							2.Tap Settings<image src="../static/settings_android.svg"></image><image src="../static/settings_ios.svg"></image>→ Linked Devices → Link a Device
						</view>
						<view class="slist">
							3.Point your phone at the QR code to scan it
						</view>
					</view>
				</view>
				<view class="xq-no-scale qrw xq-flex-end">
					<image v-if="qr" class="qrimg" :src="qr"></image>
				    <view v-else class="noqr xq-flex-center xq-flex-vcenter">
						<div class="ring-1"></div>
					</view>
				</view>
			</view>
		</view> 
	  </view>	
<!-- 	 -->
  </template>
<script>
  import xqheadertop from "../xqUI/components/xqHeaderTop.vue" 
  import io from 'socket.io-client'
  import apiUrl from '/siteinfo.js';
  import { message } from 'ant-design-vue';
  var _this;
  export default {
    data() {
      return {
		qr:""
      }
    },
	components: {
	    // 声明要使用哪些组件
	  xqheadertop
		// xqheaderbot
	},
    onLoad:function(){
       _this = this;
	   console.log(54,uni.getStorageSync("lastinfo"))
	   if(!uni.getStorageSync("lastinfo")){
		   uni.navigateTo({
		   	url:"/pages/login"
		   })
		   return;
	   }
	   console.log(55,apiUrl.wsroot)
	   _this.socket = io.connect(apiUrl.wsroot, {transports: ['websocket']});
	   _this.socket.on('connect', (res) => {
	   	 _this.socket.emit('StartConnection',uni.getStorageSync("lastinfo").id+"goooch");
	   })
	   _this.socket.on('qr', function (src) {
		      console.log(67,src)
	         _this.qr = src;
	   })
	   _this.socket.on('ready', function (src) {
	        setTimeout(function(){
				uni.navigateTo({
					url:"/pages/index"
				})
		    },1000)
	   })
    },
	onShow() {
		this.init();
	},
	computed:{
		getuser:function(){
			return uni.getStorageSync("lastinfo")?uni.getStorageSync("lastinfo"):"";
		}
	},
    methods:{
	  init(){},
	  closemenu(){
	  	this.$refs.header.onClose();
	  }
    }
  }
  </script>
<style>
.content{
	width:80%;
	margin:auto;
	padding-top:10px;
	position:relative;
	z-index:0;
}
.endc{
	width:600px;
}
.qrcontent{
	margin:50px auto 0;
	max-width:1100px;
	width:100%;
}
.blanktel{
	color:#5E5E5E;
	margin-bottom:30px;
}
.slist{
	color:#5E5E5E;
	font-size:22px;
	margin-bottom:15px;
	line-height:22px;
}
.slist image{
	width:22px;
	height:22px;
	margin:0 5px;
	vertical-align:middle;
}
.qrw{
	width:360px;
}
.qrimg{
	width:250px;
	height:250px;
}
.noqr{
	width:250px;
	height:250px;
	text-align:center;
	border:1px solid #efefef;
}
.tel{
	color:#07C160;
	padding-top:40px;
}

.ring-1 {
  width:80px;
  height:80px;
  margin: 0 auto;
  padding: 10px;
  border: 7px dashed #4b9cdb;
  border-radius: 100%;
}
.ring-1 {
  animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}
@keyframes loadingD {
  0 {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
 

</style>
                   