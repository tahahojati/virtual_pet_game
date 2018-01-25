var GameState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        this.scale.pageAlignHoriizontally = true;
        this.scale.pageAlignVertically= true;
        
    },
    preload: function(){
        this.load.image('backyard', 'assets/images/backyard.png');
        this.load.image('apple', 'assets/images/apple.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('rotate', 'assets/images/rotate.png');
        this.load.image('toy', 'assets/images/toy.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
    },
    create: function(){
        this.background = this.game.add.sprite(0, 0, 'backyard');
        this.pet = this.game.add.sprite(100, 400, 'pet');
        this.pet.anchor.setTo(0.5); 
        this.pet.customParams = {health: 100, fun: 100};
        this.apple = this.game.add.sprite(72,570, 'apple');
        this.candy = this.game.add.sprite(144,570, 'candy');
        this.toy = this.game.add.sprite(216,570, 'toy');
        this.rotate = this.game.add.sprite(288,570, 'rotate');
        this.buttons = [this.apple, this.candy, this.toy, this.rotate];
        var self = this; 
        this.buttons.forEach(function(x){
            x.anchor.setTo(0.5); 
            x.inputEnabled = true;
            if(x !== self.rotate)
                x.events.onInputDown.add(self.pickItem, self);
            else x.events.onInputDown.add(self.rotatePet, self);
        });
        this.selected = null; 
        this.apple.customParams = {health: 20};
        this.candy.customParams = {health: -10, fun:10};
        this.toy.customParams = {fun: 20};
        
        
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();
    },    
    pickItem: function(sprite, event){
        
    },
    
    rotatePet: function(sprite, event){
        
    },
};


var game = new Phaser.Game(360, 640, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
