import ReactDOM from 'react-dom/client';
import {App} from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux';
import { BrowserRouter } from 'react-router-dom';
import './firebase';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);