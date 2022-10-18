import React from "react"
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Button,
  Typography,
  Stack
} from '@mui/material';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import { useNavigate } from "react-router-dom"

export const NavBar:React.FC<{}> = () => {
  const navigate = useNavigate();
  
  return(
    <Box sx={{flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>

          <Container maxWidth="xl">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              
              <Grid item>
                <Button onClick={() => navigate("/")}>
                  <Stack direction="row">
                    <RamenDiningOutlinedIcon />
                    <Typography variant="h6">
                      FoodData
                    </Typography>
                  </Stack>
                </Button>
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button color="inherit" onClick={() => navigate("about")}>About</Button>                
                </Stack>
              </Grid>

            </Grid>            
          </Container>

        </Toolbar>
      </AppBar>
    </Box>
  )
}