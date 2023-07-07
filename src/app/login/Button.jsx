export default function Button({ text, bgColor, textColor, action, wfull, className }) {
  return (
    <button className={`${className} ${bgColor || 'bg-green-300'} ${textColor || 'text-violet-950'} py-2 px-8
    rounded-lg shadow-lg transition duration-300 hover:bg-violet-300 hover:shadow-sm
    cursor-pointer ${wfull && 'w-full'}`} onClick={action}>{text}</button>
  )
}
