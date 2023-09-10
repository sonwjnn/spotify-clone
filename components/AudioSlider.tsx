'use client'
import * as RadixSlider from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
	value?: number
	maxValue?: number
	onChange?: (value: number) => void
	className?: string
}

const Slider: React.FC<SliderProps> = (
	{ className, value = 0, maxValue = 100, onChange },
) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className={twMerge(
				'group relative flex items-center select-none cursor-pointer touch-none w-full h-10',
				className,
			)}
			defaultValue={[0]}
			value={[value]}
			onValueChange={handleChange}
			max={[maxValue]}
			step={1}
			arial-label='Volume'
		>
			<RadixSlider.Track className='bg-neutral-600  relative rounded-full grow h-[3px]'>
				<RadixSlider.Range className='absolute bg-white group-hover:bg-[#22c55e] rounded-full h-full'>
				</RadixSlider.Range>
			</RadixSlider.Track>
		</RadixSlider.Root>
	)
}

export default Slider
