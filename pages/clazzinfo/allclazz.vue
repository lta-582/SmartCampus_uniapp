<template>
	<view class="container">
		<view class="title-box"> 必修课程</view>
		<view class="h-table h-table-success">
			<view class="h-tr h-tr-2 h-thead text-font">
				<view class="h-td">课程代码</view>
				<view class="h-td">课程名称</view>
				<view class="h-td">学分</view>
				<view class="h-td">分数</view>
				<view class="h-td">获得学分</view>
			</view>
			<view class="h-tr h-tr-2 text-font" v-for="(item1 ,index) in comp_clazz_list">
				<view class="h-td">{{item1.clazzCode}}</view>
				<view class="h-td">{{item1.clazzName}}</view>
				<view class="h-td">{{item1.credit}}</view>
				<view class="h-td">{{item1.score}}</view>
				<view class="h-td">{{item1.ableCredit}}</view>
			</view>
		</view>
		<view class="title-box"> 选修课程</view>
		<view class="h-table h-table-success" style="padding-bottom: 25upx;">
			<view class="h-tr h-tr-2 h-thead text-font">
				<view class="h-td">课程代码</view>
				<view class="h-td">课程名称</view>
				<view class="h-td">学分</view>
				<view class="h-td">分数</view>
				<view class="h-td">获得学分</view>
			</view>
			<view class="h-tr h-tr-2 text-font" v-for="(item2 ,index) in ele_clazz_list">
				<view class="h-td">{{item2.clazzCode}}</view>
				<view class="h-td">{{item2.clazzName}}</view>
				<view class="h-td">{{item2.credit}}</view>
				<view class="h-td">{{item2.score}}</view>
				<view class="h-td">{{item2.ableCredit}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	import {getCompClazz,getEleClazz} from '../../api/index.js'
	export default {
		data() {
			return {
				comp_clazz_list:[],
				ele_clazz_list:[]
			};
		},
		onShow() {
			getCompClazz().then(res1=>{
				_self.comp_clazz_list = res1;
				console.log("必修数据",_self.comp_clazz_list)
			})
			getEleClazz().then(res2=>{
				_self.ele_clazz_list = res2;
				console.log("选修数据",_self.ele_clazz_list)
			})
		},
		created() {
			_self = this
		}
	}
</script>

<style lang="scss">
	@import '../../lib/helang-table.scss';
	.title-box{
		font-size: 60upx;
		padding-top: 25upx;
	}
	
	.text-font{
		font-size: 25upx;
	}
	
	.container{
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
