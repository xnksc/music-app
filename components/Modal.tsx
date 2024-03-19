import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({
  children,
  description,
  isOpen,
  className,
  onChange,
  title,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-800/80 backdrop-blur-sm fixed inset-0 z-10"></Dialog.Overlay>
        <Dialog.Content
          className={twMerge(
            " fixed drop-shadow-sm border-neutral-600 top-[50%] right-[50%] max-h-full  md:h-auto translate-x-[50%] translate-y-[-50%] md:max-h-[85vh] min-w-[400px] md:w-[85vw] md:max-w-[400px]  rounded-xl bg-neutral-700 p-[20px] focus:outline-none ",
            className
          )}
        >
          <Dialog.Title className="text-xl text-center font-bold mb-3">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-center mb-4 text-sm leading-normal ">
            {description}
          </Dialog.Description>
          <Dialog.Description>
            <div className="">{children}</div>
          </Dialog.Description>
          <Dialog.Close>
            <button className="text-neutral-300 hover:text-white absolute top-[10px] right-[10px] h-[20px] w-[20px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none ">
              <MdClose></MdClose>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
