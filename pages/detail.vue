  <template>
      <!-- 页面主体 -->
	  <view @click="closemenu" class="wcontent">
		<view class="headtop">
			<view class="headtopmid xq-flex-cbetween">
				<view class="xq-nowrap xq-flex-vcenter">
					<view @click.stop="goback" class="xq-icons icon-back xq-white xq-fz28 xq-cur"></view>
					<view @click.stop="visible=true" class="xq-white xq-bold xq-fz28 tlast xq-cur">ACTIVITY LOG</view>
				</view>
				<view>
				<!-- 	<a-range-picker  v-model:value="time" valueFormat="YYYY-MM-DD"  :placeholder="['start', 'end']" @change="onChange" /> -->
				</view>
			</view>
		</view>
		<view class="h70"></view>
		<view class="content">
			<view class="xq-flex-cbetween userinfo" v-if="iacc">
				<view class="xq-nowrap xq-flex-vcenter">
					<image style="width:80px;height:80px;margin-right:15px;border-radius:100px;" :src="accinfo.pic"></image>
				    <view>
						<view class="xq-bold uname">{{accinfo.name}}</view>
						<view class="umobile">+{{accinfo.mobile}}</view>
					</view>
				</view>
				<view class="lastright">
					<view class="last">Last Seen</view>
					<view class="lasttime xq-bold">{{accinfo.recently}}</view>
				</view>
			</view>
			<view class="dlist" v-if="dlist.length>0">
				<view class="dtel xq-flex-cbetween">
					<view class="xq-no-scale gb"></view>
					<view class="xq-flex-cbetween xq-flex1 mdw">
						<view  class="dmenu cor1">Online</view>
						<view  class="dmenu cor2 xq-text-center">Duration</view>
						<view  class="dmenu cor3" style="width:150px;text-align:right;">Offline</view>
					</view>
					<view class="xq-no-scale gb"></view>
				</view>
				<view class="dclist xq-nowrap xq-flex-vcenter" v-for="(item,index) in dlist">
					<view class="xq-no-scale gb m1"></view>
					<view class="xq-flex-cbetween xq-flex1 mdw">
						<view>
							<view class="cor1 xq-bold xq-fz20">{{item.start_time}}</view>
							<view class="cor5 xq-fz14">{{item.start_date}}</view>
						</view>
						<view  class="dmenu cor2 xq-text-center xq-fz24">
							{{(item.unavailable && item.unavailable !=0)?item.diff:index==0?'online':''}}
						</view>
						<view style="width:150px;text-align:right;">
							<view class="cor3 xq-bold xq-fz20">{{item.end_time}}</view>
							<view class="cor5 xq-fz14">{{item.end_date}}</view>
						</view>
					 </view>
					<view class="xq-no-scale gb m2"></view>
				</view>
			</view>
			<view v-else>
				<view class="nodata" v-if="!iscomplete">{{message}}</view>
				<view v-else>
					<view class="nodata" v-if="haveshow">
						{{message}}
						<view v-if="!isupdate" @click="isupdate=true" class="changdiv xq-cur">You can change your account number</view>
						<view v-else>
						<view class="cinput">
							<input v-model="name"  placeholder="Enter a name"  type="text" />
						</view>
						<view style="width:100%;height:20px;"></view>
						<view class="xq-nowrap cinput xq-flex-vcenter">
							<view v-if="selectinfo" @click="visible=true" class="xq-nowrap xq-flex-vcenter xq-no-scale cmobileleft xq-cur">
								<span style="font-size:32px;" :class="'iti-flag '+selectinfo.iso2"></span>
								<view class="pref">+{{selectinfo.dialCode}}</view>
							</view>
							<view v-else @click="visible=true" class="xq-nowrap xq-no-scale cmobileleft xq-cur pref" style="color:#07C160;">
								Internationally
							</view>
							<view class="mdg xq-no-scale"></view>
							<view class="cinput cinput2">
								<input v-model="mobile"  type="number" />
							</view>
						</view>
						<view style="width:100%;height:20px;"></view>
						<view class="btnview xq-white xq-bold xq-fz16 xq-cur" @click="updatefn">
							Immediate modification
						</view>
						</view>
					</view>
					<view class="nodata" v-else>
						{{message}},Please wait
					</view>
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
		 <a-modal v-model:visible="visible" :footer="false" width="600px"  @ok="handleOk">
		        <view style="padding:20px 40px;">
					<Vue3CountryIntl  @onChange="chagedata" v-model="countryCode"></Vue3CountryIntl>
					<view @click="selectfn" class="Confirmdiv xq-text-center xq-white xq-fz16 xq-cur">Confirm</view>
		 	   <!-- <view style="width:100%;height:30px;"></view>
		 	   <view class="boxsearch xq-nowrap xq-flex-vcenter">
		 		   <view class="xq-no-scale ">
		 			   <view class="xq-icons icon-search searico"></view> 
		 		   </view>
		 		   <view class="xq-flex1 xqsearch">
		 		   <input  v-model="keyword"  type="text" />
		 		   </view>
		 	   </view>
		 	    <view style="width:100%;height:30px;"></view>
		 	   <view class="tbox">
		 		   <view class="xq-nowrap xq-flex-vcenter xq-cur numlist" @click.stop="selectfn(index,item)" v-for="(item,index) in getlist">
		 			   <img :src="item.img" class="gpic" />
		 			   <view class="numpre">+{{item.pre}} {{item.name}}</view>
		 		   </view>
		 	   </view> -->
		 	   </view>
		  </a-modal>
	  </view>	
<!-- 	 -->
  </template>
<script>
  var _this;
  import { message } from 'ant-design-vue';
  import { parsePhoneNumber } from 'libphonenumber-js';
  import apiUrl from '/siteinfo.js';
  import io from 'socket.io-client'
  export default {
    data() {
      return {
		 countryCode:"",
		 id:0, 
		 iscomplete:false,
		 modal2Visible:false,
		 visible:false,
		 keyword:"",
		 mobile:"",
		 name:"",
		 isupdate:false,
		 dlist:[],
		 message:"loading data",
		 isload:false,
		 accinfo:{
		  recently:"",
		  addtimecreate:0,
		 },
		 selectinfo:"",
		 iacc:false,
		 time:"",
		 list:[]
      }
    },
    onLoad:function(option){
	  _this = this;
	  _this.id = option.id?option.id:0;
	  if(!uni.getStorageSync("lastinfo")){
		   uni.navigateTo({
			 url:"/pages/login"
		   })
		   return;
	   }
	  _this.init();
	  //_this.getadetail();
    },
	computed:{
		haveshow(){
			//new Date().valueOf() - 24*3600*1000,给一天时间的监听
			if(!_this.accinfo.addtimecreate){
				return false;
			}else{
				if(new Date().valueOf()- 24*3600*1000>_this.accinfo.changetime){
					return true;
				}else{
					return false;
				}
				
			}
		},
		getlist:function(){
			let list = [];
			if(_this.keyword){
				list = _this.list.filter(function(v,k){
					 if(v.allname.indexOf(_this.keyword) !=-1){
						 return true;
					 }else{
						 return false;
					 }
				})
			}else{
				list = _this.list;
			}
			return list;
		}
	},
    methods:{
	  init(type=0){
		 uni.showLoading({
		 	title:"loading"
		 })
		 _this.$request({
		 	url: _this.$api.user.detailacc,
		 	method: 'get',
		 	data:{accid:_this.id}
		 }).then(res => {
			 console.log(85,res.data)
			if(res.code==200){
				_this.isload=true;
				_this.iscomplete=true;
				var list = res.data.list;
				_this.accinfo = res.data.info;
				_this.initdata();
				if(!_this.accinfo.pic){
					 _this.accinfo.pic="../static/nohead.png"
				}
				_this.iacc = true;
				if(list[0]){
					_this.accinfo.recently = _this.getdate(list[0].available)
				}else{
					_this.message="No data yet"
				}
				list.forEach(function(v,k){
					//console.log(92,v);
					if(v.unavailable){
						let diff = v.unavailable-v.available;
						var leave1=diff%3600;
						var hours = Math.floor(diff/3600)
						var minutes = Math.floor(leave1/60)
						var seconds = Math.floor(leave1%60);
						v.diff = hours+":"+minutes+":"+seconds
						//console.log(95,diff,hours,minutes,seconds,leave1);
					}else{
						v.diff = ""
					}
				})
				_this.dlist = list;
				if(type==0){
				  _this.sock();
				}else{
				  _this.socket.emit('WhatsConnection',{..._this.accinfo,...{device:uni.getStorageSync("lastinfo").id+"goooch"}});
				}
			}
		 })
	  },
	  sock(){
		_this.socket = io.connect(apiUrl.wsroot, {transports: ['websocket']});
		_this.socket.on('connect', (res) => {
			_this.socket.emit('WhatsConnection',{..._this.accinfo,...{device:uni.getStorageSync("lastinfo").id+"goooch"}});
		 })
		 _this.socket.on('qr', function (src) {
			    console.log(227,src);
		 		_this.modal2Visible=true;
		 })
		 _this.socket.on('succ', function (value) {
		 	console.log(67,value)
		 })
	  },
	  getadetail(){
		  _this.$request({
		  	url: _this.$api.user.adetail,
		  	method: 'get',
		  	data:{accid:_this.id}
		  }).then(res => {
			  if(res.code==200){
				  _this.accinfo = {..._this.accinfo,...res.data};
				  if(!_this.accinfo.pic){
					  _this.accinfo.pic="../static/nohead.png"
				  }
				  _this.iacc = true;
				  //_this.init();
			  }else{
				  message.error(res.message);
			  }
		  })
	  },
	  initdata(){
		 console.log(301,this.accinfo);
		 console.log(this.list);
		 this.name = this.accinfo.name;
		 this.mobile = this.accinfo.account;
		 this.selectinfo = JSON.parse(this.accinfo.datastring);
	  },
	  chagedata(e){
	  		console.log(1466,e);
	  		this.selectinfo=e;
	  },
	  linkwhatapp(){
		  _this.modal2Visible = false;
		  uni.navigateTo({
			url:"/pages/qr"
		  })
	  },
	  getdate(t){
		 var times = t*1000;
		 var now = new Date(parseFloat(times));
		 var year=now.getFullYear();
		 var month=now.getMonth()+1;
		 var date=now.getDate();
		 if (month >= 1 && month <= 9) {
		   month = "0" + month;
		}
		if (date >= 0 && date <= 9) {
		   date = "0" + date;
		}
		var hour=now.getHours();
		var minute=now.getMinutes();
		var second=now.getSeconds();
		if (hour >= 1 && hour <= 9) {
		hour = "0" + hour;
		}
		if (minute >= 0 && minute <= 9) {
		minute = "0" + minute;
		}
		if (second >= 0 && second <= 9) {
		second = "0" + second;
		}
		
		var todaydate = new Date() // 获取时间
		var today_year = todaydate.getFullYear() // 获取年
		var today_month = todaydate.getMonth(); // 获取月
		var today_date = todaydate.getDate() // 获取日
		if(year==today_year && now.getMonth()==today_month && now.getDate()==today_date){
			return "Today "+hour+":"+minute+":"+second
		}else{
			return year+"-"+month+"-"+date+"  "+hour+":"+minute+":"+second
		}
	  },
	  onChange(){
		  
	  },
	  goback(){
		  uni.navigateTo({
		  	url:"/pages/index"
		  })
	  },
	  updatefn(){
		 if(!_this.name){
			 message.warning('The name cannot be empty');
			 return;
		 }
		 if(!_this.mobile){
			 message.warning('The phone cannot be empty');
			 return;
		 }
		 var mobile = _this.selectinfo.dialCode+_this.mobile;
		 const phoneNumberObj = parsePhoneNumber("+"+mobile);
		 if (!phoneNumberObj.isValid()) {
			message.warning('The phone number is incorrect');
			return;
		 }
		 var param={
			 name:_this.name,
			 mobile:mobile,
			 pre:_this.selectinfo.dialCode,
			 account:_this.mobile,
			 datastring:JSON.stringify(_this.selectinfo),
			 cid:_this.accinfo.id
		 }
		 uni.showLoading();
		 this.$request({
		 	url: _this.$api.user.updateacc,
		 	data:param,
		 	method: 'get',
		 }).then(res => {
		 	if(res.code==200){
				message.success("success")
				//_this.isupdate = false;
				_this.init(1);
			  //_this.socket.emit('WhatsConnection',{..._this.accinfo,...{device:uni.getStorageSync("lastinfo").id+"goooch"}});
		 	}else{
		 		message.error(res.message);
		 	}
		 })  
	  },
	  selectfn(){
		// console.log(103,index)
		// this.inde=index;
		// this.selectinfo=item;
		this.visible=false;  
	  },
    }
  }
  </script>
<style>
.changdiv{
	background:#07C160;
	width:400px;
	height:40px;
	line-height:40px;
	color:#fff;
	margin:20px auto;
	border-radius:10px;
}
.changdiv:hover{
	opacity:.8;
}
.cor1{color:#00AD14;}
.cor2{color:#FF8915;}
.cor3{color:#FF2A00;}
.cor5{color:#A5A5A5;}
.dlist{margin-top:30px;}
.nodata{text-align:center;font-size:32px;padding:40px 0 0 0;color:#999;}
.dclist{
	height: 100px;
	background: #FFFFFF;
	box-shadow: 2px 5px 16px 0px rgba(129,129,129,0.26);
	border-radius: 16px;
	margin-bottom:20px;
}
.mdw{
  padding:0 15px;
}
.m1{
	height:100%;
	background:#07C160;
	border-radius:16px 0 0 16px;
}
.m2{
	height:100%;
	background:#FF2A00;
	border-radius:0px 16px 16px 0px;
}
.dmenu{
	line-height:40px;
	font-size:24px;
	font-weight:bold;
	padding-bottom:10px;
}
.gb{
	width:20px;
}
.uname{
 font-weight:bold;
 color: #727272;
 font-size:22px;
}
.umobile{
	color: #A5A5A5;
	font-size:16px;
}
.lastright{
	text-align:right;
}
.last{
	color: #A5A5A5;
	font-size:16px;
}
.lasttime{
	color:#07C160;
	font-size:22px;
}
	
.wcontent{
  min-height:100%;
}
.content{
	width:80%;
	margin:auto;
	position:relative;
	z-index:0;
	background:#F4F8F7;
	border-radius:20px;
	margin-top:35px;
	min-height:500px;
	padding:30px 35px;
}

.headtop{
	height:70px;
	background:#07C160;
	position:fixed;
	left:0;
	width:100%;
	top:0;
	z-index:99;
}
.headtopmid{
	width:80%;
	margin:auto;
	padding-top:10px;
}
.h70{
	width:100%;
	height:70px;
}
.tlast{
   margin-left:10px;
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

.boxsearch{
	height:50px;
	border-bottom:3px solid #ddd;
}

.cinput{width:650px;margin:auto;height:60px;}
.cinput input{width:100%;line-height:60px;border-bottom:1px solid #5E5E5E;
height:60px;text-align:left;font-size:28px;padding:0 0 5px 10px;}
.cinput2{width:650px;margin:auto;height:60px;}
.cmobileleft{width:230px;border-bottom:1px solid #5E5E5E;
height:60px;padding:0 10px;}
.cmobileleft img{width:76px;height:50px;}
.mdg{width:20px;}
.pref{
	color:#949292;
	font-weight:bold;
	line-height:50px;
	font-size:22px;
	margin-left:5px
}

.xqsearch{padding-left:4px;}
.xqsearch input{height:40px;line-height:40px;}
.searico{font-weight:bold;font-size:28px;color:#666;}
.gpic{width:76px;height:50px;}
.numpre{margin-left:35px;font-size:18px;
font-weight:bold;color:#666;}
.numlist{margin-bottom:25px;padding:10px;}
.numlist:hover{background:#efefef;}

.btnview{
width: 400px;
height:40px;
line-height:40px;
background: #07C160;
box-shadow: 0px 5px 15px 0px rgba(58,170,168,0.5);
border-radius:10px;
margin:20px auto;
text-transform:uppercase
}
.btnview:hover{
	opacity:.8;
}

</style>
                   