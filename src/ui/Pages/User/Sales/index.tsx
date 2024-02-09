// Lib
import { type MouseEvent, useState } from 'react'
import { Button, Card, CheckboxGroup, Divider, Checkbox } from '@nextui-org/react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Components
import { NewSaleModal } from './NewSaleModal.tsx'
import { SaleAccordeon } from './SaleAccordeon'
import { SearchUser } from '@/ui/Global/SearchUser'

export const Sales = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<string[]>(['vigente'])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const getUserId = (userId: string | null) => {
    setSelectedUserId(userId)
  }

  // const sales = useSalesState(state => state.sales)
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  }

  return (<>

    <Card className={styles.form}>

      <SearchUser showAllUsers={true} getUserId={getUserId} />

      <CheckboxGroup
        orientation="horizontal"
        color="secondary"
        className='flex justify-between'
        value={filters}
        onValueChange={setFilters}
      >
        <Checkbox value="vigente">vigente</Checkbox>
        <Checkbox value="vencido">vencido</Checkbox>
        <Checkbox value="cortesia">cortesia</Checkbox>
      </CheckboxGroup>

    </Card>

    <Divider />

    <SaleAccordeon filters={filters} selectedUserId={selectedUserId} />

    <Button
      size='lg'
      color='primary'
      className={styles.newSale}
      variant='shadow'
      onClick={handleOpen}
      isIconOnly
      radius='full'
      startContent={<FontAwesomeIcon icon={faPlus} style={{ color: '#fff' }} />}
      name='open' />

    {isOpen && <NewSaleModal
      isOpen={true}
      handleOpen={handleOpen}
      setIsOpen={setIsOpen}
    />}

  </>)
}
