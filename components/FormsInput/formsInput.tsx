import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useState, forwardRef } from 'react'
import styles from './formsInput.module.css'
import { IMaskInput } from 'react-imask'

import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import { ButtonComp } from './Button/button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

// registerLocale("pt-BR", ptBR)
setDefaultLocale("pt-BR");

interface CustomInputProps {
    readOnly?: boolean,
    type?: string,
    name?: string,
    id?: string,
    placeholder?: string
    autoComplete?: string
    defaultValue?: string
}

interface MultiSelectProps {
    options: { value: string, label: string }[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    searchText: string
    defaultValue?: string[]
    id?: string
}

export function Select({ ...rest }: SelectProps) {
    return (
        <select className={styles.input} {...rest} >
        </select>
    )
}
Select.displayName = "Select";

export const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange, searchText }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSelectAll = () => {
        if (selectedValues!.length === options.length) {
            onChange([]);
        } else {
            onChange(options.map(option => option.value));
        }
    };

    const handleSelect = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter(selected => selected !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border rounded p-2 w-full">
            <ButtonComp type="button" onClick={handleSelectAll}>
                {selectedValues.length === options.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </ButtonComp>
            <input
                type="text"
                placeholder={searchText}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 w-full mb-2"
            />
            <ul className="max-h-60 overflow-y-auto">
                {filteredOptions.map(option => (
                    <li key={option.value} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(option.value)}
                            onChange={() => handleSelect(option.value)}
                        />
                        <label>{option.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
MultiSelect.displayName = "MultiSelect";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} {...props} className={styles.input} />;
});
Input.displayName = "Input";

export function DateSelect(props: CustomInputProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    return (
        <div className='w-full'>
            <ReactDatePicker
                name={props.name}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                className={styles.input}
                onChange={(date) => setSelectedDate(date)}
                customInput={
                    <div className="flex cursor-pointer gap-3">
                        {selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : 'Selecione uma data'}
                        <Calendar className='back' />
                    </div>
                }
            />
        </div>
    )
}
DateSelect.displayName = "DateSelect";

export function MaskedDocumentInput(props: CustomInputProps) {
    return (
        <IMaskInput
            type={props.type}
            name={props.name}
            id={props.id}
            readOnly={props.readOnly}
            className={styles.input}
            mask={[
                { mask: '000.000.000-00', maxLength: 11 },
                { mask: '00.000.000/0000-00' }
            ]}
            defaultValue={props.defaultValue}
            style={{
                backgroundColor: !props.readOnly ? '' : 'rgba(101, 98, 143, 0.219)',
            }}
        />
    )
}
MaskedDocumentInput.displayName = "MaskedDocumentInput";

export function MaskedPhoneInput(props: CustomInputProps) {
    return (
        <IMaskInput
            type={props.type}
            name={props.name}
            id={props.id}
            readOnly={props.readOnly}
            className={styles.input}
            mask={'(00) 90000-0000'}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
        />
    )
}
MaskedPhoneInput.displayName = "MaskedPhoneInput";

export function MaskedZipInput(props: CustomInputProps) {
    return (
        <IMaskInput
            type={props.type}
            name={props.name}
            id={props.id}
            readOnly={props.readOnly}
            className={styles.input}
            mask={'0000-000'}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
        />
    )
}
MaskedZipInput.displayName = "MaskedZipInput";

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    )
}
TextArea.displayName = "TextArea";