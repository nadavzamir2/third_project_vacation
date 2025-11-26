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
                sx={{ maxWidth: 600, minWidth: 400, borderRadius: "md", p: 4, boxShadow: "lg" }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />

                <Typography
                    component="h2"
                    level="h3"
                    textColor="inherit"
                    sx={{ fontWeight: "lg", mb: 2 }}
                >
                    Delete {destination} vacation?
                </Typography>

                <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 3, fontSize: "1.1rem" }}>
                    This action cannot be undone.
                </Typography>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <Button variant="outlined" color="neutral" onClick={onClose} size="lg">
                        Cancel
                    </Button>
                    <Button color="danger" onClick={onConfirm} size="lg">
                        Delete
                    </Button>
                </div>
            </Sheet>
        </Modal>

    );
};