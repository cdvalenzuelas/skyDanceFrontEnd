'use client'

// Lib
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react'

// Componets | state | types
import { Hero } from '@/ui/Pages/Home/Hero'
import { Classes } from '@/ui/Pages/Home/Classes'
import styles from './styles.module.css'

export interface Props {
  title: string
  content: string
  buttonText: string
}

export default function Home() {
  return (
    <>
      <Hero />
      <main className='h-screen w-screen bg-slate-100'>

        <div className={`${styles.gridContainer}`}>

          <Classes />

          <Card className={`${styles.imagenReescalada}`}>
            <div className={`${styles.container}`} >
              <CardHeader>Aprende de los Mejores</CardHeader>
              <CardBody>
                <p>Conoce a los mejores profes de la ciudad, están aquí para que que disfrutes cada clase al máximo, que aprendas más fácil.
                </p>
              </CardBody>
              <CardFooter>
                <Button>Conoce a nuestros profes</Button>
              </CardFooter>
            </div>
          </Card>

          <Card className={`${styles.imagenReescalada}`}>
            <div className={`${styles.container}`} >
              <CardHeader>Horario</CardHeader>
              <CardBody>
                <p>Tenemos un horario especialmente diseñado para ti a lo largo de la semana, contamos con clases toda la semana, incluyendo en las mañanas y los fines de semana.
                </p>
              </CardBody>
              <CardFooter>
                <Button>Prográmate</Button>
              </CardFooter>
            </div>
          </Card>

          <Card className={`${styles.imagenReescalada}`}>
            <div className={`${styles.container}`} >
              <CardHeader>Planes</CardHeader>
              <CardBody>
                <p>Descubre la gran variedad de planes que tenemos para to, los puedes tomar a tu gusto, según tu disponibilidad y presupuesto.
                </p>
              </CardBody>
              <CardFooter>
                <Button>Apúntate</Button>
              </CardFooter>
            </div>
          </Card>

          <Card className={`${styles.imagenReescalada}`}>
            <div className={`${styles.container}`} >
              <CardHeader>Eventos</CardHeader>
              <CardBody>
                <p>Nuestra academia de baile tiene el gusto de invitarte a eventos increibles con los mejores profes de cada especialidad para que aprendas en tiempo relámpago, te especialices, conozcas nuevos ritmos o símplemente para que te pongas a prueba con nuevos retos..
                </p>
              </CardBody>
              <CardFooter>
                <Button>Conoce Nuestros eventos</Button>
              </CardFooter>
            </div>
          </Card>
        </div>

      </main>
    </>
  )
}
