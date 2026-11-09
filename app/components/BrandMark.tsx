import Image from "next/image";

export default function BrandMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return <Image src="/brand/pingstack-logo.jpg" alt="" width={size} height={size} className={`shrink-0 rounded-md ${className}`} style={{ width: size, height: size }} />;
}
