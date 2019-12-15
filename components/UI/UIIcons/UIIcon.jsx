import React from 'react';
import PropTypes from 'prop-types';
import { UIIconsBase } from './UIIconsBase';
import * as icons from './UIIconsData';

export const UIIcon = (props) => {
  const currentIcon = icons[props.icon];
  const { style } = props;
  return (
    <UIIconsBase
      xmlns="http://www.w3.org/2000/svg"
      viewBox={currentIcon.viewBox || '0 0 60 60'}
      fill={currentIcon.fill}
      style={currentIcon.style || {}}
      {...props}
    >
      {style && <style>{style}</style>}
      {currentIcon.g.map(({ key, type, d, style = {}, ...restProps }) => (
        <g key={key}>
          {React.createElement(type, { d, style, ...restProps })}
        </g>
      ))}
    </UIIconsBase>
  );
};

UIIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
};
