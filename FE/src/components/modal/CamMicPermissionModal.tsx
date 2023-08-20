import Rodal from "rodal";
import { FormModalProps } from "../../types/FormModalProps";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import loginBox from "../../assets/img/home/loginBox.png";
import camMicPermission from "../../assets/img/home/camMicPermission.gif";

const CamMicPermissionModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.PERMISSION_DENIED}
      onClose={() => showModalHandler(Modal_Category_Map.NONE)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
    >
      <img
        src={loginBox}
        className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:min-w-[560px] min-w-[448px] 3xl:h-[480px] h-[384px] bg-transparent"
      />
      <img
        src={camMicPermission}
        className="absolute left-[50%] top-[100%] transform -translate-x-1/2 -translate-y-1/2 3xl:min-w-[460px] min-w-[408px] 3xl:h-[240px] min-h-[204px]"
      />
      CamMicPermissionModal
    </Rodal>
  );
};

export default CamMicPermissionModal;
