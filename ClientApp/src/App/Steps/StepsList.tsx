import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../Common/Notification";
import { StepBlank } from "../../Domain/Steps/Models/StepBlank";
import { StepsProvider } from "../../Domain/Steps/StepsProvider";
import { ConfirmDialog } from "../../SharedComponents/ConfirmDialog";
import {
  AddIconButton,
  ArrowDownIconButton,
  ArrowUpIconButton,
  DeleteIconButton,
} from "../../SharedComponents/IconButton";
import { SnackBarAlert } from "../../SharedComponents/SnackBarAlert";
import { TextField } from "../../SharedComponents/TextField";

export function StepsList() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null)
  const [confirmDialogActive, setModalActive] = useState(false);

  const [removingStep, setRemovingStep] = useState<StepBlank | null>(null);

  const [stepBlanks, setStepBlanks] = useState<StepBlank[]>([]);

  useEffect(() => {
    loadSteps();
  }, []);

  async function loadSteps(): Promise<void> {
    const steps = await StepsProvider.getSteps();
    const stepBlanks = steps.map((step) => StepBlank.fromStep(step));

    if (stepBlanks.length === 0) stepBlanks.push(StepBlank.getEmpty());
    setStepBlanks(stepBlanks);
  }

  function changeStepBlankName(name: string, index: number) {
    setStepBlanks([
      ...stepBlanks.map((step) => {
        if (stepBlanks.indexOf(step) === index) step.name = name;
        return step;
      }),
    ])
  }

  function stepUp(index: number) {
    setStepBlanks((prevStepBlanks) => {
      const stepBlanks: StepBlank[] = [...prevStepBlanks];

      const prevStepBlank = stepBlanks[index - 1];
      const stepBlank = stepBlanks[index];

      stepBlanks[index] = { ...prevStepBlank };
      stepBlanks[index - 1] = { ...stepBlank };

      return stepBlanks;
    });
  }

  function stepDown(index: number) {
    setStepBlanks((prevStepBlanks) => {
      const stepBlanks: StepBlank[] = [...prevStepBlanks];

      const nextStepBlank = stepBlanks[index + 1];
      const stepBlank = stepBlanks[index];

      stepBlanks[index] = { ...nextStepBlank };
      stepBlanks[index + 1] = { ...stepBlank };

      return stepBlanks;
    });
  }

  async function removeStep() {

    if (removingStep!.id !== null) {
      const result = await StepsProvider.isStepEmpty(removingStep!.id)
      if (result.isFail()) return setNotification({ type: "error", message: `${result.getFirstErrorMessage()}` })
    }

    const index = stepBlanks.indexOf(removingStep!);
    stepBlanks.splice(index, 1);
    setStepBlanks((stepBlanks) => [...stepBlanks]);

  }

  function addStep() {
    setStepBlanks((prevSteps) => [...prevSteps, StepBlank.getEmpty()]);
  }

  async function saveSteps() {
    const result = await StepsProvider.saveSteps(stepBlanks);
    if (result.isSuccess()) setNotification({ type: "success", message: "Шаги успешно сохранены" })
    else setNotification({ type: "error", message: `${result.getFirstErrorMessage()}` })
  }

  return (
    <>
      <Box width={600} pl={3} pt={3}>

        <Stack direction="row" justifyContent={"space-between"} pt={2} pb={1}>
          <Button
            size="large"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={saveSteps}
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

        <Grid container spacing={3} mt={3}>
          <Grid xs={6} textAlign="center">
            <Typography variant="h4" >Имя</Typography>
          </Grid>
          <Grid xs={6} />

          {
            stepBlanks.map((stepBlank, index) => (
              <React.Fragment key={index}>
                <Grid xs={6} display="flex" alignItems="center">
                  <Box width="280px">
                    <TextField
                      value={stepBlank.name}
                      onChange={(name) => changeStepBlankName(name, index)}
                      label="Имя"
                    />
                  </Box>
                </Grid>
                <Grid xs={2}>
                  <Stack textAlign="center">
                    <Box>
                      <ArrowUpIconButton onClick={() => stepUp(index)} disabled={index === 0} />
                    </Box>
                    <Box>
                      <ArrowDownIconButton onClick={() => stepDown(index)} disabled={index === stepBlanks.length - 1} />
                    </Box>
                  </Stack>
                </Grid>
                <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
                  <Box>
                    <DeleteIconButton onClick={() => {
                      setRemovingStep({ ...stepBlank, name: stepBlank.name })
                      setModalActive(true)
                    }}
                    />
                  </Box>
                </Grid>
                <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
                  {index === stepBlanks.length - 1 && (
                    <Box>
                      <AddIconButton onClick={addStep} />
                    </Box>
                  )}
                </Grid>
              </React.Fragment>
            ))
          }

        </Grid>
      </Box>

      <SnackBarAlert notification={notification} />

      <ConfirmDialog
        isOpen={confirmDialogActive}
        dialogTtileLabel="Удалить шаг"
        dialogDescription={`Вы действительно хотите удалить шаг ${removingStep?.name ? `"${removingStep.name}"` : ''}?`}
        onAgree={() => {
          removeStep();
          setModalActive(false);
        }}
        onClose={() => setModalActive(false)}
      />

    </>
  );
}
