<template>
	<view class="container">
		<view class="swiper-box">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="2000" duration="1000">
				<swiper-item v-for="(item, index) in pathList" :key="item.imageId">
					<image :src="item.imagePath"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="grid-box">
			<uni-grid :column="3" :showBorder="flase" :square="true" @change="cilkchange">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{item.text}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<cell v-for="(item, index) in dataList" :key="item.articleId">
			<view class="card-box">
				<uni-card>
					<template v-slot:title>
						<view class="card-top">
							<image :src="'http://localhost:8080/taian/upload/heard/school_sys.jpg'" class="card-image-heard"></image>
							<text class="title">学院官方</text>
						</view>
					</template>
					<image v-if="item.imagePath" class="card-image" mode="aspectFill" :src="item.imagePath"></image>
					<text class="content">{{item.contentText}}</text>
					<view slot="actions" class="card-actions">
		
						<view class="card-location">
							<text>{{item.createTime.toString().substring(0,4)}}年{{item.createTime.toString().substring(4,6)}}月{{item.createTime.toString().substring(6,8)}}日
								{{item.createTime.toString().substring(8,10)}}:{{item.createTime.toString().substring(10,12)}}:{{item.createTime.toString().substring(12,14)}}</text>
						</view>
					</view>
				</uni-card>
			</view>
		</cell>
	</view>
	
</template>

<script>
	import {
		getRotationImage,
		getSchoolArticle
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				list: [{
						url: '/static/index/gerenxinxi.png',
						text: '个人信息',
						type: "primary"
					},
					{
						url: '/static/index/kechengxinxi.png',
						text: '课程信息',
						type: "success"
					},
					{
						url: '/static/index/kaoshixinxi.png',
						text: '考试信息',
						type: "warning"
					},
					{
						url: '/static/index/kechengbiao.png',
						text: '课程表',
						type: "warning"
					}
				],
				pathList: [],
				dataList:[],
				pageNo:1,
				pageSize:5
			}
		},
		methods: {
			getAllClazz() {
				uni.navigateTo({
					url: '/pages/clazzinfo/allclazz'
				})
			},
			cilkchange(e) {
				if (e.detail.index == 1) {
					uni.navigateTo({
						url: '/pages/clazzinfo/allclazz'
					})
				} else if (e.detail.index == 0) {
					uni.navigateTo({
						url: '/pages/clazzinfo/studentInfo'
					})
				} else if (e.detail.index == 2) {
					uni.navigateTo({
						url: '/pages/clazzinfo/examInfo'
					})
				} else if (e.detail.index == 3) {
					uni.navigateTo({
						url: '/pages/msg/msg'
					})
				}
			},
			clickck() {

			}
		},
		created() {
			_self = this
		},
		onShow() {
			getRotationImage().then(res => {
				_self.pathList = res;
				console.log(_self.pathList);
			});
			getSchoolArticle(_self.pageNo,_self.pageSize).then(res=>{
				_self.dataList = res.records;
				
				console.log(_self.dataList);
			});
		}
	}
</script>

<style>
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	.card-image-heard {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		margin-right: 5px;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-box {
		margin-top: 25upx;
		padding: 50upx;
		background-color: white;
		border-radius: 50upx;
		height: 400upx;
	}

	.item-image {
		height: 100%;
		width: 100%;
		margin: 2upx;
		border-radius: 50upx;
	}

	.container {
		padding: 1rem;
		font-size: 3rem;
	}

	.btn-class {
		margin-top: 40rpx;
	}

	.upload-image {
		width: 200rpx;
		height: 200rpx;
	}

	.image-stye {
		width: 150rpx;
		height: 150rpx;
	}
	.card-image {
		width: 100%;
		height: 350rpx;
	}
	.title{
		font-size: 30upx;
	}
	.content{
		font-size: 35upx;
	}
	.card-top {
		display: flex;
		flex-direction: row;
		height: 50px;
		margin-top: 10px;
	}
</style>
