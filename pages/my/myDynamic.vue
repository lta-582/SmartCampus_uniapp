<template>
	<view>
		<view class="dynamic-container">
			<list>
				<cell v-for="(item, index) in dynamicDataList" :key="item.articleId">
					<view class="dynamic-item" @touchstart="touchstart(item.articleId)" @touchend="touchend" @click="tiaozhuan(item.articleId)">
						<uni-group mode="card" top="20upx">
							<view class="content"> {{item.content}} </view>
							<image v-if="item.imagePath" :src="item.imagePath" mode="aspectFit"></image>
							<view class="box-down">
								<view class="display-time">
									发布时间:{{item.createTime.toString().substring(0,4)}}年{{item.createTime.toString().substring(4,6)}}月{{item.createTime.toString().substring(6,8)}}日  {{item.createTime.toString().substring(8,10)}}:{{item.createTime.toString().substring(10,12)}}:{{item.createTime.toString().substring(12,14)}} </view>
								<view class="display-time" v-if="item.locationName"> 发布位置:{{item.locationName}} </view>
							</view>
						</uni-group>
					</view>
				</cell>
			</list>
		</view>
	</view>
</template>

<script>
	var _self
	import {
		getMyArticle,
		delArticle
	} from "@/api/index.js"
	export default {
		data() {
			return {
				dynamicDataList: [],
				pageNo: 0
			}
		},
		methods: {
			touchstart(articleId) {
				let that = this;
				clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
				this.Loop = setTimeout(function() {
					uni.showModal({
						title: '删除',
						content: '请问要删除本条消息吗？',
						success: async function(res) {
							if (res.confirm) {
								delArticle(articleId).then(res=>{
									_self.pageNo = 0;
									getMyArticle(_self.pageNo, 8).then(res => {
										console.log(res);
										_self.dynamicDataList = res.records;
									})
								},fail=>{
									uni.showToast({
										title:"删除失败,请重试",
										icon:'error'
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
			},
			tiaozhuan(id){
				uni.navigateTo({
					url:'/pages/social/my_detail?id='+id
				})
			}
		},
		onShow() {
			getMyArticle(_self.pageNo, 8).then(res => {
				console.log(res);
				_self.dynamicDataList = res.records;
			})
		},
		onLoad() {

		},
		created() {
			_self = this
		},
		onReachBottom() {
			_self.pageNo = _self.pageNo+1;
			getMyArticle(_self.pageNo, 5).then(res => {
				_self.dynamicDataList =_self.dynamicDataList.concat(res.records)
			});
		}
	}
</script>

<style>
	.dynamic-container{
	}
	.dynamic-item{
	}
	.content{
		font-size: 42upx;
		margin-top: 2upx;
		margin-bottom: 5upx;
	}
	.display-time{
		font-size: 24upx;
	}
	.box-down{
		padding-top: 20upx;
	}

</style>
