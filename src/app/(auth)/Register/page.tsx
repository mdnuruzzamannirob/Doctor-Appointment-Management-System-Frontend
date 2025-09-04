import AuthForm from "@/components/AuthForm";
import AuthIllustration from "@/components/AuthIllustration";

const RegisterPage = () => {
  return (
    <div className="min-h-dvh flex max-lg:flex-col">
      <AuthForm type="register" />
      <AuthIllustration />
    </div>
  );
};

export default RegisterPage;
