<template>
	<view class="my">
		<view class="top">
			<view class="user-display" v-if="isBind">
				<uni-card :title="nick" :sub-title="studentId" extra="编辑信息" :thumbnail="avatar"
					@click="onJump('/pages/my/editInfo')">
					<text class="uni-body">个性签名：{{signature}}</text>
				</uni-card>
			</view>
			<view v-else class="login-box">
				<button class="min-button" type="primary" @click="studentClick">学生绑定</button>
				<button class="min-button" type="primary" @click="teacherClick">教师绑定</button>
			</view>
		</view>
		<view class="down">
			<uni-list>
				<uni-list-item title="我的动态" link="navigateTo" to="/pages/my/myDynamic"></uni-list-item>
				<!-- <uni-list-item title="我的收藏" link="navigateTo" to="/pages/my/myDynamic"></uni-list-item> -->
				<uni-list-item title="联系客服" link="navigateTo" to="/pages/my/myDynamic"></uni-list-item>
				<uni-list-item title="反馈建议" link="navigateTo" to="/pages/my/myDynamic"></uni-list-item>
			</uni-list>
		</view>
		<button type="primary" @click="unbind">解除绑定</button>
	</view>

</template>

<script>
	import {
		getTest,
		registerWeChat,
		getUserCard,
		unbind
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				isBind: false,
				WXCode: "",
				passWord: "",
				avatar: "/static/avatar.jpg",
				nick: "默认值",
				studentId: "00000000",
				signature: "默认个性签名",
				token: ""
			};
		},
		methods: {
			onJump(url) {
				uni.navigateTo({
					url: url
				})
			},
			studentClick() {
				uni.navigateTo({
					url: '/pages/my/register?type=学生'
				})
			},
			teacherClick() {
				uni.navigateTo({
					url: '/pages/my/register?type=教师'
				})
			},
			unbind() {
				uni.showModal({
					title: "解除绑定",
					content: "确定要解除绑定吗?",
					success: async function(res) {
						if (res.confirm) {
							unbind().then(res => {
								uni.setStorageSync("token", null);
								_self.userCard = {};
								_self.isBind = false;
								uni.showToast({
									title: "您已解除绑定！"
								})
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				})
			}

		},
		onLoad() {
			console.log("页面加载");
		},
		created() {
			_self = this
		},
		onShow() {
			console.log("show加载");
			_self.token = uni.getStorageSync("token");
			console.log(_self.token);
			if (_self.token != "" && _self.token != undefined) {
				_self.isBind = true;
				getUserCard().then(res => {
					_self.avatar = res.avatar;
					_self.nick = res.nick;
					_self.studentId = res.studentId;
					_self.signature = res.signature;
				})
			}
		}
	}
</script>

<style lang="scss">
	.min-button {
		height: 50rpx;
		width: 150rpx;
		font-size: 20rpx;
		background-color: antiquewhite;
	}

	.top {
		height: auto;
		align-content: center;
	}

	.user-display {}

	.login-box {
		display: flex;
		flex-direction: row;
		padding: 50rpx;

	}
</style>
