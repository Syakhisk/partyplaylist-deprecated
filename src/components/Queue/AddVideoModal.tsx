import { Dispatch, SetStateAction, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { urlOrTitleSchema } from "@/lib/schemas";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { InferType } from "yup";
import { getMetadataFromUrl, isValidYoutubeUrl } from "@/services/youtube";
import { UseFormReturn } from "react-hook-form";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddVideoModal = ({ isOpen, setIsOpen }: Props) => {
  const handleSubmit = async (
    data: InferType<typeof urlOrTitleSchema>,
    methods: UseFormReturn
  ) => {
    const { query } = data;

    if (!isValidYoutubeUrl(query)) {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`
      );
      methods.setValue("query", "");
      return;
    }

    const meta = await getMetadataFromUrl(data.query);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded bg-backdrop p-4 border">
          <Form onSubmit={handleSubmit} yupSchema={urlOrTitleSchema}>
            <Input
              id="query"
              name="query"
              label="Enter a youtube url or a title"
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

export default AddVideoModal;
