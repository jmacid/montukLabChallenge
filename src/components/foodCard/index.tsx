import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import React from "react";



export const FoodCard: React.FC<FoodCard> = ({food, onLearnMore}) => {  
  return (
    <Card sx={{maxWidth: '20em'}}>

      <Stack height='100%' direction='column' justifyContent='space-between'>
      <CardContent>
        <Typography variant="h4" sx={{mb:1.5}}>{food.description}</Typography>
        <Divider />
        <Typography sx={{mt:1.5}}>Category: {food.foodCategory}</Typography>
        <Typography sx={{mt:1.5}}>Publication date: {food.publicationDate}</Typography>
      </CardContent>

      <CardActions>
        <Button fullWidth variant="contained" size="small" onClick={() => onLearnMore()}>Learn More</Button>
      </CardActions>
    </Stack>

    </Card>

  )
}