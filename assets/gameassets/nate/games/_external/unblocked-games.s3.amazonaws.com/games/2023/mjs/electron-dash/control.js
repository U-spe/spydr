function PAUSE() {
  ig.game.paused = true;
  ig.game.pauseGame();
  wgl.system.stopRender();
  ig.soundHandler.muteSFX(true);
  ig.soundHandler.muteBGM(true);
}

function RESUME() {
  ig.game.paused = false;
  ig.game.resumeGame();
  wgl.system.startRender();
  ig.soundHandler.unmuteSFX(true);
  ig.soundHandler.unmuteBGM(true);
}
