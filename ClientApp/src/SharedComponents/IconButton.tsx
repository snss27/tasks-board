import { Theme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton as MIconButton, SxProps } from "@mui/material";
import { Tooltip } from "./Tooltip";
import CloseIcon from '@mui/icons-material/Close';

interface IconButtonProps {
  onClick: () => void,
  children: JSX.Element,
  disabled?: boolean,
  buttonSize?: "large" | "medium" | "small",
  tooltipTitle?: string,
  placement?: 'top' | 'bottom' | 'left' | 'right'
  sx?: SxProps<Theme>
}

export function IconButton(props: IconButtonProps) {
  return (
    <Tooltip title={props.tooltipTitle} placement={props.placement}>
      <MIconButton
        disabled={props.disabled}
        onClick={props.onClick}
        size={props.buttonSize ?? "large"}
        sx={props.sx}
      >
        {props.children}
      </MIconButton>
    </Tooltip>
  )
}


interface IconProps {
  onClick: () => void,
  disabled?: boolean,
  buttonSize?: "large" | "medium" | "small",
  iconSize?: "inherit" | "large" | "medium" | "small",
  sx?: SxProps<Theme>
}


export function DeleteIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Удалить"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <DeleteIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  );
}

export function ArrowUpIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Вверх"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      placement="right"
      sx={props.sx}
    >
      <ArrowUpwardIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function ArrowDownIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Вниз"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      placement="right"
      sx={props.sx}
    >
      <ArrowDownwardIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function AddIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Добавить"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <AddIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function EditIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Редактировать"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <ModeEditIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function ArrowBackIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Назад"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <ArrowBackIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function ArrowForwardIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Вперёд"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <ArrowForwardIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function InfoIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Информация"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <InfoIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}

export function CloseIconButton(props: IconProps) {
  return (
    <IconButton
      onClick={props.onClick}
      tooltipTitle="Закрыть"
      disabled={props.disabled}
      buttonSize={props.buttonSize}
      sx={props.sx}
    >
      <CloseIcon fontSize={props.iconSize ?? "large"} sx={{ color: "#000" }} />
    </IconButton>
  )
}
