import React, { useState } from 'react';
import { 
  Globe, 
  Video, 
  CreditCard, 
  User, 
  LogOut, 
  Search, 
  Star, 
  CheckCircle, 
  Menu,
  X,
  MessageSquare, 
  Mic,
  VideoOff,
  PhoneOff,
  Smartphone,
  BookOpen,
  Briefcase,
  Award
} from 'lucide-react';

// --- MOCK DATA (Updated for Business/IELTS & Nigeria Focus) ---

const MOCK_TEACHERS = [
  {
    id: 1,
    name: "Anita P A.",
    country: "Nigeria",
    flag: "🇳🇬",
    rate: 100,
    rating: 5.0,
    students: 120,
    specialty: "Business English & Email Drafting",
    available: true,
    bio: "Expert in corporate communication. I help professionals find the precise vocabulary needed for client meetings and high-stakes presentations.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chidimma&backgroundColor=c0aede"
  },
  {
    id: 2,
    name: "Vicky M.",
    country: "Nigeria",
    flag: "🇳🇬",
    rate: 100,
    rating: 5.0,
    students: 200,
    specialty: "IELTS Academic Prep (Band 7+)",
    available: true,
    bio: "Specializing in University entrance exams. I focus on structure and tone to help you communicate with authority.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka&backgroundColor=d1d4f9"
  },
  {
    id: 3,
    name: "Esther A.",
    country: "Nigeria",
    flag: "🇳🇬",
    rate: 100,
    rating: 4.9,
    students: 150,
    specialty: "Advanced Grammar & Editing",
    available: true,
    bio: "Master English with precision. I help graduate students refine their thesis papers and academic speaking skills.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc"
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    country: "USA",
    flag: "🇺🇸",
    rate: 100,
    rating: 4.8,
    students: 85,
    specialty: "American Business Culture",
    available: false,
    bio: "Cross-cultural communication coach for executives working with American clients.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4"
  }
];

const MOCK_SCHEDULE = [
  { id: 101, teacher: "Anita P.", time: "Today, 14:00 (UTC+1)", status: "Upcoming" },
];

// --- COMPONENTS ---

const Header = ({ setView, userType, setUserType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => {
              setView('home');
              setUserType(null);
            }}
          >
            <div className="bg-indigo-800 p-2 rounded-lg mr-2">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Script Precision</h1>
              <p className="text-xs text-indigo-800 font-medium tracking-wider">MASTER ENGLISH WITH PRECISION</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {!userType ? (
              <>
                <button onClick={() => setView('home')} className="text-gray-500 hover:text-indigo-800">Home</button>
                <button onClick={() => setView('about')} className="text-gray-500 hover:text-indigo-800">Our Method</button>
                <div className="flex items-center space-x-4 ml-4">
                  <button 
                    onClick={() => { setUserType('student'); setView('student-dash'); }}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Student Login
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {userType === 'student' ? 'Student Portal' : 'Teacher Portal'}
                </span>
                <button 
                  onClick={() => { setUserType(null); setView('home'); }}
                  className="flex items-center text-gray-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ setView, setUserType }) => (
  <div className="bg-white pb-20">
    <div className="relative bg-indigo-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-indigo-900 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Speak with Authority.<br/>
          <span className="text-indigo-200">Write with Precision.</span>
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Master English with meticulously crafted lessons. We help university students and professionals find the exact vocabulary needed for high-stakes communication.
        </p>
        <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
          <button 
            onClick={() => { setUserType('student'); setView('student-dash'); }}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
          >
            Start Learning (¥100/Lesson)
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-indigo-600">
          <div className="flex justify-center mb-4">
            <Briefcase className="h-10 w-10 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-center text-gray-900">Business Professional?</h3>
          <p className="mt-2 text-gray-600 text-center text-sm">
            Struggling to find the professional tone for client meetings? We fix your "almost fluent" English.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-green-600">
          <div className="flex justify-center mb-4">
            <Award className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-center text-gray-900">IELTS & Academic</h3>
          <p className="mt-2 text-gray-600 text-center text-sm">
            Prepare for graduate school with tutors who have exceptional university education and neutral accents.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-purple-600">
          <div className="flex justify-center mb-4">
            <Smartphone className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-center text-gray-900">WeChat & VooV</h3>
          <p className="mt-2 text-gray-600 text-center text-sm">
            Seamless integration with the tools you already use. 45-minute focused sessions.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BookingModal = ({ teacher, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X className="w-6 h-6" />
      </button>
      
      <div className="text-center mb-6">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
        <p className="text-sm text-gray-500 mt-1">with {teacher.name}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Lesson Duration:</span>
          <span className="font-medium text-gray-900">45 Minutes</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Platform:</span>
          <span className="font-medium text-indigo-600">VooV Meeting</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-900 font-bold">Total:</span>
          <span className="font-bold text-green-600 text-xl">¥{teacher.rate} RMB</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
          <p className="text-sm font-medium text-green-800 mb-2">Step 1: Add our Official WeChat</p>
          <p className="text-2xl font-bold text-gray-900 select-all">ScriptPrecision</p>
          <button 
            onClick={() => {
              navigator.clipboard.writeText("ScriptPrecision");
              alert("WeChat ID copied to clipboard!");
            }}
            className="text-xs text-green-600 underline mt-1 cursor-pointer"
          >
            Tap to copy ID
          </button>
        </div>

        <p className="text-xs text-center text-gray-500">
          <strong>Step 2:</strong> Send a message with the text "Booking {teacher.name}" and make the transfer of ¥100.
        </p>
        
        <button 
          onClick={onClose}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
        >
          I Have Added You
        </button>
      </div>
    </div>
  </div>
);

const TeacherCard = ({ teacher, onBook }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
    <div className="p-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img src={teacher.image} alt={teacher.name} className="h-16 w-16 rounded-full bg-gray-100" />
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              {teacher.name} <span className="ml-2 text-lg">{teacher.flag}</span>
            </h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-bold text-gray-700">{teacher.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {teacher.specialty}
        </span>
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{teacher.bio}</p>
      </div>
    </div>
    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
      <div>
        <span className="text-lg font-bold text-gray-900">¥{teacher.rate}</span>
        <span className="text-sm text-gray-500">/45min</span>
      </div>
      <button 
        onClick={() => onBook(teacher)}
        className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
      >
        Book Class
      </button>
    </div>
  </div>
);

const StudentDashboard = ({ setView, setMeetingTeacher }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);

  const filteredTeachers = MOCK_TEACHERS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {selectedTeacherForBooking && (
        <BookingModal 
          teacher={selectedTeacherForBooking} 
          onClose={() => setSelectedTeacherForBooking(null)} 
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                L
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Li Wei</h2>
                <p className="text-sm text-gray-500">WeChat ID: liwei_88</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">My Goal</p>
              <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">
                IELTS Band 7.5
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Video className="h-5 w-5 mr-2 text-blue-500" />
              VooV Schedule
            </h3>
            <div className="space-y-4">
              {MOCK_SCHEDULE.map(schedule => (
                <div key={schedule.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm font-bold text-gray-900">{schedule.teacher}</p>
                  <p className="text-xs text-gray-600 mb-2">{schedule.time}</p>
                  <button 
                    onClick={() => {
                       const teacher = MOCK_TEACHERS.find(t => t.name === schedule.teacher) || MOCK_TEACHERS[0];
                       setMeetingTeacher(teacher);
                       setView('classroom');
                    }}
                    className="w-full text-xs bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Launch VooV
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Select a Tutor</h1>
            <p className="text-gray-500">University-educated tutors specializing in Business English & IELTS.</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for 'IELTS', 'Business', or 'Email'..." 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onBook={setSelectedTeacherForBooking} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = ({ setView }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
      <p className="text-gray-500">Manage your VooV meeting links and payments.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Payout</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">¥1,200</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Payouts processed weekly via transfer.</p>
      </div>
    </div>
  </div>
);

const Classroom = ({ teacher, onLeave }) => (
  <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col h-screen">
    <div className="h-14 bg-blue-900 flex items-center justify-between px-4 shrink-0">
      <div className="text-white font-medium flex items-center">
        <div className="bg-blue-700 px-2 py-1 rounded mr-3 text-xs font-bold">VooV Meeting</div>
        Lesson: Business English with {teacher?.name}
      </div>
      <button onClick={onLeave} className="text-red-400 hover:text-white text-sm font-bold">
        End Meeting
      </button>
    </div>
    <div className="flex-1 flex items-center justify-center bg-gray-800 relative">
      <div className="text-center text-gray-400">
        <Video className="h-20 w-20 mx-auto mb-4 opacity-20" />
        <p>VooV Meeting Interface Simulation</p>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
         <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center"><Mic className="text-white h-5 w-5"/></div>
         <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center"><VideoOff className="text-white h-5 w-5"/></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('home'); 
  const [userType, setUserType] = useState(null); 
  const [meetingTeacher, setMeetingTeacher] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {view === 'classroom' ? (
        <Classroom teacher={meetingTeacher} onLeave={() => setView(userType === 'teacher' ? 'teacher-dash' : 'student-dash')} />
      ) : (
        <>
          <Header setView={setView} userType={userType} setUserType={setUserType} />
          
          {view === 'home' && (
            <Hero setView={setView} setUserType={setUserType} />
          )}

          {view === 'student-dash' && (
            <StudentDashboard setView={setView} setMeetingTeacher={setMeetingTeacher} />
          )}

          {view === 'teacher-dash' && (
            <TeacherDashboard setView={setView} />
          )}

          {view === 'about' && (
             <div className="max-w-3xl mx-auto py-16 px-4">
               <h1 className="text-3xl font-bold mb-6">Our Method: Script Precision</h1>
               <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                 <strong>Problem:</strong> You possess a solid foundation in English, but you consistently struggle with finding the precise vocabulary, structure, and professional tone needed to communicate with authority in high-stakes situations.
               </p>
               <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                 <strong>Our Promise:</strong> With Script Precision, you'll practice and perfect the exact language needed for client interactions, giving you the confidence to handle any meeting agenda with polished, professional clarity.
               </p>
               <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                 <strong>Why Nigeria?</strong> Our tutors are university-educated professionals with clear, neutral accents and a deep empathy for the language learning process.
               </p>
             </div>
          )}

          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center">
              <p className="text-sm text-gray-400">
                &copy; 2024 Script Precision. Payments via WeChat Pay. Classes via VooV Meeting.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
