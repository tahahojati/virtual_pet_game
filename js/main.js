var game = new Phaser.Game(360, 640, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.add('HomeState', HomeState);

game.state.start('GameState');