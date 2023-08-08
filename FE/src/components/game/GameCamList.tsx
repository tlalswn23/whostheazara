import { JOB_MAP } from "../../constants/common/JobMap";
import { GameCamListItem } from "./GameCamListItem";
import { useEffect, useState } from "react";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
  myJobSeq: number;
}

export const GameCamList = ({ mainStreamManager, subscribers, myJobSeq }: UserVideoProps) => {
  const [streamManagers, setSM] = useState([undefined]);
  const onSetSM = (idx: number, stream: any) => {
    setSM((prevSMs) => {
      let newSMs = [...prevSMs];
      while (newSMs.length <= idx) {
        newSMs.push(undefined);
      }
      newSMs[idx] = stream;
      return newSMs;
    });
  };
  const userList = [
    {
      roomCode: 24,
      userNo: 101,
      nickname: "jetty",
      orderNo: 1,
      jobName: JOB_MAP[1].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 12,
      nickname: "cola",
      orderNo: 2,
      jobName: JOB_MAP[2].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 32,
      nickname: "duri",
      orderNo: 3,
      jobName: JOB_MAP[3].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 40,
      nickname: "koko",
      orderNo: 4,
      jobName: JOB_MAP[4].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 112,
      nickname: "bibi",
      orderNo: 5,
      jobName: JOB_MAP[5].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 11,
      nickname: "mong",
      orderNo: 6,
      jobName: JOB_MAP[6].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 67,
      nickname: "maru",
      orderNo: 7,
      jobName: JOB_MAP[1].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 21,
      nickname: "hodu",
      orderNo: 8,
      jobName: JOB_MAP[2].name,
      isDie: false,
    },
  ];

  useEffect(() => {
    subscribers.forEach(function (sub) {
      let userData = JSON.parse(sub.stream.connection.data);
      let userName = userData.clientData;
      userList.forEach(function (user) {
        if (user.nickname === userName) {
          onSetSM(user.orderNo - 1, sub);
        }
        if (mainStreamManager) {
          let myData = JSON.parse(mainStreamManager.stream.connection.data);
          let myName = myData.clientData;
          if (user.nickname === myName) {
            onSetSM(user.orderNo - 1, mainStreamManager);
          }
        }
      });
    });
  }, [subscribers]);

  useEffect(() => {
    userList.forEach(function (user) {
      if (mainStreamManager) {
        let myData = JSON.parse(mainStreamManager.stream.connection.data);
        let myName = myData.clientData;
        if (user.nickname === myName) {
          onSetSM(user.orderNo - 1, mainStreamManager);
        }
      }
    });
  }, [mainStreamManager]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem item={userList[0]} streamManager={streamManagers[0]} />
          <GameCamListItem item={userList[1]} streamManager={streamManagers[1]} />
        </div>
        <div className="flex">
          <GameCamListItem item={userList[2]} streamManager={streamManagers[2]} />
          <GameCamListItem item={userList[3]} streamManager={streamManagers[3]} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem item={userList[4]} streamManager={streamManagers[4]} />
          <GameCamListItem item={userList[5]} streamManager={streamManagers[5]} />
        </div>
        <div className="flex">
          <GameCamListItem item={userList[6]} streamManager={streamManagers[6]} />
          <GameCamListItem item={userList[7]} streamManager={streamManagers[7]} />
        </div>
      </div>
    </div>
  );
};
