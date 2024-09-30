import React, { useState } from 'react'
import './AddTransaction.css'
import { Box, Typography, Grid, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '../../common/Index'
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { useWeb3Modal } from "@web3modal/ethers5/react"
import { ethers } from 'ethers';
import { FinancialObj } from '../Constant/ContractObject';

function AddTransaction() {
  const [status, setStatus] = useState<number>(3);
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();

  const Initiate = async () => {
    try {
      if (walletProvider) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const contractObj = await FinancialObj(signer)

        const amounttoString = ethers.utils.parseUnits(amount.toString());
        console.log(amounttoString.toString(),"amount",amount.toString());
        console.log(from,to,"from,to");
        
        const tx = await contractObj.initiateTransaction("1",address,from,to,amounttoString.toString());
        await tx.wait()
        console.log(tx.hash,"Hash");
        
      } else {
        alert("Please Connect Wallet Properly")
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                <Grid item xs={12}>
                  <TextField
                    autoComplete="From"
                    name="From"
                    required
                    fullWidth
                    id="From"
                    label="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="to"
                    label="To"
                    name="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
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
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
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
                {
                  isConnected ? (<Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                    className='Add-button'
                    onClick={()=>Initiate()}
                  >
                    Add Transaction
                  </Button>) : (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                      className='Add-button'
                      type="button"
                      onClick={() => open()}
                    >
                      Connect Wallet
                    </Button>

                  )
                }
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default AddTransaction
