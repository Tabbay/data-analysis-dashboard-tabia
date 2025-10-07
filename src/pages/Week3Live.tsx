import Week3LiveDemo from '../components/Demos/Week3LiveDemo';

const Week3Live = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Week 3 Live Playground
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive Components & User Input
          </p>
          <p className="text-gray-500 mt-2">
            Try the NameInput demo below. Focus on controlled components, user input, and validation!
          </p>
        </div>
        <Week3LiveDemo />
      </div>
    </div>
  );
};

export default Week3Live;
