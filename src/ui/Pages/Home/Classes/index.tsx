// Lib
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react'
import { useState, type MouseEvent } from 'react'

// Componets
import styles from './styles.module.css'

type ClassStage = 'init' | 'salsa' | 'bachata' | 'mas' | 'dancehall'

export const Classes = () => {
  const [stage, setStage] = useState<ClassStage>('init')

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as ClassStage

    setStage(value)
  }

  return (
    <Card className={`${styles.Card}`}>
      <div className={`${styles.CardBody}`} >

        <div>

          <CardHeader>
            <h1>Clases</h1>
          </CardHeader>

          <CardBody>
            {stage === 'init' && <p>
              🎉 ¡Ven y vive la experiencia única de nuestras clases de baile en Sky Dance! 🕺💃 Aquí encontrarás un mundo lleno de ritmo y pasión, donde cada paso de baile es una aventura. Nuestra oferta incluye una diversidad de estilos para que explores
            </p>}
            {stage === 'salsa' && <p>
              Sumérgete en el vibrante mundo de la salsa. Desde el estilo clásico hasta los ritmos modernos, nuestras clases están diseñadas para todos los niveles. Aprenderás desde los pasos básicos hasta las combinaciones más complejas, todo en un ambiente lleno de energía y alegría.
            </p>}
            {stage === 'bachata' && <p>
              Deja que la sensualidad de la bachata te envuelva. Con nuestras clases, podrás dominar este ritmo romántico y apasionado, aprendiendo a expresar cada nota a través de tu movimiento.
            </p>}
            {stage === 'dancehall' && <p>
              Si lo tuyo es la música urbana, nuestras clases de Dancehall son perfectas para ti. Sumérgete en este estilo dinámico y lleno de energía, ideal para quienes buscan una experiencia de baile más intensa y moderna.
            </p>}
            {stage === 'mas' && <p>
              En Sky Dance, nos enfocamos en enseñar no solo los pasos de baile, sino también la técnica, la expresión y la conexión con la música. Nuestras clases están disponibles para todos los niveles, desde principiantes hasta avanzados, asegurándonos de que cada alumno encuentre el espacio adecuado para su crecimiento y disfrute.
            </p>}
          </CardBody>

        </div>

        <CardFooter>
          <div className='flex gap-2'>
            <Button color='primary' radius='md' variant={stage === 'salsa' ? 'solid' : 'ghost'} onClick={handleClick} value='salsa'>Salsa</Button>
            <Button color='primary' radius='md' variant={stage === 'bachata' ? 'solid' : 'ghost'} onClick={handleClick} value='bachata'>Bachata</Button>
            <Button color='primary' radius='md' variant={stage === 'dancehall' ? 'solid' : 'ghost'} onClick={handleClick} value='dancehall'>DanceHall</Button>
            <Button color='primary' radius='md' variant={stage === 'mas' ? 'solid' : 'ghost'} onClick={handleClick} value='mas'>Ver Más</Button>
          </div>
        </CardFooter>

      </div>
    </Card>
  )
}
