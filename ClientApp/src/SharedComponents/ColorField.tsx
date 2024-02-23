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

export function ColorField(props: Props) {

    console.log(props.value)
    return (
        <MTextField
            label={props.label}
            placeholder="#FFFFFF"
            value={props.value ?? ''}
            onChange={props.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => { props.onChange!(e.target.value) } : undefined}
            error={props.error}
            margin={props.margin ?? "normal"}
            variant={props.variant ?? "outlined"}
            required={props.required}
            fullWidth
            multiline={props.multiline}
            rows={props.rows}
            helperText={props.helperText}
            sx={(theme) => (props.sx ? props.sx && { backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(props.value!) ? props.value : "#fff", "div": { color: /^#([0-9A-F]{3}){1,2}$/i.test(props.value!) ? theme.palette.getContrastText(props.value!) : "#000" } } :
                { backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(props.value!) ? props.value : "#fff", "div": { color: /^#([0-9A-F]{3}){1,2}$/i.test(props.value!) ? theme.palette.getContrastText(props.value!) : "#000" } })}
        />
    )
}