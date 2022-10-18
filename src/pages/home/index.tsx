import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React from "react"
import { SelectBar } from "../../components/selectBar"
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export const HomePage: React.FC<{}> = () => {

  const getNutrientsList = async () => {
    const res = await axios('https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getNutrientsList');

    return res?.data;
  }


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
      />

      
      
    </Stack>

  )
}