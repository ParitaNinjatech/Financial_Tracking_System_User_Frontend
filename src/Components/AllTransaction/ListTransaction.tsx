import { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  EditIcon,
  axios,
  Paper,
  SearchIcon,
  InputBase,
} from "../../common/Index";
import "./ListTransaction.css";
import TrackTransaction from "../TrackTransaction/TrackTransaction";
import UpdateStatus from "../UpdateStatus/UpdateStatus";
import { format } from "date-fns";
import { Backend_EndPoint } from "../Constant/EndPoints";

interface TransactionList {
  _id: string;
  txId: string;
  from: string;
  to: string;
  agentA: string;
  agentB: string;
  amount: string;
  index: number;
  Status: string;
  OTP: string;
  createdAt: string;
  updatedAt: string;
}

function ListTransaction() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectTransactionData, setSelectTransactionData] =
    useState<TransactionList | null>(null);
  const [transactionList, setTransactionList] = useState<TransactionList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPendingTransaction, setTotalPendingTransaction] =
    useState<number>();
  const [totalConfirmTransaction, setTotalConfirmTransaction] =
    useState<number>();
  const [totalCancelTransaction, setTotalCancelTransaction] =
    useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 10;
  const token = localStorage.getItem("jwtToken");

  const FetchListTransaction = async () => {
    try {
      setIsLoading(false);
      if (token) {
        const response = await axios.get(
          `${Backend_EndPoint}api/v1/transaction/agent-transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          const pendingTransaction = response.data.filter(
            (agent: TransactionList) => agent.Status === "Initiated",
          );
          const completedTransaction = response.data.filter(
            (agent: TransactionList) => agent.Status === "Completed",
          );
          const cancelTransaction = response.data.filter(
            (agent: TransactionList) => agent.Status === "Cancelled",
          );
          setTotalPendingTransaction(pendingTransaction.length);
          setTotalConfirmTransaction(completedTransaction.length);
          setTotalCancelTransaction(cancelTransaction.length);
          setTransactionList(response.data);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactionList;
    return transactionList.filter(
      (tx: any) =>
        tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.agentA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.Status.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [transactionList, searchTerm]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransaction = filteredTransactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFocus = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) {
      FetchListTransaction();
    }
  }, []);
  return (
    <>
      <div className="background-image">
        <div className="box-Container_List">
          <Box className="first_box">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Transaction List ({transactionList.length || 0})
              </Typography>

              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  marginLeft: "49%",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search transactions"
                  inputProps={{ "aria-label": "search transactions" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleFocus}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Typography variant="body2">
              The agent initiated the transaction list.
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total Confirm Transaction
                  </Typography>
                  <Typography variant="h5">
                    {totalConfirmTransaction || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total Pending Transaction
                  </Typography>
                  <Typography variant="h5">
                    {totalPendingTransaction || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total Cancel Transaction
                  </Typography>
                  <Typography variant="h5">
                    {totalCancelTransaction || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box className="second_box">
            <Box className="third_box">
              {isLoading ? (
                <TableContainer>
                  <span className="loader2_transaction"></span>
                </TableContainer>
              ) : displayedTransaction.length > 0 ? (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ gap: "2px" }}>
                          <TableCell className="table-row">No.</TableCell>
                          <TableCell className="table-row">TxId</TableCell>
                          <TableCell className="table-row">From</TableCell>
                          <TableCell className="table-row">To</TableCell>
                          <TableCell className="table-row">Agent</TableCell>
                          <TableCell className="table-row">Amount</TableCell>
                          <TableCell className="table-row">Index</TableCell>
                          <TableCell className="table-row">CreatedAt</TableCell>
                          <TableCell className="table-row">UpdatedAt</TableCell>
                          <TableCell className="table-row">Status</TableCell>
                          <TableCell className="table-row">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayedTransaction.map((tx, i) => (
                          <TableRow key={i + 1}>
                            <TableCell>
                              {currentPage * itemsPerPage + i + 1}
                            </TableCell>
                            <TableCell>{tx.txId}</TableCell>
                            <TableCell>
                              {tx.from.slice(0, 6)}....{tx.from.slice(-4)}
                            </TableCell>
                            <TableCell>
                              {tx.to.slice(0, 6)}....{tx.to.slice(-4)}
                            </TableCell>
                            <TableCell>
                              {tx.agentA.slice(0, 6)}....{tx.agentA.slice(-4)}
                            </TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell>{tx.index}</TableCell>
                            <TableCell>
                              {format(
                                new Date(tx.createdAt),
                                "d MMM, yyyy HH:mm aa",
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                new Date(tx.updatedAt),
                                "d MMM, yyyy HH:mm aa",
                              )}
                            </TableCell>
                            <TableCell>
                              <span
                                style={{
                                  color:
                                    tx.Status === "Completed"
                                      ? "blue"
                                      : tx.Status === "Initiated"
                                        ? "green"
                                        : tx.Status === "Cancelled"
                                          ? "red"
                                          : "yellow",
                                  fontWeight: "bold",
                                }}
                              >
                                {tx.Status}
                              </span>
                            </TableCell>

                            {tx.Status === "Completed" ? (
                              ""
                            ) : (
                              <TableCell>
                                <IconButton
                                  onClick={() => (
                                    setSelectTransactionData(tx),
                                    setShowUpdateModal(true)
                                  )}
                                >
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box className="footer">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </button>
                    <Typography variant="body1">
                      Page {currentPage + 1} of {totalPages}
                    </Typography>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages - 1}
                    >
                      Next
                    </button>
                  </Box>
                </>
              ) : (
                <TableContainer>
                  <h4 style={{ marginLeft: "45%" }}>Transaction Not Found</h4>
                </TableContainer>
              )}
            </Box>
          </Box>
        </div>
      </div>
      <TrackTransaction
        showTransactionModal={showTransactionModal}
        setShowTransactionModal={setShowTransactionModal}
        scanLink={"scanLink"}
        contractAddress={"contractAddress"}
        transaction={"transaction"}
      />
      {selectTransactionData && (
        <UpdateStatus
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          transactionId={selectTransactionData}
        />
      )}
    </>
  );
}

export default ListTransaction;
