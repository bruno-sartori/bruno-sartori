import Container from "@/components/Container";
import Link from "next/link";
import { SITE } from "@/consts";
import SearchButton from "./SearchButton";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex flex-wrap justify-between gap-y-2">
          <Link href="/">
            <div className="font-semibold">
              {SITE.TITLE}
            </div>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/blog">
              blog
            </Link>
            <span>/</span>
            <Link href="/projects">
              projects
            </Link>
            <span>/</span>
            <SearchButton />
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
