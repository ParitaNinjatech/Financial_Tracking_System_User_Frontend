import React,{useState} from 'react';
import {
    Modal, Box, Typography, Button, CloseIcon, IconButton,
    Grid, TextField,FormControl,Select,InputLabel,MenuItem
} from '../../common/Index';

interface Transaction {
    SenderName: string;
    Hash: string;
    Amount: number;
    CreatedAt: string;
    UpdatedAt: string;
    Status: string;
}

interface UpdateTransactionStatus {
    showUpdateModal: boolean;
    setShowUpdateModal: (value: boolean) => void;
    transactionId: Transaction;
}


const UpdateStatus: React.FC<UpdateTransactionStatus> = ({
    showUpdateModal,
    setShowUpdateModal,
    transactionId
}) => {
    const [status, setStatus] = useState<number>(3)


    return (
        <Modal
            open={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            aria-labelledby="deployment-modal-title"
            aria-describedby="deployment-modal-description"
        >
            <Box
                sx={{
                    maxWidth: '75%',
                    width: '25%',
                    margin: '15px auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    position: 'relative',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography id="deployment-modal-title" variant="h6" component="h2">
                        Transaction
                    </Typography>
                    <IconButton onClick={() => setShowUpdateModal(false)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    id="deployment-modal-description"
                    sx={{ maxHeight: '600px', overflowY: 'auto', mb: 3}}
                >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    autoComplete="Transaction Id"
                                    name="Transaction Id"
                                    value={transactionId.SenderName}
                                    fullWidth
                                    id="Transaction Id"
                                    disabled
                                    sx={{ backgroundColor: "lightgray" }}
                                />
                            </Grid>

                            <Grid item xs={10}>
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
                <Box sx={{ textAlign: 'right',gap:"10px",display:"flex",marginLeft:"164px" }}>
                    <Button variant="contained" sx={{ borderRadius: "26px", height: "50px", width: "150px" }}>
                        Update Status
                    </Button>
                    <Button variant="contained" sx={{ borderRadius: "26px", height: "50px", width: "150px" }} onClick={() => setShowUpdateModal(false)}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateStatus;
