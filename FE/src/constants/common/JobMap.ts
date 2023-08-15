import jobZara from "../../assets/img/common/jobZara.png";
import jobRabbit from "../../assets/img/common/jobRabbit.png";
import jobPolitician from "../../assets/img/common/jobPolitician.png";
import jobDoctor from "../../assets/img/common/jobDoctor.png";
import jobPolice from "../../assets/img/common/jobPolice.png";
import jobArmy from "../../assets/img/common/jobArmy.png";
import jobThug from "../../assets/img/common/jobThug.png";

export const JOB_MAP = [
  // 1:시민 2:마피아 3:의사 4:경찰 5:정치 6:군인 7:건달
  {
    name: "",
    info: "",
    imgColor: jobRabbit,
    color: "",
  },
  {
    id: "1",
    name: "토끼",
    info: "선량한 토끼, 자라를 찾아내서 승리하세요!",
    imgColor: jobRabbit,
    color: "text-yellow-100",
  },
  {
    id: "2",
    name: "자라",
    info: "매일 밤 한마리의 토끼를 선택하여 공격합니다.",
    imgColor: jobZara,
    color: "text-green-200",
  },
  {
    id: "3",
    name: "의원토끼",
    info: "매일 밤 선택한 토끼는 자라의 공격을 방어할 수 있습니다.",
    imgColor: jobDoctor,
    color: "text-pink-200",
  },
  {
    id: "4",
    name: "무당토끼",
    info: "매일 밤 선택한 토끼가 자라인지 알 수 있습니다.",
    imgColor: jobPolice,
    color: "text-blue-400",
  },
  {
    id: "5",
    name: "탐관토끼",
    info: "투표에서 2표를 가지고, 투표로 처형되지 않습니다.",
    imgColor: jobPolitician,
    color: "text-red-400",
  },
  {
    id: "6",
    name: "장군토끼",
    info: "자라의 공격을 한 번 버틸 수 있습니다.",
    imgColor: jobArmy,
    color: "text-green-500",
  },
  {
    id: "7",
    name: "산적토끼",
    info: "건달이 선택한 토끼는 그 날 투표할 수 없습니다.",
    imgColor: jobThug,
    color: "text-yellow-600",
  },
];
