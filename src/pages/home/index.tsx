import { Button, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useState } from "react"
import { SelectBar } from "../../components/selectBar"
import CircularProgress from '@mui/material/CircularProgress';
import { NutrientBox } from "../../components/nutrientBox";
import axios from 'axios';
import { FoodCard } from "../../components/foodCard";


export const HomePage: React.FC<{}> = () => {
  
  const [selectedNutrients, setSelectedNutrients] = useState<any[]>([]);
  const [foodInfo, setFoodInfo] = useState<Food[]>([]);

  const clickHandle = (nutrientId: string) => {
    const remainingNutrients = selectedNutrients.filter( item => item.nutrientId !== nutrientId);
    setSelectedNutrients(remainingNutrients);
  }


  const getNutrientsList = async (): Promise<nutrientItem[]> => {
    const res = await axios.get('https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getNutrientsList', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    });

    return res?.data as nutrientItem[];
  }

  const fetchFood = async (): Promise<Food[]> => {
    const nutrients:any[] = [];
    selectedNutrients.map( sn => nutrients.push({nutrientId: sn.nutrientId, name:sn.name}));

    const res = await axios.post('https://timely-flan-5fe4e8.netlify.app/.netlify/functions/getFoodByNutrients',
    JSON.stringify({ "nutrients": nutrients}));

    console.log(res?.data)

    setFoodInfo(res.data);

    return res?.data as Food[];
  }

  const learnMore = async (food: Food) => {
    console.log(food);
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
      {
        foodInfo.length > 0 && (
          <Stack width='80vw' margin='2em auto'>
            <Grid container margin='2em 2em' alignItems="stretch">
            {/* className="cardContainer" */}
            {
              foodInfo.map( food => (
                <Grid item key={food.fdcId} margin='0.5em' style={{display: 'flex'}}>
                  <FoodCard
                  food = {food}
                  onLearnMore={() => learnMore(food)}
                  />
                </Grid>
                ))
            }
            </Grid>
          </Stack>

        )
      }
      
    </Stack>

  )
}