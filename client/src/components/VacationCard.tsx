import { deleteVacation } from "@/services/deleteVacation";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { unfollowVacation } from "@/services/unfollowVacation";
import { followVacation } from "@/services/followVacation";
import { DeleteModal } from "@/components/DeleteModal"
import CardHeader from "@mui/material/CardHeader";


const FollowButtons = ({ vacation, invalidateData }: { vacation: Vacation; invalidateData: () => void }) => {
    if (vacation.isFollowedByUser) {
        return (
            <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<FavoriteIcon fontSize="small" />}
                onClick={async (e) => {
                    await unfollowVacation(vacation.id)
                    invalidateData();
                }}
                sx={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
                Unfollow
            </Button>
        )
    } else {
        return (
            <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<FavoriteBorderIcon fontSize="small" />}
                onClick={async (e) => {
                    await followVacation(vacation.id)
                    invalidateData();
                }}
                sx={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
                Follow
            </Button>
        )
    }
}

const PlaceholderImage = 'http://localhost:3000/images/placeholder.png';

const ManagedModeActions = ({ vacation, setOpenDeleteModal }: { vacation: Vacation; setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
                size="small"
                variant="contained"
                startIcon={<EditIcon fontSize="small" />}
                component={Link}
                color="info"
                to={`/edit/${vacation.id}`}
                sx={{ fontWeight: 'bold', fontSize: '0.7rem', padding: '4px 8px' }}
            >
                Edit
            </Button>
            <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon fontSize="small" />}
                onClick={() => setOpenDeleteModal(true)}
                sx={{ fontWeight: 'bold', fontSize: '0.7rem', padding: '4px 8px' }}
            >
                Delete
            </Button>
        </Box>
    )
}

export const VacationCard = ({
    vacation,
    managedMode,
    invalidateData,
}: {
    vacation: Vacation;
    managedMode: boolean;
    invalidateData: () => void;
}) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(`${import.meta.env.VITE_API_BASE_URL}${vacation.image}` || PlaceholderImage);

    const handleConfirmDelete = async () => {
        try {
            await deleteVacation(vacation.id);
            setOpenDeleteModal(false);
            invalidateData?.();
        } catch (error) {
            console.error('Error deleting vacation:', error);
            setOpenDeleteModal(false);
        }
    };

    return (
        <Card sx={{
            maxWidth: 345,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            boxShadow: 3,
            marginBottom: 1,
            position: 'relative',
        }}>
            <CardHeader
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    color: "white",
                    background: "rgba(0,0,0,0)",
                    p: 1,
                    '& .MuiCardHeader-action': {
                        margin: 0,
                        alignSelf: 'stretch',
                        width: '100%'
                    }
                }}
                action={
                    managedMode ? (
                        <ManagedModeActions vacation={vacation} setOpenDeleteModal={setOpenDeleteModal} />
                    ) : <FollowButtons vacation={vacation} invalidateData={invalidateData} />
                }
            />
            <CardMedia
                component="img"
                height="200"
                image={imageSrc}
                onError={() => {
                    setImageSrc(PlaceholderImage);
                }}
                alt={vacation.destination}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {vacation.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {vacation.description}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarMonthIcon fontSize="small" color="primary" />
                        <Typography variant="body1" color="text.secondary">
                            {new Date(vacation.startDate).toLocaleDateString('en-GB')} - {new Date(vacation.endDate).toLocaleDateString('en-GB')}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon fontSize="small" color="info" />
                        <Typography variant="body1" color="text.secondary">
                            ${vacation.price}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon fontSize="small" color="primary" />
                        <Chip
                            label={`${vacation.count} followers`}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </CardContent>

            <DeleteModal

                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                destination={vacation.destination}
            />
        </Card>
    );
};

export default VacationCard;
