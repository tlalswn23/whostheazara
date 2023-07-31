import jobZara from "../../assets/img/common/jobZara.png";
import jobRabbit from "../../assets/img/common/jobRabbit.png";
import jobPolitician from "../../assets/img/common/jobPolitician.png";
import jobDoctor from "../../assets/img/common/jobDoctor.png";
import jobPolice from "../../assets/img/common/jobPolice.png";
import jobArmy from "../../assets/img/common/jobArmy.png";
import jobThug from "../../assets/img/common/jobThug.png";

export const JOB_MAP = [
  // 1:시민 2:의사 3:경찰 4:정치 5:군인 6:건달 7:마피아
  {
    id: 1,
    name: "토끼",
    info: "선량한 토끼, 자라를 찾아내서 승리하세요!",
    img: jobRabbit,
  },
  {
    id: 2,
    name: "자라",
    info: "매일 밤 한마리의 토끼를 선택하여 공격합니다.",
    img: jobZara,
  },
  {
    id: 3,
    name: "의사",
    info: "매일 밤 선택한 토끼는 자라의 공격을 방어할 수 있습니다.",
    img: jobDoctor,
  },
  {
    id: 4,
    name: "경찰",
    info: "매일 밤 선택한 토끼가 자라인지 알 수 있습니다.",
    img: jobPolice,
  },
  {
    id: 5,
    name: "정치인",
    info: "투표에서 2표를 가지고, 투표로 처형되지 않습니다.",
    img: jobPolitician,
  },
  {
    id: 6,
    name: "군인",
    info: "자라의 공격을 한 번 버틸 수 있습니다.",
    img: jobArmy,
  },
  {
    id: 7,
    name: "건달",
    info: "건달이 선택한 토끼는 그 날 투표할 수 없습니다.",
    img: jobThug,
  },
];
