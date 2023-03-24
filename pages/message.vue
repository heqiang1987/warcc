  <template>
      <!-- 页面主体 -->
	  <view @click="closemenu" class="wcontent">
		<xqheadertop ref="header"></xqheadertop>
		<view class="content">
			<view class="list" v-for="(item,index) in list">
				<view class="list_time xq-text-center">{{item.time}}</view>
			    <view class="list_msg" v-if="item.type==0"><text class="gree">Online prompt: </text>Your friend {{item.account}} is online.</view>
				<view class="list_msg" v-else><text class="red">Online prompt: </text>Your friend {{item.account}} is online.</view>
			</view>
			<view v-if="load==0"  class="xq-flex-center xq-flex-vcenter">
			   <div class="progress-8"></div>
			</view>
			<view v-else-if="load==1" class="morediv" @click="loadmore">More</view>
			<view v-else class="nodata">No data anymore</view>
		</view>
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
		 load:0,//0 加载 1加载完成 2没有数据
		 page:1
      }
    },
	components: {
	    // 声明要使用哪些组件
	  xqheadertop
		// xqheaderbot
	},
    onLoad:function(){
       _this = this;
	   console.log(62,uni.getStorageSync("lastinfo").id)
	   _this.init();
    },
	onShow() {
		//console.log(new Date().valueOf()-30*24*3600*1000)
		//this.init();
	},
	computed:{
		getuser:function(){
			return uni.getStorageSync("lastinfo")?uni.getStorageSync("lastinfo"):"";
		}
	},
    methods:{
	  init(){
		  if(!this.getuser){
			  return;
		  }
		  let user = this.getuser;
		  _this.$request({
		  	url: _this.$api.user.listmsg,
		  	method: 'get',
		  	data:{
			 page:_this.page	
			}
		  }).then(res => {
			  if(res.data.length<5){
				  _this.load=2;
			  }else{
				  _this.load=1;
			  }
			  let list = res.data;
			  let arr = [];
			  list.forEach(function(v,k){
				  if(v.available){
					  let av={
						  time:_this.getDate(v.available*1000),
						  type:0,
						  account:v.account
					  }
					  arr.push(av)
				  }
				  if(v.unavailable){
					  let av={
						  time:_this.getDate(v.unavailable*1000),
						  type:1,
						  account:v.account
					  }
					  arr.push(av)
				  }
			  })
			  _this.list=[..._this.list,...arr];
			  console.log(94,_this.list);
		  })
	  },
	  loadmore(){
		 _this.page++;
		 _this.load=0;
		 _this.init(); 
	  },
	  getDate(d){
	    var now = new Date(parseFloat(d));
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
	    var cdate = year+"-"+month+"-"+date+' '+ hour+":"+minute+":"+second;;
	    return cdate;
	  },
	  closemenu(){
	    this.$refs.header.onClose();
	  }
    }
  }
  </script>
<style>
.nodata{
	padding-top:10px;
	font-size:14px;
	text-align:center;
	color:#999;
}
.content{
	width:100%;
	max-width:1000px;
	margin:40px auto 20px;
}
.list_time{
	color:#A2A2A2;
	font-size:18px;
}
.list_msg{
	margin:10px 0 20px 0;
	width:100%;
	height:50px;
	line-height:50px;
	background: #F4F8F7;
	border-radius: 20px;
	font-size:20px;
	color:#5F5F5F;
	padding:0 30px;
}
.list_msg .red{color:#FF2746;}
.list_msg .gree{color:#07C160;}

.morediv{
	width:120px;
	height:40px;
	background:#07C160;
	border-radius:10px;
	color:#fff;
	text-align:center;
	line-height:40px;
	font-size:18px;
	cursor:pointer;
	margin:auto;
}


.progress-8 {
  width:60px;
  height:60px;
  border-radius: 50%;
  -webkit-mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
  background:
   linear-gradient(#07C160 0 0) bottom/100% 0% no-repeat
   #ddd;
  animation:p8 2s infinite steps(7);
}
@keyframes p8 {
    100% {background-size:100% 115%}
}



</style>
                   