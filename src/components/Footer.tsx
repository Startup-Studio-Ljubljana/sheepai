export default function Footer() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-4">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-white text-xs">Home</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v8h4v-8h2l-6-10-6 10zm18-2v10h-4v-10h-2l6-8 6 8h-6z"/>
              </svg>
            </div>
            <span className="text-white text-xs">Invest</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1 relative">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <span className="text-white text-xs">Payments</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <span className="text-white text-xs">Crypto</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-900 font-bold text-xs">+</span>
              </div>
            </div>
                <span className="text-white text-xs">RevPoints</span>
                </div>
            </div>
        </div>
    )
}