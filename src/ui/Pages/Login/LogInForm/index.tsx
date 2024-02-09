'use client'

// Libs
import { type MouseEvent } from 'react'
import { Card, Divider, CardHeader, CardBody, CardFooter, Button, Checkbox } from '@nextui-org/react'

// Componets
import { logIn } from '@api'
import style from './styles.module.css'
import logo from './google.png'

export const LogIn = () => {
  const handleSignIn = async (e: MouseEvent) => {
    const user = logIn()
    console.log(user)
  }

  return (
    <div className={`${style.cardContainer}`}>
      <div className={`${style.container}`}>
        <Card className={`${style.card}`}>

          <CardHeader className='mb-5 flex items-center gap-5'>
            <img src='/logo.png' alt='imagen' width={'50px'} />
            <h1>SKY DANCE</h1>
          </CardHeader>

          <Divider />

          <CardBody className='py-5 flex flex-col. gap-5'>
            <h2>Registrate de forma gratuita</h2>

            <Button
              onClick={handleSignIn}
              color='primary'
              variant='bordered'
              size='md'
            >
              <img src={logo.src} alt='imagen' style={{ height: '1rem' }} />
              INGRESAR
            </Button>
          </CardBody>

          <Divider />

          <CardFooter className='flex flex-col items-start gap-5 justify-center py-5'>
            <Checkbox size='sm'>Acepto los términos y condiciones</Checkbox>
            <span>Registrate y conoce todos los beneficio de pertenecer a esta increible comunidad</span>
          </CardFooter>

        </Card>
      </div>

      <div className={`${style.image}`}>
        <img src='/login/image1.jpg' alt='imagen' />
        {/* <div className="image-overlay">Hola amigos</div> */}
      </div>

    </div>
  )
}
