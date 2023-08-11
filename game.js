/*!
 * @filename game.js
 * @copyright 2014
 * @author kearlsaint@gmail.com
 * @projectName NyanKitty
 * @projectSite http://nyankitty.parseapp.com/
 * @github http://github.com/kearlsaint/nyankitty/
 */
if(typeof require !== "function"){
	/* a simple require function */
	window.require = function(v,c,t){
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
}

require('BitEngine',function(BitEngine){

	"use strict";

	// Create the game!
	var Kitty = new BitEngine();
	Kitty.fn = new Object();
	Kitty.fn.fly = function(){
		if(Kitty.player.started===true&&Kitty.player.paused===false&&Kitty.player.allover===false){
			Kitty.render.player.cat.speed = -6;
			Kitty.render.player.cat.velocity = Kitty.render.player.cat.ovelocity;
		}
	}
	Kitty.fn.gotHit = function(){
		
		// check the time from last hit
		var now = new Date().getTime();
		// last hit was 2 secs ago?
		if(now-Kitty.player.gothit > 2e3){
			// remove 1 life
			Kitty.player.lives--;
			// change the gothit time
			Kitty.player.gothit = new Date().getTime();
			// easy access to vars
			var cat = Kitty.render.player.cat;
			var img = Kitty.images;
			var lives = Kitty.player.lives;
			Kitty.fn.checkScore();
			if(lives>=0){
				// change to techno cat(invisible for 2 seconds)
				cat.owidth  = 1753/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_techno;
				cat.frames  = 12;
				// update the ui
				document.getElementById("UI-Info-Lives").innerHTML = lives;
			}else{
				// game over nab
				Kitty.player.started = false;
				Kitty.player.paused  = true;
				Kitty.player.allover = true;
				var d = function(i){return document.getElementById(i)};
				var score = Kitty.player.score;
				var update = function(txt,gif){
					d("UI-FinalRank").innerHTML = txt;
					d("UI-FinalRankImage").innerHTML = "\u003cimg src=\"game\/sprites\/gif\/"+gif+".gif\"\/\u003e";
				};
				// hide info
				d("UI-Pause").className = d("UI-Info").className = "hidden";
				// check rank
				if(score<15) update("kitty","balloon");
				if(score>=15) update("meh","sad");
				if(score>=30) update("good","technyancolor");
				if(score>=60) update("star","star2");
				if(score>=90) update("ninja","ninja");
				if(score>=120) update("gamer","gb");
				if(score>=210) update("pro","jazz");
				if(score>=300) update("addict","dub");
				if(score>=420) update("wtf","tacnayn");
				if(score>=600) update("god","nyancoin");
				// update score
				d("UI-FinalScore").innerHTML = score;
				d("UI-NewBest").className = "hidden";
				// save score
				if(!window.localStorage.score){
					window.localStorage.score = 0;
				}
				// check if it's a new highscore
				if(window.localStorage.score<score){
					window.localStorage.score = score;
					d("UI-NewBest").className = "shown";
					d("UI-BestScore").innerHTML = score;
				}else{
					d("UI-BestScore").innerHTML = window.localStorage.score;
				}
				// show ui
				d("UI-GameOver").className = "shown";
			}
		}

	};
	Kitty.fn.checkScore = function(){
		var cat = Kitty.render.player.cat;
		var img = Kitty.images;
		var lives = Kitty.player.lives;
		var score = Kitty.player.score;
		var change = function(fn){
			//setTimeout(requestAnimationFrame,2e3,fn);
			requestAnimationFrame(fn);
		};
		if(score>=600){
			// omfg
			change(function(){
				cat.owidth  = 1603/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_dub;
				cat.frames  = 12;
			});
		}else if(score>=420){
			// cat maybe a vampire
			change(function(){
				cat.owidth  = 1752/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_vampire;
				cat.frames  = 12;
			});
		}else if(score>=300){
			// -_-
			change(function(){
				cat.owidth  = 1718/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_dub;
				cat.frames  = 12;
			});
		}else if(score>=210){
			// woah man
			change(function(){
				cat.owidth  = 1752/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_getover;
				cat.frames  = 12;
			});
		}else if(score>=120){
			// what a gamer
			change(function(){
				cat.owidth  = 1752/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_gb;
				cat.frames  = 12;
			});
		}else if(score>=90){
		//}else if(lives>=12){
			// 12 up lives damn that guy is a star
			change(function(){
				cat.owidth  = 1749/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_ninja;
				cat.frames = 12;
			});
		}else if(score>=60){
			// what a star
			change(function(){
				cat.owidth  = 1586/11;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_star;
				cat.frames = 11;
			});
		//}else if(lives>=10 && lives<=11){
			// this guy is a ninja || retro cat
			/*change(function(){
				cat.owidth  = 925/6;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_retro;
				cat.frames  = 6;
			});
			// change to cat_valentine
			change(function(){
				cat.owidth  = 1749/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_valentine;
				cat.frames  = 12;
			});*/
		}else if(score>=30){
		//}else if(lives>=8&&lives<=9){
			// normal cat
			/*change(function(){
				cat.owidth  = 922/6;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_normal;
				cat.frames  = 6;
			});*/
			// technyancat
			change(function(){
				cat.owidth  = 1753/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_techno;
				cat.frames  = 12;
			});
		}else if(score>=15){
		//}else if(lives>=6&&lives<=7){
			// bored cat
			change(function(){
				cat.owidth  = 905/6;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_boring;
				cat.frames  = 6;
			});
		}else{ //score<15
			// normal cat
			change(function(){
				cat.owidth  = 922/6;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_normal;
				cat.frames  = 6;
			});
		}
		/*}else if(lives>=4&&lives<=5){
			// retro cat
			change(function(){
				cat.owidth  = 925/6;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_retro;
				cat.frames  = 6;
			});
		}else if(lives>=2&&lives<=3){
			// retro cat
			change(function(){
				cat.owidth  = 1749/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_mummy;
				cat.frames  = 12;
			});
		}else if(lives>=0&&lives<=1){
			// almost dead, change to zombiecat
			change(function(){
				cat.owidth  = 1749/12;
				cat.oheight = 90;
				cat.width   = Math.round(cat.owidth/3);
				cat.height  = 30;
				cat.image   = img.cat_zombie;
				cat.frames  = 12;
			});
		}else{
			// dead, change to balloon cat
			cat.owidth  = 1100/12;
			cat.oheight = 180;
			cat.width   = Math.round(cat.owidth*4/10);
			cat.height  = Math.round(cat.oheight*4/10);
			cat.image   = img.cat_balloon;
			cat.frames  = 12;
		}*/
	};
	Kitty.create({
		files:{
			sounds:[/*"game/sounds/nyan.mp3"*/],
			images:[
				"game/sprites/gif/nyancoin.gif",
				"game/sprites/gif/tacnayn.gif",
				"game/sprites/gif/dub.gif",
				"game/sprites/gif/jazz.gif",
				"game/sprites/gif/gb.gif",
				"game/sprites/gif/star2.gif",
				"game/sprites/gif/nyaninja.gif",
				"game/sprites/gif/technyancolor.gif",
				"game/sprites/gif/sad.gif",
				"game/sprites/gif/balloon.gif",
				"game/sprites/twinkle.png",
				"game/sprites/cat_normal.png",
				"game/sprites/cat_balloon.png",
				"game/sprites/cat_boring.png",
				"game/sprites/cat_coin.png",
				"game/sprites/cat_dub.png",
				"game/sprites/cat_gb.png",
				"game/sprites/cat_getover.png",
				"game/sprites/cat_mummy.png",
				"game/sprites/cat_ninja.png",
				"game/sprites/cat_retro.png",
				"game/sprites/cat_star.png",
				"game/sprites/cat_techno.png",
				"game/sprites/cat_valentine.png",
				"game/sprites/cat_vampire.png",
				"game/sprites/cat_zombie.png",
				"game/sprites/firesteam.png",
				"game/sprites/asteroid.png",
				"game/sprites/rainbow.png",
				"game/sprites/textures.png",
			]
		},
		canvas:{
			height:sc.height,
			width:sc.width,
			parent:"UI-Game",
			sections:["background","enemies","player"]
		},
		render:{
			background:function(_this,context){
				for(var name in _this){
					for(var i=0; i<_this[name].length; i++){
						_this[name][i].draw();
					}
				}
			},
			player:function(_this,context){
				if(Kitty.player.started===true){
					_this.cat.draw();
				}
			},
			enemies:function(_this,context){
				if(Kitty.player.started===true){
					for(var name in _this){
						for(var i=0; i<_this[name].length; i++){
							_this[name][i].draw();
						}
					}
				}
			}
		},
		update:{
			main:function(_this){
				if((Kitty.player.paused!==true&&Kitty.player.started===true)
				|| (Kitty.player.paused===true&&Kitty.player.started!==true)){
					// update the background
					for(var name in _this.render.background){
						for(var i=0; i<_this.render.background[name].length; i++){
							_this.render.background[name][i].update();
						}
					}
				}
				// update the player
				if(Kitty.player.paused!==true){
					_this.render.player.cat.update();
					// update the enemies
					for(var name in _this.render.enemies){
						for(var i=0; i<_this.render.enemies[name].length; i++){
							_this.render.enemies[name][i].update();
						}
					}
				}
			}
		},
		player:{
			pos:{x:0,y:0},
			paused:true,
			started:false,
			allover:false,
			score:0,
			lives:0,
			gothit:0,
			achieve:'newbie'
		},
		loader:function(current,total){
			var loaded = Math.round((current/total)*100);
			var loader = document.getElementById("UI-Preloader");
			if(loaded<100){
				loader.className = "shown";
			}else{
				loader.className = "hidden";
			}
			loader.innerHTML = "Loading "+loaded+"%";
		},
		onload:function(){
			/* iOS recommendation */
			//if((window.Browser.iPod===true||window.Browser.iPad===true)&&window.Browser.AppMode===false){
			//	return;
			//}

			/* Player config checks */
			(function(config,$){
				// storage cant be undefined since there's a shim for it
				/*if(config.name===undefined){
					// ask user for name
					var fn = function(e){
						e.preventDefault();
						// check if name isn't empty
						var name = $("UIInput-Name").value;
						name = name.replace(/^[^a-z]+|[^\s\w:.-]+/gi, "");
						if(name.length>0){
							// save info
							config.name = name;
							// hide dialog
							$("UI-NameInput").className = "hidden";
							// show thE menu
							$("UI-Menu").className = "shown";
						}
					};
					$("UI-NameInput").className = "shown";
					$("UIInput-Name").addEventListener("keyup",function(e){
						e.preventDefault();
						var n = this.value;
						this.value = n.replace(/^[^a-z]+|[^\s\w:.-]+/gi, "");
					},false);
					//$("UIInput-Name").focus();
					$("UIButton-AcceptName").addEventListener("mousedown",fn,false);
					$("UIButton-AcceptName").addEventListener("touchstart",fn,false);
				}else{*/
					// show thE menu
					$("UI-Menu").className = "shown";
				//}
			})(window.localStorage||undefined,function(i){return document.getElementById(i)});
			// event listeners
			-function(window,document,$){
				var startGame = function(e){
					e.preventDefault();
					$("UI-Menu").className = "hidden";
					Kitty.player.started = true;
					var loader = $("UI-Loader");
					var tempfn = function(cd){
						loader.innerHTML = "Ready in " + cd;
						if(cd===0){
							$("UI-Info").className = $("UI-Pause").className = "shown";
							loader.className = "hidden";
							Kitty.player.paused = false;
						}else{
							setTimeout(tempfn,1e3,cd-1);
						}
					};
					// move the cat to default position
					Kitty.render.player.cat.y = sc.height-(Kitty.render.player.cat.height/2)-52;
					Kitty.render.player.cat.velocity = Kitty.render.player.cat.speed = 0;
					// show loader
					loader.innerHTML = "Ready in 3";
					loader.className = "shown";
					setTimeout(tempfn,1e3,2);
				};
				var restartGame = function(e){
					e.preventDefault();
					// hide menues
					$("UI-PauseMenu").className = $("UI-GameOver").className = "hidden";
					Kitty.player.started = true;
					var loader = $("UI-Loader");
					var tempfn = function(cd){
						loader.innerHTML = "Ready in " + cd;
						if(cd===0){
							$("UI-Info").className = $("UI-Pause").className = "shown";
							loader.className = "hidden";
							Kitty.player.paused = false;
						}else{
							setTimeout(tempfn,1e3,cd-1);
						}
					};
					var cat = Kitty.render.player.cat;
					// move the cat to default position
					cat.y = sc.height-(cat.height/2)-52;
					cat.velocity = cat.speed = 0;
					// change cat to default cat
					cat.owidth  = 922/6;
					cat.oheight = 90;
					cat.width   = Math.round(cat.owidth/3);
					cat.height  = 30;
					cat.image   = Kitty.images.cat_normal;
					cat.frames  = 6;
					// add a full display width to all enemies' x position
					for(var name in Kitty.render.enemies){
						for(var i=0; i<Kitty.render.enemies[name].length; i++){
							Kitty.render.enemies[name][i].x += sc.width + Kitty.render.enemies[name][i].width;
						}
					}
					// reset player configs
					Kitty.player.allover = false;
					Kitty.player.score   = 0;
					Kitty.player.lives   = 0;
					Kitty.player.gothit  = 0;
					// show loader
					loader.innerHTML = "Ready in 3";
					loader.className = "shown";
					setTimeout(tempfn,1e3,2);
				};
				var pauseGame = function(e){
					e.preventDefault();
					if(Kitty.player.paused!==true&&Kitty.player.allover!==true){
						$("UI-PauseMenu").className = "shown";
						Kitty.player.paused = true;
					}
				};
				var resumeGame = function(e){
					e.preventDefault();
					$("UI-PauseMenu").className = "hidden";
					var loader = $("UI-Loader");
					var tempfn = function(cd){
						loader.innerHTML = "Back in " + cd;
						if(cd===0){
							loader.className = "hidden";
							Kitty.player.paused = false;
						}else{
							setTimeout(tempfn,1e3,cd-1);
						}
					};
					loader.innerHTML = "Back in 3";
					loader.className = "shown";
					setTimeout(tempfn,1e3,2);
				};
				var viewInstructions = function(e){
					e.preventDefault();
					$("UI-Instructions").className = "shown";
				};
				var closeInstructions = function(e){
					e.preventDefault();
					$("UI-Instructions").className = "hidden";
				};
				var toggleSound = function(e){
					e.preventDefault();
					if(this.className==="active"){
						this.className = "";
						// stop sound
						Kitty.bgMusic.pause();
						Kitty.bgMusic.currentTime = 0;
					}else{
						this.className = "active";
						// play sound
						Kitty.bgMusic.play();
					};
				};
				// event listeners
				//require('FastClick',function(f){
					//f.attach(document.getElementById("UI-Menus"));
				//},'FastClick library missing!');
				var addEvent = function(el,fn){
					el.addEventListener("mousedown",fn,false);
					el.addEventListener("touchstart",fn,false);
				};
				addEvent($("UIButton-Play"),startGame);
				addEvent($("UIButton-Retry"),restartGame);
				addEvent($("UIButton-Restart"),restartGame);
				addEvent($("UIButton-Help"),viewInstructions);
				addEvent($("UIButton-GoHelp"),viewInstructions);
				addEvent($("UIButton-CloseHelp"),closeInstructions);
				addEvent($("UIButton-Pause"),pauseGame);
				addEvent($("UIButton-Resume"),resumeGame);
				addEvent($("UIButton-Sound"),toggleSound);
				document.body.addEventListener("keydown",function(e){/*e.preventDefault();*/Kitty.fn.fly()},false);
				// prevent overscrolling
				document.body.addEventListener("touchmove",function(e){e.preventDefault();});
				// change the background according to user's time
				var hour = new Date().getHours();
				var uicv = $("UI");
				if(hour<=3) uicv.className = "Midnight";
				if(hour>=4&&hour<=7) uicv.className = "Dawn";
				if(hour>=8&&hour<=11) uicv.className = "Morning";
				if(hour>=12&&hour<=15) uicv.className = "Noon";
				if(hour>=16&&hour<=19) uicv.className = "Afternoon";
				if(hour>=20&&hour<=23) uicv.className = "Night";
			}(window,document,function(i){return document.getElementById(i)});
			var winh = sc.height;
			var winw = sc.width;
			var speed = 4;
			// starry skies
			-function(winh,winw){
				var star = 8 + Math.round(Math.random()*8);
				var dist = Math.round(winh/star);
				Kitty.render.background.stars = new Array();
				for(var s=0; s<star; s++){
					var x = Math.round(Math.random()*winw);
					var y = (dist*s) - Math.round(dist/2);
					var n = Math.round(4+Math.random()*4);
					var d = Math.round(2*n);
					Kitty.render.background.stars.push(new Star(x,y,d,d,Kitty.images.twinkle,n/4,Kitty.canvas.background.getContext("2d")));
				}
			}(winh,winw);
			// spiky mountain background
			-function(winh,winw,speed){
				var cw = 108;
				var ch = 64;
				var cx = 144;
				var cy = 64;
				var tx, ty;
				var tw = 128;
				var th = 32;
				var chunks = Math.round(winw*2/tw);
				ty = winh-56-(th/2);
				Kitty.render.background.spikes = new Array();
				for(var c=0; c<chunks; c++){
					tx = Math.round(c*tw/2 + (Math.random()*(tw/4)*(Math.random()>.5?-1:1))) * 2;
					Kitty.render.background.spikes.push(new Drawable(
						Kitty.images.textures,
						Kitty.canvas.background.getContext("2d"),
						tx,ty,tw+Math.round(tw/(1+Math.round(Math.random()*4))),th+Math.round(th/(1+Math.round(Math.random()*4))),cw,ch,cx,cy,0,speed/2,
						function(){
							// move the rock -speed
							var winw = sc.width;
							if(this.x+(this.width/2)<=0){
								this.x = Math.round(winw-this.x-32 + this.width/3);
							}else{
								this.x-=this.speed;
							}
						}
					));
				}
			}(winh,winw,speed);
			// rocky planet @ screenHeight-32
			-function(winh,winw,speed){
				var cw = 1024;
				var ch = 64;
				var cx = 0;
				var cy = 0;
				var tx, ty;
				var chunks = (winw/512)+1;
				var tw = 1024;
				var th = 64;
				ty = winh-32;
				Kitty.render.background.planet = new Array();
				for(var c=0; c<chunks; c++){
					tx = c*tw/2;
					Kitty.render.background.planet.push(new Drawable(
						Kitty.images.textures,
						Kitty.canvas.background.getContext("2d"),
						tx,ty,tw,th,cw,ch,cx,cy,0,speed,
						function(){
							// move the rock -speed
							var winw = sc.width;
							if(this.x+(this.width/2)<=0){
								this.x = winw-this.x-32;
							}else{
								this.x-=this.speed;
							}
						}
					));
				}
			}(winh,winw,speed);
			// killer spikes
			/*-function(winh,winw,speed){
				var cw = 144;
				var ch = 512;
				var cx = 0;
				var cy = 64;
				var tx, ty;
				var chunks = Math.round(winw/2/cw);
				var tw = 133;
				var th = 512;
				var ty;
				var sp = cw*1.5;
				Kitty.render.enemies.poisonstones = new Array();
				for(var c=0; c<chunks; c++){
					var tth = Math.round(th*(0.1+Math.random()*0.3));
					tx = c*sp;
					ty = winh-42-(tth/2);
					Kitty.render.enemies.poisonstones.push(new Drawable(
						Kitty.images.firesteam,
						Kitty.canvas.enemies.getContext("2d"),
						tx,ty,tw,tth,cw,ch,cx,cy,0,speed,
						function(){
							// move the rock -speed
							var winh = sc.height;
							var winw = sc.width;
							if(this.x+(this.width/2)<=0){
								// new height
								this.height = Math.round(th*(0.1+Math.random()*0.3));
								this.y = winh-42-(this.height/2);
								this.x = Math.round(winw-this.x-32 + this.width/3);
							}else{
								this.x-=this.speed;
							}
						}
					));
				}
			}(winh,winw,speed);*/
			// poisonous stones
			-function(winh,winw,speed){
				// stone 1: 300, 100 | h: 188 w: 128 | surface: 14 | side: 8
				// stone 2: 450, 100 | h: 288 w: 128 | surface: 10 | side: 8
				// stone 3: 600, 100 | h: 416 w: 128 | surface: 8  | side: 8
				// maxheight:4 = height -base:45 -space:134
				var mx = (winh -45 -128)/4;
				var mh = [mx*1,mx*2,mx*3];
				var cw = [128,128,128];
				var ch = [188,288,416];
				var cx = [300,450,600];
				var cy = [100,100,100];
				var tx, ty, th, ct;
				var tw = 64;
				var sp = 192;
				var chunks = Math.round(sc.width / sp) + 2;
				Kitty.render.enemies.poisonstones = new Array();
				for(var c=0; c<chunks; c++){
					ct = Math.round(Math.random()*2);
					//th = (ch[ct]/2);
					th = mh[ct];
					tx = sc.width + c*sp + (tw/2);
					ty = sc.height-45-(th/2);
					// bottom blocks
					Kitty.render.enemies.poisonstones.push(new Drawable(
						Kitty.images.textures,
						Kitty.canvas.enemies.getContext("2d"),
						tx,ty,tw,th,cw[ct],ch[ct],cx[ct],cy[ct],0,speed,
						function(){
							// move the rock -speed
							var winh = sc.height;
							var winw = sc.width;
							if(this.x+(this.width/2)<=0){
								// new pick
								var mx = (winh -45 -128)/4;
								var mh = [mx*1,mx*2,mx*3];
								var cw = [128,128,128];
								var ch = [188,288,416];
								var cx = [300,450,600];
								var cy = [100,100,100];
								var ct = Math.round(Math.random()*2);
								//var th = (ch[ct]/2);
								var th = mh[ct];
								var tw = cw[ct]/2;
								var tx = sc.width + (tw/2) + 160;
								var ty = sc.height-45-(th/2);
								var hs = 0;
								var oi = 0;
								// check all poisonstones and check which has the higher x value
								// check also it's partner at the top
								for(var i=0; i<Kitty.render.enemies.poisonstones.length; i++){
									if(hs < Kitty.render.enemies.poisonstones[i].x){
										hs = Kitty.render.enemies.poisonstones[i].x;
									}
									if(Kitty.render.enemies.poisonstones[i].x+10 > this.x
									&& Kitty.render.enemies.poisonstones[i].x-10 < this.x){
										oi = Kitty.render.enemies.poisonstones[i];
									}
								}
								// spacing 192 - the current offset from right edge
								tx =192 + hs;
								oi.owidth  = this.owidth  = cw[ct];
								this.oheight = ch[ct];
								oi.oheight = ch[2-ct];
								this.ox    = cx[ct];
								oi.ox      = cx[2-ct] + 500;
								this.oy    = cy[ct];
								oi.oy      = cy[2-ct];
								oi.width   = this.width   = tw;
								this.height = th;
								//oi.height  = (ch[2-ct]/2);
								oi.height  = mh[2-ct];
								oi.x       = this.x       = tx;
								this.y     = ty;
								//oi.y       = (ch[2-ct]/2)/2;
								oi.y       = oi.height/2;
							}else{
								this.x-=this.speed;
							}
							// check collision
							if(detectCollisionAtBottom(this,Kitty.render.player.cat) === true){
								Kitty.fn.gotHit();
							}
						}
					));
					// top blocks
					// currentX + 500
					Kitty.render.enemies.poisonstones.push(new Drawable(
						Kitty.images.textures,
						Kitty.canvas.enemies.getContext("2d"),
						tx,(mh[2-ct]/2),tw,mh[2-ct],cw[2-ct],ch[2-ct],cx[2-ct]+500,cy[2-ct],0,speed,
						function(){
							// move the rock -speed
							var winh = sc.height;
							var winw = sc.width;
							this.x-=this.speed;
							if(detectCollisionAtTop(this,Kitty.render.player.cat) === true){
								Kitty.fn.gotHit();
							}
						}
					));
				}
			}(winh,winw,speed);
			// some asteroids
			-function(winh,winw,speed){
				winh-=96; // the planet surface
				var cw = 32;
				var ch = 32;
				var cx = 0;
				var cy = 0;
				var tx, ty;
				var tw = 32;
				var th = 32;
				var fn;
				var chunks = Math.round((winh/2)/(tw*2));
				var sp = Math.round(winh/chunks);
				Kitty.render.enemies.asteroids = new Array();
				for(var c=0; c<=chunks; c++){
					ty = Math.round(c*sp + (th/2));
					tx = Math.round(winw + Math.random()*winw/2 + (tw/2));
					fn = function(){
						// animate
						if(this.flag===false) this.frame++;
						this.flag = !this.flag;
						if(this.frame>=this.frames){
							this.frame = 0;
						}
						// move the rock -speed
						var winh = sc.height;
						var winw = sc.width;
						if(this.x+(this.width/2)<=0){
							// new position
							this.x = Math.round(winw + Math.random()*(winw));
							// new shift in y
							//this.y = Math.round((winh/2) + ((winh/2)-128)*Math.random());
							// new size
							this.width = this.height = 32 + Math.round(Math.random()*4);
						}else{
							this.x-=this.speed;
						}
						// check collision
						if(detectCollisionAtBottomFromCircle(this,Kitty.render.player.cat) === true){
							Kitty.fn.gotHit();
						}
					};
					Kitty.render.enemies.asteroids.push(new Drawable(
						Kitty.images.asteroid,
						Kitty.canvas.enemies.getContext("2d"),
						tx,ty,tw,th,cw,ch,cx,cy,8,speed*1.25,fn
					));
				}
			}(winh,winw,speed);
			
			// create the cat running @ planet
			-function(winh,winw,speed){
				var cw = 922/6;
				var ch = 90;
				var cx = Math.round(winw*.2);
				//var cy = (winh/2)-(ch/2);
				var cy = winh-(cw/2)-48;
				Kitty.render.player.cat = new Drawable(Kitty.images.cat_normal,Kitty.canvas.player.getContext("2d"),cx,cy,cw/3,ch/3,cw,ch,0,0,6,speed,function(){
					var winh = sc.height;
					if(this.flag===false) this.frame++;
					this.flag = !this.flag;
					if(this.frame>=this.frames){
						this.frame = 0;
					}
					this.y += Math.round(this.speed*100)/100;
					if(this.speed<8){
						this.speed += this.velocity;
					}
					if(this.y-(this.height/2)<=0){
						this.y = 1 + this.height/2;
						this.speed = 0;
						//this.speed = -this.ospeed;
					}else if(this.y+(this.height/2)>winh-52){
						this.y = winh-(this.height/2)-52;
						this.velocity = this.speed = 0;
					}
				});
				Kitty.render.player.cat.velocity = Kitty.render.player.cat.ovelocity = 1;
			}(winh,winw,speed);
			Kitty.start();
		},
		listeners:{
			mousedown:function(e){e.preventDefault();Kitty.fn.fly()},
			touchstart:function(e){e.preventDefault();Kitty.fn.fly()},
			keydown:function(e){e.preventDefault();Kitty.fn.fly()}
		},
		score:{
			interval:1e3,
			update:function(){
				if(Kitty.player.paused===false){
					Kitty.fn.checkScore();
					Kitty.player.score++;
					document.getElementById("UI-Info-Score").innerHTML = Kitty.player.score;
				}
			}
		}
	});
	// a single mp3 file for background music
	Kitty.bgMusic = new Audio("game/sounds/gb.mp3");
	Kitty.bgMusic.load();
	Kitty.bgMusic.autoplay = false;
	Kitty.bgMusic.preload = true;
	window.Kitty = Kitty;
});


/**
 * Abstract functions
 */
function Star(x,y,width,height,image,speed,context){
	// default vars
	this.x = x;
	this.y = y;
	this.width = width||32;
	this.height = height||32;
	this.randomness = 16 + Math.round(Math.random()*16);
	this.flag  = !0;
	this.frame = 0;
	this.speed = speed||4;
	this.context = context||document.createElement("canvas").getContext("2d");
	this.image = image||new Image();
	this.draw  = function(){
		var sf = this.frame;
		var sw = 32;
		var sh = 32;
		var sx = sf * sw;
		var sy = 0;
		var dx = this.x - this.width/2;
		var dy = this.y - this.height/2;
		var dw = this.width;
		var dh = this.height;
		// draw the star
		if(sf<6){
			this.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
		}
	};
	this.update = function(){
		this.x -= this.speed;
		if(this.flag===false){
			this.frame++;
		}
		this.flag = !this.flag;
		var winw = sc.width;
		if(this.x+this.width<0){
			this.x = winw+this.width;
		}
		if(this.frame>=this.randomness){
			this.frame = 0;
		}
	};
}
function Drawable(image,context,x,y,width,height,originalWidth,originalHeight,originalX,originalY,frames,speed,update){
		// default vars
	this.x = x;
	this.y = y;
	this.ox = originalX||0;
	this.oy = originalY||0;
	this.width = width||32;
	this.height = height||32;
	this.owidth = originalWidth||32;
	this.oheight = originalHeight||32;
	this.frames  = frames||4;
	this.frame   = 0;
	this.flag  = !0;
	this.speed = speed>>0;
	this.ospeed = speed>>0;
	this.context = context||document.createElement("canvas").getContext("2d");
	this.image = image||new Image();
	this.draw  = function(){
		var sf = this.frame;
		var sw = this.owidth;
		var sh = this.oheight;
		var sx = this.ox + (sf * sw);
		var sy = this.oy;
		var dx = this.x - this.width/2;
		var dy = this.y - this.height/2;
		var dw = this.width;
		var dh = this.height;
		// draw the star
		if(sf<this.frames){
			this.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
		}
	};
	this.update = update||function(){};
}

/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
window.requestAnimationFrame = (function(){
	return  window.requestAnimationFrame   || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback, element){
				window.setTimeout(callback, 1000 / 6e1, true);
			};
})();

/**
 * Pythagorean theorem
 */
function getDistance(fromX, fromY, toX, toY){
	var a = Math.abs(fromX - toX);
	var b = Math.abs(fromY - toY);
	return Math.sqrt((a * a) + (b * b));
}

/**
 * Simple collision detection system for quads
 */
function detectCollisionAtBottom(q1,q2){

	// x and y are at the center
	// q1 give allowance of 6px@top, 4px@left
	// q2 8px allowance for tail(cat)
	var r1 = {
		x:q1.x - (q1.width/2) + 4,
		y:q1.y - (q1.height/2) + 6,
		width: q1.width - 8,
		height:q1.height - 6
	};
	var r2 = {
		x:q2.x - (q2.width/2) + 8,
		y:q2.y - (q2.height/2),
		width: q2.width - 8,
		height:q2.height
	};
	return detectCollision(r1,r2);

}
function detectCollisionAtTop(q1,q2){

	// x and y are at the center
	// q1 give allowance of 6px@top, 4px@left
	// q2 8px allowance for tail(cat)
	var r1 = {
		x:q1.x - (q1.width/2) +4,
		y:q1.y - (q1.height/2) -6,
		width: q1.width -8,
		height:q1.height -6
	};
	var r2 = {
		x:q2.x - (q2.width/2) +8 +2,
		y:q2.y - (q2.height/2) +2,
		width: q2.width -8 -4,
		height:q2.height -4
	};
	return detectCollision(r1,r2);

}

function detectCollision(r1,r2){
	if(r1.x < r2.x + r2.width  && r1.x + r1.width  > r2.x
	&& r1.y < r2.y + r2.height && r1.y + r1.height > r2.y){
		return true;
	}else{
		return false;
	}
}

/**
 * Circle-Rectangle Collision Detection System
 * code taken from http://www.migapro.com/circle-and-rotated-rectangle-collision-detection/
 */
function detectCollisionAtBottomFromCircle(circledata,rectangledata){

	var circle = {
		x:circledata.x + (circledata.width/2)+1,
		y:circledata.y + (circledata.height/2)+1,
		radius:(circledata.width/2)-2
	};
	var rectangle = {
		x:rectangledata.x +4 +2, // 8px allowance for tail
		y:rectangledata.y +2,
		width:rectangledata.width -8 -4,
		height:rectangledata.height -4
	};

	// Closest point in the catangle to the center of circle rotated backwards(unrotated)
	var closestX, closestY;
	 
	// Find the closest x point from center of circle
	if(circle.x  < rectangle.x){
		closestX = rectangle.x;
	}else if(circle.x > rectangle.x + rectangle.width){
		closestX = rectangle.x + rectangle.width;
	}else{
		closestX = circle.x;
	}
	 
	// Find the closest y point from center of circle
	if(circle.y < rectangle.y){
		closestY = rectangle.y;
	}else if(circle.y > rectangle.y + rectangle.height){
		closestY = rectangle.y + rectangle.height;
	}else{
		closestY = circle.y;
	}

	// Determine collision
	var collision = false;
	var distance = getDistance(circle.x , circle.y, closestX, closestY);
	//console.log(distance);
	if (distance < circle.radius){
		collision = true; // Collision
		//Kitty.player.paused = true;return false;
	}else{
		collision = false;
	}
	return collision;
}