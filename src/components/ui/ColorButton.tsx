type Props = {
  text: string;
  onClick: () => void;
  size?: 'small' | 'big';
};
export default function ColorButton({ text, onClick, size = 'small' }: Props) {
  return (
    <div className={`group rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 ${size === 'big' ? 'p-[0.5rem]' : 'p-[0.2rem]'}`}>
      <button
        className={`rounded-sm bg-white group-hover:opacity-90 transition-opacity ${size === 'big' ? 'text-2xl p-[1rem]' : 'text-base p-[0.43rem]'}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
