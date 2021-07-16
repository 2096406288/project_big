$(function () {
    // 登录、注册页面切换
    $('#login').on('click',function () {
        $(this).hide()
        $('#reg').show()
        $('.layui-form').eq(1).show()
        $('.layui-form').eq(0).hide()
    })
    $('#reg').on('click',function () {
        $(this).hide()
        $('#login').show()
        $('.layui-form').eq(0).show()
        $('.layui-form').eq(1).hide()
    })

    
})