// Lib
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Divider, CardFooter, Button, Chip } from '@nextui-org/react'
// Componets
import { usePacksState, type Pack } from '@state'
import { getPacks } from '@api'
import styles from './style.module.css'

export const PacksTable = () => {
  const [monthPacks, setMonthPacks] = useState<Pack[]>([])
  const setPacks = usePacksState(state => state.setPacks)
  // const packs = usePacksState(state => state.packs)

  useEffect(() => {
    (async () => {
      const packs = await getPacks()

      const newMonthPacks = packs.filter(item => item.period === 'month' && item.classes !== -1)

      setMonthPacks(newMonthPacks.sort((a, b) => a.classes - b.classes))
      setPacks(packs)
    })()
  }, [])

  return (<div className={styles.container}>

    <Card className={styles.card}>

      <CardHeader style={{ color: 'var(--blue1)' }} className='flex flex-col gap-2 items-start'>
        <h2>Planes Mensuales</h2>

        <p>
          ¡Eleva tu pasión por el baile con nuestros planes mensuales! Explora estilos como Salsa, Bachata, y más, con flexibilidad de horarios y acceso a eventos especiales. Únete a nuestra comunidad y transforma tu energía en arte.
        </p>
      </CardHeader>

      <Divider />

      <CardBody className='flex flex-col gap-5 py-3'>
        {monthPacks.map(pack => <div key={pack.id} className='flex flex-col items-start justify-between gap-2' style={{ color: 'var(--gray2)' }}>

          <Chip size='md' color='primary' variant='flat'>Plan: {pack.name}</Chip>

          <div className='flex items-center justify-between w-full'>
            <span className={styles.price} style={{ color: 'var(--blue2)' }}>
              $ {pack.price}<span className={styles.month}> / Mes</span>
            </span>
            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{pack.classes} Clases</span>
          </div>

        </div>)}
      </CardBody>

      <CardFooter>
        <Button className='w-full' radius='sm' color='secondary'>Solicitar</Button>
      </CardFooter>

    </Card>

  </div>)
}
