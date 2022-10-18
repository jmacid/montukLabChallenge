import { Button, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useState } from "react"
import { SelectBar } from "../../components/selectBar"
import CircularProgress from '@mui/material/CircularProgress';
import { NutrientBox } from "../../components/nutrientBox";
import axios from 'axios';

export const HomePage: React.FC<{}> = () => {
  
  const [selectedNutrients, setSelectedNutrients] = useState<any[]>([]);

  const clickHandle = (nutrientId: string) => {
    const remainingNutrients = selectedNutrients.filter( item => item.nutrientId !== nutrientId);
    setSelectedNutrients(remainingNutrients);
  }


  const getNutrientsList = async () => {
    // 'https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getNutrientsList'
    const res = await axios.get('http://localhost:8888/.netlify/functions/getNutrientsList', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    });

    return res?.data as nutrientItem[];
  }

  const fetchFood = async () => {
    const nutrients:any[] = [];
    selectedNutrients.map( sn => nutrients.push({nutrientId: sn.nutrientId, name:sn.name}));

    // 'https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getFoodByNutrients'
    const res = await axios.post('http://localhost:8888/.netlify/functions/getFoodByNutrients',
    JSON.stringify({ "nutrients": nutrients}));

    console.log(res?.data)

    return res?.data as Food[];
  }

  console.log(selectedNutrients);

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
      {
        selectedNutrients.length > 0 && (
          <Stack width='80vw' margin='2em auto'>
            <Grid container margin='2em 2em' direction='row'>
              {
                selectedNutrients.map( item => (
                  <Grid item key={item.nutrientId}>
                    <NutrientBox
                    nutrient = {item}
                    onDelete={() => clickHandle(item.nutrientId)}
                    />
                  </Grid>
                  ))
              }
            </Grid>
            <Button
              variant="contained"
              onClick={fetchFood}
            >
              Search
            </Button>
          </Stack>
        )
      }
      
    </Stack>

  )
}