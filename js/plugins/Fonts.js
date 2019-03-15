//=============================================================================

// Fonts.js

//=============================================================================

 

/*:

 * @plugindesc Change game default fonts and waiting fonts to load

 * @author 0nepeop1e

 *

 * @param Bitmap Font

 * @desc Default font face used for bitmap in game.

 * @default GameFont

 *

 * @param Window Font

 * @desc Default font face used for window in game.

 * @default GameFont

 *

 * @param Fonts

 * @desc List of font face definded in gamefont.css, seperate with ';'

 * @default GameFont

 */

 

(function(pm){

    ft = {};



    ft.bitmapFont = pm.parameters('Fonts')["Bitmap Font"] || "GameFont";

    ft.windowFont = pm.parameters('Fonts')["Window Font"] || "GameFont";

    ft.fontsList = (pm.parameters('Fonts')["Fonts"] || "GameFont").split(";");



    Scene_Boot.prototype.isGameFontLoaded = function() {

            var loaded = Graphics.isFontLoaded(ft.fontsList[0]);

            for(var i = 1; i < ft.fontsList.length; i++)

                    loaded = loaded && Graphics.isFontLoaded(ft.fontsList[i]);

            if (loaded) {

                    return true;

            } else {

                    var elapsed = Date.now() - this._startDate;

                    if (elapsed >= (20000 * ft.fontsList.length)) {

                            throw new Error('Failed to load Fonts');

                    }

            }

    };



    ft._initBitmap = Bitmap.prototype.initialize;



    Bitmap.prototype.initialize = function(){

            ft._initBitmap.apply(this, arguments);

            this.fontFace = ft.bitmapFont;

    };



    Window_Base.prototype.standardFontFace = function() {

            return ft.windowFont;

    };



})(PluginManager);