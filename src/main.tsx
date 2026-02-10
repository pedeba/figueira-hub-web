import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';
import { Toast } from 'radix-ui';
import styles from './components/ui/radix/toast.module.css';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Toast.Provider duration={3000}>
        <App />
        <Toast.Viewport className={styles.Viewport} />
      </Toast.Provider>
    </React.StrictMode>,
  );
}
