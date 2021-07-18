$(function () {
    var layer = layui.layer
    $('#bunout').on('click',function () {
        layer.confirm('你真的要退出吗?', {icon: 3, title:'提示'}, function(index){
            // 清空
            localStorage.removeItem('token')

            //
            location.href = './login.html'
            layer.close(index);
        });
    })
    getUserinfo()
})
// http://api-breakingnews-web.itheima.net
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求信息失败')
            }
            roundinfo(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = './login.html'
            }
        }
    })
}
function roundinfo(user) {
    let name =  user.nickname || user.username
    let info_src =  user.user_pic
    // 渲染文字
    $('.welcome').html('欢迎  '+ name)
    // 渲染头像
    if (info_src !== null) {
        $('.layui-nav-img').attr('src',info_src).show()
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }
}