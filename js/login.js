$(function () {
    // 登录、注册页面切换
    $('#login').on('click', function () {
        $(this).hide()
        $('#reg').show()
        $('.layui-form').eq(1).show()
        $('.layui-form').eq(0).hide()
    })
    $('#reg').on('click', function () {
        $(this).hide()
        $('#login').show()
        $('.layui-form').eq(0).show()
        $('.layui-form').eq(1).hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        qrpwd: function (value) {
            let pwd = $('#pwd').val()
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    });


    //接口URL地址: http://api-breakingnews-web.itheima.net
    // 注册模块功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let username = $('#zc_username').val()
        let pwd = $('#pwd').val()
        console.log(username)
        console.log(pwd)
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {username: username, password: pwd},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录!')
                $('#link_login').click()
            }
        })
    })


    // 登录模块
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        let username = $('#dlusername').val()
        let password = $('#dlpassword').val()
        $.ajax({
            method: "POST",
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: {username: username,password:password},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!!!')
                }
                localStorage.setItem('token',res.token)
                layer.msg('登录成功')
                location.href = './index.html'
            }
        })
    })
})