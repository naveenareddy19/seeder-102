import React from "react";
import AuthenticationTemplate from "../../templates/Authentication";
import Money from "../../../../public/assets/images/singin.svg";
import SignupCard from "../../organisms/SignUp";

const SignUpPage = () => {
  return (
    <AuthenticationTemplate imageSrc={Money}>
      <SignupCard />
    </AuthenticationTemplate>
  );
};

export default SignUpPage;
