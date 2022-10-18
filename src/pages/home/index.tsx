import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useState } from "react"
import { SelectBar } from "../../components/selectBar"
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export const HomePage: React.FC<{}> = () => {
  
  const [selectedNutrients, setSelectedNutrients] = useState<any[]>([])

  const getNutrientsList = async () => {
    // 'https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getNutrientsList'
    const res = await axios('http://localhost:8888/.netlify/functions/getNutrientsList', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    });

    return res?.data as nutrientItem[];
  }

  console.log('selectedNutrients');
  console.log(selectedNutrients);
  console.log('selectedNutrients');


  return (
    <Stack direction="column" width='100%' mt='2em'>
      <Typography
        variant="h1"
        margin= 'auto'
      >
        FoodData
      </Typography>
      <SelectBar
        title="Nutrients"
        asyncFunc={getNutrientsList}
        loadingComponent = {<CircularProgress />}
        setSelectedItems = {setSelectedNutrients}
      />

      
      
    </Stack>

  )
}