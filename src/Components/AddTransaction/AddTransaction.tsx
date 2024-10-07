import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, FormControl, Button, InputLabel, Select, MenuItem, axios, ToastContainer, toast } from '../../common/Index'
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { useWeb3Modal } from "@web3modal/ethers5/react"
import { ethers } from 'ethers';
import { FinancialObj } from '../Constant/ContractObject';
import { Backend_EndPoint } from '../Constant/EndPoints';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import './AddTransaction.css';
import 'react-toastify/dist/ReactToastify.css';

function AddTransaction() {
  const [status, setStatus] = useState<number>(3);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    from: '',
    to: '',
    amount: '',
    status: ''
  });
  const [connectAddress, setConnecrAddress] = useState('')
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const token = localStorage.getItem('jwtToken');

  const validateForm = (): boolean => {
    let tempErrors = { ...errors };
    let isValid = true;

    // Validate "from" address
    if (!from || !ethers.utils.isAddress(from)) {
      tempErrors.from = 'Enter a valid Ethereum address';
      isValid = false;
    } else {
      tempErrors.from = '';
    }

    // Validate "to" address
    if (!to || !ethers.utils.isAddress(to)) {
      tempErrors.to = 'Enter a valid Ethereum address';
      isValid = false;
    } else {
      tempErrors.to = '';
    }

    // Validate amount
    if (amount <= 0) {
      tempErrors.amount = 'Enter a positive amount';
      isValid = false;
    } else {
      tempErrors.amount = '';
    }

    // Validate status
    if (status === 3) {
      tempErrors.status = 'Please select a transaction status';
      isValid = false;
    } else {
      tempErrors.status = '';
    }

    setErrors(tempErrors);
    return isValid;
  };

  const Initiate = async () => {
    if (!validateForm()) {
      toast.error("Please correct the form errors");
      return;
    }

    try {
      setIsLoading(true);
      if (walletProvider && token) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const contractObj = await FinancialObj(signer);

        const amountToString = ethers.utils.parseUnits(amount.toString());
        const newId = uuidv4();

        const tx = await contractObj.initiateTransaction(newId, address, from, to, amountToString.toString());
        await tx.wait();
        getEventData(tx.hash, newId);
      } else {
        toast.error("Please connect your wallet properly");
      }
    } catch (error) {
      console.log(error);
      toast.error("Transaction initiation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getEventData = async (hash: any, txId: any) => {
    try {
      if (hash && walletProvider) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const getEvent = await provider.getTransactionReceipt(hash);

        if (getEvent && getEvent.logs) {
          const tokenInterface = new ethers.utils.Interface(['event TransactionInitiated(uint256 indexed id,string indexed transactionId,address sender,address moneySender,address recipient,uint256 amount,uint256 transactionCreatedAt)']);
          const transferLog = getEvent.logs.find((log: any) => log.topics.includes(tokenInterface.getEventTopic('TransactionInitiated')));

          if (transferLog && transferLog.topics[1]) {
            const value = transferLog.topics[1];
            const decimalValue = parseInt(value, 16);

            if (decimalValue) {
              const payload = {
                from: from,
                to: to,
                agentA: address,
                agentB: "0x06128b63cAFBa9B6E350642D96d7D814a8838b5a",
                amount: amount.toString(),
                index: decimalValue,
                txId: txId
              };

              const response = await axios.post(`${Backend_EndPoint}api/v1/transaction/`, payload, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });

              if (response.status === 201) {
                toast.success('Transaction initiated successfully');

                setTimeout(() => {
                  window.location.href = '/listTransaction';
                }, 3000);
              }
            }
          } else {
            toast.error('No relevant log found in the transaction receipt.');
          }
        } else {
          toast.error('No logs found in the transaction receipt.');
        }
      }
    } catch (error) {
      toast.error("An error occurred while fetching transaction data");
    }
  };

  const getUserData = async () => {
    try {
      if (token) {
        const user: any = jwtDecode(token);
        const response = await axios.get(`${Backend_EndPoint}api/v1/user/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const { walletAddress } = response.data;
        console.log(walletAddress, address);

        setConnecrAddress(walletAddress)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getUserData()
    }
  }, [isConnected])

  return (
    <div className='background-image'>
      <div className='box-Container'>


        {connectAddress.toLowerCase() == address?.toLowerCase() ? (
          <>
            <Box className='Main_Box'>
              <ToastContainer />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>Initiate Transaction</Typography>
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
                        error={!!errors.from}
                        helperText={errors.from} />
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
                        error={!!errors.to}
                        helperText={errors.to} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        placeholder='0'
                        value={amount === 0 ? '' : amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.status}>
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
                          <MenuItem value={1}>Completed</MenuItem>
                          <MenuItem value={2}>Cancel</MenuItem>
                        </Select>
                        {errors.status && <Typography color="error">{errors.status}</Typography>}
                      </FormControl>
                    </Grid>

                    {isConnected ? (
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                        className='Add-button'
                        onClick={() => Initiate()}
                      >
                        {isLoading ? (<span className="loader_Add_Tx"></span>) : "Add Transaction"}
                      </Button>
                    ) : (
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
                    )}
                  </Grid>
                </Box>
              </Box>
            </Box></>
        ) : (
          <Box className='Second_container'>
            <Typography variant="h6" style={{ fontWeight: "bold", textAlign: "center" }}>Please connect register wallet here and then do transaction</Typography>
          </Box>
        )}

      </div>
    </div>
  )
}

export default AddTransaction;
