import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;

  if (filter === "all") filteredCabins = cabins;
  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7
    );
  if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard
          cabin={cabin}
          key={cabin.id}
        />
      ))}
    </div>
  );
}
