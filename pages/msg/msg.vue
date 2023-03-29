<template>
	<view>
		<ly-curriculumtable :weekTableState="true" :weekTableNumber="weekNumbers" :controlWeek="controlWeek"
			:timetableType="timetableType" :timetables="timetables" :startdDate="startdDate" :weekButton="weekButton"
			@nextWeekClick="nextWeekClick" @lastWeekClick="lastWeekClick" @courseClick="courseClick"
			@weekSelectClick="weekSelectClick" @weekOpenClick="weekOpenClick">

		</ly-curriculumtable>
		<!-- 课程详情 -->
		<u-modal class="modal" :show="showMyModal" title="课程详情" :closeOnClickOverlay="true" :showConfirmButton="false"
			@close="closeModal">
			<view class="slot-content">
				<u-cell-group>
					<u-cell v-for="(item,index) in modalItem" :key="index" :title="item" :icon="modalIcon[index]"
						:iconStyle="{color: colorList()[index+1]}" size="large"></u-cell>
				</u-cell-group>
			</view>
		</u-modal>
	</view>
</template>
<script>
	var _self
	import {getClazzSchedule} from'../../api/index.js'
	export default {
		data() {
			return {
				// week:['一', '二', '三', '四', '五', '六', '日'],
				weekNumbers: 20, //一共显示几周
				controlWeek: 1, //显示的第几周
				weekButton: false, //开启上一周下一周按钮
				startdDate: '', //开始时间  默认为当前时间
				timetables: [
					['大学英语', '大学语', '大学英语', '', ''],
					['', '', '信号与系统', '信号与系统', '模拟电子技术基础'],
					['大学体育', '大学体育', '形势与政策', '形势与政策', ''],
					['', '', '', '', '电装实习'],
					['', '', '数据结构与算法分析数据结构与算法分析', '数据结构与算法分析数据结构与算法分析', ''],
				],
				timetableType: [{
						index: '1',
						name: '09:00\n10:20'
					},
					{
						index: '2',
						name: '10:40\n12:00'
					},
					{
						index: '3',
						name: '12:30\n13:50'
					},
					{
						index: '4',
						name: '14:00\n15:20'
					},
					{
						index: '5',
						name: '15:30\n16:50'
					},
					{
						index: '6',
						name: '17:00\n18:20'
					},
					{
						index: '7',
						name: '19:00\n20:20'
					},
					{
						index: '8',
						name: '20:30\n21:50'
					}
				],
				//弹窗属性
				showMyModal: true, //课程详情弹窗
				modalIcon: ['calendar', 'home', 'server-man', 'clock'], //图标
				modalItem: [], //依次是课程名、教室、教师、上课时间--为了适配渲染
			}

		},
		methods: {
			courseClick(re) {
				console.log(re)

				//console.log(JSON.stringify(re))
				this.modalItem[0] = "课程: " + re.name;
				this.modalItem[1] = "教室: 213"
				this.modalItem[2] = "教师: 吴老师"
				this.modalItem[3] = "时间: 9:00-9:40";
				this.showMyModal = true;
				//console.log(",",JSON.stringify(this.modalItem))

			},
			nextWeekClick(e) {
				console.log("下一周", e)
			},
			lastWeekClick(e) {
				console.log("上一周", e)
			},
			weekOpenClick() {
				console.log("点击了第几周")
			},
			weekSelectClick(e) {
				console.log("您选择了", e)
			},
			//关闭弹窗
			closeModal() {
				this.showMyModal = this.showMyModal == true ? false : true;
			},
			//返回颜色
			colorList() {
				return [
					"#ffffff", //0
					"#ffaa00", //1
					"#33CC99",
					"#ff5500", //3
					"#789262", //4
					"#66CCCC", //5
					"#9999FF", //6
				]
			},

		},
		onShow() {
			getClazzSchedule().then(res=>{
				_self.timetables = res
			})
		},
		created() {
			_self = this
		}
	}
</script>
