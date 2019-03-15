//============================================================================
// MoreDIYHUD.js
// Version: 1.0
//============================================================================
/*:
 * @plugindesc 自定义游戏界面UI
 * @author Fanzi
 *
 * @param  -----------------脸图部分
 * @desc undefine
 * @default -------------
 *
 * @param  FaceSpriteXY
 * @desc 主角头像位置(默认左上角，输入坐标，逗号隔开)
 * @default 20,20
 *
 * @param  MateFaceXY
 * @desc 队友头像位置(输入坐标，逗号隔开，最多三人，竖向排列)
 * @default 20,170
 *
 * @param  FaceSize
 * @desc 主角头像大小The standard of face bitmap.
 * @default 100
 *
 * @param  MateFaceSize
 * @desc 队友头像大小The standard of face bitmap.
 * @default 60
 *
 * @param  MateLayout
 * @desc 队友头像排列，true为纵排，false为横排。
 * @default true
 *
 * @param  photoframeName
 * @desc 头像相框图片Please input HPBitmap filename at img/Pictures/.
 * @default
 *
 * @param  -----------------气血部分
 * @desc undefine
 * @default -------------
 *
 * @param  hpboxBitmapName
 * @desc 血槽图片Please input HPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  hpboxSpriteXY
 * @desc 血槽位置Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default 130,50
 *
 * @param  hpbarBitmapName
 * @desc 血条图片Please input HPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  hpbarSpriteXY
 * @desc 血条位置Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default 140,60
 *
 * @param  checkHPpixel
 * @desc 血条范围Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default 0,180
 *
 * @param  mpbarBitmapName
 * @desc 蓝条图片Please input MPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  mpbarSpriteXY
 * @desc 蓝条位置Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default 140,110
 *
 * @param  checkMPpixel
 * @desc 蓝条范围Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default 0,180
 *
 * @param  LowDirection
 * @desc 减血减蓝方向，true为纵向，false为横向。
 * @default true
 *
 * @param  TpbarBitmapName
 * @desc 怒条图片Please input TPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  TpbarSpriteXY
 * @desc 怒条位置Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default 140,160
 *
 * @param  checkTPpixel
 * @desc 怒条范围Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default 0,180
 *
 * @param  expbarBitmapName
 * @desc 经验条图Please input EXPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  expbarSpriteXY
 * @desc 经验条位Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default 140,160
 *
 * @param  checkEXPpixel
 * @desc 经验范围Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default 0,180
 *
 * @param  -----------------窗口部分
 * @desc undefine
 * @default -------------
 *
 * @param  WindowWidth
 * @desc 窗口宽度This HUDWindow Width
 * @default 400
 *
 * @param  WindowHeight
 * @desc 窗口高度This HUDWindow Height
 * @default 200
 *
 * @param  WindowOpacity
 * @desc 窗口透明度This HUDWindow Opacity between 0-255
 * @default 255
 *
 * @param  WindowXY
 * @desc 窗口位置This HUDWindow Position xy
 * @default 0,0
 *
 * @param  UIButton
 * @desc 是否启用UI按钮，true为启用，false为关闭。
 * @default true
 *
 * @param  ChangeButton
 * @desc 是否启用Q键切换队友，true为启用，false为关闭。
 * @default true
 *
 * @param  UIButton1
 * @desc UI按钮一调用公共事件号。
 * @default 1
 *
 * @param  UIButton2
 * @desc UI按钮二调用公共事件号。
 * @default 2
 *
 * @param  UIButton3
 * @desc UI按钮三调用公共事件号。
 * @default 3
 *
 * @param  UIButton4
 * @desc UI按钮四调用公共事件号。
 * @default 4
 *
 * @param  -----------------文字部分
 * @desc undefine
 * @default -------------
 *
 * @param  FontWidth
 * @desc 字体号this Window Text Size;
 * @default 24
 *
 * @param  ValueWidth
 * @desc 字宽the number frame width and "/" frame width  equal ValueWidth/2;
 * @default 30
 *
 * @param  HPTextXY
 * @desc HP值位置HPText.Position.x,HPText.Position.y
 * @default 305,5
 *
 * @param  MPTextXY
 * @desc MP值位置MPText.Position.x,MPText.Position.y
 * @default 305,50
 *
 * @param  TPTextXY
 * @desc TP值位置TPText.Position.x,TPText.Position.y
 * @default 305,100
 *
 * @param  EXPTextXY
 * @desc EXP值位置EXPText.Position.x,EXPText.Position.y
 * @default 305,150
 *
 * @param  NameTextXY
 * @desc 名字位置NameText.Position.x,NameText.Position.y
 * @default 30,120
 *
 * @param  levelTextXY
 * @desc 等级位置levelText.Position.x,levelText.Position.y
 * @default 120,5
 *
 * @param levelNumberWidth
 * @desc 等级字粗the levelNumber position (x+levelNumberWidth)
 * @default 30
 *
 * @help
 * 本插件主要为ARPG游戏配置，当然其它类型游戏也可以使用，相关功能完全自定义
 * 主要功能用于在地图上显示角色脸图、血条、蓝条、怒气、经验以及它们的装饰框、
 * 显示界面功能按钮、队友脸图等，当然各个元素都是可以自主选择显不显示的，
 * 其中血、蓝条的减低方向与队友脸图的排列方向是可以选择纵向与横向的，
 * 插件设有按键切换队友功能，设有按钮调用公共事件功能，参数可设置启用与否，
 * 调用公共事件可设置4个，皆可自定义，游戏过程可通过插件指令自由开关显示。
 * 血、蓝条设置需注意，当减低方向为横向时，血槽为空，血、蓝条为满，血、蓝条范围
 * 写左右范围；当减低方向为纵向时，血槽为满，血、蓝条为空，血、蓝条范围写上下范围
 * 插件指令:
 * HUD deactivate 关闭UI显示
 * HUD activate   开启UI显示
 * 关闭UI显示期间，插件所有功能也会失效。
 */
var Imported = Imported || {};
Imported.MoreDIYHUD = 1.0;

(function () {
    var parameters = PluginManager.parameters('MoreDIYHUD');
    //脸图位置
    var FacePosition = FaceSpriteXY();
    function FaceSpriteXY() {
        var resFace = /(\d+),*(\d+)/.exec(parameters['FaceSpriteXY']);
        return {x: Number(resFace[1]), y: Number(resFace[2])};
    };
    var MateFaceP = MateFaceXY();
    function MateFaceXY() {
        var MateFace = /(\d+),*(\d+)/.exec(parameters['MateFaceXY']);
        return {x: Number(MateFace[1]), y: Number(MateFace[2])};
    };
    //脸图大小
    var FaceSize = Number(parameters['FaceSize'] || 100);
    var MateFaceSize = Number(parameters['MateFaceSize']);
    var photoframe = parameters['photoframeName'];
    //血槽
    var hpboxBitmap = parameters['hpboxBitmapName'];
    var hpboxPosition = hpboxSpriteXY();
    function hpboxSpriteXY() {
        var reshpbox = /(\d+),*(\d+)/.exec(parameters['hpboxSpriteXY']);
        return {x: Number(reshpbox[1]), y: Number(reshpbox[2])};
    };
    //血条
    var hpbarBitmap = parameters['hpbarBitmapName'];
    var hpbarPosition = hpbarSpriteXY();
    function hpbarSpriteXY() {
        var reshpbar = /(\d+),*(\d+)/.exec(parameters['hpbarSpriteXY']);
        return {x: Number(reshpbar[1]), y: Number(reshpbar[2])};
    };
    //校准血条
    var hpcheck = checkHPpixel();
    function checkHPpixel() {
        var resHPpixel = /(\d+),*(\d+)/.exec(parameters['checkHPpixel']);
        return {up: Number(resHPpixel[1]), down: Number(resHPpixel[2])};
    };
    //蓝条
    var mpbarBitmap = parameters['mpbarBitmapName'];
    var mpbarPosition = mpbarSpriteXY();
    function mpbarSpriteXY() {
        var resmpbar = /(\d+),*(\d+)/.exec(parameters['mpbarSpriteXY']);
        return {x: Number(resmpbar[1]), y: Number(resmpbar[2])};
    };
    //校准蓝条
    var mpcheck = checkMPpixel();
    function checkMPpixel() {
        var resMPpixel = /(\d+),*(\d+)/.exec(parameters['checkMPpixel']);
        return {up: Number(resMPpixel[1]), down: Number(resMPpixel[2])};
    };
    //怒气条
    var TpbarBitmap = parameters['TpbarBitmapName'];
    var TpbarPosition = TpbarSpriteXY();
    function TpbarSpriteXY() {
        var resTpbar = /(\d+),*(\d+)/.exec(parameters['TpbarSpriteXY']);
        return {x: Number(resTpbar[1]), y: Number(resTpbar[2])};
    };
    //校准怒气条
    var Tpcheck = checkTPpixel();
    function checkTPpixel() {
        var resTPpixel = /(\d+),*(\d+)/.exec(parameters['checkTPpixel']);
        return {left: Number(resTPpixel[1]), right: Number(resTPpixel[2])};
    };
    //经验条
    var expbarBitmap = parameters['expbarBitmapName'];
    var expbarPosition = expbarSpriteXY();
    function expbarSpriteXY() {
        var resexpbar = /(\d+),*(\d+)/.exec(parameters['expbarSpriteXY']);
        return {x: Number(resexpbar[1]), y: Number(resexpbar[2])};
    };
    //校准经验条
    var expcheck = checkEXPpixel();
    function checkEXPpixel() {
        var resEXPpixel = /(\d+),*(\d+)/.exec(parameters['checkEXPpixel']);
        return {left: Number(resEXPpixel[1]), right: Number(resEXPpixel[2])};
    };
    //窗口部分
    var WindowWidth = Number(parameters['WindowWidth'] || 400);
    var WindowHeight = Number(parameters['WindowHeigh'] || 200);
    var WindowOpacity = Number(parameters['WindowOpacity'] || 255);
    var WindowPosition = WindowXY();
    function WindowXY() {
        var reswindowxy = /(\d+),*(\d+)/.exec(parameters['WindowXY']);
        return {x: Number(reswindowxy[1]), y: Number(reswindowxy[2])};
    };
    //HP文字
    var valueWidth = Number(parameters['ValueWidth'] || 30);
    var textSize = Number(parameters['FontWidth'] || 24);
    var HPtextPosition = hptextXY();
    function hptextXY() {
        var reshptext = /(\d+),*(\d+)/.exec(parameters['HPTextXY']);
        return {x: Number(reshptext[1]), y: Number(reshptext[2])};
    };
    //MP文字
    var MPtextPosition = mptextXY();
    function mptextXY() {
        var resmptext = /(\d+),*(\d+)/.exec(parameters['MPTextXY']);
        return {x: Number(resmptext[1]), y: Number(resmptext[2])};
    };
    //TP文字
    var TPtextPosition = TptextXY();
    function TptextXY() {
        var resTptext = /(\d+),*(\d+)/.exec(parameters['TPTextXY']);
        return {x: Number(resTptext[1]), y: Number(resTptext[2])};
    };
    //EXP文字
    var EXPtextPosition = exptextXY();
    function exptextXY() {
        var resexptext = /(\d+),*(\d+)/.exec(parameters['EXPTextXY']);
        return {x: Number(resexptext[1]), y: Number(resexptext[2])};
    };
    //名字相关
    var NamePosition = NametextXY();
    function NametextXY() {
        var resnametext = /(\d+),*(\d+)/.exec(parameters['NameTextXY']);
        return {x: Number(resnametext[1]), y: Number(resnametext[2])};
    };
    //等级相关
    var addwidth = Number(parameters['levelNumberWidth'] || "10");
    var levelPosition = leveltextXY();
    function leveltextXY() {
        var resleveltext = /(\d+),*(\d+)/.exec(parameters['levelTextXY']);
        return {x: Number(resleveltext[1]), y: Number(resleveltext[2])};
    };
    //显示在精灵层低
    var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _Scene_Map_createSpriteset.call(this);
        this.addChild(new Window_HUD());
    };
    //显示在窗口层高
/**    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_createAllWindows.call(this);
        this.addChild(new Window_HUD());
    };
*/
    var MateLayout = parameters["MateLayout"].toLowerCase() == 'true';
    var LowDirection = parameters["LowDirection"].toLowerCase() == 'true';
    var UIButton = parameters["UIButton"].toLowerCase() == 'true';
    var ChangeButton = parameters["ChangeButton"].toLowerCase() == 'true';
    var UIButton1 = Number(parameters['UIButton1']);
    var UIButton2 = Number(parameters['UIButton2']);
    var UIButton3 = Number(parameters['UIButton3']);
    var UIButton4 = Number(parameters['UIButton4']);
    var ShowSwitch = true;
    //-----------------------------------------------------------------------------
    // HUD窗口
    function Window_HUD() {
        this.initialize.apply(this, arguments);
    };
    Window_HUD.prototype = Object.create(Window_Base.prototype);
    Window_HUD.prototype.constructor = Window_HUD;
    //初始化
    Window_HUD.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var actormember = null;
        Window_Base.prototype.initialize.call(this, WindowPosition.x, WindowPosition.y, width, height);
        this.opacity = WindowOpacity;
        this.actor = $gameParty.leader();
        this.drawDIYFace();
        this.drawMateFace();
        this.drawMate2Face();
        this.drawMate3Face();
		this.drawALLText();
        this.drawDIYHP();
        this.drawDIYMP();
        this.drawDIYTP();
        this.drawDIYEXP();
        this.actor.lasthp = null;
        this.actor.lastmp = null;
        this.actor.lastLevel = this.actor.level;
        this.actor.lastTp = null;
        this.actor.lastexp = null;
        this.lastShowSwitch = true;
    };
    //窗口宽
    Window_HUD.prototype.windowWidth = function () {
        return WindowWidth;
    };
    //窗口高
    Window_HUD.prototype.windowHeight = function () {
        return WindowHeight;
    };
    //绘制队长脸图
    Window_HUD.prototype.drawDIYFace = function() {
        var FaceSp = new Sprite();
        var faceName = this.actor.faceName();
        var faceIndex = this.actor.faceIndex();
        FaceSp.bitmap = ImageManager.loadFace(faceName);
        this.spriteFace = new Sprite(new Bitmap(FacePosition.x+FaceSize,FacePosition.y+FaceSize));
        FaceSp.bitmap.addLoadListener(function() {
            var pw = Window_Base._faceWidth;
            var ph = Window_Base._faceHeight;
            var sx = faceIndex % 4 * pw;
            var sy = Math.floor(faceIndex / 4) * ph;
            this.spriteFace.bitmap.blt(FaceSp.bitmap, sx, sy, pw, ph, FacePosition.x, FacePosition.y, FaceSize, FaceSize);
        }.bind(this));
        this.addChild(this.spriteFace);
        this.MyFaceSp = this.spriteFace
        if (photoframe) {
            var faceframe = new Sprite();
            faceframe.bitmap = ImageManager.loadPicture(photoframe);
            this.addChild(faceframe);
            faceframe.move(FacePosition.x-20, FacePosition.y-10);
            this.faceframe = faceframe;
        }
    };
    //绘制队友1脸图
    Window_HUD.prototype.drawMateFace = function() {
        var FaceTm = new Sprite();
        if ($gameParty.members()[1]) {
            var FaceName1 = $gameParty.members()[1].faceName();
            var faceIndex1 = $gameParty.members()[1].faceIndex();
        } else {
            var FaceName1 = null;
            var faceIndex1 = null;
        }
        FaceTm.bitmap = ImageManager.loadFace(FaceName1);
        this.spriteFace1 = new Sprite(new Bitmap(MateFaceP.x+MateFaceSize,MateFaceP.y+MateFaceSize));
        FaceTm.bitmap.addLoadListener(function() {
            var pw1 = Window_Base._faceWidth;
            var ph1 = Window_Base._faceHeight;
            var sx1 = faceIndex1 % 4 * pw1;
            var sy1 = Math.floor(faceIndex1 / 4) * ph1;
            this.spriteFace1.bitmap.blt(FaceTm.bitmap, sx1, sy1, pw1, ph1, MateFaceP.x, MateFaceP.y, MateFaceSize, MateFaceSize);
        }.bind(this));
        this.addChild(this.spriteFace1);
        this.MyFaceTm = this.spriteFace1
    };
    //绘制队友2脸图
    Window_HUD.prototype.drawMate2Face = function() {
        var FaceTm2 = new Sprite();
        if ($gameParty.members()[2]) {
            var FaceName2 = $gameParty.members()[2].faceName();
            var faceIndex2 = $gameParty.members()[2].faceIndex();
        } else {
            var FaceName2 = null;
            var faceIndex2 = null;
        }
        FaceTm2.bitmap = ImageManager.loadFace(FaceName2);
        if ( MateLayout ) {
            this.spriteFace2 = new Sprite(new Bitmap(MateFaceP.x+MateFaceSize,MateFaceP.y+MateFaceSize*2+20));
        } else {
            this.spriteFace2 = new Sprite(new Bitmap(MateFaceP.x+MateFaceSize*2+20,MateFaceP.y+MateFaceSize));
        }
        FaceTm2.bitmap.addLoadListener(function() {
            var pw2 = Window_Base._faceWidth;
            var ph2 = Window_Base._faceHeight;
            var sx2 = faceIndex2 % 4 * pw2;
            var sy2 = Math.floor(faceIndex2 / 4) * ph2;
            if ( MateLayout ) {
                this.spriteFace2.bitmap.blt(FaceTm2.bitmap, sx2, sy2, pw2, ph2, MateFaceP.x, MateFaceP.y+MateFaceSize+20, MateFaceSize, MateFaceSize);
            } else {
                this.spriteFace2.bitmap.blt(FaceTm2.bitmap, sx2, sy2, pw2, ph2, MateFaceP.x+MateFaceSize+20, MateFaceP.y, MateFaceSize, MateFaceSize);
            }
        }.bind(this));
        this.addChild(this.spriteFace2);
        this.MyFaceTm2 = this.spriteFace2
    };
    //绘制队友3脸图
    Window_HUD.prototype.drawMate3Face = function() {
        var FaceTm3 = new Sprite();
        if ($gameParty.members()[3]) {
            var FaceName3 = $gameParty.members()[3].faceName();
            var faceIndex3 = $gameParty.members()[3].faceIndex();
        } else {
            var FaceName3 = null;
            var faceIndex3 = null;
        }
        FaceTm3.bitmap = ImageManager.loadFace(FaceName3);
        if ( MateLayout ) {
            this.spriteFace3 = new Sprite(new Bitmap(MateFaceP.x+MateFaceSize,MateFaceP.y+MateFaceSize*3+40));
        } else {
            this.spriteFace3 = new Sprite(new Bitmap(MateFaceP.x+MateFaceSize*3+40,MateFaceP.y+MateFaceSize));
        }
        FaceTm3.bitmap.addLoadListener(function() {
            var pw3 = Window_Base._faceWidth;
            var ph3 = Window_Base._faceHeight;
            var sx3 = faceIndex3 % 4 * pw3;
            var sy3 = Math.floor(faceIndex3 / 4) * ph3;
            if ( MateLayout ) {
                this.spriteFace3.bitmap.blt(FaceTm3.bitmap, sx3, sy3, pw3, ph3, MateFaceP.x, MateFaceP.y+MateFaceSize*2+40, MateFaceSize, MateFaceSize);
            } else {
                this.spriteFace3.bitmap.blt(FaceTm3.bitmap, sx3, sy3, pw3, ph3, MateFaceP.x+MateFaceSize*2+40, MateFaceP.y, MateFaceSize, MateFaceSize);
            }
        }.bind(this));
        this.addChild(this.spriteFace3);
        this.MyFaceTm3 = this.spriteFace3
    };
    //绘制HP
    Window_HUD.prototype.drawDIYHP = function () {
        if (hpbarBitmap) {
            var hpBar = new Sprite();
            hpBar.bitmap = ImageManager.loadPicture(hpbarBitmap);
            this.addChild(hpBar);
            hpBar.move(hpbarPosition.x, hpbarPosition.y);
            this.hpBar = hpBar;
        }
        if (hpboxBitmap) {
            var hpBox = new Sprite();
            hpBox.bitmap = ImageManager.loadPicture(hpboxBitmap);
            this.addChild(hpBox);
            this.addChildToBack(hpBox);
            hpBox.move(hpboxPosition.x, hpboxPosition.y);
            this.hpBox = hpBox;
        }
    };
    //绘制MP
    Window_HUD.prototype.drawDIYMP = function () {
        if (mpbarBitmap) {
            var mpBar = new Sprite();
            mpBar.bitmap = ImageManager.loadPicture(mpbarBitmap);
            this.addChild(mpBar);
            mpBar.move(mpbarPosition.x, mpbarPosition.y);
            this.mpBar = mpBar;
        }
    };
    //绘制TP
    Window_HUD.prototype.drawDIYTP = function () {
        if (TpbarBitmap) {
            var TpBar = new Sprite();
            TpBar.bitmap = ImageManager.loadPicture(TpbarBitmap);
            this.addChild(TpBar);
            TpBar.move(TpbarPosition.x, TpbarPosition.y);
            this.TpBar = TpBar;
        }
    };
    //绘制EXP
    Window_HUD.prototype.drawDIYEXP = function () {
        if (expbarBitmap) {
            var expBar = new Sprite();
            expBar.bitmap = ImageManager.loadPicture(expbarBitmap);
            this.addChild(expBar);
            expBar.move(expbarPosition.x, expbarPosition.y);
            this.expBar = expBar;
        }
    };
    //绘制文本信息
    Window_HUD.prototype.drawALLText= function() {
        this.contents.clear();
        this.contents.fontSize = textSize;
        if (ShowSwitch == true) {
            this.drawActorName(this.actor, NamePosition.x, NamePosition.y);
            this.drawActorNickname(this.actor, NamePosition.x + 50, NamePosition.y);
            this.drawHPText(this.actor.hp,this.actor.mhp,HPtextPosition.x,HPtextPosition.y);
            this.drawMPText(this.actor.mp,this.actor.mmp,MPtextPosition.x,MPtextPosition.y);
            this.drawTPText(this.actor.tp,100,TPtextPosition.x,TPtextPosition.y);
            this.drawEXPText(EXPtextPosition.x,EXPtextPosition.y);
            this.drawLevel(this.actor, levelPosition.x, levelPosition.y, addwidth);
        }
    };
    //绘制HP文字
    Window_HUD.prototype.drawHPText=function(current,max,x,y) {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(current, x3, y, valueWidth, 'right');
        this.drawText('/', x2, y, valueWidth/2, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    };
    //绘制MP文字
    Window_HUD.prototype.drawMPText=function(current,max,x,y) {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(current, x3, y, valueWidth, 'right');
        this.drawText('/',x2, y, valueWidth/2, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    };
    //绘制TP文字
    Window_HUD.prototype.drawTPText=function(current,max,x,y) {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(current, x3, y, valueWidth, 'right');
        this.drawText('/',x2, y, valueWidth/2, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    };
    //绘制EXP文字
    Window_HUD.prototype.drawEXPText=function(x,y) {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(this.GetCurrentExp(), x3, y, valueWidth, 'right');
        this.drawText('/',x2, y, valueWidth/2, 'right');
        this.drawText(this.GetMaxExp(), x1, y, valueWidth, 'right');
    };
    Window_HUD.prototype.GetCurrentExp=function() {
        return this.actor.currentExp()-this.actor.expForLevel(this.actor.level);
    };
    Window_HUD.prototype.GetMaxExp=function() {
        return this.actor.nextLevelExp()-this.actor.expForLevel(this.actor.level);
    };
    //绘制等级文字
    Window_HUD.prototype.drawLevel = function (curactor, x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(curactor.level, x, y, 48);
        this.resetTextColor();
        this.drawText("级", x + width, y, 36);
    };
    //切换队员
    Window_HUD.prototype.ChangeActor = function () {
        $gameParty._actors.push($gameParty._actors.shift());
        this.actor = $gameParty.leader();
        $gamePlayer.refresh();
        $gameSwitches.setValue(1,false);
        this.removeChild(this.MyFaceSp);
        this.removeChild(this.MyFaceTm);
        this.removeChild(this.MyFaceTm2);
        this.removeChild(this.MyFaceTm3);
        this.drawDIYFace();
        this.drawMateFace();
        this.drawMate2Face();
        this.drawMate3Face();
        if(hpbarBitmap)this.refresh_HP();
        if(mpbarBitmap)this.refresh_MP();
        if(TpbarBitmap)this.refresh_TP();
        if(expbarBitmap)this.refresh_EXP();
        this.drawALLText();
    };
    Window_HUD.prototype.SwitchActor = function () {
        if (ShowSwitch&&ChangeButton) {
            if ($gameParty._actors.length > 1) {
                if (Input.isTriggered('pageup')) {
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    this.ChangeActor();
                }
            }
        }
    };
    //点击菜单
    Window_HUD.prototype.dianji = function() {
        if (!$gameMessage.isBusy()&&ShowSwitch&&UIButton) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            if (TouchInput.isTriggered()) {
                if(x >= FacePosition.x && y >= FacePosition.y && x < FacePosition.x+FaceSize && y < FacePosition.y+FaceSize){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    SceneManager.push(Scene_Menu); //菜单
                } else 
                if(UIButton1 && x >= hpboxPosition.x+530 && y >= hpboxPosition.y+55 && x < hpboxPosition.x+570 && y < hpboxPosition.y+105){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    $gameTemp.reserveCommonEvent(UIButton1);
                } else 
                if(UIButton2 && x >= hpboxPosition.x+585 && y >= hpboxPosition.y+55 && x < hpboxPosition.x+625 && y < hpboxPosition.y+105){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    $gameTemp.reserveCommonEvent(UIButton2);
                } else 
                if(UIButton3 && x >= hpboxPosition.x+635 && y >= hpboxPosition.y+55 && x < hpboxPosition.x+675 && y < hpboxPosition.y+105){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    $gameTemp.reserveCommonEvent(UIButton3);
                } else 
                if(UIButton4 && x >= hpboxPosition.x+685 && y >= hpboxPosition.y+55 && x < hpboxPosition.x+725 && y < hpboxPosition.y+105){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    $gameTemp.reserveCommonEvent(UIButton4);
                } else 
                if(ChangeButton && x >= hpboxPosition.x+735 && y >= hpboxPosition.y+55 && x < hpboxPosition.x+775 && y < hpboxPosition.y+105){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    this.ChangeActor(); //切换
                } else 
                if(ChangeButton && x >= MateFaceP.x && y >= MateFaceP.y && x < MateFaceP.x+MateFaceSize && y < MateFaceP.y+MateFaceSize){
                    $gameTemp.clearDestination();
                    AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                    this.ChangeActor(); //第一队友
                } else if ( MateLayout ) {
                    if(ChangeButton && x >= MateFaceP.x && y >= MateFaceP.y+MateFaceSize+20 && x < MateFaceP.x+MateFaceSize && y < MateFaceP.y+MateFaceSize*2+20){
                        $gameTemp.clearDestination();
                        AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                        $gameParty._actors.push($gameParty._actors.shift());
                        this.ChangeActor(); //第二队友
                    } else 
                    if(ChangeButton && x >= MateFaceP.x && y >= MateFaceP.y+MateFaceSize*2+40 && x < MateFaceP.x+MateFaceSize && y < MateFaceP.y+MateFaceSize*3+40){
                        $gameTemp.clearDestination();
                        AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                        $gameParty._actors.push($gameParty._actors.shift());
                        $gameParty._actors.push($gameParty._actors.shift());
                        this.ChangeActor(); //第三队友
                    }
                } else {
                    if(ChangeButton && x >= MateFaceP.x+MateFaceSize+20 && y >= MateFaceP.y && x < MateFaceP.x+MateFaceSize*2+20 && y < MateFaceP.y+MateFaceSize){
                        $gameTemp.clearDestination();
                        AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                        $gameParty._actors.push($gameParty._actors.shift());
                        this.ChangeActor(); //第二队友
                    } else 
                    if(ChangeButton && x >= MateFaceP.x+MateFaceSize*2+40 && y >= MateFaceP.y && x < MateFaceP.x+MateFaceSize*3+40 && y < MateFaceP.y+MateFaceSize){
                        $gameTemp.clearDestination();
                        AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
                        $gameParty._actors.push($gameParty._actors.shift());
                        $gameParty._actors.push($gameParty._actors.shift());
                        this.ChangeActor(); //第三队友
                    }
                }
            }
        }
    };
    //刷新HP
    Window_HUD.prototype.refresh_HP = function () {
        var up = hpcheck.up;
        var down = hpcheck.down;
        var left = hpcheck.up;
        var right = hpcheck.down;
        var percent = this.actor.hp / this.actor.mhp;
        if(hpbarBitmap) {
            if ( LowDirection ) {
                this.hpBar.height = percent * (up - down) + down;
            } else {
                this.hpBar.width = percent * (right - left) + left;
            }
            this.drawALLText();
            this.actor.lasthp = this.actor.hp;
        }
    };
    //刷新MP
    Window_HUD.prototype.refresh_MP = function (index) {
        var up = mpcheck.up;
        var down = mpcheck.down;
        var left = mpcheck.up;
        var right = mpcheck.down;
        var percent = this.actor.mp / this.actor.mmp;
        if(mpbarBitmap) {
            if ( LowDirection ) {
                this.mpBar.height = percent * (up - down) + down;
            } else {
                this.mpBar.width = percent * (right - left) + left;
            }
            this.drawALLText();
            this.actor.lastmp = this.actor.mp;
        }
    };
    //刷新TP
    Window_HUD.prototype.refresh_TP = function (index) {
        var left = Tpcheck.left;
        var right = Tpcheck.right;
        var percent = this.actor.tp / 100;
        if(TpbarBitmap) {
            this.TpBar.width = percent * (right - left) + left;
            this.drawALLText();
            this.actor.lastTp = this.actor.tp;
        }
    };
    //刷新EXP
    Window_HUD.prototype.refresh_EXP = function (index) {
        var left = expcheck.left;
        var right = expcheck.right;
        var percent = this.GetCurrentExp(index)/ this.GetMaxExp(index);
        if(expbarBitmap) {
            this.expBar.width = percent * (right - left) + left;
            this.drawALLText();
            this.actor.lastexp = this.GetCurrentExp(index);
        }
    };
    //刷新等级
    Window_HUD.prototype.refresh_level = function () {
        //升级满状态回复
        this.actor.setHp(this.actor.mhp);
        this.actor.setMp(this.actor.mmp);
        this.actor.setTp(100);
        this.refresh_HP();
        this.refresh_MP();
        this.refresh_TP();
        this.actor.lastLevel=this.actor.level;
    };
    //刷新队友
    Window_HUD.prototype.refresh_face = function () {
        this.removeChild(this.MyFaceTm);
        this.removeChild(this.MyFaceTm2);
        this.removeChild(this.MyFaceTm3);
        this.drawMateFace();
        this.drawMate2Face();
        this.drawMate3Face();
        this.actormember = $gameParty._actors.length;
    };
    //刷新UI
    Window_HUD.prototype.refresh_UI = function () {
        if (ShowSwitch == true) {
            this.spriteFace.opacity = 255;
            this.opacity = WindowOpacity;
            if (this.spriteFace1) this.spriteFace1.opacity = 255;
            if (this.spriteFace2) this.spriteFace2.opacity = 255;
            if (this.spriteFace3) this.spriteFace3.opacity = 255;
            if (this.faceframe) this.faceframe.opacity = 255;
            if (this.hpBox) this.hpBox.opacity = 255;
            if (this.hpBar) this.hpBar.opacity = 255;
            if (this.mpBar) this.mpBar.opacity = 255;
            if (this.TpBar) this.TpBar.opacity = 255;
            if (this.expBar) this.expBar.opacity = 255;
            this.drawALLText();
        } else {
            this.spriteFace.opacity = 0;
            this.opacity = 0;
            if (this.spriteFace1) this.spriteFace1.opacity = 0;
            if (this.spriteFace2) this.spriteFace2.opacity = 0;
            if (this.spriteFace3) this.spriteFace3.opacity = 0;
            if (this.faceframe) this.faceframe.opacity = 0;
            if (this.hpBox) this.hpBox.opacity = 0;
            if (this.hpBar) this.hpBar.opacity = 0;
            if (this.mpBar) this.mpBar.opacity = 0;
            if (this.TpBar) this.TpBar.opacity = 0;
            if (this.expBar) this.expBar.opacity = 0;
            this.drawALLText();
        }
        this.lastShowSwitch = ShowSwitch;
    };
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        command = command.toLowerCase();
        if (command === 'hud' && args[0] == 'deactivate') {
            ShowSwitch = false;
        }
        if (command === 'hud' && args[0] == 'activate') {
            ShowSwitch = true;
        }
    };
    Window_HUD.prototype.update = function () {
        this.SwitchActor();
        this.dianji();
        if (this.actor.hp!=this.actor.lasthp)
            this.refresh_HP();
        if (this.actor.mp!=this.actor.lastmp)
            this.refresh_MP();
        if (this.actor.tp!=this.actor.lasttp)
            this.refresh_TP();
        if (this.GetCurrentExp()!=this.actor.lastexp)
            this.refresh_EXP();
        if (this.actor.level!=this.actor.lastLevel)
            this.refresh_level();
        if (this.actormember!=$gameParty._actors.length)
            this.refresh_face();
        if (ShowSwitch!=this.lastShowSwitch)
            this.refresh_UI();
    };
})();