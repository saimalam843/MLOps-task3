import { Button } from "antd"
import "./LoginSignupBtn.css"

interface ChildProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const LoginSignupBtn = ({children, onClick} : ChildProps) => {
  return (
        <Button type = "default" className="button" onClick = {onClick}>{children}</Button>
  )
}

export default LoginSignupBtn