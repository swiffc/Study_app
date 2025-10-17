import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('../pages/Dashboard.tsx'));
const WorkbookView = lazy(() => import('../pages/WorkbookView.tsx'));
const ManifestationHub = lazy(() => import('../pages/ManifestationHub.tsx'));
const GoalsPage = lazy(() => import('../pages/GoalsPage.tsx'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage.tsx'));
const SettingsPage = lazy(() => import('../pages/SettingsPage.tsx'));
const DailyFocusPage = lazy(() => import('../pages/DailyFocusPage.tsx'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: 'workbook/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WorkbookView />
          </Suspense>
        )
      },
      {
        path: 'manifestation',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ManifestationHub />
          </Suspense>
        )
      },
      {
        path: 'goals',
        element: (
          <Suspense fallback={<PageLoader />}>
            <GoalsPage />
          </Suspense>
        )
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnalyticsPage />
          </Suspense>
        )
      },
      {
        path: 'daily-focus',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DailyFocusPage />
          </Suspense>
        )
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        )
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
