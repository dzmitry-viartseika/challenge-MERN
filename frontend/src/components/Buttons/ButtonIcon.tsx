import {Button} from "primereact/button";

interface IButtonIconProps {
    iconClass: string,
    text: string,
    size: "small" | "large",
    severity: "success" | "help" | "warning" | "secondary" | "info" | "danger",
    disabled: boolean
}

const ButtonIcon = ({ text, iconClass, size = 'small', severity = 'secondary', disabled = false }: IButtonIconProps) => {
    return (
        <Button label={text} icon={iconClass} size={size} severity={severity} disabled={disabled} />
    );
};

ButtonIcon.displayName = 'ButtonIcon';
export default ButtonIcon;