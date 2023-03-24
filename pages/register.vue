  <template>
      <!-- 页面主体 -->
	  <view class="wcontent xq-flex-center xq-flex-vcenter">
		  <view class="rtdiv"></view>
		  <view class="lbdiv"></view>
		  <view class="wcmid xq-nowrap">
			  <view class="wleft xq-no-scale xq-flex-center xq-flex-vcenter">
				  <view>
					 <view class="headerdiv">
						 <image class="headerpic" src="../static/loginheader.png"></image>
						 <image class="telpic" src="../static/phone.png"></image>
					 </view>
					 <view class="msgdiv xq-white xq-bold xq-text-center xq-fz34">
						 Select to proceed
					 </view>
					 <view class="logon xq-cur" @click="loginurl">Sign in</view>
					 <view class="signin">Logon</view>
				  </view>
			  </view>
			  <view class="wright xq-flex1 xq-flex-center xq-flex-vcenter">
				  <view class="wrc">
					  <view class="wrtel xq-bold">Welcome to Register</view>
					  <view class="wrsmall xq-bold">Sign in with Eamil</view>
					  <view class="inputel">Eamil</view>
					  <view class="cinput">
					  	 <input v-model="name"  type="text" />
					  </view>
					  <view class="inputel">Verification Code</view>
					  <view class="cinput xq-flex-cbetween">
					  	 <input class="xq-flex1" v-model="code"  type="text"  />
						 <view class="xq-no-scale xq-cur gain" :style="countDownNum!=60 && 'background:#848986'" @click="getCode">
				            {{sms_code_text}}
						 </view>
					  </view>
					  <view class="inputel">Password</view>
					  <view class="cinput xq-flex-cbetween">
					  	 <input class="xq-flex1" v-model="password"  :type="type" />
						 <view class="xq-no-scale xq-cur">
							  <view v-if="type=='password'" @click="type='text'" class="xq-icons icon-eye xq-fz24 ico"></view>
							  <view v-if="type=='text'" @click="type='password'" class="xq-icons icon-close xq-fz24 ico"></view>
						 </view>
					  </view>
					  <view @click="login" class="loginin xq-white xq-fz32">Sign in</view>
				  </view>
			  </view>
		  </view>
		  <view class="xqbottom xq-flex-center xq-flex-vcenter">
			 <view><text>Refund Policy</text> Terms of Service</view><view>Copyright @ 2022 Last Seen</view>
		  </view>
	  </view>	
<!-- 	 -->
  </template>
<script>
  var _this;
  import { message } from 'ant-design-vue';
  export default {
    data() {
      return {
		 sms_code_text:"gain",
		 countDownNum: 60,
		 timeout: null,
		 name:"",
		 code:"",
		 password:"",
		 type:"password"
      }
    },
	components: {
	},
    onLoad:function(){
      _this=this;
    },
	computed:{
		
	},
    methods:{
		getCode() {
			if(!_this.name){
				message.warn("Mailbox cannot be empty")
				return;
			}
			var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if(!re.test(_this.name)){
				message.warn("Mailbox error")
				return;
			}
			if (this.countDownNum != 60) {
				return;
			}
			this.$request2({
				url: _this.$api.dev.getcode,
				data:{
				  username:_this.name,
				},
				method: 'get',
			}).then(res => {
				if(res.code==200){
					_this.smsCountDown() 
					message.success("success");
				}else{
					message.error("fail");
				}
				console.log(96,res);
			})
		},
		smsCountDown() {
		  let self = this
		  if (this.countDownNum > 0) {
		    this.countDownNum--
		    this.sms_code_text = this.countDownNum + 's'
		  } else if (this.countDownNum == 0) {
		    this.countDownNum = 60
		    this.sms_code_text = 'gain'
		    clearTimeout(self.timeout)
		    return
		  } else {
		    this.countDownNum = 60
		    this.sms_code_text = 'gain'
		    clearTimeout(self.timeout)
		    return
		  }
		  this.timeout = setTimeout(function () {
		    self.smsCountDown()
		  }, 1000)
		},
	  loginurl(){
		uni.navigateTo({
			url:"/pages/login"
		})  
	  },
	  login(){
		if(!_this.name){
			message.warning('Mailbox cannot be empty');
			return;
		}
		if(!_this.code){
			message.warning('The code cannot be empty');
			return;
		}
		if(!_this.password){
			message.warning('The password cannot be empty');
			return;
		}
		uni.showLoading({
			title:"loading"
		});
		this.$request2({
			url: _this.$api.dev.register,
			data:{
			  username:_this.name,
			  code:_this.code,
			  password:_this.password
			},
			method: 'get',
		}).then(res => {
			console.log(res)
			if(res.data.code==1){
				message.success("Successful registration")
				uni.setStorageSync('lastinfo',res.data.data);
				uni.setStorageSync('token',res.data.token);
				setTimeout(function(){
					uni.navigateTo({
					   url:"/pages/index"
					})	
				},1500) 
			}else{
				message.error(res.message);
			}
		}) 
	  }
    }
  }
  </script>
<style scoped>
.gain{
	width:100px;
	text-align:center;
	background:#07C160;
	height:22px;
	line-height:20px;
	color:#fff;
	font-size:16px;
	border-radius:5px;
}
.wcontent{
	position:relative;
	width:100%;
	height:100%;
	overflow:hidden;
}
.xqbottom{
	width:100%;
	height:40px;
	position:absolute;
	bottom:0;
	z-index:99;
}
.xqbottom view{
	margin:0 20px;
	line-height:60px;
	font-size:16px;
}
.xqbottom view text{
	color:#3AAAA9;
}
.wrc{
	width:450px;
}
.wrtel{
	color:#07C160;
	font-size:42px;
}
.wrsmall{
	color:#07C160;
	font-size:28px;
	margin-top:10px;
}
.inputel{
	color:#07C160;
	font-size:16px;
	margin:25px 0px 0px 0px;
}
.cinput{
	border-bottom:1px solid #8B8B8B;
}
.cinput input{
	line-height:40px;
	height:40px;
}
.ico{
	color:#666;
}
.loginin{
	background: #07C160;
	box-shadow: 0px 5px 15px 0px rgba(58,170,168,0.5);
	border-radius: 20px;
	height:60px;
	text-align:center;
	margin-top:30px;
	cursor:pointer;
}

.wleft{
	height:100%;
	width:520px;
	background:url("../static/bj.png");
	background-size:100% 100%;
	padding:40px 60px;
}
.headerdiv,.headerpic{
	width:220px;
	height:220px;
	position:relative;
}
.telpic{
	height:50px;
	width:50px;
	position:absolute;
	bottom:2px;
	right:15px;
}
.msgdiv{
	line-height:100px;
}
.signin{
	background: #FFFFFF;
	border-radius: 39px;
	text-align:center;
	width:220px;
	height:60px;
	line-height:56px;
	font-size:24px;
	color:#3AA9AA;
	border:1px solid #fff;
}
.logon{
	border-radius: 39px;
	text-align:center;
	width:220px;
	height:60px;
	line-height:56px;
	font-size:24px;
	color:#fff;
	border:1px solid #fff;
	margin-bottom:30px;
}
.wcmid{
	width:85%;
	height:78%;
	background: #FFFFFF;
	box-shadow: 0px 5px 50px 0px rgba(186,186,186,0.5);
	border-radius: 20px;
	margin-top:-30px;
	position:relative;
	z-index:9;
	overflow:hidden;
}
.rtdiv{
	width:360px;
	height:360px;
	background: #E35E6A;
	border-radius:50%;
	position:absolute;
	top:-180px;
	right:-180px;
	z-index:0;
}
.lbdiv{
	width:360px;
	height:360px;
	background: #FBC940;
	border-radius:50%;
	position:absolute;
	bottom:-180px;
	left:-180px;
	z-index:0;
}
</style>
                   