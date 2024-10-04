import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProjectsTab, Tabs, UnitsTab } from '@/components';

const Dashboard: React.FC = () => {
  return (
    <>
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item
          title={
            <p className="capitalize">
              <FormattedMessage id="projects-view" />
            </p>
          }
        >
          <ProjectsTab />
        </Tabs.Item>
        <Tabs.Item
          title={
            <p className="capitalize">
              <FormattedMessage id="units-view" />
            </p>
          }
        >
          <div className="p-4">
            <UnitsTab />
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export { Dashboard };
