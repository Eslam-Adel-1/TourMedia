import { SignUp } from "@clerk/nextjs";
import smilyFace1 from "@/assets/images/smilyFace1.png";
import smilyFace2 from "@/assets/images/smilyFace2.png";
import smilyFace3 from "@/assets/images/smilyFace3.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative h-screen grid place-items-center">
      <Image
        src={smilyFace1}
        alt="smilyFace"
        height={100}
        width={200}
        className="absolute top-8 left-8"
      />
      <Image
        src={smilyFace2}
        alt="smilyFace"
        height={100}
        width={170}
        className="absolute top-[30%] right-14"
      />
      <Image
        src={smilyFace3}
        alt="smilyFace"
        height={100}
        width={150}
        className="absolute bottom-0 left-[20%] flip-left transfrom scale-x-[-1]"
      />
      <div className="my-7">
        <SignUp />
      </div>
    </div>
  );
}
