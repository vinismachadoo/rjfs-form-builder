import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { MainNav } from '@/components/main-nav';
import { GithubIcon } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b sticky top-0 left-0 bg-background/80 backdrop-blur-md md:px-6 px-0 py-3">
      <div className="mx-auto flex items-center justify-between">
        <div>
          <MainNav />
          {/* <MobileNav /> */}
        </div>
        <div className="flex items-center gap-x-4">
          <Link target="_blank" href="https://github.com/vinismachadoo">
            <Button variant="outline">
              <GithubIcon className="size-4" />
              Follow on github
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
