import mainPageBGM from "../../assets/sound/bgm/mainPageBGM.wav"
import daytimeBGM from "../../assets/sound/bgm/daytimeBGM.wav"
import nightBGM from "../../assets/sound/bgm/nightBGM.wav"
import victoryBGM from "../../assets/sound/bgm/victoryBGM.wav"
import voteResultBGM from "../../assets/sound/bgm/voteResultBGM.wav"
import shopPageBGM from "../../assets/sound/bgm/shopPageBGM.wav"

import buttonClickSFX from "../../assets/sound/sfx/buttonClickSFX.wav"
import buttonTabSFX from "../../assets/sound/sfx/buttonTabSFX.wav"
import buttonSwapSFX from "../../assets/sound/sfx/buttonSwapSFX.wav"
import buttonCoinSFX from "../../assets/sound/sfx/buttonCoinSFX.wav"
import buttonSelect from "../../assets/sound/sfx/buttonSelect.wav"
import buttonUnselect from "../../assets/sound/sfx/buttonUnselect.wav"
import errorSFX from "../../assets/sound/sfx/errorSFX.wav"
import buttonRefreshSFX from "../../assets/sound/sfx/buttonRefreshSFX.wav"

export const BGM_MAP = {
    MAIN: mainPageBGM,
    DAY: daytimeBGM,
    NIGHT: nightBGM,
    VICTORY: victoryBGM,
    RESULT: voteResultBGM,
    SHOP: shopPageBGM,
}

export const SFX_MAP = {
    CLICK: buttonClickSFX,
    TAB: buttonTabSFX,
    SWAP: buttonSwapSFX,
    COIN: buttonCoinSFX,
    ERROR: errorSFX,
    SELECT: buttonSelect,
    UNSELECT: buttonUnselect,
    REFRESH: buttonRefreshSFX,
}