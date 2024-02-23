import { Theme } from "@emotion/react";
import {
  Card,
  CardContent,
  Chip,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Tag } from "../Domain/Tags/Models/Tag";
import { PriorityType } from "../Domain/Tasks/Models/Enums/PriorityType";
import { TaskType } from "../Domain/Tasks/Models/Enums/TaskType";
import { Task } from "../Domain/Tasks/Models/Task";
import {
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  TypeBugIcon,
  TypeTaskIcon,
} from "./Icon";
import {
  ArrowBackIconButton,
  ArrowForwardIconButton,
  EditIconButton,
  InfoIconButton,
} from "./IconButton";

interface Props {
  task: Task;
  tags: Tag[];
  sx?: SxProps<Theme>;
  disabledBackButton?: boolean;
  disabledNextButton?: boolean;
  key?: string | number;
  onClickBack: () => void;
  onClickNext: () => void;
  onClickInfo: (task: Task) => void;
}

export function TaskCard(props: Props) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography variant="h5">{props.task.name}</Typography>
          <Stack direction="row" spacing={1}>
            <EditIconButton
              onClick={() => navigate(`/tasks/edit/${props.task.id}`)}
              iconSize="medium"
              buttonSize="small"
            />
            <InfoIconButton
              onClick={() => props.onClickInfo(props.task)}
              iconSize="medium"
              buttonSize="small"
            />
          </Stack>
        </Stack>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={1}
          sx={{
            height: 40,
            wordWrap: "break-word",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.task.description}
        </Typography>
        <Stack direction="row" spacing={1} mb={0.5} minHeight={40}>
          {props.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              sx={(theme) => ({
                backgroundColor: tag.color,
                color: theme.palette.getContrastText(tag.color),
              })}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1} mb={-2}>
          {props.task.type === TaskType.Task ? (
            <TypeTaskIcon />
          ) : (
            <TypeBugIcon />
          )}

          {props.task.priority === PriorityType.Low && <LowPriorityIcon />}
          {props.task.priority === PriorityType.Medium && (
            <MediumPriorityIcon />
          )}
          {props.task.priority === PriorityType.High && <HighPriorityIcon />}

          <ArrowBackIconButton
            onClick={props.onClickBack}
            disabled={props.disabledBackButton}
            iconSize="medium"
            buttonSize="small"
          />
          <ArrowForwardIconButton
            onClick={props.onClickNext}
            disabled={props.disabledNextButton}
            iconSize="medium"
            buttonSize="small"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
