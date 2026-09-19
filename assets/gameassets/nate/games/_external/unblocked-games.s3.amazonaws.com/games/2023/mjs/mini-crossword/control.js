function PAUSE() {
  ig.game.paused = true;
  ig.game.pauseGame();
  ig.soundHandler.muteSFX(true);
  ig.soundHandler.muteBGM(true);
}

function RESUME() {
  ig.game.paused = false;
  ig.game.resumeGame();
  ig.soundHandler.unmuteSFX(true);
  ig.soundHandler.unmuteBGM(true);
}

function REWARDED_ADS_READY(isReady) {
  //set true to enable rewarded ads, set true to enable
  _SETTINGS.RewardedVideo.Enabled = isReady;
}

function REWARDED_ADS_COMPLETED(isSuccess) {
  ig.game.gameControl.rewardedVideoResult(isSuccess);
}
