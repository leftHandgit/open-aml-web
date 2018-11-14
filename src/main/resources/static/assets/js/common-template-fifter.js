template.defaults.escape=false;
template.helper('statusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_status.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('userStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_user_status.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('channeFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_channel.forEach(function(n,i){
		if(n.value == val)str=n.name[language];
	});
   	return str
})

template.helper('par_operStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_operStatus.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('loginStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_operStatus.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('onlineStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_onlineStatus.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})




template.helper('dateFormat',function(val){
	var date =  new Date(val);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
})

template.helper('actionFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_action.forEach(function(n,i){
		if(n.value == val)str=n.name[language];
	});
   	return str
})

template.helper('jobStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_jobStatus.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('jobLogsStatusFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_jobLogsStatus.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})



template.helper('jobMisfirePolicyFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_jobMisfirePolicy.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('isDefaultFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_isDefault.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('configTypeFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_configType.forEach(function(n,i){
		if(n.value == val)str=n.name1[language];
	});
   	return str
})

template.helper('jobTriggerStateFormat',function(val){
	var str='';
	var language=lang.getLang();
	par_jobTriggerState.forEach(function(n,i){
		if(n.value == val)str=n.name[language];
	});
   	return str
})

template.helper('noData',function(val){
   	return lang.getData('noData');
})






