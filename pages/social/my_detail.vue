<template>
	<view class="container">
		<view class="cart-info">
			<view class="card-top">
				<image :src="articleCart.avatar" class="heardImage"></image>
				<view>{{articleCart.nick}}</view>
			</view>
			<uni-group mode="card" top="16upx">
				<view class="card-content">
					{{articleCart.content}}
				</view>
				<image v-if="articleCart.imagePath" :src="articleCart.imagePath" mode="aspectFit"></image>
				<view class="card-button">
					<text
						v-if="articleCart.createTime.toString()">{{articleCart.createTime.toString().substring(0,4)}}年{{articleCart.createTime.toString().substring(4,6)}}月{{articleCart.createTime.toString().substring(6,8)}}日 {{articleCart.createTime.toString().substring(8,10)}}:{{articleCart.createTime.toString().substring(10,12)}}:{{articleCart.createTime.toString().substring(12,14)}}</text>
					<view v-if="articleCart.locationName">{{articleCart.locationName}}</view>
				</view>
			</uni-group>
			<view class="dianzan-pinglun">
				<view class="card-actions-item">
					<uni-icons v-if="articleCart.isVote" type="heart-filled" size="18" color="#e43d33">
					</uni-icons>
					<uni-icons v-if="!articleCart.isVote" type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">({{articleCart.voteCount}})点赞</text>
				</view>
				<view class="card-actions-item">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">({{articleCart.commentCount}})评论</text>
				</view>
			</view>
			<view class="comment-input">
				<view>评论：</view>
				<uni-easyinput type="textarea" v-model="commentContext" placeholder="说些什么吧~~~" :inputBorder="false"></uni-easyinput>
				<button type="primary" @click="add">发表评论</button>
			</view>
			<view class="comment" v-for="(item,index) in commentList" :key="item.commentId">
				<view  @touchstart="touchstart(item.commentId)" @touchend="touchend">
				<view style="font-size: 36upx; padding: 15upx;">
					{{index+1}}楼
				</view>
				<view style="flex-direction: column;">
					<image :src="item.avatar" class="small-heardImage"></image>
					<view>{{item.nick}}</view>
				</view>
				<view style="flex-direction: row;">
					<view>
						{{item.content}}
					</view>
					<view style="font-size: 24upx;">
						<text style="text-align: right;">{{item.createTime.toString().substring(0,4)}}年{{item.createTime.toString().substring(4,6)}}月{{item.createTime.toString().substring(6,8)}}日 {{item.createTime.toString().substring(8,10)}}:{{item.createTime.toString().substring(10,12)}}:{{item.createTime.toString().substring(12,14)}}</text>
					</view>
				</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		getComment,
		vote,
		addComment,
		getArticle,
		delComment
	} from '@/api/index.js'
	var _self
	export default {
		data() {
			return {
				articleCart: {
					articleId: 0,
					avatar: "",
					commentCount: 0,
					content: "",
					createTime: 0,
					imageCount: 0,
					imagePath: "",
					isVote: 0,
					locationName: "",
					nick: "",
					userId: 0,
					voteCount: 0,
				},
				pageNo: 1,
				commentContext:"",
				commentList:[],
				articleId:0
			}
		},
		methods: {
			touchstart(commentId) {
				let that = this;
				clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
				this.Loop = setTimeout(function() {
					uni.showModal({
						title: '删除',
						content: '请问要删除本条评论吗？',
						success: async function(res) {
							if (res.confirm) {
								delComment(commentId).then(res=>{
									uni.showToast({
										icon:'success',
										title:"删除成功"
									});
									_self.pageNo =1;
									getComment(_self.articleCart.articleId,_self.pageNo,10).then(res=>{
										_self.commentList =  res.records;
									})
								},fail=>{
									uni.showToast({
										icon:'error',
										title:fail
									})
								})
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
			add(){
				addComment(_self.articleCart.articleId,_self.commentContext,"article").then(res=>{
					_self.articleCart.commentCount++;
					_self.commentContext='';
					_self.pageNo =1;
					getComment(_self.articleCart.articleId,_self.pageNo,10).then(res=>{
						_self.commentList =  res.records;
					})
				})
			}

		},
		onLoad(option) {
			_self.articleId = option.id
		},
		created() {
			_self = this
		},
		onShow() {
			getArticle(_self.articleId).then(res=>{
				_self.articleCart = res;
				_self.pageNo =1;
				getComment(_self.articleCart.articleId,_self.pageNo,10).then(res=>{
					_self.commentList =  res.records;
				});
			})
		},
		onReachBottom() {
			_self.pageNo = _self.pageNo + 1;
			getComment(_self.articleCart.articleId,_self.pageNo, 5).then(res => {
				_self.commentList = _self.commentList.concat(res.records)
			});
		},
		

	}
</script>

<style>
	.container{
		padding: 15upx;
	}
	.card-info {
		background-color: aqua;
		height: 500upx;
		width: 100%;
		padding: 20upx;
	}

	.card-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 15upx;

	}
	.small-heardImage{
		width: 30px;
		height: 30px;
		border-radius: 10px;
		margin-right: 5px;
	}
	.comment-input{
		margin-bottom: 50upx;
	}
	.comment{
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		margin-top: 15upx;
	}

	.heardImage {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		margin-right: 5px;
	}

	.card-content {
		font-size: 36upx;
	}

	.card-button {
		font-size: 24upx;
		text-align: right;
	}

	.dianzan-pinglun {
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 25upx;
	}
</style>
