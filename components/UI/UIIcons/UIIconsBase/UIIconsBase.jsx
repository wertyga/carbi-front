import React from 'react';
import PropTypes from 'prop-types';

export const UIIconsBase = ({ color, size, style, width, height, fill = 'currentColor', ...props }) => {
  const computedSize = size || '1em';
  return (
    <svg
      height={height || computedSize}
      width={width || computedSize}
      fill={fill}
      {...props}
      style={{
        verticalAlign: 'middle',
        color,
        ...style,
      }}
    />
  );
};

UIIconsBase.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.object,
  fill: PropTypes.string,
};
