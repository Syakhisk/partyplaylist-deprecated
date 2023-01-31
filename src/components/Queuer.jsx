import { useRef } from "react";
import { handleQueueAdd } from "../lib/handler";
import useSessionStore from "../lib/stores/session-store";

const Queuer = () => {
  const inputRef = useRef(null);
  const sessionId = useSessionStore((s) => s.session.id);

  return (
    <form
      className="border focus-within:border-primary rounded transition-all w-full flex"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Enter a youtube url"
        ref={inputRef}
        required
        className="peer border-none active:outline-none focus:outline-none px-2 focus:placeholder:opacity-0 flex-grow"
      />
      <button
        onClick={() => handleQueueAdd(inputRef.current.value, sessionId)}
        className="p-2 bg-dim/50 peer-focus:bg-primary focus:bg-primary transition-all"
      >
        Queue
      </button>
    </form>
  );
};

export default Queuer;
