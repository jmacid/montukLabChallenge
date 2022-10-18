import React, { useState, useEffect } from "react"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

type SelectBarProps = {
  title: string;
  asyncFunc: Function;
  loadingComponent: JSX.Element;
}

export const SelectBar: React.FC<SelectBarProps> = ({title, asyncFunc, loadingComponent}) => {
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const asyncFuncHandler = async () => {
    const res = await asyncFunc();
    console.log(res);
    
    setMenuItems(res);
    setLoading(false);
  }

  useEffect( () => {
    asyncFuncHandler()
  })

  return (
    loading ?
    <Box margin='2em auto'>
      {loadingComponent}
    </Box>
    : (
      <Box sx={{ minWidth: 120, margin: '2em 2em' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label={title}
            onChange={handleChange}
          >
          {
            menuItems.length > 0 && 
            menuItems.map( (item) => (
              <MenuItem key={item.nutrientId} value={item.nutrientId}>{item.name}</MenuItem>
          ))
          }
          </Select>
        </FormControl>
      </Box>
    )
  );
}
