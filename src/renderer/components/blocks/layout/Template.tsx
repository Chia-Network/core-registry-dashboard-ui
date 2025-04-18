import { ErrorBoundary } from '@/pages';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import { useManageSavedLocation } from '@/hooks/useManageSavedLocation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Template = () => {
  const isCoreRegistryUiApp = useSelector((state: RootState) => state.app.isCoreRegistryUiApp);
  useManageSavedLocation();

  return (
    <ErrorBoundary>
      <div id="app" className="dark:bg-gray-800 w-full h-dvh">
        <Header />
        <div id="body" className="w-full h-full flex md:flex-row">
          <div id="content" className="w-full relative dark:text-white">
            <ErrorBoundary>
              <div style={{ height: isCoreRegistryUiApp ? '100vh' : 'calc(100vh - 64px)' }}>
                <Outlet />
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { Template };
