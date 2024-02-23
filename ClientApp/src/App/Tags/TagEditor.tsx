import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkErrorKey } from "../../Common/CheckErrorKey";
import { getHelperText } from "../../Common/GetHelperText";
import { Result } from "../../Common/Result";
import { TagBlank } from "../../Domain/Tags/Models/TagBlank";
import { TagsProvider } from "../../Domain/Tags/TagsProvider";
import { ColorField } from "../../SharedComponents/ColorField";
import { TextField } from "../../SharedComponents/TextField";

export function TagEditor() {
    const navigate = useNavigate()
    const params = useParams<{ tagId: string }>()
    const [result, setResult] = useState<Result | null>(null)

    const [tagBlank, setTagBlank] = useState<TagBlank>(TagBlank.getEmpty())

    useEffect(() => {
        async function loadTag() {
            const tagId = params.tagId
            if (!tagId) return
            const tag = await TagsProvider.getTag(tagId)
            setTagBlank(TagBlank.fromTag(tag))
        }
        loadTag()
    }, [])

    async function saveTag() {
        const result = await TagsProvider.saveTag(tagBlank)
        if (result?.isSuccess()) navigate(-1)
        setResult(result)
    }

    return (
        <Box>
            <Box pl={3} pt={3} maxWidth={280}>

                <Typography variant="h4" component="h1">
                    Редактор
                </Typography>

                <Stack direction="row" justifyContent={"space-between"} pt={2} pb={1}>
                    <Button
                        size="large"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={saveTag}
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
                    label="Имя"
                    value={tagBlank.name}
                    onChange={(changedText) => setTagBlank({ ...tagBlank, name: changedText })}
                    error={checkErrorKey("name", result)}
                    helperText={getHelperText("name", result)}
                />

                <ColorField
                    label="Цвет"
                    value={tagBlank.color}
                    onChange={(cahngedColor) => setTagBlank({ ...tagBlank, color: cahngedColor })}
                    error={checkErrorKey("color", result)}
                    helperText={getHelperText("color", result)}
                />

            </Box>
        </Box>
    )
}