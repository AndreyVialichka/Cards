import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PackType } from '../packs.api';


type PacksTablePropsType = {
    cards: Array<PackType>,
    removePackHandler: (id:string) => void,
    updatePackHandler: (pack:PackType) => void,
    navigateToCardsPageHandler: (id:string) => void

}

export default function PacksTable(props:PacksTablePropsType) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.map((card) =>{ 
            return <TableRow
              key={card._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.name}
              </TableCell>
              <TableCell align="right">{card.cardsCount}</TableCell>
              <TableCell align="right">{card.updated}</TableCell>
              <TableCell align="right">{card.user_name}</TableCell>              
              <TableCell align="right">
                <button onClick={() => props.removePackHandler(card._id)}>remove</button>
                <button onClick={() => props.updatePackHandler(card)}>update</button>
                <button onClick={() => props.navigateToCardsPageHandler(card._id)}>на страницу карточек</button>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}