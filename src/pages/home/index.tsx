import { Button, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useState } from "react"
import { SelectBar } from "../../components/selectBar"
import CircularProgress from '@mui/material/CircularProgress';
import { NutrientBox } from "../../components/nutrientBox";
import axios from 'axios';
import { FoodCard } from "../../components/foodCard";
import { FoodInfoModal } from '../../components/foodInfoModal'
import './home.css'

const env_dev = process.env.REACT_APP_ENV === 'development' ? true : false;

const appUrl = (!env_dev && typeof process.env.REACT_APP_URL === 'string') ? process.env.REACT_APP_URL : 'http://localhost:8888';

export const HomePage: React.FC<{}> = () => {
  
  const [selectedNutrients, setSelectedNutrients] = useState<any[]>([]);
  const [foodByNutrients, setFoodByNutrients] = useState<Food[]>([]);
  const [foodInfo, setFoodInfo] = useState<FoodInfo[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  // Modal states
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const clickHandle = (nutrientId: string) => {
    const remainingNutrients = selectedNutrients.filter( item => item.nutrientId !== nutrientId);
    setSelectedNutrients(remainingNutrients);
  }


  const getNutrientsList = async (): Promise<nutrientItem[]> => {
    const endpoint = '/.netlify/functions/getNutrientsList'
    const res = await axios.get(appUrl + endpoint, {
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

    const endpoint = '/.netlify/functions/getFoodByNutrients';
    const res = await axios.post(appUrl + endpoint,
    JSON.stringify({ "nutrients": nutrients}));

    setFoodByNutrients(res.data);

    setSearched(true)

    return res?.data as Food[];
  }

  const getFoodInfo = async (food: Food) => {
    const endpoint = '/.netlify/functions/getFoodInfo';
    const res = await axios.post(appUrl + endpoint,
    JSON.stringify({ "fdcId": food.fdcId}));

    if( !res || !res?.data )
      return

    setFoodInfo(res?.data);
    handleOpenModal();
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
        setSelectedItems = {setSelectedNutrients}
      />
      {
        selectedNutrients.length > 0 && (
          <Stack width='80vw' margin='auto'>
            <Grid container margin='2em auto' direction='row'>
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
        foodByNutrients.length > 0 && (
          <Stack width='80vw' margin='2em auto'>
            <Grid container display='grid' className="foodCardGrid" >
            {
              foodByNutrients.map( food => (
                <Grid item key={food.fdcId} margin='0.5em' style={{display: 'flex'}}>
                  <FoodCard
                  food = {food}
                  onLearnMore={() => getFoodInfo(food)}
                  />
                </Grid>
                ))
            }
            </Grid>
          </Stack>

        )
      }
      {
        foodByNutrients.length === 0 && searched && (
          <Typography variant="h6" margin='3em auto'>Not food found :(</Typography>
        )
      }
      <FoodInfoModal
        openModal = {openModal}
        handleCloseModal = { handleCloseModal }
        foodInfo = { foodInfo }
      />
      
    </Stack>

  )
}