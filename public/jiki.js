//
//jiki.js�@���@�֘A�@
//

  
//�e�N���X
class Tama extends CharaBase{
	constructor(x, y, vx, vy) {
		super(5, x, y, vx, vy);
	}

	update() {
		super.update();
	}

	draw() {
		super.draw();
    }
}



//���@�N���X
class Jiki{
	constructor(){
		this.x = (FIELD_W/2)<<8;
		this.y = (FIELD_H/2)<<8;
		this.anime = 0;
		this.speed = 512;
		this.reload = 0;
		this.relo2 = 0;
	}

	//���@�̈ړ�
	update() {

		if (key[32] && this.reload == 0) {
			tama.push(new Tama(this.x+(4<<8), this.y, 0, -2000));
			tama.push(new Tama(this.x-(4<<8), this.y, 0, -2000));
			this.reload = 5;
			if (++this.relo2 == 4) {
				this.reload = 20;
				this.relo2 = 0;

            }
		}
		if (!key[32]) this.reload = this.relo2 = 0; 

		if (this.reload > 0) this.reload--;
		if (key[37] && this.x > this.speed) {
			this.x -= this.speed;
			if (this.anime > -8) this.anime--;
		} else if (key[39] && this.x <= (FIELD_W << 8) - this.speed) {
			this.x += this.speed;
			if (this.anime < 8) this.anime++;
		} else {
			if (this.amime > 0) this.anime--;
			if (this.amime < 0) this.anime++;
        }
		if (key[38] && this.y > this.speed) this.y -= this.speed;
		if (key[40] && this.y <= (FIELD_H << 8) - this.speed) this.y += this.speed;
	}

	//�`��
	draw(){
		drawSprite(2 + (this.anime>>2), this.x, this.y);
	}
}


