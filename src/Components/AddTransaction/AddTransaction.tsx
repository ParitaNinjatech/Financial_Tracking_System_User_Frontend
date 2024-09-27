import React, { useState } from 'react'
import './AddTransaction.css'
import { Box, Typography, Grid, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '../../common/Index'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 

function AddTransaction() {
  const [status, setStatus] = useState<number>(3)
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <div className='background-image'>
      <div className='box-Container'>
        <Box
          className='Main_Box'
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Initiate Transaction </Typography>
          <Typography variant="body2">Transaction Starter turns into Agent A</Typography>
        </Box>

        <Box sx={{ padding: '20px' }}>
          <Box className='Second_container'>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>User Information</Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="From"
                    name="From"
                    required
                    fullWidth
                    id="From"
                    label="From"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="to"
                    label="To"
                    name="to"
                    autoComplete="to"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Transaction Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Transaction Status"
                      onChange={(e) => setStatus(Number(e.target.value))}
                    >
                      <MenuItem value={3}>Please Select Status</MenuItem>
                      <MenuItem value={0}>Initiate</MenuItem>
                      <MenuItem value={1}>Pending</MenuItem>
                      <MenuItem value={2}>Confirm</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Typography variant="h6" style={{ fontWeight: "bold",marginTop:"24px" }}>Agents Information</Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="Agent A"
                    name="Agent A"
                    value={"Part"}
                    fullWidth
                    id="Agent A"
                    disabled
                    sx={{ backgroundColor: "lightgray" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="agent b"
                    label="Agent B"
                    name="agent b"
                    autoComplete="agent b"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <PhoneInput
                      country={'us'}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        id: 'phoneNumber',
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                      inputStyle={{
                        height: '56px',
                        width: '100%',
                        borderRadius: '4px',
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                className='Add-button'
              >
                Add Transaction
              </Button>

            </Box>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default AddTransaction
