import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";
import { ProfileHeaderBtn } from "../components/profile/ProfileHeaderBtn";
import { ProfileRecentlyData } from "../components/profile/ProfileRecentlyData";
import { ProfileData } from "../components/profile/ProfileData";
import ProfileDelUser from "./../components/profile/ProfileDelUser";
import { useEffect } from "react";
import { getMyInfo } from "../api/users/usersApiCall";
import { useAccessTokenState } from "../context/loginContext";
import ProfileBasic from "../components/profile/ProfileBasic";

interface MyInfo {
  id: number;
  email: string;
  nickname: string;
}

const Profile = () => {
  const [viewMain, setViewMain] = useState(0);
  const { accessToken, setAccessToken } = useAccessTokenState();
  const [myInfo, setMyInfo] = useState<MyInfo>({
    id: 0,
    email: "",
    nickname: "",
  });

  useEffect(() => {
    (async function fetchMyInfo() {
      try {
        const { myInfo, newAccessToken } = await getMyInfo(accessToken);
        setMyInfo(myInfo);
        setAccessToken(newAccessToken);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // TODO: 추가적으로 최근전적 + 게임전적통계 가져오고 보여주기, 이부분은 api 아직 안만들어짐

  const onSetViewMain = (index: number) => {
    setViewMain((prevViewMain) => {
      if (prevViewMain === index) {
        return 0;
      } else {
        return index;
      }
    });
  };
  return (
    <ProfileLayout>
      <div className="flex flex-col w-full">
        <div className="flex justify-end mb-[20px] mr-[60px]">
          <ProfileHeaderBtn text="로비 화면" loc="lobby" />
          <ProfileHeaderBtn text="홈 화면" loc="" />
        </div>
        <div className="relative flex items-center justify-around">
          <ProfileSideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
          <div className="w-[1140px] h-[700px] border-solid border-white border-[20px] text-[56px] font-bold bg-black">
            {viewMain == 0 ? <ProfileBasic id={myInfo.id} email={myInfo.email} nickname={myInfo.nickname} /> : ""}
            {viewMain == 1 ? <ProfileUpdate /> : ""}
            {viewMain == 2 ? <ProfileRecentlyData /> : ""}
            {viewMain == 3 ? <ProfileData /> : ""}
            {viewMain == 4 ? <ProfileDelUser /> : ""}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
