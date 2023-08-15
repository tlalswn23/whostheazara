import StoryImg from "../../assets/img/home/StoryImg.png";

const StoryContent = () => {
  return (
    <div className="text-center 3xl:text-[28px] text-[22.4px] 3xl:leading-[60px] leading-[48px]">
      <p>1. 어느 날, 바다의 용왕은 이유모를 큰 병에 걸린다.</p>
      <p>용왕에게는 소문난 충신 자라가 있었는데,</p>
      <p>자라는 용왕을 위해 명약이라 소문난 토끼의 간을 찾아나선다.</p>
      <img className="m-auto 3xl:h-[220px] h-[176px]" src={StoryImg} />

      <p>2. 한 달에 한 번 토끼들이 배를 타고 이동하는 날,</p>
      <p>자라는 토끼들이 시력이 나쁜 점을 이용하여 변장 후 잠입한다!</p>
      <img className="m-auto 3xl:h-[220px] h-[176px]" src={StoryImg} />

      <p>3. 자라가 배에 숨어들었다는 소식을 듣게 된 토끼들,</p>
      <p>그들은 과연 숨은 자라를 찾아내고 무사히 배에서 내릴 수 있을까?</p>
      <img className="m-auto 3xl:h-[220px] h-[176px]" src={StoryImg} />
    </div>
  );
};

export default StoryContent;
