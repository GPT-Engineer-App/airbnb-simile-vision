import { Button } from "@/components/ui/button"

const MyTrips = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg mb-4">You have no upcoming trips.</p>
        <Button>Start planning your next trip</Button>
      </div>
    </div>
  );
};

export default MyTrips;
