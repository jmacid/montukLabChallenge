import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React from "react"


export const HomePage: React.FC<{}> = () => {

  return (
    <Stack direction="column" width='100%' mt='2em'>
      <Typography
        variant="h1"
        margin= 'auto'
      >
        FoodData
      </Typography>


      
      
    </Stack>

  )
}