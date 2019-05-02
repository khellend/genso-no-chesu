
//=============================================================================
// Cailgun.js
//=============================================================================
/*:
 * @plugindesc 方法重写
 * @author Cailgun
 *
 * @param qabs_trail
 * @desc 重写trail以让图片的位置正确
 * @type Boolean
 * @default true
 *
 * @help
 * 
 * 
 *
 *

 */
 var Cpm = PluginManager.parameters('Cailgun');

  
	 if(Cpm["qabs_trail"])
 {
 	  Skill_Sequencer.prototype.actionTrail = function(action) {
    this._skill.trail = new Sprite_SkillTrail();
    this._skill.trail.bitmap = ImageManager.loadPicture(action[0]);
    this._skill.trail.move(0, 0, Graphics.width, Graphics.height);
    this._skill.trail.rotatable = action[1] === 'true';
    this._skill.trail.originDirection = Number(action[2]);
    this._skill.trail.z = 3;
    this.setSkillPictureRadian(this._skill.trail, this._skill.radian);
    var x1 = this._skill.collider.center.x - this._skill.trail.bitmap.width + this._skill.trail.bitmap.height/2;
    var x2 = this._skill.collider.center.x + this._skill.trail.bitmap.width - this._skill.trail.bitmap.height/2;
    var y = this._skill.collider.center.y;
    var dy = this._character.py;
    var x = y>dy?x2:x1;
    var heng =Math.abs(this._skill.collider.center.x - this._character.px);
    var shu =Math.abs(this._skill.collider.center.y - this._character.py);
    var xie = Math.sqrt(heng*heng+shu*shu);
    var hudu = Math.PI / 180;     
    var sinx = shu/xie;
    var cosx = heng/xie;	
    this._skill.trail.startX = x;
    this._skill.trail.startY = y;
    this._skill.trail.bitmap.addLoadListener(function() {
      var w = this.bitmap.width;
      var h = this.bitmap.height;
      this.move(x, y, w, h);
      QABSManager.addPicture(this);
    }.bind(this._skill.trail));
  };
 }
  else
  	{
  		}


