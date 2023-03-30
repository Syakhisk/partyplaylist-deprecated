import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import useSessionStore, { logout } from "@/stores/session-store";
import { Link } from "react-router-dom";

const Info = () => {
  const username = useSessionStore((s) => s.username);
  const session = useSessionStore((s) => s.session);
  return (
    <div className="flex border justify-between px-4 py-1">
      <div className="flex items-center gap-2">
        <Link to="/">
          <button className="-ml-2 outline outline-1 outline-muted p-2 rounded hover:outline-primary group transition-colors duration-150">
            <ChevronLeftIcon className="h-4 w-4 group-hover:text-primary transition-colors duration-150" />
          </button>
        </Link>
        <div className="flex md:flex-col max-md:items-center max-md:gap-2">
          <div className="text-xs leading-none">Session Code</div>
          <div className="font-mono max-md:leading-none">#{session.id}</div>
        </div>
      </div>

      <button
        className="flex items-center gap-2"
        onDoubleClick={logout}
        title="Double click to logout"
      >
        <div className="text-xs">
          <UserIcon className="h-4 w-4" />
        </div>

        <div>{username}</div>
      </button>
    </div>
  );
};

export default Info;
