import React from 'react';

    export const Inputdate = ({ label, id, value, onChange }) => {
        return (
          <div>
            <label className="label-fixed-width" htmlFor={id}>{label} :</label>
            <input
              type="date"
              id={id}
              name={id}
              value={value}
              onChange={onChange}
            />
          </div>
        );
      };
      