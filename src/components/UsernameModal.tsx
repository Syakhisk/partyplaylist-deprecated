import { Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import { login, setSession } from "@/stores/session-store";
import { usernameSchema } from "@/lib/schemas";
import Form from "./Form";
import Input from "./Input";
import { InferType } from "yup";
import { getHash } from "@/lib/hash";
import { Link, useNavigate } from "react-router-dom";
import { addParticipant, createSession } from "@/services/firestore/session";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sessionId?: string;
};

const UsernameModal = ({ isOpen, setIsOpen, sessionId }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = async (data: InferType<typeof usernameSchema>) => {
    if (typeof sessionId === "undefined") {
      const newSessionId = await getHash();
      await createSession(newSessionId, data.username);
      setSession({
        id: newSessionId,
        host: data.username,
      });
      login(data.username);
      setIsOpen(false);
      navigate(`/listen/${newSessionId}`);
      return;
    }

    login(data.username);
    await addParticipant(sessionId, data.username);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-backdrop p-4 border">
          <Form onSubmit={handleSubmit} yupSchema={usernameSchema}>
            <Input
              id="username"
              name="username"
              label={`Please enter your name to ${
                sessionId ? "join" : "create"
              } the session`}
            />

            <div className="flex justify-between items-center mt-4">
              <button className="bg-red-500 p-2 rounded-sm text-red-100">
                Submit
              </button>

              <Link to="/">Back to home</Link>
            </div>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UsernameModal;
