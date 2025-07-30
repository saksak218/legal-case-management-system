import { Button } from "@/components/ui/button";
import { GET } from "../../api/clients/route";
import ClientCard from "@/components/ClientCard";
import { UserPlus } from "lucide-react";
import ClientModal from "@/components/ClientModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Page = async () => {
  const data = await GET();
  const clients = await data.json();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Clients</h2>
          <p className="text-muted-foreground text-lg">
            Manage your client relationships and information
          </p>
        </div>
        <div>
          {/* <Button className="bg-blue-900 hover:bg-blue-950 cursor-pointer">
            <span>
              <UserPlus className="size-4" />
            </span>
            <ClientModal />
          </Button> */}
          <Dialog>
            <DialogTrigger className="flex items-center gap-x-1 bg-blue-900 hover:bg-blue-950 px-3 py-1.5 rounded-md text-white cursor-pointer">
              <UserPlus className="size-4" />
              Add Client
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Client</DialogTitle>
                <DialogDescription>
                  Fill the required fields to create a new client.
                </DialogDescription>
              </DialogHeader>

              <div className="gap-4 grid">
                <div className="gap-3 grid">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" placeholder="Client XYZ" />
                </div>
                <div className="gap-3 grid">
                  <Label htmlFor="email-1">Email</Label>
                  <Input
                    id="email-1"
                    name="email"
                    placeholder="client@email.com"
                  />
                </div>
                <div className="gap-3 grid">
                  <Label htmlFor="phone-1">Phone no.</Label>
                  <Input id="phone-1" name="phone" placeholder="03001234567" />
                </div>
                <div className="gap-3 grid">
                  <Label htmlFor="username-1">Address</Label>
                  <Input
                    id="address-1"
                    name="address"
                    placeholder="ABC House # 1, Abc city, Pakistan"
                  />
                </div>

                <Button className="bg-blue-900 hover:bg-blue-950 cursor-pointer">
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {clients.map(
          (client: {
            _id?: any;
            name?: string;
            email?: string;
            address?: string;
            phone?: string;
            activeCases?: number;
            totalCases?: number;
          }) => (
            <ClientCard key={client._id} client={client} />
          )
        )}
      </div>
    </div>
  );
};

export default Page;

//   return <div>{clients.map((client: { name: string }) => client.name)}</div>;
