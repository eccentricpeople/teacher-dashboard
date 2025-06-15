import { useState } from 'react';
import supabase from '../supabase';
import { 
  UserIcon, 
  AcademicCapIcon, 
  PencilIcon, 
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function StudentRow({ student, onUpdate }) {
  const [name, setName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);
  const [isEditing, setIsEditing] = useState(false);

  const updateStudent = async () => {
    await supabase.from('students').update({ name, class: studentClass }).eq('id', student.id);
    setIsEditing(false);
    onUpdate();
  };

  const deleteStudent = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await supabase.from('students').delete().eq('id', student.id);
      onUpdate();
    }
  };

  return (
    <div className="bg-white p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <AcademicCapIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                value={studentClass}
                onChange={e => setStudentClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="text-sm text-gray-600">{studentClass}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2 justify-end">
          {isEditing ? (
            <>
              <button
                onClick={updateStudent}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setName(student.name);
                  setStudentClass(student.class);
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={deleteStudent}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
