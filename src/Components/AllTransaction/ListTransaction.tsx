import React, { useState } from 'react'
import {
    Grid, Card, CardContent, Typography, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Box, IconButton, VisibilityIcon, EditIcon
} from "../../common/Index";
import './ListTransaction.css'
import TrackTransaction from "../TrackTransaction/TrackTransaction"
import UpdateStatus from '../UpdateStatus/UpdateStatus';
interface Transaction {
    SenderName: string;
    recipient: string;
    Hash: string;
    Amount: number;
    CreatedAt: string;
    UpdatedAt: string;
    Status: string;
}

function ListTransaction() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectTransactionData, setSelectTransactionData] = useState<Transaction | null>(null);
    const itemsPerPage = 10;


    const transaction = [
        { SenderName: 'Air Jordan', recipient: 'Shoes', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Amazon Fire TV', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Apple iPad', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Apple Watch Series 7', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'BANGE Anti Theft Backpack', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Canon EOS Rebel T7', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Air Jordan', recipient: 'Shoes', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Amazon Fire TV', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Apple iPad', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Apple Watch Series 7', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'BANGE Anti Theft Backpack', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Canon EOS Rebel T7', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Air Jordan', recipient: 'Shoes', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Amazon Fire TV', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'Apple iPad', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Apple Watch Series 7', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Confirmed" },
        { SenderName: 'BANGE Anti Theft Backpack', recipient: 'Accessories', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
        { SenderName: 'Canon EOS Rebel T7', recipient: 'Electronics', Hash: "0xf326Dec1A1A5e18292B2E341B03cB23E2e08960B", Amount: 1234567891, CreatedAt: "26,sep 2024", UpdatedAt: '26,sep 2024', Status: "Pending" },
    ];
    const totalPages = Math.ceil(transaction.length / itemsPerPage);
    const displayedTransaction = transaction.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    return (
        <><div className='background-image'>
            <div className='box-Container_List'>
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                        marginBottom: '20px',
                        width: "100%"
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>Transaction List</Typography>
                    <Typography variant="body2">The agent initiated the transaction list.</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Confirmed Transaction</Typography>
                                <Typography variant="h5">3000</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Pending Transaction</Typography>
                                <Typography variant="h5">60000</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: '#f4f4f4',
                        padding: '20px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            height: 'auto',
                            marginTop: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                            padding: '20px',
                        }}
                    >
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='table-row'>No.</TableCell>
                                        <TableCell className='table-row'>SenderName</TableCell>
                                        <TableCell className='table-row'>Recipient</TableCell>
                                        <TableCell className='table-row'>Transaction Hash</TableCell>
                                        <TableCell className='table-row'>Amount</TableCell>
                                        <TableCell className='table-row'>CreatedAt</TableCell>
                                        <TableCell className='table-row'>UpdatedAt</TableCell>
                                        <TableCell className='table-row'>Status</TableCell>
                                        <TableCell className='table-row'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedTransaction.map((tx, i) => (
                                        <TableRow key={i + 1}>
                                            <TableCell>{currentPage * itemsPerPage + i + 1}</TableCell>
                                            <TableCell>{tx.SenderName}</TableCell>
                                            <TableCell>{tx.recipient}</TableCell>
                                            <TableCell>
                                                {(tx.Hash).slice(0, 6)}....{(tx.Hash).slice(-4)}
                                            </TableCell>
                                            <TableCell>{tx.Amount}</TableCell>
                                            <TableCell>{tx.CreatedAt}</TableCell>
                                            <TableCell>{tx.UpdatedAt}</TableCell>
                                            <TableCell>
                                                <span
                                                    style={{
                                                        color: tx.Status === 'Confirmed' ? 'blue' : 'red',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {tx.Status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => (setSelectTransactionData(tx), setShowUpdateModal(true))}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => setShowTransactionModal(true)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination Controls */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button onClick={handlePrevPage} disabled={currentPage === 0}>
                                Previous
                            </button>
                            <Typography variant="body1">
                                Page {currentPage + 1} of {totalPages}
                            </Typography>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                                Next
                            </button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
            <TrackTransaction showTransactionModal={showTransactionModal} setShowTransactionModal={setShowTransactionModal} scanLink={"scanLink"}
                contractAddress={"contractAddress"}
                transaction={"transaction"} />
            {selectTransactionData && (
                <UpdateStatus
                    showUpdateModal={showUpdateModal}
                    setShowUpdateModal={setShowUpdateModal}
                    transactionId={selectTransactionData}
                />
            )}        </>


    )
}

export default ListTransaction
