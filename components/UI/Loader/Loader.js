import { Loader as SemanticLoader } from 'semantic-ui-react';
import { gfCommon } from 'goldfish';

import './style.scss';

export const Loader = () => (
  <div className="custom-loader">
    <SemanticLoader active>{gfCommon.loading.en}</SemanticLoader>
  </div>
);