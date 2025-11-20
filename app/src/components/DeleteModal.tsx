import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

type DeleteModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    destination: string;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm, destination }) => {
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