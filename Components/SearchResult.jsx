import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchResult = ({ image, first_name, last_name, userId }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer"
      onClick={() => router.push(`/${userId}`)}
    >
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <Image
          src={image}
          alt="search-result"
          width={500}
          height={500}
          className=" object-contain"
        />
      </div>
      <p className="font-semibold ">{`${first_name} ${last_name}`}</p>
    </div>
  );
};

export default SearchResult;
