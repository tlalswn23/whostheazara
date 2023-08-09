// import { JOB_MAP } from "../../constants/common/JobMap";
// import { useAccessTokenState } from "../../context/accessTokenContext";
import { GameCamListItem } from "./GameCamListItem";
import { useEffect, useState } from "react";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
  myOrderNo: number;
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  deathByVoteOrderNo: number | null;
}

export const GameCamList = ({
  mainStreamManager,
  subscribers,
  myOrderNo,
  userInfo,
  deathByVoteOrderNo,
}: UserVideoProps) => {
  const [ghostList, setGhostList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
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
    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByVoteOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);
  }, [deathByVoteOrderNo]);

  useEffect(() => {
    subscribers.forEach(function (sub) {
      let userData = JSON.parse(sub.stream.connection.data);
      let userName = userData.clientData;
      userInfo.forEach(function (user, index) {
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
    userInfo.forEach(function (user, index) {
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
          <GameCamListItem
            orderNo={0}
            streamManager={streamManagers[0]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[0]}
          />
          <GameCamListItem
            orderNo={1}
            streamManager={streamManagers[1]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[1]}
          />
        </div>
        <div className="flex">
          <GameCamListItem
            orderNo={2}
            streamManager={streamManagers[2]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[2]}
          />
          <GameCamListItem
            orderNo={3}
            streamManager={streamManagers[3]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[3]}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem
            orderNo={4}
            streamManager={streamManagers[4]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[4]}
          />
          <GameCamListItem
            orderNo={5}
            streamManager={streamManagers[5]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[5]}
          />
        </div>
        <div className="flex">
          <GameCamListItem
            orderNo={6}
            streamManager={streamManagers[6]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[6]}
          />
          <GameCamListItem
            orderNo={7}
            streamManager={streamManagers[7]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[7]}
          />
        </div>
      </div>
    </div>
  );
};
