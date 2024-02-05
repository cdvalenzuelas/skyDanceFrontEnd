import styles from './styles.module.css'

interface Props {
  color?: string
}

export const ClassIcon = ({ color = '#fff' }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.buttonIcon} strokeWidth={1.5}>
    <title>{'ic_fluent_class_24_regular'}</title>
    <path
      fill={color}
      fillRule="nonzero"
      d="M17.25 2A2.75 2.75 0 0 1 20 4.75V19.25a2.75 2.75 0 0 1-2.75 2.75H6.75A2.75 2.75 0 0 1 4 19.249V4.75c0-1.26.846-2.32 2-2.647V3.75c-.304.228-.5.59-.5 1v14.498c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25L15 3.5V2h2.25ZM14 2v8.139c0 .747-.8 1.028-1.29.764l-.082-.052-2.126-1.285-2.078 1.251c-.5.36-1.33.14-1.417-.558L7 10.14V2h7Zm-1.5 1.5h-4v5.523l1.573-.949a.923.923 0 0 1 .818-.024l1.609.974V3.5Z"
    />
  </svg>
)
