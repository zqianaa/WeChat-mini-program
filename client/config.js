/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
/*var host = 'https://h7n1b0kk.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/Login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/User`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/Tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/Upload`
    }
};

module.exports = config;*/


/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://h7n1b0kk.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    //储存用户名称
    saveUserNameUrl: `${host}/weapp/SaveUserName`,

    //创建话题
    createTopicUrl: `${host}/weapp/topic/CreateTopic`,

    //根据用户名称获得话题信息
    userTopicUrl: `${host}/weapp/topic/UserTopic`,

    //根据topicid获得topic description
    getTopicDesUrl: `${host}/weapp/topic/GetTopicDes`,

    //根据topicid更新topic info
    updateTopicInfoUrl: `${host}/weapp/topic/UpdateTopicInfo`,

    //用户离开topic讨论
    leaveTopicUrl: `${host}/weapp/topic/LeaveTopic`,

    //根据topicid获得topic basics所有信息
    getTopicBasicInfoUrl: `${host}/weapp/topic/GetTopicBasicInfo`,

    //根据topicid获得topic opinion所有信息
    getTopicOpinionInfoUrl: `${host}/weapp/topic/GetTopicOpinionInfo`,

    //用户关闭该话题
    closeTopicUrl: `${host}/weapp/topic/CloseTopic`,

    //创建opinion
    createOpinionUrl: `${host}/weapp/opinion/CreateOpinion`,

    //通过oid获得opinion des
    getOpinionDesUrl: `${host}/weapp/opinion/GetOpinionDes`,

    //通过oid更新opinion info
    updateOpinionInfoUrl: `${host}/weapp/opinion/UpdateOpinionInfo`,

    //上传msg至database
    uploadMsg: `${host}/weapp/msg/UploadMsg`,

    //根据oid下载所有msg
    downloadMsgUrl: `${host}/weapp/msg/DownloadMsg`,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/Login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/User`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/Tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/Upload`
  }
};

module.exports = config;