import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SelectFieldType } from '../../types/types';

import './select-field.scss';

type Props = {
    data: SelectFieldType[];
    label: string;
    onChange: (e: SelectChangeEvent) => void;
    value: string;
};

const SelectField = ({ data, label, onChange, value }: Props) => {

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