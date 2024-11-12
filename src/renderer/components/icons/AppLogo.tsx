import logo from '@/assets/img/Dashboard.svg';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

interface AppLogoProps {
  width: string;
  height: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ width, height }) => {
  const intl: IntlShape = useIntl();
  return (
    <div className="flex items-center w-full align-center lg:max-w-md">
      <div className="flex">
        <img src={logo} alt="logo" width={width} height={height} />
      </div>
      <p className="pl-5 text-2xl font-bold text-white capitalize">{intl.formatMessage({ id: 'dashboard' })}</p>
    </div>
  );
};

export { AppLogo };
