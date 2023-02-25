import { useEffect, useState } from "react";
import useSessionStore, { logout } from "@/stores/session-store";
import { useParams } from "react-router-dom";
import UsernameModal from "@/components/UsernameModal";

const Listen = () => {
  const { sessionId } = useParams();

  const username = useSessionStore((s) => s.username);
  const isLogin = useSessionStore((s) => s.isLogin);
  const [isOpen, setIsOpen] = useState(!isLogin);

  useEffect(() => {
    setIsOpen(!isLogin);
  }, [isLogin]);

  return (
    <div>
      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>{sessionId}</div>
      <div>{username}</div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Listen;
