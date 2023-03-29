<template>
	<view class="container">
		<list>
			<cell v-for="(item, index) in ArticleCartList" :key="item.articleId">
				<view class="card-box">
					<uni-card>
						<template v-slot:title>
							<view class="card-top">
								<image :src="item.avatar" class="card-image-heard"></image>
								<text class="uni-title">{{item.nick}}</text>
							</view>
						</template>
						<image v-if="item.imagePath" class="card-image" mode="aspectFill" :src="item.imagePath"></image>
						<text class="uni-body">{{item.content}}</text>
						<view slot="actions" class="card-actions">

							<view class="card-location">
								<text>{{item.createTime.toString().substring(0,4)}}年{{item.createTime.toString().substring(4,6)}}月{{item.createTime.toString().substring(6,8)}}日 {{item.createTime.toString().substring(8,10)}}:{{item.createTime.toString().substring(10,12)}}:{{item.createTime.toString().substring(12,14)}}</text>
							</view>

							<view v-if="item.locationName" class="card-location">
								<text class="uni-body">
									发布于 {{item.locationName}}</text>
							</view>

							<view class="card-actionss">
								<!-- <view class="card-actions-item" @click="shareClick('分享')">
									<uni-icons type="undo" size="18" color="#999"></uni-icons>
									<text class="card-actions-item-text">分享</text>
								</view> -->
								<view class="card-actions-item" @click="voteClick(item.articleId,index)">
									<uni-icons v-if="item.isVote" type="heart-filled" size="18" color="#e43d33">
									</uni-icons>
									<uni-icons v-if="!item.isVote" type="heart" size="18" color="#999"></uni-icons>
									<text class="card-actions-item-text">({{item.voteCount}})点赞</text>
								</view>
								<navigator :url="'/pages/social/article_detail?item='+ encodeURIComponent(JSON.stringify(item))">
									<view class="card-actions-item">
										<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
										<text class="card-actions-item-text">({{item.commentCount}})评论</text>
									</view>
								</navigator>
							</view>
						</view>
					</uni-card>
				</view>
			</cell>
		</list>
		<uni-fab ref="fab" popMenu="false" :pattern="pattern" horizontal="right" @fabClick="fabClick" />
	</view>
</template>

<script>
	import {
		getAllArticle,
		vote
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				ArticleCartList: [],
				pageNo: 1
			}
		},
		methods: {
			actionsClick() {

			},
			fabClick() {
				uni.navigateTo({
					url: "/pages/else/addArticle"
				})
			},
			shareClick() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			voteClick(articleId, index) {
				console.log("重要", articleId);
				vote(articleId, "article").then(res => {
					if (_self.ArticleCartList[index].isVote) {
						_self.ArticleCartList[index].voteCount = _self.ArticleCartList[index].voteCount - 1;
					} else {
						_self.ArticleCartList[index].voteCount = _self.ArticleCartList[index].voteCount + 1;
					}
					_self.ArticleCartList[index].isVote = !_self.ArticleCartList[index].isVote;
				}, fail => {
					console.log("点赞失败后", fail);
				})
			},
			CommentClick(index){
				console.log(_self.ArticleCartList[index]);
				uni.navigateTo({
					url:'/pages/social/article_detail?articleId=' + articleId
				})
			}
		},
		onShow() {
			_self.pageNo = 1;
			getAllArticle(_self.pageNo, 3).then(res => {
				_self.ArticleCartList = res;
			});
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			_self.pageNo = 1;
			getAllArticle(_self.pageNo, 3).then(res => {
				_self.ArticleCartList = res;
			});
		},
		onReachBottom() {
			_self.pageNo = _self.pageNo + 1;
			getAllArticle(_self.pageNo, 3).then(res => {
				_self.ArticleCartList = _self.ArticleCartList.concat(res)
			});
		},
		created() {
			_self = this
		}
	}
</script>

<style>
	.container {}

	.container-item {
		color: antiquewhite;
		padding: 1rpx;
		height: 10rpx;
	}

	.card-image-heard {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		margin-right: 5px;
	}

	.card-box {
		width: 100%;
	}

	.card-top {
		display: flex;
		flex-direction: row;
		height: 50px;
		margin-top: 10px;
	}

	.card-actions {}

	.card-actionss {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-location {
		width: 100%;
		height: 20px;
		text-align: right;
		color: #666;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.card-image {
		width: 100%;
		height: 350rpx;
	}

	.card-image-box {
		padding-top: 15rpx;
	}
</style>
