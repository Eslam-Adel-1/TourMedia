import BasicContainer from "../BasicContainer";
import { leftBarData } from "@/arrays/leftBarData";

const EventsList = () => (
  <BasicContainer>
    {leftBarData.map(({ icon, title }, index) => (
      <div
        className="flex items-center gap-4 mb-3 group cursor-pointer"
        key={index}
      >
        <div className="text-gray-400 group-hover:text-green-400">{icon}</div>
        <p className="text-gray-400 group-hover:text-green-400">{title}</p>
      </div>
    ))}
  </BasicContainer>
);

export default EventsList;
