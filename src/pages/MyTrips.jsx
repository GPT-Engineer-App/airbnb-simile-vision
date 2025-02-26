import { Button } from "@/components/ui/button"
import { Search, Globe, Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const unsplash = createApi({
  accessKey: 'YOUR_UNSPLASH_ACCESS_KEY'
});

const MyTrips = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const [pastTrips, setPastTrips] = useState([
    { id: 1, location: 'Marinje Zemlje', host: 'Alma', date: 'May 23-26, 2018' },
    { id: 2, location: 'Plovdiv', host: 'Stefaniya', date: 'Sep 19-21, 2017' },
    { id: 3, location: 'Zürich', host: 'Christian', date: 'Sep 3-9, 2017' },
    { id: 4, location: 'Thessaloniki', host: 'Alexandra', date: 'Jan 22-25, 2017' },
    { id: 5, location: 'Wembley', host: 'Bemi', date: 'Oct 14-19, 2016' },
    { id: 6, location: 'Sarajevo', host: 'Dario Darije', date: 'May 11-15, 2016' },
  ]);

  const [canceledTrips, setCanceledTrips] = useState([
    { id: 7, location: 'Jakovici', host: 'Ivana', date: 'Sep 28 - Oct 1, 2022' },
    { id: 8, location: 'Kyiv', host: 'Apaoa', date: 'Mar 7-9, 2022' },
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedPastTrips = await Promise.all(pastTrips.map(async (trip) => {
        const result = await unsplash.search.getPhotos({
          query: trip.location,
          page: 1,
          perPage: 1,
        });
        const imageUrl = result.response.results[0]?.urls.regular || '/placeholder.svg';
        return { ...trip, image: imageUrl };
      }));

      const updatedCanceledTrips = await Promise.all(canceledTrips.map(async (trip) => {
        const result = await unsplash.search.getPhotos({
          query: trip.location,
          page: 1,
          perPage: 1,
        });
        const imageUrl = result.response.results[0]?.urls.regular || '/placeholder.svg';
        return { ...trip, image: imageUrl };
      }));

      setPastTrips(updatedPastTrips);
      setCanceledTrips(updatedCanceledTrips);
    };

    fetchImages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-8 w-auto cursor-pointer" onClick={() => navigate('/')} />
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
