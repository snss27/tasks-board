import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Notification } from "../Common/Notification";

interface Props {
    notification: Notification | null
    variant?: "filled" | "outlined" | "standard"
}

export function SnackBarAlert(props: Props) {

    const [isOpen, setOpen] = useState(props.notification !== null)

    function handleClose(_: React.SyntheticEvent | Event, reason?: string) {
        if (reason === "clickaway") return;
        setOpen(false)
    };

    useEffect(() => {
        if (!props.notification) return
        setOpen(true)
    }, [props.notification])



    return (
        <Snackbar autoHideDuration={4000} open={isOpen} onClose={handleClose}>
            <Alert severity={props.notification?.type ?? "error"}
                onClose={handleClose}
                variant={props.variant ?? "filled"}
                sx={{ width: "100%", fontSize: "1.2rem" }}
            >
                {props.notification?.message}
            </Alert>
        </Snackbar>
    )
}