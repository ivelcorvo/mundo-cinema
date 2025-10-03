import { useDarkTheme } from "../context/DarkThemeContext";

const Loading = () => {
  const {isDark} = useDarkTheme();

  const classTheme:string  = (isDark)?"bg-black ":"bg-white ";

  return (
    <div className={`fixed inset-0 flex justify-center items-center ${classTheme}`}>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite]"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
      </div>
    </div>
  )
}

export default Loading