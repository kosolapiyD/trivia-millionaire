import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectFieldProps, SelectFieldType } from '../../types/types';

import './select-field.scss';

const SelectField = ({ data, label, onChange, value }: SelectFieldProps) => {

    return (
        <div className='select-field-box'>
            <FormControl required fullWidth size="small">
                <InputLabel>{label}</InputLabel>
                <Select label={label} value={value} name={label} onChange={onChange}>
                    {data.map((item: SelectFieldType) => (
                        <MenuItem value={item.id} key={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectField;