  <template>
      <!-- 页面主体 -->
	  <view @click="closemenu" class="wcontent">
		<xqheadertop ref="header"></xqheadertop>
		<view class="content">
				<view class="noacc xq-text-center">
					<image mode="widthFix" src="../static/acc.png"></image>
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
							<input v-model="mobile"  type="text" />
						</view>
					</view>
					<view style="width:100%;height:20px;"></view>
				    <view class="btnview xq-white xq-bold xq-fz36 xq-cur" @click="addacc">
						START TRACKING
					</view>
				</view>
		</view>
	   <!-- <button type="button" @click="showt">选择手机区号</button>
		<Vue3CountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000" v-model:visible="schemaModalVisible.visible" v-model="schemaModalVisible.default">
				<template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
		 </Vue3CountryIntl> -->
		<a-modal :maskClosable="false" v-model:visible="visible" :footer="false" width="600px"  @ok="handleOk">
		       <view style="padding:20px 40px;min-height:200px;">
				  <Vue3CountryIntl  @onChange="chagedata" v-model="countryCode"></Vue3CountryIntl>
				  <view @click="selectfn" class="Confirmdiv xq-text-center xq-white xq-fz16 xq-cur">Confirm</view>
				  <!-- <vue3-country-intl v-model="countryCode"></vue3-country-intl> -->
				 <!-- <Vue3CountryIntl
				         schema="popover"
				         popover-class="popover-class1111"
				         v-model="schemaPopoverData.default"
				         v-model:visible="schemaPopoverData.visible">
				         <button type="button" @click="schemaPopoverData.visible = true">选择手机区号</button>
				         <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
				 </Vue3CountryIntl> -->
				 <!-- <Vue3CountryIntl
				         schema="popover"
				         elId="my_reference"
				         v-model="schemaPopoverData.default"
				         v-model:visible="schemaPopoverData.visible">
				     <button type="button" @click="schemaPopoverData.visible = true">选择手机区号</button>
				     </Vue3CountryIntl> -->
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
  import xqheadertop from "../xqUI/components/xqHeaderTopAcc.vue"
  import { parsePhoneNumber } from 'libphonenumber-js';
  import { message } from 'ant-design-vue';
  import io from 'socket.io-client'
  var _this;
  export default {
    data() {
      return {
		 countryCode:"",
		 name:"",
		 pref:"",
		 prefimg:"",
		 mobile:"",
		 visible:false,
		 keyword:"",
		 selectinfo:{
			 areaCodes:null,
			 dialCode:"91",
			 iso2:"in",
			 name: "India (भारत)",
			 nameCN: "印度",
			 priority:0
		 },
		 list:[]
      }
    },
	components: {
	    // 声明要使用哪些组件
	  xqheadertop
		// xqheaderbot
	},
    onLoad:function(){
		_this = this;
		// const phoneNumberObj = parsePhoneNumber("+8618213002444");
		// console.log(132,phoneNumberObj)
        //_this.selectinfo = ""
    },
	computed:{
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

	  showt(){
		  this.schemaModalVisible.visible=true;
		  //this.visible=true;
	  },
	  chagedata(e){
		console.log(1466,e);
		this.selectinfo=e;
	  },
	  selectfn(){
		 //console.log(146,this.countryCode)
		// console.log(103,index)
		// this.inde=index;
		// this.selectinfo=item;
		this.visible=false;  
	  },
	  addacc(){
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
		 console.log(152,phoneNumberObj);
		 if (!phoneNumberObj.isValid()) {
			message.warning('The phone number is incorrect');
			return;
		 }
		 var param = {
			 name:_this.name,
			 mobile:mobile,
			 pre:_this.selectinfo.dialCode,
			 account:_this.mobile,
			 datastring:JSON.stringify(_this.selectinfo)
		 }
		 uni.showLoading();
		 this.$request({
		 	url: _this.$api.user.addacc,
		 	data:param,
		 	method: 'get',
		 }).then(res => {
		 	if(res.code==200){
		 		 uni.navigateTo({
		 		   url:"/pages/index"
		 		 })		 
		 	}else{
		 		message.error(res.message);
		 	}
		 }) 
	  },
	  closemenu(){
		  this.$refs.header.onClose();
	  }
    }
  }
  </script>
<style>

.tbox{
	height:350px;
	overflow-y:scroll;
}
.boxsearch{
	height:50px;
	border-bottom:3px solid #ddd;
}
.xqsearch{padding-left:4px;}
.xqsearch input{height:40px;line-height:40px;}
.searico{font-weight:bold;font-size:28px;color:#666;}
.gpic{width:76px;height:50px;}
.numpre{margin-left:35px;font-size:18px;
font-weight:bold;color:#666;}
.numlist{margin-bottom:25px;padding:10px;}
.numlist:hover{background:#efefef;}
	
.cinput{width:650px;margin:auto;height:60px;}
.cinput input{width:100%;line-height:60px;border-bottom:1px solid #5E5E5E;
height:60px;text-align:left;font-size:28px;padding:0 0 5px 10px;}
.cinput2{width:650px;margin:auto;height:60px;}
.cmobileleft{width:190px;border-bottom:1px solid #5E5E5E;
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



.wcontent{
  min-height:100%;
}
.content{
	width:80%;
	margin:auto;
	padding-top:10px;
	position:relative;
	z-index:0;
}
.noacc{margin-top:-50px;}
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

.Confirmdiv{
	width:100%;
	height:40px;
	line-height:40px;
	background: #07C160;
	box-shadow: 0px 5px 15px 0px rgba(58,170,168,0.5);
	border-radius: 20px;
	margin:20px auto;
	text-transform:uppercase
}

.btnview:hover{
	opacity:.8;
}




</style>
                   