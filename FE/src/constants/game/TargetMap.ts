import target from "../../assets/img/game/dayTarget.gif";
import heal from "../../assets/img/game/abilityDoctor.png";
import threat from "../../assets/img/game/abilityThug.png";
export const TARGET_MAP = [
  {
    img: target,
    content: "당신은 자라에게 살해 당하였습니다.",
  },
  {
    img: heal,
    content: "당신은 자라에게 공격 당하였지만, 의사로부터 치료 받았습니다.",
  },
  {
    img: threat,
    content: "당신은 협박을 받았습니다. 오늘 투표를 할 수 없습니다.",
  },
];
