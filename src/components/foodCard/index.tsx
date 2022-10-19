import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import React from "react";



export const FoodCard: React.FC<FoodCardProps> = ({food, onLearnMore}) => {

  return (
    <Card sx={{maxWidth: '20em', width:'100%'}}>

      <Stack height='100%' direction='column' justifyContent='space-between'>
      <CardContent>
        <Typography variant="h4" sx={{mb:1.5}}>{food.description}</Typography>
        <Divider />
        <Typography sx={{mt:1.5}}><strong>ID: </strong>{food.fdcId}</Typography>
        <Typography sx={{mt:1.5}}><strong>Category: </strong>{food.foodCategory}</Typography>
        <Typography sx={{mt:1.5}}><strong>Publication date: </strong>{food.publicationDateFormatted}</Typography>
      </CardContent>

      <CardActions>
        <Button fullWidth variant="contained" size="small" onClick={() => onLearnMore()}>Learn More</Button>
      </CardActions>
    </Stack>

    </Card>

  )
}