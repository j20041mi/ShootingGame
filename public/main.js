//�f�o�b�O�̃t���O
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//�X���[�W���O
const SMOOTHING = false;

//�Q�[���X�s�[�h(ms)
const GAME_SPEED = 1000/60;

//��ʃT�C�Y
const SCREEN_W = 180;
const SCREEN_H = 320;

//�L�����o�X�T�C�Y
const CANVAS_W = SCREEN_W *2;
const CANVAS_H = SCREEN_H *2;

//�t�B�[���h�T�C�Y
const FIELD_W = SCREEN_W *2;
const FIELD_H = SCREEN_H *2;

//���̐�
const STAR_MAX =300;

//�L�����o�X
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width  = CANVAS_W;
can.height = CANVAS_H;
con.mozimageSmoothingEnabled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;



//�t�B�[���h�i���z��ʁj
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width  = FIELD_W;
vcan.height = FIELD_H;

//�J�����̍��W
let camera_x = 0;
let camera_y = 0;

//���̎���
let star=[];

//�L�[�{�[�h�̏��
let key = [];

//�I�u�W�F�N�g����
let teki = [];
let teta = [];
let tama = [];
let jiki = new Jiki();


//�t�@�C���̓ǂݍ���
let spriteImage = new Image();
spriteImage.src = "sprite.png";


//�Q�[��������
function gameInit()
{
	for(let i=0;i<STAR_MAX;i++)star[i]= new Star();
	setInterval( gameLoop , GAME_SPEED );
}

//�I�u�W�F�N�g���A�b�v�f�[�g
function updateObj(obj) {
	for (let i = obj.length - 1; i >= 0; i--) {
		obj[i].update();
		if (obj[i].kill) obj.splice(i, 1);
	}
}

//�I�u�W�F�N�g��`��
function drawObj(obj) {
	for (let i = 0; i < obj.length; i++)obj[i].draw();
}

//�ړ��̏���
function updateAll() {
	updateObj(star);
	updateObj(tama);
	updateObj(teta);
	updateObj(teki);

	jiki.update();
}

//�`��̏���
function drawAll() {
	//�`��̏���

	vcon.fillStyle = "black";
	vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);


	drawObj(star);
	drawObj(tama);
	jiki.draw();
	drawObj(teta);
	drawObj(teki);

	//�����͈̔�0�@�`FIELD�Q
	//�J�����͈̔͂O�`�iFIELD�QW-SCREEN_W �j
	camera_x = (jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W);
	camera_y = (jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H);

	//���z��ʂ�����ۂ̃L�����o�X�ɃR�s�[

	con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H,
		0, 0, CANVAS_W, CANVAS_H);
}

//���̕\��
function putInfo() {
	if (DEBUG) {
		drawCount++;
		if (lastTime + 1000 <= Date.now()) {
			fps = drawCount;
			drawCount = 0;
			lastTime = Date.now();
		}


		con.font = "20px 'Impact'";
		con.fillStyle = "white";
		con.fillText("FPS :" + fps, 20, 20);
		con.fillText("Tama:" + tama.length, 20, 40);
		con.fillText("Teki" + teki.length, 20, 60);
		con.fillText("Teta" + teta.length, 20, 80);
	}
}

//�Q�[�����[�v
function gameLoop()
{
	if (rand(0,10)==1 )
		teki.push(new Teki(39, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));

	updateAll();
	drawAll();
	putInfo();
}

//�I�����[�h�ŃQ�[���J�n
window.onload=function()
{
	gameInit();
}