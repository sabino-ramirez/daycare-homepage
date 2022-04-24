import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../public/clLogo.svg';

const Logo = () => {
  return (
    <Link href='/' scroll={false}>
      <a>
        <Image src={logoImg} height={48} width='80px' priority />
      </a>
    </Link>
  );
};

export default Logo;
