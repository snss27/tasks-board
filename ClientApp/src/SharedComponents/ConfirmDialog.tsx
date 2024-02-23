import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface Props {
    isOpen: boolean,
    dialogTtileLabel: string,
    dialogDescription: string,
    disagreeButtonLabel?: string,
    agreeButtonLabel?: string,
    onClose: () => void,
    onAgree: () => void,
    onDisagree?: () => void,
}

export function ConfirmDialog(props: Props) {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
        >
            <DialogTitle>
                {props.dialogTtileLabel}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onDisagree ?? props.onClose}>{props.disagreeButtonLabel ?? "Нет"}</Button>
                <Button onClick={props.onAgree}>{props.agreeButtonLabel ?? "Да"}</Button>
            </DialogActions>
        </Dialog>
    )
}