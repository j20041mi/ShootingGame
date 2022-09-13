//
//misc.js ���̑����낢��@���ʊ֐��@
//



//�L�����N�^�[�̃x�[�X�N���X
class CharaBase {
	constructor(snum,x, y, vx, vy) {
		this.snum = snum;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.kill = false;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x < 0 || this.x > FIELD_W << 8
			|| this.y < 0 || this.y > FIELD_H << 8) this.kill = true;
	}

	draw() {
		drawSprite(this.snum, this.x, this.y);
	}
}

//���N���X
class Star
{
	constructor()
	{
		this.x  = rand(0,FIELD_W)<<8;
		this.y  = rand(0,FIELD_H)<<8;
		this.vx = 0;
		this.vy = rand(30,200);
		this.sz = rand(1,2);
	}
	
	draw()
	{
		let x=this.x>>8;
		let y=this.y>>8;
		
		if( x<camera_x || x>=camera_x+SCREEN_W 
			|| y<camera_y || y>=camera_y+SCREEN_H )return;
		
		vcon.fillStyle=rand(0,2)!=0?"#66f":"#aef";
		vcon.fillRect(x,y,this.sz,this.sz);
		
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.y > FIELD_H << 8) {
			this.y = 0;
			this.x = rand(0, FIELD_W) << 8;
		}
	}
}

//�L�[�{�[�h�������ꂽ�Ƃ�
document.onkeydown = function(e){
	key[ e.keyCode ] = true;
}

//�L�[�{�[�h���b���ꂽ�Ƃ�
document.onkeyup = function(e){
	key[ e.keyCode ] = false;
}

//�X�v���C�g��`�悷��֐�
function drawSprite(snum, x, y) {
	let sx = sprite[snum].x;
	let sy = sprite[snum].y;
	let sw = sprite[snum].w;
	let sh = sprite[snum].h;

	let px = (x >> 8) - sw / 2;
	let py = (y >> 8) - sh / 2;

	if (px + sw < camera_x || px >= camera_x + SCREEN_W
		|| py + sh < camera_y || py >= camera_y + SCREEN_H) return;

	vcon.drawImage(spriteImage, sx, sy, sw, sh, px, py, sw, sh);
}


//�����̃����_�������
function rand(min,max)
{
	return Math.floor( Math.random()*(max-min+1) )+min;
}




