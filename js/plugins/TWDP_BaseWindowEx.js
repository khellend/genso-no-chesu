//=============================================================================
// Trentswd Plugins - ShowMessageEx
// TWDP_BaseWindowEx.js
//=============================================================================

var Imported = Imported || {};
Imported.TWDP_BaseWindowEx = true;

var TWDP = TWDP || {};
TWDP.BWE = TWDP.BWE || {};

//=============================================================================
/*:
 * @plugindesc v1.00 Extend the show message window.
 * @author Trentswd
 *
 * @param Use TWD Window Skin
 * @desc Wether to use the TWD Window Skin or not.
 * true - Use  false - Don't Use
 * @default true
 *
 * @param Default Window Skin
 * @desc The name of window skin by default. Only available when TWD Window Skin is used. Empty for no change.
 * @default
 *
 * @param User Window Meta
 * @desc A json that control window's apparence. The example is listed in help.
 * @default {}
 *
 * @param Enable Window Stacking
 * @desc Alter WindowLayer to enable window stacking(experimental).
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Don't have time to write this right now, sorry.
 *
 * Default Window Meta
 * --------------------
 * {
 *   "fontSize": 28,
 *   "padding": 24,
 *   "fontColor": "#785028",
 *   "lineHeight": 36,
 *   "textOutline": true,
 *   "textShadowed": false,
 *   "shadowColor": "rgba(0,0,0,0.5)",
 *   "shadowDistance": 1,
 *   "fuki": {
 *     "maxWidth": 480,
 *     "maxWidthWithPortrait": 360,
 *     "minWidth": 80,
 *     "minWidthWithPortrait": 120,
 *     "maxLines": 4,
 *     "minLines": 1,
 *     "minLinesWidthPortrait": 3,
 *     "arrowHeight": 15,
 *     "portrait": {
 *        "indent": 20,
 *        "spacing": 20,
 *        "distanceToBottom": 5
 *      }
 *   }
 *}
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

TWDP.parameters = PluginManager.parameters('TWDP_BaseWindowEx');
TWDP.BWE.param = TWDP.BWE.Param || {};

TWDP.BWE.param.ifUseTwdSkin = eval(String(TWDP.parameters['Use TWD Window Skin']));
TWDP.BWE.param.defaultWindowSkin = String(TWDP.parameters['Default Window Skin']).trim();
TWDP.BWE.param.userWindowMeta = String(TWDP.parameters['User Window Meta']).trim();
TWDP.BWE.param.enableWindowStacking = eval(String(TWDP.parameters['Enable Window Stacking']));

function TwdWindowskin() {
  this.initialize.apply(this, arguments);
}

function mergeObject(obj1, obj2) {
  var obj3 = {}
  for (var key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      if (obj1[key] instanceof Object) {
        var ob = mergeObject(obj1[key], obj2[key]);
        obj3[key] = ob;
      } else {
        obj3[key] = obj2[key]
      }
    } else {
      obj3[key] = obj1[key];
    }
  }

  for (var key in obj2) {
    if (!obj3.hasOwnProperty(key)) {
      obj3[key] = obj2[key];
    }
  }

  return obj3;
}

(function($) {
  $.backup = $.backup || {}

  // ---- below is TwdWindowSkin ----
  // --------------------------------

  TwdWindowskin.prototype.constructor = TwdWindowskin;

  TwdWindowskin.prototype.initialize = function() {
    this.bitmap = null;
    this.data = null;
    this.bitmapLoaded = false;
    this.dataLoaded = false;
    this.name = "";
    this._loadListeners = [];
  };

  TwdWindowskin.prototype.addLoadListener = function(listner) {
    if (!this.isLoaded) {
      this._loadListeners.push(listner);
    } else {
      listner();
    }
  };

  TwdWindowskin.TwdSkinCache = [];

  TwdWindowskin.load = function(filename) {
    if (filename.length < 1) {
      return null;
    }
    var skin = TwdWindowskin.TwdSkinCache[filename];
    if (skin) {

    } else {
      skin = new TwdWindowskin();
      skin.name = filename;
      var xhr = new XMLHttpRequest();
      var url = 'img/twdWindowskin/' + filename + '.json';
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
        if (xhr.status < 400) {
          skin.data = JSON.parse(xhr.responseText);
          skin.onLoadData.call(skin);
        }
      }
      xhr.onerror = function() {
        throw new Error('Could not load ' + url);
      };
      xhr.send();

      if (TwdWindowskin.TwdSkinCache.length > 20) {
        TwdWindowskin.TwdSkinCache = [];
      }
      TwdWindowskin.TwdSkinCache[filename] = skin;
    }


    return skin;
  };

  TwdWindowskin.prototype.onLoad = function() {
    if (this.bitmapLoaded && this.dataLoaded) {
      while (this._loadListeners.length > 0) {
        var listener = this._loadListeners.shift();
        listener();
      }
    }
  }

  TwdWindowskin.prototype.onLoadBitmap = function() {
    this.bitmapLoaded = true;
    this.onLoad();
  }
  TwdWindowskin.prototype.onLoadData = function() {
    this.dataLoaded = true;
    var filename = this.name;
    if (this.data.fileName) {
      filename = this.data.fileName;
    }
    var path = "twdWindowskin";
    if (this.data.path) {
      path = this.data.path;
    }
    this.bitmap = ImageManager.loadBitmap('img/' + path + '/', filename, 0, true);
    this.bitmap.addLoadListener(this.onLoadBitmap.bind(this));
    this.onLoad();
  }

  Object.defineProperty(TwdWindowskin.prototype, 'isLoaded', {
    get: function() {
      return this.bitmapLoaded && this.dataLoaded;
    },
    configurable: false
  });

  // ---- below is Window ----
  // -------------------------

  $.backup.Window_initialize = Window.prototype.initialize;
  Window.prototype.initialize = function() {
    $.backup.Window_initialize.call(this);
    this._useTwdWindowskin = $.param.ifUseTwdSkin;
    if ($.param.defaultWindowSkin.length > 0) {
      this._twdWindowskin = TwdWindowskin.load($.param.defaultWindowSkin);
      this._twdWindowskin.addLoadListener(this._onTwdWindowskinLoad.bind(this));
    }
    this._initTwdMeta();
    if ($.param.userWindowMeta.length > 0) {
      this.setUserMeta($.param.userWindowMeta);
    }
  }

  Window.prototype._initTwdMeta = function() {
    this._twdMeta = {};
    this._twdMetaUser = {};
    this._twdMetaDefault = {};
    this._twdMetaSkin = {};
    this._twdMetaDefault = {
      "fontSize": 28,
      "padding": 18,
      "fontColor": "0",
      "unitFontColor": "",
      "lineHeight": 36,
      "textOutlined": true,
      "textShadowed": false,
      "outlineColor": "rgba(0, 0, 0, 0.5)",
      "shadowColor": "rgba(0,0,0,0.5)",
      "shadowDistance": 1,
      "outlineWidth": 4,
      "back": {
        "opacity": 192,
        "useTone": true
      },
      "paddingDetail": {
        "top": 0,
        "left": 0,
        "right": 0,
        "bottom": 0,
        "withNameWindow": {
          "top": 0,
          "left": 0,
          "right": 0,
          "bottom": 0
        }
      },
      "fuki": {
        "maxWidth": 580,
        "maxWidthWithPortrait": 700,
        "minWidth": 80,
        "minWidthWithPortrait": 200,
        "maxLines": 4,
        "minLines": 1,
        "minLinesWidthPortrait": 4,
        "arrowHeight": 0,
        "charaHeight": 50,
        "charaSpace": 15,
        "additionTopForPlacement": 0,
        "additionLeftForPlacement": 0,
        "additionRightForPlacement": 0,
        "additionBottomForPlacement": 0
      },
      "portrait": {
        "indent": 0,
        "spacing": 10,
        "distanceToBottom": 0
      },
      "asNameWindow": {
        "offsetX": 200,
        "offsetY": 0,
        "widthDelta": 0,
        "heightDelta": 0,
        "openWhenDisplay": true,
        "closeWhenDisappear": true
      }
    };
    this._updateTwdMeta();
  };

  Window.prototype._updateTwdMeta = function() {
    this.twdMeta;
    if (this._backgroundType === 1) {
      this._twdMeta = this._twdMetaDefault;
      if (this._twdMetaDefault.dimMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaDefault.dimMeta);
      };

      this._twdMeta = mergeObject(this._twdMeta, this._twdMetaSkin);
      if (this._twdMetaSkin.dimMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaSkin.dimMeta);
      };

      this._twdMeta = mergeObject(this._twdMeta, this._twdMetaUser);
      if (this._twdMetaUser.dimMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaUser.dimMeta);
      };
    } else if (this._backgroundType === 2) {
      this._twdMeta = this._twdMetaDefault;
      if (this._twdMetaDefault.noneMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaDefault.noneMeta);
      };

      this._twdMeta = mergeObject(this._twdMeta, this._twdMetaSkin);
      if (this._twdMetaSkin.noneMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaSkin.noneMeta);
      };

      this._twdMeta = mergeObject(this._twdMeta, this._twdMetaUser);
      if (this._twdMetaUser.noneMeta instanceof Object) {
        this._twdMeta = mergeObject(this._twdMeta, this._twdMetaUser.noneMeta);
      };
    } else {
      this._twdMeta = mergeObject(this._twdMetaDefault, this._twdMetaSkin);
      this._twdMeta = mergeObject(this._twdMeta, this._twdMetaUser);
    }
  }

  Window.prototype.setUserMeta = function(meta) {
    if (typeof meta === 'string' || meta instanceof String) {
      this._twdMetaUser = JSON.parse(meta);
    } else if (meta instanceof Object) {
      this._twdMetaUser = meta;
    }
    this._refreshMeta();
  }

  Window.prototype.addUserMeta = function(meta) {
    if (typeof meta === 'string' || meta instanceof String) {
      this._twdMetaUser = mergeObject(this._twdMetaUser,JSON.parse(meta));
    } else if (meta instanceof Object) {
      this._twdMetaUser = mergeObject(this._twdMetaUser,meta);
    }
    this._refreshMeta();
  }

  $.backup.Window_createAllParts = Window.prototype._createAllParts;
  Window.prototype._createAllParts = function() {
    $.backup.Window_createAllParts.call(this);
  };

  $.backup.Window_refreshAllParts = Window.prototype._refreshAllParts;
  Window.prototype._refreshAllParts = function() {
    this._refreshMeta();
    $.backup.Window_refreshAllParts.call(this);
    if (this.shouldUseTwdWindowskin) {
      this._refreshAccessories();
    }
  };

  $.backup.Window_updateTransform = Window.prototype.updateTransform;
  Window.prototype.updateTransform = function() {
    this._updateAccessories();
    $.backup.Window_updateTransform.call(this);
  };

  Window.prototype._onTwdWindowskinLoad = function() {
    if (Array.isArray(this._accessories)) {
      for (sprite of this._accessories) {
        this.removeChild(sprite);
      }
      this._accessories = null;
    }
    this._accessoriesCreated = false;
    this._refreshAllParts();
  };

  Object.defineProperty(Window.prototype, 'twdWindowskin', {
    get: function() {
      return this._twdWindowskin;
    },
    set: function(value) {
      if (!value) {
        this._twdWindowskin = null;
        this._onTwdWindowskinLoad();
        return;
      }
      if (this._twdWindowskin !== value) {
        this._twdWindowskin = value;
        this._twdWindowskin.addLoadListener(this._onTwdWindowskinLoad.bind(this));
      }
    },
    configurable: true
  });

  Object.defineProperty(Window.prototype, 'twdMeta', {
    get: function() {
      if (!this._twdMeta) {
        this._initTwdMeta();
      }
      return this._twdMeta;
    },
    set: function(value) {
      if (this._twdMeta !== value) {
        this.setUserMeta(value);
      }
    },
    configurable: true
  });

  Object.defineProperty(Window.prototype, 'useTwdWindowskin', {
    get: function() {
      return this._useTwdWindowskin;
    },
    set: function(value) {
      if (this._useTwdWindowskin !== value) {
        this._useTwdWindowskin = value;
        if (this._twdWindowskin instanceof TwdWindowskin) {
          this._twdWindowskin.addLoadListener(this._onTwdWindowskinLoad.bind(this));
        }
      }
    },
    configurable: true
  });

  Object.defineProperty(Window.prototype, 'isTwdWindowskinLoaded', {
    get: function() {
      return this._twdWindowskin && this._twdWindowskin.isLoaded;
    },
    configurable: false
  });

  Object.defineProperty(Window.prototype, 'shouldUseTwdWindowskin', {
    get: function() {
      return this._useTwdWindowskin && this._twdWindowskin && this._twdWindowskin.isLoaded;
    },
    configurable: false
  });

  Object.defineProperty(Window.prototype, 'padding', {
    get: function() {
      if (!this._padding) {
        this._padding = this.twdMeta.padding;
      }
      return this._padding;
    },
    set: function(value) {
      this._padding = value;
      this._refreshAllParts();
    },
    configurable: true
  });

  Window.prototype.drawTwdBitmap = function(bitmap, w, h, twdSkin, twdArray, xoffset) {
    if (twdArray && Array.isArray(twdArray)) {
      xoffset = xoffset || 0;
      var skin = twdSkin.bitmap;
      var ox, oy, ow, oh, tx, ty, tw, th, fillType
      for (tile of twdArray) {
        ox = eval(String(tile.x));
        oy = eval(String(tile.y));
        ow = eval(String(tile.w));
        oh = eval(String(tile.h));
        tx = eval(String(tile.tx)) + xoffset;
        ty = eval(String(tile.ty));
        tw = eval(String(tile.tw));
        th = eval(String(tile.th));
        fillType = tile.fillType;
        if (fillType === "repeat") {
          var offsetX = tx;
          var maxX = tw + tx;
          var maxY = th + ty
          while (offsetX < maxX) {
            var offsetY = ty;
            while (offsetY < maxY) {
              bitmap.blt(skin, ox, oy, Math.min(ow, maxX - offsetX), Math.min(oh, maxY - offsetY), offsetX, offsetY);
              offsetY += oh;
            }
            offsetX += ow;
          }
        } else {
          bitmap.blt(skin, ox, oy, ow, oh, tx, ty, tw, th);
        }
      }
    }
  }

  $.backup.Window_refreshBack = Window.prototype._refreshBack;
  Window.prototype._refreshBack = function() {
    if (this.shouldUseTwdWindowskin) {
      var w = this._width;
      var h = this._height;

      var bitmap = new Bitmap(w, h);

      this._windowBackSprite.bitmap = bitmap;
      this._windowBackSprite.setFrame(0, 0, w, h);
      this._windowBackSprite.move(0, 0);
      this._windowBackSprite.opacity = this._twdMeta.back.opacity;

      if (w > 0 && h > 0) {
        this.drawTwdBitmap(bitmap, w, h, this._twdWindowskin, this._twdWindowskin.data.back);

        if (this._twdMeta.back.useTone) {
          var tone = this._colorTone;
          bitmap.adjustTone(tone[0], tone[1], tone[2]);
        }
      }
    } else {
      $.backup.Window_refreshBack.call(this);
    }
  };

  $.backup.Window_refreshFrame = Window.prototype._refreshFrame;
  Window.prototype._refreshFrame = function() {
    if (this.shouldUseTwdWindowskin) {
      var w = this._width;
      var h = this._height;

      var bitmap = new Bitmap(w, h);

      this._windowFrameSprite.bitmap = bitmap;
      this._windowFrameSprite.setFrame(0, 0, w, h);

      if (w > 0 && h > 0) {
        this.drawTwdBitmap(bitmap, w, h, this._twdWindowskin, this._twdWindowskin.data.frame);
      }
    } else {
      $.backup.Window_refreshFrame.call(this);
    }
  };

  $.backup.Window_refreshPauseSign = Window.prototype._refreshPauseSign;
  Window.prototype._refreshPauseSign = function() {
    if (this.shouldUseTwdWindowskin) {
      if (!this._twdWindowskin.data.pauseSign.bitmaps || !this._twdWindowskin.data.pauseSign.frames) {
        this._windowPauseSignSprite.bitmap = null;
        return;
      }

      this._windowPauseSignData = {};
      this._refreshAnimationCompoments(this._windowPauseSignSprite, this._windowPauseSignData, this._twdWindowskin.data.pauseSign);
    } else {
      $.backup.Window_refreshPauseSign.call(this);
    }
  };

  Window.prototype._refreshAccessories = function() {
    if (this.shouldUseTwdWindowskin) {
      if (!this._accessoriesCreated) {
        if (Array.isArray(this._accessories)) {
          for (sprite of this._accessories) {
            if (sprite) {
              this.removeChild(sprite);
            }

          }
          this._accessories = null;
        }
        this._accessories = [];
        this._accessoryDatas = [];
        for (acc of this._twdWindowskin.data.accessories) {
          if (acc.condition) {
            if (!eval(acc.condition)) {
              this._accessories.push(null);
              continue;
            }
          }
          var sprite = new Sprite();
          this._accessories.push(sprite);
          if (acc.p === "up") {
            this.addChild(sprite);
          } else if (acc.p === "mid") {
            this.addChildToBack(sprite);
          } else {
            this.addChildAt(sprite, 0);
          }
        }
        this._accessoriesCreated = true;
      }
      for (var accNo = 0; accNo < this._accessories.length; accNo++) {
        var sprite = this._accessories[accNo];
        this._accessoryDatas[accNo] = {};
        var data = this._accessoryDatas[accNo];
        var skinData = this._twdWindowskin.data.accessories[accNo];
        if (skinData.condition) {
          if (!eval(skinData.condition)) {
            continue;
          }
        }
        this._refreshAnimationCompoments(sprite, data, skinData);
      }
    } else {
      if (Array.isArray(this._accessories)) {
        for (sprite of this._accessories) {
          if (sprite) {
            this.removeChild(sprite);
          }
        }
        this._accessories = null;
      }
    }
  };

  Window.prototype._updateAccessoryFrame = function(sprite, data, offset) {
    var currentFrame = data.currentFrame || 0;
    var frames = data.frames || [];
    if (frames.length < 1) {
      return;
    }
    cFrame = frames[currentFrame];
    if (currentFrame + 1 >= data.frameLength) {
      nFrame = frames[0];
    } else {
      nFrame = frames[currentFrame + 1] || cFrame;
    }
    var rate = offset / cFrame.frameCount;

    function result(x, y, rate) {
      if (x === y || rate === 0) {
        return x;
      }
      return x + (y - x) * rate;
    }
    if (data.isCursor) {
      sprite.setFrame(data.width * cFrame.bitmap + data.cursorX, data.cursorY, data.spriteWidth, data.spriteHeight);
      sprite.x = result(cFrame.x + data.spriteX, nFrame.x + data.spriteX, rate);
      sprite.y = result(cFrame.y + data.spriteY, nFrame.y + data.spriteY, rate);
    } else {
      sprite.setFrame(data.width * cFrame.bitmap, 0, data.width, data.height);
      sprite.x = result(cFrame.x, nFrame.x, rate);
      sprite.y = result(cFrame.y, nFrame.y, rate);
    }


    sprite.alpha = result(cFrame.a, nFrame.a, rate);
    sprite.anchor.x = result(cFrame.anchorX, nFrame.anchorX, rate);
    sprite.anchor.y = result(cFrame.anchorY, nFrame.anchorY, rate);
    sprite.scale.x = result(cFrame.scaleX, nFrame.scaleX, rate);
    sprite.scale.y = result(cFrame.scaleY, nFrame.scaleY, rate);
    sprite.rotation = result(cFrame.rotation, nFrame.rotation, rate);
  }

  $.backup.Window_updatePauseSign = Window.prototype._updatePauseSign;
  Window.prototype._updatePauseSign = function() {
    if (this.shouldUseTwdWindowskin) {
      var sprite = this._windowPauseSignSprite;
      if (this.pause) {
        var data = this._windowPauseSignData;
        this._updateAnimationCompoments(sprite, data);
        sprite.visible = this.isOpen();
      } else {
        sprite.alpha = 0;
      }
    } else {
      $.backup.Window_updatePauseSign.call(this);
    }
  };

  Window.prototype._updateAccessories = function() {
    if (this.shouldUseTwdWindowskin) {
      if (Array.isArray(this._accessories)) {
        for (var accNo = 0; accNo < this._accessories.length; accNo++) {
          var sprite = this._accessories[accNo];
          var data = this._accessoryDatas[accNo];
          if (!sprite) {
            continue;
          }
          this._updateAnimationCompoments(sprite, data);
          sprite.visible = this.isOpen();
          sprite.alpha *= this.alpha;
          sprite.alpha *= (this.opacity / 255);
        }
      }
    }
  };

  Window.prototype._refreshMeta = function() {
    this._twdMetaSkin = {};
    if (this.shouldUseTwdWindowskin) {
      if (this._twdWindowskin.data.meta) {
        this._twdMetaSkin = this._twdWindowskin.data.meta;
      }
    }
    this._updateTwdMeta();
    if (this._twdMeta.padding !== undefined) {
      this._padding = this._twdMeta.padding;
    }
  }

  $.backup.Window_refreshCursor = Window.prototype._refreshCursor;
  Window.prototype._refreshCursor = function() {
    if (this.shouldUseTwdWindowskin) {
      if (!this._twdWindowskin.data.cursor.bitmaps || !this._twdWindowskin.data.cursor.frames) {
        this._windowCursorSprite.bitmap = null;
        return;
      }
      var padX = this.paddingLeft();
      var padY = this.paddingTop();
      var padX2 = this.paddingRight();
      var padY2 = this.paddingBottom();
      var x = this._cursorRect.x + padX - this.origin.x;
      var y = this._cursorRect.y + padY - this.origin.y;
      var w = this._cursorRect.width;
      var h = this._cursorRect.height;
      var m = 4;
      var x2 = Math.max(x, padX);
      var y2 = Math.max(y, padY);
      var ox = x - x2;
      var oy = y - y2;
      var w2 = Math.min(w, this._width - padX2 - x2);
      var h2 = Math.min(h, this._height - padY2 - y2);

      this._windowCursorSprite.move(x2, y2);

      var sprite = this._windowCursorSprite;
      this._windowCursorData = {};
      var data = this._windowCursorData;
      data.width = w;
      data.height = h;
      data.cursorX = x2 - padX2 - this._cursorRect.x + this.origin.x;
      data.cursorY = y2 - padY2 - this._cursorRect.y + this.origin.y;
      data.spriteWidth = w2;
      data.spriteHeight = h2;
      data.spriteX = x2;
      data.spriteY = y2;
      data.isCursor = true;
      this._refreshAnimationCompoments(sprite, data, this._twdWindowskin.data.cursor, 'cursor');
    } else {
      //$.backup.Window_refreshCursor.call(this);
      var padX = this.paddingLeft();
      var padY = this.paddingTop();
      var padX2 = this.paddingRight();
      var padY2 = this.paddingBottom();
      var x = this._cursorRect.x + padX - this.origin.x;
      var y = this._cursorRect.y + padY - this.origin.y;
      var w = this._cursorRect.width;
      var h = this._cursorRect.height;
      var m = 4;
      var x2 = Math.max(x, padX);
      var y2 = Math.max(y, padY);
      var ox = x - x2;
      var oy = y - y2;
      var w2 = Math.min(w, this._width - padX2 - x2);
      var h2 = Math.min(h, this._height - padY2 - y2);
      var bitmap = new Bitmap(w2, h2);

      this._windowCursorSprite.bitmap = bitmap;
      this._windowCursorSprite.setFrame(0, 0, w2, h2);
      this._windowCursorSprite.move(x2, y2);

      if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p + m, p + m, q - m * 2, q - m * 2, ox + m, oy + m, w - m * 2, h - m * 2);
        bitmap.blt(skin, p + m, p + 0, q - m * 2, m, ox + m, oy + 0, w - m * 2, m);
        bitmap.blt(skin, p + m, p + q - m, q - m * 2, m, ox + m, oy + h - m, w - m * 2, m);
        bitmap.blt(skin, p + 0, p + m, m, q - m * 2, ox + 0, oy + m, m, h - m * 2);
        bitmap.blt(skin, p + q - m, p + m, m, q - m * 2, ox + w - m, oy + m, m, h - m * 2);
        bitmap.blt(skin, p + 0, p + 0, m, m, ox + 0, oy + 0, m, m);
        bitmap.blt(skin, p + q - m, p + 0, m, m, ox + w - m, oy + 0, m, m);
        bitmap.blt(skin, p + 0, p + q - m, m, m, ox + 0, oy + h - m, m, m);
        bitmap.blt(skin, p + q - m, p + q - m, m, m, ox + w - m, oy + h - m, m, m);
      }
    }
  };

  $.backup.Window_updateCursor = Window.prototype._updateCursor;
  Window.prototype._updateCursor = function() {
    if (this.shouldUseTwdWindowskin) {
      var sprite = this._windowCursorSprite;
      var data = this._windowCursorData;
      if (!data) {
        return;
      }
      if (!(data.width > 0 && data.height > 0 && data.bitmapCount > 0 && data.frameLength > 0)) {
        return;
      }
      if (this.active) {
        this._updateAnimationCompoments(sprite, data);
      }
      sprite.visible = this.isOpen();

    } else {
      $.backup.Window_updateCursor.call(this);
    }
  };

  Window.prototype.paddingLeft = function() {
    return this.padding + this.twdMeta.paddingDetail.left;
  }

  Window.prototype.paddingRight = function() {
    return this.padding + this.twdMeta.paddingDetail.right;
  }

  Window.prototype.paddingTop = function() {
    return this.padding + this.twdMeta.paddingDetail.top;
  }

  Window.prototype.paddingBottom = function() {
    return this.padding + this.twdMeta.paddingDetail.bottom;
  }

  Window.prototype._refreshContents = function() {
    this._windowContentsSprite.move(this.paddingLeft(), this.paddingTop());
  };

  Window.prototype._updateContents = function() {
    var w = this._width - this.paddingLeft() - this.paddingRight();
    var h = this._height - this.paddingTop() - this.paddingBottom();;
    if (w > 0 && h > 0) {
      this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
      this._windowContentsSprite.visible = this.isOpen();
    } else {
      this._windowContentsSprite.visible = false;
    }
  };


  $.backup.Window_refreshArrows = Window.prototype._refreshArrows;
  Window.prototype._refreshArrows = function() {
    if (this.shouldUseTwdWindowskin) {
      if (!this._twdWindowskin.data.upArrow.bitmaps || !this._twdWindowskin.data.upArrow.frames) {
        this._upArrowSprite.bitmap = null;
      }
      if (!this._twdWindowskin.data.downArrow.bitmaps || !this._twdWindowskin.data.downArrow.frames) {
        this._downArrowSprite.bitmap = null;
      }
      if (!this._upArrowSprite.bitmap || !this._downArrowSprite.bitmap) {
        return;
      }
      // up arrow
      {
        this._upArrowSpriteData = {};
        this._refreshAnimationCompoments(this._upArrowSprite, this._upArrowSpriteData, this._twdWindowskin.data.upArrow, 'arrow');
      }
      // down arrow
      {
        this._downArrowSpriteData = {};
        this._refreshAnimationCompoments(this._downArrowSprite, this._downArrowSpriteData, this._twdWindowskin.data.downArrow, 'arrow');
      }

    } else {
      $.backup.Window_refreshArrows.call(this);
    }
  };

  $.backup.Window_updateArrows = Window.prototype._updateArrows;
  Window.prototype._updateArrows = function() {
    if (this.shouldUseTwdWindowskin) {
      this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
      this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
      if (this._downArrowSprite.visible && this._downArrowSprite.bitmap) {
        this._updateAnimationCompoments(this._downArrowSprite, this._downArrowSpriteData);
      };
      if (this._upArrowSprite.visible && this._upArrowSprite.bitmap) {
        this._updateAnimationCompoments(this._upArrowSprite, this._upArrowSpriteData);
      };
    } else {
      $.backup.Window_updateArrows.call(this);
    }
  };

  Window.prototype._refreshAnimationCompoments = function(sprite, data, skinData, type) {
    if (type !== 'cursor') {
      var w = this.width;
      var h = this.height;
      data.width = eval(String(skinData.w));
      data.height = eval(String(skinData.h));
    }
    data.bitmapCount = skinData.bitmaps.length;
    data.frameLength = skinData.frames.length;

    if (data.width > 0 && data.height > 0 && data.bitmapCount > 0 && data.frameLength > 0) {
      sprite.bitmap = new Bitmap(data.width * data.bitmapCount, data.height);
      data.totalFrameCount = 0;
      data.frameCounts = [];
      data.frames = [];
      for (var i = 0; i < data.bitmapCount; i++) {
        this.drawTwdBitmap(sprite.bitmap, data.width, data.height, this._twdWindowskin,
          skinData.bitmaps[i], data.width * i);
      }
      for (var i = 0; i < data.frameLength; i++) {
        data.frames[i] = {};
        var frame = skinData.frames[i];
        var tFrame = data.frames[i];

        tFrame.x = (frame.x === undefined) ? 0 : frame.x;
        tFrame.y = (frame.y === undefined) ? 0 : frame.y;
        tFrame.a = (frame.a === undefined) ? 1 : frame.a;

        if (type === 'cursor') {
          tFrame.anchorX = (frame.anchorX === undefined) ? 0 : frame.anchorX;
          tFrame.anchorY = (frame.anchorY === undefined) ? 0 : frame.anchorY;
        } else if (type === 'arrow') {
          tFrame.anchorX = (frame.anchorX === undefined) ? 0.5 : frame.anchorX;
          tFrame.anchorY = (frame.anchorY === undefined) ? 0.5 : frame.anchorY;
        } else {
          tFrame.anchorX = (frame.anchorX === undefined) ? 0.5 : frame.anchorX;
          tFrame.anchorY = (frame.anchorY === undefined) ? 1 : frame.anchorY;
        }

        tFrame.scaleX = (frame.scaleX === undefined) ? 1 : frame.scaleX;
        tFrame.scaleY = (frame.scaleY === undefined) ? 1 : frame.scaleY;
        tFrame.rotation = (frame.rotation === undefined) ? 0 : frame.rotation;
        tFrame.bitmap = (frame.bitmap === undefined) ? 0 : frame.bitmap;
        tFrame.frameCount = (frame.frameCount === undefined) ? 1 : frame.frameCount;

        {
          var w = this.width;
          var h = this.height;
          tFrame.x = eval(String(tFrame.x));
          tFrame.y = eval(String(tFrame.y));
          tFrame.a = eval(String(tFrame.a));
          tFrame.anchorX = eval(String(tFrame.anchorX));
          tFrame.anchorY = eval(String(tFrame.anchorY));
          tFrame.scaleX = eval(String(tFrame.scaleX));
          tFrame.scaleY = eval(String(tFrame.scaleY));
          tFrame.rotation = eval(String(tFrame.rotation));
          tFrame.bitmap = eval(String(tFrame.bitmap));
          tFrame.frameCount = eval(String(tFrame.frameCount));
        }

        data.totalFrameCount += tFrame.frameCount;
        data.frameCounts[i] = tFrame.frameCount;
        if (data.frameCounts[i - 1]) {
          data.frameCounts[i] += data.frameCounts[i - 1];
        }
      }
      data.currentFrame = 0;
      this._updateAccessoryFrame(sprite, data, 0);
    } else {
      sprite.bitmap = null;
      sprite.a = 0;
    }
  };

  Window.prototype._updateAnimationCompoments = function(sprite, data) {
    if (sprite.bitmap) {
      var currentCount = this._animationCount % data.totalFrameCount;
      for (data.currentFrame = 0; data.currentFrame < data.frameLength; data.currentFrame++) {
        if (data.frameCounts[data.currentFrame] >= currentCount) {
          break;
        }
      }
      var currentFrameCount = data.frames[data.currentFrame].frameCount;
      var lastFrameCount = data.frameCounts[data.currentFrame] - currentFrameCount;
      var offset = currentCount - lastFrameCount;
      this._updateAccessoryFrame(sprite, data, offset);
    }
  };

  // ---- below is Bitmap ----
  // -------------------------

  $.backup.Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
  Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    if (this._twdMeta) {
      var context = this._context;
      if (this._twdMeta.textShadowed) {
        context.fillStyle = this._twdMeta.shadowColor;
        context.fillText(text, tx + this._twdMeta.shadowDistance, ty + this._twdMeta.shadowDistance, maxWidth);
      } else if (this._twdMeta.textOutlined) {
        context.lineWidth = this.outlineWidth;
        $.backup.Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
      } else {
        //do nothing
      }
    } else {
      $.backup.Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
    }
  };

  // ---- below is Window_Base ----
  // ------------------------------

  $.backup.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/#/g, '\x1c');
    text = text.replace(/\x1c\x1c/g, '#');
    return $.backup.Window_Base_convertEscapeCharacters.call(this, text);
  };

  $.backup.Window_Base_processCharacter = Window_Base.prototype.processCharacter;
  Window_Base.prototype.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
      case '\x1c':
        this.processTwdSharpString(this.obtainTwdSharpString(textState), textState);
        break;
      default:
        $.backup.Window_Base_processCharacter.call(this, textState);
        break;
    }
  };

  Window_Base.prototype.obtainTwdSharpString = function(textState) {
    textState.index++;
    var regExp = /^{(.*?)}/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      if (arr.length > 1) {
        var paramStr = arr[1];
        var arrayCode = paramStr.split(':');
        var arrayParam = [];
        if (arrayCode.length > 1) {
          arrayParam = arrayCode[1].split(',');
        };
        arrayCode[0] = arrayCode[0].trim();
        for (var i = arrayParam.length - 1; i >= 0; i--) {
          arrayParam[i] = arrayParam[i].trim();
        };
        return {
          code: arrayCode[0].toUpperCase(),
          arrayParam
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  Window_Base.prototype.processTwdSharpString = function(param, textState) {
    if (param === null) {
      return;
    }
    switch (param.code) {
      default: break;
    }
  };

  Window_Base.prototype.contentsWidth = function() {
    return this.width - this.paddingLeft() - this.paddingRight();
  };

  Window_Base.prototype.contentsHeight = function() {
    return this.height - this.paddingTop() - this.paddingBottom();
  };

  Window_Base.prototype.updatePadding = function() {
    this.padding = this.twdMeta.padding;
  };

  Window_Base.prototype.fittingHeight = function(numLines) {
    return numLines * this.lineHeight() + this.paddingTop() + this.paddingBottom();
  };

  $.backup.Window_Base_lineHeight = Window_Base.prototype.lineHeight;
  Window_Base.prototype.lineHeight = function() {
    this.twdMeta;
    if (this.twdMeta) {
        return this.twdMeta.lineHeight;
    }
    return $.backup.Window_Base_lineHeight.call(this);
  };

  Window_Base.prototype.resetTextColor = function() {
    if (this._twdMeta.fontColor !== undefined) {
      if (this._twdMeta.fontColor === '0') {
        this.changeTextColor(this.normalColor());
      } else {
        this.changeTextColor(this._twdMeta.fontColor);
      };
    }
  };

  $.backup.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
  Window_Base.prototype.resetFontSettings = function() {
    $.backup.Window_Base_resetFontSettings.call(this);

    {
      this.contents._twdMeta = this.contents._twdMeta || {};
      this.contents._twdMeta.textOutlined = true;
      this.contents._twdMeta.textShadowed = false;
      this.contents._twdMeta.shadowColor = "#000000";
      this.contents._twdMeta.shadowDistance = 2;
    }

    if (this._twdMeta) {
      if (this._twdMeta.fontSize !== undefined) {
        this.contents.fontSize = this._twdMeta.fontSize;
      };
      if (this._twdMeta.fontColor !== undefined) {
        if (this._twdMeta.fontColor === '0') {
          this.contents.textColor = this.normalColor();
        } else {
          this.contents.textColor = this._twdMeta.fontColor;
        };
      }
      if (this._twdMeta.textOutlined !== undefined) {
        this.contents._twdMeta.textOutlined = this._twdMeta.textOutlined;
      }
      if (this._twdMeta.textShadowed !== undefined) {
        this.contents._twdMeta.textShadowed = this._twdMeta.textShadowed;
      }
      if (this._twdMeta.shadowColor !== undefined) {
        this.contents._twdMeta.shadowColor = this._twdMeta.shadowColor;
      }
      if (this._twdMeta.shadowDistance !== undefined) {
        this.contents._twdMeta.shadowDistance = this._twdMeta.shadowDistance;
      }
      if (this._twdMeta.outlineColor !== undefined) {
        this.contents.outlineColor = this._twdMeta.outlineColor;
      }
      if (this._twdMeta.outlineWidth !== undefined) {
        this.contents.outlineWidth = this._twdMeta.outlineWidth;
      }
    };
  };

  $.backup.Window_Base_setBackgroundType = Window_Base.prototype.setBackgroundType;
  Window_Base.prototype.setBackgroundType = function(type) {
    $.backup.Window_Base_setBackgroundType.call(this, type);
    if (this._backgroundType !== type) {
      this._backgroundType = type;
      this._refreshMeta();
      this._refreshAllParts();
    };
    this._backgroundType = type;
  };

  Window_Selectable.prototype.itemWidth = function() {
    return Math.floor((this.width - this.paddingLeft() - this.paddingRight() +
      this.spacing()) / this.maxCols() - this.spacing());
  };

  if ($.param.enableWindowStacking) {
    WindowLayer.prototype._canvasClearWindowRect = function(renderSession, window) {

    };

    WindowLayer.prototype._webglMaskWindow = function(renderSession, window) {

    };

    WindowLayer.prototype._renderCanvas = function(renderSession) {
      if (!this.visible) {
        return;
      }

      if (!this._tempCanvas) {
        this._tempCanvas = document.createElement('canvas');
      }

      this._tempCanvas.width = Graphics.width;
      this._tempCanvas.height = Graphics.height;

      var realCanvasContext = renderSession.context;
      var context = this._tempCanvas.getContext('2d');

      context.save();
      context.clearRect(0, 0, Graphics.width, Graphics.height);
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.closePath();
      context.clip();

      renderSession.context = context;

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
          this._canvasClearWindowRect(renderSession, child);
          context.save();
          child._renderCanvas(renderSession);
          context.restore();
        }
      }

      context.restore();

      renderSession.context = realCanvasContext;
      renderSession.context.setTransform(1, 0, 0, 1, 0, 0);
      renderSession.context.globalCompositeOperation = 'source-over';
      renderSession.context.globalAlpha = 1;
      renderSession.context.drawImage(this._tempCanvas, 0, 0);

      for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
          this.children[j]._renderCanvas(renderSession);
        }
      }
    };

    WindowLayer.prototype._renderWebGL = function(renderSession) {
      if (!this.visible) {
        return;
      }

      var gl = renderSession.gl;

      if (!this._vertexBuffer) {
        this._vertexBuffer = gl.createBuffer();
      }

      this._dummySprite._renderWebGL(renderSession);

      renderSession.spriteBatch.stop();
      gl.enable(gl.STENCIL_TEST);
      gl.clear(gl.STENCIL_BUFFER_BIT);
      this._webglMaskOutside(renderSession);
      renderSession.spriteBatch.start();

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
          gl.stencilFunc(gl.EQUAL, 0, 0xFF);
          child._renderWebGL(renderSession);
          renderSession.spriteBatch.stop();
          this._webglMaskWindow(renderSession, child);
          renderSession.spriteBatch.start();
        }
      }

      gl.disable(gl.STENCIL_TEST);

      for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
          this.children[j]._renderWebGL(renderSession);
        }
      }
    };
  }

})(TWDP.BWE);
