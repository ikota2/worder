import React, {FC} from 'react';

import classes from './Input.module.css';

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({label, value, onChange, name}) => {
  return (
    <div className={classes.container}>
      <input
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        placeholder=""
        className={classes.input}
        value={value}
        onChange={e => onChange(e)}
      />
      <label htmlFor={name} className={classes.label}>{label}</label>
    </div>
  );
};

export default Input;
