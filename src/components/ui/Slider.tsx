'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  value?: number
  maxValue?: number
  step?: number
  onChange?: (value: number) => void
  onMouseUp?: (value: number) => void
  className?: string
}

const Slider: React.FC<SliderProps> = ({
  className,
  value = 0,
  maxValue = 100,
  step = 1,
  onChange,
  onMouseUp,
}) => {
  const handleMouseUp = (newValue: number[]): void => {
    onMouseUp?.(newValue[0] as number)
  }
  const handleChange = (newValue: number[]): void => {
    onChange?.(newValue[0] as number)
  }

  return (
    <SliderPrimitive.Root
      className={twMerge(
        'group  relative flex items-center select-none cursor-pointer touch-none w-full h-10',
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
        <SliderPrimitive.Range className="absolute h-full  rounded-full bg-white group-hover:bg-[#22c55e]"></SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="absolute right-[-7px] h-3 w-3 translate-y-[-50%] scale-0 rounded-[10px] bg-white  transition focus:outline-none group-hover:scale-100 " />
    </SliderPrimitive.Root>
  )
}

export default Slider
