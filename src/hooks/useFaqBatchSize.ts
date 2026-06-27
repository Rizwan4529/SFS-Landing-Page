import { useEffect, useState } from 'react'

const DESKTOP_QUERY = '(min-width: 1024px)'
export const FAQ_DESKTOP_BATCH = 10
export const FAQ_MOBILE_BATCH = 5

export function useFaqBatchSize() {
  const [batchSize, setBatchSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
      ? FAQ_DESKTOP_BATCH
      : FAQ_MOBILE_BATCH,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY)

    function syncBatchSize() {
      setBatchSize(mediaQuery.matches ? FAQ_DESKTOP_BATCH : FAQ_MOBILE_BATCH)
    }

    syncBatchSize()
    mediaQuery.addEventListener('change', syncBatchSize)
    return () => mediaQuery.removeEventListener('change', syncBatchSize)
  }, [])

  return batchSize
}
