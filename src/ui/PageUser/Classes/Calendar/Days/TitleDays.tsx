const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']

export const TitleDays = () => {
  return <>
    {days.map(day => <div key={day} className="outline outline-1 outline-red-500">{day}</div>)}
  </>
}
