import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardType } from 'features/cards/service/cards.api.types';


type BasicTablePropsType = {
    cards: Array<CardType> | undefined,
    removeCardHandler: (card:CardType) => void,
    updateCardHandler: (card:CardType) => void,
}

export default function BasicTable(props:BasicTablePropsType) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards && props.cards.map((card) => (
            <TableRow
              key={card.question}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell align="right">{card.answer}</TableCell>
              <TableCell align="right">{card.updated}</TableCell>
              <TableCell align="right">{card.rating}</TableCell>              
              <TableCell align="right">
                <button onClick={() => props.removeCardHandler(card)}>remove</button>
                <button onClick={() => props.updateCardHandler(card)}>update</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}