import { Typography, Stack } from "@mui/material"
import React from "react"
import GitHubIcon from '@mui/icons-material/GitHub';

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
          This page was made following the requirements of a challenge made by Montauk Labs.
      </Typography>
      <Typography
        variant="body1"
        margin='auto'
        maxWidth='50%'
        mt='2em'
        textAlign='center'
      >
        The repository is located on <a href='https://github.com/jmacid/montukLabChallenge' target="_blank" rel="noreferrer"> <GitHubIcon /> GitHub</a>
      </Typography>

    </Stack>
  )
}