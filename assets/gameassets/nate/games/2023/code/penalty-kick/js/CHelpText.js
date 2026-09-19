function CHelpText(oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _oHelpText;
    var _oHelpTextStroke;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        _oHelpTextStroke = new CTLText(_oContainer, 
                    CANVAS_WIDTH / 2 -250, CANVAS_HEIGHT_HALF, 500, 60, 
                    50, "center", TEXT_COLOR_STROKE, FONT_GAME, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, false,
                    false );
        
        _oHelpTextStroke.setOutline(4);
        
        _oHelpText = new CTLText(_oContainer, 
                    CANVAS_WIDTH / 2 -250, CANVAS_HEIGHT_HALF, 500, 60, 
                    50, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, false,
                    false);

        _oContainer.alpha = 0;
    };

    this.fadeAnim = function (fVal, oFunc) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, MS_TIME_FADE_HELP_TEXT).call(function () {
            if (oFunc !== null) {
                oFunc();
            }
        }, null, this);
    };

    this.unload = function () {
        createjs.Tween.removeTweens(_oContainer);
        _oParentContainer.removeChild(_oContainer);
    };

    this._init();

    return this;
}