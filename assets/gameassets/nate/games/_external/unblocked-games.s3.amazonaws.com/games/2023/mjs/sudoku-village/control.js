function PAUSE() {
	ig.game.forcedPause = true;
	ig.soundHandler.bgmPlayer.mute();
	ig.soundHandler.sfxPlayer.mute();
	playbackControl.pause();
	//add your own code here
}

function RESUME() {
	ig.game.forcedPause = false;
	playbackControl.resume();
	// Music Volume
	ig.soundHandler.bgmPlayer.volume(this.bgmVolume);
	if (ig.game.playerStats.bgmMuted) ig.soundHandler.bgmPlayer.mute();
	else ig.soundHandler.bgmPlayer.unmute();

	// SFX Volume
	ig.soundHandler.sfxPlayer.volume(this.sfxVolume);
	if (ig.game.playerStats.sfxMuted) ig.soundHandler.sfxPlayer.mute();
	else ig.soundHandler.sfxPlayer.unmute();
	//add your own code here
}

var playbackControl = {
	adsFlags: {},
	init: function () {
		window.playbackControl = this;
	},
	pause: function () {
		if (typeof ig !== "undefined") {
			if (ig.game) {
				if (typeof ig.game.pauseGame === "function") {
					ig.game.pauseGame(true);
				}

				if (typeof ig.game.pause === "function") {
					ig.game.pause(true);
				}
			}
		}

		if (ig.visibilityHandler) {
			if (typeof ig.visibilityHandler.onOverlayShow === "function") {
				ig.visibilityHandler.onOverlayShow();
			}
		}
	},

	resume: function () {
		if (typeof ig.visibilityHandler !== "undefined") {
			if (typeof ig.visibilityHandler.onOverlayHide === "function") {
				ig.visibilityHandler.onOverlayHide();
			}
		}
		var gameWrapper = document.getElementById("game");
		gameWrapper.style.visibility = "visible";

		// resume game
		if (typeof ig !== "undefined") {
			if (ig.game) {
				if (typeof ig.game.resumeGame === "function") {
					ig.game.resumeGame(true);
				}

				if (typeof ig.game.resume === "function") {
					ig.game.resume(true);
				}
			}
		}

		// unmute audio - restore game volume
		this.unmuteAudio();

		// window focus
		if (document.activeElement) {
			document.activeElement.blur();
		}
		window.focus();
	},
	muteAudio: function () {
		// mute audio - set volume to 0
		if (typeof ig !== "undefined") {
			if (typeof ig.soundHandler !== "undefined") {
				if (typeof ig.soundHandler.mute === "function") {
					ig.soundHandler.mute();
				}

				if (typeof ig.soundHandler.muteAll === "function") {
					ig.soundHandler.muteAll();
				}

				if (typeof ig.soundHandler.muteBGM === "function") {
					ig.soundHandler.muteBGM();
				}

				if (typeof ig.soundHandler.muteSFX === "function") {
					ig.soundHandler.muteSFX();
				}

				if (typeof ig.soundHandler.sfxPlayer !== "undefined") {
					if (typeof ig.soundHandler.sfxPlayer.volume === "function") {
						ig.soundHandler.sfxPlayer.volume(0);
					}
				}

				if (typeof ig.soundHandler.bgmPlayer !== "undefined") {
					if (typeof ig.soundHandler.bgmPlayer.volume === "function") {
						ig.soundHandler.bgmPlayer.volume(0);
					}
				}
			}

			if (ig.music) {
				if (typeof ig.music.setVolume === "function") {
					ig.music.setVolume(0);
				}
			}
		}
	},

	unmuteAudio: function () {
		if (
			this.adsFlags.cachedSfxMutedFlag !== true &&
			this.adsFlags.cachedBgmMutedFlag !== true
		) {
			// unmute all
			if (typeof ig !== "undefined") {
				if (typeof ig.soundHandler !== "undefined") {
					if (typeof ig.soundHandler.unmute === "function") {
						ig.soundHandler.unmute();
					}

					if (typeof ig.soundHandler.unmuteAll === "function") {
						ig.soundHandler.unmuteAll();
					}
				}
			}
		} else {
			if (this.adsFlags.cachedSfxMutedFlag !== true) {
				// unmute sfx
				if (typeof ig !== "undefined") {
					if (typeof ig.soundHandler !== "undefined") {
						if (typeof ig.soundHandler.unmuteSFX === "function") {
							ig.soundHandler.unmuteSFX();
						}
					}
				}
			}

			if (this.adsFlags.cachedBgmMutedFlag !== true) {
				// unmute bgm
				if (typeof ig !== "undefined") {
					if (typeof ig.soundHandler !== "undefined") {
						if (typeof ig.soundHandler.unmuteBGM === "function") {
							ig.soundHandler.unmuteBGM();
						}
					}
				}
			}
		}

		this.setVolumeFromCache();
	},
	cacheAudio: function () {
		if (this.adsFlags.isShown || this.adsFlags.isRequested) {
			this.log("Ads has been requested or shown");
			return;
		}

		// cache volume
		this.cacheAudioVolume();

		// cache muted flag
		this.cacheAudioMutedFlag();

		this.log("Audio settings has been cached");
	},

	cacheAudioVolume: function () {
		// invalidation before using the variables
		this.adsFlags.cachedSfxVolume = null;
		this.adsFlags.cachedBgmVolume = null;

		// Store current game volume
		this.cacheSfxVolume();
		this.cacheBgmVolume();
	},

	cacheAudioMutedFlag: function () {
		// invalidation before using the variables
		this.adsFlags.cachedSfxMutedFlag = null;
		this.adsFlags.cachedBgmMutedFlag = null;

		// Store current game muted flag
		this.cacheSfxMutedFlag();
		this.cacheBgmMutedFlag();
	},

	cacheSfxVolume: function () {
		if (typeof ig !== "undefined") {
			if (typeof ig.soundHandler !== "undefined") {
				if (typeof ig.soundHandler.sfxPlayer !== "undefined") {
					if (typeof ig.soundHandler.sfxPlayer.getVolume === "function") {
						if (this.adsFlags.cachedSfxVolume === null) {
							this.adsFlags.cachedSfxVolume =
								ig.soundHandler.sfxPlayer.getVolume();
						}
					}
				}
			}
		}
	},

	cacheBgmVolume: function () {
		if (typeof ig !== "undefined") {
			if (typeof ig.soundHandler !== "undefined") {
				if (typeof ig.soundHandler.bgmPlayer !== "undefined") {
					if (typeof ig.soundHandler.bgmPlayer.getVolume === "function") {
						if (this.adsFlags.cachedBgmVolume === null) {
							this.adsFlags.cachedBgmVolume =
								ig.soundHandler.bgmPlayer.getVolume();
						}
					}
				}
			}

			if (ig.music) {
				if (typeof ig.music.getVolume === "function") {
					if (this.adsFlags.cachedBgmVolume === null) {
						this.adsFlags.cachedBgmVolume = ig.music.getVolume();
					}
				}
			}
		}
	},

	cacheSfxMutedFlag: function () {
		if (typeof ig !== "undefined") {
			if (typeof ig.soundHandler !== "undefined") {
				if (typeof ig.soundHandler.muted !== "undefined") {
					if (this.adsFlags.cachedSfxMutedFlag === null) {
						this.adsFlags.cachedSfxMutedFlag = ig.soundHandler.muted;
					}
				}

				if (typeof ig.soundHandler.sfxPlayer !== "undefined") {
					if (typeof ig.soundHandler.sfxPlayer.muteFlag !== "undefined") {
						if (this.adsFlags.cachedSfxMutedFlag === null) {
							this.adsFlags.cachedSfxMutedFlag =
								ig.soundHandler.sfxPlayer.muteFlag;
						}
					}
				}

				if (typeof Howler !== "undefined") {
					if (typeof Howler._muted !== "undefined") {
						if (this.adsFlags.cachedSfxMutedFlag === null) {
							this.adsFlags.cachedSfxMutedFlag = Howler._muted;
						}
					}
				}
			}
		}
	},

	cacheBgmMutedFlag: function () {
		if (typeof ig !== "undefined") {
			if (typeof ig.soundHandler !== "undefined") {
				if (typeof ig.soundHandler.muted !== "undefined") {
					if (this.adsFlags.cachedBgmMutedFlag === null) {
						this.adsFlags.cachedBgmMutedFlag = ig.soundHandler.muted;
					}
				}

				if (typeof ig.soundHandler.bgmPlayer !== "undefined") {
					if (typeof ig.soundHandler.bgmPlayer.muteFlag !== "undefined") {
						if (this.adsFlags.cachedBgmMutedFlag === null) {
							this.adsFlags.cachedBgmMutedFlag =
								ig.soundHandler.bgmPlayer.muteFlag;
						}
					}
				}
			}
		}
	},

	setVolumeFromCache: function () {
		// Restore stored game volume
		this.setSfxVolumeFromCache();
		this.setBgmVolumeFromCache();
	},

	setSfxVolumeFromCache: function () {
		if (this.adsFlags.cachedSfxVolume > 0) {
			if (typeof ig !== "undefined") {
				if (typeof ig.soundHandler !== "undefined") {
					if (typeof ig.soundHandler.sfxPlayer !== "undefined") {
						if (typeof ig.soundHandler.sfxPlayer.volume === "function") {
							ig.soundHandler.sfxPlayer.volume(this.adsFlags.cachedSfxVolume);
						}
					}
				}
			}
		}
	},

	setBgmVolumeFromCache: function () {
		if (this.adsFlags.cachedBgmVolume > 0) {
			if (typeof ig !== "undefined") {
				if (typeof ig.soundHandler !== "undefined") {
					if (typeof ig.soundHandler.bgmPlayer !== "undefined") {
						if (typeof ig.soundHandler.bgmPlayer.volume === "function") {
							ig.soundHandler.bgmPlayer.volume(this.adsFlags.cachedBgmVolume);
						}
					}
				}

				if (ig.music) {
					if (typeof ig.music.setVolume === "function") {
						ig.music.setVolume(this.adsFlags.cachedBgmVolume);
					}
				}
			}
		}
	},
};

playbackControl.init();
