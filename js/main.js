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
        this.background.inputEnabled = true; 
        this.background.events.onInputDown.add(this.placeItem, this);
        this.pet = this.game.add.sprite(100, 400, 'pet');
        this.pet.anchor.setTo(0.5); 
        this.pet.customParams = {health: 100, fun: 100};
        this.pet.animations.add('funny_faces', [1,2,3,2,1], 7, false);
        
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
        this.uiBlocked = false;
        this.apple.customParams = {health: 20};
        this.candy.customParams = {health: -10, fun:10};
        this.toy.customParams = {fun: 20};
        
        
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();
    },    
    pickItem: function(sprite, event){
        if(this.uiBlocked)
            return false;
        this.clearSelection();
        this.selectedItem = sprite; 
        sprite.alpha = 0.4; 
    },
    
    rotatePet: function(sprite, event){
        if(this.uiBlocked)
            return false;
        this.uiBlocked = true;
        sprite.alpha = 0.4;
        var petRotation = this.game.add.tween(this.pet);
        petRotation.to({angle: '+720'}, 1000); 
        petRotation.onComplete.add(function(){
            this.uiBlocked = false;
            this.pet.customParams.fun += 10 ; 
            sprite.alpha = 1;
        }, this);
        petRotation.start();
        this.clearSelection();
        
    },
    clearSelection: function(){
        this.buttons.forEach(function(x){x.alpha =1; });
        this.selectedItem = null; 
    },
    placeItem: function(sprite, event){
        if(this.uiBlocked || !this.selectedItem){
            return false;
        }
        this.uiBlocked = true; 
        var x = event.position.x; 
        var y = event.position.y;
        var newItem = this.game.add.sprite(x,y, this.selectedItem.key);
        newItem.anchor.setTo(0.5);
        newItem.customParams = this.selectedItem.customParams; 
        var petMovement = this.game.add.tween(this.pet);
        petMovement.to({x: x, y: y}, 700);
        petMovement.onComplete.add(function(){
            this.uiBlocked = false;
            for(var stat in newItem.customParams){
                if(newItem.customParams.hasOwnProperty(stat) && this.pet.customParams.hasOwnProperty(stat)){
                    this.pet.customParams[stat] += newItem.customParams[stat]; 
                }
            }
            newItem.destroy();
            this.pet.animations.play('funny_faces');
        }, this);
        petMovement.start();
    },
};


var game = new Phaser.Game(360, 640, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
