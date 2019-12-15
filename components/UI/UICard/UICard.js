import './style.scss';

export const UICard = ({ children, header }) => {
  return (
    <div className="ui-card">
      {header && <h4 className="ui-card__header">{header}</h4>}

      <div className="ui-card__content">
        {children}
      </div>
    </div>
  );
};