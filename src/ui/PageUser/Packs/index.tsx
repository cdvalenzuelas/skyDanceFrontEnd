// Lib
import { useEffect } from 'react'

// Componets
import { usePacksState } from '@state'
import { getPacks } from '@api'

export const Packs = () => {
  const setPacks = usePacksState(state => state.setPacks)

  useEffect(() => {
    (async () => {
      const packs = await getPacks()

      setPacks(packs)
    })()
  }, [])

  return (<div>

  </div>)
}
