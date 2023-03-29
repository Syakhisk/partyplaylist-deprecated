import { UserIcon } from "@heroicons/react/24/solid";
import useSessionStore, { logout } from "@/stores/session-store";

const Info = () => {
  const username = useSessionStore((s) => s.username);
  const session = useSessionStore((s) => s.session);
  return (
    <div className="flex border justify-between px-4 py-1">
      <div className="flex md:flex-col max-md:items-center max-md:gap-2">
        <div className="text-xs leading-none">Session Code</div>
        <div className="font-mono max-md:leading-none">#{session.id}</div>
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
