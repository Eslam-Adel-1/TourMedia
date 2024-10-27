"use client";
import { useRouter } from "next/navigation";

const TourMedia = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <h2
      className="text-green-400 text-2xl font-semibold cursor-pointer"
      onClick={handleClick}
    >
      TourMedia
    </h2>
  );
};

export default TourMedia;
