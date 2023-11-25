import { Button } from 'primereact/button';

interface IProps {
    text: string,
    size: "small" | "large",
    type: string,
    severity: "success" | "help" | "warning" | "secondary" | "info" | "danger",
    disabled: boolean
}

const ButtonBase = ({ type = 'submit', text, size = 'small', severity = 'secondary', disabled = false }: IProps) => {
    console.log('label', text)
    return (
        <Button type={type}  label={text} size={size} severity={severity} disabled={disabled} />
    )
}

ButtonBase.displayName = 'ButtonBase';
export default ButtonBase;