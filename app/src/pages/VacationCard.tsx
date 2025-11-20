import { deleteVacation } from "@/services/deleteVacation";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { unfollowVacation } from "@/services/unfollowVacation";
import { followVacation } from "@/services/followVacation";

type DeleteModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    destination: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm, destination }) => {
    return (

        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Sheet
                variant="outlined"
                sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />

                <Typography
                    component="h2"
                    level="h4"
                    textColor="inherit"
                    sx={{ fontWeight: "lg", mb: 1 }}
                >
                    Delete {destination} vacation?
                </Typography>

                <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
                    This action cannot be undone.
                </Typography>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="outlined" color="neutral" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button color="danger" onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </Sheet>
        </Modal>

    );
};

const FollowButtons = ({ vacation, invalidateData }: { vacation: Vacation; invalidateData: () => void }) => {
    console.log('FollowButtons', vacation)
    if (vacation.isFollowedByUser) {
        return (<div>
            <Button onClick={async (e) => {
                await unfollowVacation(vacation.id)
                invalidateData();
            }}>Unfollow</Button>
        </div>)
    } else {
        return (<div>
        <Button onClick={async (e) => {
            await followVacation(vacation.id)
            invalidateData();
        }}>Follow</Button></div>)
    }
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
        <div>
            <h2>Vacation Card</h2>
            <p>Destination: {vacation.destination}</p>
            <p>Price: {vacation.price}</p>
            <p>Start Date: {vacation.startDate}</p>
            <p>End Date: {vacation.endDate}</p>
            <p>Followers: {vacation.count}</p>

            {managedMode ? (
                <>
                    <Button size="sm" component={Link} to={`/edit/${vacation.id}`}>Edit</Button>
                    {" "}
                    <Button size="sm" color="danger" onClick={() => setOpenDeleteModal(true)}>Delete</Button>

                    { }
                    <DeleteModal
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        destination={vacation.destination}
                    />
                </>
            ) : (
                <FollowButtons vacation={vacation} invalidateData={invalidateData} />
            )}
        </div>
    );
};

export default VacationCard;
