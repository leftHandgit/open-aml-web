//回显皮肤
var skin=$.cookie('skin');
if(skin){
  $('body').removeClass().addClass(skin.split(',')[0]+' app');
  $('#skin li').eq(skin.split(',')[1]).addClass('active').siblings().removeClass('active');
}

//选择皮肤的操作
$('#skin li').click(function(){
  $(this).addClass('active').siblings().removeClass('active');
  var i=$(this).index();
  var arr=['theme-zero','theme-one','theme-two','theme-three','theme-four'];
  $('body').removeClass().addClass(arr[i]+' app');
  $.cookie('skin',arr[i]+','+i);
});


//在菜单收起的时候，鼠标移入的效果
$('#menuList>.nav-list>li').hover(function(){
  var _slef=$(this).closest('#menuList');
  if(_slef.hasClass('add')){
    $('.inner-drop').hide();
    $(this).find('.inner-drop').fadeIn();
  }
},function(){
  $('.inner-drop').hide();
});



//操作按钮在鼠标移入的时候展示提示文字
$(document).on('mouseover','.hoverBtn',function() {
  var _slef=this;
  // var language=lang.getLang();
  project.trigger=setTimeout(function() {
      // var name=$(_slef).attr('name');
      var name=$(_slef).attr('btnType');
      project.layerEle=layer.tips( lang.getData(name) , _slef , { tips: [1, par_color.gray] , time:5000});
      // project.layerEle=layer.tips(globalData['name'][lang.getLang()] + lang.getData(name) , _slef , { tips: [1, par_color.gray] , time:5000});
  },200); 
});

$(document).on('mouseout','.hoverBtn',function() {
  clearTimeout(project.trigger); //清除将要在1秒后执行的弹出框动作
  layer.close(project.layerEle);
});


//input失去焦点时候，所做的验证

var NoTipsValidate=function(){
  $('body').off().on('blur','input.field',function() {
    $(this).closest('div').find('.errMsgSpan').remove();
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
  });
}

if(sessionStorage.getItem('NoTips')){
  NoTipsValidate();
}



//菜单的点击效果
$('.nav-list>li').on('click','a',function (event) {
  $('.control-sidebar').css({'right':'-233px'});
  event.stopPropagation();
  var type=$(this).attr('type');
  var name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  if(type == 'C'){
      var url=$(this).attr('url');
      $('a[type="C"]').removeClass('active');
      $(this).addClass('active');
      sessionStorage.setItem('changeHash',true);
      if(name.test(url)){
        var arr=['zoomIn','zoomInDown','fadeInDown','fadeInUpBig','zoomInLeft'];
        var a=arr[ Math.floor(Math.random()*arr.length)];
        
        $('#main').html('<iframe id="mainIframe"></iframe>');
        $('#mainIframe').attr('src',url).removeClass().addClass(a + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass();
              if($('aside').width() == 60){
                $(this).addClass('add');
              }
        });
        return;
      }
      sessionStorage.setItem('url',url);
      location.hash='#'+url
      return;
  }
  $(this).siblings('ul').slideToggle();
  $(this).parent().toggleClass('open');
  $(this).parent().siblings().find('ul').slideUp();
  $(this).parent().siblings().removeClass('open');
  
});


//向上箭头的滚动
$('#btn-scroll-up').click(function(){
  $('body,html,#main,#tablebox').animate({'scrollTop':0},700);
});


//用户详情（点击头像）的展开和收起
$('.dropdown').click(function(){
  $('.dropdown').toggleClass('open');
});

// $('[ajaxPage]').click(function(){
//   var a=$(this).attr('ajaxPage');
//   console.log(a)
//   location.hash='#/'+a
//   // ajaxGetContent(a,this);
// });




//点击空白处隐藏搜索的菜单和用户详情
$(document).click(function(e){
  e.stopPropagation();
  var _con = $('.dropdown');   // 设置目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0){
    $('.dropdown').removeClass('open')
  }

  var _con1 = $('#site-search .menuresult');
  if(!_con1.is(e.target) && _con1.has(e.target).length === 0){
    $('#site-search .menuresult').hide();
  }

  var _con3 = $('#settingTab,.control-sidebar');
  if(!_con3.is(e.target) && _con3.has(e.target).length === 0){
    $('.control-sidebar').css({'right':'-233px'});
  }
  
});


//全选按钮的函数，包括选择角色
var checkAll=function(){
  var buer=true,parent=$(this).closest('.zCheckBox');

  if($(this).hasClass('zCheckAll')){

    if($(this).hasClass('zCheck')){
      parent.find('.zCBox').removeClass('zCheck');
    }else{
      parent.find('.zCBox').addClass('zCheck');
      $(this).closest('.field').next('.errMsgSpan').remove();
    }

  }else{
    $(this).closest('.field').next('.errMsgSpan').remove();
    $(this).toggleClass('zCheck');
    parent.find('.zCBox:not(".zCheckAll")').each(function(){
      if(!$(this).hasClass('zCheck')){
        buer=false;
        return false;
      } 
    });
    if(!buer){
      parent.find('.zCBox.zCheckAll').removeClass('zCheck');
    }else{
      parent.find('.zCBox.zCheckAll').addClass('zCheck');
    }

  }
}


//所有的table的按钮的全选选择
$(document).on('click','table.zCheckBox .zCBox',checkAll);


//菜单的展开和收起的函数
var menuToggle=function(){
  $('body').toggleClass('on-canvas nav-min');
  $('[type="C"]').closest('.list-unstyled').toggleClass('inner-drop');
  $('#site-nav').toggleClass('overflow');
  $('#menuList').toggleClass('add');
  $('.inner-drop').hide();
  $('.nav-list li').removeClass('open');
  $('#main').toggleClass('add');
}

//点击菜单的展开和收起
$('.nav-trigger').click(menuToggle);



//搜索菜单的事件
$('#site-search input').on('keyup',function(){
  var val=$.trim($(this).val());
  var str='';
  if(val == ''){
    $('#site-search .menuresult').hide().html('');
    return;
  }
  $('#menuList [type="C"]').each(function(){
    var value=$(this).html();
    var url=$(this).attr('url');
    if(value.indexOf(val) != -1){
      str+=('<a href="javascript:;" url="'+url+'">'+value+'</a>');
    }
    
  });
  str==''&&(str='<a  href="javascript:;">'+lang.getData('noMenu')+'</a>');

  $('#site-search .menuresult').show().html(str);
});


//点击搜索出的菜单的事件
$('#site-search .menuresult').on('click','a',function(){
  var url=$(this).attr('url');
  var name=$(this).html();
  if(!url)return;
  var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  $('#site-search .menuresult').hide();
  $('#site-search input').val(name);
  if(reg.test(url)){
    var arr=['zoomIn','zoomInDown','fadeInDown','fadeInUpBig','zoomInLeft'];
    var a=arr[ Math.floor(Math.random()*arr.length)];
    $('#main').html('<iframe id="mainIframe"></iframe>');
    $('#mainIframe').attr('src',url).removeClass().addClass(a + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
          if($('aside').width() == 60){
            $(this).addClass('add');
          }
    });
    return;
  }
  location.hash='#'+url;

});