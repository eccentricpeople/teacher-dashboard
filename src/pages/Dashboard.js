import { useEffect, useState } from 'react';
import supabase from '../supabase';
import AddStudentForm from '../components/AddStudentForm';
import StudentRow from '../components/StudentRow';
import { 
  AcademicCapIcon, 
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', (await supabase.auth.getUser()).data.user.id);
    if (error) console.error(error);
    else setStudents(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <UserGroupIcon className="h-5 w-5" />
                <span>{students.length} Students</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                      <dd className="text-lg font-semibold text-gray-900">{students.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <ChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Classes</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {new Set(students.map(s => s.class)).size}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddStudentForm onAdd={fetchStudents} />
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <UserGroupIcon className="h-6 w-6 text-indigo-600" />
                <h2 className="text-lg font-medium text-gray-900">Student List</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage your students and their classes
              </p>
            </div>
            
            <div className="border-t border-gray-200">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading students...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="p-8 text-center">
                  <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-4 text-gray-500">No students added yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {students.map(student => (
                    <StudentRow key={student.id} student={student} onUpdate={fetchStudents} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
const { data, error } = await supabase
  .from('students')
  .select('*');

const currentUser = await supabase.auth.getUser();
const uid = currentUser.data.user.id;

const ownStudents = data.filter((student) => student.teacher_id === uid);
const otherStudents = data.filter((student) => student.teacher_id !== uid);
