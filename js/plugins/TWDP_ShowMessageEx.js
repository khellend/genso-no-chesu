//=============================================================================
// Trentswd Plugins - ShowMessageEx
// TWDP_ShowMessageEx.js
//=============================================================================

var Imported = Imported || {};
Imported.TWDP_ShowMessageEx = true;

var TWDP = TWDP || {};
TWDP.SME = TWDP.SME || {};

//=============================================================================
/*:
 * @plugindesc v1.00 Extend the show message window.
 * @author Trentswd
 *
 * @param ---------- Parameters ----------
 * @desc
 * @default
 *
 * @param Auto Wrap
 * @desc Auto warp line, and use #{BR} to force warp line.
 * true - Yes false - No
 * @default false
 *
 * @param ---------- Skins ----------
 * @desc
 * @default
 *
 * @param Text Window Skin
 * @desc The name of window skin for text window. Empty for default skin
 * @default
 *
 * @param Text Window Skin For None Fuki
 * @desc Empty for default skin, - for same as above
 * @default -
 *
 * @param Name Window Skin
 * @desc The name of window skin for name window. Empty for default skin
 * @default
 *
 * @param Name Window Skin For None Fuki
 * @desc Empty for default skin, - for same as above
 * @default -
 *
 * @param Gold Window Skin
 * @desc The name of window skin for gold window. Empty for default skin
 * @default
 *
 * @param Choice Window Skin
 * @desc The name of window skin for choice window. Empty for default skin
 * @default
 *
 * @param Number Window Skin
 * @desc The name of window skin for number window. Empty for default skin
 * @default
 *
 * @param Item Window Skin
 * @desc The name of window skin for item window. Empty for default skin
 * @default
 *
 * @param ---------- Metas ----------
 * @desc
 * @default
 *
 * @param Text Window Meta
 * @desc A json that control text window's apparence.
 * @default {}
 *
 * @param Name Window Meta
 * @desc A json that control name window's apparence.
 * @default {}
 *
 * @param Gold Window Meta
 * @desc A json that control gold window's apparence.
 * @default {}
 *
 * @param Choice Window Meta
 * @desc A json that control choice window's apparence.
 * @default {}
 *
 * @param Item Window Meta
 * @desc A json that control item window's apparence.
 * @default {}
 *
 * @param Number Window Meta
 * @desc A json that control number window's apparence.
 * @default {}
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Don't have time to write this right now, sorry.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Don't have time to write this right now, sorry.
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

TWDP.parameters = PluginManager.parameters('TWDP_ShowMessageEx');
TWDP.SME.param = TWDP.SME.param || {};

TWDP.SME.param.textWindowSkin = String(TWDP.parameters['Text Window Skin']);
TWDP.SME.param.textWindowSkinNoneFuki = String(TWDP.parameters['Text Window Skin For None Fuki']);
TWDP.SME.param.nameWindowSkin = String(TWDP.parameters['Name Window Skin']);
TWDP.SME.param.nameWindowSkinNoneFuki = String(TWDP.parameters['Name Window Skin For None Fuki']);
TWDP.SME.param.goldWindowSkin = String(TWDP.parameters['Gold Window Skin']);
TWDP.SME.param.choiceWindowSkin = String(TWDP.parameters['Choice Window Skin']);
TWDP.SME.param.numberWindowSkin = String(TWDP.parameters['Number Window Skin']);
TWDP.SME.param.itemWindowSkin = String(TWDP.parameters['Item Window Skin']);
TWDP.SME.param.autoWrap = eval(String(TWDP.parameters['Auto Wrap']));
TWDP.SME.param.textWindowMeta = (String(TWDP.parameters['Text Window Meta']));
TWDP.SME.param.goldWindowMeta = (String(TWDP.parameters['Gold Window Meta']));
TWDP.SME.param.choiceWindowMeta = (String(TWDP.parameters['Choice Window Meta']));
TWDP.SME.param.nameWindowMeta = (String(TWDP.parameters['Name Window Meta']));
TWDP.SME.param.itemWindowMeta = (String(TWDP.parameters['Item Window Meta']));
TWDP.SME.param.numberWindowMeta = (String(TWDP.parameters['Number Window Meta']));


(function($) {

  $.backup = $.backup || {};

  // ---- below is .Game_Interpreter ----
  // ------------------------------------

  // Show Text
  $.backup.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
  Game_Interpreter.prototype.command101 = function() {
    if ($gameMessage.isWaitingForNext()) {
      while (this.nextEventCode() === 401) { // Text data
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
      }
      switch (this.nextEventCode()) {
        case 102: // Show Choices
          this._index++;
          this.setupChoices(this.currentCommand().parameters);
          break;
        case 103: // Input Number
          this._index++;
          this.setupNumInput(this.currentCommand().parameters);
          break;
        case 104: // Select Item
          this._index++;
          this.setupItemChoice(this.currentCommand().parameters);
          break;
      }
      this._index++;
      this.setWaitMode('message');
      $gameMessage._twd.flagWaitingForNext = false;
      $gameMessage._twd.hasNext = true;
    } else {
      $.backup.Game_Interpreter_command101.call(this);
    }
    return false;
  };

  // Show Choices
  $.backup.Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
  Game_Interpreter.prototype.command102 = function() {
    if ($gameMessage.isWaitingForNext()) {
      this.setupChoices(this._params);
      this._index++;
      this.setWaitMode('message');
      $gameMessage._twd.flagWaitingForNext = false;
      $gameMessage._twd.hasNext = true;
    } else {
      $.backup.Game_Interpreter_command102.call(this)
    }
    return false;
  };

  // Input Number
  $.backup.Game_Interpreter_command103 = Game_Interpreter.prototype.command103;
  Game_Interpreter.prototype.command103 = function() {
    if ($gameMessage.isWaitingForNext()) {
      this.setupNumInput(this._params);
      this._index++;
      this.setWaitMode('message');
      $gameMessage._twd.flagWaitingForNext = false;
      $gameMessage._twd.hasNext = true;
    } else {
      $.backup.Game_Interpreter_command103.call(this)
    }
    return false;
  };

  // Select Item
  $.backup.Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
  Game_Interpreter.prototype.command104 = function() {
    if ($gameMessage.isWaitingForNext()) {
      this.setupItemChoice(this._params);
      this._index++;
      this.setWaitMode('message');
      $gameMessage._twd.flagWaitingForNext = false;
      $gameMessage._twd.hasNext = true;
    } else {
      $.backup.Game_Interpreter_command104.call(this)
    }
    return false;
  };

  // ---- below is Game_Message ----
  // -------------------------------

  $.backup.Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    $.backup.Game_Message_clear.call(this);
    this._twd = {};
    this._twd.flagWaitingForNext = false;
    this._twd.hasNext = false;
  };

  Game_Message.prototype.isWaitingForNext = function() {
    return this._twd.flagWaitingForNext && !(this.isChoice() || this.isNumberInput() || this.isItemChoice());
  };

  $.backup.Game_Message_isBusy = Game_Message.prototype.isBusy;
  Game_Message.prototype.isBusy = function() {
    if (this.isWaitingForNext()) {
      return false;
    }
    return $.backup.Game_Message_isBusy.call(this);
  };

  $.backup.Game_Message_allText = Game_Message.prototype.allText;
  Game_Message.prototype.allText = function() {
    if (!this._texts || this._texts.length === 0) {
      return '';
    }
    var str = $.backup.Game_Message_allText.call(this);
    if ($.param.autoWrap) {
      str = str.replace(/\n/g, '');
    }
    return str;
  };

  // ---- below is Window_Message ----
  // ---------------------------------

  $.backup.Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function() {
    this._preloadResult = {};
    this.initResult(this._preloadResult);

    $.backup.Window_Message_initialize.call(this);

    this._createTwdPortrait();
    this._createTwdNameWindow();

    if ($.param.textWindowSkin.length > 0) {
      this.useTwdWindowskin = true;
      this.twdWindowskin = TwdWindowskin.load($.param.textWindowSkin);
    }

    if ($.param.textWindowSkinNoneFuki === '-') {
      $.param.textWindowSkinNoneFuki = $.param.textWindowSkin;
    }
    if ($.param.nameWindowSkinNoneFuki === '-') {
      $.param.nameWindowSkinNoneFuki = $.param.nameWindowSkin;
    }
    if ($.param.nameWindowSkin.length > 0) {
      this._twdNameWindow.useTwdWindowskin = true;
      this._twdNameWindow.twdWindowskin = TwdWindowskin.load($.param.nameWindowSkin);
    }

    if ($.param.goldWindowSkin.length > 0) {
      this._goldWindow.useTwdWindowskin = true;
      this._goldWindow.twdWindowskin = TwdWindowskin.load($.param.goldWindowSkin);
    }

    if ($.param.choiceWindowSkin.length > 0) {
      this._choiceWindow.useTwdWindowskin = true;
      this._choiceWindow.twdWindowskin = TwdWindowskin.load($.param.choiceWindowSkin);
    }

    if ($.param.numberWindowSkin.length > 0) {
      this._numberWindow.useTwdWindowskin = true;
      this._numberWindow.twdWindowskin = TwdWindowskin.load($.param.numberWindowSkin);
    }

    if ($.param.itemWindowSkin.length > 0) {
      this._itemWindow.useTwdWindowskin = true;
      this._itemWindow.twdWindowskin = TwdWindowskin.load($.param.itemWindowSkin);
    }

    if ($.param.textWindowMeta.length > 0) {
      this.addUserMeta($.param.textWindowMeta);
    }

    if ($.param.goldWindowMeta.length > 0) {
      this._goldWindow.addUserMeta($.param.goldWindowMeta);
    }

    if ($.param.choiceWindowMeta.length > 0) {
      this._choiceWindow.addUserMeta($.param.choiceWindowMeta);
    }

    if ($.param.nameWindowMeta.length > 0) {
      this._twdNameWindow.addUserMeta($.param.nameWindowMeta);
    }

    if ($.param.itemWindowMeta.length > 0) {
      this._itemWindow.addUserMeta($.param.itemWindowMeta);
    }

    if ($.param.numberWindowMeta.length > 0) {
      this._numberWindow.addUserMeta($.param.numberWindowMeta);
    }

  };

  Window_Message.prototype.paddingLeft = function() {
    var pad = this.padding + this._twdMeta.paddingDetail.left;
    if (this._preloadResult.nameWindow.enabled) {
      pad += this._twdMeta.paddingDetail.withNameWindow.left;
    }
    return pad;
  };

  Window_Message.prototype.paddingRight = function() {
    var pad = this.padding + this._twdMeta.paddingDetail.right;
    if (this._preloadResult.nameWindow.enabled) {
      pad += this._twdMeta.paddingDetail.withNameWindow.right;
    }
    return pad;
  };

  Window_Message.prototype.paddingTop = function() {
    var pad = this.padding + this._twdMeta.paddingDetail.top;
    if (this._preloadResult.nameWindow.enabled) {
      pad += this._twdMeta.paddingDetail.withNameWindow.top;
    }
    return pad;
  };

  Window_Message.prototype.paddingBottom = function() {
    var pad = this.padding + this._twdMeta.paddingDetail.bottom;
    if (this._preloadResult.nameWindow.enabled) {
      pad += this._twdMeta.paddingDetail.withNameWindow.bottom;
    }
    return pad;
  };

  Window_Message.prototype._createTwdNameWindow = function() {
    this._twdNameWindow = new Window_Base(1, 1);
    this._twdNameWindow.x = this.x;
    this._twdNameWindow.visible = false;
    this.addChild(this._twdNameWindow);
  };

  Window_Message.prototype._refreshTwdNameWindow = function(name) {
    var skinToBe = $.param.nameWindowSkinNoneFuki;
    if (this._preloadResult.fuki.enabled) {
      skinToBe = $.param.nameWindowSkin;
    }
    if (this._twdNameWindow.twdWindowskin) {
      if (this._twdNameWindow.twdWindowskin.name != skinToBe) {
        this._twdNameWindow.twdWindowskin = TwdWindowskin.load(skinToBe);
        this._twdNameWindow.twdWindowskin.addLoadListener(this._refreshTwdNameWindow.bind(this, name));
        return;
      }
    } else {
      if (skinToBe.length > 1) {
        this._twdNameWindow.twdWindowskin = TwdWindowskin.load(skinToBe);
        this._twdNameWindow.twdWindowskin.addLoadListener(this._refreshTwdNameWindow.bind(this, name));
        return;
      }
    }

    this._preloadResult.nameWindow.text = name;
    this._twdNameWindow.resetFontSettings();
    var newLineX = this.calcNewLineLeft(this._preloadResult) + this.paddingLeft();
    var namePaddingLeft = this._twdNameWindow.paddingLeft();
    var w = this._width;

    textState = {};
    textState.index = 0;
    textState.text = name;
    var height = this._twdNameWindow.calcTextHeight(textState) + this._twdNameWindow.paddingTop() + this._twdNameWindow.paddingBottom() + this._twdNameWindow._twdMeta.asNameWindow.heightDelta;
    var width = this._twdNameWindow.textWidth(name) + this._twdNameWindow.paddingLeft() + this._twdNameWindow.paddingRight() + this._twdNameWindow._twdMeta.asNameWindow.widthDelta;
    var y = -height + this._twdNameWindow._twdMeta.asNameWindow.offsetY;
    this._twdNameWindow.visible = true;

    var nw = width;
    var offsetX = eval(String(this._twdNameWindow._twdMeta.asNameWindow.offsetX));
    var x = offsetX;

    this._twdNameWindow.move(x, y, width, height);
    this._twdNameWindow.createContents();
    this._twdNameWindow.contents.drawText(name, 0, 0, this._twdNameWindow.contents.width,
      this._twdNameWindow.contents.height, 'center');
    //this._preloadResult.showNameWindow = true;
    this._twdNameWindow._openness = 0;
    //this._twdNameWindow.open();
    //if (!this._twdNameWindow._twdMeta.asNameWindow.openWhenDisplay) {
    //  this._twdNameWindow._openness = 255;
    //}
  };

  Window_Message.prototype._updateTwdNameWindow = function(name) {
    if (this.isOpen() && this._preloadResult.nameWindow.enabled) {
      this._twdNameWindow.visible = true;
      if(this._twdNameWindow.isClosed())      {
        this._twdNameWindow.open();
        if (!this._twdNameWindow._twdMeta.asNameWindow.openWhenDisplay) {
          this._twdNameWindow._openness = 255;
        }
      }
    } else {
      if (this._twdNameWindow.isClosed()) {
        this._twdNameWindow.visible = false;
      } else if (this._twdNameWindow.isOpen()) {
        this._twdNameWindow.close();
        if (!this._twdNameWindow._twdMeta.asNameWindow.closeWhenDisappear) {
          this._twdNameWindow._openness = 0;
        }
      }
    }
    if (this._twdNameWindow.visible) {
      this._twdNameWindow.update();
      if (this._twdNameWindow._opening || this._twdNameWindow._closing) {
        return true;
      }
    }
    return true;
  };

  Window_Message.prototype._createTwdPortrait = function() {
    this._twdPortrait = new Sprite();
    this._twdPortrait.visible = false;
    this.addChild(this._twdPortrait);
    this._preloadResult.showPortrait = false;
  };

  Window_Message.prototype._refreshTwdPortrait = function(bitmap, mirrow, index) {
    index = index || 0;
    var bitmapWidth = bitmap.width;
    if (index > 0) {
      this._twdPortrait.bitmap = bitmap;
      index--;
      var wUnit = bitmap.width / 4;
      var hUnit = bitmap.height / 2;
      bitmapWidth = wUnit;
      this._twdPortrait.setFrame((index % 4) * wUnit, Math.floor(index / 4) * hUnit, wUnit, hUnit);
    } else {
      this._twdPortrait.bitmap = bitmap;
      this._twdPortrait.setFrame(0, 0, bitmap.width, bitmap.height);
    }

    this._twdPortrait.visible = true;
    this._twdPortrait.anchor.x = 0.5;
    this._twdPortrait.anchor.y = 1;

    this._twdPortrait.x = this._twdMeta.portrait.indent + bitmapWidth / 2;
    this._twdPortrait.y = this.height - this._twdMeta.portrait.distanceToBottom;

    if (mirrow) {
      this._twdPortrait.scale.x = -1;
    } else {
      this._twdPortrait.scale.x = 1;
    }
    this._preloadResult.showPortrait = true;
  };

  Window_Message.prototype._updateTwdPortrait = function(bitmap, mirrow) {
    this._twdPortrait.visible = !!(this.isOpen() && this._preloadResult.showPortrait);
    return true;
  };

  Window_Message.prototype._updateTwdPortraitShow = function(bitmap, mirrow) {
    if(!!(this.isOpen() && this._preloadResult.showPortrait)){
      this._twdPortrait.visible = true;
    }
    return true;
  };

  Window_Message.prototype._updateTwdPortraitHide = function(bitmap, mirrow) {
    if(!!!(this.isOpen() && this._preloadResult.showPortrait)){
      this._twdPortrait.visible = false;
    }
    return true;
  };

  Window_Message.prototype.continueMessage = function() {
    this._textState.text += this.convertEscapeCharacters($gameMessage.allText());
    $gameMessage._twd.hasNext = false;
  };

  Window_Message.prototype.canContinue = function() {
    return !$gameMessage.scrollMode() && $gameMessage._twd.hasNext;
  };

  $.backup.Window_Message_update = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    //
    // if (!this._updateTwdPortrait()) {
    //   return;
    // }
    // if (!this._updateTwdNameWindow()) {
    //   return;
    // }
    //
    // if (!this._updateScrollContents()) {
    //   return;
    // }
    //
    // return $.backup.Window_Message_update.call(this);

    this.checkToNotClose();

    if (this.canContinue()) {
      this.continueMessage();
    }
    if (this.isFuki() && this.visible) {
      this.updateFukiPlacement();
    }

    if (!this._updateTwdPortrait()) {
      return;
    }
    if (!this._updateTwdNameWindow()) {
      return;
    }

    Window_Base.prototype.update.call(this);

    while (!this.isOpening() && !this.isClosing()) {
      if (this.updateWait()) {
        return;
      } else if (this.updateLoading()) {
        return;
      } else if (this.updateInput()) {
        return;
      } else if (!this._updateScrollContents()) {
        return;
      } else if (this.updateMessage()) {
        return;
      } else if (this.canStart()) {
        this.startMessage();
      } else {
        this.startInput();
        return;
      }
    }
  };

  Window_Message.prototype.isFuki = function() {
    return !!this._preloadResult.fuki.enabled;

  };

  Window_Message.prototype.hasImageToLoad = function() {
    return !!(this.hasMessageFace() ||
    this.hasPortraits() ||
    this.hasProfiles());

  };

  Window_Message.prototype.hasFaceToShow = function() {
    return !!(this.hasMessageFace() ||
    this.hasPortraits());

  };

  Window_Message.prototype.hasMessageFace = function() {
    return $gameMessage.faceName().length > 0;

  };

  Window_Message.prototype.hasPortraits = function() {
    return Object.keys(this._preloadResult.portraits).length > 0;

  };

  Window_Message.prototype.hasProfiles = function() {
    return Object.keys(this._preloadResult.busts).length > 0;

  };

  $.backup.Window_Message_doesContinue = Window_Message.prototype.doesContinue;
  Window_Message.prototype.doesContinue = function() {
    if (this.isFuki()) {
      return false;
    }
    return $.backup.Window_Message_doesContinue.call(this);
  };

  Window_Message.prototype.processTwdSharpString = function(param, textState) {
    if (param === null) {
      return;
    }
    switch (param.code) {
      case 'NEXT':
        $gameMessage._twd.flagWaitingForNext = true;
        $gameMessage._texts = [];
        break;
      case 'BR': // 换行
        this.processFukiNewLine(textState, this._preloadResult);
        break;
      case 'PP': // 页面暂停
        this.startPagePause();
        break;
      case 'F': //fuki
        break;
      case 'P': // 头像
      case 'PM': // 镜像头像
      {
        var filename = param.arrayParam[0];
        if ($gameMessage.faceName().length > 0) {
          filename = $gameMessage.faceName() + '_' + ($gameMessage.faceIndex() + 1) + '_' + filename;
        }
        var pic = this._preloadResult.portraits[filename];
        if (pic) {
          var mirrow = false;
          if (param.code === 'PM') {
            mirrow = true;
          }
          this._refreshTwdPortrait(pic.bitmap, mirrow);
        }
      }
        break;
      case 'LP': //半身像左边
        break;
      case 'LPM': //半身像左边镜像
        break;
      case 'RP': //半身像右边
        break;
      case 'RPM': //半身像右边镜像
        break;
      case 'N':
      {
        //if (param.arrayParam.length === 1) {
        //  this._refreshTwdNameWindow(param.arrayParam[0]);
        //} else if (param.arrayParam.length > 1) {
        //  var type = param.arrayParam[0];
        //  var value = param.arrayParam[1];
        //  if (type.toUpperCase() === 'T') {
        //    this._refreshTwdNameWindow(value);
        //  }
        //}

      }
        break;
      default:
        Window_Base.prototype.processTwdSharpString.call(this);
        break;
    }
  };

  $.backup.Window_Message_onEndOfText = Window_Message.prototype.onEndOfText;
  Window_Message.prototype.onEndOfText = function() {
    if ($gameMessage.isWaitingForNext()) {
      return;
    }
    $.backup.Window_Message_onEndOfText.call(this);
  };

  Window_Message.prototype.startMessage = function() {
    this.updateBackground(); //update meta

    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    this._needPostStart = false;

    this._preloadResult = {};
    this.initResult(this._preloadResult);
    this.previewText(this._textState, this._preloadResult);
    this.loadPictures(this._preloadResult);
    if (!this.hasPortraits()) {
      this.loadMessageFace();
    }

    var twdSkinShouldBe = $.param.textWindowSkinNoneFuki;
    if (this._preloadResult.fuki.enabled) {
      twdSkinShouldBe = $.param.textWindowSkin;
    }

    if (this.twdWindowskin) {
      if (this.twdWindowskin.name != twdSkinShouldBe) {
        this.twdWindowskin = TwdWindowskin.load(twdSkinShouldBe);
      }
    } else {
      if (twdSkinShouldBe.length > 1) {
        this.twdWindowskin = TwdWindowskin.load(twdSkinShouldBe);
      }
    }

    this._needPostStart = true;

    if (!this.hasImageToLoad()) {
      this.postStartMessage();
    }
  };

  Window_Message.prototype.postStartMessage = function() {
    this._textState.left = this.calcNewLineLeft(this._preloadResult);
    this._textState.x = this._textState.left;

    this.newPage(this._textState);

    if (this.isFuki()) {
      calcState = {};
      calcState.left = this._textState.left;
      calcState.x = this._textState.x;
      calcState.y = this._textState.y;
      calcState.height = this._textState.height;
      calcState.text = this._textState.text;
      calcState.index = this._textState.index;

      this.calcFukiText(calcState, this._preloadResult);
    }

    if(this._preloadResult.nameWindow.enabled){
      this._refreshTwdNameWindow(this._preloadResult.nameWindow.name);
    }

    this.updatePlacement();
    this.updateBackground();
    this.open();

    if (this.hasMessageFace() && !this.hasPortraits()) {
      this._refreshTwdPortrait(this._faceBitmap, false, $gameMessage.faceIndex() + 1);
      this._faceBitmap = null;
    }

    this._needPostStart = false;
  };

  $.backup.Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function() {
    if (this.isFuki()) {
      this.move(0, 0,
        this._preloadResult.fuki.width + this.paddingLeft() + this.paddingRight(), this._preloadResult.fuki.height + this.paddingTop() + this.paddingBottom());
      this._refreshContents();
      this.createContents();
      this._positionType = -1;
      this.updateFukiPlacement();
    } else {
      this.move((Graphics.boxWidth - this.windowWidth()) / 2, this.y, this.windowWidth(), this.windowHeight());
      this.createContents();
      $.backup.Window_Message_updatePlacement.call(this);
    }

  };

  Window_Message.prototype.updateFukiPlacement = function() {
    var charaId = this._preloadResult.fuki.charaId;
    var chara = null;

    if (charaId === 0) {
      chara = $gameMap.event($gameMap._interpreter.eventId());
    } else if (charaId > 0) {
      chara = $gameMap.event(charaId);
    } else if (charaId < 0) {
      charaId = -charaId;
      if (charaId == 1) {
        chara = $gamePlayer;
      } else {
        chara = $gamePlayer.followers().follower(charaId - 2);
      }
    }

    if (chara) {
      this.updateFukiPlacementByChara(chara);
    } else {
      this.x = (Graphics.boxWidth - this.width) / 2;
      this.y = (Graphics.boxHeight - this.height) / 2;
    }

  };

  Window_Message.prototype.updateFukiPlacementByChara = function(chara) {
    var xReverse = false;
    var yReverse = false;

    var charaHeight = this._preloadResult.charaHeight || 0;
    if (charaHeight <= 0) {
      charaHeight = this._twdMeta.fuki.charaHeight;
    }

    var aTop = this.twdMeta.fuki.additionTopForPlacement;
    var aBottom = this.twdMeta.fuki.additionBottomForPlacement;
    var aLeft = this.twdMeta.fuki.additionLeftForPlacement;
    var aRight = this.twdMeta.fuki.additionRightForPlacement;

    var x1 = chara.screenX() - this.width / 2;
    var x2 = x1 + this.width;
    var y1 = chara.screenY() - this.height - this._twdMeta.fuki.arrowHeight - charaHeight - this._twdMeta.fuki.charaSpace;
    var y2 = y1 + this.height;

    if (y1 < aTop) {
      yReverse = true;
      y1 = chara.screenY() + this._twdMeta.fuki.arrowHeight + this._twdMeta.fuki.charaSpace;
      y2 = y1 + this.height;
    }

    if (y1 < aTop) {
      y1 = aTop;
      y2 = y1 + this.height;
    }
    if (y2 > Graphics.boxHeight - aBottom) {
      y2 = Graphics.boxHeight - aBottom;
      y1 = y2 - this.height;
    }
    if (x1 < aLeft) {
      x1 = aLeft;
      x2 = x1 + this.width;
    }

    if (x2 > Graphics.boxWidth - aRight) {
      x2 = Graphics.boxWidth - aRight;
      x1 = x2 - this.width;
    }

    if (x1 + x2 / 2 > chara.screenX()) {
      xReverse = true;
    }

    var position = 7;
    if (xReverse && yReverse) {
      position = 3;
    } else if (!xReverse && yReverse) {
      position = 9;
    } else if (xReverse && !yReverse) {
      position = 1;
    } else if (!xReverse && !yReverse) {
      //pass
    }

    if (this._preloadResult.fuki.position != position) {
      this._preloadResult.fuki.position = position;
      this._refreshFrame();
      this._refreshBack();
    }

    this.x = Math.round(x1);
    this.y = Math.round(y1);
  };


  Window_Message.prototype.updateLoading = function() {
    if (this._faceBitmap || this.hasPortraits() || this.hasProfiles()) {
      if (ImageManager.isReady()) {
        if (this._faceBitmap) {
          this._preloadResult.originFaceWidth = this._faceBitmap.width / 4;
          //this.drawMessageFace();
        }
        if (this._needPostStart) {
          this.postStartMessage();
        }
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  Window_Message.prototype.initResult = function(result) {
    result.fuki = {};
    result.fuki.enabled = false;
    result.fuki.charaId = 0;
    result.fuki.width = 0;
    result.fuki.height = 0;
    result.fuki.lines = 1;
    result.fuki.position = 7;
    result.busts = {};
    result.portraits = {};
    result.nameWindow = {};
    result.nameWindow.enabled = false;
    result.nameWindow.text = '';
  };
  Window_Message.prototype.previewText = function(textState, result) {
    //console.log("in Window_Message.prototype.previewText");
    // 先扫描fuki和头像
    var lastTextIndex = textState.index;
    while (textState.index < textState.text.length) {
      switch (textState.text[textState.index]) {
        case '\x1c':
        {
          var param = this.obtainTwdSharpString(textState);
          switch (param.code) {
            case 'N': //name
              result.nameWindow.enabled = true;
              result.nameWindow.name = param.arrayParam[0];
              break;
            case 'F': //fuki
              result.fuki.enabled = true;
              result.fuki.charaId = eval(param.arrayParam[0]);
              if (param.arrayParam.length > 1) {
                result.charaHeight = eval(param.arrayParam[1]);
              }
              break;
            case 'P': // 头像
            case 'PM': // 镜像头像
              var ps = {};
              ps.short = param.arrayParam[0];
              ps.filename = ps.short;
              if (!result.portraits[ps.filename]) {
                if ($gameMessage.faceName().length > 0) {
                  ps.filename = $gameMessage.faceName() + '_' + ($gameMessage.faceIndex() + 1) + '_' + ps.short;
                }
                ps.bitmap = null;
                result.portraits[ps.filename] = ps;
              }
              break;
            case 'LP': //半身像左边
            case 'LPM': //半身像左边镜像
            case 'RP': //半身像右边
            case 'RPM': //半身像右边镜像
              var ps = {};
              ps.short = param.arrayParam[0];
              ps.filename = ps.short;
              if (!result.busts[ps.filename]) {
                if ($gameMessage.faceName().length > 0) {
                  ps.filename = $gameMessage.faceName() + '_' + ($gameMessage.faceIndex() + 1) + '_' + ps.short;
                }
                ps.bitmap = null;
                result.busts[ps.filename] = ps;
              }
              break;
          }
        }
          break;
        default:
          textState.index++;
          break;
      }
    }
    textState.index = lastTextIndex;
    //console.log("out Window_Message.prototype.previewText");
  };

  Window_Message.prototype.processFukiNewLine = function(textState, result) {
    if (result.fuki.width < textState.x) {
      result.fuki.width = textState.x;
    }
    textState.x = textState.left;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState, false);
    result.fuki.height = textState.y + textState.height;
    result.fuki.lines++;
    //textState.index++;
  };
  Window_Message.prototype.calcFukiText = function(textState, result) {
    var metNewPage = false;
    result.fuki.height = textState.height;
    this.saveFontSetting();
    while (textState.index < textState.text.length) {
      metNewPage = false;
      var c = textState.text[textState.index];
      switch (c) {
        case '\n':
        {
          this.processFukiNewLine(textState, result);
          textState.index++;
        }
          break;
        case '\f':
          textState.index++;
          metNewPage = true;
          break;
        case '\x1b':
        {
          code = this.obtainEscapeCode(textState);
          switch (code) {
            case 'C':
            case 'OC':
              this.obtainEscapeParam(textState);
              break;
            case 'I':
              var iconIndex = this.obtainEscapeParam(textState);
              this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
              textState.x += Window_Base._iconWidth + 4;
              break;
            case '{':
              this.makeFontBigger();
              break;
            case '}':
              this.makeFontSmaller();
              break;
            case 'MSGCORE':
              var id = this.obtainEscapeParam(textState);
              if (id === 0) this.resetFontSettings();
              if (id === 1) this.contents.fontBold = !this.contents.fontBold;
              if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
              break;
            case 'FS':
              this.contents.fontSize = this.obtainEscapeParam(textState);
              break;
            case 'FN':
              var name = this.obtainEscapeString(textState);
              this.contents.fontFace = name;
              break;
            case 'OW':
              this.contents.outlineWidth = this.obtainEscapeParam(textState);
              break;
            case 'PX':
              textState.x = this.obtainEscapeParam(textState);
              break;
            case 'PY':
              textState.y = this.obtainEscapeParam(textState);
              break;
          }
        }
          break;
        case '\x1c':
        {
          var param = this.obtainTwdSharpString(textState);
          switch (param.code) {
            case 'BR': //半身像右边镜像
              this.processFukiNewLine(textState, result);
              break;
          }
        }
          break;
        default:
        {
          var w = this.textWidth(c);
          var needNewLine = false;
          if ($.param.autoWrap) {
            var maxWidth = 0;
            if (this.hasPortraits()) {
              maxWidth = this._twdMeta.fuki.maxWidthWithPortrait;
            } else {
              maxWidth = this._twdMeta.fuki.maxWidth;
            }

            if (textState.x + w > maxWidth) {
              needNewLine = true;
            }
          }
          if (needNewLine) {
            this.processFukiNewLine(textState, result);
          }

          textState.x += w;
          if (result.fuki.width < textState.x) {
            result.fuki.width = textState.x;
          }

          textState.index++;
        }
          break;
      }

      if (metNewPage) {
        break;
      }
    }

    {
      result.fuki.width = Math.ceil(result.fuki.width);
      result.fuki.height = Math.ceil(result.fuki.height);
      var maxWidth = this._twdMeta.fuki.maxWidth;
      if (this.hasPortraits()) {
        maxWidth = this._twdMeta.fuki.maxWidthWithPortrait;
      }

      var minWidth = this._twdMeta.fuki.minWidth;
      if (this.hasPortraits()) {
        minWidth = this._twdMeta.fuki.minWidthWithPortrait;
      }

      var maxHeight = this._twdMeta.fuki.maxLines * this.lineHeight();
      var minHeight = this._twdMeta.fuki.minLines * this.lineHeight();

      if (this.hasPortraits()) {
        minHeight = this._twdMeta.fuki.minLinesWidthPortrait * this.lineHeight();
      } else if ($gameMessage.faceName() !== '') {
        var minHeightWithFace = 144;
        if (minHeight < minHeightWithFace) {
          minHeight = minHeightWithFace;
        }
      }

      if (result.fuki.width > maxWidth) {
        result.fuki.width = maxWidth;
      }
      if (result.fuki.height > maxHeight) {
        result.fuki.height = maxHeight;
      }
      if (result.fuki.width < minWidth) {
        result.fuki.width = minWidth;
      }
      if (result.fuki.height < minHeight) {
        result.fuki.height = minHeight;
      }
    }
    this.loadFontSetting();
    return result;
  };

  Window_Message.prototype.saveFontSetting = function() {
    this._backupFontSetting = {};
    var backup = this._backupFontSetting;
    backup.fontFace = this.contents.fontFace;
    backup.fontSize = this.contents.fontSize;
    backup.fontBold = this.contents.fontBold;
    backup.fontItalic = this.contents.fontItalic;
    backup.outlineWidth = this.contents.outlineWidth;
  };
  Window_Message.prototype.loadFontSetting = function() {
    var backup = this._backupFontSetting;
    this.contents.fontFace = backup.fontFace;
    this.contents.fontSize = backup.fontSize;
    this.contents.fontBold = backup.fontBold;
    this.contents.fontItalic = backup.fontItalic;
    this.contents.outlineWidth = backup.outlineWidth;
  };
  Window_Message.prototype.calcNewLineLeft = function(result) {
    //  if (!result || Object.keys(result.portraits).length < 1) {
    //    return this.newLineX();
    //  } else {

    if ($gameMessage.faceName() === '' && !this.hasPortraits()) {
      return 0;
    }
    var left = 0;

    if (!this.hasPortraits()) {
      left = this._preloadResult.originFaceWidth || 0;
    } else {
      for (p in result.portraits) {
        pic = result.portraits[p];
        if (pic.bitmap.width > left) {
          left = pic.bitmap.width;
        }
      }
    }

    left += this._twdMeta.portrait.indent;
    left += this._twdMeta.portrait.spacing;

    left -= this.paddingLeft(); // 因为contents相对远点有padding的位移
    return left;
    //  }
  };

  Window_Message.prototype.loadPictures = function(result) {
    for (pic in result.portraits) {
      var p = result.portraits[pic];
      if (p.filename === undefined || p.filename === null) {
        continue;
      }
      p.bitmap = ImageManager.loadBitmap('img/portraits/', p.filename.toLowerCase(), 0, true);
    }

    for (pic in result.busts) {
      var p = result.busts[pic];
      if (p.filename === undefined || p.filename === null) {
        continue;
      }
      p.bitmap = ImageManager.loadBitmap('img/busts/', p.filename.toLowerCase(), 0, true);
    }
  };

  $.backup.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    $.backup.Window_Message_terminateMessage.call(this);
    this._preloadResult = {};
    this.initResult(this._preloadResult);
  };

  Window_Message.prototype.newPage = function(textState) {
    this.contents.clear();
    this.resetFontSettings();
    this.clearFlags();

    textState.left = this.calcNewLineLeft(this._preloadResult);
    textState.x = textState.left;
    textState.y = 0;
    textState.height = this.calcTextHeight(textState, false);
  };

  $.backup.Window_Message_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function(textState) {
    if ($.param.autoWrap) {
      var c = textState.text[textState.index];
      var w = this.textWidth(c);
      var needNewLine = false;
      var maxWidth = this.contents.width;

      if (textState.y + textState.height > this.contents.height) {
        this.startPagePause();
        return;
      }

      if (textState.x + w > maxWidth) {
        needNewLine = true;
      }
      if (needNewLine) {
        this.processFukiNewLine(textState, this._preloadResult);
      }
    }

    if (textState.y + textState.height > this.contents.height) {
      this.startPagePause();
      return;
    }

    $.backup.Window_Message_processNormalCharacter.call(this, textState);
  };

  if (typeof(Window_Message.prototype.isFastForward) === 'function') {
    $.backup.Window_Message_isFastForward = Window_Message.prototype.isFastForward;
  } else {
    $.backup.Window_Message_isFastForward = function() {
    };
  }
  Window_Message.prototype.isFastForward = function() {
    return $.backup.Window_Message_isFastForward.call(this);
  };

  Window_Message.prototype.updateInput = function() {
    if (this.isAnySubWindowActive()) {
      return true;
    }
    if (this.isFastForward()) {
      if (this.pause) {
        if (!this._textState) {
          this.pause = false;
          this.terminateMessage();
        }
        return true;
      } else if (this.pagePause) {
        this.pagePause = false;
        this.endPagePause();
        return true;
      }
    }
    if (this.pause) {
      if (this.isTriggered()) {
        Input.update();
        TouchInput.update();
        if (TouchInput.cancelNextClick) {
          TouchInput.cancelNextClick("left");
          TouchInput.cancelNextClick("touch");
        }
        this.pause = false;
        if (!this._textState) {
          this.terminateMessage();
        }
      }
      return true;
    } else if (this.pagePause) {
      if (this.isTriggered()) {
        Input.update();
        TouchInput.update();
        if (TouchInput.cancelNextClick) {
          TouchInput.cancelNextClick("left");
          TouchInput.cancelNextClick("touch");
        }
        this.pagePause = false;
        this.endPagePause();
      }
      return true;
    } else if (this.needScrollContents) {
      if (this.isTriggered()) {
        Input.update();
        TouchInput.update();
        if (TouchInput.cancelNextClick) {
          TouchInput.cancelNextClick("left");
          TouchInput.cancelNextClick("touch");
        }
        this.scrollContentsLeftFrames = -4;
      }
    }
    return false;
  };

  Window_Message.prototype.startPagePause = function() {
    this.startWait(10);
    this.pagePause = true;
    this.downArrowVisible = true;
  };

  Window_Message.prototype.endPagePause = function() {
    if (this.needsNewPage(this._textState)) {
      this.startScrollContents();
    } else {
      this.downArrowVisible = false;
    }
  };

  Window_Message.prototype.startScrollContents = function() {
    this.needScrollContents = true;

    this.scrollContentsLeftFrames = 20;
    this.scrollContentsTotalFrames = 20;

    if (this.isFastForward()) {
      this.scrollContentsLeftFrames = 1;
      this.scrollContentsTotalFrames = 1;
    }
  };

  Window_Message.prototype._updateScrollContents = function() {
    if (this.needScrollContents) {
      this.scrollContentsLeftFrames--;
      if (this.scrollContentsLeftFrames < 0) {
        this.downArrowVisible = false;
        if (!this.isFastForward()) {
          if (this.scrollContentsLeftFrames <= -5) {
            this._endScrollContents();
            return true;
          } else {
            return false;
          }
        } else {
          this._endScrollContents();
          return true;
        }
      }
      var newHeight = this.contents.height * this.scrollContentsLeftFrames / this.scrollContentsTotalFrames;
      this.origin.y = this.contents.height - newHeight;
      return false;
    }
    return true;
  };

  Window_Message.prototype._endScrollContents = function() {
    this.origin.y = 0;
    this.newPage(this._textState);
    this.needScrollContents = false;
  };

  Window_Message.prototype.updateMessage = function() {
    if (this._textState) {
      while (!this.isEndOfText(this._textState)) {
        // if (this.needsNewPage(this._textState)) {
        //   this.newPage(this._textState);
        //   break;
        // }
        this.updateShowFast();
        this.processCharacter(this._textState);
        if (!this._showFast && !this._lineShowFast) {
          break;
        }
        if (this.pause || this._waitCount > 0 || this.pagePause) {
          break;
        }
      }
      if (this.isEndOfText(this._textState)) {
        this.onEndOfText();
      }
      return true;
    } else {
      return false;
    }
  };

  Window_ChoiceList.prototype.windowWidth = function() {
    var width = this.maxChoiceWidth() + this.paddingLeft() + this.paddingRight();
    return Math.min(width, Graphics.boxWidth);
  };

  $.backup.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
    if (this._messageWindow._preloadResult.fuki.enabled) {
      var positionType = $gameMessage.choicePositionType();
      var messageY = this._messageWindow.y;
      var messageX = this._messageWindow.x;
      var messageW = this._messageWindow.width;
      var messageH = this._messageWindow.height;

      this.width = this.windowWidth();
      this.height = this.windowHeight();
      switch (positionType) {
        case 0:
          this.x = messageX;
          break;
        case 1:
          this.x = (messageW - this.width) / 2 + messageX;
          break;
        case 2:
          this.x = messageX + messageW - this.width;
          break;
      }

      this.y = messageY;

      this.x += 10;
      this.y += this._messageWindow.height - this._messageWindow.paddingBottom();
    } else {
      $.backup.Window_ChoiceList_updatePlacement.call(this);
    }
  };

  Window_NumberInput.prototype.windowWidth = function() {
    return this.maxCols() * this.itemWidth() + this.paddingLeft() + this.paddingRight();
  };

  $.backup.Window_Gold_systemColor = Window_Gold.prototype.systemColor;
  Window_Gold.prototype.systemColor = function() {
    if (this.twdMeta.unitFontColor.length < 3) {
      return $.backup.Window_Gold_systemColor.call(this);
    } else {
      return this.twdMeta.unitFontColor;
    }
  };

  $.backup.Window_Gold_refresh = Window_Gold.prototype.refresh;
  Window_Gold.prototype.refresh = function() {
    this.createContents();
    $.backup.Window_Gold_refresh.call(this);
  };

})(TWDP.SME);
