import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  className?: string
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
  className,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-900/90 backdrop-blur-sm" />
        <Dialog.Content
          className={twMerge(
            `max-h-ful fixed left-[50%] top-[50%] z-[60] h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-xl border border-neutral-700 bg-primary p-[25px] drop-shadow-sm focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]`,
            className
          )}
        >
          <Dialog.Title className="mb-4 text-center text-xl font-bold text-white">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center text-sm leading-normal text-white">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800 hover:text-white focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
