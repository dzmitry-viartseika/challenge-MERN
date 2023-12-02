import { Button } from 'primereact/button';

interface IProps {
    text: string;
    size: "small" | "large";
    type: string;
    severity: "success" | "help" | "warning" | "secondary" | "info" | "danger";
    disabled: boolean;
    handleClickEvent: () => void;
}

const ButtonBase = ({ type = 'submit', text, size = 'small', severity = 'secondary', disabled = false, handleClickEvent }: IProps) => {
    return (
        <Button type={type}  label={text} size={size} severity={severity} disabled={disabled} onClick={handleClickEvent}/>
    )
}

ButtonBase.displayName = 'ButtonBase';
export default ButtonBase;