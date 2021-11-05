import { BrowserRouter, Route } from "react-router-dom";
import Questions from "./Questions";
import Prompt from "./Prompt";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <BrowserRouter>
          {/* <Switch> */}
          <Route path="/prompt" component={Prompt} exact></Route>
          <Route path="/questions" component={Questions}></Route>
          {/* </Switch> */}
        </BrowserRouter>
      </Box>
    </Container>
  );
};

export default App;
