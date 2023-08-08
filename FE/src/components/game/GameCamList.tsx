import { JOB_MAP } from "../../constants/common/JobMap";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { GameCamListItem } from "./GameCamListItem";
import { useEffect, useState } from "react";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
  myOrderNo: number;
  userJob: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
}

export const GameCamList = ({ mainStreamManager, subscribers, myOrderNo, userJob }: UserVideoProps) => {
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

  useEffect(() => {
    subscribers.forEach(function (sub) {
      let userData = JSON.parse(sub.stream.connection.data);
      let userName = userData.clientData;
      userJob.forEach(function (user, index) {
        if (user.nickname === userName) {
          onSetSM(index, sub);
        }
        if (mainStreamManager) {
          let myData = JSON.parse(mainStreamManager.stream.connection.data);
          let myName = myData.clientData;
          if (user.nickname === myName) {
            onSetSM(index, mainStreamManager);
          }
        }
      });
    });
  }, [subscribers]);

  useEffect(() => {
    userJob.forEach(function (user, index) {
      if (mainStreamManager) {
        let myData = JSON.parse(mainStreamManager.stream.connection.data);
        let myName = myData.clientData;
        if (user.nickname === myName) {
          onSetSM(index, mainStreamManager);
        }
      }
    });
  }, [mainStreamManager]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem orderNo={0} streamManager={streamManagers[0]} userJob={userJob} myOrderNo={myOrderNo} />
          <GameCamListItem orderNo={1} streamManager={streamManagers[1]} userJob={userJob} myOrderNo={myOrderNo} />
        </div>
        <div className="flex">
          <GameCamListItem orderNo={2} streamManager={streamManagers[2]} userJob={userJob} myOrderNo={myOrderNo} />
          <GameCamListItem orderNo={3} streamManager={streamManagers[3]} userJob={userJob} myOrderNo={myOrderNo} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem orderNo={4} streamManager={streamManagers[4]} userJob={userJob} myOrderNo={myOrderNo} />
          <GameCamListItem orderNo={5} streamManager={streamManagers[5]} userJob={userJob} myOrderNo={myOrderNo} />
        </div>
        <div className="flex">
          <GameCamListItem orderNo={6} streamManager={streamManagers[6]} userJob={userJob} myOrderNo={myOrderNo} />
          <GameCamListItem orderNo={7} streamManager={streamManagers[7]} userJob={userJob} myOrderNo={myOrderNo} />
        </div>
      </div>
    </div>
  );
};
