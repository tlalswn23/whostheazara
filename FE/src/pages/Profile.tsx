import { LobbyListRoom } from "../components/lobby/LobbyListRoom";
import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";

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
      {viewMain == 2 ? <LobbyListRoom /> : ""}
      {viewMain == 3 ? <LobbyListRoom /> : ""}
    </ProfileLayout>
  );
};

export default Profile;
