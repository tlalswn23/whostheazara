import forbiddenAuthBg from "../assets/img/forbiddenAuthBg.png";
const ForbiddenAuth = () => {
  return (
    <div
      className="w-screen h-screen bg-contain bg-black  bg-no-repeat  bg-center"
      style={{ backgroundImage: `url(${forbiddenAuthBg})` }}
    >
      ForbiddenAuth
    </div>
  );
};
export default ForbiddenAuth;
