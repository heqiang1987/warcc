  <template>
      <!-- 页面主体 -->
	  <view @click="closemenu"  class="wcontent">
		<xqheadertop ref="header" @renew="renew"></xqheadertop>
		<view class="content">
			<view v-if="list.length==0">
				<view class="noacc xq-text-center">
					<image mode="widthFix" src="../static/noacc.png"></image>
					<view class="track xq-bold xq-fz36 xq-color5">You have no contacts to track yet</view>
				    <view class="xq-color5 xq-fz28">add a contacte to start tracking</view>
				    <view class="btnview xq-white xq-bold xq-fz36 xq-cur" @click="addacc">
						add a contacte
					</view>
				</view>
			</view>
			<view v-else>
				<view class="addcount xq-text-center xq-bold xq-cur" @click="addacc">
					+ Add a new contact
				</view>
				<view class="clist" v-if="powerinfo.ac">
					<view class="cview xq-flex-cbetween" v-for="(item,index) in list">
						<view class="xq-flex1 cviewleft xq-flex-cbetween">
						   <view class="xq-nowrap xq-flex-vcenter">
							   <image :src="item.pic?item.pic:'../static/nohead.png'" class="header"></image>
						       <view>
								   <view class="cname">{{item.name}}</view>
								   <view class="cmobile">+{{item.mobile}}</view>
							   </view>
						   </view>
						   <view class="activate" v-if="item.endtime==0" @click="godetail(item)">activate</view>
						   <view class="activate act" v-else @click="godetail(item)">activate</view>
						</view>
						<view class="del xq-no-scale xq-cur xq-flex-center xq-flex-vcenter">
							<view class="xq-icons icon-msg xq-fz36 delcolor mr" style="color:#07C160"  v-if="item.del==1 && item.ismsg==1"></view>
							<view class="xq-icons icon-nomsg xq-fz36 delcolor mr" v-else-if="item.del==1 && item.ismsg==0"></view>
							<view class="xq-icons icon-del xq-fz36 delcolor"  @click="del(item,index)" v-if="item.del==1"></view>
							<view class="xq-icons icon-more xq-fz36 delcolor"  @click="del(item,index)" v-else></view>
						</view>
					</view>
					<view style="width:100%;height:80px;"></view>
				</view>
			</view>
		</view>
		 <a-modal
		  v-model:visible="modal2Visible"
		  title=""
		  width="900px"
		  :closable="false"
		  :footer="null"
		  centered
		  @ok="modal2Visible = false"
		>
		  <view class="xq-text-center">
			  <image src="../static/clock.png" class="clock"></image>
		  </view>
		  <view class="xq-text-center xq-bold mtel">
			  Link WhatsApp Account
		  </view>
		  <view class="mwen">
			  Link your WhatsApp account to enable the app to track your contacts on WhatsApp.
		  </view>
		  <view class="mbtn xq-cur xq-text-center xq-white" @click="linkwhatapp">
			  LINK WHATSAPP
		  </view>
		 </a-modal>
	  </view>	
<!-- 	 -->
  </template>
<script>
  import xqheadertop from "../xqUI/components/xqHeaderTop.vue" 
  import siteInfo from '../siteinfo.js'
  import { message } from 'ant-design-vue';
  import io from 'socket.io-client';
  var _this;
  export default {
    data() {
      return {
		 info:"",
		 modal2Visible:false,
		 list:[],
		 home:"1",
		 socket:"",
		 ishave:true,
		 powerinfo:{
			 ac:1
		 }
      }
    },
	components: {
	    // 声明要使用哪些组件
	  xqheadertop
		// xqheaderbot
	},
    onLoad:function(){
       _this = this;
	   var info = uni.getStorageSync('userpower');
	   if(info){
		   _this.powerinfo=info;
	   }
	   this.init();
    },
	onShow() {
		console.log(new Date().valueOf()-30*24*3600*1000)
		//this.init();
	},
	computed:{
		getuser:function(){
			return uni.getStorageSync("lastinfo")?uni.getStorageSync("lastinfo"):"";
		},
		havepower:function(){
			return uni.getStorageSync("userpower")?uni.getStorageSync("userpower").ac:1;
		}
	},
    methods:{
	  renew(data){
		this.powerinfo = data;
	  },
	  init(){
		 if(uni.getStorageSync("lastinfo")){
			 uni.showLoading({
			 	title:"loading"
			 })
			 _this.$request({
			 	url: _this.$api.user.getacc,
			 	method: 'get',
				data:{}
			 }).then(res => {
				 console.log(80,res.data)
				if(res.code==200){
					var list = res.data.list;
					list.forEach(function(v,k){
						v.del=0;
					})
					_this.list = list;
					_this.ishave=res.data.ishave;
					// if(!res.data.ishave){
					// 	_this.modal2Visible=true;
					// }
				}
			 }) 
		 }else{
			 _this.list=[];
		 }
	  },
	  linkwhatapp(){
		  _this.modal2Visible = false;
		  uni.navigateTo({
		  	url:"/pages/qr"
		  })
	  },
	  del(item,index){
		if(item.del==0){
			item.del=1;
			return;
		}
		uni.showModal({
			title: 'Tip',
			cancelText:'Cancel',
			confirmText:'Confirm',
			content: 'Are you sure to delete it?',
			success: function (res) {
				if (res.confirm) {
					uni.showLoading({
						title:"loading"
					})
					_this.$request({
						url: _this.$api.user.delacc,
						method: 'get',
						data:{id:item.id}
					}).then(res => {
						if(res.code==200){
							message.success('Success');
							_this.list.splice(index,1)
							//_this.init();
						}else{
							message.error("失败");
						}
					}) 
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		}); 
	  },
	  closemenu(){
		  this.$refs.header.onClose();
	  },
	  addacc(){
		  if(!_this.getuser){
			  uni.navigateTo({
				url:"/pages/login"
			  })
			  return;
		  }
		  if(!_this.ishave){
			  _this.modal2Visible=true;
			  return;
		  }
		  uni.navigateTo({
		  	url:"/pages/add"
		  })
	  },
	  godetail(item){
		  if(!_this.getuser){
			  uni.navigateTo({
			  	url:"/pages/login"
			  })
			  return;
		  }
		  if(item.endtime==0){
			 //'https://gooochadmin.dev237.ynccxx.cn/wacaring/cart?id=9007&tid=1&uid=token&tpaid=18'
			 var url = siteInfo.carurl+uni.getStorageSync("token")+"&tpaid="+item.id;
			  window.location =url
			 return;  
		  }
		  if(!_this.ishave){
			  _this.modal2Visible=true;
			  return;
		  }
		  uni.navigateTo({
		  	url:"/pages/detail?id="+item.id
		  })
	  }
    }
  }
  </script>
<style>
.icon-msg{
   margin-right:10px;
}
.clock{
	width:180px;
	height:180px;
}
.mtel{
	color: #5E5E5E;
	font-weight:bold;
	font-size:28px;
}
.mwen{
	width:400px;
	font-size:16px;
	margin:auto;
	margin-top:10px;
	line-height:26px;
}
.mbtn{
	width:380px;
	height:50px;
	line-height:50px;
	margin:30px auto 20px;
	font-weight:bold;
	background: #07C160;
	box-shadow: 0px 5px 15px 0px rgba(58,170,168,0.5);
	border-radius: 20px;
}
.addcount{
	color:#07C160;
	font-size:38px;
	border:1px dashed #07C160;
	border-radius:10px;
	height:70px;
	line-height:60px;
}	
.wcontent{
  min-height:100%;
}
.track{
  margin-top:-40px;	
}
.content{
	width:80%;
	margin:auto;
	padding-top:10px;
	position:relative;
	z-index:0;
}
.noacc image{
	width:482px;
	height:482px;
}
.btnview{
width: 585px;
height:70px;
line-height:65px;
background: #07C160;
box-shadow: 0px 5px 15px 0px rgba(58,170,168,0.5);
border-radius: 20px;
margin:20px auto;
text-transform:uppercase
}
.btnview:hover{
	opacity:.8;
}

.cview{margin-bottom:20px;}
.clist{margin-top:40px;}
.cviewleft{
	background:#F4F8F7;
	height:120px;
	border-radius: 20px;
	padding:20px 20px;
}
.header{
	height:80px;
	width:80px;
	margin-right:20px;
	border-radius:100px;
}
.cname{
	color: #A5A5A5;
	font-size:18px;
	font-weight:bold;
}
.cmobile{
	color: #A5A5A5;
	font-size:14px;
}
.activate{
	width: 183px;
	height: 70px;
	background: #F4F8F7;
	border: 2px solid #07C160;
	border-radius: 15px;
	font-size:24px;
	text-align:center;
	line-height:65px;
	color:#07C160;
	cursor:pointer;
	font-weight:bold;
}
.activate.act{
	background: #07C160;
	color:#fff;
}

.del{
	width:120px;
	text-align:center;
}
.delcolor{
	color:#909090;
}
.mr{
	margin-right:10px;
}
</style>
                   