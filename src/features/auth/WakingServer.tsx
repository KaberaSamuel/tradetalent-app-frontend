import { Spinner } from "@/components/Loader";

interface Props {
  action: "login" | "signup";
}

function WakingServer({ action }: Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-fit">
        <Spinner />
      </div>

      <div className="mt-8 sm:text-lg flex flex-col items-center gap-1">
        <p className=" text-teal-500">
          Your {action} request was received but the server is still waking up,
        </p>
        <p className=" text-red-500">This can take 1-3 minutes</p>
      </div>
    </div>
  );
}

export default WakingServer;
