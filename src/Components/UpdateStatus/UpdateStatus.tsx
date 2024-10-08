import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CloseIcon,
  IconButton,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  axios,
  ToastContainer,
  toast,
} from "../../common/Index";
import { Backend_EndPoint } from "../Constant/EndPoints";
import "react-toastify/dist/ReactToastify.css";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { FinancialObj } from "../Constant/ContractObject";
import "./UpdateStatus.css";
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

interface UpdateTransactionStatus {
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  transactionId: TransactionList;
}

const UpdateStatus: React.FC<UpdateTransactionStatus> = ({
  showUpdateModal,
  setShowUpdateModal,
  transactionId,
}) => {
  const [status, setStatus] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem("jwtToken");
  const { walletProvider } = useWeb3ModalProvider();

  const UpdateStatus = async () => {
    try {
      setIsLoading(true);
      if (token && walletProvider) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const contractObj = await FinancialObj(signer);

        const updateTx = await contractObj.updateTransactionStatus(
          transactionId.index,
          status,
        );
        await updateTx.wait();
        if (updateTx.hash) {
          let statusString: string;
          if (status === 0) {
            statusString = "Initiate";
          } else if (status === 1) {
            statusString = "Completed";
          } else {
            statusString = "Cancelled";
          }
          const payLoad = {
            status: statusString,
          };
          const response = await axios.put(
            `${Backend_EndPoint}api/v1/transaction/update-status/${transactionId._id}`,
            payLoad,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (response.status === 200) {
            toast.success("Agent Update Transaction Status Successfully");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={showUpdateModal}
      onClose={() => setShowUpdateModal(false)}
      aria-labelledby="deployment-modal-title"
      aria-describedby="deployment-modal-description"
    >
      <Box
        sx={{
          maxWidth: "75%",
          width: "25%",
          margin: "15px auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          position: "relative",
        }}
      >
        <ToastContainer />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography id="deployment-modal-title" variant="h6" component="h2">
            Transaction
          </Typography>
          <IconButton
            onClick={() => setShowUpdateModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          id="deployment-modal-description"
          sx={{ maxHeight: "600px", overflowY: "auto", mb: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                autoComplete="off"
                name="Transaction Id"
                value={transactionId.index}
                fullWidth
                id="Transaction Id"
                disabled
                sx={{ backgroundColor: "lightgray" }}
              />
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Transaction Status
                </InputLabel>
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
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            textAlign: "right",
            gap: "10px",
            display: "flex",
            marginLeft: "164px",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: "26px", height: "50px", width: "150px" }}
            onClick={UpdateStatus}
          >
            {isLoading ? (
              <span className="loader_Update"></span>
            ) : (
              "Update Status"
            )}
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "26px", height: "50px", width: "150px" }}
            onClick={() => setShowUpdateModal(false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateStatus;
