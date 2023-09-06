import AuthenticationTemplate from "../../templates/Authentication";
import LoginPanel from "../../../../public/assets/images/loginimage.svg";
import LoginCard from "../../organisms/LogIn";

const LoginPage = () => {
  return (
    <AuthenticationTemplate
      imageSrc={LoginPanel}
      children={<LoginCard />}
    ></AuthenticationTemplate>
  );
};

export default LoginPage;
