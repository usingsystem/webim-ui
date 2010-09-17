//
/* ui.notification:
*
options:
data [{}]
attributes：

methods:

destroy()
events: 

*/
app("notification", {
	init: function(options){
		var ui = this, im = ui.im, layout = ui.layout;
		var notificationUI = ui.notification = new webimUI.notification(null, options);
		var notification = im.notification = new webim.notification(null, {
			jsonp: im.options.jsonp
		});
		layout.addWidget(notificationUI, {
			title: i18n("notification"),
			icon: "notification",
			sticky: false,
			onlyIcon: true,
			isMinimize: true
		});
		///notification
		notification.bind("data",function( data){
			notificationUI.window.notifyUser("information", "+" + data.length);
			notificationUI.add(data);
		});
		setTimeout(function(){
			notification.load();
		}, 2000);  
	}
});

widget("notification",{
	template: '<div id="webim-notification" class="webim-notification">\
		<ul id=":ul"><%=list%></ul>\
			<div id=":empty" class="webim-notification-empty"><%=empty notification%></div>\
				</div>',
	tpl_li: '<li><a href="<%=link%>" target="<%=target%>"><%=text%></a></li>'
},{
	_init: function(){
		var self = this, element = self.element, options = self.options;
		var win = options.window;
		options.data && options.data.length && hide(self.$.empty);
		//self._initEvents();
	},
	template: function(){
		var self = this, temp = [], data = self.options.data;
		data && each(data, function(i, val){
			temp.push(self._li_tpl(val));
		});
		return tpl(self.options.template,{
			list:temp.join("")
		});
	},
	_li_tpl: function(data){
		return tpl(this.options.tpl_li, {
			text: data.text,
			link: data.link,
			target: data.isExtlink ? "_blank" : ""
		});
	},
	_fitUI:function(){
		var el = this.element;
		if(el.clientHeight > 300)
			el.style.height = 300 + "px";
	},
	add: function(data){
		var self = this;
		if(isArray(data)){
			each(data, function(i,val){
				self.add(val);
			});
			return;
		}
		var $ = self.$;
		hide($.empty);
		$.ul.appendChild(createElement(self._li_tpl(data)));
	},
	destroy: function(){
	}
});
