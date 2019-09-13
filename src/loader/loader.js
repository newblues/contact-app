import React from 'react';
import { Spinner } from 'reactstrap';

import PropTypes from 'prop-types';

const Loader = props => {
  return (
    <div>
      <Spinner color="primary" style={{ width: '4rem', height: '4rem' }} className="mt-5" />
    </div>
  );
};

Spinner.propTypes = {
  type: PropTypes.string, // default: 'border'
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.string, // default: 'Loading...'
};

export default Loader;
