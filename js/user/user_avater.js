
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
// 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

// 1.3 创建裁剪区域
    $image.cropper(options)

    $('#ChooseFileImage').on('click',function () {
        $('#file').click()
    })

    var layer = layui.layer
    $('#file').on('change',function (e) {
        console.log(e.target.files)
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })
    $('#btnChoose').on('click',function (e) {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method:　'post',
            url: 'http://api-breakingnews-web.itheima.net/my/update/avatar',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: {avatar: dataURL},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像失败')
                }
                layer.msg('上传头像成功')
                window.parent.getUserinfo()
            }
        })
    })

})