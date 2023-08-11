/*!
 * @filename bitengine.js
 * @copyright 2014
 * @author kearlsaint@gmail.com
 * @projectName BitEngineJS
 * @projectType Javascript Library
 * @github http://github.com/kearlsaint/bitengine
 */

function BitEngine(){

	this.create = function(config){

		// check required parameters
		var t1 = "BitEngine: ",t2 = " required in BitEngine.init()";
		require(config.files,'',t1+"files[object]"+t2);
		require(config.canvas,'',t1+"canvas[object]"+t2);
		require(config.canvas.height,'',t1+"canvas.height[string,int]"+t2);
		require(config.canvas.width,'',t1+"canvas.width[string,int]"+t2);
		require(config.canvas.parent,'',t1+"canvas.parent[string(id)]"+t2);
		require(config.canvas.sections,'',t1+"canvas.sections[array]"+t2);
		require(config.render,'',t1+"render[object,function]"+t2);
		require(config.update,'',t1+"update[object,function]"+t2);
		require(config.onload,'',t1+"onload[function]"+t2);
		require(config.player,'',t1+"player[object]"+t2);
		require(config.score,'',t1+"score[object]"+t2);
		require(config.score.interval,'',t1+"score.interval[string,int]"+t2);
		require(config.score.update,'',t1+"score.update[function]"+t2);
		// load files
		var files  = config.files;
		var sounds = files.sounds;
		var images = files.images;
		var loaded = 0;
		var _this  = this;
		var handle = function(){
			loaded++;
			if(config.loader!==undefined){
				config.loader(loaded,(sounds.length+images.length));
			}
			if(loaded>=sounds.length+images.length){
				if(config.onload!==undefined){
					config.onload();
				}else{
					_this.start();
				}
				//_this.score.intervalID = setInterval(function(){
				var tempfn = function(){
					requestAnimationFrame(function(){
						_this.score.update();
						setTimeout(tempfn,_this.score.interval);
					});
				};
				tempfn();
				//},_this.score.interval);
			}
		};
		for(var s=0; s<sounds.length; s++){
			var path = sounds[s];
			var name = path.replace(/\\/g, '/');
					name = name.substring(name.lastIndexOf('/')+1,name.lastIndexOf('.'));
			this.sounds[name] = new Audio(path);
			this.sounds[name].addEventListener("canplaythrough",handle);
		}
		for(var i=0; i<images.length; i++){
			var path = images[i];
			var name = path.replace(/\\/g, '/');
					name = name.substring(name.lastIndexOf('/')+1,name.lastIndexOf('.'));
			this.images[name] = new Image();
			this.images[name].addEventListener("load",handle);
			this.images[name].src = path;
		}
		
		// canvas configurations
		var canvas = {
			height:480,
			width:640,
			parent:document.getElementById(config.canvas.parent)
		};
		if(config.canvas.height==="screen" || config.canvas.height==="auto"){
			canvas.height = window.innerHeight || window.outerHeight || canvas.height;
		}else if(!isNaN(parseInt(config.canvas.height))){
			canvas.height = config.canvas.height>>0;
		}
		if(config.canvas.width==="screen" || config.canvas.width==="auto"){
			canvas.width = window.innerWidth || window.outerWidth || canvas.width;
		}else if(!isNaN(parseInt(config.canvas.width))){
			canvas.width = config.canvas.width>>0;
		}
		for(var i=0; i<config.canvas.sections.length; i++){
			var cname = config.canvas.sections[i];
			var ctemp = document.createElement("canvas");
			ctemp.width = canvas.width;
			ctemp.height = canvas.height;
			ctemp.id = "BitEngine-Canvas-"+cname;
			canvas.parent.appendChild(ctemp);
			this.canvas[cname] = ctemp;
		}
		
		this.render = config.render;
		
		this.update = config.update;
		
		this.player = config.player;
		
		this.score  = config.score;
		
		// event listeners
		if(typeof config.listeners === "object"){
			for(var key in config.listeners){
				canvas.parent.addEventListener(key,config.listeners[key],false);
			}
		}

	};

	this.sounds = {};
	
	this.images = {};
	
	this.start = function(){
		var _this = this;
		var _core = function(){
			// time-based animation
			if(_this.time.last===undefined){
				_this.time.last = new Date().getTime();
				_this.time.rem  = 0;
				_this.time.fps  = 1e3/3e1; // 3e1fps
			}
			var last = _this.time.last;
			var now  = new Date().getTime();
			var passed = now-last;
			var rem  = _this.time.rem + passed;
			var fps  = _this.time.fps;
			_this.time.last = now;
			/*if(window.stop===true)return;
			if(rem>=fps){
				while(rem>=fps){
					_this.calculate();
					rem -= fps;
				}
			}else{
				_this.calculate();
			}*/
			_this.calculate();
			_this.renderAll();
			//requestAnimationFrame(_core);
		};
		// execute
		// _core();
		setInterval(function(){
			requestAnimationFrame(_core);
		},1e3/3e1);
		
	};
	
	this.calculate = function(){
		if(typeof this.update === "object"){
			for(var name in this.update){
				this.update[name](this);
			}
		}else{
			this.update(this);
		}
		return true;
	}
	this.renderAll = function(){
		if(typeof this.render === "object"){
			for(var name in this.canvas){
				var cv = this.canvas[name];
				var ct = cv.getContext("2d");
				var rn = this.render[name];
				cv.width = cv.width;
				rn(rn,ct);
			}
		}else{
			this.render(this);
		}
		return true;
	};
	this.canvas = {};
	
	this.time = {};
	
	this.keyCodes = {
		esc:27,
		n0:48,
		n1:49,
		n2:50,
		n3:51,
		n4:52,
		n5:53,
		n6:54,
		n7:55,
		n8:56,
		n9:57,
		left:37,
		up:38,
		right:39,
		down:40
	}
}



/* a simple require function */
function require(v,c,t){
	t = " " + (t||"is not a function!");
	if(typeof window[v] === "undefined" && typeof v === "undefined"){
		throw v+t;
	}else{
		if(typeof c === "function" || typeof c === "object"){
			c(window[v]);
		}else{
			return true;
		}
	}
};