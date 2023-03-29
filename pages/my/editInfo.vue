<template>
	<view class="contain">
		<view class="uni-form-item uni-column">
			
			<view class="image-box">
				<image class="image-stye" :src="tempFilePath" @click="getImage"></image>
				<view class="image-text"> 点击图片更换头像</view>
			</view>
			<view class="uni-title">昵称</view>
			<input class="input-text" type="text" :name="userCard.nick" v-model="userCard.nick" confirm-type="next" />
			<view class="uni-title">个性签名</view>
			<input class="input-text" type="text" :name="userCard.signature" v-model="userCard.signature" confirm-type="done" />
			<input type="text" v-moduel="test" confirm-type="done" />
			<button type="primary" @click="updateForm">完成修改</button>
		</view>
		
	</view>
</template>

<script>
	import {
		getUserCard,
		updateInfo
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				userCard: {
					avatar: "",
					nick: "",
					signature: ""
				},
				test: "test",
				tempFilePath:""
			}
		},
		methods: {
			getImage() {
				uni.chooseMedia({
					success: (chooseImageRes) => {
						_self.tempFilePath = chooseImageRes.tempFiles[0].tempFilePath;
						console.log(chooseImageRes);
						uni.uploadFile({
							url: 'http://localhost:8080/taian/sys/headerImgUpload',
							header:{
								"token":uni.getStorageSync("token")
							},
							filePath: _self.tempFilePath,
							name: 'multipartFile',
							success: (uploadFileRes) => {
								console.log("上传成功返回数据：",uploadFileRes.data);
								_self.userCard.avatar = uploadFileRes.data;
								console.log(uni.getStorageSync("token"));
								updateInfo(_self.userCard.avatar, _self.userCard.nick, _self.userCard.signature);
							}
						});
					}
				});
				console.log("调用获取图片的接口")
			},
			updateForm() {
				console.log("注意数据", _self.userCard);
				updateInfo(_self.userCard.avatar, _self.userCard.nick, _self.userCard.signature).then(res => {
					uni.switchTab({
						url:'/pages/my/my'
					})
					console.log("chenggong")
				})
			}
		},
		onLoad() {
			getUserCard().then(res => {
				_self.userCard.avatar = res.avatar;
				_self.userCard.nick = res.nick;
				_self.userCard.signature = res.signature;
				_self.tempFilePath = res.avatar;
				console.log(res)

			}, err => {
				console.log("失败")
			})
		},
		created() {
			_self = this
		}
	}
</script>

<style>
	.contain {
	}

	.btnimg {
		width: 5rem;
		height: 2rem;
		font-size: 24rpx;
	}

	.touimg {
		height: 5rem;
		width: 5rem;
	}
	.image-box{
		height: 150upx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30upx;
		margin-bottom: 50upx;
	}
	.image-stye{
		height: 120upx;
		width: 120upx;
		border-radius: 10upx;
		
	}
	.image-text{
		font-size: 24upx;
		color: dimgrey;
	}
	.input-text{
		height: 80upx;
		width: 100%;
		background-color: ghostwhite;
		margin-bottom: 50upx;
	}
</style>
