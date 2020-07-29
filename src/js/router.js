// 注册路由
function Router() {
  this.routes = {};
  this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
  this.routes[path] = callback || function() {};
};
Router.prototype.refresh = function() {
  this.currentUrl = location.hash.slice(1) || '/';
  if(this.routes[this.currentUrl]!=undefined){
    this.routes[this.currentUrl]();
  }
};
Router.prototype.init = function() {
  // window.addEventListener('load', this.refresh.bind(this), false);
  // window.addEventListener('hashchange', this.refresh.bind(this), false);
  
  $(window).bind('load', this.refresh.bind(this));
  $(window).bind('hashchange', this.refresh.bind(this));
}
window.Router = new Router();
window.Router.init();
/*个人设置*/
Router.route('/personalSetting', function() {
  gbMainContent('components/personalSetting.html', RoundaboutSet);
});
/*交接班记录*/
Router.route('/recordOfSuccession', function() {
  gbMainContent('components/recordOfSuccession.html', RoundaboutSet);
});
/*新建交接记录*/
Router.route('/newHandoverRecord', function() {
  gbMainContent('components/newHandoverRecord.html', RoundaboutSet);
});
/*编辑交接记录*/
Router.route('/editHandoverRecord', function() {
  gbMainContent('components/editHandoverRecord.html', RoundaboutSet);
});
/*查看交接记录*/
Router.route('/viewHandoverRecord', function() {
  gbMainContent('components/viewHandoverRecord.html', RoundaboutSet);
});


/*首页*/
Router.route("/index", function() {
  gbMainContent('components/index.html', RoundaboutSet);
});

/*实时监控*/
Router.route('/monitoring', function() {
  gbMainContent('components/monitoring.html', RoundaboutSet);
});

/*应急演练模块 start*/
//演练效果
Router.route('/manoeuvre', function() {
  gbMainContent('components/manoeuvre.html', RoundaboutSet);
});
//演练计划
Router.route('/exercisePlan', function() {
  gbMainContent('components/exercisePlan.html', RoundaboutSet);
});
//新建手动演练计划
Router.route('/newManualExerProg', function() {
  gbMainContent('components/newManualExerProg.html', RoundaboutSet);
});
//编辑手动演练计划
Router.route('/editManualExerProg', function() {
  gbMainContent('components/editManualExerProg.html', RoundaboutSet);
});
//查看手动演练计划
Router.route('/viewManualExerProg', function() {
  gbMainContent('components/viewManualExerProg.html', RoundaboutSet);
});
//新建周期计划
Router.route('/newCyclePlan', function() {
  gbMainContent('components/newCyclePlan.html', RoundaboutSet);
});
//编辑周期计划
Router.route('/editCyclePlan', function() {
  gbMainContent('components/editCyclePlan.html', RoundaboutSet);
});
//查看周期计划
Router.route('/viewCyclePlan', function() {
  gbMainContent('components/viewCyclePlan.html', RoundaboutSet);
});
//发布策略设置
Router.route('/planReleasePolicy', function() {
  gbMainContent('components/planReleasePolicy.html', RoundaboutSet);
});
/*应急演练模块 end*/

/*调度指挥模块 start*/
//调度方案
Router.route('/schedulingPlan', function() {
  gbMainContent('components/schedulingPlan.html', RoundaboutSet);
});
//新建调度方案
Router.route('/newSchedulingPlan', function() {
  gbMainContent('components/newSchedulingPlan.html', RoundaboutSet);
});
//编辑调度方案
Router.route('/editSchedulingPlan', function() {
  gbMainContent('components/editSchedulingPlan.html', RoundaboutSet);
});
//查看调度方案
Router.route('/viewSchedulingPlan', function() {
  gbMainContent('components/viewSchedulingPlan.html', RoundaboutSet);
});
//任务消息
Router.route('/taskMsg', function() {
  gbMainContent('components/taskMsg.html', RoundaboutSet);
});
//新建任务消息
Router.route('/newTaskMsg', function() {
  gbMainContent('components/newTaskMsg.html', RoundaboutSet);
});
//编辑任务消息
Router.route('/newTaskMsgEdit', function() {
  gbMainContent('components/newTaskMsgEdit.html', RoundaboutSet);
});
//查看任务消息
Router.route('/viewTaskMsg', function() {
  gbMainContent('components/viewTaskMsg.html', RoundaboutSet);
});
//发布策略
Router.route('/releasePolicy', function() {
  gbMainContent('components/releasePolicy.html', RoundaboutSet);
});
//预警消息
Router.route('/warningMessage', function() {
  gbMainContent('components/warningMessage.html', RoundaboutSet);
});
//新建预警消息
Router.route('/newWarningMsg', function() {
  gbMainContent('components/newWarningMsg.html', RoundaboutSet);
});
//编辑预警消息
Router.route('/editWarningMsg', function() {
  gbMainContent('components/editWarningMsg.html', RoundaboutSet);
});
//查看预警消息
Router.route('/viewWarningMsg', function() {
  gbMainContent('components/viewWarningMsg.html', RoundaboutSet);
});
//报表导出
Router.route('/exportAReport', function() {
  gbMainContent('components/exportAReport.html', RoundaboutSet);
});
/*调度指挥模块 end*/

/*消息接入模块 start*/
//接口列表
Router.route('/interfaceList', function() {
  gbMainContent('components/interfaceList.html', RoundaboutSet);
});
//新建接口
Router.route('/newInterface', function() {
  gbMainContent('components/newInterface.html', RoundaboutSet);
});
//编辑接口
Router.route('/editInterface', function() {
  gbMainContent('components/editInterface.html', RoundaboutSet);
});
//查看接口
Router.route('/viewInterface', function() {
  gbMainContent('components/viewInterface.html', RoundaboutSet);
});
/*消息接入模块 end*/

/*资源管理模块 start*/
//资源信息管理
Router.route('/resourceInformation', function() {
  gbMainContent('components/resourceInformation.html', RoundaboutSet);
});
//新建平台资源信息
Router.route('/newPlatResoInfo', function() {
  gbMainContent('components/newPlatResoInfo.html', RoundaboutSet);
});
//编辑平台资源信息
Router.route('/editPlatResoInfo', function() {
  gbMainContent('components/editPlatResoInfo.html', RoundaboutSet);
});
//查看平台资源信息
Router.route('/viewPlatResoInfo', function() {
  gbMainContent('components/viewPlatResoInfo.html', RoundaboutSet);
});
//新建下级终端
Router.route('/newJuniorTerminal', function() {
  gbMainContent('components/newJuniorTerminal.html', RoundaboutSet);
});
//编辑下级终端
Router.route('/editJuniorTerminal', function() {
  gbMainContent('components/editJuniorTerminal.html', RoundaboutSet);
});
//查看下级终端
Router.route('/viewJuniorTerminal', function() {
  gbMainContent('components/viewJuniorTerminal.html', RoundaboutSet);
});
//新建台站资源信息
Router.route('/newStationResoInfo', function() {
  gbMainContent('components/newStationResoInfo.html', RoundaboutSet);
});
//编辑台站资源信息
Router.route('/editStationResoInfo', function() {
  gbMainContent('components/editStationResoInfo.html', RoundaboutSet);
});
//节目资源管理
Router.route('/programResources', function() {
  gbMainContent('components/programResources.html', RoundaboutSet);
});
//新建节目资源
Router.route('/newProgResources', function() {
  gbMainContent('components/newProgResources.html', RoundaboutSet);
});
//查看节目资源
Router.route('/viewProgResources', function() {
  gbMainContent('components/viewProgResources.html', RoundaboutSet);
});
//文字语音管理
Router.route('/characterVoice', function() {
  gbMainContent('components/characterVoice.html', RoundaboutSet);
});
//上传文字语音
Router.route('/uploadingCharVoice', function() {
  gbMainContent('components/uploadingCharVoice.html', RoundaboutSet);
});
//编辑文字语音
Router.route('/editCharVoice', function() {
  gbMainContent('components/editCharVoice.html', RoundaboutSet);
});
//查看文字语音
Router.route('/viewCharVoice', function() {
  gbMainContent('components/viewCharVoice.html', RoundaboutSet);
});
/*资源管理模块 end*/

/*安全管理模块 start*/
//上传证书
Router.route('/uploadTheCertif', function() {
  gbMainContent('components/uploadTheCertif.html', RoundaboutSet);
});
//我的证书
Router.route('/myCertificates', function() {
  gbMainContent('components/myCertificates.html', RoundaboutSet);
});
//安装证书
Router.route('/certInstaller', function() {
  gbMainContent('components/certInstaller.html', RoundaboutSet);
});
//用户证书管理
Router.route('/userCertifMana', function() {
  gbMainContent('components/userCertifMana.html', RoundaboutSet);
});
//平台证书管理
Router.route('/platformCertifMana', function() {
  gbMainContent('components/platformCertifMana.html', RoundaboutSet);
});
//安全服务系统配置
Router.route('/securityServSystemConfig', function() {
  gbMainContent('components/securityServSystemConfig.html', RoundaboutSet);
});
/*安全管理模块 end*/

/*日志管理模块 start*/
//系统登录日志
Router.route('/systemLoginLog', function() {
  gbMainContent('components/systemLoginLog.html', RoundaboutSet);
});
//用户操作日志
Router.route('/userOperationLog', function() {
  gbMainContent('components/userOperationLog.html', RoundaboutSet);
});
//系统运维日志
Router.route('/systemOperLog', function() {
  gbMainContent('components/systemOperLog.html', RoundaboutSet);
});
//新建运维日志
Router.route('/newOperLog', function() {
  gbMainContent('components/newOperLog.html', RoundaboutSet);
});
//编辑运维日志
Router.route('/editOperLog', function() {
  gbMainContent('components/editOperLog.html', RoundaboutSet);
});
//查看运维日志
Router.route('/viewOperLog', function() {
  gbMainContent('components/viewOperLog.html', RoundaboutSet);
});
//数据联动日志
Router.route('/dataLinkageLog', function() {
  gbMainContent('components/dataLinkageLog.html', RoundaboutSet);
});
/*日志管理模块 end*/

/*系统管理模块 start*/
//值班管理
Router.route('/watch', function() {
  gbMainContent('components/watch.html', RoundaboutSet);
});
//值班日志
Router.route('/onDuty', function() {
  gbMainContent('components/onDuty.html', RoundaboutSet);
});
//角色管理
Router.route('/roleManage', function() {
  gbMainContent('components/roleManage.html', RoundaboutSet);
});
//角色编辑
Router.route('/editRole', function() {
  gbMainContent('components/editRole.html', RoundaboutSet);
});
//角色新建
Router.route('/addRole', function() {
  gbMainContent('components/addRole.html', RoundaboutSet);
});
//查看角色
Router.route('/viewRole', function() {
  gbMainContent('components/viewRole.html', RoundaboutSet);
});
//用户管理
Router.route('/userManage', function() {
  gbMainContent('components/userManage.html', RoundaboutSet);
});
//新建用户
Router.route('/addUser', function() {
  gbMainContent('components/addUser.html', RoundaboutSet);
});
//编辑用户
Router.route('/editUser', function() {
  gbMainContent('components/editUser.html', RoundaboutSet);
});
//查看用户
Router.route('/viewUser', function() {
  gbMainContent('components/viewUser.html', RoundaboutSet);
});
/*系统管理模块 end*/
