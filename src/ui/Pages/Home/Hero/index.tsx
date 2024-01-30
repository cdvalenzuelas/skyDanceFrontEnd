import { Header } from '@/ui/Global/Header'
import { H1 } from '@/ui/Global/Titles/H1'

import styles from './styles.module.css'

export const Hero = () => {
  return (
    <div className={`flex flex-col shadow px-5 py-5 gap-3 ${styles.backgroundColor}`}>
      <Header />
      <div className="flex flex-col items-center">
        <H1>Sky Dance</H1>
        <h2>Convierte cada paso en arte</h2>
        <p className="text-center">En SKY DANCE, Bogotá cobra vida con Salsa, Bachata, Reggaetón y más. 🎶 Únete a nosotros para clases vibrantes, eventos únicos y una comunidad que adora bailar. 🌟</p>
      </div>
    </div>
  )
}
