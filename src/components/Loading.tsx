const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite]"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
      </div>
    </div>
  )
}

export default Loading