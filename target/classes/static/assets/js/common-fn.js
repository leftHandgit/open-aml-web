

function createTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
    // body...
}

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};


function http_builder_url(url, data) {
    if(typeof(url) == 'undefined' || url == null || url == '') {
        return '';
    }
    if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for(var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
        console.log(url);
    }
    return url;
}




$.extend({
  /**
 * add by zt 2016/10/09
 * ajax get 请求url替换div content
 * @param url 请求地址
 * @param data 参数
 * @param callback 回调
 */
  zAjaxGetContent:function(url, self){
    // url=url.split('/list')[0].substr(1,url.length);
    $.ajax({
        type : "get",
        url : url+'.html',
        timeout:5000,
        dataType : "html",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        // async: false,
        // cache: false,
        success:function(returnData){
            // var arr=['swing','zoomIn','zoomInDown',
            // 'fadeInUpBig','zoomInRight','shake','bounceIn','flip',
            // ,'tada','bounceInRight','rollIn','fadeInDown'
            // ,'flipOutX','zoomInLeft','pulse','lightSpeedIn'];

            var arr=['zoomIn','zoomInDown','fadeInDown','fadeInUpBig','zoomInLeft'];

            var a=arr[ Math.floor(Math.random()*arr.length)];

            $("#main").fadeOut(200,function(){
                $(this).html(returnData).removeClass().addClass(a + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                  $(this).removeClass();
                });
            });
             
            //扩展回调函数
            if( self != null ){
                $('[ajaxPage]').removeClass('add');
                $(self).addClass('add');

            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            // 这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
            // 通常情况下textStatus和errorThown只有其中一个有值
            layer.msg("请求不到该页面，可能路径问题！");
        },
        complete: function(XMLHttpRequest, textStatus) { 
            // 请求完成后回调函数 (请求成功或失败时均调用)。参数： XMLHttpRequest 对象，成功信息字符串。
            // 调用本次AJAX请求时传递的options参数
            $('#main').fadeIn();
            layer.closeAll('loading')
        }
    });
     
  },

  // 公共按钮权限
  btnPermissions:function(){
      var btnPermissions=project.getHash();
      btnPermissions=$('[url="/'+btnPermissions+'"]').next('ul');
      var arr=[];
      btnPermissions.find('.hideBtn').each(function(){
        var data=$(this).html();
        data=JSON.parse(data);
        arr.push(data);
        var str=data.perms;
        // var str=data.perms.split(':')[2];
        $('[btnType='+str+']').css({'display':"inline-block"});
      });

      if(!sessionStorage.getItem('tableStyle')){
        $('table').addClass('table-bordered table-striped');
      }else{
        $('table').removeClass('table-bordered table-striped');
      }



      // $('[btnType]:hidden').remove();

      // btnPermissions=JSON.parse($.trim(btnPermissions));
      return(arr)
  },


  /**
   * 统一的Ajax数据接口
   * @param params
   */
  zAjax:function(params){
    var data=params.data?params.data:{};
    var isString=params?params.isString:null;
    var requestData = project.bodys(data).getH5Sign(isString);
    var index = null;
    var token;
    if(window.common_data)token=common_data.token;
    // setTimeout(()=>{index = layer.load(3, {shade: .1})},100);
    // setTimeout(function(){
    //   index = layer.load(3, {shade: .1})
    // },100);
    index = layer.load(3, {shade: .1})
    $.ajax({
      url:params.url,
      data:requestData,
      // headers:{token:token},
      headers:{Authorization:'Bearer '+token,lang:lang.getLang()},
      cache:params.cache || false,
      type:params.type || "get",
      dataType:params.dataType || "json",
      timeout:8000,
      contentType:params.isString?'application/json':undefined,
      async:(params.async === null)? true:params.async,
      success:function(data){
        $('.unifTitle').html(sessionStorage.getItem('unifTitle'));
        $('.copyright').html(sessionStorage.getItem('copyright'));
        $('.versionInfo').html(sessionStorage.getItem('versionInfo'));
        // setTimeout(()=>{layer.close(index)},400);
        setTimeout(function(){
          layer.close(index)
        },400);
        if(data.code !== null && data.code!== undefined){
          if(String(data.code) == '0'){
            params.success(data);
          }else if(String(data.code) == '110025' || String(data.code) == '110026'){
            if(project.i>0)return;
            layer.alert(lang.getData('loginFailure'),function(){
              sessionStorage.removeItem('data');
              location.href='login.html';
            });
            setTimeout(function (argument) {
              sessionStorage.removeItem('data');
              location.href='login.html';
            },5000);
            project.i++;
          }else{
            layer.alert(data.errMsg?data.errMsg:'',{title:lang.getData('errorMsg'),icon:2});
          }
        }else{
          params.success(data);
        }



        
        
      },
      error:function(jqXhr, textStatus, error){
        if(textStatus  ==  'timeout'){
          layer.closeAll();
          layer.msg(lang.getData('timeOut'),{icon:2});
          return;
        }
        // setTimeout(()=>{layer.close(index)},500);
        setTimeout(function(){
          layer.close(index)
        },500);
        layer.close(index);
        layer.msg(lang.getData('exception'))
        if(params.error && typeof params.error === "function")
          params.error(jqXhr, textStatus, error);
      }
    });
  },

  /**
   * 统一的搜索数据接口
   * @param params
   */
  zSearchFn:function(obj,ele){
    var data={};
    $(ele).each(function(){
      data[$(this).attr('name')]=$(this).val();
    });
    return $.extend(obj,data);
  },

  /**
   * 统一的重置数据接口
   * @param params
   */
  zResetFn:function(obj,ele){
    var data=obj;
    $(ele).each(function(){
      $(ele).val('');
      data[$(this).attr('name')]=undefined;
    });
    return data;
  },

    /**
   * 集合新增，修改，详情的方法
   * @param title    需展示的title
   * @param slef     当前按钮本身
   * @param _id      当前数据id
   * @param ele      需要验证以及回显数据的表单
   * @param data     回显数据方法
   * @param params   新增，修改，详情的回调
   */
  zUpdateView:function(title,slef,_id,ele,fn,params){

    var view=function(){
      layer.close(index);
      $('.errMsgSpan').remove();
      //新增和修改有确认按钮，详情没有；
      layer.open({
          type: 1,                    //  页面层
          title:[title] ,           //  不显示标题栏
          area: ['auto', 'auto'],    //  设置宽高
          shade: 0.6,                  //  遮罩
          time: 0,                    //  关闭自动关闭
          shadeClose: false,          //  遮罩控制关闭层
          closeBtn: 2,            //  不显示关闭按钮
          shift: sessionStorage.getItem('cancelAnimation')? 7 : Math.floor(Math.random()*6+1), 
          content: $(ele),  //  加载主体内容
          btn: btn,    //按钮
          btn1:function(index){
              var data=sessionStorage.getItem('NoTips')?$.zValidate1(ele):$.zValidate(ele);
              //如果验证通过的话，发送新增或者修改的接口
              if(data){
                  //通过ID,判断是新增接口还是修改接口;
                  if(_id === undefined){
                      if(params.add && typeof params.add === "function"){
                          params.add(data);
                      }
                  }else{
                      if(params.edit && typeof params.edit === "function"){
                          params.edit(data);
                      }
                  }
              }
          }
      });

    }
    var btn=[lang.getData('confirm')],data;

    var index = layer.load(0, {shade: .1});
    if(fn && typeof fn === "function"){
        fn(_id,ele,view,slef);
    }

    $('.maskSpan,.maskS').remove();
    $('.common_details').hide();
    $('.Required').removeClass('requiredNone')
    $('.fieldReadOnly').removeAttr('disabled');
    //如果是详情
    if($(slef).hasClass('detailBtn')){
        btn=[];
        $('#dataView .field,#dataViewRe .field').attr('disabled','disabled');
        if(params.detail && typeof params.detail === "function"){
            params.detail();
        }
        $('.common_status,.common_details').show();
        $('#dataView .field,#dataViewRe .field').each(function(argument) {
          if($(this).attr('type') == 'specialInput'){
            $(this).after('<span class="maskSpan"></span>');
          }

          if($(this)[0].tagName == 'SELECT'){
            $(this).after('<s class="maskS"></s>');
          }
        });
        $('.Required').addClass('requiredNone')
    }else if($(slef).hasClass('editBtn')){
      $('.common_status').show();
      $('#dataView .field,#dataViewRe .field').removeAttr('disabled');
      $('.fieldReadOnly').attr('disabled','disabled');

    }else if($(slef).hasClass('globalData-add') || $(slef).hasClass('globalData-addRe')){
      $('.common_status').hide();
      $('#dataView .field,#dataViewRe .field').removeAttr('disabled');

    }
  },

  zBatchOperation:function(ele,_id,index){

    var arr=[];
    var arr1=[];
    var str='';
    var str1='';

    if(ele == '#menuTree'){
      $(ele).find('a.treeA').each(function(){
        if($(this).hasClass('active')){
          arr.push($(this).attr('_id'));
        }
      });
      return arr.join(',');
    }

    $(ele).find('.zCBox:not(".zCheckAll")').each(function(){
      if(_id == 'roleId'){
        if($(this).hasClass('zCheck'))arr.push($(this).attr('roleId'));
      }
      if(_id == 'id'){
        if($(this).hasClass('zCheck')){
          arr.push($(this).closest('tr').attr('_id'));
          arr1.push($(this).closest('tr').find('td').eq(index).html());
        }
      }
    });
    arr1.forEach(function(n,i){
      str1+=((i+1)+'：'+n+'<br/>');
    });
    return {str:arr.join(','),str1:str1,len:arr1.length}
  },

  //新增和修改时候的验证函数，将返回数据，如果验证通过，返回数据对象，否则返回false
  zValidate1:function(ele){
    var buer={};
    $('.errMsgSpan').remove();
    $(ele).find('.field:visible').each(function(i,n){
      var label=$(this).parent("div").prev('label');
      var labelName=$.trim(label.html()).split('：')[0];
      var name=$(this).attr('name');
      var _for=$(this).attr('for');
      var value=$.trim($(this).val());
      var reg=$(this).data('reg');
      var regMsg=$(this).attr('regMsg');
      //如果是必填选项
      if(label.hasClass('required')){
        if(_for){
          value=$('[name="for-'+name+'"]').val();
        }
        if(name == 'roleIds'){
          value=$.zBatchOperation('#zCheck','roleId').str;
        }
        if(name == 'menuIds'){
          value=$.zBatchOperation('#menuTree');
        }
        if(value == ''){
          $(this).closest('div').append('<span class="errMsgSpan">'+labelName+lang.getData('required')+'！'+'</span>');
        }
        
      }else if(_for){
        value=$('[name="for-'+name+'"]').val();
      }
      if(reg && value!=''){
        if(!reg.test(value)){
           $(this).closest('div').append('<span class="errMsgSpan">'+regMsg+'</span>');
        }
      }
      buer[name]=value;

    });

    if($('.errMsgSpan:visible').length>0)return false;
    return buer;
  },

  //新增和修改时候的验证函数，将返回数据，如果验证通过，返回数据对象，否则返回false
  zValidate:function(ele){
    var buer={};
    $(ele).find('.field:visible').each(function(i,n){
      var label=$(this).parent("div").prev('label');
      var labelName=$.trim(label.html()).split('：')[0];
      var name=$(this).attr('name');
      var _for=$(this).attr('for');
      var value=$.trim($(this).val());
      var reg=$(this).data('reg');
      var regMsg=$(this).attr('regMsg');
      //如果是必填选项
      if(label.hasClass('required')){
        if(_for){
          value=$('[name="for-'+name+'"]').val();
        }
        if(name == 'roleIds'){
          value=$.zBatchOperation('#zCheck','roleId').str;
        }
        if(name == 'menuIds'){
          value=$.zBatchOperation('#menuTree');
        }
        if(value == ''){
          layer.tips(labelName+lang.getData('required')+'！',this,{ tips: [1, par_color.error] });
          buer=false;
          return false;
        }
      }else if(_for){
        value=$('[name="for-'+name+'"]').val();
      }
      if(reg && value!=''){
        if(!reg.test(value)){
          layer.tips(regMsg,this,{ tips: [1, par_color.error] });
          buer=false;
          return false;
        }
      }
      if(buer)buer[name]=value;
    });
    return buer;
  },


  
  /**
   * 格式化金额
   * @param money 金额数
   * @param keepLen 保留几位小数
   */
  zFormatMoney:function(money, keepLen)  
  {  
    if(money === null){
      return '0.00';
    }
    keepLen = keepLen > 0 && keepLen <= 20 ? keepLen : 2;  
      money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(keepLen) + "";  
      var l = money.split(".")[0].split("").reverse(),  
      r = money.split(".")[1];  
      t = "";  
      for(var i = 0; i < l.length; i ++ ){  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
      }  
      return t.split("").reverse().join("") + "." + r;  
  },



  /**
   * 分页
   * @param obj.page    分页元素
   * @param obj.url     接口
   * @param obj.tp      模板元素
   * @param obj.ele     填充数据元素
   * @param obj.data    请求参数
   * @param obj.list    请求返回数据
   */
  zPageMethod:function(obj){
    var pageNum=obj.list.pageInfo.pageNum;
    $(obj.ele).html(template(obj.tp, obj.list));
    $.btnPermissions();
    // console.log(pageNum)
    $('.zCBox.zCheckAll').removeClass('zCheck');
    $(obj.page).pagination(obj.total, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 5, //主体页数
        current_page: pageNum-1,
        callback: function (index, e) {
            index++;
            obj.data.pageNum=index;
            $.zAjax({
              url: obj.url,
              isString:false,
              data:obj.data,
              type:'get',
              success: function(data) {
                $('body,html,#main,#tablebox').animate({'scrollTop':0},700);
                var list=data;
                $(obj.ele).html(template(obj.tp, list));
                $.btnPermissions();

              }
            });
            
        },
        items_per_page: obj.data.pageSize, //每页显示
        // prev_text: "<<"+lang.getData('PerviousPage'),
        // next_text: lang.getData('NextPage')+">>"
    });
  },

  /**
   * 组装公共参数方法
   * @param money 金额数
   * @param keepLen 保留几位小数
   */
  zCompositeData:function(List,ele,isChange){
    var str=isChange?'<option value="">'+lang.getData('pleaseChoose')+'</option>':'';
    var language=lang.getLang();
    List.forEach(function(n,i){
      str+='<option value='+n.value+'>'+n.name[language]+'</option>'
    });

    $(ele).html(str);

  },

  zSpecialData:function(List,ele){
    var str='';
    var language=lang.getLang();
    List.forEach(function(n,i){
      str+='<span class="zRadioBox" value='+n.value+'>'+n.name[language]+'</span>'
    });
    $(ele).html(str).off().on('click','.zRadioBox',function(){
      $(this).addClass('active').siblings().removeClass('active');
      $(this).closest('.field').val($(this).attr('value'));
      if($(this).closest('.field').attr('name') == 'userType'){
        if($(this).attr('value') == '00'){
          $('#roleIdsP').hide();
          layer.msg(lang.getData('superAdminStr'));
        }else{
          $('#roleIdsP').show();
        }
              
      }
      $(this).closest('.field').find('.errMsgSpan').remove();

    });
  },

  zCommonReg:function(obj,ele){
    $(ele).data('reg',obj.reg);
    $(ele).attr('regMsg',obj.regMsg);
  },

  batchDel:function(url,obj,value){
    value=value?value:'#tablebox'
    var obj=$.zBatchOperation(value,'id',obj.nameIndex);
    if(obj.str == ''){
        layer.alert(lang.getData('onlyOneData'),{icon:2});
        return;
    }
    layer.confirm(
      lang.getData('sureDel') +'<br/>'+obj.str1
      // +'共'+obj.len+'条记录？'
      ,function(){
        $.zAjax({
          url: project.host()+'/v1/'+url+'/'+obj.str,
          type:'DELETE',
          isString:false,
          success: function(data) {
            layer.closeAll();
            layer.msg(lang.getData('delSuccess'),{icon:1});
            globalData.getData(globalData.data);      
          }
        });
    })
  },



  //退出登录
  loginOut:function(){
    layer.confirm(lang.getData('confirmLogOut'), {
        btn: [lang.getData('confirm'),lang.getData('cancel')] //按钮
    }, function(){
      var str=window.location.port == project.web_port
            ? project.web_ip+':'+project.web_api_port+project.default_projectName 
            :(project.default_ip+':'+project.default_port+project.default_projectName);

      $.zAjax({
        url:str +'/v1/login' ,
        dataType: "json",
        type:'DELETE',
        isString:false,
        success: function(data) {
            sessionStorage.removeItem('data');
            window.location.href='login.html'; 
        }
      });


    });
    
  },

  //修改密码
  editPwd:function(params){
    params=params?params:{};
    var layerT=$.zOpen({
        title:params.str?params.str:lang.getData('editPwd'),
        ele:'#PwdBox',
        shade:.2,
        btn: params.btn?params.btn:[lang.getData('confirm'),lang.getData('cancel')],
        callback:function(){
          var oldpwd = $.trim($("#oldPasswd").val());
          var newpwd = $.trim($("#newPasswd").val());
          var newpwdRe = $.trim($("#newPasswd2").val());
          // var vcode    = $.trim($("#vcode").val());
          if (oldpwd == "" && oldpwd.length == 0) {
              layer.tips(lang.getData('pwdCanNotBeEmpty'), '#oldPasswd',{ tips: [1, '#5974d9'] });
              return;
          }

          if (!reg.password.reg.test(newpwd)) {
              layer.tips(reg.password.regMsg(), '#newPasswd',{ tips: [1, '#5974d9'] });
              return;
          }
          if (newpwd != newpwdRe) {
              layer.tips(lang.getData('twoPwdCannotBeTheSame'), '#newPasswd2',{ tips: [1, '#5974d9'] });
              return;
          }

          // oldpwd = md5(oldpwd);
          // newpwd = md5(newpwd);
          var str=window.location.port == project.web_port
            ? project.web_ip+':'+project.web_api_port+project.default_projectName 
            :(project.default_ip+':'+project.default_port+project.default_projectName);
          $.zAjax({
            url: str +'/v1/users/'+common_data.user.userId ,
            dataType: "json",
            type:'PATCH',
            isString:true,
            data:{
              oldPwd:oldpwd,
              newPwd:newpwd,
              confirmPwd:newpwd,
              type:'change'
            },
            success: function(data) {
                layer.msg(lang.getData('changePwdSuss'),{time:3000},function(){
                    location.href="login.html"
                });
            }
          });
        }
      });

  },

  zOpen:function(params){
    params=params?params:{};
    var layerT=layer.open({
        // skin: 'layui-layer-blue',
        type: 1,                    //  页面层
        title:[params.title, 'font-size:14px;'],               //  不显示标题栏
        area: ['auto', 'auto'],    //  设置宽高
        // offset: '20%',               //  设置顶部
        shade: params.shade?params.shade:0.6,                  //  遮罩
        time: 0,                    //  关闭自动关闭
        shadeClose: false,          //  遮罩控制关闭层
        closeBtn: params.closeBtn?params.closeBtn:false,            //  不显示关闭按钮
        shift: 1,                   //  出现动画
        content: $(params.ele),  //  加载主体内容
        btn: params.btn?params.btn:[lang.getData('confirm'),lang.getData('cancel')],    //按钮
        btn1:function(index){
            params.callback();
        },
        btn2:function(){
            layer.close(layerT);
        }
    })

    return layerT;
  },

  versions:function(){
    $.zAjax({
      url: project.host()+'/v1/index/versions' ,
      dataType: "json",
      type:'GET',
      isString:false,
      success: function(data) {
        var str='';
        data.forEach(function(n,i) {

          var publishContent=n.publishContent;
          publishContent=publishContent.split('\n');
          var str1='';
          publishContent.forEach(function(n,i) {
            str1+='<li>'+n+'</li>';
          });
          str+='<li class="layui-timeline-item">'
            +'<i class="layui-icon layui-timeline-axis"></i>'
            +'<div class="layui-timeline-content layui-text">'
            +'<h3 class="layui-timeline-title"><span style="font-weight: 700;margin-right: 15px;">'
            +n.versionName+'</span> &nbsp'+n.publishDate+'</h3>'
            +'<ul>'+str1+'</ul>'
            +'</div>'
            +'</li>'
        });

        $('.layui-timeline').append(str);
         
      }
    });

    $.zAjax({
      url: project.host()+'/v1/index/platforms' ,
      dataType: "json",
      type:'GET',
      isString:false,
      success: function(data) {
        $('.layui-elem-quote').html(data.content)
         
      }
    });
  },

  homePage:function(){
    location.href='#';
  },

  inputReg:function(ele,eventName,type){
    var patrn = /^.*$/;

    type=='number'&&(patrn = /^\d+$/);
    $(ele).on(eventName,function(){
      var val=$(this).val();
      if(!patrn.test(val)){
        $(this).val('');
        layer.tips(lang.getData('onlyNumber'),this,{ tips: [1, par_color.error] });
      }
    })

  },

  downFile:function(params){
    var data=params.params?params.params:$.zSearchFn({},'#searchData .field');
    var url=project.host()+'/v1/'+params.url+'/excels';
    if(url.indexOf('http') != -1){
      url=http_builder_url(url, data);
    }else{
      url=location.origin+http_builder_url(url, data);
    }
    
    $('body').append('<iframe></iframe>');
    $('iframe').attr('src',url);
    setTimeout(function(){
      $('iframe').remove();
    },2000);
  },

  fullScreen:function(_slef){
    if(!$(_slef).hasClass('fullScreen')){
      $(_slef).addClass('fullScreen');
      var el = document.documentElement;
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
      if(typeof rfs != "undefined" && rfs) {
          rfs.call(el);
      };
      return;
    }else{
      $(_slef).removeClass('fullScreen');
      $.exitfullscreen();
    }
      
  },

  exitfullscreen:function(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  },

  settingTab:function(){
    if($('.control-sidebar').css('right') == '0px'){
      $('.control-sidebar').css({'right':'-233px'});
    }else{
      $('.control-sidebar').css({'right':'0px'});
    }
  },

  toggleRightTabColor:function(){
    $('.control-sidebar').toggleClass('active');
  },

  toggleMenu:function(){
    menuToggle();
  },

  toggleRightMain:function(){
    if($('#main').css('right') == '0px'){
      $('#main').css({'right':'233px'});
    }else{
      $('#main').css({'right':'0px'});
      $('.control-sidebar').css({'right':'-233px'});
    }
  },


  isTips:function(){
    if(!$('#isTips').prop("checked")){
      sessionStorage.setItem('NoTips',true);
      $('#isTipsColor').attr('disabled','disabled');
      // $('#isTipsColor').prop("checked",false);
      NoTipsValidate();
    }else{
      sessionStorage.removeItem('NoTips');
      $('#isTipsColor').removeAttr('disabled');
      $('body').off();
    }
  },

  isTipsColor:function(_slef){
    if($('#isTipsColor').prop("checked")){
      par_color.error='#000';
    }else{
      par_color.error='#df4141';
    }

  },

  cancelAnimation:function(){
    if($('#cancelAnimation').prop("checked")){
      sessionStorage.setItem('cancelAnimation',true);
    }else{
      sessionStorage.removeItem('cancelAnimation');
    }

  },

  tableStyle:function(){
    if($('#tableStyle').prop("checked")){
      sessionStorage.setItem('tableStyle',true);
      $('table').removeClass('table-bordered table-striped');
    }else{
      sessionStorage.removeItem('tableStyle');
      $('table').addClass('table-bordered table-striped');

    }
  },

  bootstrap:function(){
    if($('#bootstrapCheckbox').prop("checked")){
      $('head').append('<link id="bootstrap" media="all" href="../assets/lib/bootstrap/bootstrap.min.css" type="text/css" rel="stylesheet">');
      sessionStorage.setItem('bootstrap',true);
      // $('#tableStyle').attr('disabled','disabled');
    }else{
      $('#bootstrap').remove();
      sessionStorage.removeItem('bootstrap');
      $('#tableStyle').removeAttr('disabled');
    }

  },


  changeLanguage:function(_slef){
    var language=$(_slef).attr('data-lang');
    sessionStorage.setItem('lang',language);
    window.location.reload();

  },

  dataLanguage:function(_slef){
    var hash=project.getHash();
    var data={};
    var language=lang.getLang();
    //如果路由无效，一般情况下是登录页
    if(!hash){

    }
    //如果路由有效
    par_menu_router.forEach(function(n,i){
      if(n.hash == hash){
        // var obj=n.lang;
        var obj=$.extend(n.lang,lang.commonData);
        for(var key in obj ){
          var str=obj[key][language];
          data[key]=str;
        }
      }
    });
    return data;
  },

});
