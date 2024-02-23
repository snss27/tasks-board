import { Theme } from "@emotion/react";
import { TextField as MTextField, SxProps } from "@mui/material";

interface Props {
    value: string | null;
    onChange: (text: string) => void;
    label?: string;
    error?: boolean;
    margin?: "none" | "normal" | "dense"
    variant?: "filled" | "outlined" | "standard"
    required?: true
    multiline?: true
    rows?: number
    helperText?: string | null
    sx?: SxProps<Theme>
}

export function TextField(props: Props) {
    return (
        <MTextField
            value={props.value !== null ? props.value : ''}
            onChange={props.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => { props.onChange!(e.target.value) } : undefined}
            label={props.label}
            error={props.error}
            margin={props.margin ?? "normal"}
            variant={props.variant ?? "outlined"}
            required={props.required}
            fullWidth
            multiline={props.multiline}
            rows={props.rows}
            helperText={props.helperText}
            sx={props.sx}
        />
    );
}
