$(function () {
    var layer = layui.layer
    var form = layui.form
    function addcate() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tep',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    addcate()
    var addindex = null
    $('#btnAdd').on('click',function () {
        addindex = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px']
            ,content: $('#tpl_add').html()
        });
    })
    $('body').on('submit','#form_add',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net\/my/article/addcates',
            headers: {Authorization: localStorage.getItem('token' || '')},
            data: $('#form_add').serialize(),
            success:  function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加成功')
                addcate()
                layer.close(addindex)
            }
        })
    })
    var editindex = null
    $('tbody').on('click','#btn-edit',function () {
        editindex = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px']
            ,content: $('#tpl_edit').html()
        });
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates/' + id,
            headers: {Authorization: localStorage.getItem('token' || '')},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                form.val("form_edit",res.data)
            }
        })
    })
    $('body').on('submit','#form_edit',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/article/updatecate',
            headers: {Authorization: localStorage.getItem('token' || '')},
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                addcate()
                layer.close(editindex)
            }
        })
    })
    $('tbody').on('click','#btn-delete',function (e) {
        let id = $(this).attr('data-id')
        layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: 'http://api-breakingnews-web.itheima.net/my/article/deletecate/' + id,
                headers: {Authorization: localStorage.getItem('token' || '')},
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    addcate()
                    layer.msg('删除成功')
                }
            })

            layer.close(index);
        });
    })
})