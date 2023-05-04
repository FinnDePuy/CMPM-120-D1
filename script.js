class sceneOne extends Phaser.Scene {
    constructor() {
        super({key : 'sceneOne'});
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('ImAGiraffe', 'ImaGiraffe.mp3');
        this.load.image('GiraffeOne','Giraffe.png');
    }
    create(){
        var audio = this.sound.add('ImAGiraffe', {loop: false});
        this.graphics = this.add.graphics();
        const Giraffe = this.add.image(100,500,'GiraffeOne');
        this.add.text(500,300, 'Giraffe Studios', {fontSize: 20});
        this.tweens.add({
            targets: Giraffe,
            x: 300,
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            duration: 1000
        });
        audio.once('play', function (sound){
            this.time.addEvent({
                delay: 2000
            });
        }, this);
        audio.play();
        this.input.once('pointerdown', function () 
        {
            audio.once('pause', function(sound){
                this.time.addEvent({
                    delay:1500
                })
            },this);
            audio.pause();
            console.log('From sceneOne to sceneTwo');
            this.scene.start('sceneTwo');
        }, this);
    }
}

class sceneTwo extends Phaser.Scene {
    constructor() {
        super({key : 'sceneTwo'});
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('Tree','Tree.png');
    }
    create(){
        this.graphics = this.add.graphics();
        const r1 = this.add.rectangle(300, 500, 1000, 500, 0x0000FF);
        const r2 = this.add.ellipse(500,400,550,350, 0xDAA06D);
        var treetwo = this.add.image(650, 250, 'Tree');
        treetwo.setScale(300/treetwo.height);
        var treethree = this.add.image(400, 250, 'Tree');
        treethree.setScale(300/treethree.height);
        var treeone = this.add.image(550, 350, 'Tree');
        treeone.setScale(300/treeone.height);
        this.input.once('pointerdown', function (event)
        {
            console.log('From sceneTwo to sceneThree');
            this.scene.start('sceneThree');
        }, this);
    }
}

class sceneThree extends Phaser.Scene {
    constructor() {
        super({key : 'sceneThree'});
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('HolderSong', 'HolderSong.mp3'); 
        this.load.image('GiraffeTwo','Giraffe2.png');   
        this.load.image('Title', 'Giraffe Simulator (1).png');
    }
    create(){
        var audio = this.sound.add('HolderSong', {loop: true});
        this.add.image(300,350,'GiraffeTwo');
        var title = this.add.image(375, 75, 'Title');
        title.setScale(title.height/290);
        this.add.text(500,300, 'Play\nSettings\nCredits\nExit', {fontSize: 30});
        this.cameras.main.once('camerafadeincomplete', function(camera){
            camera.fadeOut(6000);
        });
        this.cameras.main.fadeIn(6000);
        audio.once('play', function (sound){
            this.time.addEvent({
                delay: 2000
            });
        }, this);
        audio.play();
        this.graphics = this.add.graphics();
        this.input.once('pointerdown', function (event)
        {
            audio.once('pause', function(sound){
                this.time.addEvent({
                    delay:1500
                })
            },this);
            audio.pause();
            console.log('From sceneThree to sceneOne');
            this.scene.start('sceneOne');
        }, this);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000F0F',
    parent: 'phaser-example',
    scene: [ sceneOne, sceneTwo, sceneThree],
    audio: {
        disableWebAudio: false
    }
};

const game = new Phaser.Game(config);