import { Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step } from "../Domain/Steps/Models/Step";
import { Tag } from "../Domain/Tags/Models/Tag";
import { getPriorityTypeDisplayName } from "../Domain/Tasks/Models/Enums/PriorityType";
import { getTaskTypeDisplayName } from "../Domain/Tasks/Models/Enums/TaskType";
import { Task } from "../Domain/Tasks/Models/Task";
import { TasksProvider } from "../Domain/Tasks/TasksProvider";
import { CloseIconButton, DeleteIconButton, EditIconButton } from "./IconButton";

interface Props {
    task: Task | null
    step: Step | null
    tags: Tag[]
    onClose: () => void
    onTaskDelete: () => void
}

export function TaskInfo(props: Props) {

    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(props.task !== null)

    useEffect(() => {
        if (!props.task) return
        setOpen(true)
    }, [props.task])

    async function deleteTask() {
        await TasksProvider.RemoveTask(props.task!.id)
        setOpen(false)
        props.onTaskDelete()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            sx={(theme) => ({
                '& .MuiDialogContent-root': {
                    padding: theme.spacing(2),
                },
                '& .MuiDialogActions-root': {
                    padding: theme.spacing(1),
                },
            })
            }
            fullWidth
        >
            <Stack direction="row" justifyContent="space-between">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Задача '{props.task?.name}'
                </DialogTitle>
                <Box sx={{ mr: 1, mt: 1 }}>
                    <CloseIconButton
                        onClick={() => setOpen(false)}
                        iconSize="medium"
                        buttonSize="small"
                        sx={{
                            "svg": {
                                color: "#808080"
                            }
                        }}
                    />
                </Box>

            </Stack>
            <DialogContent dividers>
                <Stack direction="row" spacing={0.6} mb={1}>
                    <Typography fontWeight="bold">Описание:</Typography>
                    <Typography sx={{ wordBreak: "break-word" }}>
                        {props.task?.description}
                    </Typography>
                </Stack>
                {props.task !== null &&
                    <>
                        <Stack direction="row" spacing={0.6} mb={1}>
                            <Typography fontWeight="bold">Тип:</Typography>
                            <Typography> {getTaskTypeDisplayName(props.task.type)} </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.6} mb={1}>
                            <Typography fontWeight="bold">Приоритет:</Typography>
                            <Typography> {getPriorityTypeDisplayName(props.task!.priority)} </Typography>
                        </Stack>
                    </>
                }
                <Stack direction="row" spacing={0.6} mb={1}>
                    <Typography fontWeight="bold">Шаг:</Typography>
                    <Typography> {props.step?.name} </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography alignSelf="center" fontWeight="bold">Теги:</Typography>
                    <Stack direction="row" spacing={1}>
                        {
                            props.tags.map((tag) =>
                                <Chip key={tag.id} label={tag.name} sx={(theme) => ({
                                    backgroundColor: tag.color,
                                    color: theme.palette.getContrastText(tag.color)
                                })}
                                    size="small"
                                />
                            )
                        }
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <DeleteIconButton
                    onClick={deleteTask}
                    iconSize="medium"
                    buttonSize="medium"
                />
                <EditIconButton
                    onClick={() => navigate(`/tasks/edit/${props.task?.id}`)}
                    iconSize="medium"
                    buttonSize="medium"
                />
            </DialogActions>
        </Dialog>
    )
}