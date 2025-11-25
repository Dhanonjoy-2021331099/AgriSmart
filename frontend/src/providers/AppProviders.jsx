import PropTypes from 'prop-types';

export default function AppProviders({ children }) {
  return children;
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

