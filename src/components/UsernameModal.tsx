import { Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import { login, setSession } from "@/stores/session-store";
import { usernameSchema } from "@/lib/schemas";
import Form from "./Form";
import Input from "./Input";
import { InferType } from "yup";
import { getHash } from "@/lib/hash";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createSession } from "@/services/firestore/session";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const UsernameModal = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate()
  const handleSubmit = async (data: InferType<typeof usernameSchema>) => {
    const hashNumber = await getHash(data.username)
    if (hashNumber === -1) {
      toast.error("already have an id, please input another name")
      return
    }
    await createSession(hashNumber.toString(), data.username)
    setSession({
      id: hashNumber.toString()
    }) 
    login(data.username);
    setIsOpen(false);
    navigate(`/listen/${hashNumber}`)
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-backdrop p-4 border">
          <Form onSubmit={handleSubmit} yupSchema={usernameSchema}>
            <Input
              id="username"
              name="username"
              label="Please enter your name to join the session"
            />

            <button className="bg-red-500 p-2 rounded-sm text-red-100 mt-4">
              Submit
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UsernameModal;
