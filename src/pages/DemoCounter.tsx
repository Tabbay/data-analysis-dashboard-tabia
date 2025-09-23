import InstructorCounterDemo from '../components/InstructorCounterDemo';

/**
 * 🎓 INSTRUCTOR DEMO PAGE
 * 
 * Access this page during Week 2 Zoom sessions at:
 * http://localhost:5173/demo-counter
 * 
 * This provides a full-screen interactive demo for useState concepts.
 */

const DemoCounterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <InstructorCounterDemo />
    </div>
  );
};

export default DemoCounterPage;