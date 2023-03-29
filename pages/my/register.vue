<template>
	<view class="my">
		<view class="container">
			<view class="wrapper">
				<view class="left-top-sign">REGISTER</view>
				<view class="welcome">
					绑定账号
				</view>
				<view class="input-content">
					<view class="input-item">
						<text class="tit">学号/工号</text>
						<input type="text" v-model="studentId" placeholder="请输入学号" />
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input password type="text" v-model="passWord" placeholder="请输入密码" />
					</view>
				</view>
			</view>
			<button class="confirm-btn" @click="register()">绑定</button>
		</view>
	</view>

</template>

<script>
	import {
		registerWeChat
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				isBind: false,
				WXCode: "",
				hasUserInfo: false,
				studentId: "",
				passWord: "",
				userData: [],
				userType:""
			};
		},
		methods: {
			register: function() {
				let cord = "";
				let studentId = this.studentId;
				let passWord = this.passWord;
				let result = {};
				let userType = this.userType;
				wx.login({
					success(res) {
						console.log(res.code);
						cord = res.code;
						_self.WXCode = res.code;
						console.log(studentId + passWord);
						console.log("type",_self.userType)
						registerWeChat(cord, studentId, passWord,userType).then(res => {
							console.log(res);
							uni.showToast({
								title: "登录成功"
							});
							uni.setStorageSync("token", res.token);
							console.log("调用完成");
							setTimeout(() => {
								uni.hideToast();
								uni.switchTab({
									url: '/pages/my/my'
								});

							}, 500)

						}, fail => {
							uni.showToast({
								title: fail,
								icon: 'error'
							})
						})
					}
				})

			},
			getSuccess(result) {
				console.log("回调成功数据" + result);
				uni.showToast({
					title: "绑定成功"
				});
				uni.setStorage({
					key: "token",
					data: result.token,
					success() {
						console.log("返回的数据" + result);
						console.log("成功设置strong" + result.toke);
					}
				});
				setTimeout(() => {
					uni.hideToast();
					uni.switchTab({
						url: '/pages/my/my'
					})
				}, 500);
			}
		},
		onLoad(options) {
			const{type} = options;
			_self.userType = type;
		},
		created() {
			_self = this
		}
	}
</script>

<style lang="scss">
	/* pages/login/login.wxss */
	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 40rpx;
	}

	.left-top-sign {
		font-size: 120rpx;
		color: #f8f8f8;
		position: relative;
		left: -16rpx;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
	}


	.input-content {
		padding: 0 60rpx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30rpx;
		background: #f8f6fc;
		height: 120rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;

	}

	.input-item:last-child {
		margin-bottom: 0;
	}

	.input-item .tit {
		height: 50rpx;
		line-height: 56rpx;
		font-size: 30rpx;
		color: #606266;
	}

	.input-item input {
		height: 60rpx;
		font-size: 30rpx;
		color: #303133;
		width: 100%;
	}

	.confirm-btn {
		width: 630rpx !important;
		height: 76rpx;
		line-height: 76rpx;
		border-radius: 50rpx;
		margin-top: 70rpx;
		background: #d43c33;
		color: #fff;
		font-size: 32rpx;
		padding: 0;
	}

	.confirm-btn2:after {
		border-radius: 100px;
	}
</style>
