/*
 treeMenu - jQuery plugin
 version: 0.4

 Copyright 2014 Stepan Krapivin

*/



//树形结构
function treeMenu(a){
    this.tree=a||[];
    this.groups={};
};
treeMenu.prototype={
    init:function(treeType,key,parentId){
        // 左侧菜单
        if(key == 'pId' && treeType == 'menu'){
            this.group1();
            return this.getDomMenu(this.groups[parentId]);
        }

        //菜单树选择
        if(key == 'pId' && treeType == 'menuTree'){
            this.group1();
            return this.getDomMenuTree(this.groups[parentId]);
        }

        //机构树选择
        if(key == 'pId' && treeType == 'orgTree'){
            this.group1();
            return this.getDomOrgTree(this.groups[parentId]);

        }
       
        // 机构树table
        if(key == 'parentId' && treeType == 'orgTableTree'){
            this.group();
            return this.getDomOrgTableTree(this.groups[parentId]);
        }

        // 菜单树table
        if(key == 'parentId' && treeType == 'menuTableTree'){
            this.group();
            return this.getDomMenuTableTree(this.groups[parentId]);
        }
        
    },
    group:function(){
        for(var i=0;i<this.tree.length;i++){
            if(this.groups[this.tree[i].parentId]){
                this.groups[this.tree[i].parentId].push(this.tree[i]);
            }else{
                this.groups[this.tree[i].parentId]=[];
                this.groups[this.tree[i].parentId].push(this.tree[i]);
            }
        }
    },
    group1:function(){
        for(var i=0;i<this.tree.length;i++){
            if(this.groups[this.tree[i].pId]){
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }else{
                this.groups[this.tree[i].pId]=[];
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }
        }
    },

    getDomMenu:function(a){
        if(!a){return ''}
        var html='\n<ul class="list-unstyled nav-list">\n';
        for(var i=0;i<a.length;i++){
            var str=this.getDomMenu(this.groups[a[i].id]);
            if(a[i].type != 'F'){
                html+='<li><a href="javascript:void(0)" _id='+a[i].id+' name='+a[i]['menuName_'+lang.getLang()]
                +' url='+a[i].url +' type='+a[i].type 
                +' >'
                +(a[i].type == 'C' ? '' : (a[i].icon&&a[i].icon!='#' ? '<i class="'+(a[i].icon?a[i].icon:'fa fa-reorder')+' icon"></i>' : '')  +'<span class="text">')
                +(a[i]['menuName_'+lang.getLang()] !== 'null' ? a[i]['menuName_'+lang.getLang()] : '-')
                +'</span>'
                +(a[i].type == 'C' ? '' : '<i class="arrow fa fa-angle-right right"></i>')
                +'</a>';
                html+=str;
                html+='</li>\n';
            }else{
                html+='<div class="hideBtn">'+JSON.stringify(a[i])+'</div>';
            }
            
        };
        html+='</ul>\n';
        return html;
    },

    getDomOrgTree:function(a){
        if(!a){return ''}
        var html='\n<ul>\n';
        for(var i=0;i<a.length;i++){
            html+='<li><a class="treeA" href="javascript:;" _id='+a[i].id+'>'+a[i].name+'</a>';
            html+=this.getDomOrgTree(this.groups[a[i].id]);
            html+='</li>\n';
        };
        html+='</ul>\n';
        return html;
    },

    getDomOrgTableTree:function(a){
        if(!a){return ''}
        var html='';
        var str=''; 
        for(var i=0;i<a.length;i++){
            var y=this.getDomOrgTableTree(this.groups[a[i].orgId]);
            if(y!='')str+='<span class="treetable-indent"></span>';
            html+='<tr>';
            // html+='<tr><td><span class="zCBox"></span></td>';
            html+='<td style="text-align:left">'
            html+=(y!=''?'<span class="treetable-expander glyphicon glyphicon-chevron-down fa"></span>':str)
            html+=a[i].orgName+'</td>';
            html+='<td>'+a[i].orgId+'</td>';;
            html+='<td>'+a[i].createBy+'</td>';
            html+='<td>'+a[i].email+'</td>';
            html+='<td>'+a[i].orgName+'</td>';
            html+='<td>'+a[i].createTime+'</td>';
            html+='<td>'
            html+="<span class='btn btn-sm btn-danger delBtn fa fa-trash-o hoverBtn' name='删除' btnType='remove'></span> "
            html+="<span class='btn btn-sm btn-warning editBtn fa fa-edit hoverBtn' name='编辑' btnType='edit'></span> "
            html+="<span class='btn btn-sm btn-info detailBtn fa fa-tags hoverBtn' name='详情' btnType='list'></span> "
            html+='</td></tr>';
            html+=y;

        };
        html+='';
        return html;
    },

    getDomMenuTableTree:function(a){
        if(!a){return ''}
        var html='';
        var str=''; 
        var ii=1;
        for(var i=0;i<a.length;i++){
            var y=this.getDomMenuTableTree(this.groups[a[i].menuId]);
            if(y!='' )str+=('0_'+ii);
            var menuType='',btn='',tr;
            if(a[i].menuType=='M'){
                menuType='<span class="label label-success">目录</span>';
                btn='<span class="treetable-expander glyphicon glyphicon-chevron-down fa"></span>';
                tr='<tr>';
            }else if(a[i].menuType=='C'){
                menuType='<span class="label label-primary">菜单</span>';
                btn='<span class="treetable-indent"></span><span class="treetable-expander glyphicon glyphicon-chevron-down fa"></span>';
                tr='<tr style="display:none">';
            }else if(a[i].menuType=='F'){
                menuType='<span class="label label-warning">按钮</span>'
                tr='<tr style="display:none">';
                btn='<span class="treetable-indent"></span><span class="treetable-indent"></span><span class="treetable-indent"></span>';
            }else if(a[i].menuType=='C' && a[i].menuName == '日志管理'){
                tr='<tr style="display:none">';
                btn='<span class="treetable-indent"><span class="treetable-indent"></span><span class="treetable-expander glyphicon glyphicon-chevron-down fa"></span>';
            }
            html+='<tr _id="'+str+'">';
            html+='<td style="text-align:left">'
            html+=btn
            html+='<i class="'+a[i].icon+'"></i>'+a[i].menuName+'</td>';
            html+='<td>'+a[i].orderNum+'</td>';
            html+='<td>'+a[i].url+'</td>';;
            html+='<td>'+menuType+'</td>';
            html+='<td>'
            +(a[i].visible == '0' ? '<span class="badge badge-primary">显示</span>' : '<span class="badge badge-danger">隐藏</span>') 
            +'</td>';
            html+='<td>'
            html+="<span class='btn btn-sm btn-danger delBtn fa fa-trash-o hoverBtn' name='删除' btnType='remove'></span> "
            html+="<span class='btn btn-sm btn-warning editBtn fa fa-edit hoverBtn' name='编辑' btnType='edit'></span> "
            html+="<span class='btn btn-sm btn-info detailBtn fa fa-tags hoverBtn' name='详情' btnType='list'></span> "
            html+='</td></tr>';
            html+=y;

        };
        html+='';
        return html;
    },

    getDomMenuTree:function(a){
        if(!a){return ''}
        var html='\n<ul>\n';
        for(var i=0;i<a.length;i++){
            html+='<li><a class="treeA" href="javascript:;" _id='+a[i].id+'>'
            +'<s class="treeCheck"></s>'
            +'<em>'+(a[i]['menuName_'+lang.getLang()] !== 'null' ? a[i]['menuName_'+lang.getLang()] : '-')+'</em>'
            // +'<i class="urlI">'+a[i].url+'</i></a>';
            +'</a>',
            html+=this.getDomMenuTree(this.groups[a[i].id]);
            html+='</li>\n';
        };
        html+='</ul>\n';
        return html;
    },
};



(function($){
    $.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");
        this.find("> li").each(function() {
            e = $(this);
            var subtree = e.find('> ul');
            var button = e.find('span').eq(0).addClass('toggler');

            if( button.length == 0) {
                var button = $('<span>');
                button.addClass('toggler');
                e.prepend(button);
            } else {
                button.addClass('toggler');
            }

            if(subtree.length > 0) {
                subtree.hide();

                e.addClass('tree-closed');

                e.find(button).click(function() {
                    var li = $(this).parent('li');
                    li.find('> ul').slideToggle(options.delay);
                    li.toggleClass('tree-opened');
                    li.toggleClass('tree-closed');
                    li.toggleClass(options.activeSelector);
                });

                $(this).find('> ul').treemenu(options);
            } else {
                $(this).addClass('tree-empty');
            }
        });

        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
})(jQuery);



/**
 * bootstrapTreeTable
 *
 * @author swifly
 */
(function($) {
    "use strict";

    $.fn.bootstrapTreeTable = function(options, param) {
        var allData = null;//用于存放格式化后的数据
        // 如果是调用方法
        if (typeof options == 'string') {
            return $.fn.bootstrapTreeTable.methods[options](this, param);
        }
        // 如果是初始化组件
        options = $.extend({}, $.fn.bootstrapTreeTable.defaults, options || {});
        // 是否有radio或checkbox
        var hasSelectItem = false;
        var target = $(this);
        // 在外层包装一下div，样式用的bootstrap-table的
        var _main_div = $("<div class='bootstrap-tree-table fixed-table-container'></div>");
        target.before(_main_div);
        _main_div.append(target);
        target.addClass("table table-hover treetable-table");
        if (options.striped) {
            target.addClass('table-striped');
        }
        // 工具条在外层包装一下div，样式用的bootstrap-table的
        if(options.toolbar){
            var _tool_div = $("<div class='fixed-table-toolbar'></div>");
            var _tool_left_div = $("<div class='bs-bars pull-left'></div>");
            _tool_left_div.append($(options.toolbar));
            _tool_div.append(_tool_left_div);
            _main_div.before(_tool_div);
        }
        // 格式化数据，优化性能
        target.formatData=function(data){
            var _root = options.rootCodeValue?options.rootCodeValue:null
            $.each(data, function(index, item) {
                // 添加一个默认属性，用来判断当前节点有没有被显示
                item.isShow = false;
                // 这里兼容几种常见Root节点写法
                // 默认的几种判断
                var _defaultRootFlag = item[options.parentCode] == '0'
                    || item[options.parentCode] == 0
                    || item[options.parentCode] == null
                    || item[options.parentCode] == '';
                if (!item[options.parentCode] || (_root?(item[options.parentCode] == options.rootCodeValue):_defaultRootFlag)){
                    if(!allData["_root_"]){allData["_root_"]=[];}
                    allData["_root_"].push(item);
                }else{
                    if(!allData["_n_"+item[options.parentCode]]){allData["_n_"+item[options.parentCode]]=[];}
                    allData["_n_"+item[options.parentCode]].push(item);
                }
            });
            data=null;//回收
        }
        // 得到根节点
        target.getRootNodes = function() {
            return allData["_root_"];
        };
        // 递归获取子节点并且设置子节点
        target.handleNode = function(parentNode, lv, row_id, p_id, tbody) {
            var _ls = allData["_n_"+parentNode[options.code]];
            var tr = target.renderRow(parentNode,_ls?true:false,lv,row_id,p_id);
            tbody.append(tr);
            if(_ls){
                $.each(_ls, function(i, item) {
                    var _row_id = row_id+"_"+i
                    target.handleNode(item, (lv + 1), _row_id,row_id, tbody)
                });
            }
        }; 
        // 绘制行
        target.renderRow = function(item,isP,lv,row_id,p_id){
            // 标记已显示
            item.isShow = true;
            var tr = $('<tr id="'+(row_id?row_id:'')+'" pid="'+(p_id?p_id:'')+'"></tr>');
            var _icon = options.expanderCollapsedClass;
            if(options.expandAll){
                tr.show()
                _icon = options.expanderExpandedClass;
            }else if(options.expandFirst&&lv<=1){
                tr.show()
                _icon=(lv==0)?options.expanderExpandedClass:options.expanderCollapsedClass;
            }else{
                tr.css("display","none");
                _icon = options.expanderCollapsedClass;
            }
            $.each(options.columns, function(index, column) {
                // 判断有没有选择列
                if(column.field=='selectItem'){
                    hasSelectItem = true;
                    var td = $('<td style="text-align:center;width:36px"></td>');
                    if(column.radio){
                        var _ipt = $('<input name="select_item" type="radio" value="'+item[options.id]+'"></input>');
                        td.append(_ipt);
                    } 
                    if(column.checkbox){
                        var _ipt = $('<input name="select_item" type="checkbox" value="'+item[options.id]+'"></input>');
                        td.append(_ipt);
                    } 
                    tr.append(td);
                }else{
                    var td = $('<td title="'+item[column.field]+'" name="'+column.field+'" style="text-align:'+column.align+';'+((column.width)?('width:'+column.width):'')+'"></td>');
                    // 增加formatter渲染
                    if (column.formatter) {
                        td = $('<td style="text-align:'+(column.align?column.align:'')+';'+((column.width)?('width:'+column.width):'')+'"></td>');
                        td.html(column.formatter.call(this, item[column.field], item, index));
                    } else {
                        td.text(item[column.field]);
                    }
                    if(options.expandColumn==index){
                        if(!isP){
                            td.prepend('<span class="treetable-expander"></span>')
                        }else{
                            td.prepend('<span class="treetable-expander '+_icon+'"></span>')
                        }
                        for (var int = 0; int < (lv-1); int++) {
                            td.prepend('<span class="treetable-indent"></span>')
                        }
                    }
                    tr.append(td);
                }
            });
            return tr;
        }
        // 加载数据
        target.load = function(parms){
            // 加载数据前先清空
            allData = {};
            // 加载数据前先清空
            target.html("");
            // 构造表头
            var thr = $('<tr></tr>');
            $.each(options.columns, function(i, item) {
                var th = null;
                // 判断有没有选择列
                if(i==0 && item.field=='selectItem'){
                    hasSelectItem = true;
                    th = $('<th style="width:36px"></th>');
                }else{
                    th = $('<th style="'+((item.width)?('width:'+item.width):'')+'"></th>');
                }
                th.text(item.title);
                thr.append(th);
            });
            var thead = $('<thead class="treetable-thead"></thead>');
            thead.append(thr);
            target.append(thead);
            // 构造表体
            var tbody = $('<tbody class="treetable-tbody"></tbody>');
            target.append(tbody);
            // 添加加载loading
            var _loading = '<tr><td colspan="'+options.columns.length+'"><div style="display: block;text-align: center;">'+lang.getData('loading')+'</div></td></tr>'
            tbody.html(_loading);
            // 默认高度
            if(options.height){
                tbody.css("height",options.height);
            }

            $.zAjax({
                isString:false,
                type : options.type,
                url : options.url,
                data : parms?parms:options.ajaxParams,
                dataType : "JSON",
                success: function(data) {
                    // 加载完数据先清空
                    tbody.html("");
                    if(!data||data.length<=0){
                        var _empty = '<tr><td colspan="'+options.columns.length+'"><div style="display: block;text-align: center;">'+lang.getData('noData')+'</div></td></tr>'
                        tbody.html(_empty);
                        return;
                    }
                    // 格式化数据
                    target.formatData(data);
                    // 开始绘制
                    var rootNode = target.getRootNodes();
                    if(rootNode){
                        $.each(rootNode, function(i, item) {
                            var _row_id = "row_id_"+i
                            target.handleNode(item, 1, _row_id,"row_root", tbody);
                        });
                    }
                    // 下边的操作主要是为了查询时让一些没有根节点的节点显示
                    $.each(data, function(i, item) {
                        if(!item.isShow){
                            var tr = target.renderRow(item,false,1);
                            tbody.append(tr);
                        }
                    });
                    target.append(tbody);
                    //动态设置表头宽度
                    thead.css("width", tbody.children(":first").css("width"));
                    // 行点击选中事件
                    target.find("tbody").find("tr").click(function(){
                        if(hasSelectItem){
                            var _ipt = $(this).find("input[name='select_item']");
                            if(_ipt.attr("type")=="radio"){
                                _ipt.prop('checked',true);
                                target.find("tbody").find("tr").removeClass("treetable-selected");
                                $(this).addClass("treetable-selected");
                            }else{
                                if(_ipt.prop('checked')){
                                    _ipt.prop('checked',false);
                                    $(this).removeClass("treetable-selected");
                                }else{
                                    _ipt.prop('checked',true);
                                    $(this).addClass("treetable-selected");
                                }
                            }
                        }
                    });
                    // 小图标点击事件--展开缩起
                    target.find("tbody").find("tr").find(".treetable-expander").click(function(){
                        var _flag = $(this).hasClass(options.expanderExpandedClass);
                        var tr = $(this).parent().parent();
                        var row_id = tr.attr("id");
                        if(_flag){
                            var _ls = target.find("tbody").find("tr[id^='"+row_id+"_']");//下所有
                            if(_ls&&_ls.length>0){
                                $.each(_ls, function(index, item) {
                                    $(item).css("display","none");
                                    var _icon = $(item).children().eq(options.expandColumn).find(".treetable-expander");
                                    if(_icon.hasClass(options.expanderExpandedClass)){
                                        _icon.removeClass(options.expanderExpandedClass)
                                        _icon.addClass(options.expanderCollapsedClass)
                                    }
                                });
                            }
                            $(this).removeClass(options.expanderExpandedClass)
                            $(this).addClass(options.expanderCollapsedClass)
                        }else{
                            var _ls = target.find("tbody").find("tr[pid='"+row_id+"']");//下一级
                            if(_ls&&_ls.length>0){
                                $.each(_ls, function(index, item) {
                                    $(item).show()
                                });
                            }
                            $(this).removeClass(options.expanderCollapsedClass)
                            $(this).addClass(options.expanderExpandedClass)
                        }

                        
                    });

                    $.btnPermissions();

                }
            });

           
        }
        if (options.url) {
            target.load();
        } else {
            // 也可以通过defaults里面的data属性通过传递一个数据集合进来对组件进行初始化....有兴趣可以自己实现，思路和上述类似
        }
        
        return target;
    };

    // 组件方法封装........
    $.fn.bootstrapTreeTable.methods = {
        // 返回选中记录的id（返回的id由配置中的id属性指定）
        // 为了兼容bootstrap-table的写法，统一返回数组，这里只返回了指定的id
        getSelections : function(target, data) {
            // 所有被选中的记录input
            var _ipt = target.find("tbody").find("tr").find("input[name='select_item']:checked");
            var chk_value =[]; 
            // 如果是radio
            if(_ipt.attr("type")=="radio"){
                var _data = {id:_ipt.val()};
                var _tds = _ipt.parent().parent().find("td");
                _tds.each(function(_i,_item){ 
                    if(_i!=0){
                        _data[$(_item).attr("name")]=$(_item).attr("title");
                    }
                }); 
                chk_value.push(_data); 
            }else{
                _ipt.each(function(_i,_item){ 
                    var _data = {id:$(_item).val()};
                    var _tds = $(_item).parent().parent().find("td");
                    _tds.each(function(_ii,_iitem){ 
                        if(_ii!=0){
                            _data[$(_iitem).attr("name")]=$(_iitem).attr("title");
                        }
                    }); 
                    chk_value.push(_data); 
                }); 
            }
            return chk_value;
        },
        // 刷新记录
        refresh : function(target, parms) {
            if(parms){
                target.load(parms);
            }else{
                target.load();
            }
        },
        // 组件的其他方法也可以进行类似封装........
    };

    $.fn.bootstrapTreeTable.defaults = {
        id : 'id',// 选取记录返回的值
        code : 'id',// 用于设置父子关系
        parentCode : 'parentId',// 用于设置父子关系
        rootCodeValue: null,//设置根节点code值----可指定根节点，默认为null,"",0,"0"
        data : [], // 构造table的数据集合
        type : "GET", // 请求数据的ajax类型
        url : null, // 请求数据的ajax的url
        ajaxParams : {}, // 请求数据的ajax的data属性
        expandColumn : 0,// 在哪一列上面显示展开按钮
        expandAll : false, // 是否全部展开
        expandFirst : true, // 是否默认第一级展开--expandAll为false时生效
        striped : false, // 是否各行渐变色
        columns : [],
        toolbar: '#toolbar',//顶部工具条
        height: 0,
        expanderExpandedClass : 'glyphicon glyphicon-chevron-down',// 展开的按钮的图标
        expanderCollapsedClass : 'glyphicon glyphicon-chevron-right'// 缩起的按钮的图标

    };
})(jQuery);



/*!
 *   ruoyi.js
 *   Author: Ruoyi
 */
(function($) {
    $.extend({
        table: {
            _option: {},
            _params: {},
            init: function(options) {
                $.table._option = options;
                $.table._params = $.common.isEmpty(options.queryParams) ? $.table.queryParams : options.queryParams;
                _sortOrder = $.common.isEmpty(options.sortOrder) ? "asc" : options.sortOrder;
                _sortName = $.common.isEmpty(options.sortName) ? "" : options.sortName;
                $("#bootstrap-table").bootstrapTable({
                    url: options.url,
                    contentType: "application/x-www-form-urlencoded",
                    method: "post",
                    cache: false,
                    sortable: true,
                    sortStable: true,
                    sortName: _sortName,
                    sortOrder: _sortOrder,
                    pagination: $.common.visible(options.pagination),
                    pageNumber: 1,
                    pageSize: 10,
                    pageList: [10, 25, 50],
                    iconSize: "outline",
                    toolbar: "#toolbar",
                    sidePagination: "server",
                    search: $.common.visible(options.search),
                    showRefresh: $.common.visible(options.showRefresh),
                    showColumns: $.common.visible(options.showColumns),
                    showToggle: $.common.visible(options.showToggle),
                    showExport: $.common.visible(options.showExport),
                    queryParams: $.table._params,
                    columns: options.columns,
                    responseHandler: $.table.responseHandler
                })
            },
            queryParams: function(params) {
                return {
                    pageSize: params.limit,
                    pageNum: params.offset / params.limit + 1,
                    searchValue: params.search,
                    orderByColumn: params.sort,
                    isAsc: params.order
                }
            },
            responseHandler: function(res) {
                if (res.code == 0) {
                    return {
                        rows: res.rows,
                        total: res.total
                    }
                } else {
                    $.modal.alertWarning(res.msg);
                    return {
                        rows: [],
                        total: 0
                    }
                }
            },
            search: function(formId) {
                var currentId = $.common.isEmpty(formId) ? $("form").attr("id") : formId;
                var params = $("#bootstrap-table").bootstrapTable("getOptions");
                params.queryParams = function(params) {
                    var search = {};
                    $.each($("#" + currentId).serializeArray(), function(i, field) {
                        search[field.name] = field.value
                    });
                    search.pageSize = params.limit;
                    search.pageNum = params.offset / params.limit + 1;
                    search.searchValue = params.search;
                    search.orderByColumn = params.sort;
                    search.isAsc = params.order;
                    return search
                }
                ;
                $("#bootstrap-table").bootstrapTable("refresh", params)
            },
            exportExcel: function(formId) {
                var currentId = $.common.isEmpty(formId) ? $("form").attr("id") : formId;
                $.modal.loading("正在导出数据，请稍后...");
                $.post($.table._option.exportUrl, $("#" + currentId).serializeArray(), function(result) {
                    if (result.code == web_status.SUCCESS) {
                        window.location.href = ctx + "common/download?fileName=" + result.msg + "&delete=" + true
                    } else {
                        $.modal.alertError(result.msg)
                    }
                    $.modal.closeLoading()
                })
            },
            refresh: function() {
                $("#bootstrap-table").bootstrapTable("refresh", {
                    url: $.table._option.url,
                    silent: true
                })
            },
            selectColumns: function(column) {
                return $.map($("#bootstrap-table").bootstrapTable("getSelections"), function(row) {
                    return row[column]
                })
            },
            selectFirstColumns: function() {
                return $.map($("#bootstrap-table").bootstrapTable("getSelections"), function(row) {
                    return row[$.table._option.columns[1].field]
                })
            },
            selectDictLabel: function(_datas, _value) {
                var actions = [];
                $.each(_datas, function(index, dict) {
                    if (dict.dictValue == _value) {
                        actions.push("<span class='badge badge-" + dict.listClass + "'>" + dict.dictLabel + "</span>");
                        return false
                    }
                });
                return actions.join("")
            }
        },
        treeTable: {
            _option: {},
            _treeTable: {},
            init: function(options) {
                $.table._option = options;
                var treeTable = $("#bootstrap-table").bootstrapTreeTable({
                    code: options.id,
                    parentCode: options.parentId,
                    type: "get",
                    url: options.url,
                    ajaxParams: {},
                    expandColumn: "0",
                    striped: false,
                    bordered: true,
                    expandAll: $.common.visible(options.expandAll),
                    columns: options.columns
                });
                $.treeTable._treeTable = treeTable
            },
            search: function(formId) {
                var currentId = $.common.isEmpty(formId) ? $("form").attr("id") : formId;
                var params = {};
                $.each($("#" + currentId).serializeArray(), function(i, field) {
                    params[field.name] = field.value
                });
                $.treeTable._treeTable.bootstrapTreeTable("refresh", params)
            },
            refresh: function() {
                $.treeTable._treeTable.bootstrapTreeTable("refresh")
            },
        },
        form: {
            selectCheckeds: function(name) {
                var checkeds = "";
                $('input:checkbox[name="' + name + '"]:checked').each(function(i) {
                    if (0 == i) {
                        checkeds = $(this).val()
                    } else {
                        checkeds += ("," + $(this).val())
                    }
                });
                return checkeds
            },
            selectSelects: function(name) {
                var selects = "";
                $("#" + name + " option:selected").each(function(i) {
                    if (0 == i) {
                        selects = $(this).val()
                    } else {
                        selects += ("," + $(this).val())
                    }
                });
                return selects
            }
        },
        modal: {
            icon: function(type) {
                var icon = "";
                if (type == modal_status.WARNING) {
                    icon = 0
                } else {
                    if (type == modal_status.SUCCESS) {
                        icon = 1
                    } else {
                        if (type == modal_status.FAIL) {
                            icon = 2
                        } else {
                            icon = 3
                        }
                    }
                }
                return icon
            },
            msg: function(content, type) {
                if (type != undefined) {
                    layer.msg(content, {
                        icon: $.modal.icon(type),
                        time: 1000,
                        shift: 5
                    })
                } else {
                    layer.msg(content)
                }
            },
            msgError: function(content) {
                $.modal.msg(content, modal_status.FAIL)
            },
            msgSuccess: function(content) {
                $.modal.msg(content, modal_status.SUCCESS)
            },
            msgWarning: function(content) {
                $.modal.msg(content, modal_status.WARNING)
            },
            alert: function(content, type) {
                layer.alert(content, {
                    icon: $.modal.icon(type),
                    title: "系统提示",
                    btn: ["确认"],
                    btnclass: ["btn btn-primary"],
                })
            },
            msgReload: function(msg, type) {
                layer.msg(msg, {
                    icon: $.modal.icon(type),
                    time: 500,
                    shade: [0.1, "#8F8F8F"]
                }, function() {
                    $.modal.reload()
                })
            },
            alertError: function(content) {
                $.modal.alert(content, modal_status.FAIL)
            },
            alertSuccess: function(content) {
                $.modal.alert(content, modal_status.SUCCESS)
            },
            alertWarning: function(content) {
                $.modal.alert(content, modal_status.WARNING)
            },
            close: function() {
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index)
            },
            confirm: function(content, callBack) {
                layer.confirm(content, {
                    icon: 3,
                    title: "系统提示",
                    btn: ["确认", "取消"],
                    btnclass: ["btn btn-primary", "btn btn-danger"],
                }, function(index) {
                    layer.close(index);
                    callBack(true)
                })
            },
            open: function(title, url, width, height) {
                if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
                    width = "auto";
                    height = "auto"
                }
                if ($.common.isEmpty(title)) {
                    title = false
                }
                if ($.common.isEmpty(url)) {
                    url = "404.html"
                }
                if ($.common.isEmpty(width)) {
                    width = 800
                }
                if ($.common.isEmpty(height)) {
                    height = ($(window).height() - 50)
                }
                layer.open({
                    type: 2,
                    area: [width + "px", height + "px"],
                    fix: false,
                    maxmin: true,
                    shade: 0.3,
                    title: title,
                    content: url
                })
            },
            openFull: function(title, url, width, height) {
                if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
                    width = "auto";
                    height = "auto"
                }
                if ($.common.isEmpty(title)) {
                    title = false
                }
                if ($.common.isEmpty(url)) {
                    url = "404.html"
                }
                if ($.common.isEmpty(width)) {
                    width = 800
                }
                if ($.common.isEmpty(height)) {
                    height = ($(window).height() - 50)
                }
                var index = layer.open({
                    type: 2,
                    area: [width + "px", height + "px"],
                    fix: false,
                    maxmin: true,
                    shade: 0.3,
                    title: title,
                    content: url
                });
                layer.full(index)
            },
            loading: function(message) {
                $.blockUI({
                    message: '<div class="loaderbox"><div class="loading-activity"></div> ' + message + "</div>"
                })
            },
            closeLoading: function() {
                setTimeout(function() {
                    $.unblockUI()
                }, 50)
            },
            reload: function() {
                parent.location.reload()
            }
        },
        operate: {
            submit: function(url, type, dataType, data) {
                $.modal.loading("正在处理中，请稍后...");
                var config = {
                    url: url,
                    type: type,
                    dataType: dataType,
                    data: data,
                    success: function(result) {
                        $.operate.ajaxSuccess(result)
                    }
                };
                $.ajax(config)
            },
            post: function(url, data) {
                $.operate.submit(url, "post", "json", data)
            },
            remove: function(id) {
                $.modal.confirm("确定删除该条" + $.table._option.modalName + "信息吗？", function() {
                    var url = $.common.isEmpty(id) ? $.table._option.removeUrl : $.table._option.removeUrl.replace("{id}", id);
                    var data = {
                        "ids": id
                    };
                    $.operate.submit(url, "post", "json", data)
                })
            },
            batRemove: function() {
                var rows = $.common.isEmpty($.table._option.id) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.id);
                if (rows.length == 0) {
                    $.modal.alertWarning("请至少选择一条记录");
                    return
                }
                $.modal.confirm("确认要删除选中的" + rows.length + "条数据吗?", function() {
                    var url = $.table._option.removeUrl;
                    var data = {
                        "ids": rows.join()
                    };
                    $.operate.submit(url, "post", "json", data)
                })
            },
            add: function(id) {
                var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
                $.modal.open("添加" + $.table._option.modalName, url)
            },
            edit: function(id) {
                var url = $.table._option.updateUrl.replace("{id}", id);
                $.modal.open("修改" + $.table._option.modalName, url)
            },
            addFull: function(id) {
                var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
                $.modal.openFull("添加" + $.table._option.modalName, url)
            },
            editFull: function(id) {
                var url = $.table._option.updateUrl.replace("{id}", id);
                $.modal.openFull("修改" + $.table._option.modalName, url)
            },
            save: function(url, data) {
                $.modal.loading("正在处理中，请稍后...");
                var config = {
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: data,
                    success: function(result) {
                        $.operate.saveSuccess(result)
                    }
                };
                $.ajax(config)
            },
            ajaxSuccess: function(result) {
                if (result.code == web_status.SUCCESS) {
                    $.modal.msgSuccess(result.msg);
                    $.table.refresh()
                } else {
                    $.modal.alertError(result.msg)
                }
                $.modal.closeLoading()
            },
            saveSuccess: function(result) {
                if (result.code == web_status.SUCCESS) {
                    $.modal.msgReload("保存成功,正在刷新数据请稍后……", modal_status.SUCCESS)
                } else {
                    $.modal.alertError(result.msg)
                }
                $.modal.closeLoading()
            }
        },
        common: {
            isEmpty: function(value) {
                if (value == null || this.trim(value) == "") {
                    return true
                }
                return false
            },
            visible: function(value) {
                if ($.common.isEmpty(value) || value == true) {
                    return true
                }
                return false
            },
            trim: function(value) {
                if (value == null) {
                    return ""
                }
                return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "")
            },
            random: function(min, max) {
                return Math.floor((Math.random() * max) + min)
            }
        }
    })
}
)(jQuery);
web_status = {
    SUCCESS: 0,
    FAIL: 500
};
modal_status = {
    SUCCESS: "success",
    FAIL: "error",
    WARNING: "warning"
};
