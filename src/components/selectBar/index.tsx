import React, { useState, useEffect } from "react"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

export const SelectBar: React.FC<SelectBarProps> = ({title, asyncFunc, loadingComponent, setSelectedItems}) => {
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<nutrientItem[]>([]);

  const handleChange = async (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    const value = await JSON.parse(event.target.value);
    setSelectedItems( (selectedNutrients: nutrientItem[]) => [...selectedNutrients, value])
  };

  const asyncFuncHandler = async () => {
    function compareName(a: nutrientItem,b: nutrientItem) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }

    const res = await asyncFunc();

    if(!res)
      return

    res.sort( compareName )

    setMenuItems(res);
    setLoading(false);
  }

  useEffect( () => {
    asyncFuncHandler()

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    loading ?
    <Box margin='2em auto'>
      {loadingComponent}
    </Box>
    : (
      <Box sx={{ minWidth: 120, margin: '2em 2em' }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{title}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={selected}
            label={title}
            onChange={handleChange}
          >
          {
            menuItems.length > 0 && 
            menuItems.map( (item) => (
              <MenuItem key={item.nutrientId} value={JSON.stringify({nutrientId: item.nutrientId, name: item.name})}>{item.name}</MenuItem>
          ))
          }
          </Select>
        </FormControl>
      </Box>
    )
  );
}
