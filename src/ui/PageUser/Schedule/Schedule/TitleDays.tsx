const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']

export const TitleDays = () => {
  return <>
    {days.map(day => <div key={day}>{day}</div>)}
  </>
}
