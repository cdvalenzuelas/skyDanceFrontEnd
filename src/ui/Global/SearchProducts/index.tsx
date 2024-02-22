import { type Product, useProductsState } from '@state'
import { Input, Button, Card, Divider } from '@nextui-org/react'
import { useState, type ChangeEvent, type MouseEvent, type FC, useEffect } from 'react'
import styles from './styles.module.css'
import { formatCurency } from '@/utils/currency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

interface Summary {
  produc_id: string
  quantity: number
  price: number
  total: number
  profit: number
  total_profit: number
}

interface Props {
  getSummary?: (summary: Summary[]) => void
}

export const SearchProducts: FC<Props> = ({ getSummary }) => {
  const products = useProductsState(state => state.products)

  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    if (getSummary !== undefined) {
      getSummary(summary)
    }
  }, [summary])

  // Botones de búsqueda usuarios y estilo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearch(value)

    if (value.length > 3) {
      // Filtrar bien la busqueda
      const internalProducts = products.filter(product => product.quantity > 0 && product.name.toLowerCase().includes(value.toLowerCase()))
      setSearchResults(internalProducts)
    } else {
      setSearchResults([])
    }
  }

  // Manejar el agregar y eliminar usuarios
  const handleProduct = (e: MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.value

    const selectedProduct = products.filter(product => product.id === productId)[0]
    const newSearchResults = searchResults.filter(seachResult => seachResult.id !== selectedProduct.id)

    setSearchResults(newSearchResults)

    if (newSearchResults.length === 0) {
      setSearch('')
    }

    const newSelectedProducts = [...selectedProducts, selectedProduct]

    const internalSummary: Summary[] = newSelectedProducts.map(item => {
      return {
        produc_id: item.id,
        quantity: 1,
        price: item.selling_price,
        total: item.selling_price,
        profit: item.profit,
        total_profit: item.profit
      }
    })

    setSummary(internalSummary)
    setSelectedProducts(newSelectedProducts)
  }

  // Manejar el agregar y eliminar usuarios
  const handleIncreaseDecrease = (e: MouseEvent<HTMLButtonElement>, producId: string) => {
    const name = e.currentTarget.name as 'more' | 'less'

    const filteredsummary = summary.filter(item => item.produc_id === producId)[0]
    const notFilteredsummary = summary.filter(item => item.produc_id !== producId)

    let internalQuantity = filteredsummary.quantity

    if (name === 'more') {
      internalQuantity = internalQuantity + 1
    } else {
      internalQuantity = internalQuantity - 1
    }

    filteredsummary.quantity = internalQuantity
    filteredsummary.total = internalQuantity * filteredsummary.price
    filteredsummary.total_profit = internalQuantity * filteredsummary.profit

    setSummary([...notFilteredsummary, filteredsummary])
  }

  return (<div className='relative'>

    <Input
      color='secondary'
      variant='bordered'
      type="text"
      label="Productos"
      placeholder="Agregar Productos"
      className='relavite'
      name='estudiantes'
      autoComplete='off'
      onChange={handleChange}
      value={search} />

    {searchResults.length > 0 && <Card className={styles.searchContainer}>
      {searchResults.map(product => <Button
        key={product.id}
        value={product.id}
        variant='flat'
        size='sm'
        className='h-12 flex items-center justify-between px-5 gap-3'
        color='success'
        onClick={handleProduct}>
        <span>{product.name}</span>
        <span>$ {formatCurency(product.selling_price)}</span>
      </Button>)}
    </Card>}

    {selectedProducts.map(product => {
      const { quantity } = summary.filter(item => item.produc_id === product.id)[0]

      return <div
        key={product.id}
        className='flex py-1 px-1 h-10 mt-3'>
        <div className='flex flex-row items-center justify-between align-middle py-1 w-full'>
          <div className='flex gap-2 items-center'>
            <Button
              isIconOnly
              size='sm'
              color='secondary'
              radius='full'
              name='more'
              onClick={e => { handleIncreaseDecrease(e, product.id) }}
              isDisabled={quantity === product.quantity}
              startContent={<FontAwesomeIcon icon={faPlus} />}
            />
            <span>{quantity}</span>
            <Button
              isIconOnly
              size='sm'
              color='secondary'
              radius='full'
              name='less'
              onClick={e => { handleIncreaseDecrease(e, product.id) }}
              isDisabled={quantity === 0}
              startContent={<FontAwesomeIcon icon={faMinus} />}
            />
            <span>{product.name}</span>
          </div>
          <span>({quantity} x $ {formatCurency(product.selling_price)}) ${formatCurency(product.selling_price * quantity)}</span>
        </div>
      </div>
    })}

    {selectedProducts.length > 0 && <Divider />}

  </div>)
}
