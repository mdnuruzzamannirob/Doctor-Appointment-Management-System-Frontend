import { LuLoader } from "react-icons/lu";

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
}

const SubmitButton = ({ isSubmitting, label }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-[#208acd] text-sm cursor-pointer text-white py-2 rounded-md hover:bg-[#208acd]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#208acd]"
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <LuLoader className="animate-spin size-4" />
        Submitting...
      </span>
    ) : (
      label
    )}
  </button>
);

export default SubmitButton;
