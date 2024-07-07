'use client'

import Link from 'next/link'

import { MediaItem } from '@/components/media-item'
import { MediaList } from '@/components/media-list'
import { Button } from '@/components/ui/button'
import { usePlayer } from '@/store/use-player'

export const QueueContent = () => {
  const { queue, currentTrack, currentTrackIndex, isRandom } = usePlayer()

  const queueNormalized = queue.filter(item => item)

  return (
    <div className="relative h-full overflow-hidden pb-8">
      {queueNormalized.length !== 0 && currentTrack ? (
        <>
          <div className="m-0 mb-1 p-6 pt-0 text-base font-bold text-neutral-400">
            Now playing
          </div>
          <div className="px-6 pb-2">
            <MediaItem song={currentTrack} isActived index={1} />
          </div>
          {queue?.filter(item => item)?.length > 1 && (
            <div className="">
              <div className="mt-10 p-6 text-base font-bold text-neutral-400">
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
        <div className="flex h-[50vh] min-h-[300px] flex-col items-center justify-center">
          <h2 className=" mb-4 mt-1 text-5xl font-bold ">No Queue Tracks</h2>
          <p className="mb-10 text-base text-neutral-400">
            You have no queue, please add queue to see.
          </p>
          <Link href={'/'}>
            <Button className="mb-9 bg-white px-8 py-3 text-black">Home</Button>
          </Link>
          <a
            className="block text-base font-bold text-white no-underline hover:underline"
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
