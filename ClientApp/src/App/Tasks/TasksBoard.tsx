import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step } from "../../Domain/Steps/Models/Step";
import { StepsProvider } from "../../Domain/Steps/StepsProvider";
import { Tag } from "../../Domain/Tags/Models/Tag";
import { TagsProvider } from "../../Domain/Tags/TagsProvider";
import { Task } from "../../Domain/Tasks/Models/Task";
import { TasksProvider } from "../../Domain/Tasks/TasksProvider";
import { AddIconButton } from "../../SharedComponents/IconButton";
import { TaskCard } from "../../SharedComponents/TaskCard";
import { TaskInfo } from "../../SharedComponents/TaskInfo";
import { TextField } from "../../SharedComponents/TextField";

export function TasksBoard() {
    const navigate = useNavigate();

    const [steps, setSteps] = useState<Step[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const [searchText, setSearchText] = useState<string | null>(null);

    const [modalTask, setModalTask] = useState<Task | null>(null);

    useEffect(() => {
        async function loadData() {
            const steps = await StepsProvider.getSteps();
            setSteps(steps);

            const tasks = await TasksProvider.getTasksByStepIds(
                searchText,
                steps.map((step) => step.id)
            );
            setTasks(tasks);

            const tagIds = tasks.flatMap(task => task.tagIds).distinct()
            const tags = await TagsProvider.getTags(tagIds);
            setTags(tags);
        }

        loadData();
    }, []);

    useEffect(() => {
        loadTasksAndTags();
    }, [searchText]);

    async function loadTasksAndTags() {
        const tasks = await TasksProvider.getTasksByStepIds(
            searchText,
            steps.map((step) => step.id)
        );
        setTasks(tasks);

        const tagIds = tasks.flatMap((task) => task.tagIds).distinct();
        const tags = await TagsProvider.getTags(tagIds);
        setTags(tags);
    }

    async function moveTask(taskId: string, stepId: string) {
        await TasksProvider.moveTask(taskId, stepId);
        loadTasksAndTags();
    }

    console.log(modalTask)

    return (
        <Box pl={10} pt={3} pr={10} >
            <Stack direction="row" justifyContent="space-between" sx={{ pb: 3 }}>
                <Stack minWidth={250}>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        Доска задач
                    </Typography>
                    <TextField
                        value={searchText}
                        onChange={(searchText) => setSearchText(searchText)}
                        label="Поиск по имени"
                    />
                </Stack>
                <Box display="flex" alignItems="flex-end">
                    <AddIconButton onClick={() => navigate("/tasks/add")} />
                </Box>
            </Stack>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${steps.length}, minmax(250px, 1fr))`,
                overflowX: 'auto',
                gap: 2
            }}>
                {steps.map((step, stepIndex) => (
                    <div className="tasks-board__item">
                        <Typography variant="h5" gutterBottom pt={1} pl={1}>
                            {step.name}
                        </Typography>
                        <Stack ml={1} mr={1} spacing={2} pb={1}>
                            {tasks.filter((task) => task.stepId === step.id).map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    tags={tags.filter((tag) => task.tagIds.includes(tag.id))}
                                    disabledBackButton={stepIndex === 0}
                                    disabledNextButton={stepIndex === steps.length - 1}
                                    onClickBack={() => moveTask(task.id, steps[stepIndex - 1].id)}
                                    onClickNext={() => moveTask(task.id, steps[stepIndex + 1].id)}
                                    onClickInfo={(task) => setModalTask({ ...task })}
                                />
                            ))
                            }
                        </Stack>
                    </div>
                ))
                }
            </Box>
            <TaskInfo
                task={modalTask}
                step={steps.find((step) => step.id === modalTask?.stepId) ?? null}
                tags={tags.filter((tag) => modalTask?.tagIds.includes(tag.id))}
                onClose={() => setModalTask(null)}
                onTaskDelete={() => {
                    loadTasksAndTags()
                    setModalTask(null)
                }}
            />
        </Box>
    );
}
