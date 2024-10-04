import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProjectsTab, Tabs, UnitsTab } from '@/components';

const Dashboard: React.FC = () => {
  return (
    <>
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          <ProjectsTab />
        </Tabs.Item>
        <Tabs.Item title={<FormattedMessage id="units-view" />} id="units-view">
          <div className="p-4">
            <UnitsTab />
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export { Dashboard };
