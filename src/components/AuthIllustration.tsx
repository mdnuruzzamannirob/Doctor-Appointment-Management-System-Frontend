import { cn } from "@/lib/utils";

interface AuthIllustrationProps {
  className?: string;
}

const AuthIllustration = ({ className }: AuthIllustrationProps) => {
  return (
    <div
      className={cn(
        "flex-1 max-lg:hidden text-white p-5 flex flex-col justify-center",
        className
      )}
    >
      <div className="bg-[#208acd] rounded-2xl size-full flex flex-col justify-center p-5">
        <h2 className="text-2xl font-semibold mb-4">
          Effortlessly manage your team and operations.
        </h2>
        <p className="text-blue-100 mb-6">
          Log in to access your CRM dashboard and manage your team.
        </p>

        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-bold">$189,374</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-xl font-bold">$25,684</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Sales Overview</p>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Sale Categories</p>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;
