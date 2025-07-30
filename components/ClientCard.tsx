import { ArchiveIcon, EditIcon, FileTextIcon, User2Icon } from "lucide-react";

const ClientCard = ({ client }: any) => {
  const { name, email, address, phone, activeCases, totalCases } = client;

  return (
    <div className="px-6 py-4 border border-gray-300 rounded-md w-full max-w-sm">
      <h2 className="font-semibold text-lg">{name}</h2>

      <div>
        <ul className="text-sm">
          <li className="flex gap-x-2">
            <span className="font-semibold"> Email:</span>
            <span className="text-muted-foreground">{email}</span>
          </li>
          <li className="flex gap-x-2">
            <span className="font-semibold"> Phone:</span>
            <span className="text-muted-foreground">{phone}</span>
          </li>
        </ul>

        <div className="bg-gray-100/70 my-4 px-6 py-3 rounded-md h-20">
          <div className="gap-x-10 grid grid-cols-2 mx-auto max-w-max text-sm text-center">
            <div className="flex items-center gap-x-1">
              <div className="flex flex-col gap-y-0.5">
                <p className="flex items-center gap-x-1">
                  <ArchiveIcon className="size-4 text-green-500" />
                  Active Cases
                </p>
                <span className="font-bold text-green-500 text-lg">
                  {activeCases}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-1">
              <div className="flex flex-col gap-y-0.5">
                <p className="flex items-center gap-x-1">
                  <FileTextIcon className="size-4 text-gray-500" />
                  Total Cases
                </p>
                <span className="font-bold text-lg">{totalCases}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2 text-sm">
          <div className="flex-1 py-1.5 border border-gray-300 rounded-md text-center">
            <p className="flex justify-center items-center gap-x-1">
              <span>
                <FileTextIcon className="size-4 text-yellow-500" />
              </span>
              View Cases
            </p>
          </div>
          <div className="flex-1 py-1.5 border border-gray-300 rounded-md text-center">
            <p className="flex justify-center items-center gap-x-1">
              <span>
                <EditIcon className="size-4 text-blue-500" />
              </span>
              Edit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
