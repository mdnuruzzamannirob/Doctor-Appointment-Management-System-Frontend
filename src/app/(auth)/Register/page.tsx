import AuthForm from "@/components/AuthForm";
import AuthIllustration from "@/components/AuthIllustration";

const RegisterPage = () => {
  return (
    <div className="min-h-dvh flex max-lg:flex-col">
      {/* Left Side - Form */}
      <AuthForm type="register" />

      {/* Right Side - Illustration */}
      <AuthIllustration />
    </div>
  );
};

export default RegisterPage;
