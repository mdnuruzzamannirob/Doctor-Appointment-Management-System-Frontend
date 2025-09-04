import AuthForm from "@/components/AuthForm";
import AuthIllustration from "@/components/AuthIllustration";

const LoginPage = () => {
  return (
    <div className="min-h-dvh flex max-lg:flex-col">
      {/* Left Side - Form */}
      <AuthForm type="login" />

      {/* Right Side - Illustration */}
      <AuthIllustration />
    </div>
  );
};

export default LoginPage;
