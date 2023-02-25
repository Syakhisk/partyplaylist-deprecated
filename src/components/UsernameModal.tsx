import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { login } from "@/stores/session-store";
import { usernameSchema } from "@/lib/schemas";
import Form from "./Form";
import Input from "./Input";
import { InferType } from "yup";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const UsernameModal = ({ isOpen, setIsOpen }: Props) => {
  const handleSubmit = async (data: InferType<typeof usernameSchema>) => {
    login(data.username);
    setIsOpen(false);
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
              label="Please enter your name"
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
