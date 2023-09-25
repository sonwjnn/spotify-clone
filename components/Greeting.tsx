'use client'

import { memo, useEffect, useMemo, useState } from 'react'

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = () => {
	const [currentHour, setCurrentHour] = useState(new Date().getHours())

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentHour(new Date().getHours())
		}, 1000 * 60)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	const greeting = useMemo(() => {
		if (5 <= currentHour && currentHour <= 11) return 'Good morning'
		if (12 <= currentHour && currentHour <= 17) return 'Good afternoon'
		return 'Good evening'
	}, [currentHour])

	return (
		<h1 className='text-white text-3xl font-semibold'>
			<p>{greeting}</p>
		</h1>
	)
}

export default memo(Greeting)
