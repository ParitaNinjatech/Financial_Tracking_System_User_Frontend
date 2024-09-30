import React from 'react';
import { Box, Typography, Grid, TextField, Button } from "../../common/Index"
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import "./Verifaction.css"

function Verification() {
    const { isConnected, address } = useWeb3ModalAccount();
    return (
        <div className='background-image-Veri'>
            <div className='box-Container-Veri'>

                <Box sx={{ padding: '20px' }}>
                    <Box className='Second_container-Veri'>
                        {isConnected ? (
                            <><Typography variant="h6" style={{ fontWeight: "bold",textAlign:"center" }}>Verification OTP</Typography>
                            <Box component="form" noValidate sx={{ mt: 3,marginLeft: "200px" }}>
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
                                            label="OTP"
                                            type="number"
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }} />
                                    </Grid>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, borderRadius: "26px" }}
                                        className='OTP'
                                    >
                                        Verify OTP
                                    </Button>


                                </Grid>
                            </Box></>
                        ) : (
                            <Button sx={{marginLeft:"413px"}} >

                            <w3m-button />
                            </Button>
                        )}

                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default Verification
