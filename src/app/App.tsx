import AppProvider from './AppProvider';
import { AppRouter } from './routes';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
