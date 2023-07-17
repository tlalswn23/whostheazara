export const FirstViewRuleText = () => {
  return (
    <div className="mb-12 ">
      <p>낮과 밤 (제한시간 : 낮 3분, 밤 30초)</p>
      <li>게임은 ‘낮’부터 시작됩니다.</li>
      <li>‘낮’에는 생존한 모든 토끼들 간의 대화가 가능합니다.</li>
      <li>‘밤’이 되면, 거북이들만 서로 대화가 가능합니다.</li>
      <br />
      <p>투표</p>
      <li>낮이 끝나면 투표를 하여 처형할 토끼를 결정합니다.</li>
      <li>가장 많은 표를 받은 토끼는 최후의 변론을 할 수 있습니다.</li>
      <li>변론 이후에 찬반 투표를 통해 처형 여부를 결정합니다.</li>
      <br />
    </div>
  );
};

export const SecondViewRuleText = () => {
  return (
    <div className=" relative top-52">
      <p>승리 조건</p>
      <li>거북이들의 수가 토끼들의 수와 같거나 많으면 거북이들이 승리합니다.</li>
      <li>거북이들이 모두 처형당하면 토끼들이 승리합니다.</li>
      <br />
      <p>기능</p>
      <li>능력 사용 탭에서 역할이 가진 능력을 사용할 수 있습니다.</li>
      <li>‘낮’에 버튼을 눌러 남은 시간을 증가시키거나 감소시킬 수 있습니다.</li>
    </div>
  );
};
