import { useSessionStore } from "../lib/store";

const SessionInfo = () => {
  const session = useSessionStore((s) => s.session);
  return (
    <div className="flex flex-wrap gap-4 justify-around border rounded max-w-xl overflow-ellipsis p-4 w-full">
      <div className="w-full text-center text-2xl font-mono border rounded p-2">
        {session.name}
      </div>

      <div className="text-center">
        <div className="text-xs text-dim">Session ID</div>
        <div>#{session.id}</div>
      </div>

      <div className="text-left flex-grow overflow-hidden">
        <div className="text-xs text-dim">Host</div>
        <div>{session.host}</div>
      </div>
    </div>
  );
};

export default SessionInfo;
