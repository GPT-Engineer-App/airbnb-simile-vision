import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, User, LogOut, Calendar } from 'lucide-react';
import { createApi } from 'unsplash-js';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const unsplash = createApi({
  accessKey: 'YOUR_UNSPLASH_ACCESS_KEY'
});

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [experienceImages, setExperienceImages] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      setUsername('');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };
  const [searchParams, setSearchParams] = useState({
    where: '',
    who: '',
  });

  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined
  });

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (range) => {
    setDateRange(range);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const categories = [
    { name: 'Icons', icon: '💰' },
    { name: 'Beach', icon: '🏖️' },
    { name: 'Amazing pools', icon: '🏊' },
    { name: 'Cabins', icon: '🏡' },
    { name: 'Treehouses', icon: '🌳' },
    { name: 'Tropical', icon: '🌴' },
    { name: 'Amazing views', icon: '🏞️' },
    { name: 'OMG!', icon: '😲' },
    { name: 'Castles', icon: '🏰' },
    { name: 'Countryside', icon: '🌾' },
    { name: 'Tiny homes', icon: '🏠' },
    { name: 'Caves', icon: '🕳️' },
    { name: 'Lakefront', icon: '🏞️' },
    { name: 'National parks', icon: '🏞️' },
    { name: 'Lake', icon: '🌊' },
    { name: 'Camping', icon: '⛺' },
    { name: 'Earth homes', icon: '🌍' },
    { name: 'Islands', icon: '🏝️' },
    { name: 'Mansions', icon: '🏘️' },
    { name: 'Trending', icon: '🔥' },
    { name: 'A-frames', icon: '🏠' },
    { name: 'Historical homes', icon: '🏛️' },
    { name: 'Bed & breakfasts', icon: '🛏️' },
    { name: 'New', icon: '✨' },
  ];

  const experiences = [
    {
      title: 'Train at the X-Mansion',
      host: 'Hosted by Jubilee',
      price: '€36 per guest',
      live: true,
    },
    {
      title: 'Go VIP with Kevin Hart',
      host: 'Hosted by Kevin Hart',
      price: 'Coming August 21',
    },
    {
      title: 'Join a living room session with Doja',
      host: 'Hosted by Doja Cat',
      price: 'Coming October',
    },
    {
      title: "Stay in Prince's Purple Rain house",
      host: 'Hosted by Wendy and Lisa',
      price: 'Coming October',
    },
    {
      title: 'Live like Bollywood star Janhvi Kapoor',
      host: 'Hosted by Janhvi Kapoor',
      price: 'Sold out',
    },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const experience of experiences) {
        try {
          const result = await unsplash.search.getPhotos({
            query: experience.title,
            page: 1,
            perPage: 1,
          });
          if (result.response && result.response.results.length > 0) {
            images[experience.title] = result.response.results[0].urls.regular;
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
      setExperienceImages(images);
    };

    fetchImages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <img src="/placeholder.svg" alt="Airbnb" className="h-8 w-auto" />
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
                  {isLoggedIn ? (
                    <>
                      <Button variant="ghost" onClick={() => navigate('/my-trips')} className="w-full justify-start">My Trips</Button>
                      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)}>Login</Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="mt-8">
        <div className="flex justify-center">
          <div className="flex items-center space-x-4 bg-white shadow-lg rounded-full p-2">
            <Input
              type="text"
              name="where"
              placeholder="Where"
              className="border-none"
              value={searchParams.where}
              onChange={handleSearchChange}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Input
              type="text"
              name="who"
              placeholder="Who"
              className="border-none"
              value={searchParams.who}
              onChange={handleSearchChange}
            />
            <Button className="bg-[#FF385C] text-white rounded-full px-4 py-2 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex space-x-8 overflow-x-auto pb-4">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center space-y-2">
            <div className="text-2xl">{category.icon}</div>
            <span className="text-xs">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">New this week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {experiences.map((experience, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              <img 
                src={experienceImages[experience.title] || '/placeholder.svg'} 
                alt={experience.title} 
                className="w-full h-64 object-cover"
              />
              {experience.live && (
                <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                  LIVE
                </span>
              )}
              <div className="mt-2">
                <h3 className="font-semibold">{experience.title}</h3>
                <p className="text-sm text-gray-600">{experience.host}</p>
                <p className="text-sm">{experience.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to log in.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="username"
                  placeholder="Username"
                  className="col-span-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="col-span-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <Button type="submit">Login</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
