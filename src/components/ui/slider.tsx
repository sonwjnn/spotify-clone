'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge'

type SliderProps = {
  value?: number
  maxValue?: number
  step?: number
  onChange?: (value: number) => void
  onMouseUp?: (value: number) => void
  className?: string
}

export const Slider = ({
  className,
  value = 0,
  maxValue = 100,
  step = 1,
  onChange,
  onMouseUp,
}: SliderProps) => {
  const handleMouseUp = (newValue: number[]): void => {
    onMouseUp?.(newValue[0] as number)
  }
  const handleChange = (newValue: number[]): void => {
    onChange?.(newValue[0] as number)
  }

  return (
    <SliderPrimitive.Root
      className={twMerge(
        'group  relative flex h-10 w-full cursor-pointer touch-none select-none items-center',
        className
      )}
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      onValueCommit={handleMouseUp}
      max={maxValue}
      step={step}
    >
      <SliderPrimitive.Track className="relative  h-[3px] grow rounded-full bg-neutral-600">
        <SliderPrimitive.Range className="absolute h-full  rounded-full bg-green-500 group-hover:bg-green-500 dark:bg-white"></SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="absolute right-[-7px] h-3 w-3 translate-y-[-50%] scale-0 rounded-[10px] bg-green-500 transition  focus:outline-none group-hover:scale-100 dark:bg-white " />
    </SliderPrimitive.Root>
  )
}
