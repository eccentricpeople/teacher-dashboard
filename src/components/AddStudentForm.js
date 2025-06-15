import { useState } from 'react';
import supabase from '../supabase';

export default function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  const addStudent = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    await supabase.from('students').insert({
      name,
      class: studentClass,
      teacher_id: user.id
    });
    setName('');
    setStudentClass('');
    onAdd();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-6 w-6 text-indigo-600">➕</div>
        <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-gray-400">👤</div>
          </div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Student Name"
            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-gray-400">🎓</div>
          </div>
          <input
            value={studentClass}
            onChange={e => setStudentClass(e.target.value)}
            placeholder="Class"
            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        onClick={addStudent}
        className="mt-4 w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <div className="h-5 w-5">➕</div>
        <span>Add Student</span>
      </button>
    </div>
  );
}
