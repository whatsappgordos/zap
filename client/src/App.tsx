import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Numero from "./pages/Numero";
import Carregando from "./pages/Carregando";
import Relatorio from "./pages/Relatorio";
import RelatorioFeminino from "./pages/RelatorioFeminino";
import Monitor from "./pages/Monitor";
import Invisivel from "./pages/Invisivel";
import LandingPage from "./pages/LandingPage";
import SEOPageV2 from "./pages/SEOPageV2";
import Cariani from "./pages/Cariani"; // Importação da nova página

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/google" component={SEOPageV2} />
      <Route path="/cariani" component={Cariani} /> {/* Nova rota */}

      <Route path="/numero" component={Numero} />
      <Route path="/carregando" component={Carregando} />
      <Route path="/relatorio" component={Relatorio} />
      <Route path="/relatorio-feminino" component={RelatorioFeminino} />
      <Route path="/monitor" component={Monitor} />
      <Route path="/invisivel" component={Invisivel} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
