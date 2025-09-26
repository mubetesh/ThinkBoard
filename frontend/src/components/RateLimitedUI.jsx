import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] max-w-6xl  p-6 mx-auto ">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md ">
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
          <div className="flex-shrink-0 bg-primary/20 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary " />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Rate Limit Exceeded
            </h2>
            <p className="text-red-600 mb-4">
              You have reached the maximum number of requests allowed. Please
              wait a moment before trying again.
            </p>
            <p className="inline-block px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">
              Try again later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
