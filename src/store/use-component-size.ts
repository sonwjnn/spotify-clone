import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

type ComponentSize = {
  height: number
  width: number
}

export const useComponentSize = (
  ref: RefObject<HTMLElement>
): ComponentSize => {
  const [componentSize, setComponentSize] = useState<ComponentSize>({
    width: -1,
    height: -1,
  })

  useEffect(() => {
    const handleResize = (): void => {
      if (ref.current) {
        const { clientHeight, clientWidth } = ref.current
        setComponentSize({ height: clientHeight, width: clientWidth })
      }
    }

    handleResize() // Initial size

    let observerRefValue: typeof ref.current = null
    const observer = new ResizeObserver(handleResize)
    if (ref.current) {
      observer.observe(ref.current)
      observerRefValue = ref.current
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [ref, ref.current?.clientHeight, ref.current?.clientWidth])

  return componentSize
}
