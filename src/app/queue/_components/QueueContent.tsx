'use client'

import Button from '@/components/ui/Button'
import MediaItem from '@/components/MediaItem'
import MediaList from '@/components/MediaList'
import usePlayer from '@/stores/usePlayer'
import Link from 'next/link'

interface QueueContentProps {}

const QueueContent: React.FC<QueueContentProps> = () => {
  const { queue, currentTrack, currentTrackIndex, isRandom } = usePlayer()

  if (queue.length === 0 || !currentTrack) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    )
  }

  const queueNormalized = queue.filter(item => item)

  return (
    <div className="h-full overflow-hidden pb-8 relative">
      {queueNormalized.length !== 0 ? (
        <>
          <div className="font-bold text-base text-neutral-400 m-0 mb-1 p-6 pt-0">
            Now playing
          </div>
          <div className="px-6 pb-2">
            <MediaItem song={currentTrack} isActived index={1} />
          </div>
          {queue?.filter(item => item)?.length > 1 && (
            <div className="">
              <div className="p-6 mt-10 font-bold text-base text-neutral-400">
                Next
              </div>
              <MediaList
                type="queue"
                inclHeader={false}
                songs={
                  isRandom
                    ? queueNormalized.filter(
                        track => track?.id !== currentTrack?.id
                      )
                    : queueNormalized.slice(currentTrackIndex + 1)
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] min-h-[300px] flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold space-[-2px] mt-1 mb-4 ">
            No Queue Tracks
          </h2>
          <p className="text-base text-neutral-400 mb-10">
            You have no queue, please add queue to see.
          </p>
          <Link href={'/'}>
            <Button className="bg-white text-black px-8 py-3 mb-9">Home</Button>
          </Link>
          <a
            className="text-base text-white block font-bold no-underline hover:underline"
            href="https://www.facebook.com/profile.php?id=100011436148089"
            target="_blank"
          >
            Help
          </a>
        </div>
      )}
    </div>
  )
}

export default QueueContent
