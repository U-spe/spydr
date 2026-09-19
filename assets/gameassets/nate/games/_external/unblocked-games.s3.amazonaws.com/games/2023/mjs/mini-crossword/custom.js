// wg universal
!function(e,t){a=e.createElement("script"),m=e.getElementsByTagName("script")[0],a.async=1,a.src=t,m.parentNode.insertBefore(a,m)}(document,"https://universal.wgplayer.com/tag/?lh="+window.location.hostname+"&wp="+window.location.pathname+"&ws="+window.location.search);

function InitApi()
{
	var dateNow = new Date();
	var secondsSinceEpoch = Math.round(dateNow.getTime() / 1000);
		
	console.log('InitApi');
			
	window.callTime = secondsSinceEpoch - 361;
	window.fakeRewarded = true;
}
		
function ExternEval()
{
	console.log("ExternEval");
			
	var dateNow = new Date();
	var secondsSinceEpoch = Math.round(dateNow.getTime() / 1000);
			
	if (window.callTime != undefined && 
		secondsSinceEpoch - window.callTime > 360)
	{
		console.log('ExternEval 2');
				
		window.callTime = secondsSinceEpoch;
				
		if (typeof preroll !== 'undefined')
		{
			if (window[preroll.config.loaderObjectName] != undefined)
			{
				//gameInstance.SendMessage('FreezeNovaAPI', 'AdMessage', 'onOpen');
				PAUSE();
					
				try {
					window[preroll.config.loaderObjectName].refetchAd(ExternEvalResumeGame);
				}
				catch(err) {
					console.log(err.message);
					//gameInstance.SendMessage('FreezeNovaAPI', 'AdMessage', 'onClose');
					RESUME();
				}
			}
		}
	}
			
}
		
function ExternEvalResumeGame()
{
	console.log("ExternEvalResumeGame");
		
	//gameInstance.SendMessage('FreezeNovaAPI', 'AdMessage', 'onClose');
	RESUME();
}

function PreloadRewarded()
{
    console.log("PreloadRewarded");
	
	if (typeof preroll !== 'undefined' && window[preroll.config.loaderObjectName] != undefined && window.fakeRewarded == false)
	{
		if (window.rewardedCallbacks == undefined)
		{
			window.rewardedCallbacks = true;
			
			try {
				window[window.preroll.config.loaderObjectName].registerRewardCallbacks({
					onReady:RewardedReady, 
					onSuccess:RewardedSuccess, 
					onFail:RewardedFail,
					onClose:RewardedClose
				});
			}
			catch(err) {
				console.log(err.message);
			}
		}
	}
	else
	{
		if (window.fakeRewarded == true && window.rewardedCallbacks == undefined)
		{
			window.rewardedCallbacks = true;
			RewardedReady();
		}
	}
}

function RewardedReady()
{
	console.log("RewardedReady");
		
	REWARDED_ADS_READY(true);
	
}
	
function RewardedSuccess()
{
	console.log("RewardedSuccess");
	
	REWARDED_ADS_COMPLETED(true);
}
	
function RewardedFail()
{
	console.log("RewardedFail");

	REWARDED_ADS_COMPLETED(false);
}

function RewardedClose()
{
	console.log("RewardedClose");
	
	RESUME();
}

function ShowRewarded()
{
	console.log("ShowRewarded");
	
	if (typeof preroll !== 'undefined' && window[preroll.config.loaderObjectName] != undefined && window.fakeRewarded == false)
	{
		if (window.rewardedCallbacks == undefined)
		{
			PreloadRewarded();
		}
		
		PAUSE();
		
		try {
			window[preroll.config.loaderObjectName].showRewardAd();
		}
		catch(err) {
			console.log(err.message);
			RESUME();
		}
	}
	else
	{
		if (window.fakeRewarded == true)
		{
			if (window.rewardedCallbacks == undefined)
			{
				PreloadRewarded();
			}
		
			PAUSE();
			setTimeout(RewardedSuccess, 200);
			setTimeout(RewardedClose, 300);
			setTimeout(RewardedReady, 400);
		}
	}
	
}
		

function _GAME_LOADED() {
  //INJECT YOUR OWN CODE HERE
  console.warn("GAME LOADED");
  
  setTimeout(PreloadRewarded, 200);
}

function _START_GAME() {
  //INJECT YOUR OWN CODE HERE
  console.warn("START GAME");
  
  ExternEval();
}

function _END_GAME() {
  //INJECT YOUR OWN CODE HERE
  console.warn("END GAME");
  
  //ExternEval();
}

function _SHOW_REWARDED_ADS() {
  //INJECT YOUR OWN CODE HERE
  console.warn("SHOW REWARDED ADS");
  
  ShowRewarded();
}

InitApi();