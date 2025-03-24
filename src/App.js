import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { auth } from "firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import NotFound from "layouts/authentication/404";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [user, setUser] = useState(null);

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [window.location.pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        // Protect Dashboard and Profile routes
        if (["/dashboard", "/profile"].includes(route.route)) {
          return (
            <Route
              exact
              path={route.route}
              render={() => (user ? <route.component /> : <Redirect to="/authentication/404" />)}
              key={route.key}
            />
          );
        }
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }
      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return (
    <Router>
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && user && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand=""
                  brandName="Bakery Dashboard"
                  routes={routes.filter((route) => route.type !== "route-only" && route.key !== "sign-in")}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            <Switch>
              {getRoutes(routes)}
              <Route exact path="/authentication/sign-in" component={SignIn} />
              <Route exact path="/authentication/sign-up" component={SignUp} />
              <Route exact path="/authentication/404" component={NotFound} />
              <Route path="*" render={() => <Redirect to={user ? "/dashboard" : "/dashbaord"} />} />
            </Switch>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {layout === "dashboard" && user && (
            <>
              <Sidenav
                color={sidenavColor}
                brand=""
                brandName="Bakery Dashboard"
                routes={routes.filter((route) => route.type !== "route-only" && route.key !== "sign-in")}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          <Switch>
            {getRoutes(routes)}
            <Route exact path="/authentication/sign-in" component={SignIn} />
            <Route exact path="/authentication/sign-up" component={SignUp} />
            <Route exact path="/authentication/404" component={NotFound} />
            <Route path="*" render={() => <Redirect to={user ? "/dashboard" : "/dashboard"} />} />
          </Switch>
        </ThemeProvider>
      )}
    </Router>
  );
}