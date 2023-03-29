<template>
	<view class="container">
		<uni-easyinput type="textarea" v-model="context" placeholder="请输入你的内容" :inputBorder="false"></uni-easyinput>
		<view class="upload-image">
			<image v-if="imagePath" :src="imagePath" mode="aspectFill" class="image-stye" @tap="chooseImage"></image>
			<image v-else src="../../static/addpic.png" mode="aspectFill" class="image-stye" @tap="chooseImage"></image>
		</view>
		<uni-list>
			<uni-list-item v-if="locationName" show-extra-icon="true" showArrow :extra-icon="extraIcon" :title="locationName" clickable
				@click="onClick"></uni-list-item>
				<uni-list-item v-else show-extra-icon="true" showArrow :extra-icon="extraIcon" title="我的位置" clickable
					@click="onClick"></uni-list-item>
		</uni-list>
		<button type="primary" @click="send" class="btn-class">发布</button>
	</view>

</template>

<script>
	import {
		addArticle,
		delImage
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				extraIcon: {
					color: '#8f8f8f',
					size: '22',
					type: 'location'
				},
				context: "",
				locationName: "",
				hasImage: false,
				imageCount: 1,
				imagePath: "",
				issend:false
			}
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						_self.imagePath = res.tempFilePaths[0];
						_self.hasImage = true;
						uni.uploadFile({
							url: 'http://localhost:8080/taian/article/uploadImage',
							header:{
								'token':uni.getStorageSync("token")
							},
							filePath: _self.imagePath,
							name: 'multipartFile',
							success: (uploadFileRes) => {
								_self.imagePath = uploadFileRes.data;
								console.log(uploadFileRes.data);
							}
						});
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'] && res.authSetting[
									'scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			onClick() {
				console.log("点击")
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						console.log("是否完成")
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.chooseLocation({
							latitude: latitude,
							longitude: longitude,
							success: function(res) {
								_self.locationName = res.name
							}
						})
					},
					fail(fail) {
						console.log(fail)
					}
				});
			},
			send() {
				const imagePath = _self.imagePath;
				const hasImage = _self.hasImage;
				addArticle(_self.context, _self.locationName, _self.imageCount, _self.imagePath).then(res => {
					uni.switchTab({
						url: "/pages/social/social"
					});
					console.log("发送成功"),
					_self.issend = true
				},fail=>{
					uni.showToast({
						icon:'error',
						title:fail
					})
				});

			},
		},
		created() {
			_self = this
		},
		onUnload(){
			if(!_self.issend){
				delImage(_self.imagePath).then(res=>{
					console.log("图片删除成功");
				})
			}
		}
	}
</script>

<style>
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
</style>
