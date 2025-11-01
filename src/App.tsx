import React, { useState, useEffect, useRef, Suspense } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from "recharts";
import { Slider } from "./components/ui/slider";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import timeSeriesGif from "@/image/time-series-new.gif";
import vegetationGif from "@/image/vegetation.gif"; 
import rumahRobohJPEG from "@/image/rumah_roboh.jpeg";
import kasianJPG from "@/image/kasian.jpg";
import reklamasiJPG from "@/image/reklamasi.jpg";
import ndviPNG from "@/image/ndvi.png"; 
import lowHighPNG from "@/image/low-high-ndvi.jpg"; 
import Scatter from "@/image/scatter.jpg";
import {
  floodingAerial,
  roadDamage,
  openPitMining,
  floodedVillage,
  miningVillage,
  satuiVillage,
  sarImage2015,
  sarImage2025,
  miningAerialTerraced,
  mining1,
  mining2,
  satuiAerialMining,
  seasonalWaterDry,
  seasonalWaterWet,
  coastalErosion,
} from "./image";
import sarImageNew2015 from 'figma:asset/6f2d87bfd855a1843ce9a8751a98097211e224fc.png';
import sarImageNew2025 from 'figma:asset/4151677d50f3d22a09140ab718f3afc0da23e13e.png';
import satuiVillageAerial from 'figma:asset/189589fc383e1fcddb564adc79d28ff4fce27753.png';
import opticalImage from 'figma:asset/5e503b3334c9adcf4338f0f02c3e808d309f2bd9.png';
import sarImage2015VV from 'figma:asset/5441689f00f5ce761c5a2d23618e3633bc3aee38.png';
import sarImage2025VV from 'figma:asset/53350eb35533e75f394446f0914b213bc6c3c94e.png';
import landChangeImage from 'figma:asset/cbd5eeda3b23f69a7e01d08670e14b7e177c2063.png';
import sarBackscatterImage from 'figma:asset/09df8ddee4959168a0c0de6f28e837a33da295e2.png';
import newRoadDamage from 'figma:asset/a6854474e5cf6f366a7e8873ef848853325e0108.png';
import newMiningAerial from 'figma:asset/4606d32b0c76ca2dd812c75a73d4ce7e6cee170a.png';
import newVillageAerial from 'figma:asset/db9c28cf883efc37249ecc4f91d7399bce659924.png';
import galleryReplacement from 'figma:asset/f89789664439deef76ac62496b8e25ce17a28482.png';
import heroBackgroundImage from 'figma:asset/53d25fc9f504f6d8fad126c601e6d26760b20c76.png';
import satuiPresentationSlide from 'figma:asset/cabbdfbf27ac606989afe1f9216af676fba70d30.png';
import satuiAerialCommunity from 'figma:asset/6550d735742a225932311dd9492077aae098c751.png';
import sarFrequencyBands from 'figma:asset/7d583ca49b7f1d87dc287591703e1a851aa38208.png';
import radarPolarization from 'figma:asset/1320cedddf79287873b33d18f7ec25327d2c4cca.png';
import sarScatteringMechanisms from 'figma:asset/0146a4690ab23d18cddf94fcc36b556129922fe8.png';


import {
  Satellite,
  MapPin,
  Radio,
  Database,
  Layers,
  Droplets,
  CloudRain,
  BarChart3,
  Lightbulb,
  Globe,
  Eye,
  CheckCircle,
  AlertTriangle,
  Mountain,
  Camera,
  Zap,
  ChevronDown,
  ArrowDown,
  Menu,
  X,

} from "lucide-react";

export default function App() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lastUpdateRef = useRef(0);
  const [showWetSeason, setShowWetSeason] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [activeStoryStep, setActiveStoryStep] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedSeason, setSelectedSeason] = useState('wet');


  // Story steps for sidecar scrollytelling - Now with 3 slides only
  const pitData = [
  { year: 2015, pitHa: 182.31, deltaHa: null as number | null },
  { year: 2016, pitHa: 169.77, deltaHa: -12.54 },
  { year: 2017, pitHa: 241.58, deltaHa: 71.81 },
  { year: 2018, pitHa: 273.11, deltaHa: 31.53 },
  { year: 2019, pitHa: 271.97, deltaHa: -1.14 },
  { year: 2020, pitHa: 368.63, deltaHa: 96.66 },
  { year: 2021, pitHa: 348.97, deltaHa: -19.66 },
  { year: 2022, pitHa: 320.47, deltaHa: -28.50 },
  { year: 2023, pitHa: 290.07, deltaHa: -30.40 },
  { year: 2024, pitHa: 277.57, deltaHa: -12.50 },
  { year: 2025, pitHa: 265.11, deltaHa: -12.46 },
];

  // Story steps for sidecar scrollytelling - Now with 3 slides only
  const pitData1 = [
  { year1: 2015, pitHa1: 4044, deltaHa1: null as number | null },
  { year1: 2016, pitHa1: 3936, deltaHa1: -108 },
  { year1: 2017, pitHa1: 3866, deltaHa1: -70 },
  { year1: 2018, pitHa1: 3733, deltaHa1: -133 },
  { year1: 2019, pitHa1: 3621, deltaHa1: -112 },
  { year1: 2020, pitHa1: 3520, deltaHa1: -101 },
  { year1: 2021, pitHa1: 3460, deltaHa1: -60 },
  { year1: 2022, pitHa1: 3509, deltaHa1: 49 },
  { year1: 2023, pitHa1: 3582, deltaHa1: 73 },
  { year1: 2024, pitHa1: 3575, deltaHa1: -7 },
  { year1: 2025, pitHa1: 3393, deltaHa1: -182 },
];

  const storySteps = [
    {
      id: "overview",
      title: "Satui Mining Area",
      subtitle: "Google Earth Optical Imagery",
      date: "",
      description:
        "The Satui corridor is dominated by the brown–gray tones of mining surfaces, with terraced benches and haul roads forming dense bright patterns, while more bluish pit ponds appear, and green vegetation recedes to the outer edges of the area. This view provides clear visual context under clear skies, but the region is often cloud-covered. Therefore, monitoring major changes still relies on Sentinel-1 SAR (C-band), which can penetrate clouds to assess pit expansion over time.",
      image: opticalImage,
      legend: "Optical satellite imagery",
    },
    {
      id: "expansion",
      title: "Satui Mining Area",
      subtitle: "SAR Imagery",
      date: "March 31, 2015 - Early Footprints",
      description:
        "In March 2015, the Sentinel-1 VV image shows a medium gray texture with bright “lands” still scattered, indicating limited mining openings within a matrix of vegetation. The bright linear network (early haul roads/benches) appears short and segmented. Dark water patches appear locally in several depressions, indicating small, unconnected water bodies.",
      image: sarImage2015VV,
      legend: "Radar backscatter in the VV polarization",
    },
    {
      id: "current",
      title: "Satui Mining Area",
      subtitle: "SAR Imagery",
      date: "October 3, 2025 - Expansion and intensification",
      description:
        "A decade later, in October 2025, the bright bands have merged into continuous pit corridors, with dense and extended bright lines (haul roads and terraced benches) indicating intensified activity and greater rock exposure. Meanwhile, the dark patches have grown larger and elongated, showing new pit lakes or settling ponds forming along with mining progress, while vegetation has retreated to the outer edges of the area.",
      image: sarImage2025VV,
      legend: "Radar backscatter in the VV polarization",
    },
  ];



  // Reset activeStoryStep if it exceeds the number of available steps
  useEffect(() => {
    if (activeStoryStep >= storySteps.length && storySteps.length > 0) {
      setActiveStoryStep(storySteps.length - 1);
    }
  }, [activeStoryStep, storySteps.length]);

  const sectionRefs = useRef<{
    [key: string]: HTMLElement | null;
  }>({});
  const storyStepRefs = useRef<(HTMLElement | null)[]>([]);

  // Navigation menu items - Streamlined structure
  // Personal Context integrated into Background section
  // Limitations & Next Steps integrated into References section
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "background", label: "Background" },
    { id: "openpit-sar", label: "Open-Pit with SAR" },
    { id: "satui", label: "Case Study" },
    { id: "land-change", label: "Land Change" },
    { id: "seasonal-water", label: "Seasonal Water" },
     { id: "impact-restoration", label: "Impacts & Restoration" },
    { id: "radar", label: "Technology" },
    { id: "references", label: "References" },
  ];

  // Scroll progress tracking and navbar background - Throttled for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(progress);

          // Change navbar background based on scroll position
          const heroHeight = window.innerHeight;
          if (window.scrollY > heroHeight * 0.1) {
            setNavbarBg("solid");
          } else {
            setNavbarBg("transparent");
          }

          // Manual section detection as backup for intersection observer
          // Especially useful for land-change section
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const navbarHeight = 80;
          
          // Check each section manually
          Object.entries(sectionRefs.current).forEach(([sectionId, element]) => {
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + scrollY;
              const elementBottom = elementTop + rect.height;
              const viewportTop = scrollY + navbarHeight;
              const viewportBottom = scrollY + windowHeight;
              
              // Check if section is prominently visible in viewport
              const visibleTop = Math.max(elementTop, viewportTop);
              const visibleBottom = Math.min(elementBottom, viewportBottom);
              const visibleHeight = Math.max(0, visibleBottom - visibleTop);
              const visibilityRatio = visibleHeight / Math.min(rect.height, windowHeight - navbarHeight);
              
              // For land-change section, use more aggressive detection
              const threshold = sectionId === 'land-change' ? 0.3 : 0.4;
              
              if (visibilityRatio > threshold) {
                setActiveSection(sectionId);
              }
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for section detection - Enhanced for Land Change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible in the viewport
        let maxVisibleSection = null;
        let maxIntersectionRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // For land-change section, use more sensitive detection
            const minThreshold = entry.target.id === 'land-change' ? 0.1 : 0.2;
            
            if (entry.intersectionRatio > minThreshold && entry.intersectionRatio > maxIntersectionRatio) {
              maxIntersectionRatio = entry.intersectionRatio;
              maxVisibleSection = entry.target.id;
            }
            
            // Special handling for land-change section due to its complex layout
            if (entry.target.id === 'land-change' && entry.intersectionRatio > 0.1) {
              const rect = entry.boundingClientRect;
              const viewport = window.innerHeight;
              const sectionCenter = rect.top + rect.height / 2;
              const viewportCenter = viewport / 2;
              
              // If section center is near viewport center, prioritize it
              if (Math.abs(sectionCenter - viewportCenter) < viewport * 0.3) {
                maxVisibleSection = 'land-change';
              }
            }
          }
        });

        if (maxVisibleSection) {
          setActiveSection(maxVisibleSection);
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6], 
        rootMargin: "-15% 0px -60% 0px" 
      },
    );

    // Delay observer setup to reduce initial load
    const timeoutId = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.observe(ref);
          // Debug logging untuk memastikan land-change ter-register
          if (ref.id === 'land-change') {
            console.log('Land Change section registered with observer');
          }
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as Element).closest("nav")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, [isMenuOpen]);

  // Close mobile menu on escape key and handle time-series keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }


    };

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Load images after initial render to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);



  // Global mouse up listener for smooth slider interaction
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseleave', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Enhanced story step intersection observer with smoother transitions
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // Delay story step observers to reduce initial load
    const timeoutId = setTimeout(() => {
      storyStepRefs.current.forEach((ref, index) => {
        if (ref && index < storySteps.length) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (
                  entry.isIntersecting &&
                  index < storySteps.length &&
                  entry.intersectionRatio >= 0.20
                ) {
                  // Add slight delay for smoother transitions
                  requestAnimationFrame(() => {
                    setActiveStoryStep(index);
                  });
                }
              });
            },
            {
              threshold: [0, 0.15, 0.3, 0.6, 0.85],
              rootMargin: "-10% 0px -20% 0px",
            },
          );
          observer.observe(ref);
          observers.push(observer);
        }
      });
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [storySteps.length]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // Close mobile menu when navigating
    const element = sectionRefs.current[sectionId];
    if (element) {
      // Special handling for land-change section
      let navbarHeight = 80;
      if (sectionId === 'land-change') {
        navbarHeight = 64; // Reduced offset for better positioning
      }

      const elementPosition =
        element.getBoundingClientRect().top +
        window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active section immediately for better UX
      setActiveSection(sectionId);
      
      // Verify scroll position after animation completes
      setTimeout(() => {
        const finalPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const currentScroll = window.pageYOffset;
        const targetScroll = finalPosition - navbarHeight;
        
        // If we're close to target but not exact, make final adjustment
        if (Math.abs(currentScroll - targetScroll) > 10) {
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        }
        
        // Ensure active section is set correctly
        setActiveSection(sectionId);
      }, 800);
    } else {
      console.warn(`Section element not found: ${sectionId}`);
    }
  };

  const setSectionRef =
    (id: string) => (ref: HTMLElement | null) => {
      sectionRefs.current[id] = ref;
      // Debug logging untuk memastikan section ter-register
      if (id === 'land-change' && ref) {
        console.log('Land Change section ref registered:', ref);
      }
    };

  const datasets = [
    {
      name: "Sentinel-1",
      type: "SAR Radar",
      resolution: "10m",
      years: "2015-2025",
      icon: <Satellite className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Sentinel-2",
      type: "Optical",
      resolution: "10m",
      years: "2015-2025",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "DEM",
      type: "Elevation",
      resolution: "30m",
      years: "2000",
      icon: <Mountain className="w-6 h-6" />,
      color: "bg-gray-100 text-gray-700",
    },
    {
      name: "Rainfall",
      type: "Climate",
      resolution: "0.1°",
      years: "2015-2025",
      icon: <CloudRain className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-700",
    },
  ];



  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navbarBg === "solid"
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-white/10 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${navbarBg === "solid" ? "bg-blue-600" : "bg-white/20"}`}
              >
                <Satellite
                  className={`w-5 h-5 ${navbarBg === "solid" ? "text-white" : "text-white"}`}
                />
              </div>
              <span
                className={`font-medium ${navbarBg === "solid" ? "text-gray-900" : "text-white"}`}
              >
                Satui Open-Pit Landscapes
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm transition-all duration-200 ${
                    activeSection === item.id
                      ? navbarBg === "solid"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-orange-300 border-b-2 border-orange-300"
                      : navbarBg === "solid"
                        ? "text-gray-600 hover:text-orange-600"
                        : "text-white/80 hover:text-orange-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${
                  navbarBg === "solid"
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu */}
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-b border-gray-200 z-50 mobile-menu-enter">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 text-base transition-all duration-200 rounded-lg ${
                      activeSection === item.id
                        ? "text-orange-600 bg-orange-50 border-l-4 border-orange-600 font-medium"
                        : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Cover */}
      <section
        id="hero"
        ref={setSectionRef("hero")}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBackgroundImage}
            alt="Aerial view of Satui open-pit mining operation showing terraced excavation levels, water accumulation areas, and the dramatic landscape transformation from industrial mining activities"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          {/* Enhanced Vignette Effect - Multiple Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight animate-fade-in">
            Satui Open-Pit Landscapes
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 animate-fade-in-delay">
            How can SAR detect land change and seasonal water?
          </p>
          <Button
            onClick={() => scrollToSection("background")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            Start Exploring
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Background */}
      <section
        id="background"
        ref={setSectionRef("background")}
        className="relative min-h-screen bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">
              Background
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why is it important to understand open-pit mining 
              <br />
              and seasonal water in tropical regions?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl mb-6 text-gray-800">
                Mining in Tropical Regions
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
               Tropical regions hold vast mineral wealth that drives the growth of open-pit mining industries. However, every layer of soil that is excavated reshapes the Earth’s surface. Dense tropical forests gradually disappear, ecosystems become fragmented, and groundwater patterns are disrupted. This reflects the paradox of an industry that significantly contributes to the national economy yet leaves profound environmental footprints.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                  <Mountain className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">
                      Economic Importance
                    </h4>
                    <p className="text-sm text-gray-600">
                    Coal and minerals from open-pit mines support global energy needs and generate substantial national revenue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">
                      Environmental Challenges
                    </h4>
                    <p className="text-sm text-gray-600">
                     Open-pit mining activities alter hydrology and can impact local ecosystems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-6 text-gray-800">
                Seasonal Water Dynamics
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
          The tropical climate brings not just rain, but a rhythm of life. With annual rainfall reaching 2.000–3.000 mm, vast mining pits often turn into seasonal lakes. These water bodies are not merely visual phenomena, they represent complex interactions between climate, geology, and human activities that require scientific understanding.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CloudRain className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">
                      Monsoon Patterns
                    </h4>
                    <p className="text-sm text-gray-600">
                     Annual rainfall of 2.000–3.000 mm with strong seasonal variability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Droplets className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-2">
                      Water Accumulation
                    </h4>
                    <p className="text-sm text-gray-600">
                    Open-pit mines become water accumulation zones that can influence regional hydrology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            {/* YouTube Video */}
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/ynN39sfqT8w"
                  title="Coal Mining Environmental Impact Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Video Attribution */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Coal Mining's Environmental Impact | From The
                  Ashes (Credit: National Geographic)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open-Pit with SAR */}
      <section
        id="openpit-sar"
        ref={setSectionRef("openpit-sar")}
        className="relative min-h-screen bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Radio className="w-4 h-4" />
              <span className="text-sm font-medium">
                SAR Technology
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-8 text-gray-900">
              How interpret SAR land change
              <br />
              and seasonal water images?
            </h2>
          </div>

          {/* 2 Column Layout: Text Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text Content */}
            <div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 text-justify">
               SAR radar imagery allows us to see beyond the Earth’s surface.
By interpreting the patterns of signal reflections, we can reveal landscape changes caused by open-pit mining activities as well as the seasonal water dynamics inside the pits. Areas affected by mine expansion, rainwater accumulation, and surrounding vegetation can be distinguished based on the brightness level (backscatter) in radar images. By comparing imagery from different time periods, these changes can be accurately monitored even under persistent cloud cover.
              </p>

            </div>

            {/* Right Column - SAR Backscatter Image */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ImageWithFallback
                  src={Scatter}
                  alt="Understanding SAR Backscatter Patterns - Visual diagram showing the relationship between surface types and radar backscatter intensity, from high backscatter (bright areas like exposed surfaces) to low backscatter (dark areas like water bodies)"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div className="px-4 py-2 text-center">
                  <p className="text-xs text-gray-500">
                    SAR C-band Image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study - Comprehensive Section */}
      <section
        id="satui"
        ref={setSectionRef("satui")}
        className="relative min-h-screen"
      >
        {/* Where is Satui */}
        <div className="relative min-h-[80vh] flex items-center py-16">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={satuiAerialCommunity}
              alt="Aerial view of Satui community showing the local mosque, residential houses, river, and surrounding landscape demonstrating the relationship between mining areas and local settlements"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            <div className="max-w-6xl">
              {/* Liquid Glass Container */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
                <div className="text-white">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                    Case Study
                  </h1>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                    Satui Open-Pit (2015–2025)
                  </h2>

                  <div className="space-y-12 text-lg leading-loose">
                    <p className="text-justify">
            In South Kalimantan, the Satui open-pit mine has long been one of Indonesia’s largest coal producers. Its ever-expanding pit, massive overburden piles, and seasonal water ponds create a dynamic landscape. However, these changes are often missed by optical satellites because tropical clouds frequently obscure the view.
                    </p>

                    <p className="text-justify">
     Synthetic Aperture Radar (SAR) has become key to observing these changes. Unlike optical sensors, this active radar emits its own microwave signals, penetrates clouds, and operates both day and night. With open-access data such as Sentinel-1, mining activity can be consistently monitored throughout the year.
                    </p>

                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-white">
                        Land Change and Seasonal Water Dynamics
                      </h3>
                      <p className="text-justify">
         Land change and seasonal water dynamics are closely linked in mining areas. Pit expansion and new overburden piles alter surface roughness, strengthening radar signals and indicating cleared or compacted areas. Meanwhile, former excavation depressions often fill with rainwater, forming ponds that appear during the wet season (November–May) and shrink in the dry season (June–September).
                      </p>
                    </div>

                    <p className="text-justify">
By combining backscatter change analysis to detect land clearing with SAR time-series monitoring to observe water dynamics, we can build a comprehensive view of how the mine expands while creating new water accumulation patterns. This approach helps us understand the relationship between mining activities, surface morphology, and hydrological changes in tropical regions that are difficult to observe optically.
                    </p>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Gallery Section */}
        <div className="relative bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Five Image Gallery - Seamless Layout */}
            <div className="mb-8">
              <div className="grid grid-cols-5">
                {/* Image 1 - Village Aerial */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={newVillageAerial}
                    alt="Aerial view of village community near mining operations showing residential area, local mosque, and the relationship between mining activities and local settlements"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Image 2 - Mining1 */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={mining1}
                    alt="Active mining operations showing excavation and infrastructure"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Image 3 - Coastal Erosion */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={coastalErosion}
                    alt="Coastal erosion and environmental impact showing the effect of mining activities on waterfront areas and sediment patterns"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Image 4 - Open Pit Mining */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={openPitMining}
                    alt="Large-scale open pit mining operations showing massive excavation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Image 5 - Road Damage */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={newRoadDamage}
                    alt="Severe road infrastructure damage showing deep erosion and environmental impact from mining activities on local transportation infrastructure"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="text-center">
              <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
The visual collection showcases various aspects of environmental change in the Satui mining area, from aerial landscapes to seasonal water dynamics, providing a comprehensive understanding of the mining activities’ impact on the local ecosystem.              </p>
            </div>
          </div>
        </div>

        {/* SAR Comparison Description - Full Width like Sidecar */}
        <div className="relative bg-white">
          <div className="w-full">
            <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 text-center">
                SAR Comparison
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed text-justify">
The theory becomes clearer when we see it directly. Use the slider below to compare the 2015 and 2025 SAR images and observe the pit expansion footprint as well as areas prone to flooding.                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SAR Radar Comparison */}
        <div className="relative min-h-screen bg-white pt-6 pb-12 md:pt-8 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Main Comparison Interface */}
            <div className="max-w-5xl mx-auto">
              {/* Interactive Slider Container - Larger Size */}
              <div className="bg-gray-100 rounded-2xl p-6 md:p-8 shadow-2xl sar-comparison-container">
                <div
                  className={`relative overflow-hidden rounded-xl bg-black shadow-lg cursor-col-resize group select-none sar-comparison-slider ${isDragging ? 'dragging drag-active' : ''} ${isHovering ? 'hover:cursor-col-resize' : ''}`}
                  style={{ willChange: 'transform' }}
                  onMouseMove={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                      const now = performance.now();
                      if (now - lastUpdateRef.current > 16) { // ~60fps throttling
                        lastUpdateRef.current = now;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        setSliderValue([percentage]);
                      }
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onMouseUp={() => {
                    setIsDragging(false);
                    setIsHovering(false);
                  }}
                  onMouseLeave={() => {
                    setIsDragging(false);
                    setIsHovering(false);
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onTouchMove={(e) => {
                    if (e.touches.length === 1 && isDragging) {
                      e.preventDefault();
                      const now = performance.now();
                      if (now - lastUpdateRef.current > 16) { // ~60fps throttling
                        lastUpdateRef.current = now;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const touch = e.touches[0];
                        const x = touch.clientX - rect.left;
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        setSliderValue([percentage]);
                      }
                    }
                  }}
                  onTouchStart={(e) => {
                    if (e.touches.length === 1) {
                      e.preventDefault();
                      setIsDragging(true);
                    }
                  }}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  {/* Image Comparison Container - Optimized for SAR Images with Extended Height */}
                  <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-black select-none" style={{ aspectRatio: '16/10' }}>
                    {/* After Image (2025) - Now as base image on the left */}
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={sarImageNew2025}
                        alt="SAR Image October 3, 2025 - Satui mining area after massive expansion showing extensive mining operations and water accumulation"
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                      />
                    </div>

                    {/* Before Image (2015) - Now clipped on the right with GPU acceleration */}
                    <div
                      className="absolute inset-0 transform-gpu"
                      style={{
                        clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)`,
                        willChange: 'clip-path'
                      }}
                    >
                      <ImageWithFallback
                        src={sarImageNew2015}
                        alt="SAR Image March 31, 2015 - Satui mining area before major expansion showing natural forest cover and minimal industrial activity"
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                      />
                    </div>

                    {/* Slider Line and Handle - Optimized for Drag */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none transition-none"
                      style={{ 
                        left: `${sliderValue[0]}%`,
                        willChange: 'transform',
                        transform: 'translateZ(0)'
                      }}
                    >
                      {/* Larger Drag Area - Invisible but draggable */}
                      <div 
                        className="absolute top-0 bottom-0 -left-4 -right-4 cursor-col-resize pointer-events-auto"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDragging(true);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDragging(true);
                        }}
                      />
                      
                      {/* Visible Handle */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl cursor-col-resize pointer-events-auto hover:scale-110 transition-transform duration-150 sar-comparison-handle">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div className="flex space-x-0.5">
                            <div className="w-0.5 h-4 bg-gray-700"></div>
                            <div className="w-0.5 h-4 bg-gray-700"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Year Labels - Fixed logic for correct fade behavior */}
                    <div 
                      className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-500 ease-out"
                      style={{
                        opacity: Math.max(0, Math.min(1, (sliderValue[0] - 25) / 25)),
                        transform: `scale(${Math.max(0.85, Math.min(1, (sliderValue[0] - 25) / 25 * 0.15 + 0.85))})`,
                        willChange: 'opacity, transform'
                      }}
                    >
                      MARCH 31, 2015
                    </div>
                    <div 
                      className="absolute bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-500 ease-out"
                      style={{
                        opacity: Math.max(0, Math.min(1, (75 - sliderValue[0]) / 25)),
                        transform: `scale(${Math.max(0.85, Math.min(1, (75 - sliderValue[0]) / 25 * 0.15 + 0.85))})`,
                        willChange: 'opacity, transform'
                      }}
                    >
                      OCTOBER 3, 2025
                    </div>

                    {/* Legend - Enhanced */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg text-xs border border-gray-200 shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-gray-900 font-medium">High</span>
                        <div className="w-10 h-2 bg-gradient-to-r from-white to-gray-500 rounded border border-gray-300"></div>
                        <span className="text-gray-600 font-medium">Low</span>
                      </div>
                      <p className="text-center text-gray-600 text-xs">
                        SAR Backscatter Intensity
                      </p>
                      <p className="text-center text-blue-600 text-xs mt-1">
                        Sentinel-1 VV Polarization
                      </p>
                    </div>

                    {/* Drag Instruction - Show when not dragging and at initial position */}
                    {!isDragging && sliderValue[0] === 50 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium pointer-events-none animate-pulse">
                        ← Drag to compare →
                      </div>
                    )}
                  </div>
                </div>
                     <div className="text-center mt-4">
    <p className="text-sm leading-[1.5] text-black-200 max-w-[800px] mx-auto">
   Comparison of SAR backscatter intensity (Sentinel-1 VV polarization) between March 31, 2015 (left) and October 3, 2025 (right).
    </p>
  </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>

      </section>

      {/* Land Change Analysis Section */}
      <section 
        id="land-change"
        ref={setSectionRef("land-change")}
        className="relative bg-white py-16 md:py-20"
      >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Enhanced Content Container */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="text-gray-900">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
                    Land Change
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-600">
                    What Can Be Seen in the Radar?
                  </p>
                </div>

                <div className="space-y-8 text-lg leading-relaxed">
                  <p className="text-justify text-gray-700">
                    Below is a section of the Satui mine in South Kalimantan, an area with rapid pit expansion. The first image is an optical acquisition from Google Earth for visual orientation. Switching to Sentinel-1 SAR imagery (C-band, VV), this subset is dominated by a mosaic of benches and haul roads (bright linear features), disposal/overburden areas (irregular bright patches), and pit ponds and drainage channels (dark patches).

Compared to 2015, the 2025 image shows clear pit expansion: bright areas have widened and become more interconnected, vegetation has decreased leaving more exposed surfaces, the bright linear patterns of benches/haul roads have become denser, and dark patches representing ponds or water retention areas have increased.
                  </p>

                  <div className="text-center">
                    <div className="inline-flex items-center space-x-3 bg-blue-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-sm">
                      <Eye className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Scroll down to explore each stage of the evolution.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer between info box and sidecar */}
        <div className="h-16 md:h-20"></div>

        {/* Sidecar Scrollytelling Section */}
        <div className="relative">
          {/* Fixed sidecar layout */}
          <div className="sticky top-0 h-screen flex">
            {/* Left side - Images with Enhanced Transitions */}
            <div className="w-3/5 relative overflow-hidden bg-black">
              {storySteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 story-image-fade ${
                    activeStoryStep === index
                      ? "story-image-active"
                      : activeStoryStep > index
                      ? "story-image-exit"
                      : "story-image-enter"
                  }`}
                  style={{
                    zIndex: activeStoryStep === index ? 2 : 1,
                    willChange: activeStoryStep === index ? 'auto' : 'transform, opacity'
                  }}
                >
                  {imagesLoaded ? (
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transform-gpu"
                      loading={index === 0 ? "eager" : "lazy"}
                      style={{ willChange: 'transform' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center animate-pulse">
                      <div className="text-white text-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading images...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Enhanced gradient overlay with subtle animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-black/30 to-transparent transition-opacity duration-800 ${
                    activeStoryStep === index ? 'opacity-100' : 'opacity-60'
                  }`} />
                </div>
              ))}
            </div>

            {/* Right side - Content with Enhanced Transitions */}
            <div className="w-2/5 bg-white flex items-center">
              <div className="p-8 max-w-xl">
                <div
                  className="story-content-transition story-content-active"
                  key={activeStoryStep}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <h2 className="text-2xl md:text-3xl mb-3 text-gray-900 transition-all duration-600 ease-out">
                    {storySteps[Math.min(activeStoryStep, storySteps.length - 1)]?.title ||
                      "Satui Mining Area"}
                  </h2>

                  {/* Subtitle - only show if exists */}
                  {storySteps[Math.min(activeStoryStep, storySteps.length - 1)]?.subtitle && (
                    <div className="text-base text-blue-600 font-medium mb-4 transition-all duration-600 ease-out delay-75">
                      {storySteps[Math.min(activeStoryStep, storySteps.length - 1)].subtitle}
                    </div>
                  )}

                  {/* Date - only show if not empty */}
                  {storySteps[Math.min(activeStoryStep, storySteps.length - 1)]?.date && (
                    <div className="text-lg text-gray-600 mb-6 transition-all duration-600 ease-out delay-100">
                      {storySteps[Math.min(activeStoryStep, storySteps.length - 1)].date}
                    </div>
                  )}

                  <p className="text-base text-gray-700 leading-relaxed mb-6 transition-all duration-600 ease-out delay-200 text-justify">
                    {storySteps[Math.min(activeStoryStep, storySteps.length - 1)]?.description ||
                      "Loading story content..."}
                  </p>

                  {/* SAR Legend for radar slides (slides 1, 2) - Enhanced with smooth transitions */}
                  {activeStoryStep !== 0 && activeStoryStep < storySteps.length && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 transition-all duration-700 ease-out delay-300 transform translate-y-0 opacity-100 story-legend">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-800 transition-colors duration-500">
                          HIGH
                        </span>
                        <span className="text-sm font-medium text-gray-800 transition-colors duration-500">
                          LOW
                        </span>
                      </div>
                      <div className="h-3 bg-gradient-to-r from-white via-gray-400 to-black rounded mb-2 border border-gray-200 transition-all duration-500"></div>
                      <p className="text-xs text-gray-600 text-center transition-all duration-500">
                        {storySteps[Math.min(activeStoryStep, storySteps.length - 1)]?.legend ||
                          "Radar backscatter in the VV polarization"}
                      </p>
                    </div>
                  )}

                  {/* Enhanced story navigation dots */}
                  <div className="flex space-x-3 transition-all duration-700 ease-out delay-400">
                    {storySteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (index >= 0 && index < storySteps.length) {
                            setActiveStoryStep(index);
                          }
                        }}
                        className={`story-dot transition-all duration-400 ease-out transform hover:scale-110 ${
                          activeStoryStep === index
                            ? "active w-4 h-4 bg-blue-600 shadow-lg"
                            : "inactive w-3 h-3 bg-gray-300 hover:bg-gray-400"
                        }`}
                        style={{
                          transitionDelay: `${index * 50}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll trigger sections - invisible but necessary for scroll detection */}
          <div className="relative z-10">
            {storySteps.map((step, index) => (
              <div
                key={`trigger-${step.id}`}
                className="h-screen flex items-center justify-end pr-8"
                ref={(el) => {
                  storyStepRefs.current[index] = el;
                }}
              >
                {/* Invisible content for scroll detection */}
                <div className="w-2/5 opacity-0">
                  <div className="p-8">
                    <h3 className="text-2xl mb-3">
                      {step.title}
                    </h3>
                    <div className="text-lg mb-6">
                      {step.date}
                    </div>
                    <p className="text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
<br></br>
<br></br>
<br></br>
        

        {/* Transition Block: Land Change → Seasonal Water */}
       <div className="max-w-5xl mx-auto">
        <p className="text-xl leading-[1.6] text-gray-600 text-justify">
Continuing the story of land change, this panel is like a vegetation diary over the past decade. The green bars record how much green area remains each year, while the Δ ha YoY line tracks the sometimes sharp, sometimes smoother fluctuations, traces that could be related to mining rhythms, rehabilitation efforts, or changing seasons. With these two perspectives, we see not just the big trends but also the smaller moments that shape them, resulting in a more comprehensive and data-driven reading.     </p>
      </div>
      <br></br> 
      <br></br>
             {/* 2 Column Layout: Text Left, Image Right */}
  {/* ✅ NEW WRAPPER: tambah padding kiri-kanan & batasi lebar */}
  <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
     <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center">
  {/* Gambar */}
          
               {/* Legend – Vegetation vs Non-vegetation */}
{/* Legend – Vegetation vs Non-vegetation (custom fill colors) */}
<div className="absolute top-2 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg text-xs border border-gray-200 shadow-lg">
  <p className="text-[11px] font-semibold mb-2">Land Cover Classification</p>

  {/* Vegetation */}
  <div className="flex items-center justify-between gap-3 mb-2">
    <div className="flex items-center gap-2">
      {/* chip kiri */}
      <span
        className="inline-block w-4 h-4 rounded-sm border"
        style={{ backgroundColor: '#1ba351ff', borderColor: '#14833fff' }}
        aria-hidden
      />
      <span className="text-gray-800">Vegetation</span>
    </div>
    {/* kotak warna kanan */}
  </div>

  {/* Non-vegetation / Open-pit */}
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-4 h-4 rounded-sm border border-gray-300 bg-white"
        aria-hidden
      />
      <span className="text-gray-800">Non-vegetation</span>
    </div>
  </div>
</div>


  <div className="inline-block rounded-xl overflow-hidden border border-white/20 shadow-lg">
    <ImageWithFallback
      src={vegetationGif}
      alt="Time-series animation showing vegetation change"
      className="w-full h-auto rounded-xl shadow-lg mx-auto"
    />
  </div>
  

  {/* Caption */}
  <div className="text-center mt-4">
    <p className="text-sm leading-[1.5] text-gray-600 max-w-[600px] mx-auto">
Animated NDVI time-series of annual vegetation change in the </p>
<p className="text-sm leading-[1.5] text-gray-600 max-w-[600px] mx-auto">Satui open-pit landscapes (2015–2025).</p>
  </div>
</div>
      </div>
      {/* Left Column - Text Content */}
            {/* Right Column - SAR Backscatter Image */}
 <div className="rounded-xl border border-black/5 bg-white shadow-lg">
  <div className="border-b border-black/5 px-5 py-4">
    <h3 className="text-lg text-center font-semibold text-slate-900">
      Vegetation Area & Year-over-Year Change (2015–2025)
    </h3>
    <p className="text-sm text-center text-slate-500">
      Bar: Vegetation area (ha), Line: annual change (Δ ha).
    </p>
  </div>

  {/* 👉 beri tinggi eksplisit di container Recharts */}
  <div className="w-full p-4">
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={pitData1} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year1" tick={{ fontSize: 12 }} tickMargin={6} interval={0} />
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v} ha`} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v} ha`} />
        <Tooltip
          formatter={(val: any, name: string) =>
            name.includes("Δ")
              ? [`${Number(val).toFixed(2)} ha`, "Δ From the previous year"]
              : [`${Number(val).toFixed(2)} ha`, "Vegetation area"]
          }
          labelFormatter={(label) => `${label}`}
        />
        <Legend />
        {/* warna agar kontras */}
        <Bar yAxisId="left" dataKey="pitHa1" name="Vegetation area (ha)" radius={[6, 6, 0, 0]} fill="#1ba351ff" />  
        <Line
  yAxisId="right"
  type="monotone"
  dataKey="deltaHa1"
  name="Δ ha (YoY)"
  dot={{ r: 3 }}
  strokeWidth={2}
  stroke="#1f3726ff"
/>
      </ComposedChart>
    </ResponsiveContainer>
            </div>
            <div className="px-5 pb-5 text-center text-sm leading-relaxed text-blue-900/70">
              The area estimate is derived from segmenting green (vegetation).
              <p>
               pixels within each image against the total study area (7,311 ha).
                </p>
            </div>
            <br></br>
          </div>
    </div>
  </div>

        {/* Transition Block: Land Change → Seasonal Water */}
        <div className="relative bg-white py-1 md:py-1">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed text-justify">
From the identified vegetation losses, pit growth and overburden placement emerge as key drivers. These changes do not just alter the land, the new depths and contours retain rainfall. The next step is to track how those basins fill through the seasons, using SAR to separate rough, exposed ground from smooth water surfaces.    </p>
            </div>
          </div>
        </div>
      </section>

{/* Seasonal Water - Comprehensive Section */}
<section
  id="seasonal-water"
  ref={setSectionRef("seasonal-water")}
  className="relative bg-blue-900 py-16 md:py-24"
>
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    {/* Section Header */}
    <div className="text-center mb-16">
     <h2 className="text-3xl md:text-4xl mb-6 text-white">
        Seasonal Water
      </h2>
                 <p className="text-xl md:text-2xl text-white">
                      When the Pits Become Lakes
                  </p>
                  <br></br>
     <div className="max-w-4xl mx-auto">
        <p className="text-xl leading-[1.6] text-blue-200 text-justify">
          Like Alice stepping through the looking glass, we travel through time watching the Satui landscape transform as the seasons turn. During the wet monsoon, mining depressions fill with water, forming pit lakes and sedimentation ponds that gleam distinctly in radar imagery. Below, you can toggle Wet–Dry to compare Sentinel-1 SAR (VV polarization) images between the wet and dry seasons. This visualization uses 2020 data to show how monsoon rainfall expands water coverage across the mining area.
        </p>
      </div>
    </div>

    {/* Main Content - Single Card Layout */}
    <div className="max-w-4xl mx-auto mb-20">
      {/* Wet/Dry Toggle Card - Full Width */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Toggle Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={!showWetSeason ? "font-medium text-white" : "text-blue-300"}>
            Dry
          </span>
          <Switch
            checked={showWetSeason}
            onCheckedChange={setShowWetSeason}
            className="data-[state=checked]:bg-blue-500"
          />
          <span className={showWetSeason ? "font-medium text-white" : "text-blue-300"}>
            Wet
          </span>
        </div>

        {/* Main Image Display */}
        <div className="relative mb-6">
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <ImageWithFallback
              src={showWetSeason ? seasonalWaterWet : seasonalWaterDry}
              alt={showWetSeason ? "Wet season water coverage showing expanded water areas in mining pits" : "Dry season water coverage showing reduced water areas in mining pits"}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              loading="lazy"
            />
            
            {/* Season overlay */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              showWetSeason ? 'bg-blue-500/20' : 'bg-orange-500/20'
            }`} />
            
            {/* Season label */}
            <div className="absolute top-4 left-4">
              <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                showWetSeason 
                  ? 'bg-blue-500/80 text-white' 
                  : 'bg-orange-500/80 text-white'
              }`}>
                {showWetSeason ? 'Wet Season (Nov, 2020)' : 'Dry Season (Jun, 2020)'}
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mb-6">
          <p className="text-sm leading-[1.5] text-blue-200 max-w-[600px] mx-auto">
            Wet vs Dry season water mask comparison showing seasonal variability in pit water coverage and the impact of monsoon patterns on mining area hydrology
          </p>
        </div>

        {/* Season Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Droplets className={`w-5 h-5 ${showWetSeason ? "text-blue-300" : "text-orange-300"}`} />
            <span className="text-sm text-blue-100">
              {showWetSeason
                ? "Heavy rainfall fills the mine pit"
                : "Low rainfall, high evaporation"}
            </span>
          </div>
          
          <div>
            <p className="text-sm text-blue-200 mb-2">Water Coverage</p>
            <Progress
              value={showWetSeason ? 45 : 15}
              className="w-full mb-2 bg-white/20"
            />
            <p className="text-xs text-blue-300">
              {showWetSeason ? "~45% of pit areas" : "~15% of pit areas"}
            </p>
          </div>
        </div>

        {/* Additional Context Text */}
      </div>
    </div>

    {/* 🔹 Time-Series GIF Section (DI LUAR CARD, tapi masih dalam section) */}
    <br>
    </br>
    <br>
    </br>
      <div className="max-w-4xl mx-auto mb-20">
        <div className="max-w-4xl mx-auto">
        <p className="text-xl leading-[1.6] text-blue-200 text-justify">
Having observed a single wet season snapshot, let's now turn back time. The animation below (2015–2025, Sentinel-1 VV) reveals how both pit expansion and seasonal water pulses evolve across years, illustrating not only the progressive growth of mining areas but also the rhythmic fluctuation of water bodies influenced by monsoon patterns. Over the decade, subtle changes in radar backscatter intensity highlight transitions between exposed surfaces, vegetated zones, and water-filled pits, offering a dynamic view of how mining operations and natural hydrological cycles continuously reshape the landscape.</p>
      </div>
      <br>
      </br>
      <br>
      </br>
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center">
  {/* Gambar */}
                     {/* Legend - Enhanced */}
                    <div className="  absolute top-2 left-4 -translate-x-3 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg text-xs border border-gray-200 shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-gray-900 font-medium">High</span>
                        <div className="w-10 h-2 bg-gradient-to-r from-white to-gray-500 rounded border border-gray-300"></div>
                        <span className="text-gray-600 font-medium">Low</span>
                      </div>
                      <p className="text-center text-gray-600 text-xs">
                        SAR Backscatter Intensity
                      </p>
                      <p className="text-center text-blue-600 text-xs mt-1">
                        Sentinel-1 VV Polarization
                      </p>
                    </div>
  <div className="inline-block rounded-xl overflow-hidden border border-white/20 shadow-lg">
    <ImageWithFallback
      src={timeSeriesGif}
      alt="Time-series animation showing seasonal water change"
      className="w-full h-auto rounded-xl shadow-lg mx-auto"
    />
  </div>
  

  {/* Caption */}
  <div className="text-center mt-4">
    <p className="text-sm leading-[1.5] text-blue-200 max-w-[600px] mx-auto">
Animated time series visualization (Sentinel-1 SAR) showing annual changes in water coverage across the Satui open pit mine landscape.
    </p>
  </div>
</div>

      <br>
      </br>
      <br>
      </br>

    </div>
  </div>
           <div className="max-w-5xl mx-auto">
        <p className="text-xl leading-[1.6] text-blue-200 text-justify">
Over time, the changing patterns of the water area reveal more than temporary fluctuations, they capture how hydrological dynamics within and around the mine have shifted over the years. By quantifying these changes, we can see how the extent of seasonal water bodies has varied across the decade, reflecting both natural monsoon cycles and human-induced landscape alteration.      </p>
      </div>
      <br></br> 
      <br></br>
             {/* 2 Column Layout: Text Left, Image Right */}
  {/* ✅ NEW WRAPPER: tambah padding kiri-kanan & batasi lebar */}
  <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
      {/* Left Column - Text Content */}
            {/* Right Column - SAR Backscatter Image */}
 <div className="rounded-xl border border-black/5 bg-white shadow-lg">
  <div className="border-b border-black/5 px-5 py-4">
    <h3 className="text-lg text-center font-semibold text-slate-900">
      Water Area & Year-over-Year Change (2015–2025)
    </h3>
    <p className="text-sm text-center text-slate-500">
      Bar: Total seasonal water area (ha), Line: annual change (Δ ha).
    </p>
  </div>

  {/* 👉 beri tinggi eksplisit di container Recharts */}
  <div className="w-full p-4">
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={pitData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} tickMargin={6} interval={0} />
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v} ha`} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v} ha`} />
        <Tooltip
          formatter={(val: any, name: string) =>
            name.includes("Δ")
              ? [`${Number(val).toFixed(2)} ha`, "Δ From the previous year"]
              : [`${Number(val).toFixed(2)} ha`, "Water area"]
          }
          labelFormatter={(label) => `${label}`}
        />
        <Legend />
        {/* warna agar kontras */}
        <Bar yAxisId="left" dataKey="pitHa" name="Water area (ha)" radius={[6, 6, 0, 0]} fill="#1b4da3ff" />  
        <Line
  yAxisId="right"
  type="monotone"
  dataKey="deltaHa"
  name="Δ ha (YoY)"
  dot={{ r: 3 }}
  strokeWidth={2}
  stroke="#1f2937"
/>
      </ComposedChart>
    </ResponsiveContainer>
            </div>
            <div className="px-5 pb-5 text-center text-sm leading-relaxed text-blue-900/70">
              The area estimate is derived from the segmentation of water areas in each 
              <p>
                image against the total study area (7,311 ha).
                </p>
            </div>
            <br></br>
          </div>
      <div>
        <h2 className="text-3xl md:text-3xl mb-6 text-white">
       Tracing a Decade of Water Dynamics
      </h2>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 text-justify">
From 2015 to 2025, the Satui open-pit landscape reveals a shifting pattern of water expansion and retreat. Water-covered areas peaked during the wet season, forming extensive pit lakes and sedimentation ponds before gradually receding in later years. Each estimate, derived from Sentinel-1 SAR segmentation, maps how rainfall, excavation, and drainage continuously reshaped the hydrological footprint within the 7,311-hectare mining corridor, illustrating the complex interplay between extraction and seasonal water beneath Kalimantan’s cloudy skies.
        </p>
      </div>
    </div>
  </div>
          <div className="max-w-5xl mx-auto">
        <p className="text-xl leading-[1.6] text-blue-200 text-justify">
Beyond visualization, these expanding pit lakes pose environmental risks. When unmanaged, they can store acidic, metal-rich water harmful to ecosystems. During heavy monsoon rain, overflow may contaminate rivers or nearby communities. Understanding these seasonal dynamics through radar is vital not only for monitoring land change but for anticipating environmental and safety hazards in tropical mining regions.
      </p>
      </div> 
</section>

<section id="impact-restoration" ref={setSectionRef("impact-restoration")}  className="relative bg-gradient-to-br bg-blue-600 to-gray-900 py-20">
  <div className="max-w-6xl mx-auto px-4 md:px-6 text-white">
    <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
      Impacts & Restoration
    </h2>
<br></br>
<br></br>
    {/* Impacts */}
    <p className="text-xl leading-[1.6] text-blue-200 text-justify">
      As the monsoon cycle fills and drains the mining pits each year, the story doesn’t end at the water’s edge. Beyond the satellite view lies a deeper reality, the human and ecological cost of extraction. When rainfall intensifies and pit lakes rise, the boundary between mined land and villages blurs. What seems like a radar-dark patch of water may, on the ground, mean flooded homes or displaced families. The transformations captured from space echo the struggles of those living just beyond the pit’s edge.
    </p>
<br></br>
    {/* Image grid */}
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
      <img src={kasianJPG} className="rounded-xl shadow-lg" alt="Flood rescue operation" />
        <div className="text-center mt-4">
    <p className="text-sm leading-[1.6] text-blue-200 max-w-[200px] mx-auto">
Evacuation during the 2021 Satui flood (Credit: Republika.co.id)
    </p>
  </div>
      </div>
          <p className="text-xl leading-[1.6] text-blue-200 text-justify">
 When excavation alters natural drainage, nearby villages face recurrent floods. Families evacuate as muddy water enters their homes, carrying silt and debris from exposed slopes. In low-lying areas, wooden houses stand half-submerged, their walls soaked by rising floodwater. Some homes, built too close to unstable ground, have collapsed entirely into abandoned pits, leaving behind only twisted roofs and scattered belongings. These are not isolated events they are visible reminders of how mining reshapes hydrology, weakens soil, and increases risk. Over time, the altered terrain amplifies runoff, while clogged drainage channels turn rainfall into flash floods. Each inundation is not only a natural event but a reflection of disrupted balance between people, land, and the forces they once relied on for stability.
    </p>
    </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
      <p className="text-xl leading-[1.6] text-blue-200 text-justify">
        Abandoned pits often collect acidic, metal-rich water, slowly poisoning the soil and nearby rivers. Over time, these stagnant pools accumulate sediments and heavy metals, altering groundwater chemistry and reducing the fertility of surrounding land. These dark patches, clearly visible from space mark the long-term scars of extraction and neglected reclamation. Without proper intervention, they threaten aquatic ecosystems, spread pollutants downstream, and disrupt the natural flow of rivers. What remains is not just a scar on the landscape, but a lingering environmental hazard that persists long after mining operations cease, silently shaping the lives and livelihoods of those who remain nearby.
    </p>
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
    <img src={rumahRobohJPEG} className="rounded-xl shadow-lg" alt="Collapsed house near mining pit" />
      <div className="text-center mt-4">
    <p className="text-sm leading-[1.5] text-blue-200 max-w-[600px] mx-auto">
Collapsed houses near a mining pit in Satui, 
<p> South Kalimantan (Credit: Jejakrekam.com)</p>
    </p>
  </div>
    </div>
    </div>

    {/* Restoration */}
    <p className="text-xl leading-[1.6] text-blue-200 text-justify">
    Yet recovery is possible. Reclamation programs are replanting trees, reshaping slopes, and restoring water flow across parts of the mining corridor. Some abandoned pits are being transformed into managed wetlands that support new habitats and filter runoff. Each patch of regrown vegetation represents hope, a sign that the landscape can heal. Restoration here is not only environmental repair but also a social commitment to rebuild balance between industry, nature, and the people who share this terrain.
    </p>
<br></br>
    <div className="flex justify-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
      <img src={reklamasiJPG} className="rounded-xl shadow-lg w-full md:w-3/4" alt="Reclamation efforts" />
        <div className="text-center mt-4">
    <p className="text-sm leading-[1.5] text-blue-200 max-w-[600px] mx-auto">
 Reclamation activities at a post-mining site in Indonesia (Credit: Agincourt Resources)
    </p>
  </div>
      </div>
    </div>
  </div>
</section>
  
      {/* Why Radar */}
      <section
        id="radar"
        ref={setSectionRef("radar")}
        className="relative min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl mb-8 text-center">
              Why This Technology?
            </h2>
            
            {/* Main SAR Technology Section - 2 Column Layout: Image Left, Text Right */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Column - SAR Frequency Bands Diagram */}
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <ImageWithFallback
                      src={sarFrequencyBands}
                      alt="SAR frequency bands diagram showing P, L, S, C, and X bands across radio frequencies, microwaves, and infrared spectrum with frequency ranges from 0.3 to 12 GHz - Credit: NASA SAR Handbook"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        SAR Frequency Bands (Credit: NASA SAR Handbook)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="text-base md:text-xl lg:text-2xl space-y-6 text-gray-200 leading-relaxed text-justify">
                  <p>
Synthetic Aperture Radar (SAR) emits microwave signals and records their reflections (backscatter), which are influenced by surface roughness, moisture, and the radar’s incidence angle. Its key advantage is that SAR does not depend on sunlight and can penetrate thick clouds, enabling Earth observation both day and night. This makes it highly suitable for Satui, which is almost always cloud-covered during the rainy season.
                  </p>

                  <p>
In this project, we used Sentinel-1 C-band (VV polarization) data on Google Earth Engine. In the VV channel, calm water appears dark because it absorbs radar signals, rough surfaces such as mine benches and haul roads strongly reflect the signal and appear bright, while dense vegetation tends to show as gray.
                  </p>
                </div>
              </div>
            </div>

            {/* Radar Scattering and Polarizations Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl mb-8 text-white">
                Radar Scattering and Polarizations
              </h3>
              
              {/* 2 Column Layout: Text Left, Image Right */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Column - Text Content */}
                <div className="text-base md:text-xl lg:text-2xl space-y-6 text-gray-200 leading-relaxed text-justify">
                  <p>
The Sentinel-1 radar emits microwaves and records their reflections with different polarizations, combinations of horizontal and vertical orientations of the transmitted and received waves (e.g., HH, HV, VV). In this project, we used the C-band VV polarization, where the wave is transmitted and received vertically. Each polarization produces distinct interaction characteristics with the Earth’s surface, helping to distinguish features in the mining landscape.                  </p>

                  <p>
In the Satui open-pit mining area, the most common scattering mechanisms include:                  </p>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="text-lg font-medium text-blue-300 mb-2">
                        Specular / Surface Scattering
                      </h4>
                      <p className="text-sm">
Occurs on calm water surfaces, such as pit ponds during the rainy season. Radar signals are reflected away from the sensor, making water areas appear dark (radar-dark) in the image.                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="text-lg font-medium text-gray-300 mb-2">
                        Rough Scattering
                      </h4>
                      <p className="text-sm">
Appears on slightly rough surfaces, such as wind-ruffled water or wet overburden piles. Some radar energy is scattered back to the sensor, making these areas appear dark gray.                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="text-lg font-medium text-orange-300 mb-2">
                        Double Bounce Scattering
                      </h4>
                      <p className="text-sm">
Occurs when smooth water surfaces interact with upright objects above them, such as flooded vegetation or mining structures along pond edges. The radar signal bounces twice (from water to vegetation/structures and back to the sensor), causing these areas to appear very bright.                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="text-lg font-medium text-green-300 mb-2">
                        Volume Scattering
                      </h4>
                      <p className="text-sm">
Common in areas with dense vegetation, where radar waves are repeatedly scattered by leaves, branches, and trunks before returning to the sensor. This results in textured gray tones in the image.                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Radar Polarization and Scattering Diagrams */}
                <div className="space-y-6">
                  {/* Radar Polarization Diagram */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <ImageWithFallback
                      src={radarPolarization}
                      alt="Radar scattering and polarization diagram showing HH (Horizontal transmit, horizontal receive), VV (Vertical transmit, vertical receive), HV (Horizontal transmit, vertical receive), and VH (Vertical transmit, horizontal receive) configurations with wave patterns"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        Radar Polarization Configurations (H = Horizontal, V = Vertical) (Credit: NASA SAR Handbook)
                      </p>
                    </div>
                  </div>

                  {/* SAR Scattering Mechanisms Diagram */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <ImageWithFallback
                      src={sarScatteringMechanisms}
                      alt="SAR scattering mechanisms in forest environments showing volume scattering, surface scattering, and volume-surface interactions with different forest heights and biomass levels, demonstrating how radar signals interact with vegetation canopy and soil surface"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        SAR Scattering Mechanisms in Forest Environments (Credit: NASA SAR Handbook)
                      </p>
                    </div>
                  </div>
                </div>
               </div>
             </div>
            </div>
                  <br></br>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Column - SAR Frequency Bands Diagram */}
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <ImageWithFallback
                      src={lowHighPNG}
                      alt="SAR frequency bands diagram showing P, L, S, C, and X bands across radio frequencies, microwaves, and infrared spectrum with frequency ranges from 0.3 to 12 GHz - Credit: NASA SAR Handbook"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        Understanding NDVI (Credit: MapScaping)
                      </p>
                    </div>
                  </div>
                  <br></br>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                    <ImageWithFallback
                      src={ndviPNG}
                      alt="SAR frequency bands diagram showing P, L, S, C, and X bands across radio frequencies, microwaves, and infrared spectrum with frequency ranges from 0.3 to 12 GHz - Credit: NASA SAR Handbook"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        NDVI interpretation for vegetation health (Credit: Handal Selaras)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="text-base md:text-xl lg:text-2xl space-y-6 text-gray-200 leading-relaxed">
                     <h3 className="text-2xl mb-8 text-white">
                NDVI (Normalized Difference Vegetation Index)
              </h3>
                  <p className="text-justify">
                    While radar reveals the shape and texture of the mine, NDVI exposes the green heartbeat of the landscape. Derived from optical satellite data, NDVI compares how much red and near-infrared light plants absorb and reflect a simple ratio that tells a powerful story about life on the ground.

In Satui, NDVI highlights how vegetation retreats as mining expands. Healthy plants, rich in chlorophyll, reflect near-infrared light strongly and appear bright green in NDVI maps. Bare soil and exposed rock, by contrast, return low or even negative values, marking areas stripped of life.
                  </p >

                  <p className="text-justify">
                  Each color range in NDVI from pale yellow to deep green represents a stage in this transformation:

−1 to 0 → barren surfaces or dead vegetation,

0 to 0.33 → stressed or unhealthy plants,

0.33 to 0.66 → moderately healthy growth,

0.66 to 1 → lush, thriving vegetation,

By layering NDVI over radar imagery, we can see not only where the mine grows, but how the surrounding ecosystem responds revealing the silent trade-off between extraction and regeneration across the Satui corridor.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* References & Resources */}
      <section
        id="references"
        ref={setSectionRef("references")}
        className="relative min-h-screen bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">
              References & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Scientific sources, datasets, and methodological
            </p>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              references that support this research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Scientific References */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl">
                    Scientific References
                  </h3>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      NASA ARSET SAR Training
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      (2024). ARSET - An Introduction to Synthetic Aperture Radar (SAR) and its Applications. NASA Applied Remote Sensing Training Program (ARSET). https://appliedsciences.nasa.gov/get-involved/training/english/arset-introduction-synthetic-aperture-radar-sar-and-its-applications
                    </p>
                    <Badge variant="outline">Training</Badge>
                  </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      ARSET - Creating and Using Normalized Difference Vegetation Index (NDVI) from Satellite Imagery
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
(2016). ARSET - Creating and Using Normalized Difference Vegetation Index (NDVI) from Satellite Imagery. NASA Applied Remote Sensing Training Program (ARSET). https://appliedsciences.nasa.gov/get-involved/training/english/arset-creating-and-using-normalized-difference-vegetation-index-ndvi
                    </p>
                    <Badge variant="outline">Training</Badge>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      SAR Flood & Subsidence Monitoring
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      (2023). ARSET - SAR for Detecting and Monitoring Floods, Sea Ice, and Subsidence from Groundwater Extraction. NASA Applied Remote Sensing Training Program (ARSET). https://appliedsciences.nasa.gov/get-involved/training/english/arset-sar-detecting-and-monitoring-floods-sea-ice-and-subsidence
                    </p>
                    <Badge variant="outline">Monitoring</Badge>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      SAR Landcover Applications
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      (2019). ARSET - SAR for Landcover Applications. NASA Applied Remote Sensing Training Program (ARSET). https://appliedsciences.nasa.gov/get-involved/training/english/arset-sar-landcover-applications
                    </p>
                    <Badge variant="outline">Landcover</Badge>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Sentinel-1 Change Detection
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Canty, M. (2023). Detecting Changes in Sentinel-1 Imagery (Part 1). Google Earth Engine Tutorial. Retrieved October 5, 2025, from https://developers.google.com/earth engine/tutorials/community/detecting-changes-in-sentinel-1-imagery-pt-1
                    </p>
                    <Badge variant="outline">Tutorial</Badge>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Sentinel-1 Algorithms
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Google. (n.d.). Sentinel-1 Algorithms. Google Earth Engine Guides. Retrieved October 5, 2025, from https://developers.google.com/earth-engine/guides/sentinel1 Developers
                    </p>
                    <Badge variant="outline">Documentation</Badge>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Surface Water Mapping Algorithms
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Markert, K. N., Markert, A. M., Mayer, T., Nauman, C., Haag, A., Poortinga, A., Bhandari, B., Thwal, N. S., Kunlamai, T., Chishtie, F., Kwant, M., Phongsapan, K., Clinton, N., Towashiraporn, P., & Saah, D. (2020). Comparing Sentinel-1 Surface Water Mapping Algorithms and Radiometric Terrain Correction Processing in Southeast Asia Utilizing Google Earth Engine. Remote Sensing, 12(15), 2469. https://doi.org/10.3390/rs12152469
                    </p>
                    <Badge variant="outline">Research</Badge>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Global Surface Water Mapping
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Pekel, JF., Cottam, A., Gorelick, N. & Belward, A. S. (2016). High-resolution mapping of global surface water and its long-term changes. Nature 540, 418–422. https://doi.org/10.1038/nature20584
                    </p>
                    <Badge variant="outline">
                      Water Mapping
                    </Badge>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      UN-SPIDER Flood Mapping
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      United Nations Office for Outer Space Affairs (UN-SPIDER). (n.d.). Step-by-Step: Recommended Practice: Flood mapping and damage assessment using Sentinel-1 SAR data in Google Earth Engine. UN-SPIDER Knowledge Portal. Retrieved October 5, 2025, from https://www.un-spider.org/advisory-support/recommended practices/recommended-practice-google-earth-engine-flood-mapping/step-by-step
                    </p>
                    <Badge variant="outline">Practice Guide</Badge>
                  </div>

                  <div className="p-4 bg-lime-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Rainfall Validation in Tropics
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Wiwoho, B. S., Astuti, I. S., Alfarizi, I. A. G., & Sucahyo, H. R. (2021). Validation of Three Daily Satellite Rainfall Products in a Humid Tropic Watershed, Brantas, Indonesia: Implications to Land Characteristics and Hydrological Modelling. Hydrology, 8(4), 154. https://doi.org/10.3390/hydrology8040154
                    </p>
                    <Badge variant="outline">Hydrology</Badge>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Mining Footprint Detection
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Zhang, M., He, T., Li, G., Xiao, W., Song, H., Lu, D., & Wu, C. (2021). Continuous Detection of Surface-Mining Footprint in Copper Mine Using Google Earth Engine. Remote Sensing, 13(21), 4273. https://doi.org/10.3390/rs13214273
                    </p>
                    <Badge variant="outline">Mining Detection</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Resources */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl">
                    Technical Resources
                  </h3>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Google Earth Engine (GEE)
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Cloud platform for Sentinel-1 C-band (VV) processing, median composites, Otsu water masks, NDVI-based vegetation detection, Wet/Dry frequency analysis, Δ(Wet−Dry), and raster/vector export.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Platform</Badge>
                      <Badge variant="outline">Free Access</Badge>
                      <Badge variant="outline">SAR</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      QGIS
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Digitizing/determining AOI and buffers, editing detected polygons (wet cores/change polygons), and map layout.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">GIS</Badge>
                      <Badge variant="outline">Open Source</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Sentinel-1 GRD (COPERNICUS/S1_GRD)
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      SAR C-band (IW, GRD) dataset used for all VV backscatter analyses.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Dataset</Badge>
                      <Badge variant="outline">Open Access</Badge>
                      <Badge variant="outline">SAR</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      CHIRPS Daily
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Daily rainfall dataset for monsoon accumulation and counting very heavy rain days—linking pit inundation to monsoons.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Dataset</Badge>
                      <Badge variant="outline">Climate</Badge>
                      <Badge variant="outline">Free</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      JRC Global Surface Water (GSW)
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Seasonality layer to distinguish permanent vs. seasonal water (optional as a mask when focusing on seasonal water).
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Dataset</Badge>
                      <Badge variant="outline">Water</Badge>
                      <Badge variant="outline">Free</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      (Optional) ESA SNAP / Sentinel-1 Toolbox
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      If you need advanced desktop preprocessing (calibration, terrain correction, speckle filter) before importing into GEE/QGIS.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Software</Badge>
                      <Badge variant="outline">Open Source</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      NASA Earthdata Search
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Earthdata Search enables data discovery, search, comparison, visualization, and access across NASA's Earth science data holdings.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">Data Portal</Badge>
                      <Badge variant="outline">NASA</Badge>
                      <Badge variant="outline">Free Access</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Alaska Satellite Facility (ASF) Data Search Vertex
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      The ASF operates the NASA archive of SAR data and provides services to researchers supporting NASA's Earth Science Data Systems (ESDS) Program.
                    </p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">SAR Archive</Badge>
                      <Badge variant="outline">NASA</Badge>
                      <Badge variant="outline">Free Access</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
