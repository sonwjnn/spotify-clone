import { ClockIcon } from '@/public/icons'

export const ListBarLoading = () => {
  return (
    <div
      className={`group z-10 mb-2 grid h-9 w-full  grid-cols-list-5 items-center gap-4 border border-transparent border-b-[hsla(0,0%,100%,0.1)] px-4`}
    >
      <div className="relative text-right text-base text-neutral-400">#</div>
      <div className={`flex items-center gap-4 pr-2`}>
        <div
          className={`flex h-full flex-1 flex-col justify-between gap-[5px] overflow-hidden`}
        >
          <p className="z-10 text-sm text-neutral-400">Title</p>
        </div>
      </div>

      <p className="truncate text-sm text-neutral-400"></p>
      <div className={'text-sm text-neutral-400'}></div>
      <div
        className={`flex translate-x-[-5px] items-center justify-end gap-x-3 text-neutral-400 `}
      >
        <ClockIcon />
      </div>
    </div>
  )
}
