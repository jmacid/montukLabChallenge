import { Button, Modal, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { TableFoodInfo } from "../tableFoodInfo";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FoodInfoModal: React.FC<FoodInfoModalProps> = ({openModal, handleCloseModal, foodInfo}) => {

  return (
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Stack direction='row' justifyContent='space-between' alignContent='center'>
            <Typography variant="h6">Nutritional Information</Typography>
            
            <Button
              sx={{float: 'right', marginBottom: '0.5em'}}
              onClick={handleCloseModal}
              >
              <CloseIcon />
            </Button>
          </Stack>

          <TableFoodInfo
            foodInfo = { foodInfo }
          />
          
        </Box>
      </Modal>
  )
}