import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Numero from "./pages/Numero";
import Carregando from "./pages/Carregando";
import Relatorio from "./pages/Relatorio";
import RelatorioFeminino from "./pages/RelatorioFeminino";
import { Monitor } from "./pages/Monitor";
import Invisivel from "./pages/Invisivel";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Index} />
      <Route path={"/numero"} component={Numero} />
      <Route path={"/carregando"} component={Carregando} />
      <Route path={"/relatorio"} component={Relatorio} />
      <Route path={"/relatorio-feminino"} component={RelatorioFeminino} />
      <Route path={"/monitor"} component={Monitor} />
      <Route path={"/invisivel"} component={Invisivel} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
