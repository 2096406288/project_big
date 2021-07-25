$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, // 页面值
        pagesize: 2, // 每页显示几条数据
        cate_id: '', // 文章分类的ID
        state: '', // 文章的状态
    }
    inittab()

    inittable_list()
    function inittable_list() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败')
                }
                let htmlStr = template('tpl_list',res)
                $('#cate_id').html(htmlStr)
                form.render()
            }
        })
    }


    function inittab() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/list',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章数据失败')
                }
                let htmlStr = template('tpl_tab',res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    // 时间过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)

        var y = dt.getFullYear()
        y = y < 10 ? '0' + y : y
        var m = dt.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = dt.getDate()
        d = d < 10 ? '0' + d : d

        var yy = dt.getHours()
        yy = yy < 10 ? '0' + yy : yy
        var ff = dt.getMinutes()
        ff = ff < 10 ? '0' + ff : ff
        var ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss

        return y + '-' + m + '-' + d + ' ' + yy + ':' + ff + ':' + ss
    }

    $('#search').on('click',function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        inittab()
    })

    // 实现分页的功能
    function renderPage(data) {
        laypage.render({
            elem: 'renderPage',
            count: data,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count','limit','prev','page','next','skip'],
            limits: [2,3,5,10],
            jump: function (obj,first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    inittab()
                }
            }
        })
    }

    $('tbody').on('click','btn-delete',function () {
        layer.confirm('你真的要删除吗?', {icon: 3, title:'提示'}, function(index){
            let id = $(this).attr('data-id')
            let len = $('btn-delete').length
            $.ajax({
                method:　"GET",
                url: 'http://api-breakingnews-web.itheima.net/my/article/delete/' + id,
                headers: {
                    Authorization: localStorage.getItem('token' || '')
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? q.pagenum : q.pagenum -1
                    }
                    inittab()
                }
            })

            layer.close(index);
        });

    })
})