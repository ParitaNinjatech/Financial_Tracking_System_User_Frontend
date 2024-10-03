import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, ContentCopyIcon, IconButton, ToastContainer, toast, axios } from "../../common/Index"
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Backend_EndPoint } from '../Constant/EndPoints';
import { useWeb3Modal } from "@web3modal/ethers5/react"
import "./Verifaction.css"
import 'react-toastify/dist/ReactToastify.css';

function Verification() {
    const { isConnected, address } = useWeb3ModalAccount();
    const [txId, setTxId] = useState<string>('');
    const [generatedOTP, setGeneratedOTP] = useState<number | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const token = localStorage.getItem('jwtToken');
    const { open } = useWeb3Modal();

    const GenerateOTP = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const payload = {
                walletAddress: address,
                id: txId
            }

            const response = await axios.post(`${Backend_EndPoint}api/v1/transaction/get-otp`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response, "response");
            if (response.status === 200) {
                setGeneratedOTP(response.data)
                toast.success("OTP Generate SuccessFully");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false)
        }
    }

    const copyOTP = async () => {
        try {
            if (generatedOTP) {

                navigator.clipboard.writeText(generatedOTP.toString())
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='background-image-Veri'>
            <div className='box-Container-Veri'>

                <Box sx={{ padding: '20px' }}>
                    <Box className='Second_container-Veri'>
                        <ToastContainer />
                        <Button sx={{ marginLeft: "70%" }} >
                            <w3m-button />
                        </Button>
                        {isConnected && (
                            <>
                                <Typography variant="h5" style={{ fontWeight: "bold", textAlign: "center" }}>Verification OTP</Typography>

                                <Box component="form" noValidate sx={{ mt: 3, marginLeft: "200px" }} onSubmit={GenerateOTP}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <TextField
                                                autoComplete="Wallet Address"
                                                name="Wallet Address"
                                                value={address}
                                                fullWidth
                                                id="Wallet Address"
                                                disabled
                                                sx={{ backgroundColor: "lightgray" }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-number"
                                                label="Tx Id"
                                                type="text"
                                                value={txId}
                                                onChange={(e) => setTxId(e.target.value)}
                                            />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                                            className='OTP'
                                        >
                                            {isLoading ? (<span className='loader_OTP'></span>) : ("Generate OTP")}
                                        </Button>
                                        {generatedOTP && (
                                            <>
                                                <Grid item xs={12} sx={{ display: "flex" }}>
                                                    <Typography variant="h6">Generated OTP : {generatedOTP}</Typography>
                                                    <IconButton sx={{ marginTop: "-3px" }} onClick={copyOTP}>
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                </Grid>
                                                <p style={{ fontWeight: "bold", color: "red" }}>Note*: Please Don't share OTP with anyone</p>
                                            </>
                                        )
                                        }

                                    </Grid>
                                </Box></>
                        )}

                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default Verification
