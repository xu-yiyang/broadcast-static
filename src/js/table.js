/*type*/
$(document).on('click','.msgtype li',function(){
    $('.msgtype li').removeClass('msgact');
    $(this).addClass('msgact');
})

/*calendar*/
// layui.use('laydate', function(){
//     var laydate = layui.laydate;
//     laydate.render({
//         elem: '#daterg',
//         eventElem: '#tochobtn',
//         trigger: 'click',
//         type:'datetime',
//         range: true
//     });
// })
function body_load() {
    setTimeout(function(argument) {
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#daterg',
                eventElem: '#tochobtn',
                trigger: 'click',
                type:'datetime',
                range: true,
                change: function(value, date, endDate){
                    console.log(value)
                    console.log(date)
                    console.log(endDate)
                }
            });
        })
    },500)
}


//table
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "html-percent-pre": function (a) {
        //console.log($(a).attr('vel'));
        var x = $(a).attr('vel');
        return parseFloat(x);
    },

    "html-percent-asc": function (a, b) {                //正序排序引用方法
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "html-percent-desc": function (a, b) {                //倒序排序引用方法
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});



var oLanguage={ //国际语言转化
    "oAria": {
        "sSortAscending": " - click/return to sort ascending",
        "sSortDescending": " - click/return to sort descending"
    },
    "sLengthMenu": " _MENU_ 条",
    "sZeroRecords": "对不起，查询不到任何相关数据",
    "sEmptyTable": "未有相关数据",
    "sLoadingRecords": "正在加载数据-请等待...",
    "sInfo": "共 _TOTAL_ 条 ", //当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。
    "sInfoEmpty": "当前显示0到0条，共0条记录",
    "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
    "sProcessing": "正在加载数据...",
    "sSearch": "模糊查询：",
    "sUrl": "",
    //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
    "oPaginate": {
        // "sFirst": "首页",
        "sPrevious": " <i class='iconfont icon-zuo'></i> ",
        "sNext": " <i class='iconfont icon-you-copy'></i> ",
        // "sLast": " 尾页 "
    }
}

// 自定义显示数量
function tabot($this) {
    var tabot = $('<div class="botdiv"></div>');    
    $this.find('.tablecont').append(tabot);
    $this.find('.dataTables_info').appendTo($this.find('.botdiv'));
    $this.find('.dataTables_length').appendTo($this.find('.botdiv'));
    $this.find('.dataTables_paginate').appendTo($this.find('.botdiv'));
}

// 跳转page
function jumpPage($this) {
    $this.find(".dataTables_paginate").append("<div class='jump-page'>前往第 <input class='changePage' type='text'> 页  <a class='dataTable-btn' href='javascript:void(0);'>确认</a></div>");  
    var oTable = $this.find("table").dataTable();  
    $this.find('.dataTable-btn').click(function(e) { 
        if($this.find(".changePage").val() && $this.find(".changePage").val() > 0) {  
            var redirectpage = $this.find(".changePage").val() - 1;
        } else {  
            var redirectpage = 0;
        }
        oTable.fnPageChange(redirectpage);  
    });  
}

//列搜索
function rowScreen(column){
    var $span = $('<span class="addselect"><i class="iconfont icon-arrow-bottom"></i></span>').appendTo($(column.header()))
    var select = $('<select><option value="">全部</option></select>')
           .appendTo($(column.header()))
           .on('click', function (evt) {
               evt.stopPropagation();
               var val = $.fn.dataTable.util.escapeRegex(
                       $(this).val()
               );
               column
                       .search(val ? '^' + val + '$' : '', true, false)
                       .draw();
           });
   column.data().unique().sort().each(function (d, j) {
       function delHtmlTag(str) {
           return str.replace(/<[^>]+>/g, "");//去掉html标签
       }

       d = delHtmlTag(d)
       select.append('<option value="' + d + '">' + d + '</option>')
       $span.append(select)
   });
}
//等级列筛选
function rowLevScreen(column){
    var $span = $('<span class="addselect"><i class="iconfont icon-arrow-bottom"></i></span>').appendTo($(column.header()))
    var select = $('<select><option value="">全部</option></select>')
        .appendTo($(column.header()))
        .on('click', function(evt) {
            evt.stopPropagation();
            var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
            );
            column.search(val ? val : '', true, false).draw();
        });
    column.data().unique().sort().each(function(d, j) {
        function delHtmlTag(str) {
            return str.replace(/<[^>]+>/g, ""); //去掉html标签
        }

        d = $(d).attr("vel");
        select.append('<option value="' + d + '">' + d + '</option>')
        $span.append(select)
    });
}

//table配置
function userDef(table){
    $(".gb-packUp-leftNav").click(function(){
        setTimeout(function(){
            table.draw();
        },500)
    });//重绘
    //自定义显示数量
    $('.taskmsg').each(function(){
        tabot($(this))
    })
     $('.gb-ctab').each(function(){
        tabot($(this))
    })
    //自定义显示搜索
    $('.dsearch').on('keyup click', function () {
       var tsval = $(".dsearch").val()
       table.search(tsval, false, false).draw();
    });

    //checkbox全选
   $("#checkAll").on("click", function () {
       if ($(this).prop("checked") === true) {
           $("input[name='checkone']").prop("checked", $(this).prop("checked"));
           $('.dataTables_wrapper tbody tr').addClass('selected');
       } else {
           $("input[name='checkone']").prop("checked", false);
           $('.dataTables_wrapper tbody tr').removeClass('selected');
       }
   });


   //删除选中行
   $('.dataTables_wrapper tbody').on('click', 'tr input[name="checkone"]', function () {
       var $tr = $(this).parents('tr');
       $tr.toggleClass('selected');
       var $tmp = $('[name=checkone]:checkbox');
       $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);

   });

   $('.chedel').click(function () {
       table.rows('tr.selected').remove().draw(false);
       $('#checkAll').attr('checked',false);
   });

    $('.cho-delete').click(function(){
        table.row('.trdel').remove().draw(false);
        $(this).parents('.choose').hide();
   })

    $('.dataTables_wrapper').on('scroll',function(){
        if($('.choose').is(':visible')){
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trstop trcont traga trdel');
        }
    })
    $(window).resize(function(){
        if($('.choose').is(':visible')){
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trstop trcont traga trdel');
        }
    })
}




/*popwindow*/
$(document).on('click','.operbtn',function(){
    $('.popwindow').show();
    $('.preview').show();
})

$(document).on('click','.audit',function(){
    $('.popwindow').show();
    $('.review').show();
})
$(document).on('click','.notpass',function(){
    $('.popwindow').show();
    $('.unreason').show();//.css({'z-index':'101','opacity':1,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"});
})

/**/$(document).on('click','.popwindow',function(){
    /*if($(this).hasClass('popnone')){
        return;
    }else{*/
        $(this).hide();
        $('.preview').hide();
        $('.review').hide();
        $('.fillin').hide();
        $('.toshift').hide();
        $('.unreason').hide();
        $('.tolead').hide();
        $('.upcert').hide();
        $('.datecho').hide();
        $('.weekcho').hide();
        $('.yemon').hide();
    //}
    //.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.popclose',function(){
    $('.popwindow').hide();
    
    $(this).parent().hide();
    $('.unreason').hide();//.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
})
$(document).on('click','.revno',function(){
    $('.review').hide();
    $('.fillin').show();
})
$(document).on('click','.rev-cancel',function(){
    $('.popwindow').hide();
    $(this).parents('.fillin').hide();
    $(this).parents('.upcert').hide();
})
$(document).on('click','.revyes',function(){
    $('.popwindow').hide();
    $(this).parents('.review').hide();
    $(this).parents('.fillin').hide();
    $(this).parents('.upcert').hide();
})
$(document).on('click','.un-confirm',function(){
    $('.popwindow').hide();
    $(this).parents('.unreason').hide();//.css({'z-index':'-1','display':'block','opacity':0,'-ms-filter':"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"});
    $(this).parents('.datecho').hide();
    $(this).parents('.weekcho').hide();
})


//停发、续发、重发、删除、注销
$(function() {
    $(document).on('click','.isstop',function(event) {
        showDiv();
        $('.choword').html('确定停发此任务消息吗？');
        $('.chopri').val('停发');
        $('.chopri').removeClass('cho-delete cho-again cho-continue').addClass('cho-stop');
        $(this).parents('tr').addClass('trstop');
        $(document).one("click",
        function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trstop');
        });
        event.stopPropagation(); 
    });
    $(document).on('click','.iscont',function(event) {
        showDiv();
        $('.choword').html('确定续发此任务消息吗？');
        $('.chopri').val('续发');
        $('.chopri').removeClass('cho-delete cho-again cho-stop').addClass('cho-continue');
        $(this).parents('tr').addClass('trcont');
        $(document).one("click",
        function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trcont');
        });
        event.stopPropagation();
    });
    $(document).on('click','.chretry',function(event) {
        showDiv();
        $('.choword').html('确定重发此任务消息吗？');
        $('.chopri').val('重发');
        $('.chopri').removeClass('cho-delete cho-continue cho-stop').addClass('cho-again');
        $(this).parents('tr').addClass('traga');
        $(document).one("click",
        function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('traga');
        });
        event.stopPropagation();
    });
    $(document).on('click','.delete',function(event) {
        showDiv();
        $('.choword').html('确定删除此任务消息吗？');
        $('.chopri').val('删除');
        $('.chopri').removeClass('cho-again cho-continue cho-stop').addClass('cho-delete');
        $(this).parents('tr').addClass('trdel');
        //$(myDiv).toggle();
        $(document).one("click",
        function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trdel');
        });
        event.stopPropagation();
    });
    $(document).on('click','.logout',function(event) {
        showDiv();
        //$('.choword').html('确定注销吗？');
        //$('.chopri').val('注销');
        //$('.chopri').addClass('cho-logout');
        $(this).parents('tr').addClass('trlogout');
        //$(myDiv).toggle();
        $(document).one("click",
        function() { 
            $(".choose").hide();
            $('table.dataTable tbody tr').removeClass('trlogout');
        });
        event.stopPropagation();
    });
    $(".choose").click(function(event) {
        event.stopPropagation(); 
    });
});
function showDiv() {
    var x = event.clientX - event.offsetX;
    var y = event.clientY - event.offsetY;
    $(".choose").css({'display':'block','top':y-80,'left':x-110});
}

$('.cho-stop').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('trstop');
})

$('.cho-continue').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('trcont');
})

$('.cho-again').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('traga');
})
$('.cho-logout').click(function(){
    $(this).parents('.choose').hide();
    $('tr').removeClass('trlogout');
})
$('.cho-cancel').click(function(){
    //console.log('chocancel');
    $(this).parents('.choose').hide();
    $('tr').removeClass('trstop trcont traga trdel');
})

/*popwindow*/

//新建资源下拉框
$(document).on('click','.catonew',function(){
    if($('.tonewlist').is(':hidden')){
        $('.catonew i').removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
        $('.tonewlist').show();
    }else{
        $('.catonew i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
        $('.tonewlist').hide();
    }
})



$(function() {
    //查看详情
    $(document).on('click','.view-cont',function(event) {
        $('.viewdetail').css({'height':'100%','padding-top':'130px'});
        $('.detadiv').animate({
            'margin-right':'0'
        },500);
        $(document).one("click",
        function() { 
            $('.detadiv').animate({
                'margin-right':'-516px'
            },500,function(){
                $('.viewdetail').css({'height':'0','padding-top':'0'});
            });
        });
        event.stopPropagation(); 
    }) 
    $(".viewdetail").click(function(event) {
        event.stopPropagation(); 
    });
    $('.viewclose').click(function(){
        $('.detadiv').animate({
            'margin-right':'-516px'
        },500,function(){
            $('.viewdetail').css({'height':'0','padding-top':'0'});
        });
    })
});
