<template>
	<view class="container">
		<uni-easyinput type="textarea" v-model="context" placeholder="请输入你的内容" :inputBorder="false"></uni-easyinput>
		<view class="time-picker">
			<picker mode="time" :value="timeStart" @change="bindTimeStartChange">
				<view class="picker-time">
					日程开始：{{timeStart}}
				</view>
			</picker>
		</view>
		<view class="time-picker">
			<picker mode="time"  :value="timeStart" :start="timeStart" @change="bindTimeEndChange">
				<view class="picker-time">
					日程结束：{{timeEnd}}
				</view>
			</picker>
		</view>
		<button type="primary" style="margin-top: 50upx;" @click="send"> 新建日程</button>
	</view>

</template>

<script>
	import {
		addSchedule
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				context:"",
				timeStart: '12:01',
				timeEnd:'12:01',
				eventDate:''
			}
		},
		methods: {
			bindTimeStartChange: function(e) {
				_self.timeStart = e.detail.value
			},
			bindTimeEndChange: function(e) {
				_self.timeEnd = e.detail.value
			},
			send(){
				console.log("send",_self.eventDate);
				var timeStartNum = _self.timeStart.slice(0,2)+_self.timeStart.slice(3);
				var timeEndNum = _self.timeEnd.slice(0,2)+_self.timeEnd.slice(3);
				console.log(timeStartNum,timeEndNum);
				addSchedule(_self.context,_self.eventDate,timeStartNum,timeEndNum).then(res=>{
					uni.switchTab({
						url:'/pages/sche/sche'
					})
				},fail=>{
					uni.showToast({
						title:"发布失败",
						icon:'error'
					})
				})
			}
		},
		created() {
			_self = this
		},
		onLoad(options) {
			const{date} = options;
			_self.eventDate = date;
			var myDate = new Date();
			var hours = ('0'+myDate.getHours()).slice(-2);
			var minutes = ('0'+myDate.getMinutes()).slice(-2);
			_self.timeStart = hours + ":" + minutes;
			_self.timeEnd = _self.timeStart;
		}
	}
</script>

<style>
	.container {
		padding: 30upx;
	}
	.time-picker{
		
	}
	.picker-time{
		display: flex;
		flex-direction: column-reverse;
		font-size: 36upx;
		color: black;
		height: 100rpx;
		border: 2px;
	}
	
</style>
