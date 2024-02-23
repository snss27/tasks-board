import {
  AppBar,
  Button,
  Stack,
  SxProps,
  Theme,
  Toolbar
} from "@mui/material";
import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

interface NavigationItem {
  label: string;
  path: string;
}

export function Header() {
  const navItems = useMemo<NavigationItem[]>(
    () => [
      {
        label: "Главная",
        path: "/",
      },
      {
        label: "Задачи",
        path: "/tasks/board",
      },
      {
        label: "Теги",
        path: "/tagsList",
      },
      {
        label: "Шаги",
        path: "/stepsList",
      },
    ],
    []
  );

  const location = useLocation();

  const buttonStyle: SxProps<Theme> = (theme) => ({
    color: "#fff",
    fontSize: "1.35rem",
    "&.selected": {
      color: "#d0d0d6"
    },
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={2} direction="row">
            {navItems.map((item, index) => (
              <Button
                key={index}
                href={item.path}
                sx={buttonStyle}
                className={
                  location.pathname.endsWith(item.path) ? "selected" : undefined
                }
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
