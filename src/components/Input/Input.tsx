import React, {FC} from 'react';

import classes from './Input.module.css';

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  minLength?: number;
}

const Input: FC<Props> = ({type = 'text', label, value, onChange, name, required = false, minLength = 0}) => {
  return (
      <div className={classes.container}>
        <input
          type={type}
          id={name}
          name={name}
          minLength={minLength}
          autoComplete="off"
          placeholder=""
          className={classes.input}
          value={value}
          onChange={e => onChange(e)}
          required={required}
        />
        <label htmlFor={name} className={classes.label}>{label}</label>
      </div>
  );
};

export default Input;
