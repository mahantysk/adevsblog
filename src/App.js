import { Button, Grommet, grommet, Header, Page, PageContent, PageHeader, Text } from 'grommet';
import { Moon, Sun } from "grommet-icons";
import React, { useState } from "react";

import { deepMerge } from 'grommet/utils';


const AppBar = (props) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    {...props} />
)

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

function App() {
  const [dark, setDark] = useState(false);

  return (
    <Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'}>
      <Page>
        <AppBar>
          <Text size="large">My App</Text>
          <Button
            a11yTitle={dark ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            icon={dark ? <Moon /> : <Sun />}
            onClick={() => setDark(!dark)}
          />
        </AppBar>
        <PageContent>
          <PageHeader title="Welcome to my blog" />
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
