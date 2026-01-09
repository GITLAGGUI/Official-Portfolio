import { Box, Divider, Grid, GridItem, Show } from "@chakra-ui/react";
import ToolBar from "./components/ToolBar";
import ActivityBar from "./components/ActivityBar";
import Explorer from "./components/Explorer";
import HomeEnhanced from "./pages/HomeEnhanced";
import TabsBar from "./components/TabsBar";
import { useState } from "react";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Theme from "./pages/Theme";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";

function App() {
  const [selectedPage, setSelectedPage] = useState("home.js");
  return (
    <>
      <Grid
        templateAreas={{
          base: `"tool tool" "main main" "footer footer"`,
          md: `"tool tool" "activity main" "footer footer"`,
          lg: `"tool tool tool" "activity explorer main" "footer footer footer"`,
        }}
        templateColumns={{
          base: "1fr",
          md: "50px 1fr",
          lg: "70px 250px 1fr",
        }}
        templateRows="auto 1fr 32px"
        height="100vh"
      >
        <GridItem area="tool" marginTop={2}>
          <ToolBar selectedPage={selectedPage} onSelectPage={setSelectedPage} />
          <Divider orientation="horizontal" marginTop={1} />
        </GridItem>
        <Show above="md">
          <GridItem area="activity" height="100%">
            <ActivityBar
              selectedPage={selectedPage}
              onSelectPage={setSelectedPage}
            />
          </GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="explorer" height="100%">
            <Explorer
              selectedPage={selectedPage}
              onSelectPage={setSelectedPage}
            />
          </GridItem>
        </Show>
        <GridItem area="main" overflowX={"auto"} overflow={{ base: "auto", md: "hidden" }}>
          <TabsBar selectedTab={selectedPage} onSelectTab={setSelectedPage} />
          <Box 
            overflowY={{ base: "auto", md: selectedPage === "home.js" ? "hidden" : "auto" }}
            height="calc(100% - 40px)" 
            pb={{ base: "80px", md: "32px" }}
          >
            <Routes>
              <Route path="/" element={<HomeEnhanced setPage={setSelectedPage} />} />
              <Route
                path="/about"
                element={<About setPage={setSelectedPage} />}
              />
              <Route
                path="/projects"
                element={<Projects setPage={setSelectedPage} />}
              />
              <Route
                path="/projects/:id"
                element={<ProjectDetail setPage={setSelectedPage} />}
              />
              <Route
                path="/contact"
                element={<Contact setPage={setSelectedPage} />}
              />

              <Route
                path="/theme"
                element={<Theme setPage={setSelectedPage} />}
              />
            </Routes>
          </Box>
        </GridItem>

        <GridItem area="footer" marginX="2px" height="32px" display={{ base: "none", md: "block" }}>
          <Footer />
        </GridItem>
      </Grid>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  );
}

export default App;