import { useEffect } from 'react'

export const useClickOutside = (ref: any, callback: () => void): void => {
  useEffect(() => {
    function handleClickOutside(event: any): void {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
