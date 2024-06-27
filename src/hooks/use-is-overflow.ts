import { useLayoutEffect, useState } from 'react'

import { useComponentSize } from '@/store/use-component-size'

export const useIsOverflow = (
  ref: any,
  callback?: (hasOverflow: boolean) => void
): boolean => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false)
  const size = useComponentSize(ref)

  useLayoutEffect(() => {
    const { current } = ref

    const trigger = (): void => {
      const hasOverflow =
        current.offsetHeight < current.scrollHeight ||
        current.offsetWidth < current.scrollWidth

      setIsOverflow(hasOverflow)

      if (callback) callback(hasOverflow)
    }

    if (current) {
      // console.log(current.scrollHeight, current.clientHeight)
      trigger()
    }
  }, [callback, ref, size.width])

  return isOverflow
}
