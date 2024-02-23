import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PestControlIcon from '@mui/icons-material/PestControl';
import TaskIcon from '@mui/icons-material/Task';
import { Tooltip } from './Tooltip';

interface Props {
    fontSize?: "large" | "medium" | "small" | "inherit",
    placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function LowPriorityIcon(props: Props) {
    return (
        <Tooltip title='Низкий приоритет' placement={props.placement}>
            <KeyboardDoubleArrowDownIcon fontSize={props.fontSize ?? "large"} />
        </Tooltip>
    )
}

export function HighPriorityIcon(props: Props) {
    return (
        <Tooltip title='Высокий приоритет' placement={props.placement}>
            <KeyboardDoubleArrowUpIcon fontSize={props.fontSize ?? "large"} />
        </Tooltip>
    )
}

export function MediumPriorityIcon(props: Props) {
    return (
        <Tooltip title='Средний приоритет' placement={props.placement}>
            <DragHandleIcon fontSize={props.fontSize ?? "large"} />
        </Tooltip>
    )
}

export function TypeBugIcon(props: Props) {
    return (
        <Tooltip title='Баг' placement={props.placement}>
            <PestControlIcon fontSize={props.fontSize ?? "large"} />
        </Tooltip>
    )
}

export function TypeTaskIcon(props: Props) {
    return (
        <Tooltip title='Задача' placement={props.placement}>
            <TaskIcon fontSize={props.fontSize ?? "large"} />
        </Tooltip>
    )
}