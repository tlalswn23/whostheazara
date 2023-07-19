import { LobbyListRoom } from "../components/lobby/LobbyListRoom";
import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";
import { ProfileHeaderBtn } from "../components/profile/ProfileHeaderBtn";
import { ProfileRecentlyData } from "../components/profile/ProfileRecentlyData";
import { ProfileData } from "../components/profile/ProfileData";

const Profile = () => {
  const [viewMain, setViewMain] = useState(0);
  const onSetViewMain = (index: number) => {
    if (viewMain === index) {
      setViewMain(0);
    } else {
      setViewMain(index);
    }
  };
  return (
    <ProfileLayout>
      <ProfileSideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
      {viewMain == 1 ? <ProfileUpdate /> : ""}
      {viewMain == 2 ? <ProfileRecentlyData /> : ""}
      {viewMain == 3 ? <ProfileData /> : ""}
      <ProfileHeaderBtn index={0} text="로비 화면" loc="lobby" />
      <ProfileHeaderBtn index={1} text="홈 화면" loc="" />
    </ProfileLayout>
  );
};

export default Profile;
