var lang={
    getLang:function(){
        return sessionStorage.getItem('lang')?sessionStorage.getItem('lang'):'zh_cn';
    },
    getData:function(value){
        if(!this[value]) return '';
        return this[value][this.getLang()];
    },

    //公共数据
    commonData:{
      createTime:{
          zh_cn:'创建时间',en_us:'Create Time',zh_cht:'創建時間',
      },
      operation:{
          zh_cn:'操作',en_us:'Action',zh_cht:'操作',
      },
      search:{
          zh_cn:' 搜索',en_us:' Search',zh_cht:' 搜索',
      },
      reset:{
          zh_cn:' 重置',en_us:' Reset',zh_cht:' 重置',
      },
      createBy:{
          zh_cn:'创建人',en_us:'Create By',zh_cht:'創建人',
      },
      updateTime:{
          zh_cn:'最后修改时间',en_us:'Update Time',zh_cht:'最後修改時間',
      },
      updateBy:{
          zh_cn:'最后修改人',en_us:'Update By',zh_cht:'最後修改人',
      },
      roleIds:{
          zh_cn:'角色',en_us:'Roles',zh_cht:'角色',
      },
      confirm:{
          zh_cn:'确认',en_us:' Confirm',zh_cht:'確認', 
      },
      returnBtn:{
          zh_cn:'返回',en_us:' return',zh_cht:'返回',
      },
      loading:{
          zh_cn:'数据加载中',en_us:'Loading……',zh_cht:'數據加載中',
      },
      pleaseEnter:{
          zh_cn:'请输入',en_us:'Please Enter ',zh_cht:'請輸入',
      },
      oldPwd:{
        zh_cn:'旧密码',en_us:'Old Pwd',zh_cht:'舊密碼',
      },
      newPwd:{
        zh_cn:'新密码',en_us:'New Pwd',zh_cht:'新密碼',
      },

      attention:{
        zh_cn:'注意事项',en_us:'Attention',zh_cht:'註意事項',
      },

      passwordError:{
        zh_cn:'只能输入6-20个字母+数字或下划线组合!',en_us:'You can only type 6-20 letters + numbers or underscores.',zh_cht:'只能輸入6-20個字母+數字或下劃線組合!', 
      },

      newNotOld:{
        zh_cn:'新密码不可与原密码相同',en_us:'The new password must not be the same as the original password.',zh_cht:'新密碼不可與原密碼相同',
      },

      skin:{
        zh_cn:'皮肤',en_us:'Skin',zh_cht:'皮膚',
      },

      LayoutSetting:{
        zh_cn:'布局设定',en_us:'Layout Setting',zh_cht:'布局設定',
      },

      usingBootstrapStyle:{
        zh_cn:'使用bootstrap风格',en_us:'Using Bootstrap Style',zh_cht:'使用bootstrap風格',
      },

      usingBootstrapStyleStr:{
        zh_cn:'确认后将使用bootstrap风格',en_us:'Bootstrap style will be used after confirmation.',zh_cht:'確認後將使用bootstrap風格',
      },

      simplifiedTableStyle:{
        zh_cn:'简化表格样式',en_us:'Simplified table style',zh_cht:'簡化表格樣式',
      },

      simplifiedTableStyleStr:{
        zh_cn:'确认后表格样式将简化至只有中间分割线',en_us:'After confirmation, the table style will be simplified to only the middle dividing line.',zh_cht:'確認後表格樣式將簡化至只有中間分割線',
      },

      cancelAnimation:{
        zh_cn:'取消动画效果',en_us:'Cancel animation',zh_cht:'取消动画效果',
      },

      cancelAnimationStr:{
        zh_cn:'取消后刷新页面、点击菜单和打开弹框将不再有动画效果',en_us:'After you cancel, refresh the page, click the menu and open the box, no animation effect.',zh_cht:'取消後刷新頁面、點擊菜單和打開彈框將不再有動畫效果',
      },

      toggleMenu:{
        zh_cn:'切换菜单栏',en_us:'Toggle menu bar',zh_cht:'切換菜單欄',
      },

      toggleMenuStr:{
        zh_cn:'切换菜单栏的展示或收起',en_us:'Toggle display or retraction of menu bar',zh_cht:'切換菜單欄的展示或收起',
      },

      usingTips:{
        zh_cn:'使用tips验证提示',en_us:'Using tips validation tips',zh_cht:'使用tips驗證提示',
      },

      usingTipsStr:{
        zh_cn:'表单校验将默认使用tips提示效果',en_us:'The form validation will use the tips prompt effect by default.',zh_cht:'表單校驗將默認使用tips提示效果',
      },

      toggleTipsColor:{
        zh_cn:'切换tips验证颜色',en_us:'Toggle tips validation color',zh_cht:'切換tips驗證顏色',
      },

      toggleTipsColorStr:{
        zh_cn:'使用tips提示效果红色或黑色切换',en_us:'Use tips hints to switch red or black.',zh_cht:'使用tips提示效果紅色或黑色切換',
      },

      toggleRightColumn:{
        zh_cn:'切换右侧操作栏',en_us:'Toggle right column',zh_cht:'切換右側操作欄',
      },

      toggleRightColumnStr:{
        zh_cn:'切换右侧操作栏覆盖或独占',en_us:'Toggle or override on the right column.',zh_cht:'切換右側操作欄覆蓋或獨占',
      },

      toggleBackgroundRightColumn:{
        zh_cn:'切换右侧操作栏背景',en_us:'Toggle the background of the right column.',zh_cht:'切換右側操作欄背景',
      },

      toggleBackgroundRightColumnStr:{
        zh_cn:'将右侧操作栏背景亮色或深色切换',en_us:'Switch the background light or dark color on the right column.',zh_cht:'將右側操作欄背景亮色或深色切換',
      },

      

      
    },


    msg:{
       zh_cn:'提示信息',en_us:'Message',zh_cht:'提示信息', 
    },
    errorMsg:{
       zh_cn:'错误信息',en_us:'Error Message',zh_cht:'錯誤信息', 
    },

    loading:{
      zh_cn:'数据加载中',en_us:'Loading……',zh_cht:'數據加載中',
    },

    login:{
       zh_cn:'登录',en_us:'Login',zh_cht:'登錄', 
    },

    inputId:{
       zh_cn:'请输入用户名称',en_us:'Please enter user name.',zh_cht:'請輸入用戶名稱', 
    },

    inputPwd:{
       zh_cn:'请输入密码',en_us:'Please enter password.',zh_cht:'請輸入密碼', 
    },

    inputVcode:{
       zh_cn:'请输入验证码',en_us:'Please enter verification code.',zh_cht:'請輸入驗證碼', 
    },

    loginTo:{
       zh_cn:'登录到您的帐户',en_us:'Login to your account',zh_cht:'登錄到您的帳戶', 
    },

    pleaseChoose:{
       zh_cn:'==请选择==',en_us:'==Please Choose==',zh_cht:'==請選擇==', 
    },
    FirstPage:{
       zh_cn:'首页',en_us:'First',zh_cht:'首頁', 
    },
    LastPage:{
       zh_cn:'尾页',en_us:'Last',zh_cht:'尾頁', 
    },
    PerviousPage:{
       zh_cn:'上一页',en_us:'Perv',zh_cht:'上壹頁', 
    },
    NextPage:{
       zh_cn:'下一页',en_us:'Next',zh_cht:'下壹頁', 
    },
    goToPage:{
       zh_cn:'跳转',en_us:'Go',zh_cht:'跳轉', 
    },
    eachPageShows:{
       zh_cn:'每页显示',en_us:'Each page shows:',zh_cht:'每頁顯示', 
    },
    datas:{
       zh_cn:'数据',en_us:'records',zh_cht:'數據', 
    },
    inputError:{
       zh_cn:'您的输入有误',en_us:'Your enter is incorrect',zh_cht:'您的輸入有誤', 
    },

    required:{
       zh_cn:'为必输项',en_us:' is necessary to enter',zh_cht:'為必輸項', 
    },

    noData:{
      zh_cn:'未查询到相关的数据!',en_us:'There is not record was found!',zh_cht:'未查詢到相關的數據!', 
    },

    confirm:{
      zh_cn:'确认',en_us:'Confirm',zh_cht:'確認', 
    },

    cancel:{
      zh_cn:'取消',en_us:'Cancel',zh_cht:'取消', 
    },

    add:{
      zh_cn:'新增',en_us:' Add ',zh_cht:'新增', 
    },

    list:{
      zh_cn:'详情',en_us:' Details',zh_cht:'詳情', 
    },

    remove:{
      zh_cn:'删除',en_us:' Delete',zh_cht:'刪除', 
    },

    changeStatus:{
      zh_cn:'任务状态',en_us:'Task Status',zh_cht:'任务状态', 
    },

    resetPwd:{
      zh_cn:'重置密码',en_us:' Reset Password',zh_cht:'重置密碼', 
    },

    edit:{
      zh_cn:'编辑',en_us:' Edit ',zh_cht:'編輯', 
    },

    export:{
      zh_cn:'导出',en_us:' Export',zh_cht:'導出', 
    },

    forceLogout:{
      zh_cn:'强退',en_us:' Force Logout',zh_cht:'強退', 
    },

    batchForceLogout:{
      zh_cn:'批量强退',en_us:' Batch Force Logout',zh_cht:'批量強退', 
    },

    close:{
      zh_cn:'关闭',en_us:'Close',zh_cht:'Close', 
    },

    delStr:{
      zh_cn:'确认删除该条记录？',en_us:'Are you sure you want to delete this record?',zh_cht:'確認刪除該條記錄？', 
    },

    resetPwdConfirm:{
      zh_cn:'确认要重置密码吗？',en_us:'Are you sure you want to reset the password?',zh_cht:'確認要重置密碼嗎？', 
    },

    newPwdToEmail:{
      zh_cn:'新密码已经发送到邮箱',en_us:'The new password has been sent to the mailbox.',zh_cht:'新密碼已經發送到郵箱', 
    },

    checkall:{
      zh_cn:'全选',en_us:'Select All',zh_cht:'全選', 
    },

    delSuccess:{
      zh_cn:'删除成功！',en_us:'Deleted successfully!',zh_cht:'刪除成功！', 
    },

    editSuccess:{
      zh_cn:'修改成功！',en_us:'Edit successfully!',zh_cht:'修改成功！', 
    },

    addSuccess:{
      zh_cn:'新增成功！',en_us:'Add successfully!',zh_cht:'新增成功！', 
    },

    forceLogoutSuccess:{
      zh_cn:'强退成功！',en_us:'ForceLogout successfully!',zh_cht:'強退成功！', 
    },

    pauseSuccess:{
      zh_cn:'暂停成功！',en_us:'suspension successfully!',zh_cht:'暫停成功！', 
    },

    runSuccess:{
      zh_cn:'执行成功！',en_us:'implementation successfully!',zh_cht:'執行成功！', 
    },

    startSuccess:{
      zh_cn:'启动成功！',en_us:'start successfully!',zh_cht:'啟動成功！', 
    },

    emailError:{
      zh_cn:'邮箱格式不正确！',en_us:'The mailbox format is incorrect.',zh_cht:'郵箱格式不正確！', 
    },

    phonenumberError:{
      zh_cn:'手机号码格式不正确！',en_us:'The phone number format is incorrect.',zh_cht:'手機號碼格式不正確！', 
    },

    cronExpressionError:{
      zh_cn:'CRON执行表达式格式不正确！',en_us:'CRON performs an incorrect expression format.',zh_cht:'CRON執行表達式格式不正確！', 
    },

    passwordError:{
      zh_cn:'只能输入6-20个字母+数字或下划线组合!',en_us:'You can only type 6-20 letters + numbers or underscores.',zh_cht:'只能輸入6-20個字母+數字或下劃線組合!', 
    },

    onlyOneData:{
      zh_cn:'请至少选择一条记录！',en_us:'Please choose at least one record.',zh_cht:'請至少選擇壹條記錄！', 
    },

    sureDel:{
      zh_cn:'确认删除选中的数据吗？',en_us:'Are you sure you want to delete selected data?',zh_cht:'確認刪除選中的數據嗎？', 
    },

    sureForceLogout:{
      zh_cn:'确认强退选中的数据吗？',en_us:'Are you sure you want to ForceLogout selected data?',zh_cht:'確認强退選中的數據嗎？', 
    },

    confirmStart:{
      zh_cn:'确认要启动任务吗？',en_us:'Are you sure you want to start the task?',zh_cht:'確認要啟動任務嗎？', 
    },

    confirmRun:{
      zh_cn:'确认要执行任务吗？',en_us:'Are you sure you want to perform the task?',zh_cht:'確認要執行任務嗎？', 
    },

    confirmPause:{
      zh_cn:'确认要暂停任务吗？',en_us:'Are you sure you want to pause the task?',zh_cht:'確認要暫停任務嗎？', 
    },

    noStart:{
      zh_cn:'当前任务状态为暂停，不可执行！',en_us:'The current status of the task is suspended and is not executable.',zh_cht:'當前任務狀態為暫停，不可執行！', 
    },

    orders:{
      zh_cn:'订单数',en_us:'Orders',zh_cht:'訂單數', 
    },

    volume:{
      zh_cn:'成交量',en_us:'Volume',zh_cht:'成交量', 
    },

    onlyWeek:{
      zh_cn:'最近一周销售情况',en_us:'Sales statistics for the latest week',zh_cht:'最近壹周銷售情況', 
    },

    changeOrg:{
      zh_cn:'选择机构',en_us:'Choose Organization',zh_cht:'選擇機構', 
    },

    pleaseChangeOrg:{
      zh_cn:'请选择一个机构！',en_us:'Please choose an organization!',zh_cht:'請選擇壹個機構！', 
    },

    menuName:{
        zh_cn:'菜单名称',en_us:'Menu Name',zh_cht:'菜單名稱',
    },
    menuId:{
        zh_cn:'菜单Id',en_us:'Menu Id',zh_cht:'菜單Id',
    },
    orderNum:{
        zh_cn:'排序',en_us:'Order Num',zh_cht:'排序',
    },
    orgOrderNum:{
        zh_cn:'排序',en_us:'Sort Number',zh_cht:'排序',
    },
    url:{
        zh_cn:'请求地址',en_us:'Url',zh_cht:'請求地址',
    },
    menuUrl:{
        zh_cn:'请求地址',en_us:'Menu Url',zh_cht:'請求地址',
    },
    menuType:{
        zh_cn:'类型',en_us:'Menu Type',zh_cht:'類型',
    },
    visible:{
        zh_cn:'状态',en_us:'Visible',zh_cht:'狀態',
    },
    perms:{
        zh_cn:'按钮类型',en_us:'Button Type',zh_cht:'按鈕類型',
    },
    operation:{
      zh_cn:'操作',en_us:'Action',zh_cht:'操作',
    },
    null:{
      zh_cn:'无',en_us:'',zh_cht:'無',
    },

    changeMenu:{
      zh_cn:'选择菜单',en_us:'Choose Menu',zh_cht:'選擇菜單', 
    },

    changeAvatar:{
      zh_cn:'选择头像',en_us:'Choose Avatar',zh_cht:'選擇頭像', 
    },

    pleaseChangeMenu:{
      zh_cn:'请选择一个菜单！',en_us:'Please choose an Menu!',zh_cht:'請選擇壹個菜單！', 
    },

    notOneMenu:{
      zh_cn:'第一级菜单不能选择！',en_us:'The first level menu can not be selected.',zh_cht:'第壹級菜單不能選擇！', 
    },
    
    mainDirectory:{
      zh_cn:'主目录',en_us:'Main Directory',zh_cht:'主目錄', 
    },

    mainOrg:{
      zh_cn:'主机构',en_us:'Main Org',zh_cht:'主機構', 
    },

    parMenuIsHere:{
      zh_cn:'上级菜单在这里！',en_us:'The Parent Menu Is Here!',zh_cht:'上級菜單在這裏！', 
    },

    orgName:{
      zh_cn:'机构名称',en_us:'ORG Name',zh_cht:'機構名稱',
    },

    status:{
      zh_cn:'状态',en_us:'Status',zh_cht:'狀態',
    },

    createTime:{
      zh_cn:'创建时间',en_us:'Create Time',zh_cht:'創建時間',
    },

    onlyNumber:{
      zh_cn:'只能输入数字！',en_us:'Only input numbers!',zh_cht:'只能輸入數字！',
    },

    superAdmin:{
      zh_cn:'超级管理员',en_us:'Super Admin',zh_cht:'超級管理員',
    },

    allRolePermissions:{
      zh_cn:'默认拥有所有角色权限',en_us:'Default has all role permissions.',zh_cht:'默認擁有所有角色權限',
    },

    ordinaryUser:{
      zh_cn:'普通用户',en_us:'Ordinary User',zh_cht:'普通用戶',
    },

    loginFailure:{
      zh_cn:'您的登录已过期，请再次登录。',en_us:'Your login session has expired, please login again.',zh_cht:'您的登錄已過期，請再次登錄。',
    },

    changeReport:{
      zh_cn:'请选择导出报表格式',en_us:'Please choose export report format',zh_cht:'請選擇導出報表格式',
    },

    editPwd:{
      zh_cn:'修改密码',en_us:'Change Password',zh_cht:'修改密碼',
    },

    loginOut:{
      zh_cn:'退出登录',en_us:'Logout',zh_cht:'退出登錄',
    },

    editUser:{
      zh_cn:'修改用户资料',en_us:'Edit User',zh_cht:'修改用戶資料',
    },

    queryContent:{
      zh_cn:'请输入查询内容……',en_us:'Search Text ......',zh_cht:'請輸入查詢內容……',
    },

    firstLoginContent:{
      zh_cn:'初次登录请修改密码！',en_us:'First login, please change the password!',zh_cht:'初次登錄請修改密碼！',
    },

    pwdCanNotBeEmpty:{
      zh_cn:'原密码不能为空！',en_us:'The original password can not be empty!',zh_cht:'原密碼不能為空！',
    },

    twoPwdCannotBeTheSame:{
      zh_cn:'两次密码不能相同！',en_us:'The two password cannot be the same!',zh_cht:'兩次密碼不能相同！',
    },

    changePwdSuss:{
      zh_cn:'修改成功！3秒后返回登录页……',en_us:'Modified successfully! 3 seconds later, return to the login page...',
      zh_cht:'修改成功！3秒後返回登錄頁……',
    },

    confirmLogOut:{
      zh_cn:'是否确认退出登录？',en_us:'Are you sure you want to logout?',zh_cht:'是否確認退出登錄？',
    },

    superAdminStr:{
      zh_cn:'超级管理员将默认拥护所有角色的权限！',en_us:'Super administrator will default to support all roles permissions!',
      zh_cht:'超級管理員將默認擁護所有角色的權限！',
    },

    timeOut:{
      zh_cn:'请求数据超时！',en_us:'Request data timeout!',zh_cht:'請求數據超時！',
    },

    exception:{
      zh_cn:'网络异常！',en_us:'Network exception!',zh_cht:'網絡異常！',
    },

    noMenu:{
      zh_cn:'未搜索到相关的菜单',en_us:'No related menu was searched.',zh_cht:'未搜索到相關的菜單',
    },

    nameNotNull:{
      zh_cn:'用户名不能为空！',en_us:'User name can not be empty!',zh_cht:'用戶名不能為空！',
    },

    pwdNotNull:{
      zh_cn:'登录密码不能为空！',en_us:'Login password can not be empty!',zh_cht:'登錄密碼不能為空！',
    },

    vcodeNotNull:{
      zh_cn:'验证码不能为空！',en_us:'The verification code can not be empty!',zh_cht:'驗證碼不能為空！',
    },

}