import { type ReactNode, type FC } from 'react'
import ReactDOM from 'react-dom'
import { usePortalState } from '@state'

interface Props {
  children: ReactNode
};

export const Portal: FC<Props> = ({ children }) => {
  const showPortal = usePortalState(state => state.showPortal)

  return showPortal === true
    ? ReactDOM.createPortal(children, document.querySelector('#portal') as Element)
    : null
}
