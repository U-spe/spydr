function _GAME_LOADED() {
  //INJECT YOUR OWN CODE HERE
  console.warn("GAME LOADED");
  
  REWARDED_ADS_READY(true);
}

function _START_GAME() {
  //INJECT YOUR OWN CODE HERE
  console.warn("START GAME");
  
  REWARDED_ADS_READY(true);
}

function _END_GAME() {
  //INJECT YOUR OWN CODE HERE
  console.warn("END GAME");
}

function _SHOW_REWARDED_ADS() {
  //INJECT YOUR OWN CODE HERE
  console.warn("SHOW REWARDED ADS");
  
  setTimeout(() => {
    REWARDED_ADS_COMPLETED(true);
  }, 500);
}
