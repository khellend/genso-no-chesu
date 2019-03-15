//=============================================================================
// positionChange
//=============================================================================
 
/*:
 * @plugindesc 修改跟从人物的位置
 * @author free大白痴
 * 
 * 
 * @help
 * 
 * 作用是修改跟从人物（followers）的坐标值
 *
 */
//原始的人物坐标
var xOrigin;
var yOrigin;
// 用于调整人物的X坐标,参数代表偏移的像素值（正为向右，负为向左）
Game_CharacterBase.prototype.followers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._moveSpeed = 4;
    this._moveFrequency = 6;
    this._opacity = 255;
    this._blendMode = 0;
    this._direction = 2;
    this._pattern = 1;
    this._priorityType = 1;
    this._tileId = 0;
    this._characterName = '';
    this._characterIndex = 0;
    this._isObjectCharacter = false;
    this._walkAnime = true;
    this._stepAnime = false;
    this._directionFix = false;
    this._through = false;
    this._transparent = false;
    this._bushDepth = 0;
    this._animationId = 0;
    this._balloonId = 0;
    this._animationPlaying = false;
    this._balloonPlaying = false;
    this._animationCount = 0;
    this._stopCount = 0;
    this._jumpCount = 0;
    this._jumpPeak = 0;
    this._movementSuccess = true;
};
function positionChangeX (px) {
    //调整的是Console里面的值，用的是$GamePlayer注释暴露的控制变量w
    xOrigin = $gamePlayer.followers().follower(0)._px;
    $gamePlayer.followers().follower(0)._px += px;
}
// 用于调整人物的X坐标,参数代表偏移的像素值（负为向上，正为向下）
function positionChangeY (py) {
    //调整的是Console里面的值，用的是$GamePlayer注释暴露的控制变量w
    yOrigin = $gamePlayer.followers().follower(0)._py;
    $gamePlayer.followers().follower(0)._py += py;
}
//用于将人物的坐标位置改回来w,顺序是先纵向在横向
function positionChangeToOrigin () {
    positionChangeY(yOrigin - $gamePlayer.followers().follower(0)._py);
    positionChangeX(xOrigin - $gamePlayer.followers().follower(0)._px);
}