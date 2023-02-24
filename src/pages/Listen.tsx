import { useEffect, useState } from "react";
import useSessionStore from "@/stores/session-store";
import { useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";
import UsernameModal from "@/components/UsernameModal";

const Listen = () => {
  const { sessionId } = useParams();
  const [username] = useSessionStore((s) => [s.username], shallow);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {}, [username]);

  return (
    <div>
      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>{sessionId}</div>
      <button onClick={() => setIsOpen(!isOpen)}>Button</button>
    </div>
  );
};

export default Listen;
