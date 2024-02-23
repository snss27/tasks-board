import { Box, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "../../Domain/Tags/Models/Tag";
import { TagsProvider } from "../../Domain/Tags/TagsProvider";
import { ConfirmDialog } from "../../SharedComponents/ConfirmDialog";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton
} from "../../SharedComponents/IconButton";
import { Pagination } from "../../SharedComponents/Pagination";
import { TextField } from "../../SharedComponents/TextField";

interface Filter {
  currentPage: number;
  countInPage: number;
  searchText: string;
}

namespace Filter {
  export function getDefaultFilter(countInPage: number): Filter {
    return {
      countInPage: countInPage,
      currentPage: 1,
      searchText: "",
    };
  }
}

export function TagsList() {
  const TableHeaderItem = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.h4,
    textAlign: 'center',
  }));

  const TableBodyItem = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.h5,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }));

  const countInPageVariants = [5, 10, 15];

  const navigate = useNavigate();
  const [confirmDialogActive, setModalActive] = useState(false);

  const [filter, setFilter] = useState(Filter.getDefaultFilter(countInPageVariants[0]));
  const [totalRows, setTotalRows] = useState<number>(0);

  const [tags, setTags] = useState<Tag[]>([]);
  const [removingTag, setRemovingTag] = useState<Tag | null>(null);

  useEffect(() => {
    async function loadTags() {
      const page = await TagsProvider.getPage(
        filter.searchText,
        filter.currentPage,
        filter.countInPage
      );
      setTotalRows(page.totalRows);
      setTags(page.values);
    }

    loadTags();
  }, [filter]);

  async function removeTag() {
    await TagsProvider.removeTag(removingTag!.id);
    setFilter((filter) => ({ ...filter }));
  }

  return (
    <>
      <Box width={680} pl={3} pt={3}>

        <Stack direction="row" justifyContent="space-between" display="flex" sx={{ pl: 3 }}>

          <TextField
            value={filter.searchText}
            onChange={(text) => setFilter({ ...filter, searchText: text })}
            label="Поиск по имени"
            sx={{ width: 200 }}
          />

          <Box display="flex" alignItems="center">
            <AddIconButton onClick={() => navigate(`/tags/add`)} />
          </Box>

        </Stack>

        <Grid container spacing={3} mb={1.5} mt={2}>
          <Grid xs={3}>
            <TableHeaderItem>Номер</TableHeaderItem>
          </Grid>
          <Grid xs={3}>
            <TableHeaderItem>Имя</TableHeaderItem>
          </Grid>
          <Grid xs={3}>
            <TableHeaderItem>Цвет</TableHeaderItem>
          </Grid>
          <Grid xs={3}>
          </Grid>
          {
            tags.map((tag, index) => (
              <React.Fragment key={tag.id}>
                <Grid xs={3} sx={{ verticalAlign: "center" }}>
                  <TableBodyItem>{index + 1}</TableBodyItem>
                </Grid>
                <Grid xs={3}>
                  <TableBodyItem>{tag.name}</TableBodyItem>
                </Grid>
                <Grid xs={3} textAlign="center">
                  <TableBodyItem sx={{ backgroundColor: tag.color, borderRadius: "5rem", width: "35%", margin: "auto" }}></TableBodyItem>
                </Grid>
                <Grid xs={3}>
                  <Stack direction="row" justifyContent="space-between" >
                    <EditIconButton
                      disabled={false}
                      onClick={() => navigate(`/tags/edit/${tag.id}`)}
                    />
                    <DeleteIconButton
                      disabled={false}
                      onClick={() => {
                        setRemovingTag(tag);
                        setModalActive(true);
                      }}
                    />
                  </Stack>
                </Grid>
              </React.Fragment>
            ))
          }
        </Grid>

        <Pagination
          totalRows={totalRows}
          currentPage={filter.currentPage}
          countInPage={filter.countInPage}
          countInPageVariants={countInPageVariants}
          sx={{ pl: 3, pt: 2 }}
          getTotalRowsLabel={() => `Всего тегов: ${totalRows}`}
          onChangeCurrentPage={(currentPage) => setFilter({ ...filter, currentPage })}
          onChangeCountInPage={(countInPage) => setFilter({ ...filter, countInPage, currentPage: 1, })}
          getCountInPageLabel={(countInPage) => `${countInPage} тегов`}
        />
      </Box >

      <ConfirmDialog
        isOpen={confirmDialogActive}
        dialogTtileLabel="Удалить тег"
        dialogDescription={`Вы действительно хотите удалить тег "${removingTag?.name}"`}
        onAgree={() => {
          removeTag();
          setModalActive(false);
        }}
        onClose={() => setModalActive(false)}
      />

    </>
  );
}
