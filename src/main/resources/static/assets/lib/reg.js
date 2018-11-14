
var reg={
	email:{
		reg:/^[\w-]+@[\w-]+(\.[\w-]+)+$/,
		regMsg:'邮箱格式不正确',
	}
}


/**
 * 定义一个可静态调用方法的js类
 * 
 */
function ChkUtil() {};

//校验是否全是数字 
ChkUtil.isDigit = function(str) {
	var patrn = /^\d+$/;
	return patrn.test(str);
};
//校验是否是整数
ChkUtil.isInteger = function(str) {
	var patrn = /^([+-]?)(\d+)$/;
	return patrn.test(str);
};

//校验大于0的数字
ChkUtil.isMoreZero = function(str) {
	var patrn = /^[1-9]\d*(\.\d+)?$/;
	return patrn.test(str);
};

//机器人页面校验的数字
ChkUtil.isMoreZero2 = function(str) {
	var patrn = /^[0-9]\d*(\.\d+)?$/;
	return patrn.test(str);
};

//校验机器人方案
ChkUtil.xiazhugeshi = function(str) {
	// var patrn =/^[[0-9]|和]{1,19}/[[0-9]|大|小|单|双|龙|虎]{1,19}/\{0\}$/;
	return patrn.test(str);
};

//校验是否为正整数
ChkUtil.isPlusInteger = function(str) {
	var patrn = /^[0-9]*[1-9][0-9]*$/;
	return patrn.test(str);
};
//校验是否为负整数
ChkUtil.isMinusInteger = function(str) {
	var patrn = /^-(\d+)$/;
	return patrn.test(str);
};
//校验是否为浮点数   
ChkUtil.isFloat = function(str) {
	var patrn = /^([+-]?)\d*\.\d+$/;
	return patrn.test(str);
};
//校验是否为正浮点数   
ChkUtil.isPlusFloat = function(str) {
	var patrn = /^(?:[1-9][0-9]*\.[0-9]+|0\.(?!0+$)[0-9]+)$/;
	return patrn.test(str);
};

//数字和英文逗号的组合
ChkUtil.isShuziDouhao = function(str) {
	var patrn = /^((\d,)*\d)*$/;
	return patrn.test(str);
};

//校验是否为负浮点数   
ChkUtil.isMinusFloat = function(str) {
	var patrn = /^-\d*\.\d+$/;
	return patrn.test(str);
};
//校验是否仅中文
ChkUtil.isChinese = function(str) {
	var patrn = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
	return patrn.test(str);
};
//校验是否仅ACSII字符
ChkUtil.isAcsii = function(str) {
	var patrn = /^[\x00-\xFF]+$/;
	return patrn.test(str);
};
//校验手机号码
ChkUtil.isMobile = function(str) {
	var patrn = /^(1(3|5|7|8)[0-9]|15[0|3|6|7|8|9]|18[7|8|9])\d{8}$/;
	return patrn.test(str);
};
//校验电话号码
ChkUtil.isPhone = function(str) {
	var patrn = /^(0[\d]{2,3}-)?\d{6,8}(-\d{3,4})?$/;
	return patrn.test(str);
};
// //校验URL地址
// ChkUtil.isUrl = function(str) {
// 	var patrn = /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
// 	return patrn.test(str);
// };
//校验URL地址
ChkUtil.isUrl = function(str) {
	var patrn = /^[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
	return patrn.test(str);
};

//校验URL地址
ChkUtil.isUrl2 = function(str) {
	var patrn = /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
	return patrn.test(str);
};
//校验电邮地址
ChkUtil.isEmail = function(str) {
	var patrn = /^[\w-]+@[\w-]+(\.[\w-]+)+$/;
	return patrn.test(str);
};
//校验邮编
ChkUtil.isZipCode = function(str) {
	var patrn = /^\d{6}$/;
	return patrn.test(str);
};

//校验合法时间
ChkUtil.isDate = function(str) {
	if (!/\d{4}(\.|\/|\-)\d{1,2}(\.|\/|\-)\d{1,2}/.test(str)) {
		return false;
	}
	var r = str.match(/\d{1,4}/g);
	if (r == null) {
		return false;
	};
	var d = new Date(r[0], r[1] - 1, r[2]);
	return (d.getFullYear() == r[0] && (d.getMonth() + 1) == r[1] && d.getDate() == r[2]);
};
//校验时分
ChkUtil.isSf= function(str) {
	var patrn = /^\d{2}:\d{2}$/;
	return patrn.test(str);
};
//校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
ChkUtil.isString6_20 = function(str) {
	var patrn = /^(\w){6,20}$/;
	return patrn.test(str);
};
//校验字符串组合：只能输入6-20个字母+数字或下划线组合(常用手校验用户名和密码)
ChkUtil.isStringA6_20 = function(str) {
	var patrn = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i; /*用户名正则*/
	return patrn.test(str);
};
//身份证格式
ChkUtil.isCreditCard = function(str) {
	var patrn = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	return patrn.test(str);
};
//是否为空
ChkUtil.isNulCustl = function(str) {
	if (str == null || str == '') {
		return true;
	} else if (typeof(str) != "undefined") {
		return true;
	} else if (typeof(x) != "object") {
		return true;
	} else {
		return false;
	}
};
//身份证格式
ChkUtil.isCardID = function(sId){ 
	var iSum=0 ;
	var info="" ;
	if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误"; 
	sId=sId.replace(/x$/i,"a"); 
	sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法"; 
	for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	if(iSum%11!=1) return "你输入的身份证号非法"; 
	return true;
} 


//短时间，形如 (13:04:06)
ChkUtil.isTime = function(str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {
		return false
	}
	if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
		return false;
	}
	return true;
}

//短日期，形如 (2003-12-05)
// ChkUtil.isDate = function(str) {
// 	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
// 	if (r == null) return false;
// 	var d = new Date(r[1], r[3] - 1, r[4]);
// 	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
// }

//长时间，形如 (2003-12-05 13:04:06)
ChkUtil.isDateTime = function(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	var r = str.match(reg);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}