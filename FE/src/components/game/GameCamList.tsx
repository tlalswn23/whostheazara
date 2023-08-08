import { forEach } from "lodash";
import { JOB_MAP } from "../../constants/common/JobMap";
import { GameCamListItem } from "./GameCamListItem";
import { useEffect, useState } from "react";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
}

export const GameCamList = ({ mainStreamManager, subscribers }: UserVideoProps) => {
  const [streamManagers, setSM] = useState([undefined,]);
  const onSetSM = (idx: number, stream: any) => {
    setSM(prevSMs => {
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
      locNo: 1,
      jobNo: JOB_MAP[0].id,
      jobName: JOB_MAP[0].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 12,
      nickname: "cola",
      locNo: 2,
      jobNo: JOB_MAP[1].id,
      jobName: JOB_MAP[1].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 32,
      nickname: "duri",
      locNo: 3,
      jobNo: JOB_MAP[2].id,
      jobName: JOB_MAP[2].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 40,
      nickname: "koko",
      locNo: 4,
      jobNo: JOB_MAP[3].id,
      jobName: JOB_MAP[3].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 112,
      nickname: "bibi",
      locNo: 5,
      jobNo: JOB_MAP[4].id,
      jobName: JOB_MAP[4].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 11,
      nickname: "mong",
      locNo: 6,
      jobNo: JOB_MAP[5].id,
      jobName: JOB_MAP[5].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 67,
      nickname: "maru",
      locNo: 7,
      jobNo: JOB_MAP[6].id,
      jobName: JOB_MAP[6].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 21,
      nickname: "hodu",
      locNo: 8,
      jobNo: JOB_MAP[6].id,
      jobName: JOB_MAP[6].name,
      isDie: false,
    },
  ];  

  useEffect(() => {
    console.log("USEEFFECTTEST!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("USEE", subscribers);
    console.log(mainStreamManager);
    

    subscribers.forEach(function(sub) {
      let userData = JSON.parse(sub.stream.connection.data);
      let userName = userData.clientData;
      
      console.log(userName);
      userList.forEach(function(user) {
        if (user.nickname === userName) {
          onSetSM(user.locNo-1, sub);
        }
        if (mainStreamManager) {
          let myData = JSON.parse(mainStreamManager.stream.connection.data);
          let myName = myData.clientData;
          if (user.nickname === myName) {
            onSetSM(user.locNo-1, mainStreamManager);
          }
        }
      })
    });

    console.log(streamManagers);
    //streamManagers[0] = subscribers[0];
    //streamManagers[1] = subscribers[1];

  }, [subscribers])
  
  useEffect(() => {
    console.log("mainStreamManager!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("USEE", subscribers);
    console.log(mainStreamManager);
          
    userList.forEach(function(user) {
      if (mainStreamManager) {
        let myData = JSON.parse(mainStreamManager.stream.connection.data);
        let myName = myData.clientData;
        console.log("MYNAME!!!!!!!!!", myName);
        if (user.nickname === myName) {
          onSetSM(user.locNo-1, mainStreamManager);
        }
      }
    });    
  }, [mainStreamManager])

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
