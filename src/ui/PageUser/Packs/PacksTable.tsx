// Lib
import { useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
// Componets
import { type PackPeriod, usePacksState } from '@state'
import { getPacks } from '@api'

const preiods: Record<PackPeriod, string> = {
  day: 'Día',
  month: 'Mes',
  week: 'Semana',
  year: 'Año'
} as const

const plural = (duration: number, period: string) => {
  if (duration > 1) {
    const newPeriod = period[period.length - 1] === 's' ? period + 'es' : period + 's'
    return newPeriod
  }

  return period
}

export const PacksTable = () => {
  const setPacks = usePacksState(state => state.setPacks)
  const packs = usePacksState(state => state.packs)

  useEffect(() => {
    (async () => {
      const packs = await getPacks()

      setPacks(packs)
    })()
  }, [])

  return (<Table aria-label="Example static collection table" selectionMode='single' color='primary'>
    <TableHeader>
      <TableColumn>Nombre</TableColumn>
      <TableColumn>Precio</TableColumn>
      <TableColumn>N° Clases</TableColumn>
      <TableColumn>Duración</TableColumn>
      <TableColumn>Compensación por Festivos</TableColumn>
    </TableHeader>
    <TableBody emptyContent='No se han cargado los datos'>
      {packs.map(pack => <TableRow key={pack.id}>
        <TableCell>{pack.name}</TableCell>
        <TableCell>{pack.price}</TableCell>
        <TableCell>{pack.classes === 0 ? 'Ilimitadas' : pack.classes} / {preiods[pack.period]}</TableCell>
        <TableCell>{pack.duration} {plural(pack.duration, preiods[pack.period])}</TableCell>
        <TableCell>{pack.holidays ? 'Si' : 'No'}</TableCell>
      </TableRow>
      )}
    </TableBody>
  </Table>)
}
