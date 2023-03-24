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
					 <view class="signin">Sign in</view>
					 <view class="logon xq-cur" @click="register">Logon</view>
				  </view>
			  </view>
			  <view class="wright xq-flex1 xq-flex-center xq-flex-vcenter">
				  <view class="wrc">
					 <!-- <view class="xq-text-center">
						   <image style="width:212px;" src="../static/logo.png?v=1" mode="widthFix"></image>
					  </view> -->
					  <view class="wrtel xq-bold">Welcome to Login</view>
					  <view class="wrsmall xq-bold">Sign in with Eamil</view>
					  <view class="inputel">Email</view>
					  <view class="cinput">
					  	 <input v-model="name"  type="text" />
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
					  <view class="msgremark xq-fz16 xq-cur" @click="register">If you don't have an account, <text>now register</text></view>
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
		 time:"",
		 name:"",
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
	  register(){
		uni.navigateTo({
			url:"/pages/register"
		})  
	  },
	  getsw(){
		 uni.showLoading({
		 	title:"landing"
		 });
		 this.$request({
		 	url: _this.$api.user.getsw,
		 	method: 'get',
			data:{}
		 }).then(res => {
			 if(res.code==200){
				uni.setStorageSync('userpower',res.data[0]); 
				uni.navigateTo({
				  url:"/pages/index"
				})	
			 }
		 }) 
	  },
	  login(){
		if(!_this.name){
			message.warning('The account cannot be empty');
			return;
		}
		if(!_this.password){
			message.warning('The password cannot be empty');
			return;
		}
		uni.showLoading({
			title:"landing"
		});
		this.$request2({
			url: _this.$api.dev.login,
			data:{
			  username:_this.name,
			  password:_this.password
			},
			method: 'get',
		}).then(res => {
			if(res.data.code==1){
				 uni.setStorageSync('lastinfo',res.data.data);
				 uni.setStorageSync('token',res.data.token);
				 _this.getsw();	 
			}else{
				message.error(res.message);
			}
		}) 
	  }
    }
  }
  </script>
<style scoped>
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
	width:400px;
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
	margin-top:30px;
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
.msgremark{
	color:#999;
	line-height: 40px;
	padding:10px 0 0 10px;
}
.msgremark text{
	color:red;
}
</style>
                   