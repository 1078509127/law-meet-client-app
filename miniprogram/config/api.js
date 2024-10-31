// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:8080/client/';
// 云平台上线时使用
//var WxApiRoot = 'https://9ly7904782sq.vicp.fun/client/';

module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'user/loginByWx', //微信登录
  AuthLoginByAccount: WxApiRoot + 'user/login', //账号登录
  AuthLogout: WxApiRoot + 'user/logout', //账号登出
  AuthRegister: WxApiRoot + 'user/register', //账号注册
  AuthLogOff: WxApiRoot + 'user/logOff', //账号注销
  AuthReset: WxApiRoot + 'user/reset', //账号手机密码修改

  CertAdd: WxApiRoot + 'cert/add', //认证中心添加
  CretSelect: WxApiRoot + 'cert/select', //认证中心查询
};
