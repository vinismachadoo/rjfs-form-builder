import Link from 'next/link';

export const MainNav = () => {
  return (
    <div className="md:flex items-center gap-5 hidden">
      <Link href={'/'} className="font-semibold">
        JSON Schema Form Builder
      </Link>
    </div>
  );
};
