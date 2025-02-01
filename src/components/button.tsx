
interface ButtonProps {
    name: string;
    hasLogo: boolean;
    logo?: React.ReactNode;
    className?: string;
}

export default function Button({name, hasLogo, logo, className}: ButtonProps) {
    return (
        <button className={`bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 ${className}`}>
            {hasLogo && logo}
            {name}
        </button>
    );
}
