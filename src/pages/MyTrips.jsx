import { Button } from "@/components/ui/button"
import { Search, Globe, Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MyTrips = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const pastTrips = [
    { id: 1, location: 'Marinje Zemlje', host: 'Alma', date: 'May 23-26, 2018', image: '/placeholder.svg' },
    { id: 2, location: 'Plovdiv', host: 'Stefaniya', date: 'Sep 19-21, 2017', image: '/placeholder.svg' },
    { id: 3, location: 'Zürich', host: 'Christian', date: 'Sep 3-9, 2017', image: '/placeholder.svg' },
    { id: 4, location: 'Thessaloniki', host: 'Alexandra', date: 'Jan 22-25, 2017', image: '/placeholder.svg' },
    { id: 5, location: 'Wembley', host: 'Bemi', date: 'Oct 14-19, 2016', image: '/placeholder.svg' },
    { id: 6, location: 'Sarajevo', host: 'Dario Darije', date: 'May 11-15, 2016', image: '/placeholder.svg' },
  ];

  const canceledTrips = [
    { id: 7, location: 'Jakovici', host: 'Ivana', date: 'Sep 28 - Oct 1, 2022', image: '/placeholder.svg' },
    { id: 8, location: 'Kyiv', host: 'Apaoa', date: 'Mar 7-9, 2022', image: '/placeholder.svg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <img src="/placeholder.svg" alt="Airbnb" className="h-8 w-auto cursor-pointer" onClick={() => navigate('/')} />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Airbnb your home</Button>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Menu className="h-4 w-4" />
                <User className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
                  <Button variant="ghost" onClick={handleLogout} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Where you've been</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pastTrips.map((trip) => (
          <div key={trip.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={trip.image} alt={trip.location} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{trip.location}</h2>
              <p className="text-gray-600">Hosted by {trip.host}</p>
              <p className="text-gray-500">{trip.date}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Canceled trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {canceledTrips.map((trip) => (
          <div key={trip.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={trip.image} alt={trip.location} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{trip.location}</h2>
              <p className="text-gray-600">Hosted by {trip.host}</p>
              <p className="text-gray-500">{trip.date}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-gray-600">
        Can't find your reservation here? <a href="#" className="text-blue-600 hover:underline">Visit the Help Center</a>
      </p>
    </div>
  </div>
  );
};

export default MyTrips;
