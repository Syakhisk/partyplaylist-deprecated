import { useEffect, useState } from "react";
import useSessionStore from "@/stores/session-store";
import { useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { Dialog } from "@headlessui/react";

const Listen = () => {
  const { sessionId } = useParams();
  const [username] = useSessionStore((s) => [s.username], shallow);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {}, [username]);

  return (
    <div>
      <div>{sessionId}</div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white text-black">
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Listen;
