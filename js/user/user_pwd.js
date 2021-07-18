$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        length: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        pwd: function(value){
            let new_pwd = $('#new_pwd').val()
            let old_pwd = $('#old_pwd').val()
            if (value !== new_pwd) {
                return '两次输入的密码不一致';
            }
            if (old_pwd === value) {
                return '新旧密码不能一致'
            }
        }
    })
    $('#pwd_form').on('submit',function (e) {
        e.preventDefault()
        let old_pwd = $('#old_pwd').val()
        let new_pwd = $('#new_pwd').val()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: {
                oldPwd: old_pwd,
                newPwd: new_pwd
            },
            success: function (res) {
                $('#pwd_form')[0].reset()
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功')
            }
        })
    })
})