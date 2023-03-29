<template>
	<view>
		<view>
			<view class="content">
				<tmt-calendar background="#94bcff" pointColor="#BA181B" @changeDate="selectDate" />
				<view class="schedule-contain">
					<list v-if="scheduleDataList.length > 0">
						<cell v-for="(item, index) in scheduleDataList" :key="item.eventStart">
							<view class="schedule-item" @touchstart="touchstart(item.scheduleId)" @touchend="touchend">
								<uni-group mode="card" top="20upx">
									<view>
										{{item.eventStart.toString().substring(1,3)}}:{{item.eventStart.toString().substring(3,5)}}-{{item.eventEnd.toString().substring(1,3)}}:{{item.eventEnd.toString().substring(3,5)}}
									</view>
									<view class="schedule-content">
										{{item.content}}
									</view>
									<view class="display-time">
										创建时间:{{item.createTime.toString().substring(0,4)}}年{{item.createTime.toString().substring(4,6)}}月{{item.createTime.toString().substring(6,8)}}日
										{{item.createTime.toString().substring(8,10)}}:{{item.createTime.toString().substring(10,12)}}:{{item.createTime.toString().substring(12,14)}}
									</view>
								</uni-group>
							</view>
						</cell>
					</list>
				</view>
			</view>
		</view>

		<uni-fab ref="fab" popMenu="false" :pattern="pattern" horizontal="right" @fabClick="fabClick" />
	</view>

</template>

<script>
	import {
		getSchedule,
		delSchedule
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				select_date: {
					year: "",
					month: "",
					day: ""
				},
				scheduleDataList: [],
				evnetDate: "",
				pageNo: 1,
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#007aff', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				styleType: 'button'
			}
		},
		methods: {
			onClickItem(e) {
				if (_self.current != e.currentIndex) {
					_self.current = e.currentIndex;
				}
			},
			selectDate(date) {
				_self.select_date = date;
				var year = _self.select_date.year
				var month = ('0' + _self.select_date.month).slice(-2)
				var day = ('0' + _self.select_date.day).slice(-2)
				_self.evnetDate = year + month + day;

				_self.pageNo = 1;
				getSchedule(_self.evnetDate, _self.pageNo, 5).then(res => {
					_self.scheduleDataList = res.records;
					console.log(_self.scheduleDataList)
				})
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/else/addSchedule?date=' + _self.evnetDate
				})
			},
			touchstart(scheduleId) {
				let that = this;
				clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
				this.Loop = setTimeout(function() {
					uni.showModal({
						title: '删除',
						content: '请问要删除本条消息吗？',
						success: async function(res) {
							if (res.confirm) {
								delSchedule(scheduleId).then(res => {
									_self.pageNo = 1;
									getSchedule(_self.evnetDate, _self.pageNo, 5).then(res => {
										_self.scheduleDataList = res.records;
									})
								}, fail => {
									uni.showToast({
										title: "删除失败,请重试",
										icon: 'error'
									})
								})
								// var id = that.list[index].id
								// let data = await that.$http.post(
								// 	'api/shop/shop_qualification_image/delete', {
								// 		'id': id,
								// 	}).then(function(data) {
								// 	console.log('用户点击确定')
								// }).catch(function(data) {});
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					});
				}.bind(this), 1000);
			},
			touchend() {
				clearInterval(this.Loop);
			}
		},
		created() {
			_self = this
		},
		onLoad() {
			var myDate = new Date();
			_self.select_date.year = myDate.getFullYear();
			_self.select_date.month = myDate.getMonth() + 1;
			_self.select_date.day = myDate.getDate();
		},
		onShow() {
			var year = _self.select_date.year
			var month = ('0' + _self.select_date.month).slice(-2)
			var day = ('0' + _self.select_date.day).slice(-2)
			_self.evnetDate = year + month + day;

			_self.pageNo = 1;
			getSchedule(_self.evnetDate, _self.pageNo, 5).then(res => {
				_self.scheduleDataList = res.records;
			})
		},
		onReachBottom() {
			_self.pageNo = _self.pageNo + 1;
			getSchedule(_self.evnetDate, _self.pageNo, 5).then(res => {
				_self.scheduleDataList = _self.scheduleDataList.concat(res.records);
			})

		}
	}
</script>

<style>
	.uni-common-mt {
		margin-top: 10px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
		margin-bottom: 25upx;
	}

	.text {
		font-size: 36upx;
	}

	.schedule-item {
		height: 200upx;
		width: 100%;
		font-size: 36upx;
		margin-bottom: 60upx;
	}

	.display-time {
		font-size: 24upx;
	}

	.schedule-contain {
		height: 500upx;
	}

	.schedule-content {
		margin: 20upx;
		font-size: 50upx;
	}
</style>
