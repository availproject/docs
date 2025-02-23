import type { FC } from "react"

interface ButtonProps {
  text: string
  className: "white_background_button" | "vision_button" | "solution_button" | "background_button"
}

export const Button: FC<ButtonProps> = ({ text, className }) => {
  const baseClasses = "font-semibold text-center tracking-[-0.02em] cursor-pointer"

  const buttonClasses = {
    white_background_button: `${baseClasses} bg-white border-2 border-[#005471] text-[#005471] rounded-full text-lg md:text-base py-[19px] px-[35px] md:py-3.5 md:px-[35px]`,
    vision_button: `${baseClasses} bg-[#3CA3FC] text-white rounded-full text-[22px] md:text-lg py-[21px] px-8 md:py-4 md:px-[60px] mx-auto md:mx-0`,
    solution_button: `${baseClasses} bg-[#3CA3FC] text-white rounded-full text-lg py-[18px] px-[26px] md:py-[15px] md:px-[50px] mx-auto md:mx-0`,
    background_button: `${baseClasses} bg-[#3CA3FC] text-white rounded-full text-[22px] md:text-lg py-5 px-[37px] md:py-3.5 md:px-[26px]`,
  }

  return <button className={buttonClasses[className]}>{text}</button>
}