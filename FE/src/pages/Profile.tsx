import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";
import { ProfileHeaderBtn } from "../components/profile/ProfileHeaderBtn";
import { ProfileRecentlyData } from "../components/profile/ProfileRecentlyData";
import { ProfileData } from "../components/profile/ProfileData";
import ProfileDelUser from "./../components/profile/ProfileDelUser";
import { useEffect } from "react";
import ProfileBasic from "../components/profile/ProfileBasic";
import { PROFILE_MAP } from "../constants/profile/ProfileMap";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useUsersApiCall } from "../api/axios/useUsersApiCall";
interface MyInfo {
  id: number;
  email: string;
  nickname: string;
}

const Profile = () => {
  const { getMyInfo } = useUsersApiCall();
  useFetchAccessToken();

  const [viewMain, setViewMain] = useState(0);
  const [myInfo, setMyInfo] = useState<MyInfo>({
    id: 0,
    email: "",
    nickname: "",
  });

  useEffect(() => {
    (async function fetchMyInfo() {
      const myInfo = await getMyInfo();
      setMyInfo(myInfo);
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
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end 3xl:mt-[40px] mt-[30px] 3xl:mb-[20px] mb-[15px] 3xl:mr-[60px] mr-[48px]">
          <ProfileHeaderBtn text="로비 화면" loc="lobby" />
          <ProfileHeaderBtn text="홈 화면" loc="" />
        </div>
        <div className="relative flex items-center 3xl:ml-[120px] ml-[102px]">
          <ProfileSideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
          <div className="3xl:min-w-[1140px] min-w-[912px] 3xl:h-[700px] h-[560px] 3xl:mx-[140px] mx-[112px] border-solid border-white 3xl:border-[20px] border-[15px] 3xl:text-[56px] text-[44px] font-bold bg-black">
            {viewMain == PROFILE_MAP.NONE && (
              <ProfileBasic id={myInfo.id} email={myInfo.email} nickname={myInfo.nickname} />
            )}
            {viewMain == PROFILE_MAP.PROFILE_UPDATE && <ProfileUpdate />}
            {viewMain == PROFILE_MAP.PROFILE_RECENTLY_DATA && <ProfileRecentlyData />}
            {viewMain == PROFILE_MAP.PROFILE_DATA && <ProfileData />}
            {viewMain == PROFILE_MAP.PROFILE_DEL_USER && <ProfileDelUser />}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
