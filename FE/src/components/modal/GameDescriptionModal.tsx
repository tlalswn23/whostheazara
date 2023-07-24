import TabBtn from "../tab/TabBtn";
import Rodal from "rodal";
import { FormModalProps } from "../../types/FormModalProps";
import { Modal_Category_Map } from "../../constants/ModalCategoryMap";
import { SHOW_TAB_TYPE } from "../../constants/ShowTabType";
import TabContentLayout from "../../layouts/TabContentLayout";
import { useState } from "react";
import StoryContent from "./../tab/StoryContent";
import RuleContent from "./../tab/RuleContent";
import RoleContent from "./../tab/RoleContent";
import CautionContent from "./../tab/CautionContent";

const GameDescription = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [curTabType, setCurTabType] = useState<number>(SHOW_TAB_TYPE.STORY);
  const renderTabContent = () => {
    if (curTabType === SHOW_TAB_TYPE.STORY) return <StoryContent />;
    else if (curTabType === SHOW_TAB_TYPE.RULE) return <RuleContent />;
    else if (curTabType === SHOW_TAB_TYPE.ROLE) return <RoleContent />;
    else if (curTabType === SHOW_TAB_TYPE.CAUTION) return <CautionContent />;
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.GAME_DESCRIPTION}
      onClose={() => showModalHandler(Modal_Category_Map.NONE)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1100}
      height={640}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
    >
      <div className="flex">
        {Object.values(SHOW_TAB_TYPE).map((tabType) => {
          return (
            <TabBtn key={tabType} tabType={tabType} isActive={curTabType === tabType} setCurTabType={setCurTabType} />
          );
        })}
      </div>
      <TabContentLayout>{renderTabContent()}</TabContentLayout>
    </Rodal>
  );
};
export default GameDescription;
