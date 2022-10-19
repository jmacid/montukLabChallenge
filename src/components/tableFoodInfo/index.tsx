import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function createData(
  name: string,
  min: number,
  max: number,
  median: number,
  amount: number,
  unit_name: string,
  nutrientId: number
) {
  return { name, min, max, median, amount, unit_name, nutrientId };
}

export const TableFoodInfo: React.FC<TableFoodInfoProps> = ({foodInfo}) => {

  const rows = foodInfo.map( info => createData(info.nutrientName, info.min, info.max, info.median, info.amount, info.unit_name, info.nutrientId));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Nutrient</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Max</TableCell>
            <TableCell align="right">Median</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nutrientId}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.max}</TableCell>
              <TableCell align="right">{row.median}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.unit_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
