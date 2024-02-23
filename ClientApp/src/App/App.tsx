import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../Common/Distinct';
import { Header } from "./Header";
import { Home } from "./Home";
import { StepsList } from "./Steps/StepsList";
import { TagEditor } from "./Tags/TagEditor";
import { TagsList } from "./Tags/TagsList";
import { TaskEditor } from "./Tasks/TaskEditor";
import { TasksBoard } from "./Tasks/TasksBoard";

export function App() {

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/tagsList" element={<TagsList />} />
            <Route path="/tags/add" element={<TagEditor />} />
            <Route path="/tags/edit/:tagId?" element={<TagEditor />} />
            <Route path="/stepsList" element={<StepsList />} />
            <Route path="/tasks/board" element={<TasksBoard />} />
            <Route path="/tasks/add" element={<TaskEditor />} />
            <Route path="/tasks/edit/:taskId?" element={<TaskEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
