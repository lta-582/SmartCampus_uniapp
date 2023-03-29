import {
	request
} from '@/utils/request.js'
 
 
// 获取论坛类型 /api/forum/ftype/index
export const getForumType = (page, rows) => request({url: 'forum/ftype/index',method: 'post',data: {page,rows}})

// 测试api /api/test
export const getTest = (code) => request({url: '/api/test',method: 'post',data: {code}})

//登录微信小程序
export const registerWeChat = (code,studentId,passWord,userType) => request({url: '/sys/register',method: 'post',data: {code,studentId,passWord,userType}})

//获取用户卡片信息
export const getUserCard = () => request({url: '/user/getUserCard',method: 'get',data: {}})

//获取主页图片路径
export const getRotationImage = () => request({url: '/sys/getRotationImage',method: 'get',data: {}})

//获取主页校园通知
export const getSchoolArticle = (pageNo,pageSize) => request({url: '/sys/schoolArticle/list/'+pageNo+"/"+pageSize,method: 'get',data: {}})

//更新用户卡片信息
export const updateInfo = (avatar,nick,signature) => request({url: '/sys/updateInfo',method: 'post',data: {avatar,nick,signature}})

//发布动态
export const addArticle = (context,locationName,imageCount,imagePath) => request({url: '/article/add',method: 'post',data: {context,locationName,imageCount,imagePath}})

//获取全部文章信息
export const getAllArticle = (pageNo,pageSize) => request({url: "/article/getAll/"+pageNo+"/"+pageSize,method: 'get',data: {}})

//获取文章信息
export const getArticle = (articleId) => request({url: "/article/get/"+articleId,method: 'get',data: {}})

//上传文章图片
export const getImage = () => request({url: "/article/uploadImage",method: 'post',data: {}})

//删除文章图片
export const delImage = (imagePath) => request({url: "/article/delImage",method: 'post',data: {imagePath}})

//上传日程
export const addSchedule = (content,eventDate,eventStart,eventEnd) => request({url: "/schedule/add",method: 'post',data: {content,eventDate,eventStart,eventEnd}})

//获取日程
export const getSchedule = (eventDate,pageNo,pageSize) => request({url: "/schedule/get",method: 'post',data: {eventDate,pageNo,pageSize}})

//获取我的文章
export const getMyArticle = (pageNo,pageSize) => request({url: "/article/getMy/" + pageNo + "/" + pageSize,method: 'get',data: {}})

//删除日程
export const delSchedule = (scheduleId) => request({url: "/schedule/del",method: 'post',data: {scheduleId}})

//删除文章
export const delArticle = (articleId) => request({url: "/article/del",method: 'post',data: {articleId}})

//点赞
export const vote = (votableId,type) => request({url: "/article/vote",method: 'post',data: {votableId,type}})

//解除绑定
export const unbind = () => request({url: "/sys/unbind",method: 'post',data: {}})

//获取评论
export const getComment = (articleId,pageNo,pageSize) => request({url: "/comment/get/"+articleId+"/"+pageNo+"/"+pageSize,method: 'get',data: {}})

//删除评论
export const delComment = (commentId) => request({url: "/comment/del",method: 'post',data: {commentId}})


//上传评论
export const addComment = (articleId,commentContext,commentType) => request({url: "/comment/add",method: 'post',data: {articleId,commentContext,commentType}})

//获取必修课程信息
export const getCompClazz = () => request({url: "/schsys/getcomp",method: 'get',data: {}})

//获取选修课程信息
export const getEleClazz = () => request({url: "/schsys/getele",method: 'get',data: {}})

//获取学生个人信息
export const getStudentInfo = () => request({url: "/schsys/getstudentinfo",method: 'get',data: {}})

//获取考试信息
export const getExamInfo = () => request({url: "/schsys/getexaminfo",method: 'get',data: {}})

//获取课程表
export const getClazzSchedule = () => request({url: "/schsys/getclazzschedule",method: 'get',data: {}})


