import React from 'react';
import {
    Modal, Box, Typography, Button, CloseIcon, IconButton, Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot, AccessTime
} from '../../common/Index';


interface TrackTransaction {
    showTransactionModal: boolean;
    setShowTransactionModal: (value: boolean) => void;
    scanLink: string;
    contractAddress: string;
    transaction: string;
}

const TrackTransaction: React.FC<TrackTransaction> = ({
    showTransactionModal,
    setShowTransactionModal
}) => {

    const activities = [
        { status: 'InitiaInitiate Transaction',  time: 'Tuesday 11:29 AM' },
        { status: 'Pending', time: 'Wednesday 11:29 AM' },
        { status: 'Confirm', time: 'Thursday 11:29 AM' }
    ];
    return (
        <Modal
            open={showTransactionModal}
            onClose={() => setShowTransactionModal(false)}
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
                    <IconButton onClick={() => setShowTransactionModal(false)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    id="deployment-modal-description"
                    sx={{ maxHeight: '600px', overflowY: 'auto', mb: 3,marginLeft:"-300px" }}
                >
                        <Timeline>
                            {activities.map((activity, index) => (
                                <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <TimelineDot color={index === activities.length - 1 ? 'grey' : 'primary'} />
                                        {index < activities.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            {activity.status}
                                        </Typography>
                                        {activity.time && (
                                            <Typography variant="caption" display="block" color="textSecondary">
                                                <AccessTime fontSize="small" /> {activity.time}
                                            </Typography>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>

                </Box>
                <Box sx={{ textAlign: 'right', }}>
                    <Button variant="contained" sx={{borderRadius:"26px",height:"50px",width:"100px"}} onClick={() => setShowTransactionModal(false)}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TrackTransaction;
