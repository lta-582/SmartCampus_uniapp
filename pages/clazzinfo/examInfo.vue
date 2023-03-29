<template>
	<view class="h-table h-table-success">
		<view class="h-tr h-tr-2 h-thead text-font">
			<view class="h-td">课程代码</view>
			<view class="h-td">课程名称</view>
			<view class="h-td">考试日期</view>
			<view class="h-td">考试时间</view>
			<view class="h-td">考场</view>
			<view class="h-td">座位号</view>
		</view>
		<view class="h-tr h-tr-2 text-font" v-for="(item ,index) in dataList">
			<view class="h-td">{{item.clazzCode}}</view>
			<view class="h-td">{{item.clazzName}}</view>
			<view class="h-td">{{item.examDate}}</view>
			<view class="h-td">{{item.examTime}}</view>
			<view class="h-td">{{item.examRoomName}}</view>
			<view class="h-td">{{item.examSeat}}</view>
		</view>
	</view>
</template>

<script>
	import {
		getExamInfo
	} from "../../api/index.js"
	var _self
	export default {
		data() {
			return {
				dataList: []
			};
		},
		created() {
			_self = this
		},
		onShow() {
			getExamInfo().then(res => {
				_self.dataList = res;
				console.log(_self.dataList)
			})
		}
	}
</script>

<style lang="scss">
	@import '../../lib/helang-table.scss';

	.text-font {
		font-size: 18upx;
	}

	.container {
		margin: 50upx 20upx;
		height: 500upx;
	}

	.content {
		font-size: 28rpx;
		background-color: #f3f3f3;
		padding: 20rpx;

		.red {
			background-color: #DD524D;
			color: #fff;
			text-align: center;
		}

		.green {
			background-color: #42b983;
			color: #fff;
			text-align: center;
		}

		.blue {
			background-color: #007AFF;
			color: #fff;
			text-align: center;
		}

		.yellow {
			background-color: #ffaa00;
			color: #fff;
			text-align: center;
		}


		.itme-box {
			padding: 20rpx;
			background-color: #fff;
			margin-bottom: 20rpx;

			.title {
				padding-bottom: 20rpx;
				margin-bottom: 20rpx;
				border-bottom: #e5e5e5 solid 1px;
				line-height: normal;
			}

			.width-fill {
				width: 100%;
			}

			.preview-box {
				height: 400rpx;
				box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
			}
		}
	}
</style>
