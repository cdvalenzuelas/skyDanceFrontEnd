'use client'

// Libs
import { type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Divider, CardHeader, CardBody, CardFooter, Button, Checkbox, Input } from '@nextui-org/react'

// Componets
import style from './styles.module.css'
import logo from './google.png'

export const Login = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Ingresar con google
  const handleSignIn = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/auth/callback'
        }
      })
      router.push('/')
    } catch (error) {
      console.log('No se pudo iniciar seción')
    }
  }

  return (
    <div className={`${style.cardContainer}`}>
      <div className={`${style.container}`}>
        <Card className={`${style.card}`}>

          <CardHeader className='mb-5'>
            <img src='/logo.png' alt='imagen' width={'50px'} />
            <h2>SKY DANCE</h2>
          </CardHeader>

          <Divider />

          <CardBody className='py-5 flex flex-col. gap-5'>
            <h1>Registrate de forma gratuita</h1>

            <Input
              type="text"
              label="Perfil de Instagram"
              placeholder="Indica tu perfil de Instagram"
              name='estudiantes'
            />

            <Input
              type='phone'
              label="Celular"
              placeholder="Indica tu Numero de Celular"
              name='estudiantes'
            />

            <Button
              onClick={handleSignIn}
              color='primary'
              variant='bordered'
              size='sm'
            >
              <img src={logo.src} alt='imagen' width={'20px'} />
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
