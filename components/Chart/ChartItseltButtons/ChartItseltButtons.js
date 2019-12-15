import { Button } from 'semantic-ui-react';

export const ChartItseltButtons = ({ handleDelete, handleEdit }) => {
  return (
    <div className="chart-itself-buttons">
      <Button icon="pencil" color="blue" onClick={handleEdit} />
      <Button icon="close" color="red" onClick={handleDelete} />
    </div>
  );
};