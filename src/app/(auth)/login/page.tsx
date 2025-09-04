import AuthForm from "@/components/AuthForm";
import AuthIllustration from "@/components/AuthIllustration";

const LoginPage = () => {
  return (
    <div className="min-h-dvh flex max-lg:flex-col">
      <AuthForm type="login" />
      <AuthIllustration />
    </div>
  );
};

export default LoginPage;
