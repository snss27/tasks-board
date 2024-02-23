import { Theme } from "@emotion/react"
import { Pagination as MPagination, Stack, SxProps, Typography } from "@mui/material"
import { Select } from "./Select"


interface Props {
    totalRows: number
    currentPage: number
    countInPage: number
    countInPageVariants: number[]
    sx?: SxProps<Theme>
    onChangeCurrentPage: (pageNumber: number) => void
    onChangeCountInPage: (countInPage: number) => void
    getTotalRowsLabel: () => string
    getCountInPageLabel: (countInPage: number) => string
}

export function Pagination(props: Props) {

    function getPagesCount() {
        return Math.ceil(props.totalRows / props.countInPage)
    }

    return (

        <Stack direction="row" justifyContent="space-between" sx={props.sx}>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>{props.getTotalRowsLabel()}</Typography>
            <MPagination
                count={getPagesCount()}
                page={props.currentPage}
                onChange={(_, value) => props.onChangeCurrentPage(value)}
                sx={{ alignSelf: "center" }}
            />
            <Select
                value={props.countInPage}
                onChange={(value) => props.onChangeCountInPage(+value)}
                options={props.countInPageVariants}
                getOptionLabel={(option) => props.getCountInPageLabel(option)}
                sx={{ minWidth: 120 }}
                getValueId={(option) => option.toString()}
            />
        </Stack >

    )
}