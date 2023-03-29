<template>
	<view>
		<uni-group mode="card" top="20upx">
		<view>年级：{{dataList.grade}}</view>
		<view>学号：{{dataList.studentId}}</view>
		<view>学生姓名：{{dataList.studentName}}</view>
		<view>专业：{{dataList.major}}</view>
		<view>行政班级：{{dataList.adminClass}}</view>
		<view>辅导员：{{dataList.instructorName}}</view>
		<view>导师：{{dataList.tutorName}}</view>
		<view>学校邮箱：{{dataList.schoolMail}}</view>
		</uni-group>
	</view>
</template>

<script>
	var _self
	import {getStudentInfo} from '../../api/index.js'
	export default {
		data() {
			return {
				dataList:{
					adminClass:"",
					grade:"",
					instructorName:"",
					major:"",
					schoolMail:"",
					studentId:"",
					studentName:"",
					tutorName:"",
					userId:""
				}
			};
		},onShow() {
			getStudentInfo().then(res=>{
				this.dataList = res
			})
		},
		created() {
			_self = this
		}
	}
</script>

<style lang="scss">

</style>
