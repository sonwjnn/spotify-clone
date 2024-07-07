type DurationSongParams = {
  milliseconds?: number
  type?: 'short' | 'long'
}

const getDurationSong = (params: Partial<DurationSongParams>): string => {
  const { milliseconds, type = 'short' } = params
  if (!milliseconds && milliseconds !== 0) return ''
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = `${`0${Math.floor((totalSeconds % 3600) / 60)}`.slice(-2)}`
  const seconds = `${`0${totalSeconds % 60}`.slice(-2)}`

  if (type === 'short') {
    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`
    }

    return `${minutes}:${seconds}`
  }
  if (hours > 0) {
    return `${hours} hours ${minutes} min ${seconds} sec`
  }

  return `${minutes} min ${seconds} sec`
}

export { getDurationSong }
