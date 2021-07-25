$(function () {
    var layer = layui.layer
    var form = layui.form
    // 初始化富文本编辑器
    initEditor()
    initcate()
    function initcate() {
        $.ajax({
            method:　'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败')
                }
                var htmlStr = template('tpl-cate',res)
                $('#cate').html(htmlStr)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#coverbtn').on('click',function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change',function (e) {
        var file = e.target.files[0]
        if (file.length === 0) {
            return layer.msg('请选择文件')
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var state = '已发布'
    $('#savabtn').on('click',function () {
        state = '草稿'
    })

    $('#form_pub').on('submit',function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state',state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img',blob)
            })
        console.log('1')
        publish_pub(fd)
    })
    function publish_pub(fd) {
        console.log('1')
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/article/add',
            data: fd,
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.status !==0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
            }
        })
    }
})