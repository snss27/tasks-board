import { Theme } from "@emotion/react";
import { Autocomplete, SxProps, TextField } from "@mui/material";

interface Props<T> {
    label: string
    values: T[]
    options: T[]
    sx?: SxProps<Theme>
    onChange: (values: T[]) => void
    onInputTextChange: (text: string) => void
    getOptionLabel: (value: T) => string
    isOptionEqualToValue?: (option: T, value: T) => boolean

}

export function AsyncMultiAutocomplete<T>(props: Props<T>) {

    return (
        <Autocomplete
            options={props.options}
            value={props.values}
            multiple
            onChange={(_, values) => props.onChange(values)}
            getOptionLabel={props.getOptionLabel}
            onInputChange={(_, text) => {
                props.onInputTextChange(text)
            }}
            isOptionEqualToValue={props.isOptionEqualToValue}
            filterSelectedOptions
            sx={props.sx}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    )
}