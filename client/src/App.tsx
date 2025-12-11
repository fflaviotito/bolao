import { ThemeProvider } from 'styled-components';
import { TemaPadrao } from './styles/Temas';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './contexts';

const App = () => {
    return (
        <ThemeProvider theme={TemaPadrao}>
            <GlobalStyles />
            <AppProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </AppProvider>
        </ThemeProvider>
    );
};

export default App;
