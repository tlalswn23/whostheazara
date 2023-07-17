import TabBtn from "../tab/TabBtn";
import Rodal from "rodal";
import { FormModalProps } from "../../types/FormModalProps";
import { ModalCategoryMap } from "../../constants/ModalCategoryMap";
import { ShowTabType } from "../../constants/ShowTabType";
import TabContentLayout from "../../layouts/TabContentLayout";
import { useState } from "react";
import StoryContent from "./../tab/StoryContent";
import RuleContent from "./../tab/RuleContent";
import RoleContent from "./../tab/RoleContent";
import CautionContent from "./../tab/CautionContent";

const GameDescription = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [curTabType, setCurTabType] = useState<number>(ShowTabType.story);
  const renderTabContent = () => {
    if (curTabType === ShowTabType.story) return <StoryContent />;
    else if (curTabType === ShowTabType.rule) return <RuleContent />;
    else if (curTabType === ShowTabType.role) return <RoleContent />;
    else if (curTabType === ShowTabType.caution) return <CautionContent />;
  };

  return (
    <Rodal
      visible={curModalType === ModalCategoryMap.GameDescription}
      onClose={() => showModalHandler(ModalCategoryMap.None)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1200}
      height={700}
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
        {Object.values(ShowTabType).map((tabType) => {
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
