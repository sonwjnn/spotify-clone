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
  const handleMouseUp = (newValue: number[]) => {
    onMouseUp?.(newValue[0])
  }
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
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
      <SliderPrimitive.Track className="bg-neutral-600  relative rounded-full grow h-[3px]">
        <SliderPrimitive.Range className="absolute bg-white  group-hover:bg-[#22c55e] rounded-full h-full"></SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="absolute right-[-7px]  translate-y-[-50%] w-3 h-3 bg-white scale-0 transition group-hover:scale-100  rounded-[10px] hover:bg-violet3 focus:outline-none " />
    </SliderPrimitive.Root>
  )
}

export default Slider
