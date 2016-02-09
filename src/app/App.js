import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <div className="row">
      {children}
      {
      /*
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools');
            return <DevTools />;
          }
        })()
      */
      }
    </div>
  );
};
App.propTypes = { children: PropTypes.element.isRequired };

export default App;
