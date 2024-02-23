import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkErrorKey } from "../../Common/CheckErrorKey";
import { getHelperText } from "../../Common/GetHelperText";
import { Notification } from "../../Common/Notification";
import { Result } from "../../Common/Result";
import { Step } from "../../Domain/Steps/Models/Step";
import { StepsProvider } from "../../Domain/Steps/StepsProvider";
import { Tag } from "../../Domain/Tags/Models/Tag";
import { TagsProvider } from "../../Domain/Tags/TagsProvider";
import { PriorityType } from "../../Domain/Tasks/Models/Enums/PriorityType";
import { TaskType } from "../../Domain/Tasks/Models/Enums/TaskType";
import { TaskBlank } from "../../Domain/Tasks/Models/TaskBlank";
import { TasksProvider } from "../../Domain/Tasks/TasksProvider";
import { AsyncMultiAutocomplete } from "../../SharedComponents/AsyncAutocomplete";
import { Select } from "../../SharedComponents/Select";
import { SnackBarAlert } from "../../SharedComponents/SnackBarAlert";
import { TextField } from "../../SharedComponents/TextField";



export function TaskEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ taskId: string }>()

  const [notification, setNotification] = useState<Notification | null>(null)

  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null)

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [taskBlank, setTaskBlank] = useState<TaskBlank>(TaskBlank.getEmpty());
  const [saveResult, setSaveResult] = useState<Result | null>(null);

  useEffect(() => {


    async function initEditor() {
      const steps = await StepsProvider.getSteps();
      setSteps(steps);

      const taskId = params.taskId
      if (!taskId) return

      const task = await TasksProvider.getTask(taskId)
      setTaskBlank(TaskBlank.fromTask(task))
      setSelectedStep(steps.find(step => step.id === task.stepId) ?? null)


      const tags = await TagsProvider.getTags(task.tagIds)
      setSelectedTags(tags)
    }
    initEditor()

  }, []);

  async function getTags(searchText: string | null) {
    const tags = await TagsProvider.searchTags(searchText);
    setTags(tags);
  }

  async function saveTask() {
    const result = await TasksProvider.saveTask(taskBlank);
    if (result.isSuccess()) {
      if (location.pathname.includes("/tasks/edit")) return navigate(-1)
      setTaskBlank(TaskBlank.getEmpty())
      setSelectedTags([])
      setNotification({ type: "success", message: "Задача успешно сохранена" })
    }
    else {
      if (result.getFirstErrorKey() !== "name" && result.getFirstErrorKey() !== "description")
        setNotification({ type: "error", message: `${result.getFirstErrorMessage()}` })
    }
    setSaveResult(result);
  }

  function onChangePriority(priority: PriorityType | null) {
    setTaskBlank({ ...taskBlank, priority });
  }

  function onChangeType(type: TaskType | null) {
    setTaskBlank({ ...taskBlank, type });
  }

  function onChangeStep(step: Step | null) {
    setTaskBlank({ ...taskBlank, stepId: step?.id ?? null });
    setSelectedStep(step)
  }

  return (
    <>
      <Box>
        <Box maxWidth={280} pl={3} pt={3}>

          <Typography variant="h4" component="h1">
            Соханить задачу
          </Typography>

          <Stack direction="row" justifyContent={"space-between"} pt={2}>
            <Button
              size="large"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={saveTask}
            >
              Сохранить
            </Button>
            <Button
              size="large"
              variant="text"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
          </Stack>

          <TextField
            value={taskBlank.name}
            onChange={(changedName) => setTaskBlank({ ...taskBlank, name: changedName })}
            label="Имя"
            error={checkErrorKey("name", saveResult)}
            helperText={getHelperText("name", saveResult)}
            required
          />

          <TextField
            value={taskBlank.description}
            onChange={(changedDescription) => { setTaskBlank({ ...taskBlank, description: changedDescription }) }}
            label="Описание задачи"
            error={checkErrorKey("description", saveResult)}
            helperText={getHelperText("description", saveResult)}
            required
            multiline
            rows={5}
          />

          <Stack spacing={2} direction="column" pt={1} pb={2}>
            <Box>
              <Typography variant="h5">Приоритет *</Typography>
              <ToggleButtonGroup
                size="large"
                value={taskBlank.priority}
                exclusive
                onChange={(_, value) => onChangePriority(value)}
              >
                <ToggleButton value={PriorityType.Low} color="primary">
                  Низкий
                </ToggleButton>
                <ToggleButton value={PriorityType.Medium} color="warning">
                  Средний
                </ToggleButton>
                <ToggleButton value={PriorityType.High} color="error">
                  Высокий
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box>
              <Typography variant="h5">Тип *</Typography>
              <ToggleButtonGroup
                size="large"
                value={taskBlank.type}
                exclusive
                onChange={(_, value) => onChangeType(value)}
              >
                <ToggleButton value={TaskType.Task} color="success">
                  Задача
                </ToggleButton>
                <ToggleButton value={TaskType.Bug} color="secondary">
                  Баг
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>

          <Stack>
            <Typography variant="h5">Шаг *</Typography>

            <Select
              value={selectedStep}
              options={steps}
              onChange={(step) => onChangeStep(step)}
              getOptionLabel={(option) => option?.name ?? ''}
              getValueId={(option) => option?.id ?? ''}
            />

          </Stack>

          <AsyncMultiAutocomplete
            label="Теги"
            values={selectedTags}
            options={tags}
            onChange={(newTags) => {
              setSelectedTags(newTags);
              setTaskBlank((taskBlank) => ({
                ...taskBlank,
                tagIds: newTags.map((tag) => tag.id),
              }));
            }}
            onInputTextChange={getTags}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ mb: 2, mt: 3 }}
          />

          <SnackBarAlert notification={notification} />

        </Box>
      </Box>
    </>
  );
}