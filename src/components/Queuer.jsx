import { useRef } from "react";
import { handleQueueAdd } from "../lib/handler";
import { useSessionStore } from "../lib/store";

const Queuer = () => {
  const inputRef = useRef(null);
  const sessionId = useSessionStore((s) => s.session.id);

  return (
    <div className="border focus-within:border-primary rounded transition-all">
      <input
        type="text"
        placeholder="Enter a youtube url"
        ref={inputRef}
        className="peer border-none active:outline-none focus:outline-none px-2 focus:placeholder:opacity-0"
      />
      <button
        onClick={() => handleQueueAdd(inputRef.current.value, sessionId)}
        className="p-2 bg-dim/50 peer-focus:bg-primary focus:bg-primary transition-all"
      >
        Queue
      </button>
    </div>
  );
};

export default Queuer;
