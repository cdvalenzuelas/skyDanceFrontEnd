import { type FC } from 'react'

interface Props {
  startDay: number
}

export const VoidDays: FC<Props> = ({ startDay }) => {
  return <>
    {Array.from({ length: startDay }, (_, i) => (
      <div key={i}>{' '}</div>
    ))}
  </>
}
