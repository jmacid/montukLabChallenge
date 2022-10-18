import { Typography, Stack } from "@mui/material"
import React from "react"

export const AboutPage: React.FC<{}> = () => {
  return (
    <Stack width='100%' mt='2em'>
      <Typography
        variant="h1"
        margin='auto'
      >
          About
      </Typography>
      <Typography
        variant="body1"
        margin='auto'
        maxWidth='50%'
        mt='2em'
        textAlign='center'
      >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga repellendus quidem nam. Ut, harum! Quos, totam cupiditate! Soluta expedita excepturi quis aut quisquam explicabo! Dolore cum ducimus sed accusantium ullam.
      </Typography>

    </Stack>
  )
}