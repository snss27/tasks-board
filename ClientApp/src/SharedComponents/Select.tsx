import { Select as MSelect, MenuItem, SxProps, Theme } from "@mui/material"

interface Props<T> {
    value: T
    options: T[]
    onChange: (value: T) => void
    getOptionLabel: (option: T) => string
    getValueId: (value: T) => string
    size?: "small" | "medium"
    sx?: SxProps<Theme>
}

export function Select<T>(props: Props<T>) {

    const { getOptionLabel, getValueId, value, options } = props

    return (
        <MSelect
            value={getValueId(value)}
            onChange={(e) => {
                const value = options.find(option => getValueId(option) === e.target.value)!
                props.onChange(value)
            }}
            size={props.size}
            sx={Array.isArray(props.sx) ? [...props.sx, {}] : [props.sx, {}]}
        >
            {
                props.options.map((option, index) => <MenuItem key={index} value={getValueId(option)}> {getOptionLabel(option)} </MenuItem>)
            }
        </MSelect>
    )
}