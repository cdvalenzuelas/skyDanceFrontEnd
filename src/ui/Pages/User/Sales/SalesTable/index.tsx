import { useSalesState } from '@state'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

export const SalesTable = () => {
  const sales = useSalesState(state => state.sales)

  return (<Table selectionMode='single' color='primary' aria-label='Tala de ventas'>
    <TableHeader>
      <TableColumn>Usuario</TableColumn>
      <TableColumn>Plan</TableColumn>
      <TableColumn>Precio</TableColumn>
      <TableColumn>Descuento</TableColumn>
      <TableColumn>Decripción del descuento</TableColumn>
      <TableColumn>Precio Final</TableColumn>
      <TableColumn>Método de Pago</TableColumn>
      <TableColumn>Clases</TableColumn>
      <TableColumn>Fecha de compra</TableColumn>
      <TableColumn>Fecha de Inicio</TableColumn>
      <TableColumn>Fecha de Finalizacion</TableColumn>
    </TableHeader>
    <TableBody emptyContent='No se han cargado los datos'>

      {
        sales.map(sale => <TableRow key={sale.id}>
          <TableCell>{sale.user_id}</TableCell>
          <TableCell>{sale.name}</TableCell>
          <TableCell>{sale.price}</TableCell>
          <TableCell>{sale.discount}</TableCell>
          <TableCell>{sale.discount_description}</TableCell>
          <TableCell>{sale.total_price}</TableCell>
          <TableCell>{sale.payment_mode}</TableCell>
          <TableCell>{sale.taken_classes}{sale.classes === -1 ? ' /  ∞' : ` / ${sale.classes}`}</TableCell>
          <TableCell>{sale.sale_date.getDate()}/{sale.sale_date.getMonth() + 1}/{sale.sale_date.getFullYear()}</TableCell>
          <TableCell>{sale.start_date.getDate()}/{sale.start_date.getMonth() + 1}/{sale.start_date.getFullYear()}</TableCell>
          <TableCell>{sale.end_date.getDate()}/{sale.end_date.getMonth() + 1}/{sale.end_date.getFullYear()}</TableCell>
        </TableRow>
        )
      }

      {/* <TableRow>
        <TableCell>Totals</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{sales.reduce((accumulate, current) => current.price + accumulate, 0)}</TableCell>
        <TableCell>{sales.reduce((accumulate, current) => current.discount + accumulate, 0)}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{sales.reduce((accumulate, current) => current.totalPrice + accumulate, 0)}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
        <TableCell>{''}</TableCell>
      </TableRow> */}

    </TableBody>
  </Table>)
}
