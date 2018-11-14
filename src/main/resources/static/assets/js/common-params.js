
var project={

    /*本地开发所需的环境配置，web_ip指局域网内的IP地址，可自己用也可别人用（解决跨域问题后）*/
    //邓瑶
    // web_ip:'http://192.168.98.29',
    //朱咪
    // web_ip:'http://192.168.98.45',
    // 外网
    web_ip:'http://113.106.85.5',
    web_ip:'http://192.168.17.51',
    //本地端口,指开发人员启动tomcat后浏览器的端口，
    web_port:'3000',
    //接口地址的端口
    web_api_port:'8890',
    //蔡老板
    // web_ip:'http://192.168.98.16:8082',

    /**********部署外网时所需配置的参数字段************/
    //default_ip:'http://127.0.0.1',
    default_ip:'http://192.168.1.200',
    // default_ip:'http://192.168.98.5',
    //default_ip:'http://192.168.17.51',
    //default_port:'8888',
    default_port:'8890',
    default_projectName:'/open-admin',
    // default_projectName:'',

    getHash:function(){
        return window.location.hash.split('?')[0].split('#/')[1];
    },

    //该方法返回不同环境下的指定的ip地址，端口，项目名
    host:function(){
        var hash=project.getHash(),str='';
        /*
        端口3000是前端的开发环境特有的端口，用于区别前端的开发环境和正式环境的接口不同的相对路径
        */

        //如果路由无效，一般情况下是登录页
        if(!hash){
            return window.location.port == project.web_port
            ? project.web_ip+':'+project.web_api_port+project.default_projectName 
            :(project.default_ip+':'+project.default_port+project.default_projectName);
        }

        //如果路由有效
        par_menu_router.forEach(function(n,i){
            //拿到对应路由的配置项
            /*
            ip的配置项的维度和菜单不同，可在default_ip直接改；
            如果菜单配置项的port字段有效(默认是null),则取port字段，否则取default_port字段
            如果菜单配置项的projectName字段有效(默认是null),则取projectName字段，否则取default_projectName字段
            */
            if(n.hash == hash){
                str = window.location.port == project.web_port
                ?(n.projectName ? project.web_ip+':'+project.web_api_port+n.projectName : project.web_ip+':'+project.web_api_port+project.default_projectName )
                :(project.default_ip+':'+(n.port?n.port:project.default_port)+(n.projectName?n.projectName:project.default_projectName)); 
            }

        });
        return str;
        
    },
    trigger:null,
    layerEle:null,
    //封装公共参数
    bodys:function(data){
        var data=data;
        //如果获取sign的方法
        data.getH5Sign=function(val){
            //删除自身的这个方法，否则会传到后台
            delete this.getH5Sign;
            // alert('传入后台的数据：'+JSON.stringify(this));
            if(!val){
                return this;
            }else{
                return JSON.stringify(this);
            }

        }
        return data;
    },

    i:0
}


//公共状态，包括参数设置的状态，字典类型的状态，角色的状态
var par_status=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'禁用',en_us:'Disabled',zh_cht:'禁用',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">禁用</span>',
            en_us:'<span class="badge badge-danger">Disabled</span>',
            zh_cht:'<span class="badge badge-danger">禁用</span>',
        },
    },
];

//用户类型
var par_userType=[
    {
        value:'00',
        name:{
            zh_cn:'超级管理员',en_us:'Super Admin',zh_cht:'超級管理員',
        }
    },
    {
        value:'01',
        name:{
            zh_cn:'普通用户',en_us:'Ordinary User',zh_cht:'普通用戶',
        }
    },
];

//用户状态
var par_user_status=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'禁用',en_us:'Disabled',zh_cht:'禁用',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">禁用</span>',
            en_us:'<span class="badge badge-danger">Disabled</span>',
            zh_cht:'<span class="badge badge-danger">禁用</span>',
        },
    },
    {
        value:'2',
        name:{
            zh_cn:'锁定',en_us:'Locked',zh_cht:'鎖定',
        },
        name1:{
            zh_cn:'<span class="badge badge-warning">锁定</span>',
            en_us:'<span class="badge badge-warning">Locked</span>',
            zh_cht:'<span class="badge badge-warning">鎖定</span>',
        },
    }
];

//用户性别
var par_sex=[
    {
        value:'0',
        name:{
            zh_cn:'女',en_us:'Female',zh_cht:'女',
        }
    },
    {
        value:'1',
        name:{
            zh_cn:'男',en_us:'Male',zh_cht:'男',
        }
    },
];


//菜单类型
var par_menu=[
    {
        value:'M',
        name:{
            zh_cn:'目录',en_us:'Directory',zh_cht:'目錄',
        },
        name1:{
            zh_cn:'<span class="label label-success">目录</span>',
            en_us:'<span class="label label-success">Directory</span>',
            zh_cht:'<span class="label label-success">目錄</span>',
        },
    },
    {
        value:'C',
        name:{
            zh_cn:'菜单',en_us:'Menu',zh_cht:'菜單',
        },
        name1:{
            zh_cn:'<span class="label label-primary">菜单</span>',
            en_us:'<span class="label label-primary">Menu</span>',
            zh_cht:'<span class="label label-primary">菜單</span>',
        },
    },
    {
        value:'F',
        name:{
            zh_cn:'按钮',en_us:'Button',zh_cht:'按鈕',
        },
        name1:{
            zh_cn:'<span class="label label-warning">按钮</span>',
            en_us:'<span class="label label-warning">Button</span>',
            zh_cht:'<span class="label label-warning">按鈕</span>',
        },
    },
];

//菜单状态
var par_menu_status=[
    {
        value:'0',
        name:{
            zh_cn:'显示',en_us:'Show',zh_cht:'顯示',
        },
        name1:{
            zh_cn:'<span class="badge badge-primary">显示</span>',
            en_us:'<span class="badge badge-primary">Show</span>',
            zh_cht:'<span class="badge badge-primary">顯示</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'隐藏',en_us:'Hide',zh_cht:'隱藏',
        },
        name:{
            zh_cn:'<span class="badge badge-danger">隐藏</span>',
            en_us:'<span class="badge badge-danger">Hide</span>',
            zh_cht:'<span class="badge badge-danger">隱藏</span>',
        }
    },
];




//操作日志的来源渠道
var par_channel=[
    {
        value:'manage',
        name:{
            zh_cn:'后台用户',en_us:'Back-end user',zh_cht:'後臺用戶',
        },
    },
    {
        value:'mobile',
        name:{
            zh_cn:'手机端用户',en_us:'Mobile Users',zh_cht:'手機端用戶',
        },
    },
    {
        value:'other',
        name:{
            zh_cn:'其它',en_us:'Other Users',zh_cht:'其它',
        },
    },
];


//操作日志的操作状态
var par_operStatus=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'失败',en_us:'Fail',zh_cht:'失敗',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">失败</span>',
            en_us:'<span class="badge badge-danger">Fail</span>',
            zh_cht:'<span class="badge badge-danger">失敗</span>',
        },
    },
    {
        value:'2',
        name:{
            zh_cn:'异常',en_us:'Abnormal',zh_cht:'異常',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">异常</span>',
            en_us:'<span class="badge badge-danger">Abnormal</span>',
            zh_cht:'<span class="badge badge-danger">異常</span>',
        },
    },
    
];

//操作日志的操作类型
var par_action=[
    {
        value:'0',
        name:{
            zh_cn:'其他',en_us:'Other',zh_cht:'其他',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'新增',en_us:'Add',zh_cht:'新增',
        },
    },
    {
        value:'2',
        name:{
            zh_cn:'修改',en_us:'Edit',zh_cht:'修改',
        },
    },
    {
        value:'3',
        name:{
            zh_cn:'删除',en_us:'Delete',zh_cht:'刪除',
        },
    },
    {
        value:'4',
        name:{
            zh_cn:'导出',en_us:'Export',zh_cht:'導出',
        },
    },
];


//登录日志的登录状态
var loginStatus=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'失败',en_us:'Fail',zh_cht:'失敗',
        },
    },
];


//机构的状态
var par_orgStatus=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'停用',en_us:'Disabled',zh_cht:'停用',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">停用</span>',
            en_us:'<span class="badge badge-danger">Disabled</span>',
            zh_cht:'<span class="badge badge-danger">停用</span>',
        },
    },
];


//在线用户的在线离线状态
var par_onlineStatus=[
    {
        value:'on_line',
        name:{
            zh_cn:'在线',en_us:'onLine',zh_cht:'在線',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">在线</span>',
            en_us:'<span class="badge badge-success">onLine</span>',
            zh_cht:'<span class="badge badge-success">在線</span>',
        },
    },
    
    {
        value:'off_line',
        name:{
            zh_cn:'离线',en_us:'offLine',zh_cht:'離線',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">离线</span>',
            en_us:'<span class="badge badge-danger">offLine</span>',
            zh_cht:'<span class="badge badge-danger">離線</span>',
        },
    },
];


//定时任务状态
var par_jobStatus=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'暂停',en_us:'Pause',zh_cht:'暫停',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">暂停</span>',
            en_us:'<span class="badge badge-danger">Pause</span>',
            zh_cht:'<span class="badge badge-danger">暫停</span>',
        },
    },
];

//定时任务的任务执行状态
var par_jobTriggerState=[
    {
        value:'WAITING',
        name:{
            zh_cn:'等待',en_us:'WAITING',zh_cht:'等待',
        },
    },
    {
        value:'PAUSED',
        name:{
            zh_cn:'暂停',en_us:'PAUSED',zh_cht:'暫停',
        },
    },
    {
        value:'ACQUIRED',
        name:{
            zh_cn:'正常执行',en_us:'ACQUIRED',zh_cht:'正常執行',
        },
    },
    {
        value:'BLOCKED',
        name:{
            zh_cn:'阻塞',en_us:'BLOCKED',zh_cht:'阻塞',
        },
    },
    {
        value:'ERROR',
        name:{
            zh_cn:'错误',en_us:'ERROR',zh_cht:'錯誤',
        },
    },
];


//定时任务日志状态
var par_jobLogsStatus=[
    {
        value:'0',
        name:{
            zh_cn:'正常',en_us:'Normal',zh_cht:'正常',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">正常</span>',
            en_us:'<span class="badge badge-success">Normal</span>',
            zh_cht:'<span class="badge badge-success">正常</span>',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'失败',en_us:'Fail',zh_cht:'失败',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">失败</span>',
            en_us:'<span class="badge badge-danger">Fail</span>',
            zh_cht:'<span class="badge badge-danger">失败</span>',
        },
    },
];

//定时任务计划执行错误策略
var par_jobMisfirePolicy=[
    {
        value:'0',
        name:{
            zh_cn:'默认',en_us:'Default',zh_cht:'默認',
        },
    },
    {
        value:'1',
        name:{
            zh_cn:'继续',en_us:'Continue',zh_cht:'繼續',
        },
    },
    {
        value:'2',
        name:{
            zh_cn:'等待',en_us:'Wait',zh_cht:'等待',
        },
    },
    {
        value:'3',
        name:{
            zh_cn:'放弃',en_us:'giveUp',zh_cht:'放棄',
        },
    },
];


//字典详情是否默认状态
var par_isDefault=[
    {
        value:'Y',
        name:{
            zh_cn:'是',en_us:'Yes',zh_cht:'是',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">是</span>',
            en_us:'<span class="badge badge-success">Yes</span>',
            zh_cht:'<span class="badge badge-success">是</span>',
        },
    },
    {
        value:'N',
        name:{
            zh_cn:'否',en_us:'No',zh_cht:'否',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">否</span>',
            en_us:'<span class="badge badge-danger">No</span>',
            zh_cht:'<span class="badge badge-danger">否</span>',
        },
    },
];

//参数设置的系统内置状态
var par_configType=[
    {
        value:'Y',
        name:{
            zh_cn:'是',en_us:'Yes',zh_cht:'是',
        },
        name1:{
            zh_cn:'<span class="badge badge-success">是</span>',
            en_us:'<span class="badge badge-success">Yes</span>',
            zh_cht:'<span class="badge badge-success">是</span>',
        },
    },
    {
        value:'N',
        name:{
            zh_cn:'否',en_us:'No',zh_cht:'否',
        },
        name1:{
            zh_cn:'<span class="badge badge-danger">否</span>',
            en_us:'<span class="badge badge-danger">No</span>',
            zh_cht:'<span class="badge badge-danger">否</span>',
        },
    },
    
];


//菜单权限标识
var par_menuPerms=[
    // {value:'view',name:'查询'},
    {
        value:'add',
        name:{
            zh_cn:'新增',en_us:'Add',zh_cht:'新增',
        },
    },
    {
        value:'remove',
        name:{
            zh_cn:'删除',en_us:'Delete',zh_cht:'删除',
        },
        
    },
    {
        value:'edit',
        name:{
            zh_cn:'修改',en_us:'Edit',zh_cht:'修改',
        },
    },
    {
        value:'export',
        name:{
            zh_cn:'导出',en_us:'Export',zh_cht:'導出',
        },
    },
    {
        value:'list',
        name:{
            zh_cn:'详情',en_us:'Details',zh_cht:'詳情',
        },
    },
    {
        value:'resetPwd',
        name:{
            zh_cn:'重置密码',en_us:'Reset Password',zh_cht:'重置密碼',
        },
    },
    {
        value:'changeStatus',
        name:{
            zh_cn:'状态修改',en_us:'ChangeStatus',zh_cht:'狀態修改',
        },
    },
    {
        value:'forceLogout',
        name:{
            zh_cn:'在线用户强退',en_us:'ForceLogout',zh_cht:'在線用戶強退',
        },
    },
    {
        value:'batchForceLogout',
        name:{
            zh_cn:'在线用户批量强退',en_us:'BatchForceLogout',zh_cht:'在線用戶批量強退',
        },
    },
];




//定义分页参数
var par_pagination=[
   // {value:'1',name:'1'},
   {value:'10',name:'10'},
   {value:'25',name:'25'},
   {value:'50',name:'50'},
   {value:'75',name:'75'},
   {value:'100',name:'100'},
   {value:'200',name:'200'},
];


//公共错误提示颜色
var par_color={
    gray:'#353544',
    error:'#df4141',
}



var par_menu_router = [{
        name: '首页',
        port: null,
        hash: 'index',
        path: 'tpl/index1.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页',
            en_us:'Home',
            zh_cht:'首頁',
        },
        lang:{
            name:{
                zh_cn:'首页',en_us:'home',zh_cht:'首頁',
            },
            info:{
                zh_cn:'用于展示当前系统中的统计数据、统计报表及重要实时数据',
                en_us:'It is used to display statistical data, statistical reports and important real-time data in the current system.',
                zh_cht:'用於展示當前系統中的統計數據、統計報表及重要實時數據',
            },
            UserNumber:{
                zh_cn:'用户数量',en_us:'User Count',zh_cht:'用戶數量',
            },
            accessNumber:{
                zh_cn:'总访问数',en_us:'Visit Count',zh_cht:'總訪問數',
            },
            orderNumber:{
                zh_cn:'总订单数',en_us:'Order Counts',zh_cht:'總訂單數',
            },
            totalAmount:{
                zh_cn:'总金额',en_us:'Total Amount',zh_cht:'總金額',
            },
            registerToday:{
                zh_cn:'今日注册',en_us:'Reg Count Today',zh_cht:'今日註冊',
            },
            LoginToday:{
                zh_cn:'今日登录',en_us:'Login Count Today',zh_cht:'今日登錄',
            },
            OrderToday:{
                zh_cn:'今日订单数',en_us:'Order Records Today',zh_cht:'今日訂單數',
            },
            unprocessedOrders:{
                zh_cn:'未处理订单',en_us:'Unprocessed Order',zh_cht:'未處理訂單',
            },
            sevenDaysNew:{
                zh_cn:'七日新增',en_us:'New Users In 7 Days',zh_cht:'七日新增',
            },
            sevenDaysOfActivity:{
                zh_cn:'七日活跃',en_us:'Active Users In 7 Days',zh_cht:'七日活躍',
            },
        }
    },
    {
        name: '用户管理',
        port: null,
        hash: 'users',
        path: 'rbac/user.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/用户管理',
            en_us:'Home/system management/user management',
            zh_cht:'首頁/系統管理/用戶管理',
        },
        lang:{
            loginName:{
                zh_cn:'登录名称',en_us:'Login Name',zh_cht:'登录名稱',
            },
            userName:{
                zh_cn:'用户名称',en_us:'User Name',zh_cht:'用戶名稱',
            },
            orgId:{
                zh_cn:'所属机构',en_us:'ORG',zh_cht:'所屬機構',
            },
            status:{
                zh_cn:'用户状态',en_us:'User Status',zh_cht:'用戶狀態',
            },
            phonenumber:{
                zh_cn:'手机号码',en_us:'Phone Number',zh_cht:'手機號碼',
            },
            password:{
                zh_cn:'密码',en_us:'Password',zh_cht:'密碼',
            },
            email:{
                zh_cn:'邮箱',en_us:'Email',zh_cht:'郵箱',
            },
            sex:{
                zh_cn:'性别',en_us:'Sex',zh_cht:'性別',
            },
            userType:{
                zh_cn:'用户类型',en_us:'User Type',zh_cht:'用戶類型',
            },
            userId:{
                zh_cn:'用户ID',en_us:'UserId',zh_cht:'用戶ID',
            },
        }
    },
    {
        name: '角色管理',
        port: null,
        hash: 'roles',
        path: 'rbac/role.html',
        crumbs: '首页/系统管理/角色管理',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/角色管理',
            en_us:'Home/system management/role management',
            zh_cht:'首頁/系統管理/角色管理',
        },
        lang:{
            roleName:{
                zh_cn:'角色名称',en_us:'Role Name',zh_cht:'角色名稱',
            },
            roleId:{
                zh_cn:'角色Id',en_us:'Role Id',zh_cht:'角色Id',
            },
            status:{
                zh_cn:'角色状态',en_us:'Role Status',zh_cht:'角色狀態',
            },
            remark:{
                zh_cn:'备注',en_us:'Remark',zh_cht:'備註',
            },
            menuIds:{
                zh_cn:'所属菜单',en_us:'Menu Right',zh_cht:'所屬菜單',
            },
        }
    },
    {
        name: '菜单管理',
        port: null,
        hash: 'menus',
        path: 'rbac/menu.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/菜单管理',
            en_us:'Home/system management/menu management',
            zh_cht:'首頁/系統管理/菜单管理',
        },
        lang:{
            menuName:{
                zh_cn:'菜单名称',en_us:'Menu Name  ',zh_cht:'菜單名稱',
            },

            menuName_en_us:{
                zh_cn:'菜单英文名称',en_us:'Menu English Name ',zh_cht:'菜單英文名稱',
            },

            menuName_zh_cht:{
                zh_cn:'菜单繁体名称',en_us:'Menu TW Name',zh_cht:'菜單繁體名稱',
            },
            menuId:{
                zh_cn:'菜单Id',en_us:'Menu Id',zh_cht:'菜單Id',
            },
            menuOrderNum:{
                zh_cn:'排序',en_us:'Sort Number',zh_cht:'排序',
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
            icon:{
                zh_cn:'图标',en_us:'Icon',zh_cht:'圖標',
            },
            parentId:{
                zh_cn:'上级菜单',en_us:'Parent Menu',zh_cht:'上級菜單',
            },
        }
    },
    {
        name: '机构管理',
        port: null,
        hash: 'orgs',
        path: 'rbac/org.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/机构管理',
            en_us:'Home/system management/Orgnaization Management',
            zh_cht:'首頁/系統管理/機構管理',
        },
        lang:{
            orgName:{
                zh_cn:'机构名称',en_us:'ORG Name',zh_cht:'機構名稱',
            },
            status:{
                zh_cn:'机构状态',en_us:'ORG Status',zh_cht:'機構狀態',
            },
            leader:{
                zh_cn:'负责人',en_us:'Leader',zh_cht:'負責人',
            }, 
            parentId:{
                zh_cn:'上级机构',en_us:'Parent ORG',zh_cht:'上级機構',
            },  
            orgOrderNum:{
                zh_cn:'排序',en_us:'Sort Number',zh_cht:'排序',
            },
            phone:{
                zh_cn:'联系电话',en_us:'Phone',zh_cht:'聯系電話',
            }, 
            email:{
                zh_cn:'邮箱',en_us:'Email',zh_cht:'郵箱',
            },     
           
        }
    },
    {
        name: '字典管理',
        port: null,
        hash: 'dicts',
        path: 'rbac/dict.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/字典管理',
            en_us:'Home/system management/Data Dictionary',
            zh_cht:'首頁/系統管理/字典管理',
        },
        lang:{
            dictName:{
                zh_cn:'字典名称',en_us:'Dict Name',zh_cht:'字典名稱',
            },
            dictType:{
                zh_cn:'字典类型',en_us:'Dict Type',zh_cht:'字典類型',
            },
            dictData:{
                zh_cn:'字典详情',en_us:'Dict Data',zh_cht:'字典詳情',
            },
            status:{
                zh_cn:'状态',en_us:'Status',zh_cht:'狀態',
            },
            remark:{
                zh_cn:'备注',en_us:'Remark',zh_cht:'備註',
            }, 
            dbClick:{
                zh_cn:'请双击选择',en_us:'Please double-click the selection.',zh_cht:'請雙擊選擇',
            },  
            dictLabel:{
                zh_cn:'字典标识',en_us:'Dict Label',zh_cht:'字典標識',
            },
            dictValue:{
                zh_cn:'字典值',en_us:'Dict Value',zh_cht:'字典值',
            }, 
            isDefault:{
                zh_cn:'是否默认',en_us:'Is Default',zh_cht:'是否默認',
            },     
           
        }
    },
    {
        name: '参数设置',
        port: null,
        hash: 'configs',
        path: 'rbac/config.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/参数设置',
            en_us:'Home/system management/Parameter Setting',
            zh_cht:'首頁/系統管理/參數設置',
        },
        lang:{
            configName:{
                zh_cn:'参数名称',en_us:'Parameter Name',zh_cht:'參數名稱',
            },
            configKey:{
                zh_cn:'参数KEY',en_us:'Parameter Key',zh_cht:'參數KEY',
            },
            configValue:{
                zh_cn:'参数VALUE',en_us:'Parameter Value',zh_cht:'參數VALUE',
            },
            configType:{
                zh_cn:'是否内置参数',en_us:'System Parameter',zh_cht:'是否內置參數',
            },
            configId:{
                zh_cn:'参数Id',en_us:'Parameter Id',zh_cht:'參數Id',
            },
            module:{
                zh_cn:'模块名',en_us:'Module',zh_cht:'模塊名',
            },
            remark:{
                zh_cn:'备注',en_us:'Remark',zh_cht:'備註',
            }, 
           
        }
    },
    {
        name: '操作日志',
        port: null,
        hash: 'operlogs',
        path: 'rbac/operlog.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统监控/操作日志',
            en_us:'Home/system monitor/Audit Log Inquiry',
            zh_cht:'首頁/系統監控/操作日誌',
        },
        lang:{
            loginName:{
                zh_cn:'登录账号',en_us:'Login Name',zh_cht:'登錄賬號',
            },
            no:{
                zh_cn:'序号',en_us:'Serial Number',zh_cht:'序号',
            },
            ipaddr:{
                zh_cn:'请求IP地址',en_us:'IP Address',zh_cht:'請求IP地址',
            },
            status:{
                zh_cn:'操作状态',en_us:'Status',zh_cht:'操作狀態',
            },
            os:{
                zh_cn:'操作系统',en_us:'Operation System',zh_cht:'操作系统',
            },
            browser:{
                zh_cn:'浏览器',en_us:'Browser',zh_cht:'瀏覽器',
            },
            loginLocation:{
                zh_cn:'操作地点',en_us:'Operator Address',zh_cht:'操作地點',
            }, 
            operName:{
                zh_cn:'操作人员',en_us:'Operator',zh_cht:'操作人員',
            }, 
            channel:{
                zh_cn:'来源渠道',en_us:'Channel',zh_cht:'來源渠道',
            }, 
            orgName:{
                zh_cn:'部门名称',en_us:'ORG Name',zh_cht:'部門名稱',
            },
            operId:{
                zh_cn:'日志主键',en_us:'Operator Id',zh_cht:'日誌主鍵',
            },
            title:{
                zh_cn:'模块标题',en_us:'Title',zh_cht:'模塊標題',
            },
            method:{
                zh_cn:'方法名称',en_us:'Method',zh_cht:'方法名稱',
            },
            operUrl:{
                zh_cn:'请求URL',en_us:'Operator Url',zh_cht:'請求URL',
            },
            operParam:{
                zh_cn:'请求参数',en_us:'Operator Param',zh_cht:'請求參數',
            },
            errorMsg:{
                zh_cn:'错误消息',en_us:'Error Msg',zh_cht:'錯誤消息',
            },
            type:{
                zh_cn:'操作类型',en_us:'Action Type',zh_cht:'操作類型',
            },
            time:{
                zh_cn:'操作时间',en_us:'Operation Time',zh_cht:'操作時間',
            },

        }
    },
    {
        name: '登录日志',
        port: null,
        hash: 'loginlogs',
        path: 'rbac/loginlog.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统监控/登录日志',
            en_us:'Home/system monitor/Login Log Inquiry',
            zh_cht:'首頁/系統監控/登錄日誌',
        },
        lang:{
            loginName:{
                zh_cn:'登录账号',en_us:'Login Name',zh_cht:'登錄賬號',
            },
            no:{
                zh_cn:'序号',en_us:'Serial Number',zh_cht:'序号',
            },
            ipaddr:{
                zh_cn:'登录IP地址',en_us:'IP Address',zh_cht:'登錄IP地址',
            },
            status:{
                zh_cn:'登录状态',en_us:'Status',zh_cht:'登錄狀態',
            },
            os:{
                zh_cn:'操作系统',en_us:'Operation System',zh_cht:'操作系統',
            },
            browser:{
                zh_cn:'浏览器',en_us:'Browser',zh_cht:'瀏覽器',
            },
            loginLocation:{
                zh_cn:'登录地点',en_us:'Login Location',zh_cht:'登錄地點',
            }, 
            msg:{
                zh_cn:'提示消息',en_us:'Login Message',zh_cht:'提示消息',
            }, 
            time:{
                zh_cn:'访问时间',en_us:'Login Time',zh_cht:'訪問時間',
            }, 
        }
    },
    {
        name: '定时任务',
        port: null,
        hash: 'monitor/job',
        path: 'monitor/job.html',
        projectName: '/open-schedule',
        crumbs:{
            zh_cn:'首页/系统监控/定时任务',
            en_us:'Home/system monitor/Timing Task  Setting',
            zh_cht:'首頁/系統監控/定時任務',
        },
        lang:{
            jobName:{
                zh_cn:'任务名称',en_us:'Job Name',zh_cht:'任務名稱',
            },
            jobNo:{
                zh_cn:'任务编号',en_us:'Job Number',zh_cht:'任務編號',
            },
            jobGroup:{
                zh_cn:'任务组名',en_us:'Job Group',zh_cht:'任務組名',
            },
            serviceName:{
                zh_cn:'服务名称',en_us:'Service Name',zh_cht:'服務名稱',
            },
            apiPath:{
                zh_cn:'接口地址',en_us:'API Path',zh_cht:'接口地址',
            },
            methodParams:{
                zh_cn:'方法参数',en_us:'Method Params',zh_cht:'方法參數',
            },
            cronExpression:{
                zh_cn:'CRON执行表达式',en_us:'Cron Expression',zh_cht:'CRON執行表達式',
            },
            misfirePolicy:{
                zh_cn:'计划执行错误策略',en_us:'Misfire Policy',zh_cht:'計劃執行錯誤策略',
            },
            status:{
                zh_cn:'任务状态',en_us:'Task Status',zh_cht:'任務狀態',
            },
            status1:{
                zh_cn:'任务执行状态',en_us:'Task Execution Status',zh_cht:'任務執行狀態',
            },
            remark:{
                zh_cn:'备注',en_us:'Remark',zh_cht:'備註',
            },
            methodParams:{
                zh_cn:'方法参数',en_us:'Method Params',zh_cht:'方法參數',
            },
            next:{
                zh_cn:'下次执行时间',en_us:'Next Execution Time',zh_cht:'下次執行時間',
            },
        }
    },
    {
        name: '定时任务日志',
        port: null,
        hash: 'monitor/jobLogs',
        path: 'monitor/jobLogs.html',
        projectName: '/open-schedule',
        crumbs:{
            zh_cn:'首页/系统监控/定时任务日志',
            en_us:'Home/system monitor/Timing Task  Log',
            zh_cht:'首頁/系統監控/定時任務日誌',
        },
        lang:{
            jobName:{
                zh_cn:'任务名称',en_us:'Job Name',zh_cht:'任務名稱',
            },
            jobNo:{
                zh_cn:'任务编号',en_us:'Job Number',zh_cht:'任務編號',
            },
            jobGroup:{
                zh_cn:'任务组名',en_us:'Job Group',zh_cht:'任務組名',
            },
            serviceName:{
                zh_cn:'服务名称',en_us:'Service Name',zh_cht:'服務名稱',
            },
            apiPath:{
                zh_cn:'接口地址',en_us:'API Path',zh_cht:'接口地址',
            },
            methodParams:{
                zh_cn:'方法参数',en_us:'Method Params',zh_cht:'方法參數',
            },
            cronExpression:{
                zh_cn:'CRON执行表达式',en_us:'Cron Expression',zh_cht:'CRON執行表達式',
            },
            misfirePolicy:{
                zh_cn:'计划执行错误策略',en_us:'Misfire Policy',zh_cht:'計劃執行錯誤策略',
            },
            status:{
                zh_cn:'任务状态',en_us:'Task Status',zh_cht:'任務狀態',
            },
            status1:{
                zh_cn:'任务执行状态',en_us:'Task Execution Status',zh_cht:'任務執行狀態',
            },
            remark:{
                zh_cn:'备注',en_us:'Remark',zh_cht:'備註',
            },
            methodParams:{
                zh_cn:'方法参数',en_us:'Method Params',zh_cht:'方法參數',
            },
            next:{
                zh_cn:'下次执行时间',en_us:'Next Execution Time',zh_cht:'下次執行時間',
            },
            nodeIp:{
                zh_cn:'IP地址',en_us:'IP',zh_cht:'IP地址',
            },
            nodePort:{
                zh_cn:'端口',en_us:'Port',zh_cht:'端口',
            },
            jobMessage:{
                zh_cn:'日志信息',en_us:'Job Message',zh_cht:'日誌信息',
            },
        }
    },
    {
        name: '在线用户',
        port: null,
        hash: 'monitor/onlineUsers',
        path: 'monitor/online.html',
        projectName: null,
         crumbs:{
            zh_cn:'首页/系统监控/在线用户',
            en_us:'Home/system monitor/onlineUsers',
            zh_cht:'首頁/系統監控/在線用戶',
        },
        lang:{
            ipaddr:{
                zh_cn:'主机',en_us:'IP Address',zh_cht:'主機',
            },
            loginName:{
                zh_cn:'操作人员',en_us:'Login Name',zh_cht:'操作人員',
            },
            lastAccessTime:{
                zh_cn:'最后访问时间',en_us:'Last Access Time',zh_cht:'最後訪問時間',
            },
            startTimestamp:{
                zh_cn:'登录时间',en_us:'Start Time',zh_cht:'登錄時間',
            },
            status:{
                zh_cn:'会话状态',en_us:'Status',zh_cht:'會話狀態',
            },
            os:{
                zh_cn:'操作系统',en_us:'Operation System',zh_cht:'操作系統',
            },
            browser:{
                zh_cn:'浏览器',en_us:'Browser',zh_cht:'瀏覽器',
            },
            loginLocation:{
                zh_cn:'登录地点',en_us:'Login Location',zh_cht:'登錄地點',
            }, 
            orgName:{
                zh_cn:'部门名称',en_us:'ORG Name',zh_cht:'部門名稱',
            }, 
           
        }
    },
    {
        name: '用户资料修改',
        port: null,
        hash: 'user/info',
        path: 'user/info.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/用户资料修改',
            en_us:'Home/user Edit',
            zh_cht:'首頁/用戶資料修改',
        },
        lang:{
            loginName:{
                zh_cn:'登录名称',en_us:'Login Name',zh_cht:'登錄名稱',
            },
            avatar:{
                zh_cn:'头像',en_us:'Avatar',zh_cht:'頭像',
            },
            userName:{
                zh_cn:'用户名称',en_us:'User Name',zh_cht:'用護名稱',
            },
            orgId:{
                zh_cn:'所属机构',en_us:'ORG',zh_cht:'所屬機構',
            },
            status:{
                zh_cn:'用户状态',en_us:'User Status',zh_cht:'用護狀態',
            },
            phonenumber:{
                zh_cn:'手机号码',en_us:'Phone Number',zh_cht:'手機號碼',
            },
            password:{
                zh_cn:'密码',en_us:'Password',zh_cht:'密碼',
            },
            email:{
                zh_cn:'邮箱',en_us:'Email',zh_cht:'郵箱',
            },
            sex:{
                zh_cn:'性别',en_us:'Sex',zh_cht:'性別',
            },
            userType:{
                zh_cn:'用户类型',en_us:'User Type',zh_cht:'用戶類型',
            },
            userId:{
                zh_cn:'用户ID',en_us:'UserId',zh_cht:'用戶ID',
            },
           
        }
    },
    {
        name: '缓存管理',
        port: null,
        hash: 'redis',
        path: 'rbac/redis.html',
        projectName: null,
        crumbs:{
            zh_cn:'首页/系统管理/缓存管理',
            en_us:'Home/system management/Cache Inquiry',
            zh_cht:'首頁/系統管理/緩存管理',
        },
        lang:{
            time:{
                zh_cn:'剩余生存时间',en_us:'Remaining Time',zh_cht:'剩余生存時間',
            },
            s:{
                zh_cn:'秒',en_us:'S',zh_cht:'秒',
            },
            cacheKey:{
                zh_cn:'缓存KEY',en_us:'Cache Key',zh_cht:'緩存KEY',
            },
            cacheValue:{
                zh_cn:'缓存VALUE',en_us:'Cache Value',zh_cht:'緩存VALUE',
            },
        }
    },
];