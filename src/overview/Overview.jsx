import React from 'react';
import { Button } from 'grommet';

const Overview = () => {
  return (
    <div className="col-xs-9">
      <div className="header">
        <h3>Accounts Summary</h3>
        <p>In the future, this page will display charts with data from your accounts.</p>
        <p>For now, select an account from the sidebar to see its details.</p>
        <Button label="Label"
          href="#"
          primary
        />
      </div>
    </div>
  );
};

export default Overview;
