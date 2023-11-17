import { poppins } from '@/app/components/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${poppins.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[30px]">Education</p>
    </div>
  );
}
