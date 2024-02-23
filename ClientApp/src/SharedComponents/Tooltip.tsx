import { Tooltip as MTooltip, Typography, Zoom } from "@mui/material"

interface TooltipProps {
    children: JSX.Element
    title?: string,
    placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip(props: TooltipProps) {
    return (
        <MTooltip
            title={<Typography component="label" fontSize="0.9rem">{props.title}</Typography>}
            arrow
            TransitionComponent={Zoom}
            enterDelay={300}
            leaveDelay={100}
            placement={props.placement}
        >
            <span>
                {props.children}
            </span>
        </MTooltip>
    )
}