import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_API_KEY || 'dummy');
bugsnagClient.use(bugsnagReact, React);

const ErrorBoundary = bugsnagClient.getPlugin('react');

export { bugsnagClient, ErrorBoundary };