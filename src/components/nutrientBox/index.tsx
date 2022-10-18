import { Button, Stack, Typography } from "@mui/material"
import React from "react"
import CloseIcon from '@mui/icons-material/Close';


export const NutrientBox: React.FC<NutrientBox> = ({nutrient, onDelete}) => {

  return (
    <Stack 
      direction='row' 
      alignItems='center'
      border='1px solid'
      width='fit-content'
      margin='0.125em'
      padding='0.5em'
    >
      <Typography mr='1.5em'>
        {nutrient.name}
      </Typography>

      <Button onClick={() => onDelete(nutrient.nutrientId)}>
        <CloseIcon />
      </Button>
    </Stack>
  )
}