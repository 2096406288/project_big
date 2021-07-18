$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '请输入0-6位的长度';
            }}
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    console.log('失败')
                    return layer.msg('获取用户数据失败!')
                }
                console.log(res)
                form.val('formUserinfo',res.data)
            }
        })
    }
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res)
                    return layer.msg("更新数据失败")
                }
                layer.msg('更新数据成功')
                window.parent.getUserinfo()
            }
        })
    })
    $('#btnReset').on('click',function (e) {
        e.preventDefault()
        initUserinfo()
    })
})