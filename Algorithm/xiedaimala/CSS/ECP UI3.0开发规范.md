ECPUI3.0开发规范
===
## 一、轻量化结构介绍
轻量化核心包的目录结构：
![图片]
###  1、src目录是存放轻量化框架的Servlet，主要有通用服务调用、处理主JS、CSS风格和国际化的Servlet
### 2、scripts主要用于存放js。里面分多目录，用于分类存储各功能的js
#### amdconfig目录：用于存放require.js的配置文件，配置文件名固定，amdconfig.js用于配置压缩脚本，		  amd.config.debug.js配置非压缩的脚本以在调试模式下使用
#### component目录：用于存放ECP组件，主要有打印、导入、导出、qzz表格等
#### i18n目录：用于存放国际化公共资源定义
#### plugins目录：用于存放第三方类库，包括jquery，require.js，bootstrap，angular等

### 3、template用于存放各类页面，对话框模板
### 4、themes用于存放风格，默认使用的是themes\default 目录的风格，在themes目录下，一个目录为一种风格
## 二、开发规范
由于轻量化前端框架提倡的高自由度，开放，低度封装的思想，所以在开发方面会有多少模式，这里只对使用amd模式和用require.js对js的加载进行管理的模式进行规范。
### 1、文件定义
在开发的过程中必需遵循下面两类型定义（具体可参考require.js的使用方法）的使用规则：

#### 功能模块（等同于功能类）
功能模块使用define([],function(){//方法})模型，在里面不提供直接运行的代码，只提供方法，并通过return返回给以其他引用的模块或控制器调用。样例：
```
	define(["jquery"],function($){
		var Example=function(control,options){
			this.init(control,options);
		}	
	})
	
	Example.prototype={
		init:function(control,options){
			// to do something	
		},
		render:function(){
			//to do something
		},
		method:function(param){
			// to do something	
		},
	};
		return Example;
或者：
	return {
		render:function(){
			var example=new Example(controls,options);
			example.render();
			}
		}
	});
```
#### 控制器（对应ECP前端2.0的控制器）
控制器使用require([],function(){//执行代码})模型，在里面必须有执行代码，当然也可以定义私有的方法。

```
	require(["example"],function(Example){
		var container = $(...)
		var options = {...}
		var param = {a:1,b:2}
		// 调用引入模块的方法（上面define第一种写法）
		var example1 = new Example(container,options);
		example1.render();
		example1.method(param);

		// 调用引入模块的方法（上面define的第二种..）
		var example2 = container.ecpExample(options);
		example2.render();
		example2.method(param);
	});
```
### 2、页面定义
#### JS模块引入
一个页面只可以有一个控制器，原来存在继承关系的，可以使用模块引入进行引入。在上面的两种类型定义里的[]进行模块引用。并在function()的()里面进行别名定义。在[]里可以使用多个引用，如：
> [''ecp.service","jq--dataTable","angular","select2","ecp.dialog"]
如果不带路径的引用，是根据amd.config目录里面的定义来确定的。每个web项目可以自己定义一个amd.config配置，可以配置，可以根据扩展点进行扩展。只需要和上面的核心框架的配置文件目录结构和名称相同就可以。目录为webcontent/scripts/amdconfig。
引入的例子如下：
> <script	data-main="example"		src="../../ecp/webcore/scripts/ecp.starter.js"></script>
一般防御body的最后一行里面。注：此处路径要为相对路径，即文件路径，即文件与bundle根目录相距几个层级，需在路径前面加相应数量的../

#### 样式引入
一个页面只可以引入一个CSS，而此CSS是固定引入模式，如下：
> <link	rel="stylesheet"	href="../ecp/webcore/themes/style.css"	id="main.css">
此style.css引入其实是调用了一个Servlet，会自动根据当前风格获取对应的样式

#### 组件引入
在页面中使用了非HTML的标准组件，需要引入对应的JS，可以在[]进行按需引入，在引入的同时，如果是按照require的path定义，会自动引入相应组件的CSS，如果没有require的path定义，需把CSS也进行引入

	
## 三、控制器实现命名规范
### 1、常用属性命名
按照js编程规范文档要求
### 2、常用方法命名
- 初始化方法：init
- 渲染方法：renderXxx
- 绑定事件：bindEvent
- 保存：saveXxx
- 新增：addXxx
- 修改：modifyXxx
- 删除：deleteXxx
- 查询：findXxx
### 3、事件绑定方法
统一用on方法绑定根据具体情况，在on之前用off解绑
### 4、模块返回对象
如果是控件或者组件，返回的对象必须有render方法		

## 四、样式规范
### 1、页面开发过程中，样式占据非常重要的位置，而在ECP轻量化平台方面，对样式进行了统一的规范。具体可以分为平台样式和非平台样式两种
### 2、平台样式规范
平台样式主要包括，颜色、字体、统一布局方面，根据页面布局和使用习惯，样式又分为如下：
- style.css 		bootstrap核心样式文件
- style-template.css	一些模板化的样式
- style-ecp.css	平台自定义的样式
- style-ecp-plugins.css		平台基础插件的样式
系统加载CSS默认只加载核心样式文件style.css，组件或页面需要的样式配置在themes文件夹下，由组件amdconfig配置或在define/require 依赖处引入。Themes文件夹按目录存各种风格的样式
### 3、非平台样式规范
非平台样式主要包括具体的布局，不应该包括颜色和字体，否则在进行更换风格的时候，会出现更换不彻底的现象。
页面HTML里面除引入平台主样式外，最多可以引入一个属于本产品的特殊样式，不可以引入多个样式。
### 4、叠加
利用样式的基本功能，非平台样式可以对平台样式进行叠加和覆盖。叠加和覆盖应该遵循非平台样式的规范，否则会影响整形的统一风格
### 5、差异处理
在编写样式的时候，需要考虑展示的终端，指定多终端支持的样式
### 6、样式设计资源
平台样式涉及的资源，固定目录，按照规范命名，确定是按钮图标，还是边线等。
## 五、皮肤规范
皮肤的定义是指涉及界面布局，页面控制等调整。相应的皮肤变化的差异进行，只有和基础平台样式存在差异的，才需要进行定制皮肤样式。
平台默认有一套皮肤，如果需要增加其他的皮肤，需按照皮肤规范进行开发。
根据OSGi Fragment Bundle 规范来进行皮肤扩展。发布的时候，一个程序支持一套对应的OSGi Fragment Bundle，也必须有一套OSGi Fragment Bundle。
## 六、风格规范
风格只包括样式文件，不包括图片，JS等资源。在轻量化框架里面，不同的风格的样式分别存储在不同的目录。可以根据上下文中的风格类型，来获取不同的风格，如果相关的控件有设计风格问题，也需要在风格目录里面保留对应的样式文件。
风格是平台统一规范和存放的。所以设计字体大小，配色方案的样式，一律引用公共风格，不可以自行定义。否则进行切换风格的时候，就存在缺失。
下面是两套风格的目录，其中目录名称就是风格名称
![图片]
## 七、组件规范
组件分为三类，一是平台组件，二是非平台组件，三是第三方组件。不管是哪类组件，在一个产品上使用，风格肯定要保持一致，所以针对不同的组件，需要完善相应的风格调整。
### 1、平台组件规范
平台组件会在require.js里面配置好，只要引入对应的组件名称，就会自动加载相关的js和css

一个标准的平台控件（包括业务组件，业务组件存放在各个业务项目里面），应该遵循下面的规范
- 存放在对应的目录（component目录）
- 并提供完整的单元测试
- 提供完整的使用文档
- 在require.js配置里配置好别名和css加载项
- 根据现有皮肤，分发好css

### 2 、非平台规范
非平台组件主要是指各产品自己开发或自己引入的组件，只用于本产品，不对外提供的，可以自行控制，但风格必需遵循统一标准。如果是对外提供的组件，需要遵循上面平台组件的规范。

### 3、第三方组件引入规范
这里的第三方组件只是由平台统一引入的第三方组件，引入的标准是不对原生组件进行js任何修改，只是作css的适应性调整，引入的方式由申请，经批准后进行引入，引入后需公布对应的使用文档和在requirejs配置好对应的别名及css加载项。
如果是产品组需要向平台提交第三方组件申请加入平台统一管理，流程和上面保持一致，需先申请，审批后由平台统一加入。
平台的第三方组件目录结构如下：
![图片]

## 八、国际化规范
## 九、双向绑定
### 1、绑定属性
平台提供页面与数据模型双向绑定的实现，使用方式同AngularJS，开发人员可两者选其一。AngularJS的模型绑定可参考相关文档，下面描述平台实现的双向绑定
- 页面元素配置ng-model属性与属性模型字段双向绑定
	<input type="text" id="txtName" ng-model="name"/>
- 页面元素配置ng-bind 属性单向绑定模型字段
	<input type="text" id="txtName" ng-bind="name"/>
- 页面元素配置ng-attr 属性设置所绑定模型的显示属性，目前支持value，innerHTML，innerText，不设置属性时默认value：
1、<span ng-attr="innerText" ng-bind="name">文本</span>
设置innerText，所绑定的name属性的值将替换元素innerText
2、<div ng-attr="innerHTML" ng-bind="title">标题</div>
设置innerHTML，所绑定模型name属性的值将替换元素innerHTML
3、<input ng-attr="value" type="text" id="txtName" ng-bind="name"/>
设置value或不设置，所绑定模型属性值会体现在元素的value属性上
- 页面元素设置ng-source设置模型绑定的数据源，用于支持页面绑定多个数据模型
<span ng-attr="innerText" ng-source="dsLocale" ng-model="page.sName">姓名</span>
声明ng-source 后，元素将与name为dsLocale的模型绑定，ng-model指定的是dsLocale的属性
### 2、如何使用双向绑定
- 引入"ecp.model"模块
- 创建数据源：
```
	require(["ecp.model"],function(){
		var dataSource=new ecpModel.DataSource();
	});
```
-  绑定数据模型到数据源
```dataSource.dataModel=model;```

- 触发数据源到页面元素绑定
```dataSource.bind($("#simpleDiv"));```
#### 其他使用方法
- 解除数据源到页面元素的绑定
```dataSource.unbind($("#simpleDiv"));```

#### 双向绑定使用样例
```	
	require(["ecp.service","ecp.model","i18n!nls/localepage"],function(ecp,ecpModel,curLocale){
		// 初始化数据
		var model = {name:"远光开发人员",age:28,sex:1,gz:100000};
		// 创建数据源
		var devDataSource = new ecpModel.DataSource();
		// 绑定数据模型
		devDataSource.dataModel = model;
		// 处理自定义模型在界面的展示
		// 参数e包括三个属性：sender（数据模型），attr（模型属性名称），value（模型属性的值）
		function onGetModel(e){
			// 显示界面需要把数字转换千分位显示，此处获取数据模型的值
			if(e.attr = 'gz'){
				var value = e.value;
				if(value){
				e.value=value.toFixed(2).toString().replace(/\d{1,3}(?=(\d{3}+(\.\d*)?$))/g,"$&");
				} 
			}
		}
			//处理自定义触发数据模型值的变动
			function onSetModel(e){
				// 界面控件值修改后，反向映射到数据模型的变动
				if(e.attr == "gz"){
					var value = e.value;
					if(value){
						value = value.toString().replace(/,/g,"");
						e.value = parseFloat(value);
					}
				}
			}
			// 控件自定义，适用于多个控件绑定到同一属性而显示值不一样时
			// 本样例中，txt和select都绑定到了sex，但txt要显示文本，而select需要值
			function onSetCtrl(e){
				var ctrl = e.sender;
				var id = ctrl.attr("id");
				if(id == "txtSex" || id == "txtSex2"){
					e.value = curLocale.data.sexEnum[e.value];
			}
		}
			// 将函数绑定到数据源的事件属性
			devDataSource.onGetModel = onGetModel;
			devDataSource.onSetModel = onSetModel;
			devDataSource.onSetCtrl = onSetCtrl;
			// 触发模型绑定界面渲染
			devDataSource.bind($("#simpleDiv"));
			// 新增另一个数据模型绑定
			var localeDs = new ecpModel.DataSource();
			localeDs.dataModel = curLocale; 
			// 界面绑定多个数据模型时，非缺省的数据类型，需要设置name属性值，对应界面元素ng-source属性
			localeDs.name = "dsLocale";
			localeDs.bind($("#simpleDiv"));
	});
```

## 十、上下文管理
前端提供了上下文工具类，在控制器引入"ecp.service"，上下文相关方法在DataContextUtil属性下。
上下文公布的方法有：
```
	
	// 获取ECP上下文JSON（去掉了登录上下文，只保留业务上下文） @return {String}	
	   	getEcpDataContextJson()
	
  	// 获取空上下文JSON，在不需要业务上下文的时候使用（减少参数长度） @return {String} 
	   	getEmptyEcpDataContextJson()
	
	// 获取空上下文对象 @return {object}
		getEcpDataContext();
	
	// 获取登录上下文属性（用户id）
	 	getLogContext().getUserId();
	
	// 获取登录上下文属性（用户名称）
		getLoginContext().getUserName();
	
	// 获取登录上下文属性（用户显示名称）
		getLoginContext().getDisplayName();
	
	// 获取登录上下文属性（用户登录单位id）
		getLoginContext().getLoginOrgId();
	
	// 获取登录上下文属性（用户登录单位名称）
		getLoginContext().getLoginOrgName();
	
	// 获取登录上下文属性（用户客户端IP）
		getLoginContext().getIp();
	
	// 获取登录上下文属性（用户登录时间）
		getLoginContext().getLoginDate();
	
	// 获取业务上下文对象 @return {object}
		getBusinessContext();
	
	// 获取上次登录成功的时间 @return java.util.date
		getLastLoginTime();
	
	// 获取上次登录时间描述 @return string
		getLastLoginDesc();
	
	// 创建空的上下文对象 @return {object}
		newEcpDataContext();
	
	// 创建空的登录上下文对象 @return {object}
		createLoginContext();
	
	// 创建空的业务上下文对象 @return {object}
		createBusinessContext();
	
	// 获取登录令牌ID @return {string}
		getTokenId();
	
```
使用方式代码样例：

```
	require(["ecp.service"],function(ecp){
		var dcUtil = ecp.DataCenterUtil();
		var userId = dcUtil.getLoginContext().getUserId();
		userName = dcUtil.getLoginContext().getUserName();
		compid = dcUtil.getLoginContext().getLoginId();
		compName = dcUtil.getLoginContext().getLoginOrgName();
		...	
	});
```
注：上下文提供了newEcpDataContext方法，在远程调用，接口方法参数有上下文对象，但不需要业务上下文时，使用此方法作为上下文参数传递，因登录上下文时服务端自动注入的，远程调用即使前端传递了登录上下文，服务端也不以此为准，使用newEcpDataContext可减少请求的长度，如果GET请求，参数需要上下文对象的，也请使用这个方法传递上下文，因上下文对象里面最后访问时间是一直变动的，若把整个上下文对象作为参数传递给服务端则不会达到缓存目的。

## 十一、远程调用
ECP3.0前端封装了远程调用服务接口，使用时，页面引用"ecp.service"，远程调用包含两种使用模式：
1、控制器需要调用同一场景的多个方法，避免重复书写场景字符串，先new远程对象（包含场景路径参数），再使用该远程对象的方法调用相关接口方法，使用样例：
```
	require(["ecp.service"],function(ecp){
		var queryService = new ecp.Remote("com.ygsoft.com.context.IXxxQueryContext");
		queryService.doPostAsync("method1",[params1],function(resp){
			// do callback
		});
		queryService.doPostAsync("method2",[params2],function(resp){
			// do callback
		})
	});
```
2、直接调用服务接口的方法，使用样例
```
	require(["ecp.service"],function(ecp){
		var remoteService = ecp.RemoteService();
		remoteService.doPostAsync("com.ygsoft.ecp.context.IXxxQueryContext","methodName",[params],function(resp){
			// do callback
		});
	});
```
远程调用提供GET和POST两种请求模式，包括两者的同步和异步请求，在使用远程调用的方法时，尽可能避免使用同步模式，同步请求阻塞js执行，降低用户体验
异步调用的方法：
doPostAsync,doGetAsync
同步调用的方法：
doPost,doGet
### 1、参数构造
调用服务端方法，传递方法参数时，参数以数组的方式包装，对象或数组类型不需要转JSON字符串，例如：
	method1有三个参数，第一个是VO对象ExamVO，第二个是普通类型String，第三个是数组，调用时方法参数构造如[examVoParam,strParam,[arrayElement1,arrayElement2]],对象类型需要指定jcls
```
	var paramVo = {
		jcls : "com.ygsoft.ecp.xxxcomponent.model.ExamVo";
		prop1 : 123;
		prop2 : "test"
	};
	var paramStr = "this is a test param";
	var paramArray = [param1,param2,param3];
	remoteService.doPostAsync("com.ygsoft.ecp.context.IXxxQueryContext","method1",[paramVo,paramStr,paramArray],function(resp){
		// do callback
	});
```
### 2、返回结果处理
远程异步调用返回结果在前端有封装处理，在获取返回结果前先判断请求结果状态
isError() 判断请求是否调用错误；
isSucess()判断请求是否调用成功
获取请求结果数据返回值的data属性
## 十二、异常处理
## 十三、单元测试


