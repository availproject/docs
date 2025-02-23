import { FC } from 'react';
import buttonStyle from './Button.module.css';

interface ButtonProps {
    text:string, 
    className:string
}

export const Button:FC<ButtonProps> = ({text, className}) => <button className={buttonStyle[className]}>{text}</button>